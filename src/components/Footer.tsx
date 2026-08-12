import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { BRAND_CONFIG } from '../config/brand';
import { BrandLogo } from './BrandLogo';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  ChevronRight,
  ChevronLeft,
  Sun,
  Droplets,
  LayoutDashboard,
  Sparkles,
} from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ currentLang, onNavigate }) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;

  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    isRtl
      ? 'مرحباً شركة بن رمضان Ai، أريد استشارة حول طلمبات الطاقة الشمسية للمزرعة...'
      : 'Hello BIN RAMADAN Ai, I need consultation on a solar water pumping system...'
  )}`;

  return (
    <footer className="bg-[#071A2B] text-slate-300 pt-12 pb-8 border-t-4 border-sky-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info & Official Descriptor */}
          <div className="space-y-4">
            <BrandLogo variant="full" size="lg" showArabicSubtext={true} />

            <p className="text-xs text-slate-300 leading-relaxed pt-2">
              {isRtl ? BRAND_CONFIG.positioningAr : BRAND_CONFIG.positioningEn}
            </p>

            <div className="p-3 bg-[#0B2E59]/80 border border-sky-400/40 rounded-xl text-xs space-y-1 text-slate-200">
              <div className="font-extrabold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>BIN RAMADAN Ai × SHAKTI PUMPS</span>
              </div>
              <p className="text-[11px] text-slate-300">
                {isRtl ? 'حلول الطاقة الشمسية وطلمبات المياه' : 'Solar Energy & Water Pumping Solutions'}
              </p>
              <p className="text-[11px] font-medium text-slate-400">
                {isRtl ? 'منتجات Shakti Pumps | تقديم ودعم فني بواسطة بن رمضان Ai' : 'Shakti Pumps Products | Presented & Supported by BIN RAMADAN Ai'}
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-blue-800/80 pb-2 flex items-center gap-2">
              <Sun className="w-4 h-4 text-sky-400" />
              <span>{text.footerQuickLinks}</span>
            </h3>

            <ul className="space-y-2 text-xs">
              {[
                { id: 'home', label: text.navHome },
                { id: 'about', label: text.navAbout },
                { id: 'products', label: text.navProducts },
                { id: 'services', label: text.navServices },
                { id: 'projects', label: text.navProjects },
                { id: 'agri-solutions', label: text.navAgriSolutions },
                { id: 'company-profile', label: text.navCompanyProfile },
                { id: 'downloads', label: text.navDownloads },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="flex items-center gap-1.5 hover:text-sky-300 transition-colors text-slate-300 group"
                  >
                    <ArrowIcon className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Technical Solutions & Assessment */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-blue-800/80 pb-2 flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky-400" />
              <span>{text.footerServices}</span>
            </h3>

            <ul className="space-y-2 text-xs">
              {[
                { id: 'solar-pumps', label: text.navSolarPumps },
                { id: 'solar-energy', label: text.navSolarEnergy },
                { id: 'tech-consultation', label: text.navTechConsultation },
                { id: 'request-quote', label: text.navRequestQuote },
                { id: 'admin', label: isRtl ? 'لوحة إدارة الأعمال CRM' : 'Admin & Business Portal' },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="flex items-center gap-1.5 hover:text-sky-300 transition-colors text-slate-300 group"
                  >
                    <ArrowIcon className="w-3.5 h-3.5 text-sky-400 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 pt-4 border-t border-blue-900/60">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                {isRtl ? 'مناطق الخدمة الميدانية' : 'Key Field Regions'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {BRAND_CONFIG.regions.slice(0, 4).map((reg, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-950 text-sky-300 border border-blue-800/60 text-[10px] px-2 py-0.5 rounded font-medium"
                  >
                    {isRtl ? reg.ar : reg.en}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Col 4: Strategic Location & Direct Contact */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4 border-b border-blue-800/80 pb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sky-400" />
              <span>{text.footerContactInfo}</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="space-y-1.5 border-b border-blue-900/60 pb-2">
                <div className="flex items-start gap-2 text-slate-200">
                  <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-sky-300 block">{isRtl ? BRAND_CONFIG.headOffice.titleAr : BRAND_CONFIG.headOffice.titleEn}</span>
                    <span className="text-slate-300">{isRtl ? BRAND_CONFIG.headOffice.locationAr : BRAND_CONFIG.headOffice.locationEn}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-slate-200 pt-1">
                  <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-amber-300 block">{isRtl ? BRAND_CONFIG.proposedBranch.titleAr : BRAND_CONFIG.proposedBranch.titleEn}</span>
                    <span className="text-slate-300">{isRtl ? BRAND_CONFIG.proposedBranch.locationAr : BRAND_CONFIG.proposedBranch.locationEn}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                {BRAND_CONFIG.contact.phone ? (
                  <a
                    href={`tel:${BRAND_CONFIG.contact.phone}`}
                    className="hover:text-sky-300 transition-colors font-mono"
                    dir="ltr"
                  >
                    {BRAND_CONFIG.contact.phoneDisplay}
                  </a>
                ) : (
                  <span className="text-slate-400 text-[11px] italic">
                    {isRtl ? BRAND_CONFIG.contact.comingSoonAr : BRAND_CONFIG.contact.comingSoonEn}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                {BRAND_CONFIG.contact.whatsapp ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium flex items-center gap-1"
                  >
                    <span>{isRtl ? 'تواصل عبر الواتساب' : 'Chat on WhatsApp'}</span>
                  </a>
                ) : (
                  <button
                    onClick={() => onNavigate('tech-consultation')}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors font-medium text-[11px] underline"
                  >
                    {isRtl ? 'طلب تواصل واتساب / استشارة فنية' : 'Request Technical Consultation'}
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a
                  href={`mailto:${BRAND_CONFIG.contact.email}`}
                  className="hover:text-sky-300 transition-colors"
                >
                  {BRAND_CONFIG.contact.email}
                </a>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => onNavigate('request-quote')}
                className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white text-xs font-bold py-2.5 px-4 rounded-lg shadow-md transition-all text-center"
              >
                {text.btnRequestQuote}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Official Disclaimer */}
        <div className="pt-8 border-t border-blue-900/60 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2 flex-wrap text-center md:text-left rtl:md:text-right">
            <span>© 2026 {BRAND_CONFIG.nameEn}.</span>
            <span>{text.rightsReserved}</span>
            <span className="bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase ml-2 rtl:mr-2 rtl:ml-0">
              {isRtl ? 'نسخة تجريبية • 2026' : 'PREVIEW VERSION • 2026'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('admin')}
              className="text-slate-400 hover:text-sky-300 flex items-center gap-1 text-[11px] underline"
            >
              <LayoutDashboard className="w-3 h-3" />
              <span>{isRtl ? 'دخول المشرفين (Admin Portal)' : 'Admin Dashboard Portal'}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
