import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getClientPortalProject } from '../../lib/api/clientPortal.ts';
import { ClientPortalProjectDetail as ClientPortalProjectDetailType } from '../../lib/types/clientPortal.ts';
import { formatPortalDate } from './clientPortal.utils';

export default function ClientPortalProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<ClientPortalProjectDetailType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      if (!projectId) {
        setError('Project not found.');
        setIsLoading(false);
        return;
      }

      try {
        setProject(await getClientPortalProject(projectId));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load the project.');
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, [projectId]);

  if (isLoading) {
    return <div className="text-gray-600 dark:text-gray-300">Loading project...</div>;
  }

  if (error || !project) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-900/20 dark:text-red-200">
        {error || 'Unable to load the project.'}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-primary-600 dark:text-primary-400">
              Project overview
            </p>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mt-2">
              {project.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-300 mt-2">
              Current stage: {project.clientTrackingStage}
            </p>
          </div>
          {project.sourceQuoteId && (
            <Link
              to={`/client/quotes/${project.sourceQuoteId}`}
              className="rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-400"
            >
              View quote
            </Link>
          )}
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-300">
          <p>Status: {project.status}</p>
          <p>Created: {formatPortalDate(project.createdAt)}</p>
          <p>Client: {project.client?.name || 'N/A'}</p>
          <p>Client email: {project.client?.email || 'N/A'}</p>
          {project.blockedReason && <p>Blocked reason: {project.blockedReason}</p>}
          {project.sourceQuoteNo && <p>Quote number: {project.sourceQuoteNo}</p>}
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Timeline</h3>
        <div className="space-y-6">
          {project.stages.map((stage) => {
            const latestUpdate = stage.updates[stage.updates.length - 1];
            return (
              <div key={stage.stage} className="border-l-2 border-gray-200 dark:border-dark-600 pl-4">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {stage.stage}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-300 mt-1">
                  {stage.isCurrent ? 'Current stage' : 'Completed or upcoming stage'}
                </p>
                {latestUpdate ? (
                  <div className="mt-3">
                    <p className="text-sm text-gray-900 dark:text-white">{latestUpdate.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {latestUpdate.description}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {formatPortalDate(latestUpdate.happenedAt)}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-300 mt-3">
                    No public update yet.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Invoices</h3>
        {project.invoices.length > 0 ? (
          <div className="space-y-3">
            {project.invoices.map((invoice) => (
              <div
                key={invoice.id}
                className="rounded-lg border border-gray-200 dark:border-dark-600 px-4 py-3 text-sm text-gray-700 dark:text-gray-200"
              >
                <p className="font-medium">{invoice.invoiceNo || invoice.id}</p>
                <p className="text-gray-500 dark:text-gray-300">
                  Status: {invoice.status || 'Unknown'}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 dark:text-gray-300">
            No invoices are attached to this project yet.
          </p>
        )}
      </div>
    </div>
  );
}
