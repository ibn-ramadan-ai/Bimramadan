import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { PumpSizingCalculator } from '../components/PumpSizingCalculator';
import { Droplets, Zap, ShieldCheck, Sun, CheckCircle2, Calculator, ArrowRight, ArrowLeft } from 'lucide-react';

interface AgriculturalSolutionsPageProps {
  currentLang: Language;
  onNavigate: (page: string) => void;
  onOpenConsultationWithData: (data: any) => void;
}

export const AgriculturalSolutionsPage: React.FC<AgriculturalSolutionsPageProps> = ({
  currentLang,
  onNavigate,
  onOpenConsultationWithData,
}) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-[#071A2B] text-white p-8 sm:p-12 rounded-2xl border border-blue-900 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
          <Droplets className="w-5 h-5 text-emerald-400" />
          <span>{isRtl ? 'القطاع الزراعي واستصلاح الأراضي' : 'Agricultural Reclamation & Water Security'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {text.agriTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {text.agriDesc}
        </p>
      </div>

      {/* 4 Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: text.agriFeature1, desc: text.agriFeature1Desc, icon: Zap },
          { title: text.agriFeature2, desc: text.agriFeature2Desc, icon: Droplets },
          { title: text.agriFeature3, desc: text.agriFeature3Desc, icon: Sun },
          { title: text.agriFeature4, desc: text.agriFeature4Desc, icon: ShieldCheck },
        ].map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-sky-100 text-sky-700 rounded-lg flex items-center justify-center font-bold">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Interactive Assessment Tool */}
      <div className="space-y-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold text-sky-700 uppercase tracking-wider bg-sky-100 px-3 py-1 rounded-full">
            {isRtl ? 'طلب التقييم الهندسي للمزرعة' : 'Request a Solar Pumping Assessment'}
          </span>
          <h2 className="text-2xl font-black text-slate-900">
            {isRtl ? 'تقدير احتياجات البئر والري لمزرعتك' : 'Farm Hydraulic & Solar Sizing Tool'}
          </h2>
        </div>

        <PumpSizingCalculator
          currentLang={currentLang}
          onOpenConsultationWithData={(calcData) => {
            onOpenConsultationWithData(calcData);
            onNavigate('tech-consultation');
          }}
        />
      </div>

      {/* Regional Focus */}
      <div className="bg-slate-900 text-white p-8 rounded-2xl border border-slate-800 space-y-4">
        <h3 className="font-bold text-lg text-white">
          {isRtl ? 'خدمة أراضي الاستصلاح بوادي النطرون، السادات، وبدر' : 'Serving Agricultural Expansion Projects in Egypt'}
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          {isRtl
            ? 'تستهدف بن رمضان Ai تقديم خدمات الضخ الشمسي والصيانة الميدانية السريعة بمركز خدمات قرية النجاح بالقرب من محاور الاستصلاح الزراعي لضمان عدم توقف مياه الري عن المحاصيل.'
            : 'BIN RAMADAN Ai optimizes pump performance and field uptime across desert agricultural soils with field support based at Qaryat Al Najah.'}
        </p>
      </div>
    </div>
  );
};
