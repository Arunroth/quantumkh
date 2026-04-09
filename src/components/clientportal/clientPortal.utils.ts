const DEFAULT_CLIENT_PORTAL_PATH = '/client/projects';

export function readClientPortalReviewToken(search: string): string | null {
  const params = new URLSearchParams(search);
  const token = params.get('token');
  return token ? token.trim() : null;
}

export function resolveClientPortalNextPath(path?: string | null): string {
  const normalized = String(path || '').trim();
  if (normalized.startsWith('/client')) {
    return normalized;
  }

  return DEFAULT_CLIENT_PORTAL_PATH;
}

export function formatPortalDate(value?: string | null): string {
  if (!value) return 'N/A';
  return value.slice(0, 10);
}

export function formatPortalCurrency(value?: string | null, currency: string = 'USD'): string {
  const amount = Number(value || 0);
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0);
}
