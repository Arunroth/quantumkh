import { useEffect, useState } from 'react';

import { listClientPortalInvoices } from '../../lib/api/clientPortal.ts';
import { ClientPortalInvoiceListItem } from '../../lib/types/clientPortal.ts';
import { useClientPortalAuth } from '../../hooks/useClientPortalAuth.ts';
import { formatPortalCurrency, formatPortalDate } from './clientPortal.utils';

export default function ClientPortalInvoices() {
  const { user } = useClientPortalAuth();
  const [invoices, setInvoices] = useState<ClientPortalInvoiceListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.accessMode === 'quote-review') {
      setIsLoading(false);
      return;
    }

    const run = async () => {
      try {
        setInvoices(await listClientPortalInvoices());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load invoices.');
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [user?.accessMode]);

  if (user?.accessMode === 'quote-review') {
    return (
      <div className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-8 text-gray-600 dark:text-gray-300">
        Invoice access is not available in quote-review sessions.
      </div>
    );
  }

  if (isLoading) {
    return <div className="text-gray-600 dark:text-gray-300">Loading invoices...</div>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-900/20 dark:text-red-200">
        {error}
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-8 text-gray-600 dark:text-gray-300">
        No invoices are available yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {invoices.map((invoice) => (
        <div
          key={invoice.id}
          className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-6"
        >
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {invoice.invoiceNo || invoice.id}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                Project ID: {invoice.projectId || 'N/A'}
              </p>
            </div>
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
              {invoice.status || 'Unknown'}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-300">
            <p>Total: {formatPortalCurrency(invoice.grandTotal, invoice.currency || 'USD')}</p>
            <p>Issued: {formatPortalDate(invoice.createdAt)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
