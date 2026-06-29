import {
  PricingOption,
  RequestProjectCreatedResponse,
  RequestProjectFileReference,
  RequestProjectFormData,
  TelegramLinkStatus,
} from '../types/requestProjects.ts';
import { requestFormData, requestJson } from './http.ts';

export async function createRequestProject(
  payload: Partial<RequestProjectFormData>,
): Promise<RequestProjectCreatedResponse> {
  return requestJson<RequestProjectCreatedResponse>('/api/v1/project-requests', {
    method: 'POST',
    body: payload,
  });
}

export async function fetchMaterialOptions(): Promise<PricingOption[]> {
  return requestJson<PricingOption[]>('/api/v1/pricing-config/materials');
}

export async function fetchFinishOptions(): Promise<PricingOption[]> {
  return requestJson<PricingOption[]>('/api/v1/pricing-config/finishes');
}

export async function fetchTelegramLinkStatus(
  requestId: string,
): Promise<TelegramLinkStatus> {
  return requestJson<TelegramLinkStatus>(`/api/v1/project-requests/${requestId}/telegram-status`);
}

export async function uploadRequestProjectFiles(
  file: File[] | FileList,
): Promise<RequestProjectFileReference[]> {
  const formData = new FormData();

  Array.from(file).forEach((f) => {
    formData.append('file', f);
  });

  return requestFormData<RequestProjectFileReference[]>(
    '/api/v1/files/upload',
    formData,
  );
}
