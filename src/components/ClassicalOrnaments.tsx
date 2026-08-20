import React from 'react';

/**
 * Classical Architectural & Filigree Ornaments for Dark-Gold & Gilded Rose Aesthetics
 * Inspired by 16th-18th Century European Engravings and Gilded Gold Leaf
 */

// Elegant corner flourish with gold gradient / glow
export const ClassicalCorner: React.FC<{ position: 'tl' | 'tr' | 'bl' | 'br'; className?: string }> = ({ position, className = '' }) => {
  const transform = {
    tl: '',
    tr: 'scale-x-[-1]',
    bl: 'scale-y-[-1]',
    br: 'scale-x-[-1] scale-y-[-1]'
  }[position];

  return (
    <svg
      className={`w-5 h-5 text-[#e5be53] opacity-90 pointer-events-none drop-shadow-[0_0_4px_rgba(229,190,83,0.4)] ${transform} ${className}`}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M2 38V12C2 6.47715 6.47715 2 12 2H38M6 38V14C6 9.58172 9.58172 6 14 6H38M2 2L14 14"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      <path d="M22 6C20 9 20 13 24 16C21 16 17 15 15 12" strokeWidth="1" />
      <path d="M6 22C9 20 13 20 16 24C16 21 15 17 12 15" strokeWidth="1" />
    </svg>
  );
};

// Gilded Crimson Rose Miniature Emblem
export const GildedRoseEmblem: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={`drop-shadow-[0_0_6px_rgba(229,190,83,0.5)] ${className}`} viewBox="0 0 40 40" fill="none">
    <circle cx="20" cy="20" r="16" fill="#8c0e18" stroke="#ffd257" strokeWidth="1.2" />
    <path d="M12,20 C10,14 16,8 20,8 C24,8 30,14 28,20 C26,26 22,30 20,30 C18,30 14,26 12,20 Z" fill="#cf1928" stroke="#ffd257" strokeWidth="1.2" />
    <path d="M16,16 C18,12 22,12 24,16 C25,19 22,23 20,23 C18,23 15,19 16,16 Z" fill="#ff4d5a" stroke="#ffd257" strokeWidth="1" />
    <circle cx="20" cy="18" r="2" fill="#fff6cc" />
  </svg>
);

// Classical Header Arch & Ribbon Divider in Gilded Gold with Crimson Rose Accent
export const ClassicalDivider: React.FC<{ title?: string; subtitle?: string; className?: string }> = ({ 
  title, 
  subtitle,
  className = '' 
}) => {
  return (
    <div className={`flex flex-col items-center justify-center my-6 text-center ${className}`}>
      <div className="flex items-center justify-center gap-3 w-full max-w-lg">
        <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#c59b27] to-[#ffd966]" />
        <div className="flex items-center gap-2 text-[#ffd966]">
          <GildedRoseEmblem className="w-4 h-4" />
          {title && (
            <span className="font-serif-sc text-xs sm:text-sm font-bold tracking-widest text-[#f5ecd5] uppercase px-1 text-shadow">
              {title}
            </span>
          )}
          <GildedRoseEmblem className="w-4 h-4" />
        </div>
        <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#c59b27] to-[#ffd966]" />
      </div>
      {subtitle && (
        <span className="text-[11px] font-serif text-[#b8a68b] tracking-widest uppercase mt-1">
          {subtitle}
        </span>
      )}
    </div>
  );
};

export const SunEmblem: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={`text-[#ffd966] drop-shadow-[0_0_8px_rgba(255,217,102,0.5)] ${className}`} viewBox="0 0 32 32" fill="currentColor">
    <circle cx="16" cy="16" r="6" />
    <path d="M16 2v4M16 26v4M2 16h4M26 16h4M6.1 6.1l2.8 2.8M23.1 23.1l2.8 2.8M6.1 25.9l2.8-2.8M23.1 8.9l2.8-2.8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const MoonEmblem: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={`text-[#ffd966] drop-shadow-[0_0_8px_rgba(255,217,102,0.5)] ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export const ColumnEmblem: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`text-[#e5be53] ${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16M6 4v16M18 4v16M4 20h16M10 4v16M14 4v16M3 2h18M3 22h18" strokeLinecap="round" />
  </svg>
);

export const FleurDeLis: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg className={`text-[#e5be53] ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C12 2 10 7 7 7C4 7 2 9 2 12C2 15 5 16 7 16C9 16 11 14 12 11C13 14 15 16 17 16C19 16 22 15 22 12C22 9 20 7 17 7C14 7 12 2 12 2ZM12 14C11 17 9 20 6 22H18C15 20 13 17 12 14Z" />
  </svg>
);
