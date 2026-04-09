import { Navigate } from 'react-router-dom';

import { useClientPortalAuth } from '../../hooks/useClientPortalAuth.ts';

export default function ClientPortalLanding() {
  const { user } = useClientPortalAuth();

  if (user?.accessMode === 'quote-review') {
    return (
      <div className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
          Quote review session
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          This session only has access to a specific quote review. Use the emailed review link to
          open the quote detail page directly.
        </p>
      </div>
    );
  }

  return <Navigate to="/client/projects" replace />;
}
