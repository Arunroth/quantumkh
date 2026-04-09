import { afterEach, describe, expect, it, vi } from 'vitest';

import { ApiError, buildApiUrl, requestFormData, requestJson } from './http';

describe('buildApiUrl', () => {
  it('normalizes slashes between the base URL and path', () => {
    expect(buildApiUrl('/request-projects', 'https://api.example.com/')).toBe(
      'https://api.example.com/request-projects',
    );
  });
});

describe('requestJson', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('sends JSON requests with include credentials by default', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ ok: true }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await requestJson('/request-projects', {
      baseUrl: 'https://api.example.com',
      method: 'POST',
      body: { name: 'Buyer Example' },
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/request-projects',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ name: 'Buyer Example' }),
      }),
    );
  });

  it('throws a typed API error when the response is not ok', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      json: async () => ({ message: 'Bad request' }),
    });
    vi.stubGlobal('fetch', fetchMock);

    await expect(
      requestJson('/request-projects', {
        baseUrl: 'https://api.example.com',
        method: 'POST',
        body: { name: '' },
      }),
    ).rejects.toEqual(
      expect.objectContaining<ApiError>({
        message: 'Bad request',
        status: 400,
      }),
    );
  });
});

describe('requestFormData', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('submits form data without overriding the multipart headers', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ filename: 'stored-file.step' }],
    });
    vi.stubGlobal('fetch', fetchMock);

    const formData = new FormData();
    formData.append('files', new Blob(['demo']), 'demo.step');

    await requestFormData('/request-projects/upload-files', formData, {
      baseUrl: 'https://api.example.com',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      'https://api.example.com/request-projects/upload-files',
      expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        body: formData,
      }),
    );
  });
});
