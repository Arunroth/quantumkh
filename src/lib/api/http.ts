import { API_BASE_URL } from '../../utils/serviceManageer.ts';

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

type BaseRequestOptions = {
  baseUrl?: string;
  method?: string;
  credentials?: RequestCredentials;
  headers?: HeadersInit;
};

type JsonRequestOptions = BaseRequestOptions & {
  body?: unknown;
};

function trimTrailingSlashes(value: string): string {
  return value.replace(/\/+$/, '');
}

function normalizePath(path: string): string {
  return path.startsWith('/') ? path : `/${path}`;
}

export function buildApiUrl(path: string, baseUrl: string = API_BASE_URL): string {
  return `${trimTrailingSlashes(baseUrl)}${normalizePath(path)}`;
}

async function readResponseBody(response: Response): Promise<unknown> {
  const contentType = response.headers?.get?.('content-type') || '';
  if (contentType.includes('application/json') || typeof response.json === 'function') {
    try {
      return await response.json();
    } catch {
      // Fall through to text parsing when JSON parsing is unavailable or invalid.
    }
  }

  const text = typeof response.text === 'function' ? await response.text() : '';
  return text ? { message: text } : null;
}

function resolveErrorMessage(body: unknown, fallback: string): string {
  if (typeof body === 'string' && body.trim()) {
    return body;
  }

  if (
    body &&
    typeof body === 'object' &&
    'message' in body &&
    typeof body.message === 'string' &&
    body.message.trim()
  ) {
    return body.message;
  }

  return fallback;
}

async function performRequest<T>(
  path: string,
  init: RequestInit,
  baseUrl?: string,
): Promise<T> {
  const response = await fetch(buildApiUrl(path, baseUrl), init);
  const body = await readResponseBody(response);

  if (!response.ok) {
    throw new ApiError(
      resolveErrorMessage(body, `Request failed with status ${response.status}`),
      response.status,
      body,
    );
  }

  return body as T;
}

export async function requestJson<T>(
  path: string,
  options: JsonRequestOptions = {},
): Promise<T> {
  const { baseUrl, method = 'GET', body, credentials = 'include', headers } = options;

  return performRequest<T>(
    path,
    {
      method,
      credentials,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    },
    baseUrl,
  );
}

export async function requestFormData<T>(
  path: string,
  formData: FormData,
  options: BaseRequestOptions = {},
): Promise<T> {
  const { baseUrl, method = 'POST', credentials = 'include', headers } = options;

  return performRequest<T>(
    path,
    {
      method,
      credentials,
      headers,
      body: formData,
    },
    baseUrl,
  );
}
