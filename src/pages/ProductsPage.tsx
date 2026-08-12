import React, { useState } from 'react';
import { Language, Product } from '../types';
import { getTranslation } from '../data/translations';
import { BrandPartnershipBar } from '../components/BrandPartnershipBar';
import { SafeImage } from '../components/SafeImage';
import {
  Search,
  Filter,
  Droplets,
  FileText,
  Calculator,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  ShieldCheck,
  Building2,
  Sparkles,
  Info,
} from 'lucide-react';

interface ProductsPageProps {
  currentLang: Language;
  products: Product[];
  onNavigate: (page: string) => void;
  onSelectProductForQuote: (productName: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  currentLang,
  products,
  onNavigate,
  onSelectProductForQuote,
}) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);

  const categories = [
    { id: 'All', labelEn: 'All Products', labelAr: 'جميع المنتجات' },
    { id: 'Solar Submersible Pumps', labelEn: 'Solar Submersible (DCSSP)', labelAr: 'طلمبات غاطسة شمسية' },
    { id: 'Solar Surface Pumps', labelEn: 'Solar Surface (DCSMP)', labelAr: 'طلمبات سطحية شمسية' },
    { id: 'Solar Openwell Pumps', labelEn: 'Solar Openwell (DCSOP)', labelAr: 'طلمبات آبار مفتوحة' },
    { id: 'Solar Pump Controllers', labelEn: 'Solar Controllers & USPC', labelAr: 'وحدات تحكم بالضخ الشمسي' },
    { id: 'Inverters & Drives', labelEn: 'Inverters & Drives', labelAr: 'إنفرترات ومغيرات سرعة' },
    { id: 'AC & Multistage Pumps', labelEn: 'AC & Multistage Pumps', labelAr: 'طلمبات AC وطرد مركزي' },
    { id: 'PV Solar Modules', labelEn: 'PV Solar Modules', labelAr: 'ألواح شمسية' },
    { id: 'Solar Pumping Systems', labelEn: 'Solar Pumping Systems', labelAr: 'أنظمة ضخ شمسية متكاملة' },
    { id: 'Water Pump Accessories', labelEn: 'Pump Cables & Accessories', labelAr: 'كابلات وملحقات الطلمبات' },
    { id: 'Irrigation System Components', labelEn: 'Mounting & Structures', labelAr: 'هياكل وتجهيزات الري' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const nameToSearch = isRtl ? p.nameAr : p.nameEn;
    const descToSearch = isRtl ? p.shortDescAr : p.shortDescEn;
    const matchesSearch =
      nameToSearch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      descToSearch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuoteClick = (productName: string) => {
    onSelectProductForQuote(productName);
    onNavigate('request-quote');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Brand Partnership Banner */}
      <BrandPartnershipBar variant="banner" isRtl={isRtl} />

      {/* Page Header */}
      <div className="bg-[#071A2B] text-white p-8 rounded-3xl border border-blue-900 shadow-xl space-y-3 relative overflow-hidden">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
          <Droplets className="w-4 h-4" />
          <span>{isRtl ? 'المعدات والمنتجات' : 'Products & Technical Catalog'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {isRtl ? 'كتالوج المنتجات وطلمبات الطاقة الشمسية' : text.productsTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {isRtl
            ? 'طلمبات وحلول ضخ تعمل بالطاقة الشمسية ومعدات وأنظمة متكاملة للاستخدام الزراعي والمياه، مع تقديم الاستشارات الفنية والتصميم الهندسي بواسطة بن رمضان Ai.'
            : text.productsSub}
        </p>
      </div>

      {/* Search and Category Filter Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute top-3.5 left-3.5 rtl:left-auto rtl:right-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={text.searchProductsPlaceholder}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 rtl:pl-3 rtl:pr-10 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
            />
          </div>

          {/* Categories Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-[#0B2E59] text-sky-300 border border-sky-400/50 shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {isRtl ? cat.labelAr : cat.labelEn}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Cards Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-slate-400 mx-auto" />
          <h3 className="font-bold text-slate-800 text-base">
            {isRtl ? 'لم يتم العثور على منتجات مطابقة' : 'No products found matching search'}
          </h3>
          <p className="text-xs text-slate-500">
            {isRtl ? 'جرب البحث بكلمات مختلفة أو تغيير الفئة.' : 'Try adjusting search terms or filters.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  <SafeImage
                    src={prod.image}
                    alt={isRtl ? prod.nameAr : prod.nameEn}
                    category={prod.category}
                    showBrandedOverlay={true}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 rtl:right-auto rtl:left-3 bg-[#071A2B]/90 text-sky-300 text-[10px] font-bold px-2.5 py-1 rounded-md border border-blue-800 shadow z-10">
                    {prod.category}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Brand & Attribution Badge */}
                  <div className="flex flex-wrap items-center gap-2 text-[10px]">
                    <span className="bg-amber-50 text-amber-800 border border-amber-200 font-extrabold px-2 py-0.5 rounded">
                      {isRtl ? `العلامة المصنعة: ${prod.brandManufacturerAr || 'Shakti Pumps'}` : `Brand: ${prod.brandManufacturerEn || 'Shakti Pumps'}`}
                    </span>
                    <span className="bg-blue-50 text-blue-800 border border-blue-200 font-bold px-2 py-0.5 rounded">
                      {isRtl ? `مورد الحلول: ${prod.solutionProviderAr || 'BIN RAMADAN Ai'}` : `Provider: ${prod.solutionProviderEn || 'BIN RAMADAN Ai'}`}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug">
                    {isRtl ? prod.nameAr : prod.nameEn}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {isRtl ? prod.shortDescAr : prod.shortDescEn}
                  </p>

                  {/* Price Policy Badge */}
                  <div className="bg-slate-50 border border-slate-200 p-2 rounded-lg text-center">
                    <span className="text-[11px] font-extrabold text-slate-700 block">
                      {isRtl ? 'السعر والتجهيزات المتاحة حسب الطلب' : 'Price & System Configuration Available Upon Request'}
                    </span>
                  </div>

                  {/* Tech Specs Block */}
                  <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 text-xs space-y-2">
                    <span className="font-bold text-slate-900 text-[11px] uppercase tracking-wider block border-b border-slate-200 pb-1">
                      {isRtl ? 'المواصفات الفنية' : 'Technical Specifications'}
                    </span>

                    {prod.hasUnknownSpecs ? (
                      <div className="flex items-center gap-1.5 text-amber-700 bg-amber-50 p-2 rounded border border-amber-200 font-medium text-[11px]">
                        <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
                        <span>{text.unknownSpecsNotice}</span>
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {Object.entries(prod.specifications).slice(0, 3).map(([k, v], i) => (
                          <div key={i} className="flex justify-between items-center text-slate-700">
                            <span className="text-slate-500 font-medium text-[11px]">{k}:</span>
                            <span className="font-bold text-slate-900 text-[11px]">{v}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 space-y-2">
                <button
                  onClick={() => setSelectedProductModal(prod)}
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                >
                  <Info className="w-3.5 h-3.5 text-slate-600" />
                  <span>{isRtl ? 'عرض التفاصيل الهندسية الكاملة' : 'View Full Specifications'}</span>
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleQuoteClick(isRtl ? prod.nameAr : prod.nameEn)}
                    className="bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs shadow transition-all flex items-center justify-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'طلب سعر' : 'Quote'}</span>
                  </button>

                  <button
                    onClick={() => onNavigate('tech-consultation')}
                    className="bg-[#0B2E59] hover:bg-[#071A2B] text-sky-300 font-bold py-2.5 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <Calculator className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'استشارة' : 'Consult'}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LEAD GENERATION & COMMERCIAL SELECTION ADVICE BANNER */}
      <div className="bg-gradient-to-r from-[#071A2B] via-[#0B2E59] to-[#071A2B] text-white p-6 sm:p-8 rounded-3xl border border-sky-500/40 shadow-xl space-y-6">
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
                ? 'ابعتلنا بيانات البئر والتصرف المطلوب، وفريقنا الهندسي يساعدك في اختيار الحل المناسب والتجهيزات الدقيقة من منتجات Shakti Pumps.'
                : 'Send us your well parameters and required flow, and our engineering team will select the exact Shakti pump & inverter configuration.'}
            </p>
            <div className="bg-blue-950/80 p-3 rounded-xl border border-blue-800/80 text-sky-200 font-medium space-y-1">
              <span className="font-black text-amber-400 block">{isRtl ? 'البيانات المطلوبة لتقديم عرض السعر:' : 'Parameters to Provide:'}</span>
              <ul className="list-disc list-inside space-y-0.5 text-[11px]">
                <li>{isRtl ? 'عمق البئر ومستوى انخفاض المياه (Dynamic Head)' : 'Borehole Depth & Dynamic Water Level'}</li>
                <li>{isRtl ? 'التصرف المطلوب (متر مكعب/ساعة أو لتر/دقيقة)' : 'Required Flow Rate (m³/h or LPM)'}</li>
                <li>{isRtl ? 'نوع الري (تنقيط / رش / بيفوت / أحواض) وطول خط الطرد' : 'Irrigation Type & Main Pipeline Distance'}</li>
                <li>{isRtl ? 'مكان المشروع والمحافظة' : 'Project Location & Governorate'}</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4 flex flex-col justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-700/60">
            <div className="space-y-2">
              <span className="text-amber-400 font-extrabold text-sm block">
                {isRtl ? 'تنويه سياسة الأسعار وتجهيز المزارع:' : 'Commercial Pricing Policy Notice:'}
              </span>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {isRtl
                  ? 'السعر والتجهيزات والتكوين النهائي للمنظومة يتم تحديدها حسب متطلبات الموقع وقدرة المحرك المطلوب ونوع الألواح ومغير السرعة.'
                  : 'Final pricing and system setup are determined specifically based on site head, motor power rating, solar PV array capacity, and controller model.'}
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleQuoteClick(isRtl ? 'عرض سعر خاص لمشروع زراعي' : 'Custom Project Quote')}
                className="w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-black py-3 px-4 rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>{isRtl ? 'اطلب عرض السعر الآن' : 'REQUEST A QUOTATION'}</span>
              </button>

              <button
                onClick={() => onNavigate('tech-consultation')}
                className="w-full bg-[#0B2E59] hover:bg-[#071A2B] text-sky-300 font-extrabold py-2.5 px-4 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 border border-sky-400/40"
              >
                <Calculator className="w-4 h-4" />
                <span>{isRtl ? 'طلب استشارة فنية هيدروليكية' : 'Request Hydraulic Engineering Sizing'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT DETAIL MODAL */}
      {selectedProductModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 relative">
            <button
              onClick={() => setSelectedProductModal(null)}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 z-10 bg-slate-900/80 hover:bg-slate-900 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-64 bg-slate-900">
              <SafeImage
                src={selectedProductModal.image}
                alt={isRtl ? selectedProductModal.nameAr : selectedProductModal.nameEn}
                category={selectedProductModal.category}
                showBrandedOverlay={true}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#071A2B] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="bg-sky-500/90 text-slate-950 font-black text-[10px] uppercase px-2.5 py-0.5 rounded inline-block">
                  {selectedProductModal.category}
                </span>
                <h2 className="text-xl sm:text-2xl font-black">
                  {isRtl ? selectedProductModal.nameAr : selectedProductModal.nameEn}
                </h2>
              </div>
            </div>

            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
              {/* Prominent Co-Branding Banner */}
              <div className="bg-gradient-to-r from-[#071A2B] via-[#0B2E59] to-[#071A2B] p-4 rounded-2xl border border-sky-500/40 text-white space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sky-800/60 pb-2">
                  <span className="text-amber-400 font-black text-xs tracking-wider uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>BIN RAMADAN Ai × SHAKTI PUMPS</span>
                  </span>
                  {selectedProductModal.modelNumber && (
                    <span className="bg-sky-950/80 text-sky-300 font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-sky-700/50">
                      Model: {selectedProductModal.modelNumber}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 block font-medium text-[10px]">
                      {isRtl ? 'المُصنِّع والعلامة التجاربة' : 'Manufacturer & Brand'}
                    </span>
                    <span className="text-amber-300 font-extrabold text-xs">
                      {isRtl ? 'منتج من Shakti Pumps' : 'Product by Shakti Pumps'}
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-700/60">
                    <span className="text-slate-400 block font-medium text-[10px]">
                      {isRtl ? 'مورد الحلول والدعم الفني' : 'Solution & Technical Provider'}
                    </span>
                    <span className="text-sky-300 font-extrabold text-xs">
                      {isRtl ? 'يُقدَّم ويُدعم فنيًا بواسطة BIN RAMADAN Ai' : 'Presented & supported by BIN RAMADAN Ai'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Commercial & Price Policy Box */}
              <div className="bg-blue-50/80 border border-blue-200 p-4 rounded-2xl text-xs text-blue-900 space-y-1 shadow-sm">
                <span className="font-bold text-blue-950 block">
                  {isRtl ? 'سياسة الأسعار وتكوين المنظومة:' : 'Pricing & Commercial Policy:'}
                </span>
                <p className="text-[11px] leading-relaxed text-blue-800">
                  {isRtl
                    ? 'للحصول على السعر الحالي وتكوين النظام المناسب لمشروعك، تواصل معنا مع تقديم بيانات البئر والتصرف والرفع المطلوب.'
                    : 'Contact us for the latest price and the recommended system configuration for your project.'}
                </p>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-1">
                  {isRtl ? 'الوصف الهندسي للمنتج' : 'Product Overview'}
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-200">
                  {isRtl ? selectedProductModal.shortDescAr : selectedProductModal.shortDescEn}
                </p>
              </div>

              {/* Specifications */}
              <div className="space-y-2">
                <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-1">
                  {isRtl ? 'المواصفات الفنية المعتمدة' : 'Verified Technical Specifications'}
                </h3>
                {selectedProductModal.hasUnknownSpecs ? (
                  <div className="p-3 bg-amber-50 text-amber-800 rounded-xl border border-amber-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{text.unknownSpecsNotice}</span>
                  </div>
                ) : (
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
                    {Object.entries(selectedProductModal.specifications).map(([k, v], i) => (
                      <div key={i} className="flex justify-between items-center py-1 border-b border-slate-200/60 last:border-0">
                        <span className="text-slate-600 font-medium">{k}</span>
                        <span className="font-extrabold text-slate-900">{v}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Verified Catalog Performance Table */}
              {selectedProductModal.performanceTable && selectedProductModal.performanceTable.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-1">
                    <h3 className="font-bold text-slate-900 text-sm">
                      {isRtl ? 'جدول أداء الكتالوج المعتمد من الشركة المصنعة' : 'Manufacturer Catalog Performance Data'}
                    </h3>
                    <span className="text-[10px] bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded font-bold">
                      {isRtl ? 'بيانات كتالوج Shakti Pumps' : 'Catalog Testing Points'}
                    </span>
                  </div>

                  <div className="overflow-x-auto border border-slate-200 rounded-2xl shadow-sm">
                    <table className="w-full text-xs text-center border-collapse">
                      <thead>
                        <tr className="bg-[#071A2B] text-sky-200 font-bold">
                          <th className="p-2.5 border-b border-slate-700 text-right rtl:text-right ltr:text-left">
                            {isRtl ? 'قدرة الألواح (Wp)' : 'Solar Input (Wp)'}
                          </th>
                          <th className="p-2.5 border-b border-slate-700">5m Head</th>
                          <th className="p-2.5 border-b border-slate-700">8m Head</th>
                          <th className="p-2.5 border-b border-slate-700">10m Head (Duty)</th>
                          <th className="p-2.5 border-b border-slate-700">12m Head</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedProductModal.performanceTable.map((pt, idx) => {
                          const f5 = pt.headFlows.find((h) => h.headMeters === 5)?.flowLpm;
                          const f8 = pt.headFlows.find((h) => h.headMeters === 8)?.flowLpm;
                          const f10 = pt.headFlows.find((h) => h.headMeters === 10)?.flowLpm;
                          const f12 = pt.headFlows.find((h) => h.headMeters === 12)?.flowLpm;
                          return (
                            <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                              <td className="p-2.5 font-black text-slate-900 border-b border-slate-200 text-right rtl:text-right ltr:text-left bg-slate-100/60">
                                {pt.solarPowerWp} Wp
                              </td>
                              <td className="p-2.5 border-b border-slate-200 font-bold text-slate-800">
                                {f5 ? `${f5} LPM` : '-'}
                              </td>
                              <td className="p-2.5 border-b border-slate-200 font-bold text-slate-800">
                                {f8 ? `${f8} LPM` : '-'}
                              </td>
                              <td className="p-2.5 border-b border-slate-200 font-black text-sky-700 bg-sky-50/60">
                                {f10 ? `${f10} LPM` : '-'}
                              </td>
                              <td className="p-2.5 border-b border-slate-200 font-bold text-slate-800">
                                {f12 ? `${f12} LPM` : '-'}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Applications */}
              {selectedProductModal.applicationsAr && selectedProductModal.applicationsAr.length > 0 && (
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm border-b border-slate-100 pb-1">
                    {isRtl ? 'التطبيقات والمجالات' : 'Applications'}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {(isRtl ? selectedProductModal.applicationsAr : selectedProductModal.applicationsEn)?.map((app, i) => (
                      <div key={i} className="flex items-center gap-2 text-slate-700 bg-sky-50/50 p-2 rounded-lg border border-sky-100">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Engineering Selection Disclaimer Note */}
              <div className="bg-amber-50/90 border border-amber-200 p-4 rounded-2xl text-xs text-amber-900 space-y-1.5 shadow-sm">
                <div className="flex items-center gap-1.5 font-extrabold text-amber-800">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{isRtl ? 'ملاحظة اختيار المنظومة والتصميم الهندسي' : 'Engineering Selection & Field Disclaimer'}</span>
                </div>
                <p className="text-[11px] leading-relaxed text-amber-800">
                  {isRtl
                    ? (selectedProductModal.engineeringDisclaimerAr || 'بيانات الأداء المعروضة مأخوذة من بيانات الشركة المصنعة، والاختيار النهائي للطلمبة ومنظومة الطاقة الشمسية يجب أن يتم بناءً على بيانات البئر والتصرف المطلوب والرفع الكلي والفواقد وظروف الموقع.')
                    : (selectedProductModal.engineeringDisclaimerEn || 'Performance data displayed is extracted from manufacturer catalog testing. Final selection of the pump and solar PV generator system must be based on verified well data, required flow rate, total dynamic head, system friction losses, and site conditions.')}
                </p>
              </div>
            </div>

            {/* Modal Actions - 3 Prominent CTAs */}
            <div className="p-6 bg-slate-50 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {/* 1. Request Quotation */}
              <button
                onClick={() => {
                  setSelectedProductModal(null);
                  handleQuoteClick(isRtl ? selectedProductModal.nameAr : selectedProductModal.nameEn);
                }}
                className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-black py-3 px-3 rounded-xl text-xs shadow transition-all flex items-center justify-center gap-1.5"
              >
                <FileText className="w-4 h-4 shrink-0" />
                <span>{isRtl ? 'اطلب عرض سعر' : 'Request Quotation'}</span>
              </button>

              {/* 2. Technical Consultation */}
              <button
                onClick={() => {
                  setSelectedProductModal(null);
                  onNavigate('tech-consultation');
                }}
                className="bg-[#0B2E59] hover:bg-[#071A2B] text-sky-300 font-extrabold py-3 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 border border-sky-400/30"
              >
                <Calculator className="w-4 h-4 shrink-0" />
                <span>{isRtl ? 'اطلب استشارة هندسية' : 'Engineering Consultation'}</span>
              </button>

              {/* 3. WhatsApp Contact */}
              <a
                href={`https://wa.me/201028487811?text=${encodeURIComponent(
                  isRtl
                    ? `السلام عليكم، أود الاستفسار عن ${selectedProductModal.nameAr} - بن رمضان Ai × Shakti Pumps`
                    : `Hello, I would like to inquire about ${selectedProductModal.nameEn} - BIN RAMADAN Ai × Shakti Pumps`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-3 px-3 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 shadow"
              >
                <Building2 className="w-4 h-4 shrink-0" />
                <span>{isRtl ? 'تواصل عبر WhatsApp' : 'Contact via WhatsApp'}</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
