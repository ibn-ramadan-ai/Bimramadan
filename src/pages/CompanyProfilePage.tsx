import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { BRAND_CONFIG } from '../config/brand';
import { BrandLogo } from '../components/BrandLogo';
import { Printer, Download, ShieldCheck, CheckCircle2, MapPin, Sun, Droplets, Wrench } from 'lucide-react';

interface CompanyProfilePageProps {
  currentLang: Language;
}

export const CompanyProfilePage: React.FC<CompanyProfilePageProps> = ({ currentLang }) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Action Bar */}
      <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm print:hidden">
        <span className="text-xs font-bold text-slate-700">
          {isRtl ? 'عرض بروفايل الشركة القابل للطباعة والتحميل' : 'Printable Official Company Profile Presentation'}
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={handlePrint}
            className="bg-[#0B2E59] hover:bg-[#071A2B] text-sky-300 px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <Printer className="w-4 h-4" />
            <span>{isRtl ? 'طباعة / تصدير PDF' : 'Print / Export PDF'}</span>
          </button>
        </div>
      </div>

      {/* Printable Profile Document Card */}
      <div className="bg-white p-8 sm:p-12 rounded-2xl border border-slate-200 shadow-lg space-y-10 print:shadow-none print:border-none print:p-0">
        {/* Cover Header */}
        <div className="border-b-4 border-[#0B2E59] pb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <BrandLogo variant="full" size="xl" showArabicSubtext={true} />

          <div className="text-left rtl:text-right space-y-1">
            <span className="text-xs font-mono font-bold text-sky-700 block">
              OFFICIAL CORPORATE DOSSIER 2026
            </span>
            <span className="text-xs text-slate-500 block">
              {isRtl ? BRAND_CONFIG.contact.addressAr : BRAND_CONFIG.contact.addressEn}
            </span>
            <span className="text-xs font-mono text-slate-700 block" dir="ltr">
              Phone: {BRAND_CONFIG.contact.phoneDisplay} | {BRAND_CONFIG.contact.email}
            </span>
          </div>
        </div>

        {/* Section 1: Who We Are */}
        <div className="space-y-3">
          <h2 className="text-xl font-black text-[#0B2E59] border-b pb-2 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-sky-600" />
            <span>{text.whoWeAre}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {text.whoWeAreDesc}
          </p>
        </div>

        {/* Section 2: Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-[#0B2E59] text-sm flex items-center gap-2">
              <Sun className="w-4 h-4 text-sky-600" />
              <span>{text.vision}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {text.visionDesc}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-[#0B2E59] text-sm flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-600" />
              <span>{text.mission}</span>
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {text.missionDesc}
            </p>
          </div>
        </div>

        {/* Section 3: Strategic Showroom Hub */}
        <div className="bg-[#071A2B] text-white p-6 rounded-xl space-y-3">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-sm">
            <MapPin className="w-5 h-5" />
            <span>{text.strategicLocationTitle}</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {text.strategicLocationDesc}
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {BRAND_CONFIG.regions.map((reg, idx) => (
              <span key={idx} className="bg-blue-900 text-sky-300 text-[10px] font-bold px-2.5 py-1 rounded">
                ✓ {isRtl ? reg.ar : reg.en}
              </span>
            ))}
          </div>
        </div>

        {/* Section 4: Verified Technical Standards Notice */}
        <div className="bg-slate-100 p-6 rounded-xl border border-slate-300 space-y-2 text-xs text-slate-700">
          <span className="font-bold text-[#0B2E59] block">{text.profileNoticeTitle}</span>
          <p className="leading-relaxed">{text.profileNoticeDesc}</p>
        </div>

        {/* Footer Signature Block */}
        <div className="pt-8 border-t border-slate-200 flex justify-between items-end text-xs text-slate-500">
          <div>
            <span className="font-bold text-slate-800 block">{BRAND_CONFIG.nameEn}</span>
            <span>{BRAND_CONFIG.taglineEn} ({BRAND_CONFIG.taglineAr})</span>
          </div>

          <div className="text-right rtl:text-left font-mono">
            <span>Verified Document 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
