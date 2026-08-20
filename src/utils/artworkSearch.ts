import { Artwork, ArtPeriodId } from '../types';
import { INITIAL_ARTWORKS } from '../data/artworks';
import { compressImageFile } from './storage';

export interface MatchedOriginalResult {
  id: string;
  title: string;
  originalTitle: string;
  originalTitleEn: string;
  artist: string;
  year: string;
  periodId: ArtPeriodId;
  movementName: string;
  location: string;
  medium: string;
  originalImageUrl: string;
  thumbnailUrl: string;
  compositionType?: string;
  compositionDescription?: string;
  techniqueAnalysis?: string;
  historicalContext?: string;
  source: 'curated' | 'wikipedia' | 'artic' | 'met';
}

/**
 * Built-in Curated World Masterpieces Knowledge Base
 * Guaranteeing instant high-res original matching even offline or when APIs have CORS limits
 */
export const CURATED_MASTERPIECES: MatchedOriginalResult[] = [
  {
    id: 'mona-lisa-orig',
    title: '《蒙奶丽莎》',
    originalTitle: '《蒙娜丽莎》',
    originalTitleEn: 'Mona Lisa (La Gioconda)',
    artist: '列奥纳多·达·芬奇 (Leonardo da Vinci)',
    year: '1503–1519 年',
    periodId: 'renaissance',
    movementName: '意大利文艺复兴全盛期 (High Renaissance)',
    location: '法国巴黎 · 卢浮宫博物馆 (Musée du Louvre)',
    medium: '白杨木板油画 (Oil on Poplar Panel)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/400px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    compositionType: '经典半身金字塔等腰三角形构图',
    compositionDescription: '人物双手交叠置于扶手之上，与头部形成坚实稳固的等腰金字塔三角。背景为虚构的崇山峻岭与蜿蜒河流。',
    techniqueAnalysis: '达芬奇独步天下的渐隐晕涂法 (Sfumato)。通过数十层极薄半透明油彩多层罩染，消除所有轮廓硬线。',
    historicalContext: '为佛罗伦萨丝绸商人乔孔多之妻所作，达芬奇一生携带修改，是卢浮宫镇馆之宝。',
    source: 'curated'
  },
  {
    id: 'last-supper-orig',
    title: '《最奶的晚餐》',
    originalTitle: '《最后的晚餐》',
    originalTitleEn: 'The Last Supper (Il Cenacolo)',
    artist: '列奥纳多·达·芬奇 (Leonardo da Vinci)',
    year: '1495–1498 年',
    periodId: 'renaissance',
    movementName: '意大利文艺复兴全盛期 (High Renaissance)',
    location: '意大利米兰 · 圣玛利亚感恩修道院 (Santa Maria delle Grazie)',
    medium: '石膏干壁画 (Tempera and Oil on Gesso)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1280px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/500px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg',
    compositionType: '严格单点线性透视 + 金字塔对称群像',
    compositionDescription: '透视灭点严格收束于中心基督额头正中，两侧十二门徒以三人一组形成严谨的四组对称韵律。',
    techniqueAnalysis: '干壁蛋彩与油彩混合，开创性运用室内空间三维纵深透视法。',
    historicalContext: '米兰公爵卢多维科·斯福尔扎委托创作，描绘基督宣告门徒出卖时的戏剧瞬间。',
    source: 'curated'
  },
  {
    id: 'girl-pearl-orig',
    title: '《珍珠奶龙少女》',
    originalTitle: '《戴珍珠耳环的少女》',
    originalTitleEn: 'Girl with a Pearl Earring',
    artist: '约翰内斯·维米尔 (Johannes Vermeer)',
    year: '约 1665 年',
    periodId: 'baroque_rococo',
    movementName: '荷兰黄金时代巴洛克 (Dutch Golden Age Baroque)',
    location: '荷兰海牙 · 莫瑞泰斯皇家美术馆 (Mauritshuis)',
    medium: '画布油彩 (Oil on Canvas)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/400px-1665_Girl_with_a_Pearl_Earring.jpg',
    compositionType: '暗色单色调无纵深背景 · 三分之二回眸特写',
    compositionDescription: '极黑的深暗背景彻底剥离外界干扰，视线完全聚焦于少女蓦然回首的侧影与珍珠光斑。',
    techniqueAnalysis: '“光之魔术师”维米尔的点彩法 (Pointillé) 与天青石高纯度群青蓝 (Ultramarine) 釉染。',
    historicalContext: '属于荷兰特有的“特罗尼” (Tronie) 肖像画类型，被誉为“北方蒙娜丽莎”。',
    source: 'curated'
  },
  {
    id: 'storm-galilee-orig',
    title: '《加利利海上的奶蛙》',
    originalTitle: '《加利利海上的风暴》',
    originalTitleEn: 'The Storm on the Sea of Galilee',
    artist: '伦勃朗·范·莱因 (Rembrandt van Rijn)',
    year: '1633 年',
    periodId: 'baroque_rococo',
    movementName: '荷兰黄金时代巴洛克 (Dutch Golden Age Baroque)',
    location: '美国波士顿 · 伊莎贝拉嘉纳艺术博物馆 (1990年失窃名作)',
    medium: '画布油彩 (Oil on Canvas)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg/800px-Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg/400px-Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg',
    compositionType: '强对角线动势与 45 度倾斜狂澜构图',
    compositionDescription: '桅杆断裂形成的剧烈倾角将画面一切为二，左上方明亮泡沫巨浪与右侧阴暗搏斗形成剧烈反差。',
    techniqueAnalysis: '伦勃朗标志性的明暗对照法 (Chiaroscuro) 与厚涂堆塑法 (Impasto)。',
    historicalContext: '伦勃朗生平唯一的纯海景题材作品，1990年于波士顿博物馆被盗，至今下落成谜。',
    source: 'curated'
  },
  {
    id: 'michael-archangel-orig',
    title: '《大天使长的审判》',
    originalTitle: '《大天使米迦勒战胜撒旦》',
    originalTitleEn: 'The Archangel Michael Defeating Satan',
    artist: '圭多·雷尼 (Guido Reni) / 拉斐尔',
    year: '1636 年',
    periodId: 'baroque_rococo',
    movementName: '博洛尼亚画派与巴洛克古典主义 (Baroque Classicism)',
    location: '意大利罗马 · 威尼托街无玷始胎圣母堂',
    medium: '画布油彩 (Oil on Canvas)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Guido_Reni_-_Saint_Michael_Archangel.jpg/800px-Guido_Reni_-_Saint_Michael_Archangel.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Guido_Reni_-_Saint_Michael_Archangel.jpg/400px-Guido_Reni_-_Saint_Michael_Archangel.jpg',
    compositionType: '垂直主轴与展翅 X 型对角稳定构图',
    compositionDescription: '战神般的米迦勒展翅凌空而立，脚踏受制恶龙，神圣宝剑自右上向左下斜指。',
    techniqueAnalysis: '拉斐尔式崇高天庭神圣光晕与巴洛克流畅锦缎衣褶，金色神光穿透地狱黑烟。',
    historicalContext: '天主教反宗教改革时期的核心视觉图腾，彰显正义对邪恶的最终神圣胜利。',
    source: 'curated'
  },
  {
    id: 'ascension-titian-orig',
    title: '《奶龙的荣光》',
    originalTitle: '《圣母升天 / 基督升天》',
    originalTitleEn: 'Assumption of the Virgin (Assunta)',
    artist: '提香·韦切利奥 (Titian)',
    year: '1516–1518 年',
    periodId: 'renaissance',
    movementName: '威尼斯画派全盛期 (Venetian High Renaissance)',
    location: '意大利威尼斯 · 圣方济各会荣耀圣母圣殿',
    medium: '木板油画 (Oil on Panel)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Tizian_041.jpg/800px-Tizian_041.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Tizian_041.jpg/400px-Tizian_041.jpg',
    compositionType: '宏伟三层阶梯状上升金字塔天界构图',
    compositionDescription: '地面使徒惊呼仰望、中部云层天使簇拥升天、天顶天父敞开怀抱，三界层层递进。',
    techniqueAnalysis: '威尼斯画派独创的“提香红”与辉煌金光多层透明罩染。',
    historicalContext: '奠定提香威尼斯画坛霸主地位的里程碑祭坛巨作。',
    source: 'curated'
  },
  {
    id: 'psyche-cupid-orig',
    title: '《丘比特唤醒普绪刻》',
    originalTitle: '《普绪刻被爱神的吻唤醒》',
    originalTitleEn: 'Psyche Revived by Cupid\'s Kiss',
    artist: '安东尼奥·卡诺瓦 (Antonio Canova) / 弗朗索瓦·热拉尔',
    year: '1787–1793 年',
    periodId: 'romanticism_neoclassic',
    movementName: '新古典主义 (Neoclassicism)',
    location: '法国巴黎 · 卢浮宫博物馆 (Musée du Louvre)',
    medium: '白大理石雕塑 / 布面油画',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Canova_Cupid_and_Psyche_Louvre.jpg/800px-Canova_Cupid_and_Psyche_Louvre.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Canova_Cupid_and_Psyche_Louvre.jpg/400px-Canova_Cupid_and_Psyche_Louvre.jpg',
    compositionType: '优美 X 型交织对角线与双臂椭圆环抱',
    compositionDescription: '爱神舒展的羽翼与普绪刻仰卧的双臂构成完美的几何交错交融。',
    techniqueAnalysis: '新古典主义对古希腊纯粹比例的极致雕琢，温润如生的大理石肌肤质感。',
    historicalContext: '取材自阿普列尤斯《金驴记》古希腊神话寓言，歌颂灵魂与真爱的升华。',
    source: 'curated'
  },
  {
    id: 'creation-adam-orig',
    title: '《创造奶龙》',
    originalTitle: '《创造亚当》',
    originalTitleEn: 'The Creation of Adam',
    artist: '米开朗基罗 (Michelangelo Buonarroti)',
    year: '1511–1512 年',
    periodId: 'renaissance',
    movementName: '文艺复兴全盛期 (High Renaissance)',
    location: '梵蒂冈 · 西斯廷礼拜堂天顶 (Sistine Chapel Ceiling)',
    medium: '湿壁画 (Fresco)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/1280px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/500px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
    compositionType: '横向双弧交会对峙与指尖微距张力',
    compositionDescription: '左侧初生人体与右侧天父云团在指尖距离数毫米处产生跨越时空的能量引力场。',
    techniqueAnalysis: '雕塑家的雄浑人体肌肉解剖结构与纯粹湿壁画色彩。',
    historicalContext: '教皇尤利乌斯二世委托绘制的西斯廷天顶画核心篇章。',
    source: 'curated'
  },
  {
    id: 'scream-munch-orig',
    title: '《奶龙的呐喊》',
    originalTitle: '《呐喊》',
    originalTitleEn: 'The Scream (Skrik)',
    artist: '爱德华·蒙克 (Edvard Munch)',
    year: '1893 年',
    periodId: 'modern_expressionism',
    movementName: '表现主义与象征主义 (Expressionism)',
    location: '挪威奥斯陆 · 国家美术馆 (National Gallery, Oslo)',
    medium: '纸板蛋彩与粉彩 (Tempera and Pastel on Cardboard)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/800px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/400px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
    compositionType: '极度透视对角护栏与扭曲同心声波回荡',
    compositionDescription: '笔直后退的暗红桥梁护栏与天空地面流动起伏的波状曲线构成剧烈心理张力。',
    techniqueAnalysis: '主观色彩爆发与情感化狂野线条，彻底摆脱客观测绘。',
    historicalContext: '蒙克日落漫步时感知“穿透自然宇宙的无尽尖叫”，现代人类存在主义焦虑的图腾。',
    source: 'curated'
  },
  {
    id: 'starry-night-orig',
    title: '《星月夜下的奶龙》',
    originalTitle: '《星月夜 / 星夜》',
    originalTitleEn: 'The Starry Night',
    artist: '文森特·梵高 (Vincent van Gogh)',
    year: '1889 年',
    periodId: 'impressionism',
    movementName: '后印象派 (Post-Impressionism)',
    location: '美国纽约 · 现代艺术博物馆 (MoMA)',
    medium: '画布油彩 (Oil on Canvas)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/500px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    compositionType: '前景垂直柏树与天空浩瀚涡旋对冲',
    compositionDescription: '左侧如黑色火舌拔地而起的柏树打破地平线，与右上角金黄月晕及旋转星云形成天人对话。',
    techniqueAnalysis: '炽烈激昂的旋涡状厚涂笔触 (Heavy Impasto) 与高纯度普鲁士蓝、铬黄互补对比。',
    historicalContext: '梵高在圣雷米精神疗养院期间凭记忆与想象绘制的旷世遗珠。',
    source: 'curated'
  },
  {
    id: 'sunrise-monet-orig',
    title: '《奶龙的日出·印象》',
    originalTitle: '《日出·印象》',
    originalTitleEn: 'Impression, Sunrise',
    artist: '克劳德·莫奈 (Claude Monet)',
    year: '1872 年',
    periodId: 'impressionism',
    movementName: '印象派发端 (Impressionism)',
    location: '法国巴黎 · 玛摩丹莫奈美术馆 (Musée Marmottan Monet)',
    medium: '画布油彩 (Oil on Canvas)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1280px-Monet_-_Impression%2C_Sunrise.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/500px-Monet_-_Impression%2C_Sunrise.jpg',
    compositionType: '虚实相生水天一色地平与晨舟斜切',
    compositionDescription: '勒阿弗尔港口的晨雾弥漫于水面，一轮鲜艳橙红朝阳冉冉升起，小舟剪影划破波光。',
    techniqueAnalysis: '外光派速写式碎笔与色光交融，捕捉瞬息万变的晨曦光雾。',
    historicalContext: '1874年首次无名艺术家展览中展出，“印象派”由此画得名。',
    source: 'curated'
  },
  {
    id: 'birth-venus-orig',
    title: '《维纳斯的诞生》',
    originalTitle: '《维纳斯的诞生》',
    originalTitleEn: 'The Birth of Venus',
    artist: '桑德罗·波提切利 (Sandro Botticelli)',
    year: '1485–1486 年',
    periodId: 'renaissance',
    movementName: '早期文艺复兴佛罗伦萨画派 (Early Renaissance)',
    location: '意大利佛罗伦萨 · 乌菲兹美术馆 (Galleria degli Uffizi)',
    medium: '画布蛋彩 (Tempera on Canvas)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1280px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/500px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg',
    compositionType: '中心对称立式 S 形维纳斯曲线',
    compositionDescription: '爱与美之女神维纳斯踩在巨大扇贝之上漂浮于爱琴海，风神吹送落英缤纷。',
    techniqueAnalysis: '优雅流畅的哥特式轮廓线与柔和淡雅的蛋彩明亮色调。',
    historicalContext: '美第奇家族委托创作，标志着古典神话世俗人文题材在文艺复兴的全面复苏。',
    source: 'curated'
  },
  {
    id: 'school-athens-orig',
    title: '《雅典学院》',
    originalTitle: '《雅典学院》',
    originalTitleEn: 'The School of Athens',
    artist: '拉斐尔·桑西 (Raphael Sanzio)',
    year: '1509–1511 年',
    periodId: 'renaissance',
    movementName: '文艺复兴全盛期 (High Renaissance)',
    location: '梵蒂冈 · 宗座宫签字厅壁画 (Stanze di Raffaello)',
    medium: '湿壁画 (Fresco)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1280px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/500px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg',
    compositionType: '恢弘拱券深邃线性透视与对称群贤布局',
    compositionDescription: '柏拉图与亚里士多德位于中央透视焦点，50余位古希腊哲学宗师各展绝学。',
    techniqueAnalysis: '将古典罗马建筑穹顶与文艺复兴和谐严谨的人文主义哲学完美融合。',
    historicalContext: '教皇尤利乌斯二世图书馆签字厅四大主题壁画之一，象征哲理智慧之光。',
    source: 'curated'
  },
  {
    id: 'night-watch-orig',
    title: '《夜巡》',
    originalTitle: '《夜巡 / 弗朗斯·班宁·柯克上尉的民兵队》',
    originalTitleEn: 'The Night Watch',
    artist: '伦勃朗·范·莱因 (Rembrandt van Rijn)',
    year: '1642 年',
    periodId: 'baroque_rococo',
    movementName: '荷兰黄金时代巴洛克 (Dutch Golden Age)',
    location: '荷兰阿姆斯特丹 · 荷兰国家博物馆 (Rijksmuseum)',
    medium: '画布油彩 (Oil on Canvas)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1280px-The_Night_Watch_-_HD.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/500px-The_Night_Watch_-_HD.jpg',
    compositionType: '打破刻板队列的动态行进与舞台聚光构图',
    compositionDescription: '阿姆斯特丹射手民兵连在队长带领下正准备出动，人物各具神态生动喧哗。',
    techniqueAnalysis: '戏剧性聚光灯式强明暗光影法，赋予集体肖像画历史画般的史诗律动。',
    historicalContext: '荷兰黄金时代集体肖像画的最高峰，彻底颠覆了以往平铺直叙的合影程式。',
    source: 'curated'
  },
  {
    id: 'liberty-leading-orig',
    title: '《自由引导人民》',
    originalTitle: '《自由引导人民》',
    originalTitleEn: 'Liberty Leading the People',
    artist: '欧仁·德拉克罗瓦 (Eugène Delacroix)',
    year: '1830 年',
    periodId: 'romanticism_neoclassic',
    movementName: '浪漫主义 (Romanticism)',
    location: '法国巴黎 · 卢浮宫博物馆 (Musée du Louvre)',
    medium: '画布油彩 (Oil on Canvas)',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg/1280px-Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg/500px-Eug%C3%A8ne_Delacroix_-_Le_28_Juillet._La_Libert%C3%A9_guidant_le_peuple.jpg',
    compositionType: '奔腾向前的金字塔战火烽烟动势',
    compositionDescription: '象征自由的女神克利奥高举三色旗跨越街垒，带领工人工匠与少年浴血奋战。',
    techniqueAnalysis: '浓烈饱和的红白蓝色彩激情与翻滚烟尘笔触，充满浪漫主义革命豪情。',
    historicalContext: '纪念1830年法国七月革命推翻波旁王朝的经典画作。',
    source: 'curated'
  }
];

