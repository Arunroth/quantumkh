import { describe, expect, it } from 'vitest';

import {
  formatPortalCurrency,
  formatPortalDate,
  readClientPortalReviewToken,
  resolveClientPortalNextPath,
} from './clientPortal.utils';

describe('readClientPortalReviewToken', () => {
  it('extracts the review token from query params', () => {
    expect(readClientPortalReviewToken('?token=review-123')).toBe('review-123');
  });

  it('returns null when no token is present', () => {
    expect(readClientPortalReviewToken('?foo=bar')).toBeNull();
  });
});

describe('resolveClientPortalNextPath', () => {
  it('keeps internal client portal destinations', () => {
    expect(resolveClientPortalNextPath('/client/quotes/quote-1')).toBe(
      '/client/quotes/quote-1',
    );
  });

  it('falls back when the path is outside the client portal', () => {
    expect(resolveClientPortalNextPath('/admin')).toBe('/client/projects');
  });
});

describe('formatPortalDate', () => {
  it('formats ISO dates for display', () => {
    expect(formatPortalDate('2026-03-17T00:00:00.000Z')).toBe('2026-03-17');
  });
});

describe('formatPortalCurrency', () => {
  it('formats decimal strings with the provided currency', () => {
    expect(formatPortalCurrency('1250.00', 'USD')).toContain('$1,250.00');
  });
});
