import React from 'react';

export const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
      {/* Base Canvas Subtle Grain */}
      <div className="absolute inset-0 bg-[#e7eaee]" />

      {/* Top Left: Periwinkle / Indigo Airbrush Texture Spray */}
      <div 
        className="absolute -top-12 -left-12 w-[46%] h-[58%] opacity-90 blur-2xl"
        style={{
          background: 'radial-gradient(ellipse at 15% 15%, rgba(105, 126, 219, 0.85) 0%, rgba(135, 155, 235, 0.55) 45%, rgba(160, 180, 245, 0.2) 70%, transparent 100%)',
          clipPath: 'polygon(0% 0%, 100% 0%, 85% 70%, 55% 95%, 0% 85%)'
        }}
      />
      
      {/* Textured grain stipple spray over top-left */}
      <div 
        className="absolute top-0 left-0 w-[42%] h-[50%] mix-blend-overlay opacity-60 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(50, 70, 180, 0.4) 1px, transparent 0)`,
          backgroundSize: '4px 4px',
          maskImage: 'radial-gradient(ellipse at 20% 20%, black 20%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 20% 20%, black 20%, transparent 75%)'
        }}
      />

      {/* Top Center-Right: Vibrant Neon Lemon-Yellow Starburst Beam */}
      <div 
        className="absolute -top-16 left-[38%] w-[45%] h-[54%] blur-3xl opacity-90"
        style={{
          background: 'conic-gradient(from 160deg at 50% 0%, rgba(255, 248, 50, 0.95) 0deg, rgba(235, 252, 60, 0.9) 65deg, rgba(245, 255, 110, 0.5) 120deg, transparent 180deg)'
        }}
      />
      
      {/* Secondary bright center glow */}
      <div 
        className="absolute -top-10 left-[42%] w-[32%] h-[40%] blur-2xl opacity-80"
        style={{
          background: 'radial-gradient(circle at 50% 10%, rgba(254, 252, 65, 0.95) 0%, rgba(240, 255, 75, 0.6) 45%, transparent 75%)'
        }}
      />

      {/* Far Right Soft Ambient Glow */}
      <div 
        className="absolute top-[25%] -right-16 w-[36%] h-[60%] blur-3xl opacity-45"
        style={{
          background: 'radial-gradient(ellipse at 80% 50%, rgba(250, 245, 90, 0.75) 0%, rgba(245, 240, 150, 0.3) 50%, transparent 80%)'
        }}
      />

      {/* Elegant Organic Yellow Wire Doodle behind Typography */}
      <svg
        className="absolute top-[12%] right-[10%] w-[48%] h-[55%] opacity-70"
        viewBox="0 0 600 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 120,280 C 180,120 320,60 480,90 C 560,110 520,220 420,250 C 310,285 240,160 350,110 C 430,75 510,130 540,210 C 560,260 480,330 380,310 C 270,290 290,190 380,170 C 460,150 490,240 450,290"
          stroke="#e0dc68"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};
