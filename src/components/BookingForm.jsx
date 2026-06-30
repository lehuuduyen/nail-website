'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import DatePicker from 'react-datepicker';
import { format, parse, isBefore, startOfDay } from 'date-fns';
import ServicePicker from '@/components/ServicePicker';
import StaffPicker from '@/components/StaffPicker';
import TimeSlotPicker from '@/components/TimeSlotPicker';
import { fetchServices, fetchEmployees, bookAppointment } from '@/lib/api';
import { useAvailability } from '@/hooks/useAvailability';
import { formatCurrency, formatPhoneDisplay } from '@/lib/format';
import { Clock, ChevronRight } from 'lucide-react';

const STEP_KEYS = ['service', 'staff', 'datetime', 'details'];

function stripPhone(s) {
  return s.replace(/\D/g, '');
}

export default function BookingForm() {
  const tb = useTranslations('booking');
  const locale = useLocale();
  const STEPS = STEP_KEYS.map((k) => tb(`steps.${k}`));
  const router = useRouter();
  const searchParams = useSearchParams();
  const preService = searchParams.get('service');
  const preServiceName = searchParams.get('svc');
  const preCategory = searchParams.get('category');
  const hasPreselectParam = !!(preService || preServiceName || preCategory);
  const topRef = useRef(null);

  const [step, setStep] = useState(1);
  const [didPreselect, setDidPreselect] = useState(false);
  // Đến từ link có sẵn dịch vụ → giữ màn chờ tới khi resolve xong rồi mới render,
  // tránh "nháy" Step 1 trước khi tự nhảy sang Step 2.
  const [preselecting, setPreselecting] = useState(hasPreselectParam);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [svcSearch, setSvcSearch] = useState('');
  const [service, setService] = useState(null);
  const [staffId, setStaffId] = useState(null);
  const [dateVal, setDateVal] = useState(null);
  const [timeStr, setTimeStr] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [smsConsent, setSmsConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  // Scroll to top of form on every step change
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [step]);

  const dateYmd = dateVal ? format(dateVal, 'yyyy-MM-dd') : '';
  const duration = service?.duration || 60;
  const employeeForApi = staffId == null ? 'any' : String(staffId);
  const { slots, loading: slotsLoading, error: slotsError } = useAvailability(
    employeeForApi,
    dateYmd,
    duration
  );

  useEffect(() => {
    let alive = true;
    Promise.all([fetchServices(), fetchEmployees()])
      .then(([s, e]) => {
        if (!alive) return;
        setServices(s || []);
        setEmployees(e || []);
        // Không có dịch vụ để preselect → gỡ màn chờ, hiện Step 1 như bình thường.
        if (!(s && s.length)) setPreselecting(false);
      })
      .catch(() => {
        // Fetch lỗi → không thể preselect, đừng kẹt spinner.
        if (alive) setPreselecting(false);
      });
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (service || !services.length) return;
    // Prefer the live DB id; fall back to matching by name (stable even when the
    // service page was statically built with synthetic/fallback ids).
    const id = parseInt(preService, 10);
    let found = Number.isNaN(id) ? null : services.find((x) => x.id === id);
    if (!found && preServiceName) {
      const target = preServiceName.trim().toLowerCase();
      found = services.find((x) => (x.name || '').trim().toLowerCase() === target);
    }
    // Homepage "popular" cards land on a whole category → select its first service.
    if (!found && preCategory) {
      found = services.find((x) => x.category === preCategory);
    }
    if (found) {
      setService(found);
      setDidPreselect(true); // tells the picker to scroll this service into view
      // Đến từ "Book now"/"Book this service" → dịch vụ đã chọn sẵn, nhảy thẳng
      // sang bước chọn kỹ thuật viên, không bắt khách chọn lại dịch vụ.
      setStep(2);
    }
    // Đã resolve xong (dù khớp hay không) → gỡ màn chờ.
    setPreselecting(false);
  }, [preService, preServiceName, preCategory, services, service]);

  const staffName = useMemo(() => {
    if (staffId == null) return tb('anyStaff');
    const e = employees.find((x) => x.id === staffId);
    return e ? `${e.firstName} ${e.lastName}` : '—';
  }, [staffId, employees]);

  const filterDate = (d) => !isBefore(startOfDay(d), startOfDay(new Date()));

  const goNext = () => {
    setFormError('');
    if (step === 1 && !service) { setFormError(tb('errService')); return; }
    if (step === 3) {
      if (!dateVal) { setFormError(tb('errDate')); return; }
      if (!timeStr) { setFormError(tb('errTime')); return; }
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const goBack = () => { setFormError(''); setStep((s) => Math.max(1, s - 1)); };

  const handlePhone = (raw) => setPhone(formatPhoneDisplay(stripPhone(raw).slice(0, 10)));

  // Auto-advance after selection on steps 1, 2, 3
  const handleServiceChange = (svc) => {
    setService(svc);
    if (svc) setTimeout(() => { setFormError(''); setStep(2); }, 280);
  };

  const handleStaffChange = (id) => {
    setStaffId(id);
    setTimeout(() => { setFormError(''); setStep(3); }, 280);
  };

  const handleTimeChange = (t) => {
    setTimeStr(t);
    if (dateVal && t) setTimeout(() => { setFormError(''); setStep(4); }, 280);
  };

  const handleConfirm = async () => {
    setFormError('');
    if (!firstName.trim() || !lastName.trim()) {
      setFormError(tb('errName'));
      return;
    }
    if (stripPhone(phone).length !== 10) {
      setFormError(tb('errPhone'));
      return;
    }
    if (!service || !dateVal || !timeStr) {
      setFormError(tb('errMissing'));
      return;
    }
    const scheduledAt = `${dateYmd}T${timeStr}:00.000Z`;

    setSubmitting(true);
    try {
      const res = await bookAppointment({
        customerName: `${firstName.trim()} ${lastName.trim()}`,
        customerPhone: phone,
        customerEmail: email.trim() || undefined,
        employeeId: staffId == null ? 'any' : staffId,
        serviceId: service.id,
        scheduledAt,
        notes: notes.trim() || undefined,
        smsOptIn: smsConsent,
        locale, // drives the language of the SMS confirmation (incl. new-customer offer)
      });
      const assigned = employees.find((x) => x.id === res.employeeId);
      const finalStaff = assigned ? `${assigned.firstName} ${assigned.lastName}` : staffName;
      sessionStorage.setItem('lastBooking', JSON.stringify({
        confirmationNumber: res.confirmationNumber,
        appointmentId: res.appointmentId,
        employeeId: res.employeeId,
        service: { name: service.name, price: service.price, duration: service.duration },
        staffName: finalStaff,
        dateYmd,
        timeStr,
        scheduledAt,
      }));
      router.push('/booking/confirmation');
    } catch (e) {
      setFormError(e.response?.data?.error || e.message || tb('errFailed'));
    } finally {
      setSubmitting(false);
    }
  };

  const slide = { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 } };

  const timeLabel = dateVal && timeStr
    ? format(parse(`${dateYmd} ${timeStr}`, 'yyyy-MM-dd HH:mm', new Date()), 'h:mm a')
    : '';

  const canProceed = step === 1 ? !!service : step === 3 ? !!(dateVal && timeStr) : true;

  // Màn chờ khi đang preselect dịch vụ từ link — render thay cho form để không lóe Step 1.
  if (preselecting) {
    return (
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-center px-4 py-24 text-center">
        <span
          className="h-10 w-10 animate-spin rounded-full border-2 border-rose-gold/25 border-t-rose-gold"
          aria-hidden="true"
        />
        <p className="mt-4 text-sm text-muted">Preparing your booking…</p>
      </div>
    );
  }

  return (
    <>
      {/* ── Main content — extra bottom padding so fixed bar doesn't overlap ── */}
      <div ref={topRef} className="mx-auto max-w-5xl scroll-mt-20 px-4 pb-32 pt-6 md:px-6 md:pt-8">

        {/* Progress bar */}
        <div className="mb-6 h-1 w-full overflow-hidden rounded-full bg-rose-gold/15">
          <motion.div
            className="h-full rounded-full bg-rose-gold"
            animate={{ width: `${((step - 1) / (STEPS.length - 1)) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          />
        </div>

        {/* Step indicator */}
        <div className="mb-6 flex items-center">
          {STEPS.map((label, idx) => {
            const n = idx + 1;
            const active = step === n;
            const done = step > n;
            return (
              <div key={label} className="flex min-w-0 flex-1 items-center">
                <button
                  type="button"
                  onClick={() => done && setStep(n)}
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${done
                    ? 'bg-rose-gold text-white cursor-pointer hover:opacity-80'
                    : active
                      ? 'bg-charcoal text-cream ring-2 ring-rose-gold ring-offset-2'
                      : 'bg-rose-gold/10 text-muted cursor-default'
                    }`}
                >
                  {done ? '✓' : n}
                </button>
                <span
                  className={`ml-1.5 hidden truncate text-[11px] font-semibold uppercase tracking-wide sm:inline ${active ? 'text-charcoal' : done ? 'text-rose-gold' : 'text-muted'
                    }`}
                >
                  {label}
                </span>
                {idx < STEPS.length - 1 && (
                  <div className={`mx-2 h-px min-w-[8px] flex-1 transition-colors ${done ? 'bg-rose-gold' : 'bg-rose-gold/15'}`} />
                )}
              </div>
            );
          })}
          {/* Step 5: Confirmed */}
          <div className="flex items-center opacity-30">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rose-gold/10 text-xs font-bold text-muted">5</div>
            <span className="ml-1.5 hidden text-[11px] font-semibold uppercase tracking-wide text-muted sm:inline">Done</span>
          </div>
        </div>

        {/* Selection summary chips — click to jump back */}
        {step > 1 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {service && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1 rounded-full border border-rose-gold/30 bg-rose-gold/8 px-3 py-1.5 text-xs font-medium text-charcoal transition hover:bg-rose-gold/15"
              >
                {service.name} · {formatCurrency(service.price)}
                <ChevronRight size={11} className="text-rose-gold" />
              </button>
            )}
            {step > 2 && (
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-1 rounded-full border border-rose-gold/30 bg-rose-gold/8 px-3 py-1.5 text-xs font-medium text-charcoal transition hover:bg-rose-gold/15"
              >
                {staffName}
                <ChevronRight size={11} className="text-rose-gold" />
              </button>
            )}
            {step > 3 && dateVal && timeLabel && (
              <button
                type="button"
                onClick={() => setStep(3)}
                className="flex items-center gap-1 rounded-full border border-rose-gold/30 bg-rose-gold/8 px-3 py-1.5 text-xs font-medium text-charcoal transition hover:bg-rose-gold/15"
              >
                {format(dateVal, 'MMM d')} · {timeLabel}
                <ChevronRight size={11} className="text-rose-gold" />
              </button>
            )}
          </div>
        )}

        {/* ── Step content ── */}
        <AnimatePresence mode="wait">

          {step === 1 && (
            <motion.div key="s1" {...slide} transition={{ duration: 0.3 }} className="space-y-5">
              <div>
                <h2 className="font-display text-2xl text-ink">{tb('selectService')}</h2>
                <p className="mt-1 text-sm text-muted">{tb('selectServiceHint')}</p>
              </div>
              <ServicePicker
                services={services}
                valueId={service?.id}
                onChange={handleServiceChange}
                search={svcSearch}
                onSearchChange={setSvcSearch}
                scrollToSelected={didPreselect}
              />
              {formError && <p className="text-sm text-red-600">{formError}</p>}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" {...slide} transition={{ duration: 0.3 }} className="space-y-5">
              <div>
                <h2 className="font-display text-2xl text-ink">{tb('chooseTech')}</h2>
                <p className="mt-1 text-sm text-muted">{tb('chooseTechHint')}</p>
              </div>
              <StaffPicker employees={employees} valueId={staffId} onChange={handleStaffChange} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" {...slide} transition={{ duration: 0.3 }} className="space-y-6">
              <div>
                <h2 className="font-display text-2xl text-ink">{tb('pickDateTime')}</h2>
                <p className="mt-1 text-sm text-muted">{tb('pickDateTimeHint')}</p>
              </div>
              <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-charcoal">{tb('date')}</p>
                  <DatePicker
                    selected={dateVal}
                    onChange={(d) => { setDateVal(d); setTimeStr(''); }}
                    filterDate={filterDate}
                    inline
                    calendarClassName="!border-0 !bg-transparent"
                  />
                </div>
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-charcoal">
                    {dateVal ? tb('availableTimes', { date: format(dateVal, 'EEE, MMM d') }) : tb('selectDateFirst')}
                  </p>
                  {slotsError && <p className="mb-2 text-sm text-red-600">{slotsError}</p>}
                  <TimeSlotPicker
                    slots={slots}
                    value={timeStr}
                    onChange={handleTimeChange}
                    loading={slotsLoading}
                  />
                </div>
              </div>
              {formError && <p className="text-sm text-red-600">{formError}</p>}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="s4" {...slide} transition={{ duration: 0.3 }}>
              <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
                <div className="space-y-4">
                  <div>
                    <h2 className="font-display text-2xl text-ink">{tb('yourInfo')}</h2>
                    <p className="mt-1 text-sm text-muted">{tb('yourInfoHint')}</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-charcoal">{tb('firstName')}</label>
                      <input
                        required
                        className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm transition focus:border-rose-gold focus:outline-none focus:ring-1 focus:ring-rose-gold"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal">{tb('lastName')}</label>
                      <input
                        required
                        className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm transition focus:border-rose-gold focus:outline-none focus:ring-1 focus:ring-rose-gold"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal">{tb('phone')}</label>
                    <input
                      required
                      className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm transition focus:border-rose-gold focus:outline-none focus:ring-1 focus:ring-rose-gold"
                      placeholder="(555) 555-5555"
                      value={phone}
                      onChange={(e) => handlePhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal">{tb('email')}</label>
                    <input
                      type="email"
                      className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm transition focus:border-rose-gold focus:outline-none focus:ring-1 focus:ring-rose-gold"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal">{tb('notes')}</label>
                    <textarea
                      rows={3}
                      className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm transition focus:border-rose-gold focus:outline-none focus:ring-1 focus:ring-rose-gold"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  <div className="flex items-start gap-3 rounded-xl border border-rose-gold/20 bg-rose-gold/5 p-4">
                    <input
                      id="sms-consent"
                      type="checkbox"
                      checked={smsConsent}
                      onChange={(e) => setSmsConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-rose-gold"
                    />
                    <label htmlFor="sms-consent" className="cursor-pointer text-xs leading-relaxed text-charcoal">
                      {tb('smsConsent')}
                    </label>
                  </div>
                  {formError && <p className="text-sm text-red-600">{formError}</p>}
                </div>

                {/* Booking summary sidebar */}
                <aside className="h-fit rounded-2xl border border-rose-gold/20 bg-surface p-6 shadow-sm shadow-rose-gold/5">
                  <h3 className="font-display text-lg text-ink">{tb('summary')}</h3>
                  <ul className="mt-4 space-y-3 text-sm text-charcoal">
                    <li>
                      <span className="font-semibold text-charcoal">{service?.name}</span>
                      <div className="text-rose-gold">{formatCurrency(service?.price)}</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock size={15} className="text-rose-gold" />
                      {tb('minutes', { count: service?.duration })}
                    </li>
                    <li>{tb('staffLabel', { name: staffName })}</li>
                    <li>
                      {dateVal && format(dateVal, 'MMM d, yyyy')}
                      {timeLabel && ` · ${timeLabel}`}
                    </li>
                  </ul>
                </aside>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* ── Fixed bottom action bar — always visible, no scrolling needed ── */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rose-gold/15 bg-cream/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">

          {/* Left: step label */}
          <span className="text-xs font-medium text-muted">
            {tb('stepOf', { step, total: STEPS.length })}
          </span>

          {/* Right: Back + Next/Confirm */}
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={goBack}
                className="rounded-full border border-charcoal/20 px-5 py-2 text-sm font-medium text-charcoal transition hover:bg-charcoal/5"
              >
                ← {tb('back')}
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!canProceed}
                className="rounded-full bg-rose-gold px-7 py-2.5 text-sm font-semibold text-white shadow transition hover:opacity-90 disabled:opacity-35"
              >
                {tb('next')} →
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handleConfirm}
                className="rounded-full bg-rose-gold px-8 py-2.5 text-sm font-bold text-white shadow-lg transition hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? tb('booking') : tb('confirm')}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
