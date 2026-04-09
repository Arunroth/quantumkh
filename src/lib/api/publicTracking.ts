import {
  PublicProjectTrackingLookupInput,
  PublicProjectTrackingResponse,
} from '../types/publicTracking.ts';
import { requestJson } from './http.ts';

export async function lookupPublicProjectTracking(
  payload: PublicProjectTrackingLookupInput,
): Promise<PublicProjectTrackingResponse> {
  return requestJson<PublicProjectTrackingResponse>(
    '/client-portal/public/project-lookup',
    {
      method: 'POST',
      body: payload,
    },
  );
}
