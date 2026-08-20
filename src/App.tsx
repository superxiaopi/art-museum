import React, { useState, useEffect, useMemo } from 'react';
import { Artwork, ArtPeriodId, ViewMode } from './types';
import { ART_MOVEMENTS } from './data/movements';
import { 
  getSavedArtworks, 
  saveArtworks, 
  resetToDefaultArtworks, 
  loadArtworksFromIndexedDB,
  compressImageFile,
  upsertArtwork,
  isDuplicateArtwork,
  normalizeArtworkTitle
} from './utils/storage';
import { 
  autoMatchAndDownloadOriginal, 
  MatchedOriginalResult, 
  downloadAndConvertImageToBase64 
} from './utils/artworkSearch';
import { Header } from './components/Header';
import { MovementTimeline } from './components/MovementTimeline';
import { ArtworkCard } from './components/ArtworkCard';
import { ArtworkDetailModal } from './components/ArtworkDetailModal';
import { MovementLineage } from './components/MovementLineage';
import { MaterialWorkshop } from './components/MaterialWorkshop';
import { OriginalArtworkSearchModal } from './components/OriginalArtworkSearchModal';
import { GoldenThornsFrame } from './components/GoldenThornsFrame';
import { SunEmblem } from './components/ClassicalOrnaments';
import { Search, Heart, UploadCloud, CheckCircle2, Sparkles, FolderUp, Loader2, Globe } from 'lucide-react';

