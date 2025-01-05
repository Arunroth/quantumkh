import React from 'react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M50 5L95 27.5V72.5L50 95L5 72.5V27.5L50 5Z"
        className="stroke-primary-500"
        strokeWidth="3"
      />
      <path
        d="M50 20L80 35V65L50 80L20 65V35L50 20Z"
        className="fill-primary-500"
      />
      <path
        d="M50 35L65 43.5V60.5L50 69L35 60.5V43.5L50 35Z"
        fill="white"
      />
    </svg>
  );
}