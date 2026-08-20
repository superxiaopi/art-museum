import { Artwork } from '../types';

export const INITIAL_ARTWORKS: Artwork[] = [
  // =========================================================================
  // 1.《蒙奶丽莎》 (对应上传素材: 蒙奶丽莎.png)
  // =========================================================================
  {
    id: 'mona-nailong',
    title: '《蒙奶丽莎》',
    originalTitle: '《蒙娜丽莎》',
    originalTitleEn: 'Mona Lisa (La Gioconda)',
    artist: '列奥纳多·达·芬奇 (Leonardo da Vinci)',
    year: '1503–1519 年',
    periodId: 'renaissance',
    movementName: '意大利文艺复兴全盛期 (High Renaissance)',
    location: '法国巴黎 · 卢浮宫博物馆 (Musée du Louvre)',
    medium: '白杨木板油画 (Oil on Poplar Panel)',
    dimensions: '77 cm × 53 cm',
    parodyImageUrl: '/images/parodies/蒙奶丽莎.png',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/500px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg',
    compositionType: '经典半身金字塔等腰三角形构图',
    compositionDescription: '人物双手交叠置于扶手之上，与头部形成坚实稳固的等腰金字塔三角。背景为虚构的崇山峻岭与蜿蜒河流，采用大气透视法（空气近浓远淡）产生无限深远的苍茫空间感。',
    techniqueAnalysis: '达芬奇炉火纯青的“无界渐变晕涂法” (Sfumato)。眼角与嘴角毫无生硬边缘，通过数十层极薄的半透明油彩反复罩染，使光线如同从人物面颊内侧温润透出。',
    historicalContext: '为佛罗伦萨富商弗朗切斯科·德尔·焦孔多之妻丽莎·格拉迪尼所作肖像。达芬奇随身携带并润色修改十余年直至逝世，成为西方美术史最负盛名的巅峰象征。',
    parodyCommentary: '《蒙奶丽莎》保留了原画神秘端庄的侧坐身姿、古典深色褶皱薄纱与巴洛克雕花古典金框，却将神秘微笑替换为黄色奶龙标志性的圆滚滚脸庞、清澈碧绿的大眼睛与天然呆萌嘴角。两颊的圆润弧度与达芬奇的渐隐光影无缝融合，形成一种“既古典神圣、又让人瞬间融化”的治愈系视觉魅力。',
    colorPalette: [
      { hex: '#f2c94c', name: '暖调奶光 (NaiLong Radiance)', role: '面部柔和主光' },
      { hex: '#3d3a2a', name: '文艺复兴暗褐 (Renaissance Umber)', role: '阴影与衣袍褶皱' },
      { hex: '#586b5c', name: '远山青灰 (Atmospheric Green)', role: '背景大气透视' },
      { hex: '#947c4e', name: '古典金框古铜 (Antique Gilt)', role: '典雅装饰基调' }
    ],
    audioGuideScript: '欢迎来到卢浮宫最瞩目的展厅。您现在看到的《蒙奶丽莎》，巧妙继承了达芬奇著名的无界渐变晕涂法。注意两颊与嘴角没有生硬的轮廓线，而是在光影过渡中自然浮现。奶龙那圆润的面庞与清澈的绿眼睛，赋予了文艺复兴古典主义前所未有的萌态温情。',
    tags: ['文艺复兴', '达芬奇', '晕涂法', '金字塔构图', '卢浮宫镇馆三宝', '肖像名作'],
    views: 52400
  },

  // =========================================================================
  // 2.《最奶的晚餐》 (对应上传素材: 最奶的晚餐.png)
  // =========================================================================
  {
    id: 'last-milkpper',
    title: '《最奶的晚餐》',
    originalTitle: '《最后的晚餐》',
    originalTitleEn: 'The Last Supper (Il Cenacolo)',
    artist: '列奥纳多·达·芬奇 (Leonardo da Vinci)',
    year: '1495–1498 年',
    periodId: 'renaissance',
    movementName: '意大利文艺复兴全盛期 (High Renaissance)',
    location: '意大利米兰 · 恩宠圣母修道院 (Santa Maria delle Grazie)',
    medium: '蛋彩与油彩干壁画 (Tempera and Oil on Gesso)',
    dimensions: '460 cm × 880 cm',
    parodyImageUrl: '/images/parodies/最奶的晚餐.png',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg/500px-The_Last_Supper_-_Leonardo_Da_Vinci_-_High_Resolution_32x16.jpg',
    compositionType: '严格单点线性透视 + 金字塔对称群像',
    compositionDescription: '透视灭点严格收束于中心基督（二创中为正中奶龙）额头正中，两侧十二门徒以三人一组形成严谨的四组对称韵律，餐桌水平线切分视觉地平，强化宣告瞬间的戏剧张力。',
    techniqueAnalysis: '达芬奇打破传统壁画程式，在干壁上运用油彩与坦培拉混合技法。通过天花板网格与侧墙挂毯的深度透视线，构建出精密逼真的三维殿堂空间与丰富的手势语言。',
    historicalContext: '米兰公爵卢多维科·斯福尔扎委托创作，描绘基督宣布“你们中有一个人要出卖我”时的震惊瞬间。此作彻底打破传统宗教画的呆板排列，开启文艺复兴心理刻画的巅峰。',
    parodyCommentary: '在《最奶的晚餐》二创中，长桌前13位角色全员化身为金黄圆润、身着各色古典长袍的“奶龙使徒团”！正中奶龙安详坦然，两侧奶龙则完美还原了原画中不同门徒的肢体动作：有的捂嘴惊愕、有的探身低语、有的伸手抗辩，将受难前夜的肃穆转化为一场充满幽默温情的“谁偷喝了最后一杯牛奶”萌系名场面。',
    colorPalette: [
      { hex: '#e8b839', name: '奶龙使徒黄 (NaiLong Yellow)', role: '主视觉暖色聚焦' },
      { hex: '#2f4858', name: '圣袍群青蓝 (Apostle Navy)', role: '冷色衣袍与阴影' },
      { hex: '#8d5b4c', name: '修道院土赭 (Monastery Ochre)', role: '建筑古朴深远质感' },
      { hex: '#e3d5b8', name: '亚麻圣餐白 (Altar Linen)', role: '桌面透视引导光' }
    ],
    audioGuideScript: '欢迎来到《最奶的晚餐》展位。请观察正中央那位金黄圆润的身影——达芬奇严格的单点透视灭点正落在它的眉心。注意两侧奶龙们生动的三人组合，左侧那只甚至紧张地捂住了嘴巴。这种古典严密透视与现代萌趣的剧烈对撞，正是名画二创最迷人的艺术火花。',
    tags: ['文艺复兴', '达芬奇', '群像构图', '单点透视', '名画名场面', '十二门徒'],
    views: 48600
  },

  // =========================================================================
  // 3.《珍珠奶龙少女》 (对应上传素材: 珍珠奶龙少女.png)
  // =========================================================================
  {
    id: 'girl-with-pearl-nailong',
    title: '《珍珠奶龙少女》',
    originalTitle: '《戴珍珠耳环的少女》',
    originalTitleEn: 'Girl with a Pearl Earring (Meisje met de parel)',
    artist: '约翰内斯·维米尔 (Johannes Vermeer)',
    year: '约 1665 年',
    periodId: 'baroque_rococo',
    movementName: '荷兰黄金时代风俗画与肖像 (Dutch Golden Age)',
    location: '荷兰海牙 · 莫瑞泰斯皇家美术馆 (Mauritshuis)',
    medium: '布面油画 (Oil on Canvas)',
    dimensions: '44.5 cm × 39 cm',
    parodyImageUrl: '/images/parodies/珍珠奶龙少女.png',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/500px-1665_Girl_with_a_Pearl_Earring.jpg',
    compositionType: '回眸一瞬的特写聚焦 + 纯黑暗室空间',
    compositionDescription: '人物侧身回眸，视线直穿画布与观众对视。深邃的纯黑背景将所有杂质剔除，使光线如聚光灯般完全倾泻在面庞、头巾与闪亮的珍珠耳环上。',
    techniqueAnalysis: '维米尔对光的精确把控堪称“光影魔术师”。头巾使用昂贵的天然青金石（群青）颜料，珍珠耳环仅用两笔白色与反光灰色油彩，就勾勒出绝妙的立体反光感与空气湿度。',
    historicalContext: '这是一幅“特罗尼”（Tronie，荷兰语意为面部表情习作）而非传统贵族肖像。神秘少女的身份至今成谜，被称为“北方的蒙娜丽莎”。',
    parodyCommentary: '黄色小奶龙戴上标志性的东方风情蓝黄双色头巾，耳垂处悬挂着一颗硕大的水滴形高光珍珠。圆滚滚的面颊在维米尔幽微侧光的抚照下泛着温润的陶瓷光泽，回眸神态清澈纯真，将巴洛克光影的极致优雅与童真萌趣完美融为一体。',
    colorPalette: [
      { hex: '#1b4d7e', name: '纯青金石蓝 (Ultramarine Lapislazuli)', role: '异域头巾主色' },
      { hex: '#e8bc40', name: '琥珀奶龙肤光 (Amber Glow)', role: '面部柔和反光' },
      { hex: '#0f1418', name: '深邃暗室黑 (Pitch Black Void)', role: '极简背景反衬' },
      { hex: '#eef3f7', name: '珍珠高光泪滴 (Pearl Reflection)', role: '视觉画龙点睛' }
    ],
    audioGuideScript: '请注意维米尔是如何只用了区区两笔高光，就让整颗珍珠耳环在暗室中熠熠生辉。在《珍珠奶龙少女》中，那抹回眸的纯真清澈，不仅是对光影大师的崇高致敬，更让人瞬间感受到古典油画穿越时空的亲和力与呼吸感。',
    tags: ['巴洛克', '维米尔', '荷兰黄金时代', '光影魔法', '珍珠耳环', '特罗尼'],
    views: 46200
  },

  // =========================================================================
  // 4.《加利利海上的奶蛙》 (对应上传素材: 加利利海上的奶蛙.png)
  // =========================================================================
  {
    id: 'storm-on-sea-of-galilee',
    title: '《加利利海上的奶蛙 / 奶龙风暴》',
    originalTitle: '《加利利海上的风暴》',
    originalTitleEn: 'The Storm on the Sea of Galilee',
    artist: '伦勃朗·范·莱因 (Rembrandt van Rijn)',
    year: '1633 年',
    periodId: 'baroque_rococo',
    movementName: '荷兰黄金时代巴洛克 (Dutch Golden Age Baroque)',
    location: '原藏美国波士顿 · 伊莎贝拉·嘉纳艺术博物馆 (1990年失窃)',
    medium: '布面油画 (Oil on Canvas)',
    dimensions: '160 cm × 128 cm',
    parodyImageUrl: '/images/parodies/加利利海上的奶蛙.png',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg/500px-Rembrandt_Christ_in_the_Storm_on_the_Lake_of_Galilee.jpg',
    compositionType: '倾斜45度对角线风暴动势 + 聚光灯明暗对照',
    compositionDescription: '整艘渔船被狂风巨浪猛烈掀向左上方，船体与狂暴的浪头形成撕裂般的对角线。一束强烈的舞台式神圣之光穿透乌云，精准击中桅杆与慌乱拼搏的水手。',
    techniqueAnalysis: '巴洛克明暗对照法 (Chiaroscuro) 的极高造诣。伦勃朗利用极端深沉的阴暗背景衬托出高光区域的精细细节，浪花飞溅的水珠与破裂船帆的厚涂笔触极具质感。',
    historicalContext: '描绘《新约圣经·马可福音》中门徒在暴风雨中惊慌失措、基督泰然平息风浪的神迹，是伦勃朗毕生唯一一幅以海景为主题的珍贵巨作。',
    parodyCommentary: '二创将船上一众惊慌失措的水手全部替换成了表情丰富的小奶蛙/奶龙！红袍先知站在高耸船头奋力收帆，其余奶龙挤在颠簸船舱中：有的抱头惊慌、有的死死握桨、有的呆滞望天。滔天白浪与伦勃朗神圣光柱照射下，原本肃杀惊险的灾难场面演变成了一出扣人心弦又可爱治愈的“奶蛙航海大冒险”。',
    colorPalette: [
      { hex: '#e8af30', name: '伦勃朗圣光金 (Rembrandt Gold)', role: '破云破晓聚光' },
      { hex: '#192b37', name: '深海狂浪黛蓝 (Storm Teal)', role: '阴郁危险海水' },
      { hex: '#4a3828', name: '湿木船体褐 (Oak Hull Umber)', role: '船身结构厚重色' },
      { hex: '#f0f3f4', name: '飞溅浪花白 (Seafoam White)', role: '浪头动势高光' }
    ],
    audioGuideScript: '伦勃朗最精妙之处，就在于用一束光点亮混乱中的希望。请看船舱里那些毛茸茸的小奶蛙，面对滔天巨浪却依然抱团取暖，这幅画完美重现了巴洛克光影所带来的震撼戏剧张力与电影感。',
    tags: ['巴洛克', '伦勃朗', '明暗对照法', '风暴海景', '光影大师', '戏剧动势'],
    views: 39500
  },

  // =========================================================================
  // 5.《大天使长的审判》 (对应上传素材: 大天使长的审判.png)
  // =========================================================================
  {
    id: 'archangel-michael-judgment',
    title: '《大天使长的审判》',
    originalTitle: '《大天使圣米迦勒将撒旦踩在脚下》',
    originalTitleEn: 'St. Michael the Archangel Overwhelming the Demon',
    artist: '圭多·雷尼 (Guido Reni)',
    year: '1636 年',
    periodId: 'baroque_rococo',
    movementName: '意大利巴洛克古典主义 (Italian Baroque Classicism)',
    location: '意大利罗马 · 嘉布遣圣母无原罪圣堂 (Santa Maria della Concezione)',
    medium: '丝绸油画 (Oil on Silk Canvas)',
    dimensions: '293 cm × 202 cm',
    parodyImageUrl: '/images/parodies/大天使长的审判.png',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Le_Grand_Saint_Michel%2C_by_Raffaello_Sanzio%2C_from_C2RMF_retouched.jpg/500px-Le_Grand_Saint_Michel%2C_by_Raffaello_Sanzio%2C_from_C2RMF_retouched.jpg',
    compositionType: '垂直神圣压制 + 飘扬猩红披风对角动态',
    compositionDescription: '大天使长米迦勒以挺拔英勇的姿态垂直居中，脚踏倒卧的恶魔；背后朱红色斗篷迎风狂舞，与天顶射下的神圣斜向光柱构成强有力的对角交叉动态平衡。',
    techniqueAnalysis: '雷尼兼具卡拉瓦乔的强烈戏剧光影与拉斐尔式的古典优雅。大天使面容沉着神圣，盔甲反光与恶魔身处的地狱烈火形成炽热与神圣的色彩碰撞。',
    historicalContext: '为罗马红衣主教安东尼奥·巴贝里尼委托创作，是反宗教改革时期天主教最著名的护教图像之一，象征神圣正义对黑暗邪恶的决定性胜利。',
    parodyCommentary: '在这幅二创中，威风凛凛的大天使长化身为头顶圣光、背生黑白羽翼的小奶龙！它手擎十字神圣权杖与锋利宝剑，单脚踩在趴地抱头求饶的恶魔小奶龙背上。原本残酷肃杀的地狱圣战，在两只圆滚滚、大眼睛奶龙的演绎下，瞬间化为一场“惩罚偷吃小淘气”的萌趣正义审判。',
    colorPalette: [
      { hex: '#c92a2a', name: '大天使斗篷红 (Archangel Crimson)', role: '英雄气势飞扬' },
      { hex: '#f5c518', name: '天界神圣金 (Celestial Gold)', role: '天使身躯光辉' },
      { hex: '#632512', name: '地狱烈焰焦褐 (Hellfire Umber)', role: '底层火海阴影' },
      { hex: '#e8f0fe', name: '天顶降临白光 (Divine Sky Ray)', role: '神圣破云主光' }
    ],
    audioGuideScript: '注意观察大天使长脚下的构图关系。雷尼在原作中描绘了邪不压正的永恒主题。而二创将主角替换为奶龙后，威严神圣中透露着不可抗拒的可爱，地狱烈火与天顶圣光的强烈明暗对比令人过目难忘。',
    tags: ['巴洛克', '圭多雷尼', '大天使米迦勒', '神圣审判', '明暗光影', '正义之剑'],
    views: 43100
  },

  // =========================================================================
  // 6.《奶龙的荣光》 (对应上传素材: 奶龙的荣光.png)
  // =========================================================================
  {
    id: 'glory-of-nailong-ascension',
    title: '《奶龙的荣光 / 圣光升天图》',
    originalTitle: '《基督升天 / 圣母升天》',
    originalTitleEn: 'The Ascension / The Assumption of the Virgin',
    artist: '提香 (Titian) / 古斯塔夫·多雷 (Gustave Doré) 风格古典圣像',
    year: '约 16–19 世纪古典圣像传统',
    periodId: 'baroque_rococo',
    movementName: '古典巴洛克与大教堂祭坛画 (High Baroque Sacred Art)',
    location: '欧洲大教堂圣殿与国家画廊',
    medium: '大教堂天顶与祭坛油画 (Altar Oil & Fresco)',
    dimensions: '350 cm × 210 cm',
    parodyImageUrl: '/images/parodies/奶龙的荣光.png',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Tizian_041.jpg/500px-Tizian_041.jpg',
    compositionType: '三层垂直天国层级 + 辐射状金色天光',
    compositionDescription: '自下而上分为地表信众、云中飞翔天使群、以及天顶光芒正中的至高圣尊。放射状的金色云海形成了宏大向上的视觉升华动势。',
    techniqueAnalysis: '古典光辉派的金色逆光透视与翻滚云气厚涂法。层叠的暖金与焦糖色云层创造出无与伦比的天国纵深，光晕从中心向四周强烈辐射。',
    historicalContext: '基督教传统中最崇高神圣的母题之一，描绘神圣救主功成圆满、在万众瞩目与天使颂歌中升入金色天国天界，带给世人永恒的拯救与光明。',
    parodyCommentary: '金光璀璨的云海中央，奶龙之主身披红白圣袍、张开双臂缓缓升空，身后万道金芒绽放！空中环绕飞翔着数只拍打小翅膀的“小天使奶龙”，地面上一群身披各色长袍的奶龙信众仰头凝视、双爪合十虔诚祈祷，将古典宗教画最恢弘崇高的升天奇迹演绎为充满暖意与治愈的“奶龙封神荣光时刻”。',
    colorPalette: [
      { hex: '#f6c944', name: '天国万丈金光 (Ascension Gold)', role: '中心辐射圣光' },
      { hex: '#962d22', name: '圣袍朱砂红 (Sacred Robe Crimson)', role: '升天主体衣袍' },
      { hex: '#543d2b', name: '翻滚天云焦茶 (Heavenly Cloud Umber)', role: '云层厚涂质感' },
      { hex: '#fff8db', name: '极光炽白 (Glorious White)', role: '天顶发光源' }
    ],
    audioGuideScript: '抬头仰望，感受那穿透云层的万丈金芒！《奶龙的荣光》借鉴了提香与多雷宏伟的升天祭坛画构图。金色云海中欢快盘旋的小天使奶龙，为古典庄严的天界增添了无尽的梦幻与纯真力量。',
    tags: ['巴洛克', '圣像画', '升天图', '金色圣光', '天使使者', '恢弘史诗'],
    views: 45800
  },

  // =========================================================================
  // 7.《以利龙在迦密山》 (对应上传素材: 以利龙在迦密山.png)
  // =========================================================================
  {
    id: 'elidragon-mount-carmel',
    title: '《以利龙在迦密山》',
    originalTitle: '《以利亚在迦密山上求火》',
    originalTitleEn: 'Elijah\'s Sacrifice on Mount Carmel',
    artist: '古斯塔夫·多雷 (Gustave Doré) / 卡尔·布洛赫 (Carl Bloch) 风格历史画',
    year: '约 19 世纪浪漫主义历史画',
    periodId: 'romanticism_neoclassic',
    movementName: '浪漫主义历史与宗教画 (Romanticism & Biblical History)',
    location: '欧洲国家艺术馆与版画珍藏馆',
    medium: '布面油画与古典厚涂 (Impasto Oil on Canvas)',
    dimensions: '220 cm × 310 cm',
    parodyImageUrl: '/images/parodies/以利龙在迦密山.png',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Giovanni_Girolamo_Savoldo%2C_Elijah_Fed_by_the_Raven%2C_c._1510%2C_NGA_46134.jpg/500px-Giovanni_Girolamo_Savoldo%2C_Elijah_Fed_by_the_Raven%2C_c._1510%2C_NGA_46134.jpg',
    compositionType: '祭坛天火中心焦点 + 两翼群像弧形环伺',
    compositionDescription: '中央石砌祭坛上天火熊熊燃烧，形成画面的绝对光源；右侧先知跪地祈祷，左侧和后方众多民众层层围拢，形成受神迹震撼的戏剧化弧形包围圈。',
    techniqueAnalysis: '浪漫主义厚重金黄的画刀厚涂（Impasto）质感。强烈的天火光束照亮先知的白袍与围观人群惊愕的面庞，大地与天空浑然一体，极具粗犷震撼的史诗力量。',
    historicalContext: '取材于《圣经·列王纪上》：先知以利亚在迦密山与巴力假先知对决，以利亚祈祷后天降神火烧尽燔祭与石头，彰显真神大能并唤醒民众信仰。',
    parodyCommentary: '身披纯白长袍的“以利龙”先知跪在石砌祭坛前向天张开双爪，天顶圣光轰然引燃熊熊烈火！左侧与背景层层叠叠身披白袍的“奶龙信众团”全员探头，个个睁大圆圆的黑豆大眼围观天火神迹，金黄色厚重油画肌理与群聚奶龙的憨呆表情碰撞出绝妙的史诗荒诞幽默。',
    colorPalette: [
      { hex: '#e5a93b', name: '迦密山天火金 (Carmel Fire Gold)', role: '中心神火光源' },
      { hex: '#fbf7ee', name: '先知圣洁白 (Prophet Linen White)', role: '以利龙白袍受光' },
      { hex: '#6b4c2a', name: '古石祭坛赭褐 (Altar Stone Ochre)', role: '基座与地面厚度' },
      { hex: '#382516', name: '暮色焦茶暗部 (Dusk Umber)', role: '外围群像阴影' }
    ],
    audioGuideScript: '听那烈火熊熊燃烧的噼啪声！在《以利龙在迦密山》中，厚重的金色笔触模拟了古典油画经过岁月洗礼的沧桑质感。群聚奶龙们那惊呆的神情，让古老肃穆的圣经历史画瞬间变成了最治愈的萌系大剧场。',
    tags: ['浪漫主义', '以利亚', '迦密山', '天火神迹', '厚涂法', '圣经史诗'],
    views: 37400
  },

  // =========================================================================
  // 8.《丘比特唤醒普绪刻》 (对应上传素材: 丘比特唤醒普绪刻.png)
  // =========================================================================
  {
    id: 'psyche-revived-by-cupid-nailong',
    title: '《丘比特唤醒普绪刻》',
    originalTitle: '《被丘比特之吻唤醒的普绪刻》',
    originalTitleEn: 'Psyche Revived by Cupid\'s Kiss',
    artist: '安东尼奥·卡诺瓦 (Antonio Canova)',
    year: '1787–1793 年',
    periodId: 'romanticism_neoclassic',
    movementName: '新古典主义雕塑巅峰 (Neoclassicism Sculpture)',
    location: '法国巴黎 · 卢浮宫博物馆 (Musée du Louvre)',
    medium: '纯白卡拉拉大理石圆雕 (White Carrara Marble)',
    dimensions: '155 cm × 168 cm × 101 cm',
    parodyImageUrl: '/images/parodies/丘比特唤醒普绪刻.png',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/0_Psych%C3%A9_ranim%C3%A9e_par_le_baiser_de_l%27Amour_-_Canova_-_Louvre_1.JPG/500px-0_Psych%C3%A9_ranim%C3%A9e_par_le_baiser_de_l%27Amour_-_Canova_-_Louvre_1.JPG',
    compositionType: '空间 X 形交叉环抱动态 + 360度流动视点',
    compositionDescription: '丘比特张开的羽翼与普绪刻抬起的手臂构成优美的对角交叉（X形架构），两人身体与飘逸的织物在大理石基座上形成多角度流动的优雅螺旋。',
    techniqueAnalysis: '卡诺瓦新古典主义雕塑的鬼斧神工。将坚硬冰冷的大理石打磨出如丝绸薄纱般的半透明轻柔质感，以及温润如玉的人体肌肤反光，追求崇高纯洁的理想美。',
    historicalContext: '源自阿普列尤斯古罗马神话《金驴记》：爱神丘比特用深情一吻唤醒因误开冥后魔盒而陷入沉睡的爱人普绪刻，象征爱（Amor）与灵魂（Psyche）的永恒结合。',
    parodyCommentary: '卢浮宫古典展厅大理石基座上，原本俊美的爱神丘比特与普绪刻化身为两只纯真可爱的奶龙！背后展开洁白羽翼的丘比特奶龙深情俯身，环抱抚摸半卧在岩石上的普绪刻奶龙，微风吹拂着薄如蝉翼、缀满金色小花的白色轻纱，冰冷的大理石雕塑瞬间被注入了治愈浪漫的童话梦幻光晕。',
    colorPalette: [
      { hex: '#faeec8', name: '温润奶龙玉白 (NaiLong Marble)', role: '雕塑肌体主色' },
      { hex: '#f0dfa8', name: '羽翼金边流光 (Wing Gold Sheen)', role: '天使翅膀高光' },
      { hex: '#9c8c7c', name: '卢浮宫石壁灰 (Louvre Stone Gray)', role: '展厅古典背景' },
      { hex: '#635345', name: '基座天然石岩 (Base Rock Brown)', role: '支撑基石厚重色' }
    ],
    audioGuideScript: '请绕着雕塑缓缓踱步，感受卡诺瓦雕塑中那令人屏息的温柔。当爱神丘比特奶龙张开洁白双翼俯身轻吻苏醒的普绪刻，坚硬的大理石化作了世间最柔软的爱意与纯真童话。',
    tags: ['新古典主义', '卡诺瓦', '卢浮宫', '大理石雕塑', '丘比特与普绪刻', '浪漫神话'],
    views: 41800
  },

  // =========================================================================
  // 9.《创造奶龙》 (西斯廷礼拜堂天顶名作)
  // =========================================================================
  {
    id: 'creation-of-nailong',
    title: '《创造奶龙》',
    originalTitle: '《创造亚当》',
    originalTitleEn: 'The Creation of Adam',
    artist: '米开朗基罗 (Michelangelo Buonarroti)',
    year: '约 1511–1512 年',
    periodId: 'renaissance',
    movementName: '意大利文艺复兴全盛期 (High Renaissance)',
    location: '梵蒂冈 · 西斯廷礼拜堂 (Sistine Chapel)',
    medium: '天顶湿壁画 (Fresco on Ceiling)',
    dimensions: '280 cm × 570 cm',
    parodyImageUrl: '/images/parodies/创造奶龙.png',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg/500px-Michelangelo_-_Creation_of_Adam_%28cropped%29.jpg',
    compositionType: '动态横向对峙 + 黄金分割指尖交汇',
    compositionDescription: '画面被隐形对角线分割：右侧天父在天使簇拥的红色云袍中向左飞驰，左侧亚当（二改奶龙）慵懒半卧于大地。两根即将相触的指尖定格在黄金分割焦点，凝聚生命火花传递的崇高瞬间。',
    techniqueAnalysis: '米开朗基罗以雕塑家视角作画，肌肉线条充满英雄主义张力。强健的解剖结构与疾风般翻滚的织物褶皱，展示了文艺复兴对“神圣力量”最崇高的视觉诠释。',
    historicalContext: '教皇尤利乌斯二世委托创作《创世纪》天顶画，《创造亚当》是其中最著名的一幕，象征人被赋予神性与灵魂。',
    parodyCommentary: '当雄伟天父伸出神圣手指，迎面而来的却是一只圆滚滚、软糯呆滞的小奶龙，两只圆乎乎的爪子即将相触的一刹那，神圣史诗感与现代无厘头萌感碰撞出了极具戏剧性的喜剧效果。',
    colorPalette: [
      { hex: '#ffcc33', name: '神圣奶光 (Divine Glow)', role: '生命灵气焦点' },
      { hex: '#8a2b2b', name: '天父披风红 (Drapery Crimson)', role: '右侧神力动势' },
      { hex: '#d8cfb8', name: '西斯廷灰泥 (Fresco Plaster)', role: '湿壁画大地质感' },
      { hex: '#637f94', name: '天界冷蓝 (Celestial Blue)', role: '空间神圣背景' }
    ],
    audioGuideScript: '这一刻是艺术史上最著名的一厘米距离。原画中象征灵魂火花的神圣碰触，在二创中被赋予了全新的温情意味——仿佛宇宙造物主正宠溺地唤醒这只贪睡的小奶龙。',
    tags: ['文艺复兴', '米开朗基罗', '西斯廷天顶', '神圣史诗', '解剖学张力'],
    views: 38200
  },

  // =========================================================================
  // 10.《呐喊的奶龙》 (现代表现主义名作)
  // =========================================================================
  {
    id: 'scream-of-nailong',
    title: '《呐喊的奶龙》',
    originalTitle: '《呐喊》',
    originalTitleEn: 'The Scream (Skrik)',
    artist: '爱德华·蒙克 (Edvard Munch)',
    year: '1893 年',
    periodId: 'modern_expressionism',
    movementName: '早期表现主义与象征主义 (Expressionism)',
    location: '挪威奥斯陆 · 国家美术馆 (National Museum, Oslo)',
    medium: '纸板蛋彩与蜡笔 (Tempera and Crayon on Cardboard)',
    dimensions: '91 cm × 73.5 cm',
    parodyImageUrl: '/images/parodies/呐喊的奶龙.png',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/500px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg',
    compositionType: '强烈透视斜线栏杆 + 漩涡状回旋曲线',
    compositionDescription: '桥梁栏杆以极度倾斜的对角线直插画外，将观者拽入深渊；天空中血红与橙黄的云层呈漩涡状扭曲翻滚，峡湾水面与人物身体同频共振，形成穿透宇宙的声波震颤。',
    techniqueAnalysis: '彻底抛弃写实物象，以狂乱波浪状线条直接具象化心理创伤与恐惧。红黄强反差的高纯度互补色，模拟了精神受压抑时的幻听与眩晕感。',
    historicalContext: '蒙克在日记中写道：“黄昏时我散步，天空突然变得血红……我感到有一声无尽的尖叫穿透了整个大自然。”这是现代人面临孤独、疾病与生存焦虑的世纪符号。',
    parodyCommentary: '当蒙克原作中消瘦惨白的骷髅面孔被替换为双手抱头、张大圆嘴巴的小奶龙，原本令人窒息的生存绝望瞬间化解为现代年轻人的“周一上班精神状态”与“无助可爱抓狂”，极具当代网络文化共鸣！',
    colorPalette: [
      { hex: '#f05a28', name: '血色焦云橙 (Blood Sky Orange)', role: '焦虑背景主色' },
      { hex: '#1c3144', name: '峡湾漩涡蓝 (Fjord Abyss Blue)', role: '阴郁冷暗衬托' },
      { hex: '#f7ce46', name: '抓狂奶龙黄 (Panic NaiLong Yellow)', role: '受惊主体高亮' },
      { hex: '#873d23', name: '冷酷斜桥赭 (Bridge Rust Ochre)', role: '透视压迫斜线' }
    ],
    audioGuideScript: '注意天空与峡湾中那如同音波般回荡的弯曲线条。在《呐喊的奶龙》里，蒙克那声穿透大自然的孤寂尖叫，被巧妙解构成了一句萌趣的“哇哇大叫”，展现了经典艺术如何跨越百年治愈现代人的精神焦虑。',
    tags: ['表现主义', '爱德华蒙克', '心理焦虑', '扭曲色彩', '世纪名作'],
    views: 42100
  },

  // =========================================================================
  // 11.《星月夜下的奶龙巡礼》 (后印象派名作)
  // =========================================================================
  {
    id: 'starry-night-nailong',
    title: '《星月夜下的奶龙巡礼》',
    originalTitle: '《星月夜》',
    originalTitleEn: 'The Starry Night (De sterrennacht)',
    artist: '文森特·梵高 (Vincent van Gogh)',
    year: '1889 年',
    periodId: 'impressionism',
    movementName: '后印象派 (Post-Impressionism)',
    location: '美国纽约 · 现代艺术博物馆 (MoMA)',
    medium: '布面油画 (Oil on Canvas)',
    dimensions: '73.7 cm × 92.1 cm',
    parodyImageUrl: '/images/parodies/星月夜下的奶龙巡礼.png',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/500px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
    compositionType: '柏树纵向火舌 + 宇宙涡流横向回旋',
    compositionDescription: '左侧深黑的丝柏树如黑色火焰般直插星空，打破宁静；天空中十一颗明亮星辰与新月在奔涌翻滚的蓝色涡流中旋转，与下方安静沉睡的圣雷米村庄构成动静对比。',
    techniqueAnalysis: '后印象派标志性的厚涂堆叠（Impasto）与强烈短促笔触。梵高直接用画刀和颜料管将纯色挤在画布上，纯钴蓝与铬黄的互补撞色激荡出内心情绪的熊熊烈火。',
    historicalContext: '梵高在圣雷米精神疗养院的病房窗口眺望夜空所作。画中的星空并非肉眼所见的客观景象，而是他炽热灵魂与宇宙律动的狂烈共振。',
    parodyCommentary: '金黄的奶龙坐在柏树旁的房顶上仰望星河，圆润金黄的身体与天空中旋转的星云同色同辉。梵高狂暴旋转的夜空在这只萌萌的小龙陪伴下，少了一份孤独痛苦，多了一份童话般的温暖陪伴。',
    colorPalette: [
      { hex: '#1c3d70', name: '圣雷米夜空钴蓝 (Cobalt Night Blue)', role: '宇宙涡流深邃色' },
      { hex: '#ffcc00', name: '燃烧星月铬黄 (Chrome Star Yellow)', role: '星宿与奶龙光芒' },
      { hex: '#1e382b', name: '丝柏树墨绿黑 (Cypress Noir)', role: '纵向破界火焰' },
      { hex: '#7ea8cf', name: '晨曦银河浅蓝 (Atmospheric Swirl)', role: '漩涡流动节奏' }
    ],
    audioGuideScript: '梵高曾说：“当我感到对宗教的强烈渴望时，我就会走到外面去画天上的星星。” 在这片由短促厚实笔触构成的宇宙旋涡中，小奶龙就像一颗落入凡间的小小恒星，将温暖与纯真注入了梵高那片浩瀚深邃的夜空。',
    tags: ['后印象派', '梵高', '厚涂法', '旋转星空', '情感色彩'],
    views: 49800
  },

  // =========================================================================
  // 12.《日出·印象奶龙港》 (印象派奠基名作)
  // =========================================================================
  {
    id: 'impression-sunrise-nailong',
    title: '《日出·印象奶龙港》',
    originalTitle: '《日出·印象》',
    originalTitleEn: 'Impression, Sunrise (Impression, soleil levant)',
    artist: '克劳德·莫奈 (Claude Monet)',
    year: '1872 年',
    periodId: 'impressionism',
    movementName: '印象派开山之作 (Impressionism)',
    location: '法国巴黎 · 马蒙丹莫奈美术馆 (Musée Marmottan Monet)',
    medium: '布面油画 (Oil on Canvas)',
    dimensions: '48 cm × 63 cm',
    parodyImageUrl: '/images/parodies/日出奶龙印象港.png',
    originalImageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/500px-Monet_-_Impression%2C_Sunrise.jpg',
    compositionType: '辽阔水平水天一色 + 垂直橙红日出倒影',
    compositionDescription: '画面被清晨勒阿弗尔港口的迷雾所笼罩，一轮通红的旭日破晓而出，橙红色的光芒在波光粼粼的水面拉出一条颤动的倒影，几艘小舟剪影隐现于雾气中。',
    techniqueAnalysis: '彻底打破传统学院派细腻晕染，采用快速挥洒的散碎笔触。莫奈不画物体的轮廓，而是直接捕捉光线穿透晨雾在水面上跳跃的“瞬时视觉印象”，印象派因此得名。',
    historicalContext: '在1874年首届落选者沙龙展出，艺术评论家路易·勒鲁瓦嘲讽此画“连糊墙纸都不如，充其量只是个印象”，却反向定义了这场席卷全球的现代艺术革命。',
    parodyCommentary: '晨雾弥漫的港湾里，原本的小舟上坐着划着小小双桨的奶龙，甚至天边那轮圆滚滚的红日也变成了奶龙圆乎乎的笑脸倒映在海面上，波光粼粼间充满着迎接新一天的希望与诗意。',
    colorPalette: [
      { hex: '#ff5e36', name: '勒阿弗尔旭日红 (Sunrise Orange)', role: '破晓视觉焦点' },
      { hex: '#48687a', name: '晨雾水波蓝灰 (Harbor Fog Blue)', role: '大气与水面背景' },
      { hex: '#f7d358', name: '波光倒影金色 (Reflective Gold)', role: '水波颤动光痕' },
      { hex: '#212a31', name: '晨舟剪影黛黑 (Silhouette Dark)', role: '前景空间基点' }
    ],
    audioGuideScript: '闭上眼睛，感受海风与晨光拂过脸颊。莫奈告诉我们，光是有温度与颜色的。《日出·印象奶龙港》用柔美的散碎笔触，将经典印象派的光影魔术与治愈系萌感融为一体，宣告了每一个清晨的奇迹。',
    tags: ['印象派', '莫奈', '勒阿弗尔港', '光与色', '印象主义诞生'],
    views: 31200
  }
];
