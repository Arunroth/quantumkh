import { ReactNode, useCallback, useMemo, useState } from 'react';

import {
  loginClientPortal,
  logoutClientPortal,
} from '../lib/api/clientPortal.ts';
import {
  ClientPortalLoginInput,
  ClientPortalUser,
} from '../lib/types/clientPortal.ts';
import {
  ClientPortalAuthContext,
  ClientPortalAuthContextValue,
} from './clientPortalAuth-context.ts';

export function ClientPortalAuthProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [user, setUser] = useState<ClientPortalUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // const refreshSession = useCallback(async (): Promise<ClientPortalUser | null> => {
  //   try {
  //     const response = await getClientPortalSession();
  //     setUser(response.user);
  //     return response.user;
  //   } catch {
  //     setUser(null);
  //     return null;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   void refreshSession();
  // }, [refreshSession]);

  const login = useCallback(async (payload: ClientPortalLoginInput): Promise<ClientPortalUser> => {
    setIsLoading(true);
    try {
      const response = await loginClientPortal(payload);
      setUser(response.user);
      return response.user;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    try {
      await logoutClientPortal();
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // const exchangeReviewLink = useCallback(async (
  //   token: string,
  // ): Promise<ClientPortalReviewExchangeResponse> => {
  //   setIsLoading(true);
  //   try {
  //     const response = await exchangeClientPortalReviewLink(token);
  //     await refreshSession();
  //     return response;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }, [refreshSession]);

  const value = useMemo<ClientPortalAuthContextValue>(
    () => ({
      user,
      isAuthenticated: user !== null,
      isLoading,
      login,
      logout,
      // refreshSession,
      // exchangeReviewLink,
    }),
    [user, isLoading, login, logout, // refreshSession,
     // exchangeReviewLink
    ],
  );

  return (
    <ClientPortalAuthContext.Provider value={value}>
      {children}
    </ClientPortalAuthContext.Provider>
  );
}
