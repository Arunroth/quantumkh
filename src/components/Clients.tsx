import { useEffect, useRef, useState } from "react";
import { useContent } from "../context/ContentContext";

export default function Clients() {
  const { clients } = useContent();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollDuration, setScrollDuration] = useState("30s"); // Default duration

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Function to update scroll speed dynamically
    const updateScrollSpeed = () => {
      const contentWidth = slider.scrollWidth / 2; // Half because of duplicated content
      const speedPerPixel = 0.01; // Adjust this value to control the speed per pixel
      const newDuration = `${contentWidth * speedPerPixel}s`; // Duration scales with content width
      setScrollDuration(newDuration);
    };

    updateScrollSpeed(); // Run once on load

    // Pause animation when hovered
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    slider.addEventListener("mouseenter", handleMouseEnter);
    slider.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", updateScrollSpeed); // Update speed on window resize

    return () => {
      slider.removeEventListener("mouseenter", handleMouseEnter);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", updateScrollSpeed);
    };
  }, [clients]);

  return (
    <div className="bg-gray-50 dark:bg-dark-800 py-24 transition-colors w-full">
      <div className="max-w-screen-xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Trusted by Industry Leaders
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Delivering excellence to companies worldwide
          </p>
        </div>

        {/* Auto-scrolling slider */}
        <div className="mt-12 relative w-full overflow-hidden scroll-smooth" ref={sliderRef}>
          <div
            className={`flex space-x-6 w-max ${isPaused ? "paused" : "scrolling"}`}
            style={{ animationDuration: scrollDuration }} // Dynamic animation speed
          >
            {clients.concat(clients).map((client, index) => ( // Duplicate for infinite scrolling
              <div
                key={client.id + "-" + index}
                className="flex-none w-56 bg-white  mb-4 dark:bg-dark-900 rounded-lg p-4 shadow-md"
              >
                <div className="flex  items-center justify-center h-20 mb-3">
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

        {/* CSS for Infinite Scrolling (Speed Adjusted Dynamically) */}
        <style>
          {`
            @keyframes scroll {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .scrolling {
              display: flex;
              animation: scroll linear infinite;
            }
            .paused {
              animation-play-state: paused;
            }
          `}
        </style>
      </div>
    </div>
  );
}
