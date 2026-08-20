import React, { useState, useEffect } from 'react';
import { Artwork } from '../types';
import { X, Volume2, VolumeX, Layers, Palette, BookOpen, Sparkles, Check, Search } from 'lucide-react';
import { ClassicalCorner } from './ClassicalOrnaments';
import { ArtworkImage } from './ArtworkImage';

interface ArtworkDetailModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onSelectRelated?: (artworkId: string) => void;
  onSearchOriginal?: (artwork: Artwork) => void;
}

export const ArtworkDetailModal: React.FC<ArtworkDetailModalProps> = ({
  artwork,
  onClose,
  onSearchOriginal
}) => {
  const [compareMode, setCompareMode] = useState<'split' | 'side_by_side' | 'toggle'>('split');
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [toggleIsOriginal, setToggleIsOriginal] = useState<boolean>(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Audio Speech Synthesis for curator guide
  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  if (!artwork) return null;

  const handleToggleAudio = () => {
    if (!('speechSynthesis' in window)) {
      alert('您的浏览器暂不支持语音朗读功能');
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${artwork.title}，二改自${artwork.artist}于${artwork.year}创作的${artwork.originalTitle}。${artwork.audioGuideScript} ${artwork.parodyCommentary}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'zh-CN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-gradient-to-br from-[#1c1710] to-[#120e08] rounded-3xl border-2 border-[#c59b27] shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden my-auto">
        {/* Classical Corners on Modal */}
        <ClassicalCorner position="tl" className="absolute top-3 left-3 z-30" />
        <ClassicalCorner position="tr" className="absolute top-3 right-14 z-30" />
        <ClassicalCorner position="bl" className="absolute bottom-3 left-3 z-30" />
        <ClassicalCorner position="br" className="absolute bottom-3 right-3 z-30" />

        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#4d3a17] bg-[#17120a] flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#2e220d] border border-[#a8822c] text-[#ffd966]">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif-sc text-[#f5ebd6]">
                  {artwork.title}
                </h2>
                <span className="text-xs px-2 py-0.5 rounded-full bg-[#2e220d] text-[#ffd966] font-serif border border-[#a8822c]">
                  {artwork.movementName}
                </span>
              </div>
              <p className="text-xs text-[#a6967e] font-serif">
                原作：{artwork.originalTitle} ({artwork.originalTitleEn}) · {artwork.artist} ({artwork.year})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Curator Guide Button */}
            <button
              id="curator-audio-guide-btn"
              onClick={handleToggleAudio}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-serif-sc font-bold transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-amber-600 text-white border-amber-500 animate-pulse'
                  : 'bg-[#291e0a] text-[#ffd966] border-[#c59b27] hover:bg-[#3d2d10]'
              }`}
              title="策展人语音深度导览"
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAudio ? '暂停导览' : '语音导览'}</span>
            </button>

            {/* Close Button */}
            <button
              id="close-modal-btn"
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#2e220d] text-[#a6967e] hover:text-[#ffd966] transition-colors cursor-pointer border border-[#4d3a17]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 max-h-[calc(92vh-75px)]">
          {/* Comparison Mode Header Controls */}
          <div className="bg-[#17120a] rounded-2xl p-3.5 border border-[#423214] flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs font-serif-sc font-bold text-[#ffd966]">
              <Layers className="w-4 h-4 text-[#e5be53]" />
              <span>名画与二改对比模式:</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {onSearchOriginal && (
                <button
                  type="button"
                  onClick={() => onSearchOriginal(artwork)}
                  className="px-3 py-1 rounded-xl bg-[#2e220d] text-[#ffd966] text-xs font-serif-sc font-bold border border-[#a8822c] hover:bg-[#423113] transition-colors flex items-center gap-1.5 shadow-sm"
                  title="联网搜索并下载匹配本作品的高清原作"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>搜索匹配原作</span>
                </button>
              )}

              <div className="flex items-center gap-1.5 bg-[#231b0e] p-1 rounded-xl border border-[#4a3816]">
                <button
                  id="mode-split-btn"
                  onClick={() => setCompareMode('split')}
                  className={`px-3 py-1 rounded-lg text-xs font-serif-sc transition-all cursor-pointer ${
                    compareMode === 'split' ? 'bg-[#3d2e11] text-[#ffd966] font-bold shadow-sm border border-[#a8822c]' : 'text-[#8e7e68] hover:text-[#f5ebd6]'
                  }`}
                >
                  滑动窗帘对比
                </button>
                <button
                  id="mode-side-btn"
                  onClick={() => setCompareMode('side_by_side')}
                  className={`px-3 py-1 rounded-lg text-xs font-serif-sc transition-all cursor-pointer ${
                    compareMode === 'side_by_side' ? 'bg-[#3d2e11] text-[#ffd966] font-bold shadow-sm border border-[#a8822c]' : 'text-[#8e7e68] hover:text-[#f5ebd6]'
                  }`}
                >
                  左右并排展示
                </button>
                <button
                  id="mode-toggle-btn"
                  onClick={() => setCompareMode('toggle')}
                  className={`px-3 py-1 rounded-lg text-xs font-serif-sc transition-all cursor-pointer ${
                    compareMode === 'toggle' ? 'bg-[#3d2e11] text-[#ffd966] font-bold shadow-sm border border-[#a8822c]' : 'text-[#8e7e68] hover:text-[#f5ebd6]'
                  }`}
                >
                  单图点击切换
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Artwork Stage */}
          <div className="w-full rounded-2xl bg-[#0a0805] border-2 border-[#c59b27] overflow-hidden relative shadow-2xl">
            {/* Mode 1: Split Curtain Slider */}
            {compareMode === 'split' && (
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full select-none overflow-hidden group">
                {/* Background Image: Classical Original */}
                <ArtworkImage
                  src={artwork.originalImageUrl}
                  alt={artwork.originalTitle}
                  fallbackTitle={artwork.originalTitle}
                  fallbackSubtitle={`原作：${artwork.artist}`}
                  className="absolute inset-0 w-full h-full object-contain bg-[#0a0805]"
                />
                <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-md bg-black/80 text-amber-200 text-xs font-serif border border-amber-500/40">
                  古典原作: {artwork.originalTitle}
                </div>

                {/* Foreground Clipped Image: NaiLong Parody */}
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: `${sliderPos}%` }}
                >
                  <ArtworkImage
                    src={artwork.parodyImageUrl || artwork.originalImageUrl}
                    alt={artwork.title}
                    fallbackTitle={artwork.title}
                    fallbackSubtitle={`二创解构：${artwork.title}`}
                    className="absolute inset-0 w-full h-full object-contain bg-[#0a0805]"
                  />
                  <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-[#e5be53] text-[#1c1407] text-xs font-serif-sc font-bold shadow-lg">
                    二创作品: {artwork.title}
                  </div>
                </div>

                {/* Vertical Divider Handle Line */}
                <div
                  className="absolute top-0 bottom-0 w-1 bg-[#ffd966] cursor-ew-resize z-20 shadow-[0_0_12px_#ffd966]"
                  style={{ left: `${sliderPos}%` }}
                >
                  <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gradient-to-br from-[#ffd966] to-[#b38b3f] border-2 border-white shadow-xl flex items-center justify-center text-black font-bold text-xs">
                    ↔
                  </div>
                </div>

                {/* Hidden range input to control slider smoothly */}
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={sliderPos}
                  onChange={(e) => setSliderPos(Number(e.target.value))}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
                  aria-label="拖动滑块对比名画与二改"
                />
              </div>
            )}

            {/* Mode 2: Side-by-side Presentation */}
            {compareMode === 'side_by_side' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2 bg-[#0a0805]">
                {/* Parody */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#c59b27]/40 bg-black/60">
                  <ArtworkImage
                    src={artwork.parodyImageUrl || artwork.originalImageUrl}
                    alt={artwork.title}
                    fallbackTitle={artwork.title}
                    fallbackSubtitle="奶龙二改"
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/80 text-amber-300 text-xs font-serif-sc border border-amber-500/30">
                    二改作品: {artwork.title}
                  </div>
                </div>

                {/* Original */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#c59b27]/40 bg-black/60">
                  <ArtworkImage
                    src={artwork.originalImageUrl}
                    alt={artwork.originalTitle}
                    fallbackTitle={artwork.originalTitle}
                    fallbackSubtitle={`原作：${artwork.artist}`}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/80 text-amber-100 text-xs font-serif border border-amber-500/30">
                    古典原作: {artwork.originalTitle}
                  </div>
                </div>
              </div>
            )}

            {/* Mode 3: Single Toggle */}
            {compareMode === 'toggle' && (
              <div 
                className="relative aspect-[16/10] sm:aspect-[16/9] w-full cursor-pointer overflow-hidden group"
                onClick={() => setToggleIsOriginal(!toggleIsOriginal)}
              >
                <ArtworkImage
                  src={toggleIsOriginal ? artwork.originalImageUrl : (artwork.parodyImageUrl || artwork.originalImageUrl)}
                  alt={toggleIsOriginal ? artwork.originalTitle : artwork.title}
                  fallbackTitle={toggleIsOriginal ? artwork.originalTitle : artwork.title}
                  fallbackSubtitle={toggleIsOriginal ? `原作：${artwork.artist}` : `二改：${artwork.title}`}
                  className="w-full h-full object-contain bg-[#0a0805]"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md text-[#ffd966] text-xs font-serif-sc border border-[#c59b27] shadow-xl">
                    点击画面切换: 当前正在查看【{toggleIsOriginal ? '古典原作' : '奶龙二创'}】
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Masterpiece & Parody Two-Column Analytical Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Left: Classical Painting Breakdown */}
            <div className="p-5 rounded-2xl bg-[#17120a] border border-[#423214] shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#36270e]">
                  <BookOpen className="w-4 h-4 text-[#ffd966]" />
                  <h3 className="font-serif-sc font-bold text-sm text-[#f5ebd6]">
                    古典名画档案与技法解析
                  </h3>
                </div>

                <div className="space-y-2.5 text-xs text-[#cfc2ad] font-serif-sc leading-relaxed mb-4">
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#ffd966] min-w-[70px]">艺术大师:</span>
                    <span>{artwork.artist}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#ffd966] min-w-[70px]">创作年代:</span>
                    <span>{artwork.year}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#ffd966] min-w-[70px]">媒介与材质:</span>
                    <span>{artwork.medium}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#ffd966] min-w-[70px]">藏馆位置:</span>
                    <span>{artwork.location}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#ffd966] min-w-[70px]">构图形式:</span>
                    <span className="text-[#f5ebd6] font-medium">{artwork.compositionType}</span>
                  </div>
                </div>

                <p className="text-xs text-[#dcd1be] leading-relaxed font-serif-sc bg-[#1e170c] p-3 rounded-xl border border-[#3b2b10]">
                  <strong className="text-[#ffd966] block mb-1">【历史背景与空间透视】</strong>
                  {artwork.historicalContext}
                </p>
              </div>

              {/* Technique Breakdown */}
              <div className="mt-4 pt-3 border-t border-[#36270e]">
                <span className="text-xs font-bold text-[#ffd966] block mb-1">【大师技法】</span>
                <p className="text-xs text-[#cfc2ad] leading-relaxed font-serif-sc">
                  {artwork.techniqueAnalysis}
                </p>
              </div>
            </div>

            {/* Right: Parody Aesthetic & Meme Critique */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-[#1c160e] to-[#120e07] border border-[#c59b27]/80 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-[#36270e]">
                  <Sparkles className="w-4 h-4 text-[#ffd966]" />
                  <h3 className="font-serif-sc font-bold text-sm text-[#f5ebd6]">
                    当代二改美学与解构评析
                  </h3>
                </div>

                <p className="text-xs text-[#dcd1be] leading-relaxed font-serif-sc mb-4">
                  {artwork.parodyCommentary}
                </p>

                {/* Color Palette Swatches */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#ffd966] font-serif-sc flex items-center gap-1.5">
                      <Palette className="w-3.5 h-3.5" />
                      名画提取色彩谱系 (点击复制HEX)
                    </span>
                    {copiedHex && (
                      <span className="text-[11px] text-green-400 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> 已复制 {copiedHex}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {artwork.colorPalette.map((swatch, idx) => (
                      <button
                        key={idx}
                        id={`swatch-btn-${idx}`}
                        onClick={() => handleCopyColor(swatch.hex)}
                        className="group p-2 rounded-xl border border-[#423214] bg-[#17120a] hover:border-[#ffd966] transition-all text-left cursor-pointer flex flex-col gap-1.5"
                      >
                        <div
                          className="w-full h-6 rounded-lg border border-black/40 shadow-sm"
                          style={{ backgroundColor: swatch.hex }}
                        />
                        <div>
                          <span className="font-mono text-[10px] font-bold text-[#f5ebd6] block group-hover:text-[#ffd966]">
                            {swatch.hex}
                          </span>
                          <span className="text-[10px] text-[#a6967e] line-clamp-1 font-serif-sc">
                            {swatch.name}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Tags and Metadata */}
              <div className="pt-3 border-t border-[#36270e] flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] text-[#a6967e] font-serif-sc mr-1">鉴赏标签:</span>
                {artwork.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-[#291e0a] text-[#ffd966] border border-[#7d6022] font-serif-sc font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
