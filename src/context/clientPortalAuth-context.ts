import { createContext } from 'react';

import {
  ClientPortalLoginInput,
  ClientPortalUser,
} from '../lib/types/clientPortal.ts';

export interface ClientPortalAuthContextValue {
  user: ClientPortalUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: ClientPortalLoginInput) => Promise<ClientPortalUser>;
  logout: () => Promise<void>;
  // refreshSession: () => Promise<ClientPortalUser | null>;
  // exchangeReviewLink: (token: string) => Promise<ClientPortalReviewExchangeResponse>;
}

export const ClientPortalAuthContext = createContext<
  ClientPortalAuthContextValue | undefined
>(undefined);
