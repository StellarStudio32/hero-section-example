import React from 'react';

export const BrutalistArrowGlyph: React.FC<{ className?: string }> = ({ className = 'w-16 h-12 md:w-20 md:h-14' }) => {
  return (
    <span 
      className={`inline-flex items-center justify-center align-middle mx-2 sm:mx-3 select-none ${className}`}
      aria-hidden="true"
    >
      <svg 
        viewBox="0 0 100 68" 
        className="w-full h-full drop-shadow-sm" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Black brutalist block */}
        <rect width="100" height="68" rx="6" fill="#0d1117" />
        
        {/* Double Forward Chevrons (▶ ▶) */}
        <path d="M18 20L34 34L18 48Z" fill="white" />
        <path d="M38 20L54 34L38 48Z" fill="white" />
        
        {/* Rightward / Downward brutalist arrow block */}
        <path 
          d="M60 22H78V48H66V33H60V22Z" 
          fill="white" 
        />
        <path 
          d="M78 48L64 36H78V48Z" 
          fill="white" 
        />
      </svg>
    </span>
  );
};
