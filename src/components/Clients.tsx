import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useContent } from '../context/ContentContext';

export default function Clients() {
  const { clients } = useContent();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % clients.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + clients.length) % clients.length);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (sliderRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-dark-800 py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Delivering excellence to companies worldwide
          </p>
        </div>

        <div className="mt-16 relative">
          <div 
            ref={sliderRef}
            className="overflow-x-auto whitespace-nowrap hide-scrollbar cursor-grab active:cursor-grabbing"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            <div className="inline-flex space-x-8 select-none mb-2">
              {clients.map((client) => (
                <div
                  key={client.id}
                  className="flex-none w-96"
                >
                  <div className="bg-white dark:bg-dark-900 rounded-lg p-8 shadow-lg">
                    <div className="flex items-center justify-center h-32 mb-6">
                      <img
                        className="h-24 object-contain mix-blend-normal dark:filter-none"
                        src={client.logo}
                        alt={client.name}
                      />
                    </div>
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{client.name}</h3>
                      <p className="text-primary-500 font-medium mt-2">{client.industry}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{client.type}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 relative">
          <div className="relative h-80 overflow-hidden">
            {clients.map((client, index) => (
              <div
                key={client.id}
                className={`absolute inset-0 transition-opacity duration-500 ${
                  index === currentTestimonial ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="flex space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-primary-500" fill="currentColor" />
                    ))}
                  </div>
                  <blockquote className="text-xl font-medium text-gray-900 dark:text-white max-w-3xl">
                    "{client.testimonial || 'Trusted partner in manufacturing excellence.'}"
                  </blockquote>
                  <div className="mt-4">
                    <p className="text-base font-semibold text-gray-900 dark:text-white">{client.author || client.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{client.role || 'Partner'}</p>
                    <p className="text-sm text-primary-500">{client.industry} | {client.type}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-dark-900 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-dark-900 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-dark-800 transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-gray-600 dark:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
