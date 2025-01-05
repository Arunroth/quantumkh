import { Wrench, Maximize2, Clock, Activity } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Machines() {
  const { machines } = useContent();

  return (
    <div className="pt-20 pb-16 bg-gray-50 dark:bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Our Machine Shop</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            State-of-the-art equipment for precision manufacturing
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {machines.map((machine) => (
            <div key={machine.id} className="bg-white dark:bg-dark-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-64">
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="w-full h-full object-cover mix-blend-normal dark:filter-none"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button className="btn-primary">
                    View Details
                  </button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{machine.name}</h3>
                <p className="mt-2 text-sm text-primary-500">{machine.type}</p>
                <p className="mt-3 text-gray-600 dark:text-gray-300">{machine.description}</p>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Maximize2 className="h-5 w-5 text-primary-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{machine.workspace}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-primary-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{machine.speed}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-primary-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{machine.accuracy}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wrench className="h-5 w-5 text-primary-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{machine.materials}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}