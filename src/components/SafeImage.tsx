import React, { useState, useEffect } from 'react';
import { Sparkles, Cpu, Sun, Layers, ShieldCheck, Zap } from 'lucide-react';
import { BRAND_CONFIG } from '../config/brand';
import { getCategoryData } from '../utils/productImageUtils';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt: string;
  category?: string;
  fallbackTitleEn?: string;
  fallbackTitleAr?: string;
  className?: string;
  aspectRatio?: 'square' | 'video' | 'portrait' | 'card' | 'auto';
  objectFit?: 'cover' | 'contain';
  showBrandedOverlay?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  category,
  fallbackTitleEn,
  fallbackTitleAr,
  className = '',
  aspectRatio = 'auto',
  objectFit = 'cover',
  showBrandedOverlay = false,
  ...rest
}) => {
  const categoryData = getCategoryData(category);
  const [currentSrc, setCurrentSrc] = useState<string>(src || categoryData.defaultImage);
  const [attemptLevel, setAttemptLevel] = useState<number>(0); // 0: primary src, 1: category default, 2: category secondary, 3: placeholder
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (src && src.trim() !== '' && src !== 'undefined') {
      setCurrentSrc(src);
      setAttemptLevel(0);
    } else {
      setCurrentSrc(categoryData.defaultImage);
      setAttemptLevel(1);
    }
    setIsLoaded(false);
  }, [src, category]);

  const handleError = () => {
    if (attemptLevel === 0) {
      // Primary failed, try category default image
      setCurrentSrc(categoryData.defaultImage);
      setAttemptLevel(1);
    } else if (attemptLevel === 1 && categoryData.secondaryImage) {
      // Category default failed, try category secondary image
      setCurrentSrc(categoryData.secondaryImage);
      setAttemptLevel(2);
    } else {
      // All failed, switch to branded SVG placeholder
      setAttemptLevel(3);
    }
  };

  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[3/4]',
    card: 'aspect-[16/10]',
    auto: '',
  }[aspectRatio];

  const titleAr = fallbackTitleAr || categoryData.fallbackTitleAr;
  const titleEn = fallbackTitleEn || categoryData.fallbackTitleEn;

  // Render Category-Specific Branded Technical Placeholder if image completely fails
  if (attemptLevel === 3 || !currentSrc) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#071A2B] via-[#0B2E59] to-[#08223d] text-white p-5 flex flex-col items-center justify-center text-center select-none rounded-t-2xl border-b border-sky-800/40 shadow-inner w-full h-full min-h-[180px] ${aspectClasses} ${className}`}
        aria-label={alt || titleAr}
      >
        {/* Ambient subtle light glow */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

        {/* Brand emblem watermark */}
        <div className="flex items-center gap-1.5 mb-2 bg-slate-900/90 px-3 py-1 rounded-full border border-sky-800/50 text-[10px] text-sky-300 font-mono font-bold shadow">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{BRAND_CONFIG.nameEn} × SHAKTI</span>
        </div>

        {/* Category Icon */}
        <div className="p-2.5 bg-sky-950/80 rounded-2xl border border-sky-700/40 text-amber-400 mb-2 shadow">
          {category?.includes('Solar') ? (
            <Sun className="w-7 h-7 text-amber-400 animate-pulse" />
          ) : category?.includes('Controller') || category?.includes('Inverter') ? (
            <Cpu className="w-7 h-7 text-sky-400" />
          ) : category?.includes('Cable') || category?.includes('Accessories') ? (
            <Zap className="w-7 h-7 text-amber-300" />
          ) : (
            <Layers className="w-7 h-7 text-sky-400" />
          )}
        </div>

        <div className="space-y-1 max-w-xs px-2">
          <div className="text-xs sm:text-sm font-black text-white leading-tight">
            {titleAr}
          </div>
          <div className="text-[10px] text-sky-200 font-mono tracking-tight">
            {titleEn}
          </div>
        </div>

        <div className="mt-3 text-[9px] text-amber-300 bg-sky-950/80 px-2.5 py-0.5 rounded-md border border-sky-800/60 font-semibold flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-amber-400" />
          <span>مواصفات وتصاميم هندسية معتمدة</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden w-full ${aspectClasses} ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center text-slate-400 text-xs font-mono">
          <span>جاري تحميل الصورة الفنية...</span>
        </div>
      )}
      <img
        src={currentSrc}
        alt={alt || titleAr}
        onLoad={() => setIsLoaded(true)}
        onError={handleError}
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`w-full h-full ${
          objectFit === 'contain' ? 'object-contain p-2 bg-slate-900' : 'object-cover'
        } transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        {...rest}
      />
      {showBrandedOverlay && isLoaded && (
        <div className="absolute bottom-2 right-2 rtl:right-auto rtl:left-2 bg-slate-950/80 backdrop-blur-md px-2 py-0.5 rounded-md border border-slate-700 text-[9px] font-mono font-bold text-sky-300 flex items-center gap-1 shadow">
          <span>BIN RAMADAN Ai × SHAKTI</span>
        </div>
      )}
    </div>
  );
};
