import { FileText, FolderKanban, LogOut, Package } from 'lucide-react';
import { NavLink, Outlet } from 'react-router-dom';

import { useClientPortalAuth } from '../../hooks/useClientPortalAuth.ts';
import ThemeToggle from '../ThemeToggle';

const navigation = [
  { label: 'Projects', to: '/client/projects', icon: FolderKanban },
  { label: 'Quotes', to: '/client/quotes', icon: FileText },
  { label: 'Invoices', to: '/client/invoices', icon: Package },
];

export default function ClientPortalLayout() {
  const { logout, user } = useClientPortalAuth();
  const hasWorkspaceAccess = user?.accessMode !== 'quote-review';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 transition-colors">
      <header className="border-b border-gray-200 dark:border-dark-700 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-primary-600 dark:text-primary-400">
              Quantum KH Client Portal
            </p>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {hasWorkspaceAccess ? 'Your projects, quotes, and invoices' : 'Quote review access'}
            </h1>
            {user?.fullName && (
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                Signed in as {user.fullName}
                {user.email ? ` (${user.email})` : ''}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => void logout()}
              className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 dark:bg-primary-500 dark:hover:bg-primary-400"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {hasWorkspaceAccess ? (
          <nav className="flex flex-wrap gap-3 mb-8">
            {navigation.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-dark-800 dark:text-gray-200 dark:hover:bg-dark-700'
                  }`
                }
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>
        ) : (
          <div className="mb-8 rounded-lg border border-yellow-200 bg-yellow-50 px-4 py-3 text-sm text-yellow-800 dark:border-yellow-900/60 dark:bg-yellow-900/20 dark:text-yellow-200">
            This session is limited to a single quote review. Project and invoice workspace pages are hidden.
          </div>
        )}

        <Outlet />
      </div>
    </div>
  );
}
