import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { listClientPortalQuotes } from '../../lib/api/clientPortal.ts';
import { ClientPortalQuoteListItem } from '../../lib/types/clientPortal.ts';
import { useClientPortalAuth } from '../../hooks/useClientPortalAuth.ts';
import { formatPortalCurrency, formatPortalDate } from './clientPortal.utils';

export default function ClientPortalQuotes() {
  const { user } = useClientPortalAuth();
  const [quotes, setQuotes] = useState<ClientPortalQuoteListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.accessMode === 'quote-review') {
      setIsLoading(false);
      return;
    }

    const run = async () => {
      try {
        setQuotes(await listClientPortalQuotes());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load quotes.');
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [user?.accessMode]);

  if (user?.accessMode === 'quote-review') {
    return (
      <div className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-8 text-gray-600 dark:text-gray-300">
        This session is limited to a single quote review. Open the quote detail page from the review
        link instead of the full quotes workspace.
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-gray-600 dark:text-gray-300">Loading quotes...</div>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-900/20 dark:text-red-200">
        {error}
      </div>
    );
  }

  if (quotes.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-8 text-gray-600 dark:text-gray-300">
        No quotes are available yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {quotes.map((quote) => (
        <Link
          key={quote.quoteRevisionId}
          to={`/client/quotes/${quote.quoteId}`}
          className="block rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-6 hover:border-primary-400 transition-colors"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {quote.quoteNo}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                {quote.projectName}
              </p>
            </div>
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
              {quote.reviewStatus}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3 text-sm text-gray-600 dark:text-gray-300">
            <p>Revision: {quote.revisionNo}</p>
            <p>Total: {formatPortalCurrency(quote.grandTotal, quote.currency)}</p>
            <p>Sent: {formatPortalDate(quote.sentAt)}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
