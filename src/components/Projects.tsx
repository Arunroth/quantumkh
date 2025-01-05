import { ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Projects() {
  const { projects } = useContent();

  return (
    <div className="bg-white dark:bg-dark-900 py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Featured Projects
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Showcasing our expertise in precision manufacturing
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-gray-50 dark:bg-dark-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-contain mix-blend-normal dark:filter-none"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-primary-500">{project.client}</p>
                  </div>
                  <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full text-sm">
                    {project.completion}
                  </span>
                </div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {project.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Category: {project.category}
                  </span>
                  <button className="inline-flex items-center text-primary-500 hover:text-primary-600">
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <button className="btn-primary">
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}