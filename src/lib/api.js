import axios from 'axios';

const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

export const api = axios.create({
  baseURL: `${base.replace(/\/$/, '')}/api`,
  headers: { 'Content-Type': 'application/json' },
});

export async function fetchServices() {
  const { data } = await api.get('/public/services');
  return data;
}

export async function fetchEmployees() {
  const { data } = await api.get('/public/employees');
  return data;
}

export async function fetchGallery(params) {
  const { data } = await api.get('/gallery', { params });
  return data;
}

export async function fetchAvailability({ employeeId, date, serviceDuration }) {
  const { data } = await api.get('/public/appointments/availability', {
    params: {
      employeeId: employeeId ?? 'any',
      date,
      serviceDuration,
    },
  });
  return data;
}

export async function bookAppointment(body) {
  const { data } = await api.post('/public/appointments/book', body);
  return data;
}

export function getPublicBaseUrl() {
  return base.replace(/\/$/, '');
}
