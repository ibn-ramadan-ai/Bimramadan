import React from 'react';
import { Language, Product, ProjectItem } from '../types';
import { getTranslation } from '../data/translations';
import { BRAND_CONFIG } from '../config/brand';
import { PumpSizingCalculator } from '../components/PumpSizingCalculator';
import { BrandPartnershipBar } from '../components/BrandPartnershipBar';
import { SafeImage } from '../components/SafeImage';
import {
  FileText,
  Calculator,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Sun,
  Droplets,
  Zap,
  Phone,
  Download,
  Users,
  Sparkles,
} from 'lucide-react';

interface HomePageProps {
  currentLang: Language;
  onNavigate: (page: string) => void;
  products: Product[];
  projects: ProjectItem[];
  onOpenConsultationWithData: (data: any) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  currentLang,
  onNavigate,
  products,
  projects,
  onOpenConsultationWithData,
}) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="space-y-16 pb-16">
      {/* HERO SECTION */}
      <section className="relative bg-[#071A2B] text-white pt-10 pb-16 overflow-hidden border-b border-blue-900/60">
        {/* Background Overlay Graphic */}
        <div className="absolute inset-0 z-0 opacity-25">
          <SafeImage
            src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=1200&q=80"
            alt="BIN RAMADAN Ai Solar Pumping System"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#071A2B] via-[#071A2B]/90 to-[#071A2B]/70 rtl:bg-gradient-to-l"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column - Brand Positioning & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#0B2E59] border border-amber-400/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-sky-300 shadow-md">
                <Sun className="w-4 h-4 text-amber-400" />
                <span className="font-black tracking-wide text-amber-300">BIN RAMADAN Ai × SHAKTI PUMPS</span>
              </div>

              {/* Company Title */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
                  BIN RAMADAN <span className="text-sky-400">Ai</span>
                </h1>
                <p className="text-lg sm:text-xl font-bold text-slate-300 tracking-wider">
                  SOLAR ENERGY & WATER PUMPS
                </p>
                <p className="text-xl sm:text-2xl font-bold text-sky-400 font-sans pt-1">
                  طلمبات وطاقة شمسية
                </p>
              </div>

              {/* Main Positioning Slogan */}
              <p className="text-base sm:text-lg font-semibold text-slate-200 border-l-4 rtl:border-r-4 rtl:border-l-0 border-sky-400 pl-4 rtl:pr-4 py-1 leading-relaxed">
                {isRtl ? BRAND_CONFIG.positioningAr : BRAND_CONFIG.positioningEn}
              </p>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
                {text.heroDescription}
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('request-quote')}
                  className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-xl hover:shadow-sky-500/25 transition-all text-xs sm:text-sm flex items-center gap-2 transform hover:-translate-y-0.5"
                >
                  <FileText className="w-4 h-4" />
                  <span>{text.btnRequestQuote}</span>
                </button>

                <button
                  onClick={() => onNavigate('tech-consultation')}
                  className="bg-[#0B2E59] hover:bg-blue-900 text-sky-300 border border-sky-400/50 font-bold py-3.5 px-6 rounded-xl transition-all text-xs sm:text-sm flex items-center gap-2"
                >
                  <Calculator className="w-4 h-4 text-sky-400" />
                  <span>{text.btnGetConsultation}</span>
                </button>
              </div>

              {/* Hero Stats Pill Badges */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-blue-900/80">
                <div className="bg-[#0B2E59]/80 p-3 rounded-lg border border-blue-800/60">
                  <span className="text-lg font-black text-sky-300 block">{text.heroStat1}</span>
                  <span className="text-[11px] text-slate-300">{text.heroStat1Label}</span>
                </div>

                <div className="bg-[#0B2E59]/80 p-3 rounded-lg border border-blue-800/60">
                  <span className="text-xs sm:text-sm font-black text-white block">{text.heroStat2}</span>
                  <span className="text-[11px] text-slate-300">{text.heroStat2Label}</span>
                </div>

                <div className="bg-[#0B2E59]/80 p-3 rounded-lg border border-blue-800/60">
                  <span className="text-lg font-black text-emerald-400 block">{text.heroStat3}</span>
                  <span className="text-[11px] text-slate-300">{text.heroStat3Label}</span>
                </div>
              </div>
            </div>

            {/* Right Column - Hero Visual Image Frame */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border-2 border-sky-500/40 shadow-2xl bg-[#0B2E59] group">
                <SafeImage
                  src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80"
                  alt="BIN RAMADAN Ai Solar Pumping Field Installation"
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent pointer-events-none"></div>

                <div className="absolute bottom-4 left-4 right-4 bg-[#071A2B]/90 backdrop-blur-md p-4 rounded-xl border border-sky-500/40 space-y-1">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-xs">
                    <MapPin className="w-4 h-4 text-sky-400 shrink-0" />
                    <span>{text.strategicLocationTitle}</span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-snug">
                    {text.strategicLocationDesc}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOMEPAGE PARTNER PRESENTATION STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BrandPartnershipBar variant="hero-strip" isRtl={isRtl} />
      </section>

      {/* SHAKTI PUMPS BRAND FEATURED SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#071A2B] via-[#0B2E59] to-[#071A2B] border border-blue-800/80 rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 bg-amber-950/80 border border-amber-500/40 px-3.5 py-1 rounded-full text-xs font-black text-amber-400">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>{isRtl ? 'حلول Shakti Pumps' : 'Shakti Pumps Range'}</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-white">
                {isRtl ? 'حلول ضخ متطورة من Shakti Pumps' : 'Advanced Solar Pumping Technology from Shakti Pumps'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {isRtl
                  ? 'نوفر حلول ضخ بالطاقة الشمسية ومعدات مختارة من مجموعة منتجات Shakti Pumps، مع تقديم الدعم الفني والاستشارات والحلول المناسبة لاحتياجات المشروعات الزراعية والمياه.'
                  : 'We supply specialized solar water pumps and equipment from the Shakti Pumps product lineup, providing complete hydraulic engineering, custom system sizing, and technical support.'}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-900/70 p-3 rounded-xl border border-sky-800/40 text-xs">
                  <span className="font-bold text-sky-300 block mb-1">
                    {isRtl ? 'العلامة المصنعة' : 'Manufacturer Brand'}
                  </span>
                  <span className="text-slate-300 font-extrabold">Shakti Pumps Product Range</span>
                </div>
                <div className="bg-slate-900/70 p-3 rounded-xl border border-sky-800/40 text-xs">
                  <span className="font-bold text-sky-300 block mb-1">
                    {isRtl ? 'الدعم والاستشارات' : 'Local Technical Support'}
                  </span>
                  <span className="text-slate-300 font-extrabold">BIN RAMADAN Ai Engineering</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('products')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 px-6 rounded-xl text-xs transition-all shadow-lg flex items-center gap-2"
                >
                  <span>{isRtl ? 'استكشف المنتجات' : 'Explore Products'}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('tech-consultation')}
                  className="bg-blue-900/80 hover:bg-blue-800 text-sky-300 border border-sky-400/40 font-bold py-3 px-6 rounded-xl text-xs transition-all"
                >
                  {isRtl ? 'اطلب استشارة فنية' : 'Request Technical Consultation'}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <SafeImage
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80"
                alt="Shakti Pumps Solar Pumping Technology"
                className="w-full h-64 sm:h-80 object-cover rounded-2xl border-2 border-amber-500/30 shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* STRATEGIC SHOWROOM & SERVICE LOCATION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#0B2E59] to-[#071A2B] border border-blue-800/80 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>{isRtl ? 'المقر الرئيسي والفرع المقترح' : 'HEAD OFFICE & PROPOSED BRANCH NETWORK'}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                {isRtl ? 'المقر الرئيسي بالإسكندرية • الفرع المقترح بقرية النجاح' : 'Head Office in Alexandria • Proposed Branch at Qaryat Al Najah'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isRtl
                  ? 'يقع المقر الرئيسي لشركة بن رمضان Ai بمدينة الإسكندرية. ويُعد موقع قرية النجاح هو الفرع ومركز الخدمة المقترح لدعم العملاء والمشاريع الزراعية في وادي النطرون، مدينة السادات، ومدينة بدر.'
                  : 'BIN RAMADAN Ai Head Office is in Alexandria, Egypt. Our proposed branch & service center at Qaryat Al Najah is intended to support agricultural projects across Wadi El Natrun, Sadat City, and Badr City.'}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-2.5">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-2.5 px-4 rounded-lg text-xs transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <MapPin className="w-4 h-4" />
                <span>{isRtl ? 'عرض تفاصيل الموقع والتواصل' : 'View Showroom Details'}</span>
              </button>

              <button
                onClick={() => onNavigate('about')}
                className="w-full bg-blue-900/80 hover:bg-blue-800 text-sky-300 border border-sky-400/30 font-bold py-2.5 px-4 rounded-lg text-xs transition-all text-center"
              >
                {text.navAbout}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SOLAR PUMP SIZING CALCULATOR SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <PumpSizingCalculator
          currentLang={currentLang}
          onOpenConsultationWithData={(calcData) => {
            onOpenConsultationWithData(calcData);
            onNavigate('tech-consultation');
          }}
        />
      </section>

      {/* PRODUCT CATALOG HIGHLIGHTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider">
              <Droplets className="w-4 h-4" />
              <span>{isRtl ? 'المعدات والمنتجات' : 'Products & Equipment'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {text.productsTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-xl">
              {text.productsSub}
            </p>
          </div>

          <button
            onClick={() => onNavigate('products')}
            className="flex items-center gap-1.5 text-sky-700 hover:text-sky-900 font-bold text-xs bg-sky-50 px-4 py-2 rounded-lg border border-sky-200 hover:bg-sky-100 transition-colors"
          >
            <span>{text.btnExploreProducts}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div>
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <SafeImage
                    src={prod.image}
                    alt={isRtl ? prod.nameAr : prod.nameEn}
                    category={prod.category}
                    showBrandedOverlay={true}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 bg-[#071A2B]/90 text-sky-300 text-[10px] font-bold px-2 py-1 rounded border border-blue-800 shadow z-10">
                    {prod.category}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="text-[10px] font-black text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/80 inline-flex items-center gap-1">
                    <span>BIN RAMADAN Ai</span>
                    <span className="text-amber-600 font-mono">×</span>
                    <span>SHAKTI PUMPS</span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm line-clamp-2">
                    {isRtl ? prod.nameAr : prod.nameEn}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {isRtl ? prod.shortDescAr : prod.shortDescEn}
                  </p>

                  {/* Price Policy Badge */}
                  <div className="bg-slate-50 border border-slate-200 p-1.5 rounded-lg text-center">
                    <span className="text-[10px] font-extrabold text-slate-700 block">
                      {isRtl ? 'السعر والتجهيزات حسب الطلب' : 'Price & Specs Available Upon Request'}
                    </span>
                  </div>

                  {/* Specs Summary */}
                  <div className="pt-2 text-[11px] space-y-1 border-t border-slate-100">
                    {prod.hasUnknownSpecs ? (
                      <span className="text-slate-500 italic block">
                        {text.unknownSpecsNotice}
                      </span>
                    ) : (
                      Object.entries(prod.specifications).slice(0, 2).map(([k, v], i) => (
                        <div key={i} className="flex justify-between text-slate-600">
                          <span className="text-slate-500 font-medium">{k}:</span>
                          <span className="font-bold text-slate-800">{v}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0 space-y-2">
                <button
                  onClick={() => onNavigate('products')}
                  className="w-full bg-[#0B2E59] hover:bg-[#071A2B] text-sky-300 font-bold py-2 rounded-lg text-xs transition-colors"
                >
                  {text.btnViewDetails}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* AGRICULTURAL SOLUTIONS SECTION */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-sky-700 font-bold text-xs uppercase tracking-wider bg-sky-100 px-3 py-1 rounded-full">
              {isRtl ? 'القطاع الزراعي والآبار الجوفية' : 'Agricultural Irrigation Focus'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {text.agriTitle}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {text.agriDesc}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: text.agriFeature1,
                desc: text.agriFeature1Desc,
                icon: Zap,
              },
              {
                title: text.agriFeature2,
                desc: text.agriFeature2Desc,
                icon: Droplets,
              },
              {
                title: text.agriFeature3,
                desc: text.agriFeature3Desc,
                icon: Sun,
              },
              {
                title: text.agriFeature4,
                desc: text.agriFeature4Desc,
                icon: ShieldCheck,
              },
            ].map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3"
                >
                  <div className="w-10 h-10 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm">{feat.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="text-center pt-4">
            <button
              onClick={() => onNavigate('agri-solutions')}
              className="bg-[#0B2E59] hover:bg-[#071A2B] text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm inline-flex items-center gap-2 shadow-md"
            >
              <span>{isRtl ? 'استعراض كافة حلول الري الزراعي' : 'Explore Full Agricultural Solutions'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <div className="flex items-center gap-2 text-sky-600 font-bold text-xs uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>{isRtl ? 'مشاريع منفذة' : 'Engineering Portfolio'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {isRtl ? 'سجل مشاريع محطات الضخ الشمسي' : 'Solar Water Pumping Projects'}
            </h2>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="flex items-center gap-1.5 text-sky-700 hover:text-sky-900 font-bold text-xs bg-sky-50 px-4 py-2 rounded-lg border border-sky-200 hover:bg-sky-100 transition-colors"
          >
            <span>{text.btnViewProjects}</span>
            <ArrowIcon className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 bg-slate-100 overflow-hidden">
                  <SafeImage
                    src={proj.image}
                    alt={isRtl ? proj.titleAr : proj.titleEn}
                    category="Solar Pumping Systems"
                    showBrandedOverlay={true}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded z-10">
                    {isRtl ? proj.statusAr : proj.statusEn}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <span className="text-[11px] font-bold text-sky-600 bg-sky-50 px-2.5 py-0.5 rounded inline-block">
                    {isRtl ? proj.locationAr : proj.locationEn}
                  </span>

                  <h3 className="font-bold text-slate-900 text-sm leading-snug">
                    {isRtl ? proj.titleAr : proj.titleEn}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {isRtl ? proj.descriptionAr : proj.descriptionEn}
                  </p>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs text-slate-700 font-mono">
                    <span className="font-bold text-slate-900 block">{proj.capacity}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL COMMERCIAL MESSAGE & QUOTATION CTA BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#071A2B] via-[#0B2E59] to-[#071A2B] rounded-3xl p-8 sm:p-12 text-white text-center space-y-6 shadow-2xl border border-sky-500/40 relative overflow-hidden">
          <div className="max-w-3xl mx-auto space-y-4">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3.5 py-1 rounded-full uppercase tracking-wider inline-block shadow">
              {isRtl ? 'عايز تعرف السعر المناسب لمشروعك؟' : 'Want to know the exact price for your project?'}
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-white leading-tight">
              {isRtl ? 'مش كل بئر محتاج نفس الطلمبة' : 'Not Every Well Uses the Same Pump'}
            </h2>

            <div className="text-xs sm:text-sm text-slate-200 leading-relaxed space-y-1.5 font-medium">
              <p>{isRtl ? 'اختيار الطلمبة الصح يبدأ من بيانات مشروعك.' : 'Selecting the right pump begins with your project data.'}</p>
              <p>{isRtl ? 'ابعتلنا بيانات البئر والتصرف المطلوب، وفريقنا يساعدك في اختيار الحل المناسب من Shakti.' : 'Send us your well data & required flow rate, and our engineering team will help select the ideal Shakti solution.'}</p>
              <p className="text-amber-300 font-bold">{isRtl ? 'السعر والتجهيزات والتكوين النهائي يتم تحديدها حسب متطلبات المشروع.' : 'Final price, equipment, and system configuration are determined according to your project requirements.'}</p>
            </div>

            <div className="pt-2 border-t border-sky-800/80 text-xs text-sky-200 space-y-1">
              <span className="font-extrabold text-amber-400 block tracking-wider uppercase">IBN RAMADAN SOLAR & SMART ENERGY</span>
              <span className="text-slate-300 block">{isRtl ? 'حلول ضخ المياه بالطاقة الشمسية في مصر' : 'Solar Water Pumping Solutions for Egypt'}</span>
              <p className="font-bold text-white text-xs pt-1">
                {isRtl ? '«تواصل معنا للحصول على السعر والمواصفات والتجهيز المناسب لمشروعك»' : 'Contact us for the latest price, specifications, and system configuration for your project.'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <button
              onClick={() => onNavigate('request-quote')}
              className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black py-3.5 px-8 rounded-xl text-xs sm:text-sm shadow-xl transition-all flex items-center gap-2"
            >
              <span>{isRtl ? 'اطلب عرض السعر الآن' : 'REQUEST A QUOTATION'}</span>
            </button>

            <button
              onClick={() => onNavigate('tech-consultation')}
              className="bg-blue-950 hover:bg-blue-900 text-sky-300 border border-sky-400/40 font-bold py-3.5 px-8 rounded-xl text-xs sm:text-sm transition-all"
            >
              {isRtl ? 'طلب استشارة فنية' : 'Request Technical Consultation'}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
