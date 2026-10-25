import React from 'react';
import { Heart } from 'lucide-react';
import { Stay } from '../types';

interface StayCardProps {
  stay: Stay;
  isSaved?: boolean;
  onToggleSave?: (id: string, e: React.MouseEvent) => void;
  onSelect: (stay: Stay) => void;
}

export const StayCard: React.FC<StayCardProps> = ({
  stay,
  isSaved = false,
  onToggleSave,
  onSelect
}) => {
  return (
    <div 
      onClick={() => onSelect(stay)}
      className="group cursor-pointer flex flex-col shrink-0 select-none transition-transform duration-300 hover:-translate-y-1"
      style={{ width: '272px' }}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-slate-200 shadow-sm border border-black/5">
        <img
          src={stay.image}
          alt={`${stay.city}, ${stay.country}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Subtle Dark Gradient Scrim on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Hover Badges: Price & Save Heart */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave?.(stay.id, e);
            }}
            title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-800 hover:text-red-500 hover:bg-white shadow-sm transition-colors"
          >
            <Heart 
              className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : 'text-slate-800'}`} 
            />
          </button>
        </div>

        {/* Hover Price Overlay */}
        <div className="absolute bottom-2.5 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="text-white text-xs font-semibold drop-shadow-md">
            {stay.currency}{stay.pricePerNight} <span className="text-white/80 font-normal">/ night</span>
          </span>
        </div>
      </div>

      {/* Caption beneath card: Dates on left, Location on right */}
      <div className="mt-2.5 flex items-center justify-between px-0.5 text-[11px] sm:text-xs">
        <span className="text-slate-500 font-medium tracking-wide">
          {stay.dateRange}
        </span>
        <span className="font-bold text-slate-900 tracking-wider uppercase">
          {stay.locationLabel}
        </span>
      </div>
    </div>
  );
};
