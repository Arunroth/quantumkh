import { useEffect, useRef, useState } from "react";
import { useContent } from "../context/ContentContext";

export default function Clients() {
  const { clients } = useContent();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || isPaused || isUserScrolling) return;

    let scrollSpeed = 50; // Speed in pixels per second
    let start = Date.now();
    let requestId: number;

    const autoScroll = () => {
      let timeElapsed = (Date.now() - start) / 1000;
      slider.scrollLeft += (scrollSpeed * timeElapsed) / 60;

      requestId = requestAnimationFrame(autoScroll);
    };

    requestId = requestAnimationFrame(autoScroll);
    return () => cancelAnimationFrame(requestId);
  }, [isPaused, isUserScrolling]);

  // Detect when the user scrolls manually
  const handleUserScroll = () => {
    setIsUserScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    // Resume auto-scroll after 3s of inactivity
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 3000);
  };

  // Pause auto-scroll on hover
  const handleMouseEnter = () => {
    setIsPaused(true);
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
  };

  // Resume auto-scroll 0.5s after mouse leaves
  const handleMouseLeave = () => {
    resumeTimeoutRef.current = setTimeout(() => {
      setIsPaused(false);
    }, 500);
  };

  return (
    <div className="bg-gray-50 dark:bg-dark-800 py-24 transition-colors w-full">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
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
          className="mt-12 relative w-full overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onScroll={handleUserScroll}
          style={{ cursor: "grab", whiteSpace: "nowrap" }}
        >
          <div
            ref={sliderRef}
            className="flex space-x-6"
            style={{
              display: "flex",
              animation: isPaused || isUserScrolling ? "none" : "scrolling 20s linear infinite",
            }}
          >
            {clients.map((client, index) => (
              <div
                key={client.id}
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
        <div className="mt-12 grid grid-cols-3 gap-4 sm:hidden place-items-center">
          {clients.map((client, index) => {
            const isLastRowSingle = (clients.length % 3 === 1) && (index === clients.length - 1);
            const isLastRowTwo = (clients.length % 3 === 2) && (index >= clients.length - 2);

            return (
              <div
                key={client.id}
                className={`flex justify-center items-center ${
                  isLastRowSingle ? "col-span-3 flex justify-center" : ""
                } ${
                  isLastRowTwo ? "col-span-2 flex justify-center" : ""
                }`}
              >
                <img className="h-16 object-contain" src={client.logo} alt={client.name} />
              </div>
            );
          })}
        </div>

        {/* CSS for Smooth Infinite Scrolling */}
        <style>
          {`
            @keyframes scrolling {
              from {
                transform: translateX(0);
              }
              to {
                transform: translateX(-100%);
              }
            }
          `}
        </style>
      </div>
    </div>
  );
}
