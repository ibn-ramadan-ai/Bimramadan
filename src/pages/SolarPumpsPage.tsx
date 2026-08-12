import React from 'react';
import { Language, Product } from '../types';
import { getTranslation } from '../data/translations';
import { BrandPartnershipBar } from '../components/BrandPartnershipBar';
import { SafeImage } from '../components/SafeImage';
import { Droplets, FileText, Calculator, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, Wrench, Cpu, Compass } from 'lucide-react';

interface SolarPumpsPageProps {
  currentLang: Language;
  products: Product[];
  onNavigate: (page: string) => void;
  onSelectProductForQuote: (productName: string) => void;
}

export const SolarPumpsPage: React.FC<SolarPumpsPageProps> = ({
  currentLang,
  products,
  onNavigate,
  onSelectProductForQuote,
}) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const pumpProducts = products.filter(
    (p) => p.category === 'Solar Submersible Pumps' || p.category === 'Solar Surface Pumps'
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Brand Partnership Bar */}
      <BrandPartnershipBar variant="banner" isRtl={isRtl} />

      {/* Header */}
      <div className="bg-[#071A2B] text-white p-8 sm:p-12 rounded-3xl border border-blue-900 shadow-xl space-y-4">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
          <Droplets className="w-5 h-5" />
          <span>{isRtl ? 'أنظمة طلمبات المياه الشمسية' : 'Solar Water Pumping Systems'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {isRtl ? 'حلول طلمبات المياه الشمسية المتكاملة' : text.navSolarPumps}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {isRtl
            ? 'تقدم شركة بن رمضان Ai طلمبات مياه غاطسة وسطحية من أفضل العلامات العالمية مثل Shakti Pumps، مع تنفيذ كافة المراحل من الحسابات الهيدروليكية، التوريد، التركيب، الصيانة والدعم الفني.'
            : 'BIN RAMADAN Ai delivers high-efficiency solar submersible and surface centrifugal pumps from leading manufacturers like Shakti Pumps, backed by complete turnkey engineering, hydraulic calculations, and after-sales support.'}
        </p>
      </div>

      {/* Engineering & Services Process */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl border border-slate-800 shadow-xl space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-sky-300 border-b border-slate-800 pb-3">
          {isRtl ? 'خدمات بن رمضان Ai المتكاملة للمحطات' : 'BIN RAMADAN Ai Engineering & Service Lifecycle'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="space-y-2">
            <Compass className="w-8 h-8 text-sky-400" />
            <h3 className="font-bold text-sm text-white">{isRtl ? '١. الحسابات الهيدروليكية' : '1. Hydraulic Sizing'}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isRtl ? 'حساب العمق الديناميكي ومعدل التدفق (م³/ساعة) لتعيين القوة المطلوبة بالحصان والكيلوواط.' : 'Precise head and flow rate estimation for optimal HP sizing.'}
            </p>
          </div>

          <div className="space-y-2">
            <Cpu className="w-8 h-8 text-amber-400" />
            <h3 className="font-bold text-sm text-white">{isRtl ? '٢. الهندسة والتوريد' : '2. Engineering & Supply'}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isRtl ? 'اختيار الطلمبات المناسبة من مجموعة Shakti Pumps وتجميع لوحات VFD الشمسي.' : 'Selecting appropriate pump specs and MPPT inverter control units.'}
            </p>
          </div>

          <div className="space-y-2">
            <Wrench className="w-8 h-8 text-emerald-400" />
            <h3 className="font-bold text-sm text-white">{isRtl ? '٣. التركيب والتشغيل' : '3. On-Site Installation'}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isRtl ? 'تثبيت الألواح على الشاسيهات المجلفنة وإنزال الطلمبة بالآبار وتوصيل الكابلات المسلحة.' : 'Rigid mounting structure setup, cable drop, and commissioning.'}
            </p>
          </div>

          <div className="space-y-2">
            <ShieldCheck className="w-8 h-8 text-sky-400" />
            <h3 className="font-bold text-sm text-white">{isRtl ? '٤. الدعم والصيانة' : '4. After-Sales Support'}</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isRtl ? 'متابعة أداء المحطة وتوفير قطع الغيار الأصلية والصيانة السريعة بالفرع المقترح.' : 'Regular maintenance and technical support from our service hubs.'}
            </p>
          </div>
        </div>
      </div>

      {/* Key Technical Advantages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="font-bold text-slate-900 text-sm block">
            {isRtl ? 'طلمبات غاطسة استانلس ستيل' : '304/316 Stainless Steel Construction'}
          </span>
          <p className="text-xs text-slate-600">
            {isRtl
              ? 'مقاومة تامة للتآكل والملوحة بالأراضي الصحراوية للعمل المستمر بالآبار العميقة.'
              : 'Maximum corrosion resistance against high groundwater salinity in reclamation soils.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="font-bold text-slate-900 text-sm block">
            {isRtl ? 'أعماق حتى ٣٠٠+ متر' : 'Depths Up to 300+ Meters'}
          </span>
          <p className="text-xs text-slate-600">
            {isRtl
              ? 'مراحل هيدروليكية متعددة لرفع المياه من الأعماق الكبيرة بمعدلات تدفق عالية.'
              : 'Multi-stage hydraulic impellers delivering required m³/h output at high static head.'}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <span className="font-bold text-slate-900 text-sm block">
            {isRtl ? 'توافق مع أجهزة الري الحديث' : 'Pivot & Drip Network Compatible'}
          </span>
          <p className="text-xs text-slate-600">
            {isRtl
              ? 'ضغط هيدروليكي مستقر لتغذية أجهزة الري المحوري وشبكات التنقيط والرش.'
              : 'Constant pressure discharge feeding center pivots, drip networks, and reservoir basins.'}
          </p>
        </div>
      </div>

      {/* Products Showcase */}
      <div className="space-y-6">
        <h2 className="text-2xl font-black text-slate-900">
          {isRtl ? 'طلمبات الطاقة الشمسية المتاحة' : 'Featured Solar Pump Models'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pumpProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="p-6 space-y-4">
                <div className="relative h-56 bg-slate-100 rounded-xl overflow-hidden mb-4">
                  <SafeImage
                    src={prod.image}
                    alt={isRtl ? prod.nameAr : prod.nameEn}
                    category={prod.category}
                    showBrandedOverlay={true}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-[#071A2B] text-sky-300 text-[10px] font-bold px-2.5 py-1 rounded shadow z-10">
                    {prod.category}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-[10px]">
                  <span className="bg-amber-50 text-amber-800 border border-amber-200/80 font-black px-2.5 py-1 rounded inline-flex items-center gap-1">
                    <span>BIN RAMADAN Ai</span>
                    <span className="text-amber-600 font-mono font-bold">×</span>
                    <span>SHAKTI PUMPS</span>
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-lg">
                  {isRtl ? prod.nameAr : prod.nameEn}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isRtl ? prod.shortDescAr : prod.shortDescEn}
                </p>

                <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-center">
                  <span className="text-[11px] font-extrabold text-slate-700 block">
                    {isRtl ? 'السعر والتجهيزات المتاحة حسب الطلب' : 'Price & System Configuration Available Upon Request'}
                  </span>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-xs space-y-2">
                  <span className="font-bold text-slate-900 block border-b border-slate-200 pb-1">
                    {isRtl ? 'المواصفات الفنية' : 'Technical Specifications'}
                  </span>
                  {Object.entries(prod.specifications).map(([k, v], i) => (
                    <div key={i} className="flex justify-between text-slate-700">
                      <span className="text-slate-500 font-medium">{k}:</span>
                      <span className="font-bold text-slate-900">{v}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 pt-0 flex items-center gap-3">
                <button
                  onClick={() => {
                    onSelectProductForQuote(isRtl ? prod.nameAr : prod.nameEn);
                    onNavigate('request-quote');
                  }}
                  className="flex-1 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow text-center"
                >
                  {text.btnRequestQuote}
                </button>

                <button
                  onClick={() => onNavigate('tech-consultation')}
                  className="bg-[#0B2E59] hover:bg-[#071A2B] text-sky-300 font-bold py-2.5 px-4 rounded-xl text-xs"
                >
                  {text.btnGetConsultation}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* LEAD GENERATION & COMMERCIAL SELECTION ADVICE BANNER */}
        <div className="bg-gradient-to-r from-[#071A2B] via-[#0B2E59] to-[#071A2B] text-white p-6 sm:p-8 rounded-3xl border border-sky-500/40 shadow-xl space-y-6 mt-12">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-sky-800/60 pb-4">
            <div className="space-y-1">
              <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider inline-block">
                {isRtl ? 'عايز تعرف السعر المناسب لمشروعك؟' : 'Need the right quote for your project?'}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                {isRtl ? 'مش كل بئر محتاج نفس الطلمبة' : 'Every Borehole Requires Custom Engineering Sizing'}
              </h2>
            </div>
            <div className="bg-[#0B2E59] border border-amber-500/40 px-3 py-1.5 rounded-xl text-xs font-black text-amber-300">
              IBN RAMADAN SOLAR & SMART ENERGY × SHAKTI PUMPS
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed">
            <div className="space-y-3 bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60">
              <p className="text-slate-200 font-bold text-sm">
                {isRtl ? 'اختيار الطلمبة الصح يبدأ من بيانات مشروعك:' : 'Pump Selection Starts with Your Field Parameters:'}
              </p>
              <p className="text-slate-300">
                {isRtl
                  ? 'ابعتلنا بيانات البئر والتصرف المطلوب، وفريقنا الهندسي يساعدك في اختيار الحل المناسب من Shakti وتحديد السعر والتجهيزات والتكوين النهائي حسب متطلبات المشروع.'
                  : 'Send us your well parameters and required flow rate, and our team will help you select the right Shakti pump solution.'}
              </p>
              <div className="bg-blue-950/80 p-3 rounded-xl border border-blue-800/80 text-sky-200 font-medium space-y-1">
                <span className="font-black text-amber-400 block">{isRtl ? 'تواصل معنا للحصول على السعر والمواصفات والتجهيز المناسب:' : 'Contact Us for Pricing & System Specs:'}</span>
                <p className="text-[11px] text-slate-300">
                  {isRtl ? 'هاتف / واتساب: 010 2848 7811 | البريد الإلكتروني: saadramadan2026@gmail.com' : 'Phone / WhatsApp: 010 2848 7811 | Email: saadramadan2026@gmail.com'}
                </p>
              </div>
            </div>

            <div className="space-y-4 flex flex-col justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60">
              <div className="space-y-2">
                <span className="text-amber-400 font-extrabold text-sm block">
                  {isRtl ? 'طلب عرض سعر مباشر' : 'Direct Quotation Request'}
                </span>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {isRtl
                    ? 'سيقوم مهندسو الشركة بمراجعة العمق والرفع والتصرف وإعداد عرض سعر وتصميم هيدروليكي مخصص للمزرعة.'
                    : 'Our engineers will review your depth, head, and required flow rate to prepare a customized project quotation.'}
                </p>
              </div>

              <div className="space-y-2 pt-2">
                <button
                  onClick={() => onNavigate('request-quote')}
                  className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black py-3 px-4 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <span>{isRtl ? 'اطلب عرض السعر الآن' : 'REQUEST A QUOTATION'}</span>
                </button>

                <button
                  onClick={() => onNavigate('tech-consultation')}
                  className="w-full bg-[#0B2E59] hover:bg-[#071A2B] text-sky-300 font-extrabold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border border-sky-400/40"
                >
                  <span>{isRtl ? 'طلب استشارة فنية هيدروليكية' : 'Request Hydraulic Engineering Sizing'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
