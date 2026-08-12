import React, { useState } from 'react';
import { Language } from '../types';
import { BRAND_CONFIG } from '../config/brand';
import { MessageSquare, AlertCircle, X } from 'lucide-react';

interface WhatsAppButtonProps {
  currentLang: Language;
  onNavigateConsultation?: () => void;
}

export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ currentLang, onNavigateConsultation }) => {
  const isRtl = currentLang === 'ar';
  const [showNotice, setShowNotice] = useState(false);

  const defaultMessage = isRtl
    ? 'مرحباً شركة بن رمضان Ai، أريد استشارة حول طلمبات ومحطات الري بالطاقة الشمسية...'
    : 'Hello BIN RAMADAN Ai, I am inquiring about solar water pumping systems...';

  const hasWhatsApp = Boolean(BRAND_CONFIG.contact.whatsapp && BRAND_CONFIG.contact.whatsapp.trim().length > 3);
  const whatsappUrl = hasWhatsApp
    ? `https://wa.me/${BRAND_CONFIG.contact.whatsapp}?text=${encodeURIComponent(defaultMessage)}`
    : '#';

  const handleClick = (e: React.MouseEvent) => {
    if (!hasWhatsApp) {
      e.preventDefault();
      setShowNotice(true);
    }
  };

  return (
    <>
      <a
        href={whatsappUrl}
        target={hasWhatsApp ? '_blank' : '_self'}
        rel={hasWhatsApp ? 'noopener noreferrer' : ''}
        onClick={handleClick}
        className="fixed bottom-6 right-6 rtl:right-auto rtl:left-6 z-40 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-3 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 group border border-emerald-400/30"
        title={isRtl ? 'تواصل عبر الواتساب' : 'Contact on WhatsApp'}
      >
        <div className="relative">
          <MessageSquare className="w-6 h-6 fill-current text-white" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-sky-400 rounded-full animate-ping"></span>
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-sky-400 rounded-full"></span>
        </div>
        <span className="font-bold text-xs sm:text-sm whitespace-nowrap hidden sm:inline">
          {hasWhatsApp
            ? isRtl
              ? 'واتساب المبيعات والاستشارات'
              : 'Talk on WhatsApp'
            : isRtl
            ? 'تواصل واتساب (قريباً)'
            : 'WhatsApp (Coming Soon)'}
        </span>
      </a>

      {showNotice && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 text-center space-y-4 animate-fadeIn">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-black text-slate-900">
                {isRtl ? 'تفاصيل الواتساب المباشر قريباً' : 'WhatsApp Contact Coming Soon'}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {isRtl
                  ? 'يتم حالياً تجهيز وتفعيل خط التواصل المباشر عبر الواتساب لخدمة العملاء. يمكنك طلب استشارة فنية هيدروليكية أو طلب عرض سعر مباشرة عبر نموذج الموقع وسيقوم الفريق بالرد فوراً.'
                  : 'Direct WhatsApp communication channel is currently being prepared. You can request a technical consultation or quotation directly through our online request form.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  setShowNotice(false);
                  if (onNavigateConsultation) onNavigateConsultation();
                }}
                className="w-full bg-[#0B2E59] hover:bg-blue-900 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
              >
                {isRtl ? 'طلب استشارة فنية الآن' : 'Request Consultation Now'}
              </button>
              <button
                onClick={() => setShowNotice(false)}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
              >
                {isRtl ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
