import {
  RequestProjectCreatedResponse,
  RequestProjectFileReference,
  RequestProjectFormData,
} from '../types/requestProjects.ts';
import { requestFormData, requestJson } from './http.ts';

export async function createRequestProject(
  payload: Partial<RequestProjectFormData>,
): Promise<RequestProjectCreatedResponse> {
  return requestJson<RequestProjectCreatedResponse>('/request-projects', {
    method: 'POST',
    body: payload,
  });
}

export async function uploadRequestProjectFiles(
  files: File[] | FileList,
): Promise<RequestProjectFileReference[]> {
  const formData = new FormData();

  Array.from(files).forEach((file) => {
    formData.append('files', file);
  });

  return requestFormData<RequestProjectFileReference[]>(
    '/request-projects/upload-files',
    formData,
  );
}
