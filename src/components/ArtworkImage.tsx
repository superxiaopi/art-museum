import React, { useState, useEffect } from 'react';
import { Sparkles, Upload, Image as ImageIcon } from 'lucide-react';
import { compressImageFile } from '../utils/storage';

interface ArtworkImageProps {
  src: string;
  alt: string;
  fallbackSrc?: string;
  className?: string;
  fallbackTitle?: string;
  fallbackSubtitle?: string;
  onUploadImage?: (base64: string) => void;
  showUploadTrigger?: boolean;
}

export const ArtworkImage: React.FC<ArtworkImageProps> = ({
  src,
  alt,
  fallbackSrc,
  className = 'w-full h-full object-cover',
  fallbackTitle = '古典名画鉴赏',
  fallbackSubtitle = '西方艺术史经典巨作',
  onUploadImage,
  showUploadTrigger = false
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src || fallbackSrc || '');
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Sync state whenever props change
  useEffect(() => {
    const nextSrc = src || fallbackSrc || '';
    setCurrentSrc(nextSrc);
    setHasError(!nextSrc);
    setIsLoading(Boolean(nextSrc));
  }, [src, fallbackSrc]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !onUploadImage) return;

    try {
      const base64 = await compressImageFile(file);
      if (base64) {
        onUploadImage(base64);
        setCurrentSrc(base64);
        setHasError(false);
        setIsLoading(false);
      }
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const base64 = event.target.result as string;
          onUploadImage(base64);
          setCurrentSrc(base64);
          setHasError(false);
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      // Try fallback URL before completely giving up
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
    } else {
      setIsLoading(false);
      setHasError(true);
    }
  };

  if (hasError || !currentSrc) {
    return (
      <div className={`relative flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#241a0d] via-[#171108] to-[#0d0a05] text-center select-none overflow-hidden ${className}`}>
        {/* Subtle Canvas Texture Pattern & Classical Inner Borders */}
        <div className="absolute inset-2 border border-[#c59b27]/40 rounded-lg pointer-events-none" />
        <div className="absolute inset-3 border border-[#c59b27]/20 rounded-md pointer-events-none" />
        
        {/* Glowing Ambient Core */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ffd966]/20 to-[#8c6721]/10 border border-[#e5be53]/40 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(229,190,83,0.25)]">
          <span className="text-2xl animate-pulse">🐉</span>
        </div>

        <h4 className="text-xs sm:text-sm font-bold font-serif-sc text-[#f5ebd6] drop-shadow-md mb-1 max-w-[85%] truncate">
          {fallbackTitle}
        </h4>
        <p className="text-[10px] text-[#a6967e] font-serif max-w-[85%] truncate mb-2">
          {fallbackSubtitle}
        </p>

        {onUploadImage && (
          <label className="relative z-20 inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gradient-to-b from-[#3d2e11] to-[#241a08] border border-[#c59b27] text-[#ffd966] text-[11px] font-serif-sc font-bold hover:from-[#4d3a17] hover:to-[#2e220d] hover:text-[#fff4cc] shadow-md cursor-pointer transition-all">
            <Upload className="w-3 h-3" />
            <span>点此载入本地素材图片</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0a0805]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#17120a] z-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-5 h-5 border-2 border-[#ffd966] border-t-transparent rounded-full animate-spin" />
            <span className="text-[10px] text-[#a6967e] font-serif-sc">名画载入中...</span>
          </div>
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={handleError}
        className={className}
      />
    </div>
  );
};
