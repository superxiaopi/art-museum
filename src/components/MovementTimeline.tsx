import React from 'react';
import { ART_MOVEMENTS } from '../data/movements';
import { ArtPeriodId } from '../types';
import { Sparkles, Sun, Compass, Crown, Flame, Palette, Zap } from 'lucide-react';
import { ClassicalCorner, ColumnEmblem } from './ClassicalOrnaments';

interface MovementTimelineProps {
  selectedPeriod: ArtPeriodId;
  onSelectPeriod: (id: ArtPeriodId) => void;
  periodCounts: Record<string, number>;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-4 h-4" />,
  Sun: <Sun className="w-4 h-4" />,
  Compass: <Compass className="w-4 h-4" />,
  Crown: <Crown className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />
};

export const MovementTimeline: React.FC<MovementTimelineProps> = ({
  selectedPeriod,
  onSelectPeriod,
  periodCounts
}) => {
  const currentMovement = ART_MOVEMENTS.find(m => m.id === selectedPeriod) || ART_MOVEMENTS[0];

  return (
    <div className="w-full mb-8 relative z-20">
      {/* Ribbon Bar Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <div className="flex items-center gap-2">
          <ColumnEmblem className="w-4 h-4 text-[#e5be53]" />
          <span className="text-xs uppercase font-serif-sc font-bold tracking-widest text-[#ffd966]">
            艺术流派时空长卷 (CHRONOLOGICAL ART MOVEMENTS)
          </span>
        </div>
        <span className="text-xs text-[#9e8d75] font-serif-sc hidden sm:inline">
          点击切换不同艺术时期的名画沙龙
        </span>
      </div>

      {/* Horizontal Scrollable Dark-Gold Ribbon */}
      <div className="p-2 bg-[#17120a]/90 rounded-2xl border border-[#4d3a17] shadow-2xl mb-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {ART_MOVEMENTS.map((movement) => {
            const isSelected = selectedPeriod === movement.id;
            const count = periodCounts[movement.id] || 0;

            return (
              <button
                key={movement.id}
                id={`period-tab-${movement.id}`}
                onClick={() => onSelectPeriod(movement.id)}
                className={`group flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap relative ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#2d2210] to-[#1a140b] border-[#e5be53] text-[#fff0c2] shadow-[0_0_15px_rgba(229,190,83,0.25)] ring-1 ring-[#ffd966]/40'
                    : 'bg-[#1e170e]/80 border-[#3d2e13] text-[#8e7e68] hover:border-[#a8822c] hover:text-[#f5ebd6] hover:bg-[#251e12]'
                }`}
              >
                <div 
                  className={`p-1.5 rounded-lg transition-colors ${
                    isSelected ? 'bg-[#3d2d10] text-[#ffd966]' : 'bg-[#18120a] text-[#7d6f5c] group-hover:text-[#e5be53]'
                  }`}
                >
                  {ICON_MAP[movement.icon] || <Palette className="w-4 h-4" />}
                </div>

                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif-sc font-bold text-xs sm:text-sm">{movement.name}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isSelected ? 'bg-[#4d3a16] text-[#ffd966] font-bold border border-[#a8822c]' : 'bg-black/30 text-[#8a7b68]'
                    }`}>
                      {count}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#8c7a64] block font-serif">
                    {movement.eraRange}
                  </span>
                </div>

                {isSelected && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-4 h-1 bg-[#ffd966] rounded-full shadow-[0_0_8px_#ffd966]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Movement Manuscript Plaque */}
      {currentMovement && (
        <div className="rounded-2xl bg-gradient-to-br from-[#1a150e] via-[#141009] to-[#0f0c07] border border-[#c59b27]/70 p-5 sm:p-6 relative overflow-hidden transition-all shadow-2xl">
          {/* Classical Ornaments */}
          <ClassicalCorner position="tl" className="absolute top-2 left-2" />
          <ClassicalCorner position="tr" className="absolute top-2 right-2" />
          <ClassicalCorner position="bl" className="absolute bottom-2 left-2" />
          <ClassicalCorner position="br" className="absolute bottom-2 right-2" />

          {/* Ambient Glow */}
          <div className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-[#c59b27]/10 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 px-1">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded text-[11px] font-serif font-bold bg-[#2e220d] text-[#ffd966] border border-[#8c6d21] shadow-inner">
                  {currentMovement.eraRange}
                </span>
                <h2 className="text-base sm:text-xl font-bold text-[#f5ebd6] font-serif-sc flex items-center gap-2">
                  {currentMovement.name}
                  <span className="text-xs font-normal text-[#9e8d77] font-serif">
                    ({currentMovement.nameEn})
                  </span>
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-[#d4c7b2] leading-relaxed mb-3.5 font-serif-sc">
                {currentMovement.fullDesc}
              </p>

              {/* Aesthetic Traits Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-[#a6967e] font-serif-sc mr-1">核心技法与美学特征:</span>
                {currentMovement.keyTraits.map((trait, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2.5 py-0.5 rounded-md bg-[#241c10] text-[#ffd966] border border-[#523e19] font-serif-sc font-medium"
                  >
                    ✦ {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Masters & Era Philosophy Note */}
            <div className="bg-[#19140c] rounded-xl p-4 border border-[#423214] min-w-[280px] lg:max-w-xs shadow-inner">
              <div className="text-[11px] text-[#ffd966] font-serif-sc font-semibold mb-1 flex items-center gap-1.5">
                <ColumnEmblem className="w-3.5 h-3.5 text-[#e5be53]" />
                <span>代表大师与时代思潮</span>
              </div>
              <div className="text-xs font-bold text-[#f0e4cc] mb-2 font-serif-sc">
                {currentMovement.keyMasters.join(' · ')}
              </div>
              <p className="text-[11px] text-[#b8a78e] italic font-serif-sc leading-relaxed border-t border-[#36270d] pt-2">
                "{currentMovement.philosophicalContext}"
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
