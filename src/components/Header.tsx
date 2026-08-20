import React from 'react';
import { Palette, History, FolderPlus } from 'lucide-react';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onSelectView: (view: ViewMode) => void;
  totalArtworksCount: number;
  userUploadCount: number;
  onOpenWorkshop: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onSelectView,
  totalArtworksCount,
  userUploadCount,
  onOpenWorkshop
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-[#5c4618]/70 bg-[#120e09]/95 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-2xl transition-all">
      <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Salon Title */}
        <div className="flex items-center gap-3.5 w-full md:w-auto justify-between md:justify-start">
          <button 
            id="header-brand-logo-btn"
            onClick={() => onSelectView('grid')}
            className="flex items-center gap-3.5 group text-left cursor-pointer"
          >
            {/* Salon Gold Emblem with Glow */}
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ffe599] via-[#d4a737] to-[#6b4e13] flex items-center justify-center shadow-[0_0_15px_rgba(212,167,55,0.4)] border border-[#ffecb3] group-hover:scale-105 transition-transform relative overflow-hidden">
              <div className="absolute inset-0 border border-white/40 rounded-lg pointer-events-none" />
              <span className="text-2xl font-bold select-none drop-shadow">🐉</span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif-sc font-bold text-lg tracking-wider text-[#f5ecd5] group-hover:text-[#ffd966] transition-colors drop-shadow">
                  奶龙西方艺术鉴赏沙龙
                </span>
                <span className="text-[10px] font-serif uppercase tracking-widest px-2 py-0.5 rounded-full bg-[#2a1f0a] text-[#ffd966] border border-[#a37920] hidden sm:inline-block font-semibold shadow-inner">
                  SALON D'ART
                </span>
              </div>
              <p className="text-xs text-[#a6957c] tracking-wide font-serif-sc flex items-center gap-1.5">
                <span>西方艺术流派演进 · 名画二创深度鉴赏与立体金棘华章</span>
              </p>
            </div>
          </button>

          {/* Quick upload button on mobile */}
          <button
            id="mobile-upload-workshop-btn"
            onClick={onOpenWorkshop}
            className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#291e0a] text-[#ffd966] text-xs font-serif-sc border border-[#a37920]"
          >
            <FolderPlus className="w-3.5 h-3.5 text-[#ffd966]" />
            <span>素材工坊</span>
          </button>
        </div>

        {/* Focused View Navigation Tabs */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <nav className="flex items-center gap-1.5 p-1 bg-[#1a140b] rounded-xl border border-[#473412] shadow-inner">
            <button
              id="nav-tab-grid"
              onClick={() => onSelectView('grid')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap font-serif-sc ${
                currentView === 'grid'
                  ? 'bg-gradient-to-b from-[#2d2210] to-[#1e160a] text-[#ffd966] border border-[#c59b27] shadow-[0_0_10px_rgba(197,155,39,0.3)] font-bold'
                  : 'text-[#9c8b74] hover:text-[#f0e4cc] hover:bg-[#231b0e]'
              }`}
            >
              <Palette className="w-4 h-4 text-[#e5be53]" />
              <span>古典沙龙画廊</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-[#3d2e12] text-[#ffe699] font-mono border border-[#6b501b]">
                {totalArtworksCount}
              </span>
            </button>

            <button
              id="nav-tab-lineage"
              onClick={() => onSelectView('lineage')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap font-serif-sc ${
                currentView === 'lineage'
                  ? 'bg-gradient-to-b from-[#2d2210] to-[#1e160a] text-[#ffd966] border border-[#c59b27] shadow-[0_0_10px_rgba(197,155,39,0.3)] font-bold'
                  : 'text-[#9c8b74] hover:text-[#f0e4cc] hover:bg-[#231b0e]'
              }`}
            >
              <History className="w-4 h-4 text-[#e5be53]" />
              <span>千禧流派长卷谱系</span>
            </button>
          </nav>

          {/* Material Workshop Entrance */}
          <div className="hidden md:flex items-center">
            <button
              id="desktop-upload-workshop-btn"
              onClick={onOpenWorkshop}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-b from-[#291e0a] to-[#1a1306] hover:from-[#382a0e] hover:to-[#221808] text-[#ffd966] border border-[#c59b27]/80 shadow-[0_4px_12px_rgba(0,0,0,0.6)] transition-all text-xs font-serif-sc font-bold cursor-pointer group"
            >
              <FolderPlus className="w-4 h-4 text-[#ffdb66] group-hover:scale-110 transition-transform" />
              <span>素材入馆与管理</span>
              {userUploadCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-md bg-[#c59b27] text-[#1a1204] text-[10px] font-bold">
                  +{userUploadCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
