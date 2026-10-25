import React, { useState, useRef, useEffect } from 'react';
import { MapPin, LogIn, LogOut, Users, ArrowRight, X, Calendar, Plus, Minus, Check } from 'lucide-react';
import { SearchState } from '../types';
import { POPULAR_DESTINATIONS } from '../data/stays';

interface SearchConsoleProps {
  searchState: SearchState;
  onSearchChange: (newState: Partial<SearchState>) => void;
  onStartJourney: () => void;
}

export const SearchConsole: React.FC<SearchConsoleProps> = ({
  searchState,
  onSearchChange,
  onStartJourney
}) => {
  const [activePopover, setActivePopover] = useState<'where' | 'checkin' | 'checkout' | 'who' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActivePopover(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalGuests = searchState.adults + searchState.children;

  return (
    <div ref={containerRef} className="relative z-30 w-full max-w-4xl mx-auto px-4 sm:px-6">
      {/* The Floating Search Pill */}
      <div className="bg-white/80 hover:bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_10px_35px_-8px_rgba(0,0,0,0.08)] rounded-full p-2 flex flex-col md:flex-row items-center justify-between gap-1.5 transition-all duration-300">
        
        {/* Fields Container */}
        <div className="w-full md:w-auto flex-1 grid grid-cols-2 md:flex md:items-center divide-y md:divide-y-0 md:divide-x divide-slate-200/80">
          
          {/* 1. WHERE */}
          <div className="relative flex-1">
            <button
              onClick={() => setActivePopover(activePopover === 'where' ? null : 'where')}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-colors text-left ${
                activePopover === 'where' ? 'bg-slate-100/90' : 'hover:bg-slate-50'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-slate-900 shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold tracking-widest text-slate-800 uppercase">
                  WHERE
                </span>
                <span className="text-xs font-semibold text-slate-700 truncate">
                  {searchState.destination || 'Search stays...'}
                </span>
              </div>
            </button>
          </div>

          {/* 2. CHECK IN */}
          <div className="relative flex-1">
            <button
              onClick={() => setActivePopover(activePopover === 'checkin' ? null : 'checkin')}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-colors text-left ${
                activePopover === 'checkin' ? 'bg-slate-100/90' : 'hover:bg-slate-50'
              }`}
            >
              <LogIn className="w-3.5 h-3.5 text-slate-800 shrink-0 stroke-[2.5]" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold tracking-widest text-slate-800 uppercase">
                  CHECK IN
                </span>
                <span className="text-xs font-semibold text-slate-700 truncate">
                  {searchState.checkIn ? searchState.checkIn : 'Add date'}
                </span>
              </div>
            </button>
          </div>

          {/* 3. CHECK OUT */}
          <div className="relative flex-1">
            <button
              onClick={() => setActivePopover(activePopover === 'checkout' ? null : 'checkout')}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-colors text-left ${
                activePopover === 'checkout' ? 'bg-slate-100/90' : 'hover:bg-slate-50'
              }`}
            >
              <LogOut className="w-3.5 h-3.5 text-slate-800 shrink-0 stroke-[2.5]" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold tracking-widest text-slate-800 uppercase">
                  CHECK OUT
                </span>
                <span className="text-xs font-semibold text-slate-700 truncate">
                  {searchState.checkOut ? searchState.checkOut : 'Add date'}
                </span>
              </div>
            </button>
          </div>

          {/* 4. WHO */}
          <div className="relative flex-1">
            <button
              onClick={() => setActivePopover(activePopover === 'who' ? null : 'who')}
              className={`w-full flex items-center gap-2.5 px-4 py-2.5 rounded-full transition-colors text-left ${
                activePopover === 'who' ? 'bg-slate-100/90' : 'hover:bg-slate-50'
              }`}
            >
              <Users className="w-3.5 h-3.5 text-slate-800 shrink-0 stroke-[2.5]" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold tracking-widest text-slate-800 uppercase">
                  WHO
                </span>
                <span className="text-xs font-semibold text-slate-700 truncate">
                  {totalGuests > 0 ? `${totalGuests} guest${totalGuests > 1 ? 's' : ''}` : 'Add guests'}
                </span>
              </div>
            </button>
          </div>

        </div>

        {/* 5. START MY JOURNEY Button */}
        <div className="w-full md:w-auto shrink-0 pl-1">
          <button
            onClick={() => {
              setActivePopover(null);
              onStartJourney();
            }}
            className="w-full md:w-auto h-11 pl-5 pr-2 rounded-full bg-[#0d1117] hover:bg-black text-white flex items-center justify-between md:justify-start gap-4 transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 group cursor-pointer"
          >
            <span className="text-xs font-bold tracking-wider uppercase whitespace-nowrap">
              START MY JOURNEY
            </span>
            {/* Bright Neon Lime-Yellow Circular Badge with Right Arrow */}
            <span className="w-8 h-8 rounded-full bg-[#f0fa3c] group-hover:bg-[#f6ff4d] flex items-center justify-center text-slate-950 font-bold transition-transform duration-200 group-hover:translate-x-0.5 shadow-sm">
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </span>
          </button>
        </div>

      </div>

      {/* Popovers */}

      {/* Popover 1: WHERE */}
      {activePopover === 'where' && (
        <div className="absolute left-6 right-6 md:left-12 md:right-auto md:w-96 top-full mt-3 bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Curated Architectural Regions
            </span>
            <button 
              onClick={() => setActivePopover(null)} 
              className="text-slate-400 hover:text-slate-800 text-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3">
            <input
              type="text"
              placeholder="Search city, architect, or style..."
              value={searchState.destination}
              onChange={(e) => onSearchChange({ destination: e.target.value })}
              className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900"
              autoFocus
            />
          </div>

          <div className="mt-4 space-y-1 max-h-56 overflow-y-auto pr-1">
            <button
              onClick={() => {
                onSearchChange({ destination: '' });
                setActivePopover(null);
              }}
              className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-50 flex items-center justify-between font-medium text-slate-700"
            >
              <span>Explore All Global Homes</span>
              {!searchState.destination && <Check className="w-3.5 h-3.5 text-slate-900" />}
            </button>
            {POPULAR_DESTINATIONS.map((dest) => (
              <button
                key={dest.city}
                onClick={() => {
                  onSearchChange({ destination: dest.city });
                  setActivePopover(null);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs hover:bg-slate-50 flex items-center justify-between transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-mono text-slate-600 font-bold group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    {dest.code}
                  </span>
                  <div>
                    <span className="font-semibold text-slate-900">{dest.city}</span>
                    <span className="text-slate-400 text-[11px] ml-1.5">{dest.country}</span>
                  </div>
                </div>
                <span className="text-[11px] text-slate-400">{dest.count} stays</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popover 2 & 3: DATES (Check In & Check Out) */}
      {(activePopover === 'checkin' || activePopover === 'checkout') && (
        <div className="absolute left-6 right-6 md:left-48 md:right-auto md:w-88 top-full mt-3 bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-slate-800" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Select Travel Window
              </span>
            </div>
            <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-slate-800">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-3">
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Check In</label>
              <input
                type="date"
                value={searchState.checkIn}
                onChange={(e) => onSearchChange({ checkIn: e.target.value })}
                className="w-full mt-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-500 uppercase">Check Out</label>
              <input
                type="date"
                value={searchState.checkOut}
                onChange={(e) => onSearchChange({ checkOut: e.target.value })}
                className="w-full mt-1 px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
            {[
              { label: 'JUL 19–29', in: '2026-07-19', out: '2026-07-29' },
              { label: 'JUL 18–22', in: '2026-07-18', out: '2026-07-22' },
              { label: 'JUL 20–22', in: '2026-07-20', out: '2026-07-22' }
            ].map((preset) => (
              <button
                key={preset.label}
                onClick={() => {
                  onSearchChange({ checkIn: preset.in, checkOut: preset.out });
                  setActivePopover(null);
                }}
                className="px-3 py-1 text-[11px] font-semibold bg-slate-100 hover:bg-slate-900 hover:text-white rounded-lg transition-colors"
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Popover 4: WHO (Guests) */}
      {activePopover === 'who' && (
        <div className="absolute right-6 md:right-32 md:w-80 top-full mt-3 bg-white rounded-3xl p-5 shadow-2xl border border-slate-100 animate-in fade-in slide-in-from-top-2 duration-200 z-50">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Travelling Companions
            </span>
            <button onClick={() => setActivePopover(null)} className="text-slate-400 hover:text-slate-800">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {/* Adults */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Adults</p>
                <p className="text-[11px] text-slate-500">Ages 13 and above</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  disabled={searchState.adults <= 1}
                  onClick={() => onSearchChange({ adults: Math.max(1, searchState.adults - 1) })}
                  className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-slate-900"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold w-4 text-center font-mono">{searchState.adults}</span>
                <button
                  onClick={() => onSearchChange({ adults: searchState.adults + 1 })}
                  className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-slate-900"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Children */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Children</p>
                <p className="text-[11px] text-slate-500">Ages 2–12</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  disabled={searchState.children <= 0}
                  onClick={() => onSearchChange({ children: Math.max(0, searchState.children - 1) })}
                  className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-slate-900"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold w-4 text-center font-mono">{searchState.children}</span>
                <button
                  onClick={() => onSearchChange({ children: searchState.children + 1 })}
                  className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-slate-900"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Pets */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">Pets</p>
                <p className="text-[11px] text-slate-500">Architecture-friendly companions</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  disabled={searchState.pets <= 0}
                  onClick={() => onSearchChange({ pets: Math.max(0, searchState.pets - 1) })}
                  className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 disabled:opacity-30 disabled:cursor-not-allowed hover:border-slate-900"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="text-xs font-bold w-4 text-center font-mono">{searchState.pets}</span>
                <button
                  onClick={() => onSearchChange({ pets: searchState.pets + 1 })}
                  className="w-7 h-7 rounded-full border border-slate-300 flex items-center justify-center text-slate-700 hover:border-slate-900"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
            <button
              onClick={() => setActivePopover(null)}
              className="px-4 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-xl"
            >
              Done
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
