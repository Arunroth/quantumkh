import { ArrowRight, Settings, Clock, Shield, Wrench } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function ServicesPage() {
  const { services } = useContent();

  const additionalServices = [
    {
      name: 'Design Consultation',
      description: 'Expert guidance on design optimization for manufacturing',
      icon: Settings,
      features: ['CAD/CAM Support', 'Design for Manufacturing (DFM)', 'Material Selection']
    },
    {
      name: 'Rapid Prototyping',
      description: 'Quick turnaround for prototype development',
      icon: Clock,
      features: ['24-48 Hour Service', 'Multiple Iterations', 'Functional Testing']
    },
    {
      name: 'Quality Assurance',
      description: 'Comprehensive quality control and inspection',
      icon: Shield,
      features: ['CMM Inspection', 'Material Certification', 'First Article Inspection']
    },
    {
      name: 'Production Manufacturing',
      description: 'High-volume production capabilities',
      icon: Wrench,
      features: ['Volume Discounts', 'JIT Manufacturing', 'Assembly Services']
    }
  ];

  return (
    <div className="pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Manufacturing Services
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            From prototype to production, we offer comprehensive manufacturing solutions tailored to your needs
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-900 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-contain"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {service.name}
                </h3>
                {/* ✅ FIX: Ensure new lines display correctly */}
                <p className="text-gray-600 dark:text-gray-300 mb-4" style={{ whiteSpace: "pre-line" }}>
                  {service.description}
                </p>
                <button className="btn-primary">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {additionalServices.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-dark-900 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
                  <service.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="ml-3 text-xl font-semibold text-gray-900 dark:text-white">
                  {service.name}
                </h3>
              </div>
              {/* ✅ FIX: Ensure new lines display correctly */}
              <p className="text-gray-600 dark:text-gray-300 mb-4" style={{ whiteSpace: "pre-line" }}>
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-gray-600 dark:text-gray-300">
                    <ArrowRight className="h-4 w-4 text-primary-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-primary-500 dark:bg-primary-600 rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-12 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Start Your Project?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Contact us today to discuss your manufacturing needs and get a custom quote
            </p>
            <button className="bg-white text-primary-600 hover:bg-gray-100 px-8 py-3 rounded-md font-semibold transition-colors">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
