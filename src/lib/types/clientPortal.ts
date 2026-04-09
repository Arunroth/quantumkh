export interface ClientPortalUser {
  sub: string;
  email?: string;
  fullName?: string;
  clientId?: string;
  scope?: string;
  accessMode?: 'client' | 'quote-review';
  quoteRevisionId?: string;
}

export interface ClientPortalSessionResponse {
  user: ClientPortalUser;
}

export interface ClientPortalLoginResponse extends ClientPortalSessionResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: string;
}

export interface ClientPortalReviewExchangeResponse {
  accessToken: string;
  tokenType: 'Bearer';
  expiresIn: string;
  quoteId: string;
  quoteRevisionId: string;
}

export interface ClientPortalLoginInput {
  email: string;
  password: string;
}

export interface ClientPortalProjectListItem {
  id: string;
  trackingCode?: string;
  name: string;
  status: string;
  clientTrackingStage: string;
  blockedReason?: string | null;
  sourceQuoteId?: string | null;
  sourceQuoteNo?: string | null;
  createdAt?: string;
}

export interface ClientPortalProjectDetail {
  id: string;
  name: string;
  status: string;
  clientTrackingStage: string;
  blockedReason: string | null;
  sourceQuoteId: string | null;
  sourceQuoteNo: string | null;
  client: {
    id: string;
    name: string;
    email: string | null;
  } | null;
  stages: Array<{
    stage: string;
    isCurrent: boolean;
    updates: Array<{
      id: string;
      title: string;
      description: string;
      imageUrl: string | null;
      happenedAt: string;
    }>;
  }>;
  updates: Array<{
    id: string;
    stage: string;
    title: string;
    description: string;
    imageUrl: string | null;
    happenedAt: string;
  }>;
  invoices: ClientPortalInvoiceListItem[];
  createdAt: string;
}

export interface ClientPortalQuoteListItem {
  quoteId: string;
  quoteRevisionId: string;
  quoteNo: string;
  projectName: string;
  revisionNo: number;
  reviewStatus: string;
  sentAt: string | null;
  viewedAt: string | null;
  acknowledgedAt: string | null;
  grandTotal: string;
  currency: string;
  hasPdf?: boolean;
}

export interface ClientPortalQuoteDetail extends ClientPortalQuoteListItem {
  subtotal: string;
  taxAmount: string;
  discountAmount: string;
  paymentTermsText: string | null;
  items: Array<{
    id: string;
    description: string;
    quantity: number | string;
    unitPrice: string;
    lineTotal: string;
  }>;
  documents: Array<{
    variant: string;
    downloadPath: string;
  }>;
}

export interface ClientPortalInvoiceListItem {
  id: string;
  projectId?: string | null;
  invoiceNo?: string;
  status?: string;
  grandTotal?: string;
  currency?: string;
  createdAt?: string | null;
}
