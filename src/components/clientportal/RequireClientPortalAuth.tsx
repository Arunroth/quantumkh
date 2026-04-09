import { ReactElement } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useClientPortalAuth } from '../../hooks/useClientPortalAuth.ts';

export default function RequireClientPortalAuth({
  children,
}: {
  children: ReactElement;
}) {
  const { isAuthenticated, isLoading } = useClientPortalAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading client portal...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/client/login"
        state={{ from: `${location.pathname}${location.search}` }}
        replace
      />
    );
  }

  return children;
}
