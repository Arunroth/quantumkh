import { useContext } from 'react';

import { ClientPortalAuthContext } from '../context/clientPortalAuth-context.ts';

export function useClientPortalAuth() {
  const context = useContext(ClientPortalAuthContext);
  if (!context) {
    throw new Error('useClientPortalAuth must be used within a ClientPortalAuthProvider');
  }

  return context;
}
