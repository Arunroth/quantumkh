import { describe, expect, it, vi } from 'vitest';

import { requestFormData, requestJson } from './http';
import {
  createRequestProject,
  fetchTelegramLinkStatus,
  uploadRequestProjectFiles,
} from './requestProjects';

vi.mock('./http', () => ({
  requestFormData: vi.fn(),
  requestJson: vi.fn(),
}));

describe('requestProjects API', () => {
  it('posts request-project payloads to the public intake endpoint', async () => {
    vi.mocked(requestJson).mockResolvedValue({
      id: 'request-1',
      rfqId: 'rfq-1',
      createdAt: '2026-03-17T00:00:00.000Z',
      status: 'New',
    });

    const payload = {
      name: 'Buyer Example',
      email: 'buyer@example.com',
      phone: '+85512345678',
      contactMethod: 'email',
      projectType: 'Manufacturing',
      projectDescription: 'Need a laser jig manufactured.',
    };

    await createRequestProject(payload);

    expect(requestJson).toHaveBeenCalledWith('/request-projects', {
      method: 'POST',
      body: payload,
    });
  });

  it('uploads request-project files through the dedicated upload endpoint', async () => {
    vi.mocked(requestFormData).mockResolvedValue([
      {
        originalFilename: 'demo.step',
        filename: 'stored-demo.step',
      },
    ]);

    const files = [new File(['demo'], 'demo.step')];

    await uploadRequestProjectFiles(files);

    expect(requestFormData).toHaveBeenCalledWith(
      '/request-projects/upload-files',
      expect.any(FormData),
    );
  });

  it('fetches the Telegram opt-in link status for a project request', async () => {
    vi.mocked(requestJson).mockResolvedValue({ linked: true });

    const result = await fetchTelegramLinkStatus('request-1');

    expect(requestJson).toHaveBeenCalledWith('/api/v1/project-requests/request-1/telegram-status');
    expect(result).toEqual({ linked: true });
  });
});
