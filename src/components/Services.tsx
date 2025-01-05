import { useContent } from '../context/ContentContext';

export default function Services() {
  const { services } = useContent();

  return (
    <div className="bg-white dark:bg-dark-900 py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-dark-900 dark:text-white sm:text-4xl">
            Manufacturing Solutions
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Discover our comprehensive range of services
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative group bg-gray-50 dark:bg-dark-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={service.image}
                  alt={service.name}
                  className="object-contain w-full h-48 group-hover:scale-105 transition-transform duration-300 mix-blend-normal dark:filter-none"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-dark-900 dark:text-white">{service.name}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">{service.description}</p>
                <div className="mt-4">
                  <a
                    href="#"
                    className="text-primary-500 hover:text-primary-600 dark:text-primary-400 dark:hover:text-primary-300 font-medium inline-flex items-center"
                  >
                    Learn more
                    <svg
                      className="ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}