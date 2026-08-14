import React from 'react';
import { Language, Product } from '../types';
import { getTranslation } from '../data/translations';
import { BRAND_CONFIG } from '../config/brand';
import { SafeImage } from '../components/SafeImage';
import {
  Sun,
  Droplets,
  Zap,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Calculator,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Phone,
  MessageSquare,
  Building2,
  Award,
} from 'lucide-react';

interface ShaktiSolutionsPageProps {
  currentLang: Language;
  products: Product[];
  onNavigate: (page: string) => void;
  onSelectProductForQuote?: (productName: string) => void;
}

export const ShaktiSolutionsPage: React.FC<ShaktiSolutionsPageProps> = ({
  currentLang,
  products,
  onNavigate,
  onSelectProductForQuote,
}) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const shaktiProducts = products.filter(
    (p) =>
      p.brandManufacturerEn?.toLowerCase().includes('shakti') ||
      p.nameEn.toLowerCase().includes('shakti') ||
      p.category.includes('Solar')
  );

  return (
    <div className="space-y-12 pb-16">
      {/* PAGE HERO HEADER */}
      <section className="bg-gradient-to-br from-[#071A2B] via-[#0B2E59] to-[#071A2B] text-white pt-10 pb-16 border-b border-amber-500/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          {/* Partnership Badge */}
          <div className="flex items-center gap-3 bg-amber-950/80 border border-amber-500/50 px-4 py-2 rounded-full w-fit">
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
            <span className="text-xs font-black text-amber-400 tracking-wider uppercase font-sans">
              SHAKTI PUMPS OFFICIAL SOLUTIONS
            </span>
          </div>

          <div className="space-y-3 max-w-4xl">
            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              {isRtl
                ? 'حلول ضخ المياه والطاقة الشمسية من Shakti Pumps'
                : 'Shakti Solar & Water Solutions'}
            </h1>

            <div className="text-lg sm:text-2xl font-bold text-sky-400 font-sans">
              Powered by Ibn Ramadan Business OS
            </div>

            <p className="text-sm sm:text-base text-slate-200 leading-relaxed pt-2">
              {isRtl
                ? 'حلول متكاملة لضخ المياه بالطاقة الشمسية والتطبيقات الزراعية والصناعية، مدعومة بتقنيات Shakti Pumps، وتقديم الدراسات الفنية والاستشارات الميدانية بواسطة مهندسي بن رمضان Business OS.'
                : 'Integrated solar water pumping solutions for agricultural and industrial applications, powered by Shakti Pumps technology, with local engineering & site assessments by Ibn Ramadan Business OS.'}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('request-quote')}
              className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-3.5 px-8 rounded-xl text-xs sm:text-sm shadow-xl flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>{isRtl ? 'طلب حل هندسي (Request a Solution)' : 'Request a Solution'}</span>
            </button>

            <button
              onClick={() => onNavigate('tech-consultation')}
              className="bg-[#0B2E59] hover:bg-blue-900 text-sky-300 border border-sky-400/50 font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm flex items-center gap-2"
            >
              <Calculator className="w-4 h-4 text-sky-400" />
              <span>{isRtl ? 'استشارة ودراسة موقع' : 'Site Assessment & Consultation'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* CORE SOLUTION PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
          <span className="bg-sky-100 text-sky-800 text-xs font-extrabold px-3.5 py-1 rounded-full uppercase tracking-wider">
            {isRtl ? 'الحلول والأنظمة المتاحة' : 'Shakti Solutions Portfolio'}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
            {isRtl ? 'أنظمة الري والضخ الشمسي المتكاملة' : 'Solar Water Pumping & Irrigation Systems'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Submersible Solar Pumps */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 bg-amber-100 text-amber-800 rounded-xl flex items-center justify-center font-bold">
              <Droplets className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              {isRtl ? 'طلمبات ضخ شمسية غاطسة (DC/AC Submersible)' : 'Submersible Solar Pumps'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isRtl
                ? 'طلمبات غاطسة مصممة للآبار العميقة والسطحية بتصميم هيدروليكي عالي الكفاءة يضمن أقصى تدفق للمياه باستخدام أسطح الألواح الشمسية.'
                : 'Submersible solar pumps designed for deep water wells with high hydraulic efficiency ensuring max water output.'}
            </p>
            <ul className="text-xs text-slate-700 space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isRtl ? 'تصميم ستانلس ستيل مقاوم للتآكل' : 'Corrosion-resistant stainless steel'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isRtl ? 'أعماق رفع تصل لمئات الأمتار' : 'High duty head for deep wells'}</span>
              </li>
            </ul>
          </div>

          {/* Pillar 2: Surface & Centrifugal Pumps */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 bg-sky-100 text-sky-800 rounded-xl flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              {isRtl ? 'طلمبات سطحية وطرد مركزي (Surface Pumps)' : 'Surface & Centrifugal Pumps'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isRtl
                ? 'طلمبات سطحية لنقل المياه والري بالتنقيط والرش من الترع والمجاري المائية والخزانات مباشرة.'
                : 'Surface pumps for open water transport, drip irrigation, and canal water boosting.'}
            </p>
            <ul className="text-xs text-slate-700 space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isRtl ? 'ضغوط تشغيل منتظمة للري الذكي' : 'Stable pressures for smart drip systems'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isRtl ? 'متوافقة مع محولات VFD الشمسية' : 'Compatible with solar VFD drives'}</span>
              </li>
            </ul>
          </div>

          {/* Pillar 3: Agricultural Irrigation Solutions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-xl flex items-center justify-center font-bold">
              <Sun className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-black text-slate-900">
              {isRtl ? 'أنظمة الري الزراعي واستصلاح الأراضي' : 'Agricultural Irrigation Solutions'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isRtl
                ? 'حلول متكاملة لربط محطات الطاقة الشمسية بمحركات الضخ في مزارع وادي النطرون، مدينة السادات، ومدينة بدر.'
                : 'Complete solar pump integration for reclamation farms in Wadi El Natrun, Sadat, and Badr City.'}
            </p>
            <ul className="text-xs text-slate-700 space-y-2 font-medium">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isRtl ? 'توفير التكاليف التشغيلية ومولدات الديزل' : 'Zero fuel & diesel operating cost'}</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{isRtl ? 'دعم واستشارات فنية من بن رمضان OS' : 'Full engineering support by Ibn Ramadan'}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SHAKTI PRODUCTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <span className="text-amber-800 font-bold text-xs uppercase tracking-wider bg-amber-100 px-3 py-1 rounded-full">
              PRODUCT CATALOG
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {isRtl ? 'منتجات ومعدات Shakti Pumps' : 'Shakti Pumps Equipment Showcase'}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('request-quote')}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-4 py-2 rounded-lg text-xs flex items-center gap-2 shadow"
          >
            <span>{isRtl ? 'طلب حل هندسي' : 'Request a Solution'}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shaktiProducts.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-52 bg-slate-100 overflow-hidden">
                  <SafeImage
                    src={p.image}
                    alt={isRtl ? p.nameAr : p.nameEn}
                    category={p.category}
                    showBrandedOverlay={true}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-slate-900/90 text-amber-300 text-[10px] font-bold px-2 py-1 rounded border border-amber-500/40 z-10">
                    {p.brandManufacturerEn || 'Shakti Pumps'}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-[10px] font-black text-sky-800 bg-sky-50 px-2 py-0.5 rounded border border-sky-200 inline-block">
                    Ibn Ramadan Business OS Solution
                  </span>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {isRtl ? p.nameAr : p.nameEn}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {isRtl ? p.shortDescAr : p.shortDescEn}
                  </p>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-xs">
                    {Object.entries(p.specifications).slice(0, 3).map(([k, v], idx) => (
                      <div key={idx} className="flex justify-between text-slate-700">
                        <span className="text-slate-500 font-medium">{k}:</span>
                        <span className="font-bold text-slate-900">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 space-y-2">
                <button
                  onClick={() => {
                    if (onSelectProductForQuote) onSelectProductForQuote(p.nameEn);
                    onNavigate('request-quote');
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black py-2.5 rounded-xl text-xs transition-all shadow text-center"
                >
                  {isRtl ? 'طلب عرض سعر وحل مخصص' : 'Request Solution & Price'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT & INQUIRY CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#071A2B] via-[#0B2E59] to-[#071A2B] rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl border border-amber-500/40">
          <div className="max-w-3xl mx-auto space-y-3">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider inline-block">
              ENGINEERING &amp; FIELD CONSULTATION
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white">
              {isRtl ? 'هل تريد حل ضخ شمسي مطابق لمواصفات بئرك؟' : 'Need a Customized Solar Pumping Solution?'}
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
              {isRtl
                ? 'فريق المهندسين في بن رمضان Business OS يقدم لك مطابقة هيدروليكية كاملة لاختيار أنسب طلمبة من Shakti Pumps حسب الرفع المائي والتصرف المطلوب.'
                : 'Our engineers at Ibn Ramadan Business OS evaluate your well head, flow rate, and solar PV setup to match the ideal Shakti Pump.'}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('request-quote')}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3.5 px-8 rounded-xl text-xs sm:text-sm shadow-xl transition-all"
            >
              {isRtl ? 'طلب حل هندسي (Request a Solution)' : 'Request a Solution'}
            </button>

            <button
              onClick={() => onNavigate('tech-consultation')}
              className="bg-blue-900/80 hover:bg-blue-800 text-sky-300 border border-sky-400/50 font-bold py-3.5 px-8 rounded-xl text-xs sm:text-sm transition-all"
            >
              {isRtl ? 'استشارة ودراسة موقع' : 'Site Assessment & Consultation'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
