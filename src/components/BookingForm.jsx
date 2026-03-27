'use client';

import { useEffect, useMemo, useState } from 'react';
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
import { Clock } from 'lucide-react';

const steps = ['Service', 'Staff', 'Date & time', 'Your details'];

function stripPhone(s) {
  return s.replace(/\D/g, '');
}

export default function BookingForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preService = searchParams.get('service');

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
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

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

  const filterDate = (d) => {
    const today = startOfDay(new Date());
    if (isBefore(startOfDay(d), today)) return false;
    return true;
  };

  const goNext = () => {
    setFormError('');
    if (step === 1 && !service) {
      setFormError('Please select a service.');
      return;
    }
    if (step === 3) {
      if (!dateVal) {
        setFormError('Please choose a date.');
        return;
      }
      if (!timeStr) {
        setFormError('Please choose a time.');
        return;
      }
    }
    setStep((s) => Math.min(4, s + 1));
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const handlePhone = (raw) => {
    const d = stripPhone(raw).slice(0, 10);
    setPhone(formatPhoneDisplay(d));
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
    const scheduledAt = parse(
      `${dateYmd} ${timeStr}`,
      'yyyy-MM-dd HH:mm',
      new Date()
    ).toISOString();

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
      const finalStaff = assigned
        ? `${assigned.firstName} ${assigned.lastName}`
        : staffName;
      const payload = {
        confirmationNumber: res.confirmationNumber,
        appointmentId: res.appointmentId,
        employeeId: res.employeeId,
        service: { name: service.name, price: service.price, duration: service.duration },
        staffName: finalStaff,
        dateYmd,
        timeStr,
        scheduledAt,
      };
      sessionStorage.setItem('lastBooking', JSON.stringify(payload));
      router.push('/booking/confirmation');
    } catch (e) {
      setFormError(e.response?.data?.error || e.message || 'Booking failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const slide = { initial: { opacity: 0, x: 28 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -28 } };

  const timeLabel =
    dateVal && timeStr
      ? format(parse(`${dateYmd} ${timeStr}`, 'yyyy-MM-dd HH:mm', new Date()), 'h:mm a')
      : '';

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-12">
      <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
        {steps.map((label, idx) => {
          const n = idx + 1;
          const active = step === n;
          const done = step > n;
          return (
            <div key={label} className="flex min-w-0 flex-1 items-center gap-2">
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  done
                    ? 'bg-rose-gold text-white'
                    : active
                      ? 'bg-charcoal text-cream ring-2 ring-rose-gold'
                      : 'bg-cream text-muted'
                }`}
              >
                {done ? '✓' : n}
              </div>
              <span
                className={`hidden truncate text-xs font-semibold uppercase tracking-wide md:inline ${
                  active ? 'text-charcoal' : 'text-muted'
                }`}
              >
                {label}
              </span>
              {idx < steps.length - 1 && (
                <div className="mx-1 hidden h-px min-w-[12px] flex-1 bg-rose-gold/25 sm:block" />
              )}
            </div>
          );
        })}
        <div className="flex min-w-0 flex-1 items-center gap-2 opacity-50">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cream text-sm font-bold text-muted">
            5
          </div>
          <span className="hidden truncate text-xs font-semibold uppercase tracking-wide text-muted md:inline">
            Confirmed
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" {...slide} transition={{ duration: 0.35 }} className="space-y-6">
            <h2 className="font-display text-2xl text-ink">Select a service</h2>
            <ServicePicker
              services={services}
              valueId={service?.id}
              onChange={setService}
              search={svcSearch}
              onSearchChange={setSvcSearch}
            />
            {formError && <p className="text-sm text-red-600">{formError}</p>}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={goNext}
                className="rounded-full bg-rose-gold px-8 py-3 text-sm font-semibold text-white"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" {...slide} transition={{ duration: 0.35 }} className="space-y-6">
            <h2 className="font-display text-2xl text-ink">Choose your technician</h2>
            <StaffPicker employees={employees} valueId={staffId} onChange={setStaffId} />
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={goBack}
                className="rounded-full border border-charcoal/20 px-6 py-2.5 text-sm font-medium"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                className="rounded-full bg-rose-gold px-8 py-3 text-sm font-semibold text-white"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" {...slide} transition={{ duration: 0.35 }} className="space-y-8">
            <h2 className="font-display text-2xl text-ink">Pick date & time</h2>
            <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
              <div>
                <p className="mb-2 text-sm font-medium text-charcoal">Date</p>
                <DatePicker
                  selected={dateVal}
                  onChange={(d) => {
                    setDateVal(d);
                    setTimeStr('');
                  }}
                  filterDate={filterDate}
                  inline
                  monthsShown={2}
                  calendarClassName="!border-0 !bg-transparent"
                />
              </div>
              <div>
                <p className="mb-2 text-sm font-medium text-charcoal">Available times</p>
                {slotsError && <p className="mb-2 text-sm text-red-600">{slotsError}</p>}
                <TimeSlotPicker
                  slots={slots}
                  value={timeStr}
                  onChange={setTimeStr}
                  loading={slotsLoading}
                />
              </div>
            </div>
            {formError && <p className="text-sm text-red-600">{formError}</p>}
            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={goBack}
                className="rounded-full border border-charcoal/20 px-6 py-2.5 text-sm font-medium"
              >
                Back
              </button>
              <button
                type="button"
                onClick={goNext}
                className="rounded-full bg-rose-gold px-8 py-3 text-sm font-semibold text-white"
              >
                Next
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="s4" {...slide} transition={{ duration: 0.35 }}>
            <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
              <div className="space-y-4">
                <h2 className="font-display text-2xl text-ink">Your information</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-semibold text-charcoal">First name *</label>
                    <input
                      required
                      className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-charcoal">Last name *</label>
                    <input
                      required
                      className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal">Phone *</label>
                  <input
                    required
                    className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm"
                    placeholder="(555) 555-5555"
                    value={phone}
                    onChange={(e) => handlePhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal">Email (optional)</label>
                  <input
                    type="email"
                    className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-charcoal">Special requests</label>
                  <textarea
                    rows={3}
                    className="mt-1 w-full rounded-xl border border-rose-gold/25 px-3 py-2.5 text-sm"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
                {formError && <p className="text-sm text-red-600">{formError}</p>}
                <div className="flex flex-wrap gap-3 pt-2">
                  <button
                    type="button"
                    onClick={goBack}
                    className="rounded-full border border-charcoal/20 px-6 py-2.5 text-sm font-medium"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={submitting}
                    onClick={handleConfirm}
                    className="rounded-full bg-rose-gold px-10 py-3.5 text-sm font-bold text-white shadow-lg disabled:opacity-60"
                  >
                    {submitting ? 'Booking…' : 'Confirm booking'}
                  </button>
                </div>
              </div>
              <aside className="h-fit rounded-2xl border border-rose-gold/20 bg-surface p-6 shadow-sm shadow-rose-gold/5">
                <h3 className="font-display text-lg text-ink">Summary</h3>
                <ul className="mt-4 space-y-3 text-sm text-charcoal">
                  <li>
                    <span className="font-semibold text-charcoal">{service?.name}</span>
                    <div className="text-rose-gold">{formatCurrency(service?.price)}</div>
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock size={16} className="text-rose-gold" />
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
  );
}
