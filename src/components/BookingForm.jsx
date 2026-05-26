'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
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

const STEPS = ['Service', 'Staff', 'Date & time', 'Your details'];

function stripPhone(s) {
  return s.replace(/\D/g, '');
}

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preService = searchParams.get('service');
  const topRef = useRef(null);

  const [step, setStep] = useState(1);
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
  const [smsConsent, setSmsConsent] = useState(true);
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
    Promise.all([fetchServices(), fetchEmployees()]).then(([s, e]) => {
      setServices(s || []);
      setEmployees(e || []);
    });
  }, []);

  useEffect(() => {
    if (!preService || !services.length || service) return;
    const id = parseInt(preService, 10);
    const found = services.find((x) => x.id === id);
    if (found) setService(found);
  }, [preService, services, service]);

  const staffName = useMemo(() => {
    if (staffId == null) return 'Anyone available';
    const e = employees.find((x) => x.id === staffId);
    return e ? `${e.firstName} ${e.lastName}` : '—';
  }, [staffId, employees]);

  const filterDate = (d) => !isBefore(startOfDay(d), startOfDay(new Date()));

  const goNext = () => {
    setFormError('');
    if (step === 1 && !service) { setFormError('Please select a service.'); return; }
    if (step === 3) {
      if (!dateVal) { setFormError('Please choose a date.'); return; }
      if (!timeStr) { setFormError('Please choose a time slot.'); return; }
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
      setFormError('First and last name are required.');
      return;
    }
    if (stripPhone(phone).length !== 10) {
      setFormError('Please enter a valid 10-digit phone number.');
      return;
    }
    if (!service || !dateVal || !timeStr) {
      setFormError('Missing booking details.');
      return;
    }
    const scheduledAt = parse(`${dateYmd} ${timeStr}`, 'yyyy-MM-dd HH:mm', new Date()).toISOString();

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
      setFormError(e.response?.data?.error || e.message || 'Booking failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const slide = { initial: { opacity: 0, x: 24 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -24 } };

  const timeLabel = dateVal && timeStr
    ? format(parse(`${dateYmd} ${timeStr}`, 'yyyy-MM-dd HH:mm', new Date()), 'h:mm a')
    : '';

  const canProceed = step === 1 ? !!service : step === 3 ? !!(dateVal && timeStr) : true;

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
                <h2 className="font-display text-2xl text-ink">Select a service</h2>
                <p className="mt-1 text-sm text-muted">Tap a service to continue.</p>
              </div>
              <ServicePicker
                services={services}
                valueId={service?.id}
                onChange={handleServiceChange}
                search={svcSearch}
                onSearchChange={setSvcSearch}
              />
              {formError && <p className="text-sm text-red-600">{formError}</p>}
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="s2" {...slide} transition={{ duration: 0.3 }} className="space-y-5">
              <div>
                <h2 className="font-display text-2xl text-ink">Choose your technician</h2>
                <p className="mt-1 text-sm text-muted">Tap a technician to continue.</p>
              </div>
              <StaffPicker employees={employees} valueId={staffId} onChange={handleStaffChange} />
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="s3" {...slide} transition={{ duration: 0.3 }} className="space-y-6">
              <div>
                <h2 className="font-display text-2xl text-ink">Pick date & time</h2>
                <p className="mt-1 text-sm text-muted">Choose a date, then tap an available time.</p>
              </div>
              <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-charcoal">Date</p>
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
                    {dateVal ? `Available times — ${format(dateVal, 'EEE, MMM d')}` : 'Select a date first'}
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
                    <h2 className="font-display text-2xl text-ink">Your information</h2>
                    <p className="mt-1 text-sm text-muted">Almost done! Fill in your details below.</p>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="text-xs font-semibold text-charcoal">First name *</label>
                      <input
                        required
                        className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm transition focus:border-rose-gold focus:outline-none focus:ring-1 focus:ring-rose-gold"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-charcoal">Last name *</label>
                      <input
                        required
                        className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm transition focus:border-rose-gold focus:outline-none focus:ring-1 focus:ring-rose-gold"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal">Phone *</label>
                    <input
                      required
                      className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm transition focus:border-rose-gold focus:outline-none focus:ring-1 focus:ring-rose-gold"
                      placeholder="(555) 555-5555"
                      value={phone}
                      onChange={(e) => handlePhone(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal">Email (optional)</label>
                    <input
                      type="email"
                      className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm transition focus:border-rose-gold focus:outline-none focus:ring-1 focus:ring-rose-gold"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal">Special requests</label>
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
                      By checking this box, I agree to receive SMS appointment
                      reminders and confirmations from Nice Nails & Spa at the
                      number provided. Message & data rates may apply.
                      Reply STOP to unsubscribe. View Privacy Policy at
                      nicenailsaz.com/privacy.
                    </label>
                  </div>
                  {formError && <p className="text-sm text-red-600">{formError}</p>}
                </div>

                {/* Booking summary sidebar */}
                <aside className="h-fit rounded-2xl border border-rose-gold/20 bg-surface p-6 shadow-sm shadow-rose-gold/5">
                  <h3 className="font-display text-lg text-ink">Summary</h3>
                  <ul className="mt-4 space-y-3 text-sm text-charcoal">
                    <li>
                      <span className="font-semibold text-charcoal">{service?.name}</span>
                      <div className="text-rose-gold">{formatCurrency(service?.price)}</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock size={15} className="text-rose-gold" />
                      {service?.duration} minutes
                    </li>
                    <li>Staff: {staffName}</li>
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
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-rose-gold/15 bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 md:px-6">

          {/* Left: step label */}
          <span className="text-xs font-medium text-muted">
            Step {step} of {STEPS.length}
          </span>

          {/* Right: Back + Next/Confirm */}
          <div className="flex items-center gap-3">
            {step > 1 && (
              <button
                type="button"
                onClick={goBack}
                className="rounded-full border border-charcoal/20 px-5 py-2 text-sm font-medium text-charcoal transition hover:bg-charcoal/5"
              >
                ← Back
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={goNext}
                disabled={!canProceed}
                className="rounded-full bg-rose-gold px-7 py-2.5 text-sm font-semibold text-white shadow transition hover:opacity-90 disabled:opacity-35"
              >
                Next →
              </button>
            ) : (
              <button
                type="button"
                disabled={submitting}
                onClick={handleConfirm}
                className="rounded-full bg-rose-gold px-8 py-2.5 text-sm font-bold text-white shadow-lg transition hover:opacity-90 disabled:opacity-60"
              >
                {submitting ? 'Booking…' : 'Confirm booking'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
