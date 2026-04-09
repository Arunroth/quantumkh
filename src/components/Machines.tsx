import { Wrench, Maximize2, Clock, Activity } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Machines() {
  const { machines } = useContent();

  return (
    <div className="bg-white pb-24 pt-24 transition-colors dark:bg-dark-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">Our Machine Shop</h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            State-of-the-art equipment for precision manufacturing
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {machines.map((machine) => (
            <div key={machine.id} className="cursor-auto overflow-hidden rounded-lg bg-gray-50 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-800 dark:shadow-black/30 dark:hover:shadow-black/40">
              <div className="relative h-64">
                <img
                  src={machine.image}
                  alt={machine.name}
                  className="h-full w-full object-contain mix-blend-normal dark:filter-none"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{machine.name}</h3>
                <p className="mt-2 text-sm text-primary-500">{machine.type}</p>
                <p className="mt-4 text-gray-600 dark:text-gray-300">{machine.description}</p>

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