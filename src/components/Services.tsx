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
                <p className="mt-2 text-gray-600 dark:text-gray-300"  style={{ whiteSpace: "pre-line" }}>{service.description}</p>
                <div className="mt-4">
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}