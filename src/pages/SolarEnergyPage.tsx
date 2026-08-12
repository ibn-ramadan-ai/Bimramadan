import React from 'react';
import { Language, Product } from '../types';
import { getTranslation } from '../data/translations';
import { Sun, Cpu, Zap, FileText, Calculator } from 'lucide-react';
import { SafeImage } from '../components/SafeImage';

interface SolarEnergyPageProps {
  currentLang: Language;
  products: Product[];
  onNavigate: (page: string) => void;
  onSelectProductForQuote: (productName: string) => void;
}

export const SolarEnergyPage: React.FC<SolarEnergyPageProps> = ({
  currentLang,
  products,
  onNavigate,
  onSelectProductForQuote,
}) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  const solarComponents = products.filter(
    (p) =>
      p.category === 'PV Solar Modules' ||
      p.category === 'Solar Pump Controllers' ||
      p.category === 'Inverters'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-[#071A2B] text-white p-8 sm:p-12 rounded-2xl border border-blue-900 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
          <Sun className="w-5 h-5 text-amber-400" />
          <span>{isRtl ? 'أنظمة ومكونات الطاقة الشمسية' : 'PV Solar Modules & Power Electronics'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {text.navSolarEnergy}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {isRtl
            ? 'تكنولوجيا كهرومغناطيسية وإينفرترات VFD مع تتبع النقطة القصوى MPPT وألواح شمسية عالية الكفاءة مخصصة لبيئة المزارع المصرية.'
            : 'High efficiency TOPCon N-type solar modules and MPPT Variable Frequency Drives engineered for zero-grid agricultural reliability.'}
        </p>
      </div>

      {/* Grid of Components */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {solarComponents.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="p-6 space-y-4">
              <div className="relative h-48 bg-slate-100 rounded-xl overflow-hidden">
                <SafeImage
                  src={prod.image}
                  alt={isRtl ? prod.nameAr : prod.nameEn}
                  category={prod.category}
                  showBrandedOverlay={true}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-[#071A2B] text-sky-300 text-[10px] font-bold px-2 py-1 rounded z-10">
                  {prod.category}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 text-base leading-snug">
                {isRtl ? prod.nameAr : prod.nameEn}
              </h3>

              <p className="text-xs text-slate-600 leading-relaxed">
                {isRtl ? prod.shortDescAr : prod.shortDescEn}
              </p>

              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-1.5">
                {prod.hasUnknownSpecs ? (
                  <span className="text-amber-700 font-medium text-[11px] block">
                    {text.unknownSpecsNotice}
                  </span>
                ) : (
                  Object.entries(prod.specifications).map(([k, v], i) => (
                    <div key={i} className="flex justify-between text-slate-700">
                      <span className="text-slate-500 font-medium">{k}:</span>
                      <span className="font-bold text-slate-900">{v}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className="p-6 pt-0 flex gap-2">
              <button
                onClick={() => {
                  onSelectProductForQuote(isRtl ? prod.nameAr : prod.nameEn);
                  onNavigate('request-quote');
                }}
                className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-2 px-3 rounded-xl text-xs shadow text-center"
              >
                {text.btnRequestQuote}
              </button>

              <button
                onClick={() => onNavigate('tech-consultation')}
                className="bg-[#0B2E59] hover:bg-[#071A2B] text-sky-300 font-bold py-2 px-3 rounded-xl text-xs"
              >
                {text.btnGetConsultation}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
