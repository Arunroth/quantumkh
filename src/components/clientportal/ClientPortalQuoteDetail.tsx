import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  acknowledgeClientPortalQuote,
  getClientPortalQuote,
  rejectClientPortalQuote,
} from '../../lib/api/clientPortal.ts';
import { buildApiUrl } from '../../lib/api/http.ts';
import { ClientPortalQuoteDetail as ClientPortalQuoteDetailType } from '../../lib/types/clientPortal.ts';
import { useClientPortalAuth } from '../../hooks/useClientPortalAuth.ts';
import { formatPortalCurrency, formatPortalDate } from './clientPortal.utils';

export default function ClientPortalQuoteDetail() {
  const { quoteId } = useParams<{ quoteId: string }>();
  const { user } = useClientPortalAuth();
  const [quote, setQuote] = useState<ClientPortalQuoteDetailType | null>(null);
  const [note, setNote] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const canRespond = useMemo(
    () =>
      quote?.reviewStatus !== 'ACKNOWLEDGED' &&
      quote?.reviewStatus !== 'REJECTED' &&
      Boolean(quote?.quoteRevisionId),
    [quote],
  );

  useEffect(() => {
    const run = async () => {
      if (!quoteId) {
        setError('Quote not found.');
        setIsLoading(false);
        return;
      }

      try {
        setQuote(await getClientPortalQuote(quoteId));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load the quote.');
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [quoteId]);

  const refreshQuote = async () => {
    if (!quoteId) return;
    setQuote(await getClientPortalQuote(quoteId));
  };

  const handleAcknowledge = async () => {
    if (!quote?.quoteRevisionId) return;
    setIsSubmitting(true);
    setFeedback('');
    setError('');
    try {
      await acknowledgeClientPortalQuote(quote.quoteRevisionId, note || undefined);
      await refreshQuote();
      setFeedback('Quote acknowledged successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to acknowledge this quote.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!quote?.quoteRevisionId) return;
    setIsSubmitting(true);
    setFeedback('');
    setError('');
    try {
      await rejectClientPortalQuote(quote.quoteRevisionId, note || undefined);
      await refreshQuote();
      setFeedback('Quote rejected successfully.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to reject this quote.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return <div className="text-gray-600 dark:text-gray-300">Loading quote...</div>;
  }

  if (error && !quote) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-900/20 dark:text-red-200">
        {error}
      </div>
    );
  }

  if (!quote) {
    return null;
  }

  return (
    <div className="space-y-6">
      {user?.accessMode === 'quote-review' && (
        <div className="rounded-lg border border-primary-200 bg-primary-50 px-4 py-3 text-sm text-primary-800 dark:border-primary-900/60 dark:bg-primary-500/10 dark:text-primary-200">
          This secure session is limited to quote review actions for the shared revision.
        </div>
      )}

      <div className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
              Quote overview
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
              {quote.quoteNo}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">{quote.projectName}</p>
          </div>
          <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
            {quote.reviewStatus}
          </span>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <p>Revision: {quote.revisionNo}</p>
          <p>Total: {formatPortalCurrency(quote.grandTotal, quote.currency)}</p>
          <p>Sent: {formatPortalDate(quote.sentAt)}</p>
          <p>Viewed: {formatPortalDate(quote.viewedAt)}</p>
          <p>Acknowledged: {formatPortalDate(quote.acknowledgedAt)}</p>
          <p>Payment terms: {quote.paymentTermsText || 'Not specified'}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quote items</h3>
        <div className="space-y-3">
          {quote.items.map((item) => (
            <div
              key={item.id}
              className="rounded-lg border border-gray-200 dark:border-dark-600 px-4 py-3"
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.description}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-300">
                    Qty: {item.quantity}
                  </p>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <p>Unit: {formatPortalCurrency(item.unitPrice, quote.currency)}</p>
                  <p>Total: {formatPortalCurrency(item.lineTotal, quote.currency)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Documents</h3>
        <div className="flex flex-wrap gap-3">
          {quote.documents.map((document) => (
            <a
              key={document.variant}
              href={buildApiUrl(document.downloadPath)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-400"
            >
              Download {document.variant}
            </a>
          ))}
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Review actions</h3>
        <textarea
          value={note}
          onChange={(event) => setNote(event.target.value)}
          rows={4}
          placeholder="Optional note for acknowledgement or rejection"
          className="block w-full rounded-md border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 px-3 py-2 text-gray-900 dark:text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />

        {feedback && (
          <p className="mt-4 text-sm text-green-700 dark:text-green-300">{feedback}</p>
        )}
        {error && (
          <p className="mt-4 text-sm text-red-700 dark:text-red-300">{error}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => void handleAcknowledge()}
            disabled={!canRespond || isSubmitting}
            className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-400 disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Acknowledge quote'}
          </button>
          <button
            onClick={() => void handleReject()}
            disabled={!canRespond || isSubmitting}
            className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-500 disabled:opacity-60"
          >
            {isSubmitting ? 'Submitting...' : 'Reject quote'}
          </button>
        </div>
      </div>
    </div>
  );
}
