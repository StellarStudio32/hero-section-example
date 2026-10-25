import React, { useState } from 'react';
import { X, Heart, Star, MapPin, CheckCircle, Compass, Home, Calendar, Users, ShieldCheck } from 'lucide-react';
import { Stay } from '../types';

interface StayModalProps {
  stay: Stay | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
}

export const StayModal: React.FC<StayModalProps> = ({
  stay,
  isOpen,
  onClose,
  isSaved,
  onToggleSave
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [selectedGuests, setSelectedGuests] = useState(2);

  if (!isOpen || !stay) return null;

  const nights = 4;
  const subtotal = stay.pricePerNight * nights;
  const preservationFee = 75;
  const total = subtotal + preservationFee;

  const handleBooking = () => {
    setBookingConfirmed(true);
    setTimeout(() => {
      // Keep state clear after some time
    }, 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold tracking-widest text-slate-800 uppercase">
              SJ© Curated Stay
            </span>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <MapPin className="w-3.5 h-3.5" />
              <span>{stay.locationLabel}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => onToggleSave(stay.id, e)}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
              title="Save to wishlist"
            >
              <Heart className={`w-5 h-5 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-slate-100 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {/* Main Gallery */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-100 shadow-inner">
              <img
                src={stay.gallery[activeImageIndex] || stay.image}
                alt={stay.tagline}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-300"
              />
              <div className="absolute bottom-3 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-medium">
                {stay.style} · {stay.yearBuilt}
              </div>
            </div>

            {/* Thumbnail Strip */}
            {stay.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-1">
                {stay.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-slate-900 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="thumbnail" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Title & Key Architectural Metrics */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-slate-100 pb-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  {stay.city}, {stay.country}
                </h2>
                <p className="text-sm text-slate-600 mt-1 font-medium">
                  {stay.tagline}
                </p>
              </div>
              <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1.5 rounded-xl text-amber-900 font-bold text-xs shrink-0 self-start">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span>{stay.rating}</span>
                <span className="text-slate-400 font-normal">({stay.reviewsCount} verified stays)</span>
              </div>
            </div>

            {/* Architectural Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-2">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Architect</span>
                <span className="text-xs font-semibold text-slate-900">{stay.architect}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Area</span>
                <span className="text-xs font-semibold text-slate-900 font-mono">{stay.sqft.toLocaleString()} sq ft</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Capacity</span>
                <span className="text-xs font-semibold text-slate-900">{stay.guestsMax} guests · {stay.bedrooms} bed</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Window</span>
                <span className="text-xs font-semibold text-slate-900">{stay.dateRange}</span>
              </div>
            </div>
          </div>

          {/* Description & Curators Notes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
                  The Architecture
                </h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {stay.description}
                </p>
              </div>

              {/* Curator's Note */}
              <div className="p-5 bg-yellow-50/70 border border-yellow-200/60 rounded-2xl">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-yellow-400" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-yellow-900">
                    SJ Curator’s Note
                  </span>
                </div>
                <p className="text-xs text-yellow-950/80 leading-relaxed italic">
                  "{stay.curatorNotes}"
                </p>
              </div>

              {/* Curated Amenities */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
                  Sanctuary Amenities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {stay.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Booking Box */}
            <div className="md:col-span-1">
              <div className="sticky top-4 p-5 bg-slate-50 border border-slate-200 rounded-3xl space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="text-2xl font-extrabold text-slate-900">
                      {stay.currency}{stay.pricePerNight}
                    </span>
                    <span className="text-xs text-slate-500 font-medium"> / night</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Available {stay.dateRange}
                  </span>
                </div>

                {bookingConfirmed ? (
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-2 animate-in zoom-in-95">
                    <CheckCircle className="w-8 h-8 text-emerald-600 mx-auto" />
                    <p className="text-xs font-bold text-emerald-900">Reservation Request Received</p>
                    <p className="text-[11px] text-emerald-700">
                      Booking #SJ-{stay.id.slice(0, 4).toUpperCase()}-2026 confirmed. Our private concierge will reach out within 2 hours.
                    </p>
                    <button
                      onClick={() => setBookingConfirmed(false)}
                      className="mt-2 text-[11px] text-slate-600 underline hover:text-slate-900"
                    >
                      Modify booking
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-2 border border-slate-200 rounded-2xl p-3 bg-white text-xs">
                      <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Dates</span>
                        <span className="font-semibold text-slate-900">{stay.dateRange} (4 nights)</span>
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[10px] uppercase font-bold text-slate-500">Guests</span>
                        <select
                          value={selectedGuests}
                          onChange={(e) => setSelectedGuests(Number(e.target.value))}
                          className="font-semibold text-slate-900 bg-transparent focus:outline-none cursor-pointer"
                        >
                          {Array.from({ length: stay.guestsMax }, (_, i) => i + 1).map((n) => (
                            <option key={n} value={n}>{n} Guest{n > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Price Breakdown */}
                    <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                      <div className="flex justify-between">
                        <span>{stay.currency}{stay.pricePerNight} × {nights} nights</span>
                        <span className="font-mono">{stay.currency}{subtotal}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Architectural Preservation Fee</span>
                        <span className="font-mono">{stay.currency}{preservationFee}</span>
                      </div>
                      <div className="flex justify-between font-bold text-slate-900 pt-2 border-t border-slate-200 text-sm">
                        <span>Total Due</span>
                        <span className="font-mono">{stay.currency}{total}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleBooking}
                      className="w-full py-3 rounded-2xl bg-[#0d1117] hover:bg-black text-white font-bold text-xs tracking-wider uppercase transition-all shadow-md active:scale-98"
                    >
                      Reserve Sanctuary
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
                      <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                      <span>Zero cancellation fees up to 14 days prior</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
