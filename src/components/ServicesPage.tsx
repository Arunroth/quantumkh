import { ArrowRight, Settings, Clock, Shield, Wrench } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import {Link} from "react-router-dom";

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
    <div className="bg-white pb-24 pt-24 transition-colors dark:bg-dark-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Manufacturing Services
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-gray-300">
            From prototype to production, we offer comprehensive manufacturing solutions tailored to your needs
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg bg-gray-50 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-800 dark:shadow-black/30 dark:hover:shadow-black/40"
            >
              <div className="aspect-w-16 aspect-h-9 pt-6">
                <img
                  src={service.image}
                  alt={service.name}
                  className="h-48 w-full object-contain mix-blend-normal dark:filter-none"
                />
              </div>
              <div className="p-8">
                <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
                  {service.name}
                </h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300" style={{ whiteSpace: "pre-line" }}>
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          {additionalServices.map((service, index) => (
            <div
              key={index}
              className="rounded-lg bg-gray-50 p-8 shadow-lg transition-shadow hover:shadow-xl dark:bg-dark-800 dark:shadow-black/30 dark:hover:shadow-black/40"
            >
              <div className="mb-4 flex items-center">
                <div className="rounded-lg bg-primary-100 p-2 dark:bg-primary-900/20">
                  <service.icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                  {service.name}
                </h3>
              </div>
              <p className="mb-4 text-gray-600 dark:text-gray-300" style={{ whiteSpace: "pre-line" }}>
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
            <Link  to="/request-project" className="rounded-md bg-white px-8 py-3 font-semibold text-primary-600 transition-colors hover:bg-gray-100 dark:bg-gray-100 dark:hover:bg-white">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
