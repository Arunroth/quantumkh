export { normalizeTrackingLookupInput } from "../utils/normalizeTrackingLookupInput";

function humanizeToken(value: string): string {
  return value
    .replace(/[_-]+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function formatTrackingStatusLabel(status: string): string {
  return humanizeToken(status);
}

export function formatTrackingIdentifierLine(referenceNo: string, vat?: string | null): string {
  const normalizedReferenceNo = String(referenceNo || '').trim();
  const normalizedVat = String(vat || '').trim();
  return normalizedVat ? `${normalizedReferenceNo} · VAT ${normalizedVat}` : normalizedReferenceNo;
}

export function getTrackingStageIconToken(title: string):
  | 'confirm'
  | 'design'
  | 'approval'
  | 'process'
  | 'packaging'
  | 'delivery'
  | 'arrived'
  | 'completed'
  | 'default' {
  const s = String(title || '').toLowerCase();
  if (/\bfile\b|review|intake|confirm/.test(s)) return 'confirm';
  if (/cam|program|design/.test(s)) return 'design';
  if (/quality|qc|inspect|approval/.test(s)) return 'approval';
  if (/cnc|machin|mill|turn|process|cutting/.test(s)) return 'process';
  if (/finish|coat|surface/.test(s)) return 'design';
  if (/pack/.test(s)) return 'packaging';
  if (/ship|deliver|freight/.test(s)) return 'delivery';
  if (/arriv|received/.test(s)) return 'arrived';
  if (/complete|done/.test(s)) return 'completed';
  return 'default';
}
