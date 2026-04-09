import { FormEvent, useMemo, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { useClientPortalAuth } from '../../hooks/useClientPortalAuth.ts';
import { resolveClientPortalNextPath } from './clientPortal.utils';

export default function ClientPortalLogin() {
  const { isAuthenticated, isLoading, login } = useClientPortalAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const nextPath = useMemo(
    () => resolveClientPortalNextPath(location.state?.from),
    [location.state],
  );

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (isAuthenticated && !isLoading) {
    return <Navigate to={nextPath} replace />;
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      await login({
        email,
        password,
      });
      navigate(nextPath, { replace: true });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to sign in to the client portal.';
      setError(message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-white dark:bg-dark-800 shadow-xl border border-gray-200 dark:border-dark-700 p-8">
        <p className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2">
          Quantum KH Client Portal
        </p>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Sign in</h1>
        <p className="mt-3 text-gray-600 dark:text-gray-300">
          Access your projects, quotes, and invoices with your client portal account.
        </p>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="block w-full rounded-md border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 px-3 py-2 text-gray-900 dark:text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="buyer@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="block w-full rounded-md border border-gray-300 dark:border-dark-600 bg-white dark:bg-dark-900 px-3 py-2 text-gray-900 dark:text-white focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Password"
            />
          </div>

          {error && (
            <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-900/20 dark:text-red-200">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-md bg-primary-500 px-4 py-2 text-sm font-semibold text-white hover:bg-primary-400 disabled:opacity-60"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}
