import React, { useState } from 'react';
import { Artwork } from '../types';
import { Layers, Heart, Sparkles, Maximize2, Camera, Search } from 'lucide-react';
import { ArtworkImage } from './ArtworkImage';
import { compressImageFile } from '../utils/storage';

interface ArtworkCardProps {
  artwork: Artwork;
  onOpenDetail: (artwork: Artwork) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onUpdateArtworkImage?: (id: string, newImageBase64: string) => void;
  onSearchOriginal?: (artwork: Artwork) => void;
}

export const ArtworkCard: React.FC<ArtworkCardProps> = ({
  artwork,
  onOpenDetail,
  isFavorite,
  onToggleFavorite,
  onUpdateArtworkImage,
  onSearchOriginal
}) => {
  const [showOriginal, setShowOriginal] = useState(false);

  const handleQuickUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const file = e.target.files?.[0];
    if (!file || !onUpdateArtworkImage) return;

    try {
      const base64 = await compressImageFile(file);
      if (base64) {
        onUpdateArtworkImage(artwork.id, base64);
      }
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdateArtworkImage(artwork.id, event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const currentDisplaySrc = showOriginal 
    ? artwork.originalImageUrl 
    : (artwork.parodyImageUrl || artwork.originalImageUrl);

  return (
    <div 
      id={`artwork-card-${artwork.id}`}
      className="group bg-gradient-to-b from-[#1c160f] to-[#14100a] rounded-2xl border border-[#523e19] hover:border-[#e5be53] transition-all duration-300 flex flex-col overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.8)] hover:shadow-[0_12px_32px_rgba(229,190,83,0.2)] relative z-10"
    >
      {/* Visual Canvas Frame - Classical Dark Museum Hanging */}
      <div 
        className="relative aspect-[4/3] w-full overflow-hidden bg-[#0a0805] cursor-pointer" 
        onClick={() => onOpenDetail(artwork)}
      >
        {/* Frame inner gold line */}
        <div className="absolute inset-2 border border-[#c59b27]/30 pointer-events-none z-10 rounded-sm group-hover:border-[#ffd966]/60 transition-colors" />

        {/* Artwork Fail-safe Image Canvas */}
        <ArtworkImage
          src={currentDisplaySrc}
          fallbackSrc={artwork.originalImageUrl}
          alt={showOriginal ? artwork.originalTitle : artwork.title}
          fallbackTitle={showOriginal ? artwork.originalTitle : artwork.title}
          fallbackSubtitle={`致敬：${artwork.artist} (${artwork.year})`}
          onUploadImage={(base64) => onUpdateArtworkImage?.(artwork.id, base64)}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />

        {/* Top/Bottom Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#120e09]/95 via-transparent to-[#120e09]/60 pointer-events-none" />

        {/* Top Bar Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
          <span className="px-2.5 py-1 rounded-lg bg-[#140f09]/90 backdrop-blur-md text-[#ffd966] text-[11px] font-serif-sc font-semibold border border-[#c59b27]/60 flex items-center gap-1 shadow-lg">
            <Sparkles className="w-3 h-3 text-[#ffea9f]" />
            {artwork.movementName.split(' ')[0]}
          </span>

          <div className="flex items-center gap-1.5">
            {/* Quick Search & Match Classical Original Masterpiece */}
            {onSearchOriginal && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onSearchOriginal(artwork);
                }}
                className="p-1.5 rounded-lg bg-[#19130a]/90 backdrop-blur-md text-[#ffd966] hover:text-[#fff4cc] border border-[#8a681c] transition-colors flex items-center cursor-pointer shadow-lg hover:border-[#ffd966]"
                title="联网搜索并下载匹配名画原作"
              >
                <Search className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Quick Upload Local Image Button */}
            {onUpdateArtworkImage && (
              <label
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg bg-[#19130a]/90 backdrop-blur-md text-[#ffd966] hover:text-[#fff4cc] border border-[#8a681c] transition-colors flex items-center cursor-pointer shadow-lg hover:border-[#ffd966]"
                title="上传/替换此名画的二改图片素材"
              >
                <Camera className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleQuickUpload}
                  className="hidden"
                />
              </label>
            )}

            {/* Direct Quick Compare Toggle */}
            <button
              id={`toggle-version-${artwork.id}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setShowOriginal(!showOriginal);
              }}
              className="px-2.5 py-1 rounded-lg bg-[#19130a]/90 backdrop-blur-md text-[11px] font-serif-sc font-medium text-[#f5ecd5] hover:text-[#ffd966] border border-[#8a681c] transition-colors flex items-center gap-1.5 cursor-pointer shadow-lg hover:border-[#ffd966]"
              title="点击切换：奶龙二改 vs 名画原作"
            >
              <Layers className="w-3.5 h-3.5 text-[#ffd966]" />
              <span>{showOriginal ? '原作' : '奶龙二改'}</span>
            </button>

            {/* Favorite button */}
            <button
              id={`fav-btn-${artwork.id}`}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavorite(artwork.id);
              }}
              className={`p-1.5 rounded-lg backdrop-blur-md transition-colors cursor-pointer shadow-lg ${
                isFavorite 
                  ? 'bg-red-950/70 text-red-400 border border-red-500/70' 
                  : 'bg-[#140f09]/80 text-[#ffd966]/80 hover:text-red-400 border border-[#6b5018]'
              }`}
              title="收藏此作"
            >
              <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-red-400' : ''}`} />
            </button>
          </div>
        </div>

        {/* Hover Inspect Prompt */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-[2px] z-20">
          <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#ffd966] via-[#d4a737] to-[#99731e] text-[#1c1407] font-serif-sc font-bold text-xs flex items-center gap-2 shadow-[0_0_20px_rgba(255,217,102,0.4)] border border-white/60 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Maximize2 className="w-3.5 h-3.5" />
            <span>进入名画深度鉴赏与对照</span>
          </div>
        </div>

        {/* Bottom Title on Canvas */}
        <div className="absolute bottom-2.5 left-3.5 right-3.5 flex items-end justify-between z-20 pointer-events-none">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#faf1de] font-serif-sc drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
              {showOriginal ? artwork.originalTitle : artwork.title}
            </h3>
            <p className="text-[11px] text-[#decab0] drop-shadow font-serif">
              致敬：{artwork.artist} ({artwork.year})
            </p>
          </div>
        </div>
      </div>

      {/* Card Info Body - Dark Gilded Plaque */}
      <div className="p-4 flex-1 flex flex-col justify-between bg-gradient-to-b from-[#1c160f] to-[#120e08]">
        <div>
          {/* Composition Technique Tag */}
          <div className="mb-2">
            <span className="text-[11px] text-[#bfb099] line-clamp-1 flex items-center gap-1 font-serif-sc">
              <span className="text-[#ffd966] font-bold">构图技法:</span>
              <span>{artwork.compositionType}</span>
            </span>
          </div>

          {/* Parody & Aesthetic Critique Snippet */}
          <p className="text-xs text-[#cfc2ad] line-clamp-2 leading-relaxed mb-3 font-serif-sc">
            {artwork.parodyCommentary}
          </p>
        </div>

        {/* Card Footer with Palette Swatches & Action */}
        <div className="pt-3 border-t border-[#3b2b11] flex items-center justify-between">
          {/* Extracted Palette Preview */}
          <div className="flex items-center gap-1.5" title="名画提取色彩谱系">
            {artwork.colorPalette.slice(0, 4).map((swatch, idx) => (
              <span
                key={idx}
                className="w-3.5 h-3.5 rounded-full border border-black/50 shadow-[0_0_4px_rgba(0,0,0,0.8)]"
                style={{ backgroundColor: swatch.hex }}
                title={`${swatch.name} (${swatch.hex})`}
              />
            ))}
          </div>

          <button
            id={`inspect-btn-${artwork.id}`}
            onClick={() => onOpenDetail(artwork)}
            className="text-xs font-serif-sc font-bold text-[#ffd966] hover:text-[#fff4cc] flex items-center gap-1 transition-colors cursor-pointer group-hover:translate-x-0.5"
          >
            <span>深度评析</span>
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};
