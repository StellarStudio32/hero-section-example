import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Stay } from '../types';
import { StayCard } from './StayCard';

interface StaysCarouselProps {
  stays: Stay[];
  savedStayIds: string[];
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onSelectStay: (stay: Stay) => void;
}

export const StaysCarousel: React.FC<StaysCarouselProps> = ({
  stays,
  savedStayIds,
  onToggleSave,
  onSelectStay
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full pb-6 pt-4 group/carousel">
      {/* Left Scroll Button */}
      <button
        onClick={() => scroll('left')}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-8 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 border border-black/10 shadow-md items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200"
        title="Scroll left"
      >
        <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
      </button>

      {/* Right Scroll Button */}
      <button
        onClick={() => scroll('right')}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-8 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-slate-800 border border-black/10 shadow-md items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200"
        title="Scroll right"
      >
        <ChevronRight className="w-4 h-4 stroke-[2.5]" />
      </button>

      {/* Scrollable Container with Subtle Edge Bleed */}
      <div
        ref={scrollRef}
        className="flex items-start gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth px-6 sm:px-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {stays.map((stay) => (
          <StayCard
            key={stay.id}
            stay={stay}
            isSaved={savedStayIds.includes(stay.id)}
            onToggleSave={onToggleSave}
            onSelect={onSelectStay}
          />
        ))}
      </div>
    </div>
  );
};