export default function App() {
  const [artworks, setArtworks] = useState<Artwork[]>(getSavedArtworks);
  const [selectedPeriod, setSelectedPeriod] = useState<ArtPeriodId>('all');
  const [currentView, setCurrentView] = useState<ViewMode>('grid');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);
  const [batchImportToast, setBatchImportToast] = useState<string | null>(null);
  const [isBatchSearching, setIsBatchSearching] = useState<boolean>(false);

  // Modals state
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isWorkshopOpen, setIsWorkshopOpen] = useState<boolean>(false);
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false);
  const [searchTargetArtwork, setSearchTargetArtwork] = useState<Artwork | null>(null);

  // Hydrate persistent artworks from IndexedDB on startup
  useEffect(() => {
    loadArtworksFromIndexedDB().then((saved) => {
      if (saved && saved.length > 0) {
        setArtworks(saved);
      }
    });
  }, []);

  // Save to IndexedDB when artworks change
  useEffect(() => {
    saveArtworks(artworks);
  }, [artworks]);

  // Load favorites
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('nailong_art_gallery_favs');
      if (savedFavs) {
        setFavorites(JSON.parse(savedFavs));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('nailong_art_gallery_favs', JSON.stringify(next));
      } catch {
        // ignore quota
      }
      return next;
    });
  };

  // Update specific artwork image
  const handleUpdateArtworkImage = (id: string, newImageBase64: string) => {
    setArtworks((prev) =>
      prev.map((art) => (art.id === id ? { ...art, parodyImageUrl: newImageBase64 } : art))
    );
    setBatchImportToast(`已成功更新名画素材图片！`);
    setTimeout(() => setBatchImportToast(null), 3500);
  };

  // Open search modal for a specific artwork
  const handleOpenSearchForArtwork = (artwork: Artwork) => {
    setSearchTargetArtwork(artwork);
    setSearchModalOpen(true);
  };

  // Apply a matched original artwork dataset to an existing artwork
  const handleSelectOriginalForArtwork = (
    artworkId: string, 
    originalData: MatchedOriginalResult, 
    base64Url?: string
  ) => {
    setArtworks((prev) =>
      prev.map((art) => {
        if (art.id !== artworkId) return art;
        return {
          ...art,
          originalTitle: originalData.originalTitle,
          originalTitleEn: originalData.originalTitleEn,
          artist: originalData.artist,
          year: originalData.year,
          periodId: originalData.periodId,
          movementName: originalData.movementName,
          location: originalData.location,
          medium: originalData.medium,
          originalImageUrl: base64Url || originalData.originalImageUrl,
          historicalContext: originalData.historicalContext || art.historicalContext,
          compositionType: originalData.compositionType || art.compositionType,
          techniqueAnalysis: originalData.techniqueAnalysis || art.techniqueAnalysis
        };
      })
    );
    setBatchImportToast(`🎉 已成功将《${originalData.originalTitle}》高清原作与艺术史考据关联至该作品！`);
    setTimeout(() => setBatchImportToast(null), 4000);
  };

  // Import a newly searched masterpiece as an entirely new Artwork in gallery
  const handleImportAsNewArtwork = (
    originalData: MatchedOriginalResult, 
    base64Url?: string
  ) => {
    const newArt: Artwork = {
      id: `original-${Date.now()}`,
      title: `《奶龙之${originalData.originalTitle.replace(/[《》]/g, '')}》`,
      originalTitle: originalData.originalTitle,
      originalTitleEn: originalData.originalTitleEn,
      artist: originalData.artist,
      year: originalData.year,
      periodId: originalData.periodId,
      movementName: originalData.movementName,
      location: originalData.location,
      medium: originalData.medium,
      parodyImageUrl: base64Url || originalData.originalImageUrl,
      originalImageUrl: base64Url || originalData.originalImageUrl,
      compositionType: originalData.compositionType || '严谨几何构图与古典光影',
      compositionDescription: '融合经典构图法则与萌系二创解构。',
      techniqueAnalysis: originalData.techniqueAnalysis || '采用经典笔法与色彩控制，重构画面视觉焦点。',
      historicalContext: originalData.historicalContext || '西方经典名画作品，承载特定历史时期的审美追求与人文思潮。',
      parodyCommentary: '巧妙将奶龙形象与古典名画的构图、色彩与神态相融合，产生强烈的反差萌趣与鉴赏价值。',
      colorPalette: [
        { hex: '#ffd966', name: '奶龙金黄', role: '视觉主体暖色' },
        { hex: '#8c6721', name: '古典赭褐', role: '背景基调' },
        { hex: '#1c160f', name: '油画深黛', role: '轮廓与阴影' },
        { hex: '#f5ecd5', name: '象牙温润白', role: '受光高光' }
      ],
      audioGuideScript: `欢迎欣赏《奶龙之${originalData.originalTitle.replace(/[《》]/g, '')}》，原作是由${originalData.artist}在${originalData.year}创作的经典名画。`,
      tags: ['名画原作', '世界经典', originalData.movementName.split(' ')[0]],
      isUserUploaded: true,
      createdAt: new Date().toLocaleDateString('zh-CN'),
      views: 260
    };

    setArtworks((prev) => {
      const { updatedList, isReplacement } = upsertArtwork(prev, newArt);
      if (isReplacement) {
        setBatchImportToast(`🔄 检测到同名画作，已自动删除旧作品并更新为《${originalData.originalTitle}》！`);
      } else {
        setBatchImportToast(`🎉 已成功收录《${originalData.originalTitle}》名画入馆！`);
      }
      setTimeout(() => setBatchImportToast(null), 4000);
      return updatedList;
    });
  };

  // Intelligent Batch File Matcher (Auto-matches filenames and automatically searches/downloads original artworks)
  const handleBatchFiles = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    setIsBatchSearching(true);
    let matchedCount = 0;

    try {
      const processedItems = await Promise.all(
        fileArray.map(async (file) => {
          const base64 = await compressImageFile(file);
          // Auto search and fetch original artwork info
          let matchedOriginal: MatchedOriginalResult | null = null;
          let originalBase64: string | undefined = undefined;
          try {
            matchedOriginal = await autoMatchAndDownloadOriginal(file.name);
            if (matchedOriginal) {
              originalBase64 = await downloadAndConvertImageToBase64(matchedOriginal.originalImageUrl);
            }
          } catch (e) {
            console.error('Auto match failed for', file.name, e);
          }

          return {
            filename: file.name,
            base64,
            matchedOriginal,
            originalBase64
          };
        })
      );

      setArtworks((prev) => {
        let nextArtworks = [...prev];

        processedItems.forEach(({ filename, base64, matchedOriginal, originalBase64 }) => {
          if (!base64) return;
          const lowerName = filename.toLowerCase();

          // Rule-based matching map
          const matchIndex = nextArtworks.findIndex((art) => {
            if (lowerName.includes('蒙奶') || lowerName.includes('蒙娜')) return art.id === 'mona-nailong';
            if (lowerName.includes('最后') || lowerName.includes('最奶') || lowerName.includes('晚餐')) return art.id === 'last-milkpper';
            if (lowerName.includes('珍珠')) return art.id === 'girl-with-pearl-nailong';
            if (lowerName.includes('加利利') || lowerName.includes('奶蛙') || lowerName.includes('风暴')) return art.id === 'storm-on-sea-of-galilee';
            if (lowerName.includes('大天使') || lowerName.includes('米迦勒') || lowerName.includes('审判')) return art.id === 'archangel-michael-judgment';
            if (lowerName.includes('荣光') || lowerName.includes('升天')) return art.id === 'glory-of-nailong-ascension';
            if (lowerName.includes('以利') || lowerName.includes('迦密山')) return art.id === 'elidragon-mount-carmel';
            if (lowerName.includes('丘比特') || lowerName.includes('普绪刻')) return art.id === 'psyche-revived-by-cupid-nailong';
            if (lowerName.includes('创造') || lowerName.includes('亚当')) return art.id === 'creation-of-nailong';
            if (lowerName.includes('呐喊') || lowerName.includes('蒙克')) return art.id === 'scream-of-nailong';
            if (lowerName.includes('星月夜') || lowerName.includes('梵高')) return art.id === 'starry-night-nailong';
            if (lowerName.includes('日出') || lowerName.includes('莫奈')) return art.id === 'impression-sunrise-nailong';
            
            // Fuzzy match with artwork title or original title
            return (
              normalizeArtworkTitle(art.title) === normalizeArtworkTitle(filename.replace(/\.[^/.]+$/, '')) ||
              normalizeArtworkTitle(art.originalTitle) === normalizeArtworkTitle(filename.replace(/\.[^/.]+$/, ''))
            );
          });

          if (matchIndex !== -1) {
            nextArtworks[matchIndex] = {
              ...nextArtworks[matchIndex],
              parodyImageUrl: base64,
              // If auto-match found updated original data, enhance it
              ...(matchedOriginal && {
                originalTitle: matchedOriginal.originalTitle,
                originalTitleEn: matchedOriginal.originalTitleEn,
                artist: matchedOriginal.artist,
                year: matchedOriginal.year,
                originalImageUrl: originalBase64 || matchedOriginal.originalImageUrl || nextArtworks[matchIndex].originalImageUrl,
                historicalContext: matchedOriginal.historicalContext || nextArtworks[matchIndex].historicalContext
              })
            };
            matchedCount++;
          } else if (matchedOriginal) {
            // Create a brand new artwork pairing!
            const newArtwork: Artwork = {
              id: `imported-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
              title: matchedOriginal.title || `《奶龙之${matchedOriginal.originalTitle.replace(/[《》]/g, '')}》`,
              originalTitle: matchedOriginal.originalTitle,
              originalTitleEn: matchedOriginal.originalTitleEn,
              artist: matchedOriginal.artist,
              year: matchedOriginal.year,
              periodId: matchedOriginal.periodId,
              movementName: matchedOriginal.movementName,
              location: matchedOriginal.location,
              medium: matchedOriginal.medium,
              parodyImageUrl: base64,
              originalImageUrl: originalBase64 || matchedOriginal.originalImageUrl,
              compositionType: matchedOriginal.compositionType || '严谨几何构图与古典光影',
              compositionDescription: '融合经典构图法则与萌系二创解构。',
              techniqueAnalysis: matchedOriginal.techniqueAnalysis || '采用经典笔法与色彩控制，重构画面视觉焦点。',
              historicalContext: matchedOriginal.historicalContext || '西方经典名画作品。',
              parodyCommentary: '巧妙将奶龙形象与古典名画的构图与色彩相融合，产生反差萌趣。',
              colorPalette: [
                { hex: '#ffd966', name: '奶龙金黄', role: '视觉主体暖色' },
                { hex: '#8c6721', name: '古典赭褐', role: '背景基调' },
                { hex: '#1c160f', name: '油画深黛', role: '轮廓与阴影' },
                { hex: '#f5ecd5', name: '象牙温润白', role: '受光高光' }
              ],
              audioGuideScript: `欢迎欣赏《奶龙之${matchedOriginal.originalTitle.replace(/[《》]/g, '')}》，二改自${matchedOriginal.artist}的名作《${matchedOriginal.originalTitle}》。`,
              tags: ['奶龙二创', '智能匹配', matchedOriginal.movementName.split(' ')[0]],
              isUserUploaded: true,
              createdAt: new Date().toLocaleDateString('zh-CN'),
              views: 180
            };
            // Automatic duplicate deletion & upsert
            const { updatedList } = upsertArtwork(nextArtworks, newArtwork);
            nextArtworks = updatedList;
            matchedCount++;
          }
        });

        return nextArtworks;
      });

      setBatchImportToast(
        matchedCount > 0
          ? `🎉 成功载入 ${matchedCount} 份素材（同名旧作已自动更新覆盖）！`
          : `已读取 ${fileArray.length} 张图片，可通过检索工具或素材工坊指定关联！`
      );
      setTimeout(() => setBatchImportToast(null), 4500);
    } catch (err) {
      console.error(err);
      setBatchImportToast('导入素材完成！');
      setTimeout(() => setBatchImportToast(null), 3000);
    } finally {
      setIsBatchSearching(false);
    }
  };

  // Add new user artwork (automatically replaces and removes any old artwork if title/originalTitle is duplicated)
  const handleAddArtwork = (newArtwork: Artwork) => {
    setArtworks((prev) => {
      const { updatedList, isReplacement } = upsertArtwork(prev, newArtwork);
      if (isReplacement) {
        setBatchImportToast(`🔄 检测到同名作品《${newArtwork.title}》，已自动删除旧作品并更新！`);
      } else {
        setBatchImportToast(`🎉 新作品《${newArtwork.title}》已成功收录入馆！`);
      }
      setTimeout(() => setBatchImportToast(null), 4000);
      return updatedList;
    });
  };

  // Delete artwork
  const handleDeleteArtwork = (id: string) => {
    setArtworks((prev) => prev.filter((a) => a.id !== id));
  };

  // Reset to default gallery
  const handleResetDefaults = () => {
    if (window.confirm('确定要恢复默认名画二创馆藏吗？自定义素材将被重置。')) {
      const defaults = resetToDefaultArtworks();
      setArtworks(defaults);
      setIsWorkshopOpen(false);
    }
  };

  // Calculate period counts
  const periodCounts = useMemo(() => {
    const counts: Record<string, number> = { all: artworks.length };
    artworks.forEach((art) => {
      counts[art.periodId] = (counts[art.periodId] || 0) + 1;
    });
    return counts;
  }, [artworks]);

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    artworks.forEach((a) => a.tags?.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [artworks]);

  // Filter artworks
  const filteredArtworks = useMemo(() => {
    return artworks.filter((art) => {
      // Period filter
      if (selectedPeriod !== 'all' && art.periodId !== selectedPeriod) {
        return false;
      }
      // Favorites filter
      if (showFavoritesOnly && !favorites.includes(art.id)) {
        return false;
      }
      // Tag filter
      if (activeTag !== 'all' && !art.tags?.includes(activeTag)) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = art.title.toLowerCase().includes(query);
        const matchesOriginal = art.originalTitle.toLowerCase().includes(query);
        const matchesArtist = art.artist.toLowerCase().includes(query);
        const matchesMovement = art.movementName.toLowerCase().includes(query);
        const matchesTags = art.tags?.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesOriginal || matchesArtist || matchesMovement || matchesTags;
      }
      return true;
    });
  }, [artworks, selectedPeriod, showFavoritesOnly, activeTag, searchQuery, favorites]);

  const userUploadCount = useMemo(() => {
    return artworks.filter((a) => a.isUserUploaded).length;
  }, [artworks]);

  return (
    <div className="min-h-screen dark-gold-texture text-[#f5ebd6] flex flex-col selection:bg-[#ffd966]/30 selection:text-[#ffd966] relative overflow-x-hidden">
      {/* 3D Golden Thorns & Roses Frame - Only Vertical Climbers on Left & Right */}
      <GoldenThornsFrame />

      {/* Floating Batch Import Toast */}
      {batchImportToast && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#2e220d] via-[#1f1709] to-[#2e220d] border-2 border-[#ffd966] shadow-[0_0_30px_rgba(255,217,102,0.4)] text-[#f5ebd6] font-serif-sc text-sm font-bold flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-[#ffd966]" />
          <span>{batchImportToast}</span>
        </div>
      )}

      {/* Classical Salon Dark-Gold Header */}
      <Header
        currentView={currentView}
        onSelectView={setCurrentView}
        totalArtworksCount={artworks.length}
        userUploadCount={userUploadCount}
        onOpenWorkshop={() => setIsWorkshopOpen(true)}
      />

      {/* Main Salon Content Container (1720px width to accommodate 4 large cards per row) */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-20">
        {/* Quick Batch Upload / Drop Area Header Banner */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-[#21190c]/90 via-[#171107]/90 to-[#21190c]/90 border border-[#523e19] shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#2e220d] border border-[#a8822c] text-[#ffd966] shrink-0">
              {isBatchSearching ? (
                <Loader2 className="w-5 h-5 animate-spin text-[#ffd966]" />
              ) : (
                <FolderUp className="w-5 h-5" />
              )}
            </div>
            <div>
              <h4 className="text-sm font-bold font-serif-sc text-[#f5ebd6] flex items-center gap-2">
                <span>批量导入素材 · 自动搜索下载匹配原作</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#3d2e11] text-[#ffd966] border border-[#a8822c]">
                  Open Museum & Wiki API
                </span>
              </h4>
              <p className="text-xs text-[#a6967e] font-serif mt-0.5">
                {isBatchSearching 
                  ? '正在智能识别图片内容并从全球博物馆及维基艺术库中自动下载高清原作...' 
                  : '导入素材时自动检索中世纪、文艺复兴、巴洛克等名画原作，建立高清二改与原作对照卡片。'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
            {/* Global Search & Download Original Masterpieces Button */}
            <button
              type="button"
              onClick={() => {
                setSearchTargetArtwork(null);
                setSearchModalOpen(true);
              }}
              className="px-4 py-2 rounded-xl bg-[#241a08] border border-[#a8822c] text-[#ffd966] text-xs font-serif-sc font-bold hover:bg-[#3d2e11] hover:text-[#fff4cc] shadow-md cursor-pointer transition-all flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              <span>智能检索名画原作</span>
            </button>

            {/* Batch Upload Images Button */}
            <label className="px-4 py-2 rounded-xl bg-gradient-to-b from-[#3d2e11] to-[#241a08] border border-[#c59b27] text-[#ffd966] text-xs font-serif-sc font-bold hover:from-[#4d3a17] hover:to-[#2e220d] hover:text-[#fff4cc] shadow-md cursor-pointer transition-all flex items-center gap-2">
              <UploadCloud className="w-4 h-4" />
              <span>导入素材 (自动搜画)</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                disabled={isBatchSearching}
                onChange={(e) => e.target.files && handleBatchFiles(e.target.files)}
              />
            </label>
          </div>
        </div>

        {/* VIEW 1: Classical Art Gallery View */}
        {currentView === 'grid' && (
          <div>
            {/* Movement Timeline & Chronological Ribbon */}
            <MovementTimeline
              selectedPeriod={selectedPeriod}
              onSelectPeriod={setSelectedPeriod}
              periodCounts={periodCounts}
            />

            {/* Gallery Search & Filter Bar in Dark Gold */}
            <div className="bg-[#17120a]/90 backdrop-blur-sm p-4 rounded-2xl border border-[#4d3a17] shadow-2xl mb-6 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-[#ffd966] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="art-search-input"
                  type="text"
                  placeholder="搜索名画、大师 (如: 达芬奇/梵高/透视)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-[#1f180e] border border-[#423214] text-[#f5ebd6] placeholder-[#8c7e6c] focus:outline-none focus:border-[#ffd966] transition-all font-serif-sc"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#a6967e] hover:text-[#ffd966]"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Tag Filters & Favorites toggle */}
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-start md:justify-end overflow-x-auto">
                <button
                  id="fav-filter-toggle-btn"
                  onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border text-xs font-serif-sc transition-all cursor-pointer ${
                    showFavoritesOnly
                      ? 'bg-red-950/80 border-red-500 text-red-300 font-bold shadow-[0_0_10px_rgba(239,68,68,0.3)]'
                      : 'bg-[#1f180e] border-[#423214] text-[#a6967e] hover:text-[#f5ebd6]'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-red-400 text-red-400' : 'text-[#ffd966]'}`} />
                  <span>我的珍藏 ({favorites.length})</span>
                </button>

                <div className="h-4 w-[1px] bg-[#423214] hidden sm:block" />

                {/* Tags Ribbon */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
                  <button
                    onClick={() => setActiveTag('all')}
                    className={`px-3 py-1 rounded-xl text-xs font-serif-sc transition-all cursor-pointer ${
                      activeTag === 'all'
                        ? 'bg-[#3d2e11] text-[#ffd966] font-bold border border-[#a8822c]'
                        : 'text-[#8e7e68] hover:text-[#f5ebd6]'
                    }`}
                  >
                    全部标签
                  </button>
                  {allTags.slice(0, 6).map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setActiveTag(tag)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-serif-sc whitespace-nowrap transition-all cursor-pointer ${
                        activeTag === tag
                          ? 'bg-[#3d2e11] text-[#ffd966] font-bold border border-[#a8822c]'
                          : 'bg-[#1f180e] border border-[#36270e] text-[#8e7e68] hover:text-[#f5ebd6]'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Gallery Grid (Strictly 4 Large Cards per row on 2xl screens: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4) */}
            {filteredArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {filteredArtworks.map((artwork) => (
                  <ArtworkCard
                    key={artwork.id}
                    artwork={artwork}
                    onOpenDetail={(art) => setSelectedArtwork(art)}
                    isFavorite={favorites.includes(artwork.id)}
                    onToggleFavorite={handleToggleFavorite}
                    onUpdateArtworkImage={handleUpdateArtworkImage}
                    onSearchOriginal={handleOpenSearchForArtwork}
                  />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-[#17120a] rounded-3xl border border-[#423214] p-8 max-w-lg mx-auto shadow-2xl">
                <SunEmblem className="w-12 h-12 text-[#8c6721] mx-auto mb-4" />
                <h3 className="text-lg font-serif-sc font-bold text-[#f5ebd6]">未找到匹配的艺术作品</h3>
                <p className="text-xs text-[#a6967e] font-serif mt-2 mb-6">
                  尝试切换流派、标签，或通过搜索栏检索名画名称。
                </p>
                <button
                  onClick={() => {
                    setSelectedPeriod('all');
                    setActiveTag('all');
                    setSearchQuery('');
                    setShowFavoritesOnly(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-b from-[#2e220d] to-[#1a1306] text-[#ffd966] text-xs font-serif-sc font-bold border border-[#c59b27] hover:from-[#3d2e11] hover:to-[#241a08] transition-all cursor-pointer shadow-lg"
                >
                  重置所有筛选条件
                </button>
              </div>
            )}
          </div>
        )}

        {/* VIEW 2: Movement Lineage Evolution Timeline View */}
        {currentView === 'lineage' && (
          <MovementLineage
            artworks={artworks}
            onOpenArtwork={(art) => setSelectedArtwork(art)}
            onSelectPeriod={(periodId) => {
              setSelectedPeriod(periodId as ArtPeriodId);
              setCurrentView('grid');
            }}
          />
        )}
      </main>

      {/* Classical Salon Footer */}
      <footer className="border-t border-[#4d3a17] bg-[#120e09]/95 backdrop-blur-md py-8 px-4 sm:px-8 mt-12 transition-all relative z-20">
        <div className="max-w-[1720px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#ffd966] to-[#8c6721] border border-[#ffea9f] flex items-center justify-center text-sm shadow-[0_0_8px_rgba(255,217,102,0.4)]">
              🐉
            </div>
            <div>
              <span className="font-serif-sc font-bold text-sm text-[#f5ebd6]">
                奶龙西方艺术鉴赏沙龙
              </span>
              <p className="text-[11px] text-[#a6967e] font-serif">
                SALON D'ART ET DE CRÉATIVITÉ OCCIDENTALE
              </p>
            </div>
          </div>

          <div className="text-xs text-[#a6967e] font-serif-sc flex items-center gap-4">
            <span>涵盖中世纪 · 文艺复兴 · 巴洛克 · 浪漫主义 · 印象派 · 现代主义</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#8c7e6c] font-serif-sc">
            <button
              onClick={() => setIsWorkshopOpen(true)}
              className="text-[#ffd966] hover:text-[#fff4cc] font-bold underline cursor-pointer"
            >
              素材入馆工坊
            </button>
            <span>·</span>
            <span>经典美学与当代二创共鸣</span>
          </div>
        </div>
      </footer>

      {/* Artwork Detail Modal */}
      {selectedArtwork && (
        <ArtworkDetailModal
          artwork={selectedArtwork}
          onClose={() => setSelectedArtwork(null)}
          onSearchOriginal={handleOpenSearchForArtwork}
        />
      )}

      {/* Material Workshop Modal */}
      {isWorkshopOpen && (
        <MaterialWorkshop
          artworks={artworks}
          onAddArtwork={handleAddArtwork}
          onDeleteArtwork={handleDeleteArtwork}
          onClose={() => setIsWorkshopOpen(false)}
          onResetDefaults={handleResetDefaults}
          onOpenSearchModal={(query) => {
            setSearchTargetArtwork(null);
            setSearchModalOpen(true);
          }}
        />
      )}

      {/* World Masterpiece Original Artwork Search & Download Modal */}
      <OriginalArtworkSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        targetArtwork={searchTargetArtwork}
        onSelectOriginalForArtwork={handleSelectOriginalForArtwork}
        onImportAsNewArtwork={handleImportAsNewArtwork}
      />
    </div>
  );
}
