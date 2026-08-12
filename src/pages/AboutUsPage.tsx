import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { BRAND_CONFIG } from '../config/brand';
import { BrandLogo } from '../components/BrandLogo';
import {
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Sun,
  Droplets,
  Cpu,
  Wrench,
  Award,
  Users,
  Building,
  FileText,
} from 'lucide-react';

interface AboutUsPageProps {
  currentLang: Language;
  onNavigate: (page: string) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ currentLang, onNavigate }) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Page Header */}
      <div className="bg-[#071A2B] text-white p-8 sm:p-12 rounded-2xl border border-blue-900 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <BrandLogo variant="emblem-only" size="md" />
          <div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              {text.navAbout}
            </h1>
            <p className="text-xs sm:text-sm text-sky-400 font-medium pt-1">
              {BRAND_CONFIG.nameEn} | {BRAND_CONFIG.taglineEn} ({BRAND_CONFIG.taglineAr})
            </p>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
          {text.whoWeAreDesc}
        </p>
      </div>

      {/* Official Verified Notice */}
      <div className="bg-sky-50 border-l-4 rtl:border-r-4 rtl:border-l-0 border-sky-600 p-5 rounded-r-xl rtl:rounded-l-xl rtl:rounded-r-none text-slate-800 space-y-2">
        <div className="flex items-center gap-2 font-bold text-sky-900 text-sm">
          <ShieldCheck className="w-5 h-5 text-sky-600" />
          <span>{text.profileNoticeTitle}</span>
        </div>
        <p className="text-xs leading-relaxed text-slate-700">
          {text.profileNoticeDesc}
        </p>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center">
            <Sun className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">{text.vision}</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {text.visionDesc}
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 bg-sky-100 text-sky-700 rounded-xl flex items-center justify-center">
            <Droplets className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900">{text.mission}</h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {text.missionDesc}
          </p>
        </div>
      </div>

      {/* Why Choose Us & Key Pillars */}
      <div className="bg-[#0B2E59] text-white p-8 sm:p-12 rounded-2xl border border-blue-800 shadow-xl space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {text.whyChooseUs}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {isRtl
              ? 'الركائز الهندسية والخدمية التي تعتمد عليها شركة بن رمضان Ai في تنفيذ مشروعات الري والضخ الشمسي'
              : 'Core engineering and service pillars defining BIN RAMADAN Ai'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: text.why1, icon: Cpu },
            { title: text.why2, icon: MapPin },
            { title: text.why3, icon: Wrench },
            { title: text.why4, icon: ShieldCheck },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="bg-[#071A2B] p-6 rounded-xl border border-blue-800/80 space-y-3">
                <Icon className="w-8 h-8 text-sky-400" />
                <h3 className="font-bold text-sm text-white leading-snug">{item.title}</h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic Location Focus Section */}
      <div className="bg-slate-900 text-white p-8 sm:p-10 rounded-2xl border border-slate-800 space-y-6">
        <div className="flex items-center gap-3">
          <MapPin className="w-6 h-6 text-sky-400 shrink-0" />
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {text.strategicLocationTitle}
          </h2>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
          {text.strategicLocationDesc}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {BRAND_CONFIG.regions.map((reg, idx) => (
            <div
              key={idx}
              className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex items-center gap-2.5 text-xs text-sky-300 font-bold"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{isRtl ? reg.ar : reg.en}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Partners & International Suppliers Framework */}
      <div className="bg-white p-8 rounded-2xl border border-slate-200 space-y-6">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider block">
            {isRtl ? 'المصنعون والموردون الدوليون' : 'Equipment Suppliers & Component Partners'}
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            {isRtl ? 'الشركات المصنعة ومكونات الأنظمة' : 'International Manufacturers & Component Brands'}
          </h2>
          <p className="text-xs text-slate-600 pt-1">
            {isRtl
              ? 'تعتمد بن رمضان Ai على توريد مكونات معتمدة ذات جودة عالية من أفضل المصنعين الدوليين للألواح والإنفرترات والمضخات.'
              : 'BIN RAMADAN Ai integrates tier-1 tested components from reputable international PV, inverter, and pump manufacturers.'}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
          {[
            'Tier-1 Solar PV Modules',
            'Submersible Stainless Steel Pumps',
            'MPPT VFD Controllers',
            'Submersible Armored Cables',
            'Hot-Dip Galvanized Frames',
            'Hydraulic Sensors & Meters',
          ].map((partner, idx) => (
            <div
              key={idx}
              className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 flex items-center justify-center"
            >
              <span>{partner}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <button
          onClick={() => onNavigate('tech-consultation')}
          className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-md"
        >
          {text.btnGetConsultation}
        </button>

        <button
          onClick={() => onNavigate('company-profile')}
          className="bg-[#0B2E59] hover:bg-[#071A2B] text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-md flex items-center gap-2"
        >
          <FileText className="w-4 h-4" />
          <span>{text.btnDownloadProfile}</span>
        </button>
      </div>
    </div>
  );
};
