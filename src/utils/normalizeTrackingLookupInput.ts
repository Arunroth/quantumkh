export function normalizeTrackingLookupInput(input: {
  trackingCode: string;
  vat: string;
}): { referenceNo: string; vat: string } {
  const trackingCode = String(input.trackingCode || "").trim();
  const vat = String(input.vat || "").trim();

  if (!vat && trackingCode.includes(",")) {
    const [legacyReferenceNo, legacyVat] = trackingCode.split(",", 2);
    return {
      referenceNo: String(legacyReferenceNo || "").trim().toUpperCase(),
      vat: String(legacyVat || "").trim().toUpperCase(),
    };
  }

  return {
    referenceNo: trackingCode.toUpperCase(),
    vat: vat.toUpperCase(),
  };
}
