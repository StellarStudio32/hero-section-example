import React from 'react';
import { X, Heart, Sparkles, BookOpen, MapPin, Compass, ArrowUpRight } from 'lucide-react';
import { Stay } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  stays: Stay[];
  savedStayIds: string[];
  onSelectStay: (stay: Stay) => void;
  activeCurrency: string;
  onChangeCurrency: (currency: string) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  stays,
  savedStayIds,
  onSelectStay,
  activeCurrency,
  onChangeCurrency
}) => {
  if (!isOpen) return null;

  const savedStays = stays.filter(s => savedStayIds.includes(s.id));

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl tracking-tighter text-slate-900">
              SJ©
            </span>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Curator Index
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Wishlist Quick Access */}
          {savedStays.length > 0 && (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-900">
                  <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
                  <span>Saved Sanctuaries ({savedStays.length})</span>
                </div>
              </div>
              <div className="space-y-2">
                {savedStays.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onClose();
                      onSelectStay(s);
                    }}
                    className="w-full text-left p-2 rounded-xl bg-white hover:bg-slate-100/80 border border-slate-100 flex items-center justify-between transition-colors"
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-900">{s.city}, {s.country}</p>
                      <p className="text-[11px] text-slate-500">{s.style}</p>
                    </div>
                    <span className="text-xs font-mono font-semibold">{s.currency}{s.pricePerNight}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Curated Stays Directory */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
              Curated Homes Directory
            </h3>
            <div className="space-y-2">
              {stays.map((stay) => (
                <button
                  key={stay.id}
                  onClick={() => {
                    onClose();
                    onSelectStay(stay);
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-slate-50 transition-colors group text-left border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <img 
                      src={stay.image} 
                      alt="" 
                      referrerPolicy="no-referrer"
                      className="w-12 h-10 object-cover rounded-xl"
                    />
                    <div>
                      <p className="text-xs font-bold text-slate-900 group-hover:text-black">
                        {stay.locationLabel}
                      </p>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {stay.style}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold font-mono text-slate-900">
                      {stay.currency}{stay.pricePerNight}
                    </span>
                    <span className="block text-[10px] text-slate-400">
                      {stay.dateRange}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Editorial Philosophy */}
          <div className="p-5 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl text-white space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#faee38]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#faee38]">
                The SJ Manifesto
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              "We believe architecture is not merely shelter—it is an altered state of consciousness. Every dwelling in the SJ collection is a living museum, accessible exclusively to individuals who cherish structural intention."
            </p>
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/10">
              <span>Curated by Stefan J. & Atelier</span>
              <span className="font-mono">EST. 2024</span>
            </div>
          </div>

          {/* Currency Switcher */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              Display Currency
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {['USD ($)', 'EUR (€)', 'GBP (£)', 'JPY (¥)'].map((curr) => {
                const code = curr.split(' ')[0];
                return (
                  <button
                    key={code}
                    onClick={() => onChangeCurrency(code)}
                    className={`py-2 px-2 text-xs font-bold rounded-xl border text-center transition-colors ${
                      activeCurrency === code
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {curr}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Drawer Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <span>SJ© Global Stays Inc.</span>
          <span className="font-mono text-[11px]">VERSION 2.4</span>
        </div>
      </div>
    </div>
  );
};
