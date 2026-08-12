import React from 'react';
import { BRAND_CONFIG } from '../config/brand';

interface BrandLogoProps {
  variant?: 'full' | 'emblem-only' | 'horizontal' | 'footer';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showArabicSubtext?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'full',
  size = 'md',
  className = '',
  showArabicSubtext = true,
}) => {
  const sizeMap = {
    sm: { circle: 36, fontTitle: 'text-sm', fontSub: 'text-[10px]' },
    md: { circle: 48, fontTitle: 'text-lg', fontSub: 'text-xs' },
    lg: { circle: 64, fontTitle: 'text-2xl', fontSub: 'text-sm' },
    xl: { circle: 88, fontTitle: 'text-3xl', fontSub: 'text-base' },
  };

  const currentSize = sizeMap[size];

  // SVG emblem rendering the circular logo with "BIN RAMADAN", intertwined SR monogram + Ai, and "SOLAR ENERGY & WATER PUMPS"
  const EmblemSVG = (
    <svg
      width={currentSize.circle}
      height={currentSize.circle}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 drop-shadow-md"
    >
      <defs>
        {/* Deep Blue & Silver Engineering Gradient */}
        <linearGradient id="emblemOuterBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B2E59" />
          <stop offset="50%" stopColor="#071A2B" />
          <stop offset="100%" stopColor="#0D47A1" />
        </linearGradient>

        <linearGradient id="silverRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="40%" stopColor="#AEB7C2" />
          <stop offset="70%" stopColor="#168BFF" />
          <stop offset="100%" stopColor="#8A99AD" />
        </linearGradient>

        <linearGradient id="aiTechGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#168BFF" />
          <stop offset="100%" stopColor="#60A5FA" />
        </linearGradient>

        {/* Circular curved text paths for emblem SVG */}
        <path id="topTextArc" d="M 25,100 A 75,75 0 1,1 175,100" />
        <path id="bottomTextArc" d="M 175,100 A 75,75 0 0,1 25,100" />
      </defs>

      {/* Outer Protective Rim */}
      <circle cx="100" cy="100" r="98" fill="url(#emblemOuterBg)" stroke="url(#silverRingGradient)" strokeWidth="3" />
      <circle cx="100" cy="100" r="88" fill="none" stroke="#168BFF" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

      {/* Outer Emblem Ring with Circular Text */}
      <circle cx="100" cy="100" r="76" fill="#071A2B" stroke="url(#silverRingGradient)" strokeWidth="1.5" />

      {/* Curved Text - BIN RAMADAN on top */}
      <text fill="#FFFFFF" fontSize="12.5" fontWeight="800" letterSpacing="2">
        <textPath href="#topTextArc" startOffset="50%" textAnchor="middle">
          BIN RAMADAN
        </textPath>
      </text>

      {/* Curved Text - SOLAR ENERGY & WATER PUMPS on bottom */}
      <text fill="#AEB7C2" fontSize="8" fontWeight="700" letterSpacing="1">
        <textPath href="#bottomTextArc" startOffset="50%" textAnchor="middle">
          SOLAR ENERGY &amp; WATER PUMPS
        </textPath>
      </text>

      {/* Inner Monogram Core Circle */}
      <circle cx="100" cy="100" r="54" fill="#0B2E59" stroke="url(#silverRingGradient)" strokeWidth="2" />

      {/* Solar & Water Rays Motif inside Inner Circle */}
      <path d="M 100,50 L 100,58 M 100,142 L 100,150 M 50,100 L 58,100 M 142,100 L 150,100" stroke="#168BFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />

      {/* Stylized Intertwined "SR" Monogram with integrated "Ai" */}
      <g transform="translate(100, 98) scale(0.95)">
        {/* S Letter curve in Silver */}
        <path
          d="M 10,-20 C -15,-20 -15,-2 0,0 C 15,2 15,20 -10,20 C -18,20 -22,15 -22,15"
          fill="none"
          stroke="url(#silverRingGradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />

        {/* R Letter stem & loop intertwined in Royal Blue */}
        <path
          d="M -12,-20 L -12,22 M -12,-20 C 8,-20 8,-4 -12,-4 M -2, -2 L 14, 22"
          fill="none"
          stroke="#168BFF"
          strokeWidth="4.5"
          strokeLinecap="round"
        />

        {/* Integrated "Ai" Pill Badge in center right */}
        <g transform="translate(14, -8)">
          <rect x="-2" y="-10" width="22" height="18" rx="5" fill="#071A2B" stroke="#168BFF" strokeWidth="1.5" />
          <text x="9" y="3" fill="url(#aiTechGlow)" fontSize="10" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            Ai
          </text>
        </g>
      </g>

      {/* Decorative Silver Stars on sides */}
      <circle cx="28" cy="100" r="2.5" fill="#168BFF" />
      <circle cx="172" cy="100" r="2.5" fill="#168BFF" />
    </svg>
  );

  if (variant === 'emblem-only') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{EmblemSVG}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {EmblemSVG}
      {variant !== 'emblem-only' && (
        <div className="flex flex-col text-left rtl:text-right">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`font-black tracking-tight text-white ${currentSize.fontTitle}`}>
              BIN RAMADAN
            </span>
            <span className="bg-gradient-to-r from-blue-500 to-sky-400 text-white text-[10px] font-black px-1.5 py-0.5 rounded shadow-sm border border-blue-400/30">
              Ai
            </span>
          </div>
          <span className={`font-semibold tracking-wider text-slate-300 uppercase ${currentSize.fontSub}`}>
            {BRAND_CONFIG.taglineEn}
          </span>
          {showArabicSubtext && (
            <span className="text-[11px] font-bold text-sky-400 font-sans tracking-normal">
              {BRAND_CONFIG.taglineAr}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
