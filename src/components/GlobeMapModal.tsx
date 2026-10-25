import React, { useState } from 'react';
import { X, MapPin, ArrowRight } from 'lucide-react';
import { Stay } from '../types';

interface GlobeMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  stays: Stay[];
  onSelectStay: (stay: Stay) => void;
}

export const GlobeMapModal: React.FC<GlobeMapModalProps> = ({
  isOpen,
  onClose,
  stays,
  onSelectStay
}) => {
  const [selectedPinStay, setSelectedPinStay] = useState<Stay | null>(stays[0] || null);

  if (!isOpen) return null;

  // Convert lat/lng to percentage coordinates on an equirectangular world map projection
  const getMapCoords = (lat: number, lng: number) => {
    // lat from -90 to 90 -> y from 100% to 0%
    // lng from -180 to 180 -> x from 0% to 100%
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-5xl h-[85vh] bg-[#0c121e] text-white rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-slate-700/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0c121e]/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#f0fa3c] animate-pulse" />
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-100">
              Global Architectural Coordinates
            </h3>
            <span className="text-xs text-slate-400">({stays.length} sanctuaries pinned)</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Map Container */}
        <div className="relative flex-1 overflow-hidden flex items-center justify-center p-6 bg-radial from-[#131b2e] to-[#0a0e17]">
          
          {/* Subtle Coordinate Grid Lines */}
          <div className="absolute inset-0 opacity-15 pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '80px 80px'
            }}
          />

          {/* Minimalist World Continents SVG Silhouette */}
          <svg
            className="w-full h-full max-h-[500px] opacity-35 select-none"
            viewBox="0 0 1000 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* North America */}
            <path d="M120 80 Q180 60 260 80 Q320 120 280 200 Q220 240 180 280 Q140 220 100 160 Z" fill="#475569" />
            {/* South America */}
            <path d="M240 290 Q300 310 290 380 Q270 450 230 470 Q210 400 220 320 Z" fill="#475569" />
            {/* Europe */}
            <path d="M460 70 Q540 60 560 120 Q520 180 470 170 Q440 130 450 90 Z" fill="#475569" />
            {/* Africa */}
            <path d="M460 190 Q540 190 560 270 Q540 370 480 390 Q440 310 440 230 Z" fill="#475569" />
            {/* Asia */}
            <path d="M570 70 Q750 50 820 120 Q840 220 740 260 Q650 230 580 180 Z" fill="#475569" />
            {/* Japan Arc */}
            <path d="M830 140 Q850 150 840 190 Q820 180 830 140 Z" fill="#64748b" />
            {/* Australia */}
            <path d="M760 330 Q850 320 870 380 Q810 430 750 390 Z" fill="#475569" />
          </svg>

          {/* Interactive Pinned Coordinate Markers */}
          {stays.map((stay) => {
            const coords = getMapCoords(stay.lat, stay.lng);
            const isSelected = selectedPinStay?.id === stay.id;

            return (
              <div
                key={stay.id}
                style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                onClick={() => setSelectedPinStay(stay)}
              >
                {/* Glowing Ripple for active */}
                {isSelected && (
                  <span className="absolute -inset-2 rounded-full bg-[#f0fa3c]/30 animate-ping" />
                )}

                {/* Marker Pill */}
                <div className={`relative px-2.5 py-1 rounded-full flex items-center gap-1.5 transition-all duration-300 shadow-lg ${
                  isSelected 
                    ? 'bg-[#f0fa3c] text-slate-950 scale-110 ring-2 ring-white/50' 
                    : 'bg-slate-800/90 text-white hover:bg-slate-700 hover:scale-105 border border-slate-600'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-slate-900' : 'bg-[#f0fa3c]'}`} />
                  <span className="text-[11px] font-bold tracking-wider uppercase whitespace-nowrap">
                    {stay.city}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Floating Detail Card for Selected Pin */}
          {selectedPinStay && (
            <div className="absolute bottom-6 left-6 right-6 sm:left-auto sm:right-6 sm:w-96 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-3xl p-4 shadow-2xl flex items-center gap-4 animate-in slide-in-from-bottom-3 duration-200">
              <img
                src={selectedPinStay.image}
                alt={selectedPinStay.city}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-700"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#f0fa3c]">
                    {selectedPinStay.dateRange}
                  </span>
                  <span className="font-mono text-xs font-bold text-white">
                    {selectedPinStay.currency}{selectedPinStay.pricePerNight}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white truncate mt-0.5">
                  {selectedPinStay.city}, {selectedPinStay.country}
                </h4>
                <p className="text-[11px] text-slate-400 truncate">
                  {selectedPinStay.style}
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onSelectStay(selectedPinStay);
                  }}
                  className="mt-2 text-xs font-bold text-slate-900 bg-[#f0fa3c] hover:bg-[#f6ff4d] px-3 py-1 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <span>View Sanctuary</span>
                  <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