/**
 * Extract clean keywords from dirty filenames or custom user parody titles
 * e.g. "蒙奶丽莎_二改.png" -> "蒙娜丽莎", "最奶的晚餐_hd.jpg" -> "最后的晚餐"
 */
export function extractArtworkKeywords(filenameOrText: string): string {
  let cleaned = filenameOrText
    .replace(/\.[^/.]+$/, '') // remove extension
    .replace(/[《》【】\[\]()（）_—\-+]/g, ' ') // remove brackets
    .trim();

  // Alias maps
  if (cleaned.includes('蒙奶') || cleaned.includes('蒙娜') || cleaned.includes('mona')) return '蒙娜丽莎';
  if (cleaned.includes('最奶') || cleaned.includes('最后') || cleaned.includes('晚餐') || cleaned.includes('supper')) return '最后的晚餐';
  if (cleaned.includes('珍珠') || cleaned.includes('耳环') || cleaned.includes('pearl')) return '戴珍珠耳环的少女';
  if (cleaned.includes('加利利') || cleaned.includes('奶蛙') || cleaned.includes('风暴') || cleaned.includes('galilee')) return '加利利海上的风暴';
  if (cleaned.includes('大天使') || cleaned.includes('米迦勒') || cleaned.includes('审判') || cleaned.includes('michael')) return '大天使米迦勒战胜撒旦';
  if (cleaned.includes('荣光') || cleaned.includes('升天') || cleaned.includes('titian')) return '圣母升天 提香';
  if (cleaned.includes('以利') || cleaned.includes('迦密山') || cleaned.includes('carmel')) return '以利亚 迦密山';
  if (cleaned.includes('丘比特') || cleaned.includes('普绪刻') || cleaned.includes('cupid')) return '普绪刻被爱神的吻唤醒';
  if (cleaned.includes('创造') || cleaned.includes('亚当') || cleaned.includes('adam')) return '创造亚当';
  if (cleaned.includes('呐喊') || cleaned.includes('蒙克') || cleaned.includes('scream')) return '呐喊';
  if (cleaned.includes('星月夜') || cleaned.includes('星夜') || cleaned.includes('starry')) return '星月夜';
  if (cleaned.includes('日出') || cleaned.includes('莫奈') || cleaned.includes('sunrise')) return '日出印象';
  if (cleaned.includes('维纳斯') || cleaned.includes('venus')) return '维纳斯的诞生';
  if (cleaned.includes('雅典') || cleaned.includes('学院') || cleaned.includes('athens')) return '雅典学院';
  if (cleaned.includes('夜巡') || cleaned.includes('watch')) return '夜巡';
  if (cleaned.includes('自由') || cleaned.includes('引导') || cleaned.includes('liberty')) return '自由引导人民';

  // Strip generic modifiers
  cleaned = cleaned
    .replace(/奶龙/g, '')
    .replace(/二改/g, '')
    .replace(/表情包/g, '')
    .replace(/高清/g, '')
    .replace(/原画/g, '')
    .replace(/名画/g, '')
    .trim();

  return cleaned || filenameOrText;
}

