export function formatCurrency(n) {
  const v = Number(n);
  if (Number.isNaN(v)) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(v);
}

export function formatPriceOrDash(n) {
  if (n == null || n === '') return '—';
  return formatCurrency(n);
}

export function formatPhoneDisplay(digits) {
  const d = String(digits).replace(/\D/g, '').slice(0, 10);
  if (d.length < 10) return d;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}
