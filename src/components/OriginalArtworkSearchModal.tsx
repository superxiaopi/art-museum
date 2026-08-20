import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Download, 
  Check, 
  ExternalLink, 
  Sparkles, 
  X, 
  Loader2, 
  Globe, 
  BookOpen, 
  RefreshCw,
  Palette,
  Layers,
  Image as ImageIcon
} from 'lucide-react';
import { ClassicalCorner } from './ClassicalOrnaments';
import { ArtworkImage } from './ArtworkImage';
import { 
  searchClassicalArtworks, 
  MatchedOriginalResult, 
  CURATED_MASTERPIECES,
  downloadAndConvertImageToBase64 
} from '../utils/artworkSearch';
import { Artwork } from '../types';

interface OriginalArtworkSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetArtwork?: Artwork | null;
  onSelectOriginalForArtwork?: (artworkId: string, originalData: MatchedOriginalResult, base64Url?: string) => void;
  onImportAsNewArtwork?: (originalData: MatchedOriginalResult, base64Url?: string) => void;
  onSelectForWorkshop?: (originalData: MatchedOriginalResult) => void;
}

export const OriginalArtworkSearchModal: React.FC<OriginalArtworkSearchModalProps> = ({
  isOpen,
  onClose,
  targetArtwork,
  onSelectOriginalForArtwork,
  onImportAsNewArtwork,
  onSelectForWorkshop
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<'all' | 'curated' | 'wikipedia' | 'artic'>('all');
  const [results, setResults] = useState<MatchedOriginalResult[]>(CURATED_MASTERPIECES);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedResult, setSelectedResult] = useState<MatchedOriginalResult | null>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  // Recommended quick search tags
  const hotTags = [
    '蒙娜丽莎',
    '最后的晚餐',
    '戴珍珠耳环的少女',
    '星月夜',
    '加利利海上的风暴',
    '大天使米迦勒',
    '创造亚当',
    '呐喊',
    '日出印象',
    '维纳斯的诞生',
    '雅典学院',
    '夜巡',
    '自由引导人民'
  ];

  // Initialize search with target artwork name if opened for a specific piece
  useEffect(() => {
    if (isOpen) {
      if (targetArtwork) {
        const query = targetArtwork.originalTitle.replace(/[《》]/g, '') || targetArtwork.title.replace(/[《》]/g, '');
        setSearchQuery(query);
        handleSearch(query, sourceFilter);
      } else {
        setResults(CURATED_MASTERPIECES);
      }
    }
  }, [isOpen, targetArtwork]);

  const handleSearch = async (query: string, filter = sourceFilter) => {
    if (!query.trim()) {
      setResults(CURATED_MASTERPIECES);
      return;
    }
    setIsLoading(true);
    try {
      const data = await searchClassicalArtworks(query, filter);
      setResults(data);
      if (data.length > 0) {
        setSelectedResult(data[0]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectTag = (tag: string) => {
    setSearchQuery(tag);
    handleSearch(tag, sourceFilter);
  };

  const handleConfirmMatch = async (result: MatchedOriginalResult) => {
    setDownloadingId(result.id);
    try {
      // Download and convert image to local Base64
      const base64Url = await downloadAndConvertImageToBase64(result.originalImageUrl);
      
      if (targetArtwork && onSelectOriginalForArtwork) {
        onSelectOriginalForArtwork(targetArtwork.id, result, base64Url);
      } else if (onImportAsNewArtwork) {
        onImportAsNewArtwork(result, base64Url);
      } else if (onSelectForWorkshop) {
        onSelectForWorkshop(result);
      }
      onClose();
    } catch (err) {
      console.error(err);
    } finally {
      setDownloadingId(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl rounded-3xl bg-[#140e06] border-2 border-[#8c6721] text-[#f5ebd6] shadow-[0_0_80px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col max-h-[92vh]">
        {/* Classical Ornamental Corners */}
        <ClassicalCorner position="tl" className="w-12 h-12 text-[#ffd966]/40 pointer-events-none" />
        <ClassicalCorner position="tr" className="w-12 h-12 text-[#ffd966]/40 pointer-events-none" />
        <ClassicalCorner position="bl" className="w-12 h-12 text-[#ffd966]/40 pointer-events-none" />
        <ClassicalCorner position="br" className="w-12 h-12 text-[#ffd966]/40 pointer-events-none" />

        {/* Modal Header */}
        <div className="relative z-10 px-6 py-4 border-b border-[#3d2e11] bg-gradient-to-r from-[#211709] via-[#1a1207] to-[#211709] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#2e220d] border border-[#a8822c] text-[#ffd966]">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-serif-sc text-[#f5ebd6] flex items-center gap-2">
                <span>世界名画原作智能检索与下载</span>
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#3d2e11] text-[#ffd966] border border-[#a8822c]">
                  Open Museum & Wikipedia API
                </span>
              </h3>
              <p className="text-xs text-[#a6967e] font-serif">
                {targetArtwork 
                  ? `正在为《${targetArtwork.title}》搜索匹配西方艺术史原作`
                  : '输入画作名称或艺术家，自动从全球博物馆与维基艺术库中检索超高清原作并下载本地缓存'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#a6967e] hover:text-[#ffd966] hover:bg-[#2e220d] transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search Bar & Filters */}
        <div className="p-5 border-b border-[#3d2e11] bg-[#1a1207]/70 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchQuery, sourceFilter);
            }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a6967e]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索西方名画（如：蒙娜丽莎、戴珍珠耳环的少女、星月夜、加利利海、伦勃朗、莫奈...）"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0f0a04] border border-[#523e19] focus:border-[#ffd966] text-[#f5ebd6] text-sm placeholder-[#6b583e] focus:outline-none transition-colors"
              />
            </div>

            {/* Source Filter Selector */}
            <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
              <button
                type="button"
                onClick={() => {
                  setSourceFilter('all');
                  handleSearch(searchQuery, 'all');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-serif-sc whitespace-nowrap border transition-all ${
                  sourceFilter === 'all'
                    ? 'bg-[#3d2e11] text-[#ffd966] border-[#ffd966]'
                    : 'bg-[#140e06] text-[#a6967e] border-[#3d2e11] hover:text-[#e5be53]'
                }`}
              >
                全部艺术源
              </button>
              <button
                type="button"
                onClick={() => {
                  setSourceFilter('curated');
                  handleSearch(searchQuery, 'curated');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-serif-sc whitespace-nowrap border transition-all ${
                  sourceFilter === 'curated'
                    ? 'bg-[#3d2e11] text-[#ffd966] border-[#ffd966]'
                    : 'bg-[#140e06] text-[#a6967e] border-[#3d2e11] hover:text-[#e5be53]'
                }`}
              >
                馆藏精选库
              </button>
              <button
                type="button"
                onClick={() => {
                  setSourceFilter('wikipedia');
                  handleSearch(searchQuery, 'wikipedia');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-serif-sc whitespace-nowrap border transition-all ${
                  sourceFilter === 'wikipedia'
                    ? 'bg-[#3d2e11] text-[#ffd966] border-[#ffd966]'
                    : 'bg-[#140e06] text-[#a6967e] border-[#3d2e11] hover:text-[#e5be53]'
                }`}
              >
                维基艺术百科
              </button>
              <button
                type="button"
                onClick={() => {
                  setSourceFilter('artic');
                  handleSearch(searchQuery, 'artic');
                }}
                className={`px-3 py-2 rounded-xl text-xs font-serif-sc whitespace-nowrap border transition-all ${
                  sourceFilter === 'artic'
                    ? 'bg-[#3d2e11] text-[#ffd966] border-[#ffd966]'
                    : 'bg-[#140e06] text-[#a6967e] border-[#3d2e11] hover:text-[#e5be53]'
                }`}
              >
                芝加哥美术馆
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-b from-[#4d3a17] to-[#2e220d] border border-[#c59b27] text-[#ffd966] text-xs font-bold font-serif-sc hover:from-[#5e471d] hover:to-[#3b2b11] shadow-lg flex items-center justify-center gap-2 cursor-pointer shrink-0"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
              <span>检索原作</span>
            </button>
          </form>

          {/* Quick Masterpiece Tags */}
          <div className="flex items-center gap-1.5 flex-wrap pt-1">
            <span className="text-[11px] text-[#7a6448] font-serif-sc mr-1">推荐名画:</span>
            {hotTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => handleSelectTag(tag)}
                className="px-2 py-0.5 rounded-md bg-[#241a0b] hover:bg-[#382810] border border-[#4a3615] text-[#d4c3a3] hover:text-[#ffd966] text-[11px] font-serif transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Grid & Detail Pane */}
        <div className="flex-1 overflow-y-auto p-5 grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left Column: Artwork Results Grid */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between text-xs text-[#a6967e] font-serif-sc pb-1">
              <span>检索到 {results.length} 幅名画原作</span>
              <span>点击卡片查看超清大图与艺术史考据</span>
            </div>

            {isLoading ? (
              <div className="py-16 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 text-[#ffd966] animate-spin" />
                <span className="text-xs text-[#a6967e] font-serif-sc">正在调取世界各大博物馆与维基百科数据库...</span>
              </div>
            ) : results.length === 0 ? (
              <div className="py-16 text-center text-[#a6967e] border border-dashed border-[#3d2e11] rounded-2xl bg-[#0d0904]">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-[#523e19]" />
                <p className="text-sm font-serif-sc">未找到完全匹配的名画结果</p>
                <p className="text-xs text-[#6b583e] mt-1">您可以尝试输入画作简写（如“蒙娜丽莎”、“星夜”或艺术家英文名）</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[520px] overflow-y-auto pr-1">
                {results.map((item) => {
                  const isSelected = selectedResult?.id === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setSelectedResult(item)}
                      className={`group relative p-3 rounded-xl border transition-all cursor-pointer flex flex-col gap-2.5 ${
                        isSelected
                          ? 'bg-[#291d0c] border-[#ffd966] shadow-[0_0_15px_rgba(255,217,102,0.25)]'
                          : 'bg-[#171006] border-[#3d2e11] hover:border-[#8c6721] hover:bg-[#1f1609]'
                      }`}
                    >
                      {/* Image Thumbnail */}
                      <div className="relative aspect-[4/3] rounded-lg overflow-hidden border border-[#523e19] bg-black">
                        <ArtworkImage
                          src={item.thumbnailUrl || item.originalImageUrl}
                          alt={item.originalTitle}
                          fallbackTitle={item.originalTitle}
                          fallbackSubtitle={item.artist}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-1.5 right-1.5 px-2 py-0.5 rounded-full bg-black/80 text-[10px] text-amber-200 border border-amber-500/30">
                          {item.source === 'curated' ? '🏛️ 典藏' : item.source === 'wikipedia' ? '🌐 Wikipedia' : '🏛️ Art Institute'}
                        </div>
                      </div>

                      {/* Info */}
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold font-serif-sc text-[#f5ebd6] group-hover:text-[#ffd966] truncate">
                          {item.originalTitle}
                        </h4>
                        <p className="text-[11px] text-[#a6967e] font-serif truncate mt-0.5">
                          {item.artist} · {item.year}
                        </p>
                        <p className="text-[10px] text-[#7a6448] font-serif truncate">
                          {item.location}
                        </p>
                      </div>

                      {/* Action Button inside card */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleConfirmMatch(item);
                        }}
                        disabled={downloadingId === item.id}
                        className="mt-auto w-full py-1.5 rounded-lg bg-[#3d2e11] hover:bg-[#523e19] text-[#ffd966] text-xs font-serif-sc font-bold border border-[#a8822c] transition-colors flex items-center justify-center gap-1.5"
                      >
                        {downloadingId === item.id ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Download className="w-3.5 h-3.5" />
                        )}
                        <span>{targetArtwork ? '下载并匹配为此画原作' : '下载并收录入展厅'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Column: Selected Artwork Inspection & Preview Pane */}
          <div className="lg:col-span-5 bg-[#0f0a04] border border-[#3d2e11] rounded-2xl p-4 flex flex-col justify-between">
            {selectedResult ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-[#241a0b] pb-2">
                  <span className="text-xs font-serif-sc text-[#ffd966] font-bold">名画高清档案预览</span>
                  <span className="text-[10px] text-[#7a6448]">{selectedResult.originalTitleEn}</span>
                </div>

                {/* Big Preview */}
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden border-2 border-[#a8822c]/50 bg-black shadow-inner">
                  <ArtworkImage
                    src={selectedResult.originalImageUrl}
                    alt={selectedResult.originalTitle}
                    fallbackTitle={selectedResult.originalTitle}
                    fallbackSubtitle={selectedResult.artist}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Text Metadata */}
                <div className="space-y-2 text-xs">
                  <div>
                    <h3 className="text-base font-bold font-serif-sc text-[#ffd966]">
                      {selectedResult.originalTitle}
                    </h3>
                    <p className="text-xs text-[#d4c3a3] font-serif">
                      {selectedResult.artist} ({selectedResult.year})
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div className="p-2 rounded-lg bg-[#1a1207] border border-[#3d2e11]">
                      <span className="text-[#7a6448] block">流派时期:</span>
                      <span className="text-[#e5be53] font-serif-sc font-medium">{selectedResult.movementName}</span>
                    </div>
                    <div className="p-2 rounded-lg bg-[#1a1207] border border-[#3d2e11]">
                      <span className="text-[#7a6448] block">典藏机构:</span>
                      <span className="text-[#e5be53] font-serif-sc font-medium truncate block">{selectedResult.location}</span>
                    </div>
                  </div>

                  {selectedResult.historicalContext && (
                    <div className="p-2.5 rounded-lg bg-[#171006] border border-[#2e220d] text-[#a6967e] text-[11px] font-serif leading-relaxed line-clamp-3">
                      <span className="text-[#c59b27] font-serif-sc font-bold block mb-0.5">艺术史考据:</span>
                      {selectedResult.historicalContext}
                    </div>
                  )}
                </div>

                {/* Big Confirm Download Button */}
                <button
                  onClick={() => handleConfirmMatch(selectedResult)}
                  disabled={downloadingId === selectedResult.id}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#5e471d] via-[#a8822c] to-[#5e471d] text-[#1a1207] font-serif-sc font-bold text-sm shadow-[0_0_25px_rgba(255,217,102,0.3)] hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {downloadingId === selectedResult.id ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#1a1207]" />
                      <span>正在下载高清画作并转入本地数据库...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-[#1a1207]" />
                      <span>
                        {targetArtwork 
                          ? `⚡ 一键下载并匹配为《${targetArtwork.title}》原作` 
                          : `📥 一键下载并收录为展厅名画`}
                      </span>
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-[#7a6448] py-20">
                <ImageIcon className="w-12 h-12 mb-3 text-[#3d2e11]" />
                <p className="text-xs font-serif-sc">请在左侧选择一幅名画以预览考据与高清大图</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
