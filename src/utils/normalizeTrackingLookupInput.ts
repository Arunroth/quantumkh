export function normalizeTrackingLookupInput(input: {
  trackingCode: string;
  vat: string;
}): { projectId: string; vat: string } {
  const trackingCode = String(input.trackingCode || "").trim();
  const vat = String(input.vat || "").trim();

  if (!vat && trackingCode.includes(",")) {
    const [legacyProjectId, legacyVat] = trackingCode.split(",", 2);
    return {
      projectId: String(legacyProjectId || "").trim().toUpperCase(),
      vat: String(legacyVat || "").trim().toUpperCase(),
    };
  }

  return {
    projectId: trackingCode.toUpperCase(),
    vat: vat.toUpperCase(),
  };
}
