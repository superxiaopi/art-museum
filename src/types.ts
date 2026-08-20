export type ArtPeriodId = 
  | 'all'
  | 'medieval'
  | 'renaissance'
  | 'baroque_rococo'
  | 'romanticism_neoclassic'
  | 'impressionism'
  | 'modern_expressionism';

export interface ColorSwatch {
  hex: string;
  name: string;
  role: string;
}

export interface Artwork {
  id: string;
  title: string;                 // e.g. 《最后的奶餐》
  originalTitle: string;         // e.g. 《最后的晚餐》
  originalTitleEn: string;       // e.g. The Last Supper
  artist: string;                // e.g. 列奥纳多·达·芬奇 (Leonardo da Vinci)
  year: string;                  // e.g. 1495–1498 年
  periodId: ArtPeriodId;         // Period enum
  movementName: string;          // e.g. 文艺复兴全盛期 (High Renaissance)
  location: string;              // e.g. 意大利米兰·圣玛利亚感恩教堂
  medium: string;                // e.g. 坦培拉与油彩壁画 (Tempera & Oil on Gesso)
  dimensions?: string;           // e.g. 460 cm × 880 cm
  parodyImageUrl: string;        // Parody image URL or base64
  originalImageUrl: string;      // Classical original artwork image URL
  compositionType: string;       // e.g. 严谨一点透视与金字塔三角形构图
  compositionDescription: string;
  techniqueAnalysis: string;     // Technique breakdown (Chiaroscuro, Sfumato, Impasto, etc.)
  historicalContext: string;     // Historical background
  parodyCommentary: string;      // Humorous & critical breakdown of the Nai Long parody
  colorPalette: ColorSwatch[];   // Extracted color palette
  audioGuideScript: string;      // Curator narration voice script
  tags: string[];
  isUserUploaded?: boolean;
  createdAt?: string;
  views?: number;
}

export interface ArtMovement {
  id: ArtPeriodId;
  name: string;
  nameEn: string;
  eraRange: string;
  shortDesc: string;
  fullDesc: string;
  accentColor: string;
  bgGradient: string;
  keyMasters: string[];
  keyTraits: string[];
  philosophicalContext: string;
  icon: string;
}

export type ViewMode = 'grid' | 'lineage';
