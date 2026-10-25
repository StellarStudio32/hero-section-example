import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface TopBarProps {
  onOpenMenu: () => void;
  onOpenGlobe: () => void;
  currentLocation?: string;
  onSelectLocation?: (location: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  onOpenMenu,
  onOpenGlobe,
  currentLocation = 'AULENDORF'
}) => {
  const [currentTime, setCurrentTime] = useState<string>('4:03:12 PM');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 becomes 12
      setCurrentTime(`${hours}:${minutes}:${seconds} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative z-20 flex items-center justify-between px-6 sm:px-10 pt-6 pb-4">
      {/* Left Zone: Brand + Telemetry Pills */}
      <div className="flex items-center gap-5 sm:gap-7 flex-wrap">
        {/* Brand Monogram: SJ© with yellow glowing orb under j */}
        <div className="relative flex items-center group cursor-pointer select-none">
          <div className="flex items-baseline">
            <span className="font-extrabold text-2xl tracking-tighter text-slate-900 leading-none">
              S
            </span>
            <span className="font-extrabold text-2xl tracking-tighter text-slate-900 leading-none -ml-0.5">
              j
            </span>
            <span className="text-[10px] font-semibold text-slate-800 ml-0.5 self-start -mt-0.5">
              ©
            </span>
          </div>
          {/* Subtle neon yellow glow behind bottom curve of 'j' */}
          <div 
            className="absolute -bottom-1 left-2.5 w-3.5 h-3.5 rounded-full bg-[#faee38] blur-[3px] opacity-90 pointer-events-none group-hover:scale-125 transition-transform duration-300"
            aria-hidden="true"
          />
        </div>

        {/* Location Crosshair */}
        <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-slate-800">
          <svg 
            className="w-3.5 h-3.5 text-slate-700" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2.2"
          >
            <circle cx="12" cy="12" r="7" />
            <line x1="12" y1="2" x2="12" y2="5" />
            <line x1="12" y1="19" x2="12" y2="22" />
            <line x1="2" y1="12" x2="5" y2="12" />
            <line x1="19" y1="12" x2="22" y2="12" />
          </svg>
          <span className="uppercase text-[11px] sm:text-xs font-medium text-slate-800 tracking-widest">
            {currentLocation}
          </span>
        </div>

        {/* Weather Indicator */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-800 font-medium">
          <svg 
            className="w-4 h-4 text-slate-700" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="1.8"
          >
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
          <span className="text-[12px] tracking-tight">23°C</span>
        </div>

        {/* Live Clock Indicator */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-800 font-medium tabular-nums">
          <svg 
            className="w-3.5 h-3.5 text-slate-700" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="9" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span className="text-[12px] font-mono tracking-tight">{currentTime}</span>
        </div>
      </div>

      {/* Right Zone: Globe Action + Menu Button */}
      <div className="flex items-center gap-3">
        {/* Globe Circular Pill Button */}
        <button
          onClick={onOpenGlobe}
          title="Explore Stays on World Map"
          className="relative w-9 h-9 rounded-full bg-white/70 hover:bg-white text-slate-800 border border-black/10 flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-sm active:scale-95"
        >
          <Globe className="w-4 h-4 text-slate-800" strokeWidth={1.8} />
          {/* Subtle pink dot accent on globe as seen in screenshot */}
          <span 
            className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#f43f5e]" 
            aria-hidden="true"
          />
        </button>

        {/* Menu Pill Button: MENU = */}
        <button
          onClick={onOpenMenu}
          className="h-9 px-4 rounded-full bg-white/70 hover:bg-white text-slate-900 border border-black/10 flex items-center gap-1.5 text-xs font-semibold tracking-wider transition-all duration-200 hover:shadow-sm active:scale-95"
        >
          <span>MENU</span>
          <span className="font-mono text-sm leading-none tracking-tighter">=</span>
        </button>
      </div>
    </header>
  );
};
