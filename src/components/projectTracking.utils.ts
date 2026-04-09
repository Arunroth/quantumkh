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

export function formatTrackingStageLabel(stage: string): string {
  return humanizeToken(stage);
}

export function formatTrackingIdentifierLine(projectId: string, vat?: string | null): string {
  const normalizedProjectId = String(projectId || '').trim();
  const normalizedVat = String(vat || '').trim();
  return normalizedVat ? `${normalizedProjectId} · VAT ${normalizedVat}` : normalizedProjectId;
}

export function getTrackingStageIconToken(stage: string):
  | 'confirm'
  | 'design'
  | 'approval'
  | 'process'
  | 'packaging'
  | 'delivery'
  | 'arrived'
  | 'completed'
  | 'default' {
  const key = String(stage || '').trim().toUpperCase();
  switch (key) {
    case 'CONFIRM':
      return 'confirm';
    case 'DESIGN_CONFIRM':
      return 'design';
    case 'MATERIAL_APPROVAL':
      return 'approval';
    case 'CUSTOM_PROCESS':
      return 'process';
    case 'PACKAGING':
      return 'packaging';
    case 'OUT_FOR_DELIVERY':
      return 'delivery';
    case 'ARRIVED':
      return 'arrived';
    case 'COMPLETED':
      return 'completed';
    default:
      break;
  }
  const s = String(stage || '').toLowerCase();
  if (/\bfile\b|review|intake/.test(s)) return 'confirm';
  if (/cam|program|design/.test(s)) return 'design';
  if (/quality|qc|inspect|approval/.test(s)) return 'approval';
  if (/cnc|machin|mill|turn|process/.test(s)) return 'process';
  if (/finish|coat|surface/.test(s)) return 'design';
  if (/pack/.test(s)) return 'packaging';
  if (/ship|deliver|freight/.test(s)) return 'delivery';
  if (/arriv|received/.test(s)) return 'arrived';
  if (/complete|done/.test(s)) return 'completed';
  return 'default';
}
