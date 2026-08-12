import React from 'react';
import { BRAND_CONFIG } from '../config/brand';
import { BrandLogo } from './BrandLogo';

interface BrandPartnershipBarProps {
  variant?: 'compact' | 'banner' | 'card' | 'hero-strip';
  showSubtext?: boolean;
  className?: string;
  isRtl?: boolean;
}

export const BrandPartnershipBar: React.FC<BrandPartnershipBarProps> = ({
  variant = 'banner',
  showSubtext = true,
  className = '',
  isRtl = true,
}) => {
  // Clean SVG emblem for Shakti Pumps
  const ShaktiLogoSVG = (
    <div className="flex items-center gap-2 bg-gradient-to-r from-amber-950/80 via-slate-900 to-amber-900/90 px-3.5 py-1.5 rounded-xl border border-amber-500/40 shadow-sm text-white select-none">
      <svg
        width="24"
        height="24"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0"
      >
        <circle cx="50" cy="50" r="46" fill="#071A2B" stroke="#F59E0B" strokeWidth="4" />
        <path d="M25 50 L50 25 L75 50 L50 75 Z" fill="#F59E0B" />
        <path d="M50 35 L65 50 L50 65 L35 50 Z" fill="#FFFFFF" />
        <circle cx="50" cy="50" r="6" fill="#0B2E59" />
      </svg>
      <div className="flex flex-col text-left">
        <span className="font-black tracking-wider text-amber-400 text-xs sm:text-sm font-sans uppercase">
          SHAKTI
        </span>
        <span className="text-[9px] font-extrabold text-slate-200 tracking-widest uppercase">
          PUMPS
        </span>
      </div>
    </div>
  );

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-xl text-xs text-white ${className}`}>
        <span className="font-black text-sky-400">{BRAND_CONFIG.nameEn}</span>
        <span className="text-slate-500 font-bold font-mono">×</span>
        <span className="font-black text-amber-400">SHAKTI PUMPS</span>
      </div>
    );
  }

  if (variant === 'hero-strip') {
    return (
      <div className={`w-full bg-gradient-to-r from-[#071A2B] via-[#0B2E59] to-[#071A2B] text-white py-4 px-6 rounded-3xl border border-blue-900/80 shadow-2xl overflow-hidden relative ${className}`}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center md:justify-start">
            <BrandLogo size="sm" showArabicSubtext={false} />
            <div className="text-xl font-black text-slate-400 px-1 font-mono">×</div>
            {ShaktiLogoSVG}
          </div>

          <div className="text-center md:text-right space-y-0.5">
            <div className="text-sm font-extrabold text-sky-300">
              {isRtl
                ? 'حلول طاقة شمسية وضخ للمشروعات الزراعية والمياه'
                : 'Solar Energy & Pumping Solutions for Agricultural & Water Projects'}
            </div>
            <div className="text-xs text-slate-300 font-medium">
              {isRtl
                ? 'منتجات وحلول ضخ مختارة من Shakti Pumps — تقديم ودعم هندسي محلي من BIN RAMADAN Ai'
                : 'Selected Shakti Pumps products & technical solutions — Presented & supported locally by BIN RAMADAN Ai'}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-gradient-to-br from-[#071A2B] via-[#0B2E59] to-[#08223d] text-white p-5 sm:p-6 rounded-2xl border border-blue-900/70 shadow-lg space-y-3 ${className}`}>
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-900/60 pb-3">
        <div className="flex items-center gap-3">
          <span className="font-black text-sm sm:text-base text-white tracking-wide">
            {BRAND_CONFIG.nameEn}
          </span>
          <span className="text-sky-400 font-black font-mono">×</span>
          <span className="font-black text-sm sm:text-base text-amber-400 tracking-wide">
            SHAKTI PUMPS
          </span>
        </div>

        <span className="bg-sky-950/90 text-sky-300 border border-sky-800/60 text-[11px] font-bold px-3 py-1 rounded-full">
          {isRtl ? 'حلول تقنية ومنتجات' : 'Technology & Product Solutions'}
        </span>
      </div>

      {showSubtext && (
        <p className="text-xs text-slate-300 leading-relaxed">
          {isRtl
            ? 'نوفر حلول ضخ بالطاقة الشمسية ومعدات مختارة من مجموعة منتجات Shakti Pumps، مع تقديم الدعم الفني والاستشارات والحلول المناسبة لاحتياجات المشروعات الزراعية والمياه.'
            : 'We offer selected solar pumping solutions and equipment from the Shakti Pumps product range, providing engineering support, site consultations, and customized solutions for agricultural water projects.'}
        </p>
      )}
    </div>
  );
};
