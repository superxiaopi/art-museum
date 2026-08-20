import React from 'react';

/**
 * Classical Gilded Crimson Rose & Golden Briar Thorns Perimeter Frame
 * (四周高密度繁复交织金色荆棘与有机随机分布金线红玫瑰框架)
 *
 * Enhancements based on user feedback:
 * 1. 藤蔓更密集 (Dense, richly intertwined golden briars with multiple cross-weaving trunks,
 *    curling spiraling tendrils, dense sharp golden thorns, and layered gold-veined olive foliage).
 * 2. 玫瑰分布更随机 (Organic, asymmetrical, randomized distribution of roses: variable clusters,
 *    isolated blooms, twin buds, varied sizes from 0.6x to 1.45x, dynamic rotations and depths).
 */

export const GoldenThornsFrame: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden select-none">
      {/* Global SVG Definitions for Gilded Roses, Golden Thorns, and Golden-Veined Foliage */}
      <svg className="absolute w-0 h-0" aria-hidden="true" focusable="false">
        <defs>
          {/* 1. Rose Petal Crimson Velvet Gradients */}
          <radialGradient id="rose-petal-dark" cx="45%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#bf1525" />
            <stop offset="60%" stopColor="#870a16" />
            <stop offset="100%" stopColor="#400208" />
          </radialGradient>

          <radialGradient id="rose-petal-bright" cx="38%" cy="32%" r="68%">
            <stop offset="0%" stopColor="#ff4d5a" />
            <stop offset="35%" stopColor="#d61a2b" />
            <stop offset="85%" stopColor="#8f0c18" />
            <stop offset="100%" stopColor="#4a040d" />
          </radialGradient>

          <radialGradient id="rose-petal-mid" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#e62638" />
            <stop offset="55%" stopColor="#ad1120" />
            <stop offset="100%" stopColor="#5c050f" />
          </radialGradient>

          <radialGradient id="rose-petal-deep-wine" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#9e0c1b" />
            <stop offset="60%" stopColor="#63040e" />
            <stop offset="100%" stopColor="#2e0106" />
          </radialGradient>

          {/* 2. Pure Gilded Wire / Gold Leaf Trim Gradient */}
          <linearGradient id="gold-wire-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff8d4" />
            <stop offset="25%" stopColor="#ffd257" />
            <stop offset="60%" stopColor="#d9a429" />
            <stop offset="85%" stopColor="#966e13" />
            <stop offset="100%" stopColor="#fadc6b" />
          </linearGradient>

          {/* 3. Golden Vine 3D Cylindrical Gradient */}
          <linearGradient id="gold-vine-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2e1d03" />
            <stop offset="18%" stopColor="#7a5412" />
            <stop offset="48%" stopColor="#fff4bd" />
            <stop offset="65%" stopColor="#dca82b" />
            <stop offset="85%" stopColor="#7a530f" />
            <stop offset="100%" stopColor="#241402" />
          </linearGradient>

          {/* 4. Fine Golden Tendril Gradient */}
          <linearGradient id="gold-tendril-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffe999" />
            <stop offset="50%" stopColor="#cca127" />
            <stop offset="100%" stopColor="#694b0d" />
          </linearGradient>

          {/* 5. Olive Green Leaf Base & Gold Veins */}
          <linearGradient id="leaf-green-base" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#455b2d" />
            <stop offset="50%" stopColor="#2e3e1d" />
            <stop offset="100%" stopColor="#141f0b" />
          </linearGradient>

          <linearGradient id="leaf-gold-vein" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fff6bd" />
            <stop offset="50%" stopColor="#dbb035" />
            <stop offset="100%" stopColor="#8a6715" />
          </linearGradient>

          {/* 6. Sharp Golden Thorn Gradient */}
          <linearGradient id="gold-thorn-point" x1="0%" y1="0%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#fffce6" />
            <stop offset="35%" stopColor="#e3b53c" />
            <stop offset="80%" stopColor="#73500d" />
            <stop offset="100%" stopColor="#2b1a03" />
          </linearGradient>

          {/* 7. Drop Shadow Filter for Antique Botanical Depth */}
          <filter id="botanical-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="2" dy="4" stdDeviation="3.5" floodColor="#000000" floodOpacity="0.88" />
            <feDropShadow dx="0.5" dy="1" stdDeviation="1.2" floodColor="#ffd966" floodOpacity="0.2" />
          </filter>

          {/* ========================================================= */}
          {/* SYMBOL A: Fully Bloomed Gilded Crimson Rose (重瓣盛开金线红玫瑰) */}
          {/* ========================================================= */}
          <g id="gilded-crimson-rose-full">
            <path
              d="M-42,-22 C-55,-10 -58,15 -46,32 C-34,48 -10,56 12,54 C35,52 52,38 56,18 C60,-5 48,-28 32,-38 C14,-48 -12,-48 -28,-38 C-36,-32 -40,-26 -42,-22 Z"
              fill="url(#rose-petal-dark)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            <path
              d="M-40,0 C-48,-16 -34,-36 -14,-42 C2,-46 25,-42 38,-30 C22,-24 8,-28 -8,-22 C-24,-16 -34,-6 -40,0 Z"
              fill="url(#rose-petal-mid)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="2"
            />
            <path
              d="M38,-30 C52,-18 56,8 48,26 C40,42 22,50 2,52 C18,44 32,32 36,16 C40,-2 32,-18 38,-30 Z"
              fill="url(#rose-petal-dark)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="2"
            />
            <path
              d="M2,52 C-18,54 -40,42 -46,24 C-50,8 -44,-8 -36,-18 C-38,-2 -34,14 -22,26 C-12,36 -2,44 2,52 Z"
              fill="url(#rose-petal-bright)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="2"
            />
            <path
              d="M-28,-22 C-20,-34 2,-36 18,-30 C30,-24 38,-10 34,6 C28,24 10,34 -8,32 C-22,30 -32,18 -32,2 C-32,-8 -30,-16 -28,-22 Z"
              fill="url(#rose-petal-mid)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="2.2"
            />
            <path
              d="M-26,-10 C-18,-24 0,-28 14,-22 C24,-16 28,-4 22,10 C14,24 -2,28 -14,24 C-24,18 -28,4 -26,-10 Z"
              fill="url(#rose-petal-bright)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="2"
            />
            <path
              d="M-14,-14 C-4,-22 10,-20 18,-12 C24,-4 20,10 10,16 C-2,20 -14,14 -16,4 C-18,-6 -14,-10 -14,-14 Z"
              fill="url(#rose-petal-dark)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="2"
            />
            <path
              d="M-8,-8 C0,-14 10,-12 14,-6 C18,2 12,10 4,12 C-4,14 -10,8 -10,0 C-10,-4 -8,-6 -8,-8 Z"
              fill="url(#rose-petal-bright)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="1.8"
            />
            <path
              d="M-4,-4 C2,-8 8,-4 6,2 C4,6 -2,6 -4,2 Z"
              fill="#ff4d5a"
              stroke="url(#gold-wire-grad)"
              strokeWidth="1.8"
            />
            <circle cx="-1" cy="0" r="1.5" fill="#fff5cc" />
            <circle cx="3" cy="-2" r="1.2" fill="#ffd257" />
          </g>

          {/* ========================================================= */}
          {/* SYMBOL B: Side-Angle Gilded Crimson Rose (侧向半开金线红玫瑰) */}
          {/* ========================================================= */}
          <g id="gilded-crimson-rose-side">
            <path
              d="M-6,22 C-14,28 -22,34 -30,40 C-18,34 -8,30 0,32 C8,30 18,34 30,40 C22,34 14,28 6,22 Z"
              fill="url(#leaf-green-base)"
              stroke="url(#leaf-gold-vein)"
              strokeWidth="1.5"
            />
            <path
              d="M-10,24 C-18,38 -20,48 -18,54 C-14,44 -8,34 -4,28"
              fill="none"
              stroke="url(#leaf-gold-vein)"
              strokeWidth="1.6"
            />
            <path
              d="M10,24 C18,38 20,48 18,54 C14,44 8,34 4,28"
              fill="none"
              stroke="url(#leaf-gold-vein)"
              strokeWidth="1.6"
            />
            <path
              d="M-28,16 C-38,2 -36,-16 -24,-28 C-12,-38 12,-38 24,-28 C36,-16 38,2 28,16 C16,28 -16,28 -28,16 Z"
              fill="url(#rose-petal-dark)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="2.2"
            />
            <path
              d="M-28,12 C-38,-4 -28,-22 -14,-28 C-20,-14 -18,4 -10,18 C-18,18 -24,16 -28,12 Z"
              fill="url(#rose-petal-mid)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="2"
            />
            <path
              d="M28,12 C38,-4 28,-22 14,-28 C20,-14 18,4 10,18 C18,18 24,16 28,12 Z"
              fill="url(#rose-petal-mid)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="2"
            />
            <path
              d="M-16,8 C-22,-6 -14,-22 0,-24 C14,-22 22,-6 16,8 C10,18 -10,18 -16,8 Z"
              fill="url(#rose-petal-bright)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="2"
            />
            <path
              d="M-10,0 C-14,-8 -8,-18 0,-18 C8,-18 14,-8 10,0 C6,8 -6,8 -10,0 Z"
              fill="url(#rose-petal-mid)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="1.8"
            />
            <path d="M-14,-22 Q0,-28 14,-22" stroke="url(#gold-wire-grad)" strokeWidth="2.4" fill="none" />
            <path d="M-8,-16 Q0,-20 8,-16" stroke="url(#gold-wire-grad)" strokeWidth="2" fill="none" />
          </g>

          {/* ========================================================= */}
          {/* SYMBOL C: Deep Velvet Wine Compact Rose (浓彩暗红紧凑玫瑰) */}
          {/* ========================================================= */}
          <g id="gilded-crimson-rose-compact">
            <path
              d="M-22,-12 C-30,-4 -30,12 -22,22 C-14,30 2,32 14,26 C26,20 30,6 26,-8 C22,-20 6,-24 -6,-22 C-14,-20 -18,-16 -22,-12 Z"
              fill="url(#rose-petal-deep-wine)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="1.8"
            />
            <path
              d="M-16,4 C-20,-6 -12,-16 0,-18 C12,-18 18,-8 14,4 C10,14 -4,16 -12,12 Z"
              fill="url(#rose-petal-dark)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="1.8"
            />
            <path
              d="M-8,-2 C-4,-10 6,-10 10,-4 C12,2 8,8 2,8 C-4,8 -8,4 -8,-2 Z"
              fill="url(#rose-petal-bright)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="1.5"
            />
            <circle cx="2" cy="0" r="1.2" fill="#fff5cc" />
          </g>

          {/* ========================================================= */}
          {/* SYMBOL D: Gilded Crimson Rosebud (含苞金萼红花蕾) */}
          {/* ========================================================= */}
          <g id="gilded-crimson-rose-bud">
            <path
              d="M0,-24 C-12,-12 -14,6 -8,18 C-4,24 4,24 8,18 C14,6 12,-12 0,-24 Z"
              fill="url(#rose-petal-bright)"
              stroke="url(#gold-wire-grad)"
              strokeWidth="2"
            />
            <path d="M-4,-14 C-1, -6 3,-4 6,10" fill="none" stroke="url(#gold-wire-grad)" strokeWidth="1.6" />
            <path
              d="M-10,18 C-16,8 -16,-6 -6,-18 C-10,0 -8,12 -2,22 Z"
              fill="url(#leaf-green-base)"
              stroke="url(#leaf-gold-vein)"
              strokeWidth="1.6"
            />
            <path
              d="M10,18 C16,8 16,-6 6,-18 C10,0 8,12 2,22 Z"
              fill="url(#leaf-green-base)"
              stroke="url(#leaf-gold-vein)"
              strokeWidth="1.6"
            />
            <path d="M0,20 L0,32" stroke="url(#gold-vine-grad)" strokeWidth="3" strokeLinecap="round" />
          </g>

          {/* ========================================================= */}
          {/* SYMBOL E: Golden-Veined Olive Leaves Trio (金线叶脉三叶组) */}
          {/* ========================================================= */}
          <g id="gilded-leaves-trio">
            <g transform="translate(0, -10) rotate(-15)">
              <path
                d="M0,0 C-18,-18 -18,-42 0,-60 C18,-42 18,-18 0,0 Z"
                fill="url(#leaf-green-base)"
                stroke="url(#leaf-gold-vein)"
                strokeWidth="1.8"
              />
              <path d="M0,0 L0,-56" stroke="url(#leaf-gold-vein)" strokeWidth="1.6" />
              <path d="M0,-14 L-9,-24 M0,-14 L9,-24" stroke="url(#leaf-gold-vein)" strokeWidth="1.2" />
              <path d="M0,-28 L-12,-38 M0,-28 L12,-38" stroke="url(#leaf-gold-vein)" strokeWidth="1.2" />
              <path d="M0,-42 L-9,-50 M0,-42 L9,-50" stroke="url(#leaf-gold-vein)" strokeWidth="1.1" />
            </g>
            <g transform="translate(-14, 5) rotate(-65)">
              <path
                d="M0,0 C-14,-14 -14,-34 0,-48 C14,-34 14,-14 0,0 Z"
                fill="url(#leaf-green-base)"
                stroke="url(#leaf-gold-vein)"
                strokeWidth="1.6"
              />
              <path d="M0,0 L0,-44" stroke="url(#leaf-gold-vein)" strokeWidth="1.4" />
              <path d="M0,-12 L-8,-20 M0,-12 L8,-20" stroke="url(#leaf-gold-vein)" strokeWidth="1" />
              <path d="M0,-24 L-9,-32 M0,-24 L9,-32" stroke="url(#leaf-gold-vein)" strokeWidth="1" />
            </g>
            <g transform="translate(14, 5) rotate(45)">
              <path
                d="M0,0 C-14,-14 -14,-34 0,-48 C14,-34 14,-14 0,0 Z"
                fill="url(#leaf-green-base)"
                stroke="url(#leaf-gold-vein)"
                strokeWidth="1.6"
              />
              <path d="M0,0 L0,-44" stroke="url(#leaf-gold-vein)" strokeWidth="1.4" />
              <path d="M0,-12 L-8,-20 M0,-12 L8,-20" stroke="url(#leaf-gold-vein)" strokeWidth="1" />
              <path d="M0,-24 L-9,-32 M0,-24 L9,-32" stroke="url(#leaf-gold-vein)" strokeWidth="1" />
            </g>
          </g>

          {/* ========================================================= */}
          {/* SYMBOL F: Golden Single Leaf (单片金线叶) */}
          {/* ========================================================= */}
          <g id="gilded-leaf-single">
            <path
              d="M0,0 C-12,-12 -12,-30 0,-42 C12,-30 12,-12 0,0 Z"
              fill="url(#leaf-green-base)"
              stroke="url(#leaf-gold-vein)"
              strokeWidth="1.4"
            />
            <path d="M0,0 L0,-38" stroke="url(#leaf-gold-vein)" strokeWidth="1.2" />
            <path d="M0,-10 L-6,-18 M0,-10 L6,-18" stroke="url(#leaf-gold-vein)" strokeWidth="0.9" />
            <path d="M0,-20 L-7,-28 M0,-20 L7,-28" stroke="url(#leaf-gold-vein)" strokeWidth="0.9" />
          </g>

          {/* ========================================================= */}
          {/* SYMBOL G: Fine Curved Golden Thorn Spike (金色锐利钩刺) */}
          {/* ========================================================= */}
          <g id="gilded-thorn-spike">
            <path
              d="M0,0 C4,-8 14,-16 26,-18 C14,-12 8,-2 0,10 Z"
              fill="url(#gold-thorn-point)"
              stroke="#fff2ba"
              strokeWidth="0.8"
            />
          </g>
        </defs>
      </svg>

      {/* ========================================================================= */}
      {/* 1. LEFT BORDER: Dense Climbing Entwined Golden Briars & Organic Roses (纵向左侧) */}
      {/* ========================================================================= */}
      <div className="absolute top-0 bottom-0 left-0 w-[100px] sm:w-[135px] md:w-[170px] pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 170 1080"
          preserveAspectRatio="none"
          fill="none"
        >
          <g filter="url(#botanical-shadow)">
            {/* Left Spine 1: Main undulating trunk */}
            <path
              d="M35,-30 C105,160 15,360 85,560 C155,760 20,950 45,1110"
              stroke="url(#gold-vine-grad)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M35,-30 C105,160 15,360 85,560 C155,760 20,950 45,1110"
              stroke="#fff6cf"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Left Spine 2: Interlacing counter trunk */}
            <path
              d="M95,-20 C25,150 100,340 30,540 C-20,740 105,930 35,1100"
              stroke="url(#gold-vine-grad)"
              strokeWidth="7.5"
              strokeLinecap="round"
            />
            <path
              d="M95,-20 C25,150 100,340 30,540 C-20,740 105,930 35,1100"
              stroke="#fff6cf"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Left Spine 3: Fine tertiary climbing vine */}
            <path
              d="M10,-10 C70,180 120,380 40,580 C110,780 60,980 105,1100"
              stroke="url(#gold-vine-grad)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Left Inward Curling Tendrils */}
            <path d="M70,240 C125,270 135,325 105,365 C85,390 55,370 65,345" stroke="url(#gold-tendril-grad)" strokeWidth="3" strokeLinecap="round" />
            <path d="M80,480 C130,510 140,560 110,600" stroke="url(#gold-tendril-grad)" strokeWidth="3" strokeLinecap="round" />
            <path d="M75,720 C130,750 140,805 100,845 C80,870 50,850 60,825" stroke="url(#gold-tendril-grad)" strokeWidth="3" strokeLinecap="round" />

            {/* Left Thorns */}
            <use href="#gilded-thorn-spike" x="65" y="90" transform="rotate(35 65 90) scale(1.3)" />
            <use href="#gilded-thorn-spike" x="30" y="190" transform="rotate(-115 30 190) scale(1.2)" />
            <use href="#gilded-thorn-spike" x="90" y="290" transform="rotate(45 90 290) scale(1.3)" />
            <use href="#gilded-thorn-spike" x="40" y="410" transform="rotate(-105 40 410) scale(1.2)" />
            <use href="#gilded-thorn-spike" x="80" y="520" transform="rotate(40 80 520) scale(1.3)" />
            <use href="#gilded-thorn-spike" x="35" y="650" transform="rotate(-120 35 650) scale(1.2)" />
            <use href="#gilded-thorn-spike" x="85" y="770" transform="rotate(50 85 770) scale(1.3)" />
            <use href="#gilded-thorn-spike" x="35" y="890" transform="rotate(-100 35 890) scale(1.2)" />
            <use href="#gilded-thorn-spike" x="70" y="1010" transform="rotate(45 70 1010) scale(1.3)" />

            {/* Left Foliage */}
            <use href="#gilded-leaves-trio" x="55" y="140" transform="rotate(50 55 140) scale(0.85)" />
            <use href="#gilded-leaf-single" x="75" y="320" transform="rotate(-30 75 320) scale(1)" />
            <use href="#gilded-leaves-trio" x="45" y="450" transform="rotate(-45 45 450) scale(0.85)" />
            <use href="#gilded-leaf-single" x="80" y="630" transform="rotate(60 80 630) scale(1)" />
            <use href="#gilded-leaves-trio" x="70" y="730" transform="rotate(55 70 730) scale(0.85)" />
            <use href="#gilded-leaf-single" x="50" y="940" transform="rotate(-40 50 940) scale(1)" />

            {/* Left Organic Roses (Variable sizes, random heights) */}
            <use href="#gilded-crimson-rose-side" x="55" y="215" transform="rotate(38 55 215) scale(1.1)" />
            <use href="#gilded-crimson-rose-bud" x="105" y="360" transform="rotate(88 105 360) scale(0.9)" />
            <use href="#gilded-crimson-rose-compact" x="65" y="490" transform="rotate(-25 65 490) scale(1.25)" />
            <use href="#gilded-crimson-rose-full" x="50" y="670" transform="rotate(12 50 670) scale(1.2)" />
            <use href="#gilded-crimson-rose-bud" x="100" y="840" transform="rotate(78 100 840) scale(0.95)" />
            <use href="#gilded-crimson-rose-side" x="60" y="930" transform="rotate(-30 60 930) scale(1.15)" />
          </g>
        </svg>
      </div>

      {/* ========================================================================= */}
      {/* 2. RIGHT BORDER: Dense Climbing Entwined Golden Briars & Organic Roses (纵向右侧) */}
      {/* ========================================================================= */}
      <div className="absolute top-0 bottom-0 right-0 w-[100px] sm:w-[135px] md:w-[170px] pointer-events-none">
        <svg
          className="w-full h-full"
          viewBox="0 0 170 1080"
          preserveAspectRatio="none"
          fill="none"
        >
          <g filter="url(#botanical-shadow)">
            {/* Right Spine 1: Main undulating trunk */}
            <path
              d="M135,-30 C65,160 155,360 85,560 C15,760 150,950 125,1110"
              stroke="url(#gold-vine-grad)"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M135,-30 C65,160 155,360 85,560 C15,760 150,950 125,1110"
              stroke="#fff6cf"
              strokeWidth="2.8"
              strokeLinecap="round"
              opacity="0.9"
            />

            {/* Right Spine 2: Interlacing counter trunk */}
            <path
              d="M75,-20 C145,150 70,340 140,540 C190,740 65,930 135,1100"
              stroke="url(#gold-vine-grad)"
              strokeWidth="7.5"
              strokeLinecap="round"
            />
            <path
              d="M75,-20 C145,150 70,340 140,540 C190,740 65,930 135,1100"
              stroke="#fff6cf"
              strokeWidth="1.8"
              strokeLinecap="round"
              opacity="0.8"
            />

            {/* Right Spine 3: Fine tertiary climbing vine */}
            <path
              d="M160,-10 C100,180 50,380 130,580 C60,780 110,980 65,1100"
              stroke="url(#gold-vine-grad)"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Right Inward Curling Tendrils */}
            <path d="M100,240 C45,270 35,325 65,365 C85,390 115,370 105,345" stroke="url(#gold-tendril-grad)" strokeWidth="3" strokeLinecap="round" />
            <path d="M90,480 C40,510 30,560 60,600" stroke="url(#gold-tendril-grad)" strokeWidth="3" strokeLinecap="round" />
            <path d="M95,720 C40,750 30,805 70,845 C90,870 120,850 110,825" stroke="url(#gold-tendril-grad)" strokeWidth="3" strokeLinecap="round" />

            {/* Right Thorns */}
            <use href="#gilded-thorn-spike" x="105" y="90" transform="rotate(-145 105 90) scale(1.3)" />
            <use href="#gilded-thorn-spike" x="140" y="190" transform="rotate(65 140 190) scale(1.2)" />
            <use href="#gilded-thorn-spike" x="80" y="290" transform="rotate(-135 80 290) scale(1.3)" />
            <use href="#gilded-thorn-spike" x="130" y="410" transform="rotate(75 130 410) scale(1.2)" />
            <use href="#gilded-thorn-spike" x="90" y="520" transform="rotate(-140 90 520) scale(1.3)" />
            <use href="#gilded-thorn-spike" x="135" y="650" transform="rotate(60 135 650) scale(1.2)" />
            <use href="#gilded-thorn-spike" x="85" y="770" transform="rotate(-130 85 770) scale(1.3)" />
            <use href="#gilded-thorn-spike" x="135" y="890" transform="rotate(80 135 890) scale(1.2)" />
            <use href="#gilded-thorn-spike" x="100" y="1010" transform="rotate(-135 100 1010) scale(1.3)" />

            {/* Right Foliage */}
            <use href="#gilded-leaves-trio" x="115" y="140" transform="rotate(-50 115 140) scale(0.85)" />
            <use href="#gilded-leaf-single" x="95" y="320" transform="rotate(30 95 320) scale(1)" />
            <use href="#gilded-leaves-trio" x="125" y="450" transform="rotate(45 125 450) scale(0.85)" />
            <use href="#gilded-leaf-single" x="90" y="630" transform="rotate(-60 90 630) scale(1)" />
            <use href="#gilded-leaves-trio" x="100" y="730" transform="rotate(-55 100 730) scale(0.85)" />
            <use href="#gilded-leaf-single" x="120" y="940" transform="rotate(40 120 940) scale(1)" />

            {/* Right Organic Roses (Variable sizes, random heights) */}
            <use href="#gilded-crimson-rose-side" x="115" y="215" transform="rotate(-38 115 215) scale(1.1)" />
            <use href="#gilded-crimson-rose-bud" x="65" y="360" transform="rotate(-88 65 360) scale(0.9)" />
            <use href="#gilded-crimson-rose-full" x="120" y="520" transform="rotate(-15 120 520) scale(1.25)" />
            <use href="#gilded-crimson-rose-compact" x="105" y="710" transform="rotate(28 105 710) scale(1.2)" />
            <use href="#gilded-crimson-rose-bud" x="70" y="840" transform="rotate(-78 70 840) scale(0.95)" />
            <use href="#gilded-crimson-rose-side" x="110" y="940" transform="rotate(32 110 940) scale(1.15)" />
          </g>
        </svg>
      </div>
    </div>
  );
};