/**
 * Fetch remote image and convert to compressed Base64 for permanent safe storage
 */
export async function downloadAndConvertImageToBase64(imageUrl: string): Promise<string> {
  if (!imageUrl) return '';
  if (imageUrl.startsWith('data:image')) return imageUrl;

  try {
    const res = await fetch(imageUrl, { mode: 'cors' });
    if (!res.ok) throw new Error('Fetch failed');
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        resolve(imageUrl);
      };
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    // If direct CORS fetch is restricted, return the original URL which ArtworkImage handles
    console.warn('Direct image download fallback to remote URL:', err);
    return imageUrl;
  }
}

/**
 * Unified Search for matching classical masterworks from all sources
 */
export async function searchClassicalArtworks(
  query: string,
  sourceFilter: 'all' | 'curated' | 'wikipedia' | 'artic' = 'all'
): Promise<MatchedOriginalResult[]> {
  const normalizedQuery = extractArtworkKeywords(query).toLowerCase();
  const results: MatchedOriginalResult[] = [];

  // 1. Search Curated Database first
  if (sourceFilter === 'all' || sourceFilter === 'curated') {
    const curatedMatches = CURATED_MASTERPIECES.filter((item) => {
      return (
        item.originalTitle.toLowerCase().includes(normalizedQuery) ||
        item.originalTitleEn.toLowerCase().includes(normalizedQuery) ||
        item.artist.toLowerCase().includes(normalizedQuery) ||
        item.title.toLowerCase().includes(normalizedQuery) ||
        query.toLowerCase().includes(item.originalTitle.replace(/[《》]/g, '').toLowerCase()) ||
        item.originalTitle.replace(/[《》]/g, '').includes(query)
      );
    });
    results.push(...curatedMatches);
  }

  // 2. Query Wikipedia & Wikimedia Commons Public API
  if (sourceFilter === 'all' || sourceFilter === 'wikipedia') {
    try {
      const searchUrl = `https://zh.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages|extracts|info&generator=search&gsrsearch=${encodeURIComponent(
        query + ' 画作'
      )}&gsrlimit=6&piprop=original|thumbnail&pithumbsize=800&exintro=1&explaintext=1&exchars=240`;

      const wikiRes = await fetch(searchUrl);
      if (wikiRes.ok) {
        const data = await wikiRes.json();
        if (data.query?.pages) {
          const pages = Object.values(data.query.pages) as any[];
          pages.forEach((page) => {
            const imgUrl = page.original?.source || page.thumbnail?.source;
            if (imgUrl) {
              // Avoid duplicates
              if (!results.some((r) => r.originalTitle.includes(page.title))) {
                results.push({
                  id: `wiki-${page.pageid}`,
                  title: `《奶龙之${page.title}》`,
                  originalTitle: `《${page.title}》`,
                  originalTitleEn: page.title,
                  artist: '欧洲古典艺术大师',
                  year: '古典时期',
                  periodId: 'renaissance',
                  movementName: '西方古典名画',
                  location: '世界著名博物馆典藏',
                  medium: '布面油画 / 湿壁画',
                  originalImageUrl: imgUrl,
                  thumbnailUrl: page.thumbnail?.source || imgUrl,
                  historicalContext: page.extract || '维基百科艺术史馆藏档案',
                  compositionType: '古典主义构图',
                  compositionDescription: '气势恢宏的古典画面构图，完美展现西方油画艺术精髓。',
                  techniqueAnalysis: '严谨的解剖学透视与古典油彩光影技法。',
                  source: 'wikipedia'
                });
              }
            }
          });
        }
      }
    } catch (err) {
      console.warn('Wikipedia API fetch error:', err);
    }
  }

  // 3. Query Art Institute of Chicago Open Access API
  if (sourceFilter === 'all' || sourceFilter === 'artic') {
    try {
      const articUrl = `https://api.artic.edu/api/v1/artworks/search?q=${encodeURIComponent(
        query
      )}&fields=id,title,artist_display,date_display,image_id,artwork_type_title,department_title&limit=6`;
      const articRes = await fetch(articUrl);
      if (articRes.ok) {
        const data = await articRes.json();
        if (Array.isArray(data.data)) {
          data.data.forEach((item: any) => {
            if (item.image_id) {
              const fullImg = `https://www.artic.edu/iiif/2/${item.image_id}/full/1000,/0/default.jpg`;
              const thumbImg = `https://www.artic.edu/iiif/2/${item.image_id}/full/400,/0/default.jpg`;
              results.push({
                id: `artic-${item.id}`,
                title: `《奶龙之${item.title}》`,
                originalTitle: `《${item.title}》`,
                originalTitleEn: item.title,
                artist: item.artist_display || 'Art Institute of Chicago Master',
                year: item.date_display || 'Classical Era',
                periodId: 'impressionism',
                movementName: item.department_title || '芝加哥艺术博物馆典藏',
                location: '美国 · 芝加哥艺术博物馆 (Art Institute of Chicago)',
                medium: item.artwork_type_title || '画布油彩 (Oil on Canvas)',
                originalImageUrl: fullImg,
                thumbnailUrl: thumbImg,
                historicalContext: `典藏于芝加哥艺术博物馆公开档案（馆藏编号 #${item.id}）。`,
                compositionType: '世界名馆典藏构图',
                source: 'artic'
              });
            }
          });
        }
      }
    } catch (err) {
      console.warn('Art Institute of Chicago API fetch error:', err);
    }
  }

  return results;
}

/**
 * Auto Match a single imported file to best matching original artwork
 */
export async function autoMatchAndDownloadOriginal(filename: string): Promise<MatchedOriginalResult | null> {
  const matches = await searchClassicalArtworks(filename, 'all');
  if (matches.length > 0) {
    return matches[0];
  }
  return null;
}
