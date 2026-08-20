import React from 'react';
import { ART_MOVEMENTS } from '../data/movements';
import { Artwork } from '../types';
import { ClassicalCorner, ClassicalDivider, SunEmblem, MoonEmblem } from './ClassicalOrnaments';

interface MovementLineageProps {
  artworks: Artwork[];
  onOpenArtwork: (artwork: Artwork) => void;
  onSelectPeriod: (periodId: string) => void;
}

export const MovementLineage: React.FC<MovementLineageProps> = ({
  artworks,
  onOpenArtwork,
  onSelectPeriod
}) => {
  const eras = ART_MOVEMENTS.filter(m => m.id !== 'all');

  return (
    <div className="max-w-6xl mx-auto py-4 px-2 sm:px-4 relative z-20">
      {/* Title & Introduction Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 mb-2">
          <SunEmblem className="w-5 h-5 text-[#ffd966]" />
          <span className="font-serif uppercase tracking-widest text-xs text-[#ffd966] font-bold">
            HISTORIA ARTIS OCCIDENTALIS · 流派演进长卷
          </span>
          <MoonEmblem className="w-5 h-5 text-[#ffd966]" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#f5ecd5] font-serif-sc mb-3 drop-shadow">
          西方艺术流派千禧演进全景谱系
        </h1>
        <p className="text-xs sm:text-sm text-[#b8a78e] leading-relaxed font-serif-sc">
          从神圣中世纪的金色圣光与拜占庭符号，到文艺复兴的科学透视、巴洛克的剧场明暗对照、浪漫主义的狂放热血，再到印象派的光色解构与现代精神呐喊。
        </p>
        <ClassicalDivider title="美学嬗变长卷" subtitle="从神性到人性，再到心灵主观世界" />
      </div>

      {/* Chronological Vertical Timeline with Branching Works */}
      <div className="relative pl-6 sm:pl-10 space-y-12 border-l-2 border-[#c59b27]/60 ml-2 sm:ml-6">
        {eras.map((era, index) => {
          const eraArtworks = artworks.filter(a => a.periodId === era.id);

          return (
            <div 
              key={era.id} 
              id={`lineage-era-${era.id}`}
              className="relative group"
            >
              {/* Timeline Golden Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#1e170e] border-2 border-[#e5be53] flex items-center justify-center shadow-[0_0_12px_rgba(229,190,83,0.5)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffd966]" />
              </div>

              {/* Movement Header Manuscript Card in Dark-Gold */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#1c1710] to-[#120e08] border border-[#c59b27]/80 shadow-2xl relative overflow-hidden mb-6">
                <ClassicalCorner position="tl" className="absolute top-2 left-2" />
                <ClassicalCorner position="tr" className="absolute top-2 right-2" />

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3 border-b border-[#423214] pb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-serif font-bold px-2 py-0.5 rounded bg-[#2e220d] text-[#ffd966] border border-[#8c6d21]">
                        第 {index + 1} 纪元 · {era.eraRange}
                      </span>
                      <h2 className="text-lg sm:text-xl font-bold text-[#f5ebd6] font-serif-sc">
                        {era.name}
                      </h2>
                      <span className="text-xs text-[#a6967e] font-serif">
                        ({era.nameEn})
                      </span>
                    </div>
                    <p className="text-xs text-[#cfc2ad] font-serif-sc leading-relaxed">
                      {era.fullDesc}
                    </p>
                  </div>

                  <button
                    id={`filter-period-btn-${era.id}`}
                    onClick={() => onSelectPeriod(era.id)}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-b from-[#2e220d] to-[#1a1306] hover:from-[#3d2e11] hover:to-[#221808] text-[#ffd966] border border-[#c59b27] text-xs font-serif-sc font-bold transition-all cursor-pointer whitespace-nowrap self-start md:self-auto shadow-md"
                  >
                    在沙龙画廊查看全部 ({eraArtworks.length})
                  </button>
                </div>

                {/* Key Masters & Philosophical Context */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-serif-sc">
                  <div className="p-3 rounded-xl bg-[#17120a] border border-[#3b2b10]">
                    <span className="text-[#ffd966] font-bold block mb-1">代表艺术巨匠:</span>
                    <span className="text-[#dcd1be]">{era.keyMasters.join('、')}</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#17120a] border border-[#3b2b10]">
                    <span className="text-[#ffd966] font-bold block mb-1">核心哲学主张:</span>
                    <span className="text-[#dcd1be]">{era.philosophicalContext}</span>
                  </div>
                </div>
              </div>

              {/* Artworks belonging to this movement */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {eraArtworks.map((artwork) => (
                  <div
                    key={artwork.id}
                    onClick={() => onOpenArtwork(artwork)}
                    className="group/item p-3 rounded-xl bg-gradient-to-b from-[#18130b] to-[#120e07] border border-[#423214] hover:border-[#e5be53] transition-all cursor-pointer shadow-lg hover:shadow-[0_4px_16px_rgba(229,190,83,0.2)] flex items-center gap-3"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#c59b27]/40 flex-shrink-0 bg-[#0a0805]">
                      <img
                        src={artwork.parodyImageUrl || artwork.originalImageUrl}
                        alt={artwork.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover/item:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif-sc font-bold text-xs sm:text-sm text-[#f5ebd6] group-hover/item:text-[#ffd966] truncate">
                        {artwork.title}
                      </h4>
                      <p className="text-[11px] text-[#a6967e] font-serif truncate">
                        致敬：{artwork.artist}
                      </p>
                      <span className="text-[10px] text-[#ffd966] font-medium font-serif-sc block mt-0.5">
                        点击查看深度评析 →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
