import { useEffect, useRef, useState } from "react";
import { useContent } from "../context/ContentContext";

export default function Clients() {
  const { clients } = useContent();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Double the clients list to create a looping effect
  const extendedClients = [...clients, ...clients];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    let scrollSpeed = 2; // Pixels per frame
    let requestId: number;

    const autoScroll = () => {
      if (!isPaused) {
        slider.scrollLeft += scrollSpeed;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0; // Reset scroll for infinite effect
        }
      }
      requestId = requestAnimationFrame(autoScroll);
    };

    requestId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(requestId);
  }, [isPaused]);

  return (
    <div className="bg-gray-50 dark:bg-dark-800 py-24 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Delivering excellence to companies worldwide
          </p>
        </div>

        {/* Auto-scrolling slider */}
        <div
          className="mt-12 relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={sliderRef}
            className="flex space-x-6 whitespace-nowrap"
            style={{
              display: "flex",
              animation: isPaused ? "none" : "scrolling 20s linear infinite",
            }}
          >
            {extendedClients.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-none w-56 bg-white dark:bg-dark-900 rounded-lg p-4 shadow-md"
              >
                <div className="flex items-center justify-center h-20 mb-3">
                  <img
                    className="h-14 object-contain"
                    src={client.logo}
                    alt={client.name}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                    {client.name}
                  </h3>
                  <p className="text-primary-500 font-medium text-xs mt-1">
                    {client.industry}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    {client.type}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CSS Animation for smooth scrolling */}
        <style jsx>{`
          @keyframes scrolling {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}</style>

      </div>
    </div>
  );
}
