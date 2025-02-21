import { Bell, Search } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';

export default function AdminHeader() {
  return (
    <header className="bg-white dark:bg-dark-900 shadow-sm">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Search className="h-5 w-5 text-gray-400" />
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="form-input pl-10 pr-4 py-2 border-gray-300 dark:border-gray-700 rounded-md bg-gray-50 dark:bg-dark-800 text-gray-900 dark:text-gray-100 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="relative p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500">
              <Bell className="h-6 w-6" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary-500"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}