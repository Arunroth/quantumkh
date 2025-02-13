import { useEffect, useRef, useState } from "react";
import { useContent } from "../context/ContentContext";

export default function Clients() {
  const { clients } = useContent();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    // Pause auto-scroll on hover
    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    slider.addEventListener("mouseenter", handleMouseEnter);
    slider.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      slider.removeEventListener("mouseenter", handleMouseEnter);
      slider.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Dragging logic for PC (mouse)
  const handleMouseDown = (e: React.MouseEvent) => startDrag(e.pageX);
  const handleMouseMove = (e: React.MouseEvent) => dragMove(e.pageX);
  const handleMouseUp = () => endDrag();

  // Dragging logic for Mobile (touch)
  const handleTouchStart = (e: React.TouchEvent) => startDrag(e.touches[0].pageX);
  const handleTouchMove = (e: React.TouchEvent) => dragMove(e.touches[0].pageX);
  const handleTouchEnd = () => endDrag();

  const startDrag = (position: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    setIsDragging(true);
    setStartX(position - slider.offsetLeft);
    setScrollLeft(slider.scrollLeft);
  };

  const dragMove = (position: number) => {
    if (!isDragging) return;

    const slider = sliderRef.current;
    if (!slider) return;

    const x = position - slider.offsetLeft;
    const walk = (x - startX) * 1.5; // Speed factor
    slider.scrollLeft = scrollLeft - walk;
  };

  const endDrag = () => {
    setIsDragging(false);
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

        {/* Auto-scrolling & draggable slider (Now works on mobile & PC) */}
        <div
          className="mt-12 relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex space-x-6 w-max scrolling-container ${
              isPaused ? "paused" : ""
            }`}
          >
            {clients.concat(clients).map((client, index) => (
              <div
                key={client.id + "-" + index}
                className="flex-none w-56 bg-white mb-4  dark:bg-dark-900 rounded-lg p-4 shadow-md"
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

        {/* CSS for Infinite Scrolling & Drag */}
        <style>
          {`
            @keyframes scroll {
              from { transform: translateX(0); }
              to { transform: translateX(-50%); }
            }
            .scrolling-container {
              display: flex;
              animation: scroll 30s linear infinite;
              will-change: transform;
            }
            .paused {
              animation-play-state: paused;
            }
            /* Hide scrollbar */
            .scrolling-container::-webkit-scrollbar {
              display: none;
            }
            .scrolling-container {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
          `}
        </style>
      </div>
    </div>
  );
}
