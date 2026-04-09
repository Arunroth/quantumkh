import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { listClientPortalProjects } from '../../lib/api/clientPortal.ts';
import { ClientPortalProjectListItem } from '../../lib/types/clientPortal.ts';
import { formatPortalDate } from './clientPortal.utils';

export default function ClientPortalProjects() {
  const [projects, setProjects] = useState<ClientPortalProjectListItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const run = async () => {
      try {
        setProjects(await listClientPortalProjects());
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unable to load projects.');
      } finally {
        setIsLoading(false);
      }
    };

    void run();
  }, []);

  if (isLoading) {
    return <div className="text-gray-600 dark:text-gray-300">Loading projects...</div>;
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-900/20 dark:text-red-200">
        {error}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-8 text-gray-600 dark:text-gray-300">
        No portal projects are available yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/client/projects/${project.id}`}
          className="rounded-2xl bg-white dark:bg-dark-800 shadow-sm border border-gray-200 dark:border-dark-700 p-6 hover:border-primary-400 transition-colors"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {project.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                Tracking code: {project.trackingCode || 'Pending'}
              </p>
            </div>
            <span className="rounded-full bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-700 dark:bg-primary-500/10 dark:text-primary-300">
              {project.clientTrackingStage}
            </span>
          </div>

          <div className="mt-4 space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <p>Status: {project.status}</p>
            <p>Created: {formatPortalDate(project.createdAt)}</p>
            {project.sourceQuoteNo && <p>Quote: {project.sourceQuoteNo}</p>}
            {project.blockedReason && <p>Blocked reason: {project.blockedReason}</p>}
          </div>
        </Link>
      ))}
    </div>
  );
}
