import React, { useState } from 'react';
import { Artwork, ArtPeriodId } from '../types';
import { ART_MOVEMENTS } from '../data/movements';
import { compressImageFile, isDuplicateArtwork } from '../utils/storage';
import { extractArtworkKeywords, autoMatchAndDownloadOriginal, MatchedOriginalResult } from '../utils/artworkSearch';
import { Upload, Plus, Trash2, Image as ImageIcon, Sparkles, X, Check, RefreshCw, Search, Loader2, RefreshCcw } from 'lucide-react';
import { ClassicalCorner } from './ClassicalOrnaments';

interface MaterialWorkshopProps {
  artworks: Artwork[];
  onAddArtwork: (newArtwork: Artwork) => void;
  onDeleteArtwork: (artworkId: string) => void;
  onClose: () => void;
  onResetDefaults: () => void;
  onOpenSearchModal?: (query: string) => void;
}

export const MaterialWorkshop: React.FC<MaterialWorkshopProps> = ({
  artworks,
  onAddArtwork,
  onDeleteArtwork,
  onClose,
  onResetDefaults,
  onOpenSearchModal
}) => {
  const [title, setTitle] = useState('');
  const [originalTitle, setOriginalTitle] = useState('');
  const [artist, setArtist] = useState('');
  const [year, setYear] = useState('');
  const [periodId, setPeriodId] = useState<ArtPeriodId>('renaissance');
  const [location, setLocation] = useState('');
  const [medium, setMedium] = useState('');
  const [parodyImageBase64, setParodyImageBase64] = useState<string>('');
  const [originalImageUrl, setOriginalImageUrl] = useState<string>('');
  const [compositionType, setCompositionType] = useState('严谨几何构图与戏剧光影');
  const [historicalContext, setHistoricalContext] = useState('');
  const [parodyCommentary, setParodyCommentary] = useState('');
  const [tagsInput, setTagsInput] = useState('奶龙二创, 名画二改, 艺术鉴赏');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isAutoSearching, setIsAutoSearching] = useState(false);
  const [autoMatchMessage, setAutoMatchMessage] = useState<string | null>(null);

  const userArtworks = artworks.filter(a => a.isUserUploaded);

  // Check if current form inputs match an existing artwork
  const duplicateArtwork = (title.trim() || originalTitle.trim()) 
    ? artworks.find(a => isDuplicateArtwork(a, { title, originalTitle })) 
    : undefined;

  // Apply a matched original artwork dataset into the form
  const applyMatchedOriginal = (matched: MatchedOriginalResult) => {
    setOriginalTitle(matched.originalTitle);
    setArtist(matched.artist);
    setYear(matched.year);
    setPeriodId(matched.periodId);
    setLocation(matched.location);
    setMedium(matched.medium);
    setOriginalImageUrl(matched.originalImageUrl);
    if (matched.compositionType) setCompositionType(matched.compositionType);
    if (matched.historicalContext) setHistoricalContext(matched.historicalContext);
    if (!title) {
      setTitle(matched.title || `《奶龙之${matched.originalTitle.replace(/[《》]/g, '')}》`);
    }
    setAutoMatchMessage(`已自动匹配并载入《${matched.originalTitle}》（${matched.artist}）的高清原作与艺术档案！`);
    setTimeout(() => setAutoMatchMessage(null), 4000);
  };

  // Handle local image file upload (converts to base64 for instant preview & storage)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const base64 = await compressImageFile(file);
      if (base64) {
        setParodyImageBase64(base64);
      }
    } catch {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setParodyImageBase64(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }

    // Auto-search and auto-fill original info based on filename
    setIsAutoSearching(true);
    try {
      const matched = await autoMatchAndDownloadOriginal(file.name);
      if (matched) {
        applyMatchedOriginal(matched);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAutoSearching(false);
    }
  };

  // Trigger manual search based on typed keyword
  const handleManualSearchOriginal = async () => {
    const query = originalTitle || title;
    if (!query) {
      onOpenSearchModal?.('蒙娜丽莎');
      return;
    }
    setIsAutoSearching(true);
    try {
      const matched = await autoMatchAndDownloadOriginal(query);
      if (matched) {
        applyMatchedOriginal(matched);
      } else {
        onOpenSearchModal?.(query);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsAutoSearching(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !originalTitle || !artist) {
      alert('请填写完整的作品名称与艺术家信息');
      return;
    }

    const selectedMovement = ART_MOVEMENTS.find(m => m.id === periodId);

    const newArtwork: Artwork = {
      id: `user-art-${Date.now()}`,
      title,
      originalTitle,
      originalTitleEn: originalTitle,
      artist,
      year: year || '经典时期',
      periodId: periodId === 'all' ? 'renaissance' : periodId,
      movementName: selectedMovement ? `${selectedMovement.name}` : '经典流派',
      location: location || '卢浮宫 / 欧洲古典艺术馆',
      medium: medium || '布面油画 / 混合媒介',
      parodyImageUrl: parodyImageBase64 || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
      originalImageUrl: originalImageUrl || parodyImageBase64 || 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
      compositionType,
      compositionDescription: '融合经典构图法则与萌系二创解构。',
      techniqueAnalysis: '采用流派代表性笔法与光影色彩控制，重构画面视觉焦点。',
      historicalContext: historicalContext || '西方经典名画作品，承载特定历史时期的审美追求与人文思潮。',
      parodyCommentary: parodyCommentary || '巧妙将奶龙形象与古典名画的构图、色彩与神态相融合，产生强烈的反差萌趣与鉴赏价值。',
      colorPalette: [
        { hex: '#ffd966', name: '奶龙金黄', role: '视觉主体暖色' },
        { hex: '#8c6721', name: '古典赭褐', role: '背景基调' },
        { hex: '#1c160f', name: '油画深黛', role: '轮廓与阴影' },
        { hex: '#f5ecd5', name: '象牙温润白', role: '受光高光' }
      ],
      audioGuideScript: `欢迎欣赏《${title}》，这幅作品二改自${artist}的著名画作《${originalTitle}》。`,
      tags: tagsInput.split(/[,，\s]+/).filter(Boolean),
      isUserUploaded: true,
      createdAt: new Date().toLocaleDateString('zh-CN'),
      views: 120
    };

    onAddArtwork(newArtwork);
    setIsSuccess(true);

    // Reset Form
    setTitle('');
    setOriginalTitle('');
    setArtist('');
    setYear('');
    setParodyImageBase64('');
    setOriginalImageUrl('');
    setHistoricalContext('');
    setParodyCommentary('');

    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-gradient-to-br from-[#1c1710] to-[#120e08] rounded-3xl border-2 border-[#c59b27] shadow-[0_0_50px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden my-auto">
        <ClassicalCorner position="tl" className="absolute top-3 left-3 z-30" />
        <ClassicalCorner position="tr" className="absolute top-3 right-14 z-30" />
        <ClassicalCorner position="bl" className="absolute bottom-3 left-3 z-30" />
        <ClassicalCorner position="br" className="absolute bottom-3 right-3 z-30" />

        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#4d3a17] bg-[#17120a] flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#2e220d] border border-[#a8822c] text-[#ffd966]">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif-sc text-[#f5ebd6]">
                素材管理与二创入馆工坊
              </h2>
              <p className="text-xs text-[#a6967e] font-serif-sc">
                随时上传你的奶龙二改素材，配置流派分类、构图解析与美学评析
              </p>
            </div>
          </div>

          <button
            id="close-workshop-btn"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#2e220d] text-[#a6967e] hover:text-[#ffd966] transition-colors cursor-pointer border border-[#4d3a17]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto space-y-6 max-h-[calc(92vh-75px)]">
          {/* Add New Material Form */}
          <form onSubmit={handleSubmit} className="space-y-4 bg-[#17120a] p-5 rounded-2xl border border-[#423214]">
            <div className="flex items-center justify-between pb-2 border-b border-[#36270e]">
              <span className="text-xs font-bold text-[#ffd966] font-serif-sc flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                登记新的二改作品素材
              </span>
              {isSuccess && (
                <span className="text-xs text-emerald-400 font-bold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> 成功录入名画展厅！
                </span>
              )}
            </div>

            {/* Auto Match Notification Banner */}
            {autoMatchMessage && (
              <div className="p-3 rounded-xl bg-[#2e220d] border border-[#ffd966] text-[#ffd966] text-xs font-serif-sc flex items-center justify-between shadow-lg animate-in fade-in">
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#ffd966]" />
                  {autoMatchMessage}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[#171006] text-[#f5ebd6]">已自动填入档案</span>
              </div>
            )}

            {isAutoSearching && (
              <div className="p-3 rounded-xl bg-[#171006] border border-[#a8822c] text-[#d4c3a3] text-xs font-serif-sc flex items-center gap-2 animate-pulse">
                <Loader2 className="w-4 h-4 text-[#ffd966] animate-spin" />
                <span>正在智能检索并下载匹配的世界名画原作及艺术史档案...</span>
              </div>
            )}

            {/* Image Upload Stage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Parody Upload */}
              <div>
                <label className="block text-xs font-bold text-[#ffd966] font-serif-sc mb-1.5">
                  1. 上传奶龙二创图片 *
                </label>
                <div className="relative border-2 border-dashed border-[#8c6d21] hover:border-[#ffd966] rounded-xl p-4 text-center transition-colors cursor-pointer bg-[#1e170c]">
                  {parodyImageBase64 ? (
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-[#c59b27]">
                      <img src={parodyImageBase64} alt="Preview" className="w-full h-full object-contain bg-black/40" />
                      <button
                        type="button"
                        onClick={() => setParodyImageBase64('')}
                        className="absolute top-1 right-1 p-1 bg-black/80 rounded-full text-white hover:text-red-400"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label htmlFor="parody-file-input" className="cursor-pointer block py-4">
                      <ImageIcon className="w-8 h-8 text-[#e5be53] mx-auto mb-1.5" />
                      <span className="text-xs font-bold text-[#f5ebd6] font-serif-sc block">
                        点击选择本地图片或拖入素材
                      </span>
                      <span className="text-[10px] text-[#a6967e] block mt-0.5">
                        支持 JPG, PNG, WEBP
                      </span>
                    </label>
                  )}
                  <input
                    id="parody-file-input"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </div>
              </div>

              {/* Classical Original Reference Image URL */}
              <div>
                <label className="block text-xs font-bold text-[#ffd966] font-serif-sc mb-1.5">
                  2. 古典原作参考图链接 (选填)
                </label>
                <input
                  type="url"
                  placeholder="https://upload.wikimedia.org/.../mona_lisa.jpg"
                  value={originalImageUrl}
                  onChange={(e) => setOriginalImageUrl(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#1e170c] border border-[#423214] text-[#f5ebd6] placeholder-[#8a7b66] focus:outline-none focus:border-[#ffd966]"
                />
                <p className="text-[10px] text-[#a6967e] font-serif-sc mt-1.5">
                  若留空，系统将自动使用二创图生成对照模式。
                </p>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#ffd966] font-serif-sc mb-1">
                  二改作品标题 *
                </label>
                <input
                  type="text"
                  placeholder="如：《最后的奶餐》"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#1e170c] border border-[#423214] text-[#f5ebd6] placeholder-[#8a7b66] focus:outline-none focus:border-[#ffd966]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold text-[#ffd966] font-serif-sc">
                    致敬的古典名画原作 *
                  </label>
                  <button
                    type="button"
                    onClick={handleManualSearchOriginal}
                    className="text-[11px] text-[#e5be53] hover:text-[#ffd966] flex items-center gap-1 font-serif-sc font-bold cursor-pointer"
                  >
                    <Search className="w-3 h-3" />
                    <span>智能检索与下载</span>
                  </button>
                </div>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="如：《最后的晚餐》或 蒙娜丽莎"
                    value={originalTitle}
                    onChange={(e) => setOriginalTitle(e.target.value)}
                    required
                    className="w-full pl-3 pr-8 py-2 text-xs rounded-xl bg-[#1e170c] border border-[#423214] text-[#f5ebd6] placeholder-[#8a7b66] focus:outline-none focus:border-[#ffd966]"
                  />
                  <button
                    type="button"
                    onClick={handleManualSearchOriginal}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-[#a8822c] hover:text-[#ffd966]"
                    title="搜索名画"
                  >
                    <Search className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#ffd966] font-serif-sc mb-1">
                  原作艺术家 *
                </label>
                <input
                  type="text"
                  placeholder="如：达·芬奇"
                  value={artist}
                  onChange={(e) => setArtist(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#1e170c] border border-[#423214] text-[#f5ebd6] placeholder-[#8a7b66] focus:outline-none focus:border-[#ffd966]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#ffd966] font-serif-sc mb-1">
                  归属艺术流派时期 *
                </label>
                <select
                  value={periodId}
                  onChange={(e) => setPeriodId(e.target.value as ArtPeriodId)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#1e170c] border border-[#423214] text-[#f5ebd6] focus:outline-none focus:border-[#ffd966]"
                >
                  <option value="medieval">中世纪艺术 (Medieval)</option>
                  <option value="renaissance">文艺复兴 (The Renaissance)</option>
                  <option value="baroque_rococo">巴洛克与洛可可 (Baroque & Rococo)</option>
                  <option value="romanticism_neoclassic">新古典与浪漫主义 (Romanticism)</option>
                  <option value="impressionism">印象派与后印象派 (Impressionism)</option>
                  <option value="modern_expressionism">现代与表现主义 (Modernism)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#ffd966] font-serif-sc mb-1">
                  创作年代 / 世纪
                </label>
                <input
                  type="text"
                  placeholder="如：1503–1519 年"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#1e170c] border border-[#423214] text-[#f5ebd6] placeholder-[#8a7b66] focus:outline-none focus:border-[#ffd966]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#ffd966] font-serif-sc mb-1">
                  构图形式特征
                </label>
                <input
                  type="text"
                  placeholder="如：单点透视金字塔构图"
                  value={compositionType}
                  onChange={(e) => setCompositionType(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#1e170c] border border-[#423214] text-[#f5ebd6] placeholder-[#8a7b66] focus:outline-none focus:border-[#ffd966]"
                />
              </div>
            </div>

            {/* Critique & Historical Commentary */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-[#ffd966] font-serif-sc mb-1">
                  原作历史背景与技法
                </label>
                <textarea
                  rows={2}
                  placeholder="简述名画在艺术史上的地位与透视/光影技法..."
                  value={historicalContext}
                  onChange={(e) => setHistoricalContext(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#1e170c] border border-[#423214] text-[#f5ebd6] placeholder-[#8a7b66] focus:outline-none focus:border-[#ffd966]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#ffd966] font-serif-sc mb-1">
                  奶龙二改美学评析
                </label>
                <textarea
                  rows={2}
                  placeholder="描述奶龙萌系解构与古典名画产生的反差幽默感..."
                  value={parodyCommentary}
                  onChange={(e) => setParodyCommentary(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-[#1e170c] border border-[#423214] text-[#f5ebd6] placeholder-[#8a7b66] focus:outline-none focus:border-[#ffd966]"
                />
              </div>
            </div>

            {/* Duplicate Notice Banner */}
            {duplicateArtwork && (
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/50 text-amber-200 text-xs font-serif-sc flex items-center gap-2">
                <RefreshCcw className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  画廊中已存在同名或同原作作品<strong>《{duplicateArtwork.title}》</strong>。点击保存将<strong>自动删除旧作品并以本篇新内容更新覆盖</strong>！
                </span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              id="submit-new-artwork-btn"
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ffd966] via-[#d4a737] to-[#8c6721] text-[#1c1407] font-serif-sc font-bold text-xs sm:text-sm shadow-[0_0_15px_rgba(255,217,102,0.3)] hover:shadow-[0_0_25px_rgba(255,217,102,0.5)] transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              {duplicateArtwork ? (
                <>
                  <RefreshCcw className="w-4 h-4" />
                  <span>自动删除同名旧作并更新入馆</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>保存并加入名画鉴赏展厅</span>
                </>
              )}
            </button>
          </form>

          {/* User Uploaded Works Management List */}
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#36270e]">
              <span className="text-xs font-bold text-[#ffd966] font-serif-sc">
                已录入自定义素材 ({userArtworks.length})
              </span>
              <button
                id="reset-default-gallery-btn"
                type="button"
                onClick={onResetDefaults}
                className="text-xs text-[#ffd966] hover:text-red-400 font-serif-sc flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>重置为默认馆藏展品</span>
              </button>
            </div>

            {userArtworks.length === 0 ? (
              <div className="text-center py-6 text-xs text-[#a6967e] font-serif-sc bg-[#17120a] rounded-xl border border-[#423214]">
                暂无自定义素材，欢迎点击上方表单随时上传二创名画！
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {userArtworks.map((art) => (
                  <div
                    key={art.id}
                    className="p-3 rounded-xl bg-[#17120a] border border-[#423214] flex items-center justify-between gap-3 shadow-lg"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={art.parodyImageUrl}
                        alt={art.title}
                        className="w-12 h-12 rounded-lg object-cover border border-[#c59b27]"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-[#f5ebd6] font-serif-sc truncate">
                          {art.title}
                        </h4>
                        <p className="text-[10px] text-[#a6967e] font-serif truncate">
                          致敬：{art.artist}
                        </p>
                      </div>
                    </div>

                    <button
                      id={`delete-art-btn-${art.id}`}
                      onClick={() => onDeleteArtwork(art.id)}
                      className="p-2 text-[#a6967e] hover:text-red-400 transition-colors cursor-pointer"
                      title="删除此素材"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
