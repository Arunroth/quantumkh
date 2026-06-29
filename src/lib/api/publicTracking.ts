import {
  PublicProjectTrackingLookupInput,
  PublicProjectTrackingResponse,
} from '../types/publicTracking.ts';
import { requestJson } from './http.ts';

export async function lookupPublicProjectTracking(
  payload: PublicProjectTrackingLookupInput,
): Promise<PublicProjectTrackingResponse> {
  const params = new URLSearchParams({
    reference_no: payload.referenceNo,
    vat: payload.vat,
  });

  return requestJson<PublicProjectTrackingResponse>(
    `/api/v1/project-requests/track?${params.toString()}`,
  );
}
