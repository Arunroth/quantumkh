import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { useClientPortalAuth } from '../../hooks/useClientPortalAuth.ts';
import { readClientPortalReviewToken } from './clientPortal.utils';

export default function ClientPortalReviewExchange() {
  const { exchangeReviewLink } = useClientPortalAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const token = readClientPortalReviewToken(location.search);
    if (!token) {
      setError('The review link is missing a token.');
      return;
    }

    const run = async () => {
      try {
        const response = await exchangeReviewLink(token);
        navigate(`/client/quotes/${response.quoteId}`, { replace: true });
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Unable to validate the review link.',
        );
      }
    };

    void run();
  }, [exchangeReviewLink, location.search, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-xl rounded-2xl bg-white dark:bg-dark-800 shadow-xl border border-gray-200 dark:border-dark-700 p-8 text-center">
        {!error ? (
          <>
            <div className="h-12 w-12 rounded-full border-4 border-primary-200 border-t-primary-500 animate-spin mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Opening your quote review
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              We&apos;re validating your secure review link and signing you into the portal.
            </p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Unable to open quote review
            </h1>
            <p className="text-gray-600 dark:text-gray-300">{error}</p>
          </>
        )}
      </div>
    </div>
  );
}
