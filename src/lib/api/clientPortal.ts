import {
  ClientPortalInvoiceListItem,
  ClientPortalLoginInput,
  ClientPortalLoginResponse,
  ClientPortalProjectDetail,
  ClientPortalProjectListItem,
  ClientPortalQuoteDetail,
  ClientPortalQuoteListItem,
  ClientPortalReviewExchangeResponse,
  ClientPortalSessionResponse,
} from '../types/clientPortal.ts';
import { requestJson } from './http.ts';

export async function loginClientPortal(
  payload: ClientPortalLoginInput,
): Promise<ClientPortalLoginResponse> {
  return requestJson<ClientPortalLoginResponse>('/client-portal/auth/login', {
    method: 'POST',
    body: payload,
  });
}

export async function getClientPortalSession(): Promise<ClientPortalSessionResponse> {
  return requestJson<ClientPortalSessionResponse>('/client-portal/auth/me', {
    method: 'GET',
  });
}

export async function exchangeClientPortalReviewLink(
  token: string,
): Promise<ClientPortalReviewExchangeResponse> {
  return requestJson<ClientPortalReviewExchangeResponse>(
    '/client-portal/auth/review-link/exchange',
    {
      method: 'POST',
      body: { token },
    },
  );
}

export async function logoutClientPortal(): Promise<{ ok: boolean }> {
  return requestJson<{ ok: boolean }>('/client-portal/auth/logout', {
    method: 'POST',
  });
}

export async function listClientPortalProjects(): Promise<
  ClientPortalProjectListItem[]
> {
  return requestJson<ClientPortalProjectListItem[]>('/client-portal/projects/me', {
    method: 'GET',
  });
}

export async function getClientPortalProject(
  projectId: string,
): Promise<ClientPortalProjectDetail> {
  return requestJson<ClientPortalProjectDetail>(
    `/client-portal/projects/${encodeURIComponent(projectId)}`,
    {
      method: 'GET',
    },
  );
}

export async function listClientPortalQuotes(): Promise<ClientPortalQuoteListItem[]> {
  return requestJson<ClientPortalQuoteListItem[]>('/client-portal/quotes/me', {
    method: 'GET',
  });
}

export async function getClientPortalQuote(
  quoteId: string,
): Promise<ClientPortalQuoteDetail> {
  return requestJson<ClientPortalQuoteDetail>(
    `/client-portal/quotes/${encodeURIComponent(quoteId)}`,
    {
      method: 'GET',
    },
  );
}

export async function acknowledgeClientPortalQuote(
  quoteRevisionId: string,
  acknowledgementNote?: string,
): Promise<{ ok: boolean }> {
  return requestJson<{ ok: boolean }>(
    `/client-portal/quotes/${encodeURIComponent(quoteRevisionId)}/acknowledge`,
    {
      method: 'POST',
      body: { acknowledgementNote },
    },
  );
}

export async function rejectClientPortalQuote(
  quoteRevisionId: string,
  rejectionNote?: string,
): Promise<{ ok: boolean }> {
  return requestJson<{ ok: boolean }>(
    `/client-portal/quotes/${encodeURIComponent(quoteRevisionId)}/reject`,
    {
      method: 'POST',
      body: { rejectionNote },
    },
  );
}

export async function listClientPortalInvoices(): Promise<
  ClientPortalInvoiceListItem[]
> {
  return requestJson<ClientPortalInvoiceListItem[]>(
    '/client-portal/invoices/me',
    {
      method: 'GET',
    },
  );
}
