import { Settings, Clock, Shield, Zap } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const iconMap: { [key: string]: any } = {
  Settings,
  Clock,
  Shield,
  Zap,
};

export default function Features() {
  const { features } = useContent();

  return (
    <div className="bg-gray-50 dark:bg-dark-800 py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Industrial Excellence
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Cutting-edge manufacturing solutions powered by innovation!
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = iconMap[feature.icon];
              return (
                <div key={feature.id} className="relative group">
                  <div className="absolute flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-400/20">
                    {Icon && <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />}
                  </div>
                  <div className="ml-16">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{feature.name}</h3>
                    <p className="mt-2 text-base text-gray-600 dark:text-gray-300">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}