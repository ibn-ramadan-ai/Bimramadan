import React, { useState } from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { BRAND_CONFIG } from '../config/brand';
import { BrandLogo } from './BrandLogo';
import {
  Phone,
  MessageSquare,
  Globe,
  Menu,
  X,
  FileText,
  Calculator,
  LayoutDashboard,
  ChevronDown,
  Sun,
  Droplets,
} from 'lucide-react';

interface NavbarProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onLanguageChange,
  currentPage,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
  const text = getTranslation(currentLang);

  const isRtl = currentLang === 'ar';

  const navItems = [
    { id: 'home', label: text.navHome },
    { id: 'about', label: text.navAbout },
    {
      id: 'solutions-menu',
      label: isRtl ? 'الحلول والمنتجات' : 'Solutions & Products',
      isDropdown: true,
      children: [
        { id: 'solar-pumps', label: text.navSolarPumps, icon: Droplets },
        { id: 'solar-energy', label: text.navSolarEnergy, icon: Sun },
        { id: 'products', label: text.navProducts, icon: FileText },
        { id: 'agri-solutions', label: text.navAgriSolutions, icon: Calculator },
      ],
    },
    { id: 'services', label: text.navServices },
    { id: 'projects', label: text.navProjects },
    { id: 'downloads', label: text.navDownloads },
    { id: 'contact', label: text.navContact },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    setSolutionsDropdownOpen(false);
  };

  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    isRtl
      ? 'مرحباً شركة بن رمضان Ai للطلمبات والطاقة الشمسية، أود الاستفسار عن محطة ضخ بالطاقة الشمسية...'
      : 'Hello BIN RAMADAN Ai, I would like to inquire about a solar pumping system...'
  )}`;

  return (
    <header className="sticky top-0 z-50 bg-[#071A2B] text-white border-b border-blue-900/50 shadow-lg">
      {/* Top Engineering Announcement & Direct Contact Bar */}
      <div className="bg-[#0B2E59] text-xs py-2 px-4 border-b border-blue-800/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-300">
          <div className="flex items-center gap-4 text-[11px] sm:text-xs">
            <span className="flex items-center gap-1.5 text-sky-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {isRtl
                ? 'الفرع ومركز الخدمة المقترح: قرية النجاح – مصر (لدعم وادي النطرون - مدينة السادات - مدينة بدر والأنشطة الزراعية)'
                : 'Proposed Branch & Service Center: Qaryat Al Najah, Egypt (Serving Wadi El Natrun, Sadat City, Badr City)'}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {BRAND_CONFIG.contact.phone ? (
              <a
                href={`tel:${BRAND_CONFIG.contact.phone}`}
                className="flex items-center gap-1 hover:text-sky-300 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-sky-400" />
                <span dir="ltr">{BRAND_CONFIG.contact.phoneDisplay}</span>
              </a>
            ) : (
              <span className="text-slate-400 text-[10px] hidden sm:inline">
                {isRtl ? BRAND_CONFIG.contact.comingSoonAr : BRAND_CONFIG.contact.comingSoonEn}
              </span>
            )}

            {BRAND_CONFIG.contact.whatsapp ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isRtl ? 'واتساب المبيعات' : 'WhatsApp'}</span>
              </a>
            ) : (
              <button
                onClick={() => handleNavClick('tech-consultation')}
                className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium text-[11px]"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{isRtl ? 'تواصل واتساب (قريباً)' : 'WhatsApp (Soon)'}</span>
              </button>
            )}

            {/* Language Switcher Button */}
            <button
              onClick={() => onLanguageChange(currentLang === 'ar' ? 'en' : 'ar')}
              className="flex items-center gap-1 bg-blue-950/80 hover:bg-blue-900 text-sky-300 px-2.5 py-1 rounded border border-blue-700/50 font-bold transition-all text-[11px]"
              title="Switch Language / تغيير اللغة"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{currentLang === 'ar' ? 'English' : 'العربية'}</span>
            </button>

            {/* Admin Portal Quick Access */}
            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                currentPage === 'admin'
                  ? 'bg-sky-500 text-white'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{isRtl ? 'لوحة الإدارة' : 'Admin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
        {/* Brand Emblem Logo & Co-Brand Badge */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-lg p-1 transition-transform hover:scale-102"
          >
            <BrandLogo variant="full" size="md" showArabicSubtext={true} />
          </button>
          <div className="hidden lg:flex items-center gap-1.5 bg-gradient-to-r from-blue-950/90 to-slate-900 border border-amber-500/40 px-3 py-1.5 rounded-xl text-xs font-black shadow-inner">
            <span className="text-white">BIN RAMADAN Ai</span>
            <span className="text-amber-400 font-mono font-bold">×</span>
            <span className="text-amber-400">SHAKTI PUMPS</span>
          </div>
        </div>

        {/* Desktop Horizontal Navigation Links */}
        <nav className="hidden xl:flex items-center gap-1 font-medium text-sm">
          {navItems.map((item) => {
            if (item.isDropdown && item.children) {
              const isChildActive = item.children.some((c) => c.id === currentPage);
              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => setSolutionsDropdownOpen(!solutionsDropdownOpen)}
                    className={`flex items-center gap-1 px-3 py-2 rounded-md transition-colors ${
                      isChildActive
                        ? 'text-sky-400 bg-blue-950/60 font-bold'
                        : 'text-slate-200 hover:text-sky-300 hover:bg-blue-900/30'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronDown className="w-4 h-4 text-slate-400 group-hover:rotate-180 transition-transform" />
                  </button>

                  <div className="absolute top-full left-0 rtl:right-0 rtl:left-auto w-56 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="bg-[#071A2B] border border-blue-800/80 rounded-lg shadow-xl p-2 space-y-1">
                      {item.children.map((child) => {
                        const Icon = child.icon;
                        return (
                          <button
                            key={child.id}
                            onClick={() => handleNavClick(child.id)}
                            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-xs text-left rtl:text-right transition-colors ${
                              currentPage === child.id
                                ? 'bg-blue-900/80 text-sky-300 font-bold'
                                : 'text-slate-300 hover:bg-blue-900/40 hover:text-white'
                            }`}
                          >
                            <Icon className="w-4 h-4 text-sky-400" />
                            <span>{child.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            }

            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3 py-2 rounded-md transition-colors ${
                  isActive
                    ? 'text-sky-400 bg-blue-950/80 font-bold border-b-2 border-sky-400'
                    : 'text-slate-200 hover:text-sky-300 hover:bg-blue-900/30'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Call to Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => handleNavClick('tech-consultation')}
            className="flex items-center gap-1.5 bg-blue-900/60 hover:bg-blue-800 text-sky-300 border border-sky-500/40 px-3.5 py-2 rounded-lg text-xs font-bold transition-all hover:border-sky-400 shadow-sm"
          >
            <Calculator className="w-4 h-4 text-sky-400" />
            <span>{text.btnGetConsultation}</span>
          </button>

          <button
            onClick={() => handleNavClick('request-quote')}
            className="flex items-center gap-1.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-md hover:shadow-sky-500/20 transition-all transform hover:-translate-y-0.5"
          >
            <FileText className="w-4 h-4" />
            <span>{text.btnRequestQuote}</span>
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex xl:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-blue-900/50 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#071A2B] border-t border-blue-900/60 px-4 pt-3 pb-6 space-y-2 shadow-2xl animate-fadeIn">
          {navItems.map((item) => {
            if (item.isDropdown && item.children) {
              return (
                <div key={item.id} className="space-y-1">
                  <div className="text-xs font-bold text-sky-400 uppercase tracking-wider px-3 pt-2">
                    {item.label}
                  </div>
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => handleNavClick(child.id)}
                      className={`w-full flex items-center gap-2 px-4 py-2 rounded-md text-sm text-left rtl:text-right ${
                        currentPage === child.id
                          ? 'bg-blue-900 text-sky-300 font-bold'
                          : 'text-slate-300 hover:bg-blue-900/40'
                      }`}
                    >
                      <span>•</span>
                      <span>{child.label}</span>
                    </button>
                  ))}
                </div>
              );
            }

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm text-left rtl:text-right font-medium ${
                  currentPage === item.id
                    ? 'bg-blue-900 text-sky-300 font-bold'
                    : 'text-slate-200 hover:bg-blue-900/40'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-4 space-y-2 border-t border-blue-900/50">
            <button
              onClick={() => handleNavClick('tech-consultation')}
              className="w-full flex items-center justify-center gap-2 bg-blue-900 text-sky-300 border border-sky-500/40 py-2.5 rounded-lg text-xs font-bold"
            >
              <Calculator className="w-4 h-4 text-sky-400" />
              <span>{text.btnGetConsultation}</span>
            </button>

            <button
              onClick={() => handleNavClick('request-quote')}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-2.5 rounded-lg text-xs font-bold shadow-md"
            >
              <FileText className="w-4 h-4" />
              <span>{text.btnRequestQuote}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
