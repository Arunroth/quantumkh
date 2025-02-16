import { ArrowRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';
import { Link } from 'react-router-dom';

export default function Hero() {
  const { hero } = useContent();

  return (
    <div className="relative bg-white dark:bg-dark-900 pt-16 transition-colors">
      <div className="absolute inset-0 bg-gradient-to-r from-primary-100/20 to-primary-200/20 dark:from-primary-400/5 dark:to-primary-500/5 h-3/4" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-dark-900 dark:text-white leading-tight">
              {hero.title}
              <span className="block text-primary-500">{hero.subtitle}.</span>
            </h1>
            <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
              {hero.description}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/not-implemented" className="btn-primary">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link to="/services" className="btn-secondary">
                Explore Services
              </Link>
            </div>
          </div>
          <div className="relative">
            <img
              src={hero.banner}
              alt="Manufacturing process"
              className="rounded-lg shadow-xl mix-blend-normal dark:filter-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
}