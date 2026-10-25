/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CURATED_STAYS } from './data/stays';
import { Stay, SearchState, ViewMode } from './types';
import { TopBar } from './components/TopBar';
import { HeroBackground } from './components/HeroBackground';
import { BrutalistArrowGlyph } from './components/BrutalistArrowGlyph';
import { SearchConsole } from './components/SearchConsole';
import { StaysCarousel } from './components/StaysCarousel';
import { StayModal } from './components/StayModal';
import { MenuDrawer } from './components/MenuDrawer';
import { GlobeMapModal } from './components/GlobeMapModal';
import { Maximize2, Minimize2, Sparkles, FilterX } from 'lucide-react';

export default function App() {
  // Search State
  const [searchState, setSearchState] = useState<SearchState>({
    destination: '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    pets: 0
  });

  // Filtered Stays
  const [filteredStays, setFilteredStays] = useState<Stay[]>(CURATED_STAYS);
  const [selectedStay, setSelectedStay] = useState<Stay | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGlobeOpen, setIsGlobeOpen] = useState(false);
  
  // Saved Stays (Wishlist)
  const [savedStayIds, setSavedStayIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('sj_saved_stays');
      return saved ? JSON.parse(saved) : ['tokyo-japan', 'traona-italy'];
    } catch {
      return ['tokyo-japan', 'traona-italy'];
    }
  });

  // Presentation View Mode: 'framed' (matches screenshot frame) or 'fullscreen'
  const [viewMode, setViewMode] = useState<ViewMode>('framed');
  const [activeCurrency, setActiveCurrency] = useState('USD');
  const [locationName, setLocationName] = useState('AULENDORF');
  const [searchNotification, setSearchNotification] = useState<string | null>(null);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sj_saved_stays', JSON.stringify(savedStayIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedStayIds]);

  // Wishlist toggle handler
  const handleToggleSave = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedStayIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Search Filter Handler
  const handleSearchChange = (changes: Partial<SearchState>) => {
    const next = { ...searchState, ...changes };
    setSearchState(next);

    if (changes.destination !== undefined) {
      if (!changes.destination.trim()) {
        setFilteredStays(CURATED_STAYS);
        setSearchNotification(null);
      } else {
        const query = changes.destination.toLowerCase().trim();
        const matches = CURATED_STAYS.filter(
          (s) =>
            s.city.toLowerCase().includes(query) ||
            s.country.toLowerCase().includes(query) ||
            s.locationLabel.toLowerCase().includes(query) ||
            s.style.toLowerCase().includes(query) ||
            s.architect.toLowerCase().includes(query)
        );
        setFilteredStays(matches.length > 0 ? matches : CURATED_STAYS);
        if (matches.length > 0) {
          setLocationName(matches[0].city.toUpperCase());
        }
      }
    }
  };

  // Start Journey CTA click
  const handleStartJourney = () => {
    if (searchState.destination.trim()) {
      const query = searchState.destination.toLowerCase().trim();
      const matches = CURATED_STAYS.filter(
        (s) =>
          s.city.toLowerCase().includes(query) ||
          s.country.toLowerCase().includes(query) ||
          s.locationLabel.toLowerCase().includes(query) ||
          s.style.toLowerCase().includes(query)
      );

      if (matches.length > 0) {
        setFilteredStays(matches);
        setSearchNotification(`Showing ${matches.length} curated stay${matches.length > 1 ? 's' : ''} in ${matches[0].city}`);
        setLocationName(matches[0].city.toUpperCase());
      } else {
        setSearchNotification(`No exact matches for "${searchState.destination}". Displaying global flagship sanctuaries.`);
        setFilteredStays(CURATED_STAYS);
      }
    } else {
      setSearchNotification('Showing all global architectural flagships.');
      setFilteredStays(CURATED_STAYS);
    }

    setTimeout(() => {
      setSearchNotification(null);
    }, 4500);
  };

  const handleResetFilter = () => {
    setSearchState({
      destination: '',
      checkIn: '',
      checkOut: '',
      adults: 2,
      children: 0,
      pets: 0
    });
    setFilteredStays(CURATED_STAYS);
    setLocationName('AULENDORF');
    setSearchNotification(null);
  };

  const handleSelectStay = (stay: Stay) => {
    setSelectedStay(stay);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#6174d3] text-slate-900 flex flex-col justify-center items-center p-0 md:p-6 lg:p-10 transition-colors duration-300">
      
      {/* View Mode & Control Pill (Top Right on desktop) */}
      <div className="fixed top-3 right-3 z-40 hidden sm:flex items-center gap-2 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs shadow-lg border border-white/10">
        <button
          onClick={() => setViewMode(viewMode === 'framed' ? 'fullscreen' : 'framed')}
          className="flex items-center gap-1.5 hover:text-[#f0fa3c] transition-colors"
          title={viewMode === 'framed' ? "Expand to Fullscreen" : "Switch to Framed View"}
        >
          {viewMode === 'framed' ? (
            <>
              <Maximize2 className="w-3.5 h-3.5" />
              <span className="font-medium">Fullscreen</span>
            </>
          ) : (
            <>
              <Minimize2 className="w-3.5 h-3.5" />
              <span className="font-medium">Framed View</span>
            </>
          )}
        </button>
      </div>

      {/* Main Presentation Container */}
      <div 
        className={`relative w-full overflow-hidden bg-[#e7eaee] shadow-[0_25px_60px_-15px_rgba(20,30,80,0.35)] transition-all duration-300 flex flex-col justify-between ${
          viewMode === 'framed'
            ? 'max-w-[1440px] min-h-[820px] md:min-h-[860px] md:rounded-[36px] my-auto'
            : 'min-h-screen rounded-none'
        }`}
      >
        {/* Background Atmospheric Art: Spray Texture, Neon Glow, and Doodle */}
        <HeroBackground />

        {/* Top Bar Navigation */}
        <TopBar
          onOpenMenu={() => setIsMenuOpen(true)}
          onOpenGlobe={() => setIsGlobeOpen(true)}
          currentLocation={locationName}
          onSelectLocation={(loc) => setLocationName(loc)}
        />

        {/* Center Hero Section */}
        <main className="relative z-20 flex-1 flex flex-col justify-center items-center text-center px-4 sm:px-8 pt-4 pb-2">
          
          {/* Curated Stays Tag / Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-black/10 bg-white/40 backdrop-blur-sm shadow-2xs mb-5 animate-in fade-in duration-300">
            <span className="text-[11px] sm:text-xs font-semibold tracking-wider text-slate-800 uppercase select-none">
              CURATED STAYS WITH SJ©
            </span>
          </div>

          {/* Hero Big Headline with Brutalist Arrow Glyph */}
          <h1 className="text-slate-900 font-extrabold tracking-[-0.04em] leading-[0.96] text-[clamp(2.5rem,5.6vw,5.5rem)] max-w-5xl select-none">
            <span className="block">Unique homes</span>
            <span className="flex items-center justify-center flex-wrap">
              <span>across</span>
              <BrutalistArrowGlyph className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-14 mx-2 sm:mx-3" />
              <span>the globe</span>
            </span>
          </h1>

          {/* Search Console (The Floating Interactive Pill) */}
          <div className="w-full mt-7 sm:mt-9">
            <SearchConsole
              searchState={searchState}
              onSearchChange={handleSearchChange}
              onStartJourney={handleStartJourney}
            />
          </div>

          {/* Search Feedback / Filter Notice */}
          {searchNotification && (
            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-slate-700 bg-white/70 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-black/5 animate-in fade-in duration-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>{searchNotification}</span>
              <button 
                onClick={handleResetFilter}
                className="ml-1 text-slate-400 hover:text-slate-900"
                title="Clear filter"
              >
                <FilterX className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </main>

        {/* Bottom Architectural Stays Carousel */}
        <section className="relative z-20 w-full mt-auto">
          <StaysCarousel
            stays={filteredStays}
            savedStayIds={savedStayIds}
            onToggleSave={handleToggleSave}
            onSelectStay={handleSelectStay}
          />
        </section>

      </div>

      {/* Modals & Slide-Overs */}
      
      {/* 1. Stay Details Modal */}
      <StayModal
        stay={selectedStay}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isSaved={selectedStay ? savedStayIds.includes(selectedStay.id) : false}
        onToggleSave={handleToggleSave}
      />

      {/* 2. Menu Slide-over Drawer */}
      <MenuDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        stays={CURATED_STAYS}
        savedStayIds={savedStayIds}
        onSelectStay={handleSelectStay}
        activeCurrency={activeCurrency}
        onChangeCurrency={setActiveCurrency}
      />

      {/* 3. Global Coordinates Map Modal */}
      <GlobeMapModal
        isOpen={isGlobeOpen}
        onClose={() => setIsGlobeOpen(false)}
        stays={CURATED_STAYS}
        onSelectStay={handleSelectStay}
      />

    </div>
  );
}
