import { useEffect, useRef, useState } from "react";
import { useContent } from "../context/ContentContext";

export default function Clients() {
  const { clients } = useContent();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isManualScrolling, setIsManualScrolling] = useState(false);

  // Duplicate clients to create a seamless loop for horizontal scrolling
  const extendedClients = [...clients, ...clients];

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || isManualScrolling) return;

    let scrollSpeed = 1.5; // Pixels per frame
    let requestId: number;

    const autoScroll = () => {
      if (!isPaused) {
        slider.scrollLeft += scrollSpeed;
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0;
        }
      }
      requestId = requestAnimationFrame(autoScroll);
    };

    requestId = requestAnimationFrame(autoScroll);

    return () => cancelAnimationFrame(requestId);
  }, [isPaused, isManualScrolling]);

  // Handle manual scrolling by user
  const handleUserScroll = () => {
    setIsManualScrolling(true);
    setTimeout(() => setIsManualScrolling(false), 3000); // Resume auto-scroll after 3 sec
  };

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

        {/* Auto-scrolling & manually scrollable slider (Desktop & Tablets) */}
        <div
          className="mt-12 relative overflow-x-auto hide-scrollbar hidden sm:block"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onScroll={handleUserScroll}
        >
          <div
            ref={sliderRef}
            className="flex space-x-6 whitespace-nowrap"
            style={{
              display: "flex",
              animation: isPaused || isManualScrolling ? "none" : "scrolling 20s linear infinite",
              whiteSpace: "nowrap",
              overflow: "hidden",
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

        {/* 3-Column Grid of Images on Small Screens */}
        <div className="mt-12 grid grid-cols-3 gap-4 sm:hidden">
          {clients.map((client, index) => {
            const isLastRowSingle = (clients.length % 3 === 1) && (index === clients.length - 1);
            const isLastRowTwo = (clients.length % 3 === 2) && (index >= clients.length - 2);

            return (
              <div
                key={client.id}
                className={`flex justify-center items-center ${
                  isLastRowSingle ? "col-span-3 flex justify-center" : "" // Center last single item
                } ${
                  isLastRowTwo ? "col-span-2 flex justify-center" : "" // Center last two items
                }`}
              >
                <img className="h-16 object-contain" src={client.logo} alt={client.name} />
              </div>
            );
          })}
        </div>

        {/* Inline Styles to Fix Auto-Scrolling */}
        <style>
          {`
            @keyframes scrolling {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-50%);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}
