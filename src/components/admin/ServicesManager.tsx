import { useEffect, useState } from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { contentManager, Service } from '../../utils/contentManager';

const initialServices = [
  {
    id: 1,
    name: 'CNC Machining',
    description: 'High-precision parts manufacturing',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1565962768804-b667f1d18a55?auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    name: '3D Printing',
    description: 'Rapid prototyping solutions',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1631468182740-de6e6ee1dc66?auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    name: 'Injection Molding',
    description: 'Mass production capabilities',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1581091226825-c6a89e7e4801?auto=format&fit=crop&q=80'
  },
];

export default function ServicesManager() {
  const [services, setServices] = useState<Service[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    const fetch = async () => {
      try {
        setServices(await contentManager.getServices());
      } catch (error) {
        console.error('Error fetching service:', error);
      }
    };

    fetch();
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Services Management</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add New Service
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="bg-white dark:bg-dark-900 overflow-hidden shadow rounded-lg"
          >
            <div className="relative h-48">
              <img
                src={service.image}
                alt={service.name}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  className="p-2 bg-white dark:bg-dark-900 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                  onClick={() => { }}
                >
                  <Edit2 className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                </button>
                <button
                  className="p-2 bg-white dark:bg-dark-900 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-dark-800 transition-colors"
                  onClick={() => { }}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">{service.name}</h3>
                <span className="px-2 py-1 text-xs font-medium text-green-800 dark:text-green-400 bg-green-100 dark:bg-green-900 rounded-full">
                  {'Active'}
                </span>
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{service.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-500 dark:text-gray-400">Last updated: Today</span>
                <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-dark-900 rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Add New Service</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Service Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Image URL
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-700 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}