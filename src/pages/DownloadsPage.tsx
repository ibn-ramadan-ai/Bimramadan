import React, { useState, useMemo } from 'react';
import { Language, DocumentItem } from '../types';
import { getTranslation } from '../data/translations';
import { BRAND_CONFIG } from '../config/brand';
import {
  Download,
  FileText,
  Eye,
  CheckCircle2,
  Search,
  Filter,
  ShieldAlert,
  ExternalLink,
  Layers,
  Zap,
  BookOpen,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Printer,
  MessageSquare,
  Building2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface DownloadsPageProps {
  currentLang: Language;
  documents: DocumentItem[];
  onNavigate?: (page: string) => void;
  onSelectProductForQuote?: (productName: string) => void;
}

export const DownloadsPage: React.FC<DownloadsPageProps> = ({
  currentLang,
  documents,
  onNavigate,
  onSelectProductForQuote,
}) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  // Local state
  const [selectedCategory, setSelectedCategory] = useState<number>(0); // 0 = All
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [downloadedDoc, setDownloadedDoc] = useState<string | null>(null);

  // Interactive PDF Viewer Modal state
  const [previewDoc, setPreviewDoc] = useState<DocumentItem | null>(null);
  const [previewPage, setPreviewPage] = useState<number>(1);
  const [zoomLevel, setZoomLevel] = useState<number>(100);

  // Document list with dynamic analytics view/download tracking
  const [docList, setDocList] = useState<DocumentItem[]>(documents);

  // Categories list (Phase 3 requirements)
  const categories = [
    { id: 0, ar: 'جميع المستندات والكتالوجات', en: 'All Documents & Catalogs' },
    { id: 1, ar: 'أولاً — طلمبات غاطسة شمسية', en: '1. Solar Submersible Pumps' },
    { id: 2, ar: 'ثانيًا — طلمبات سطحية', en: '2. Solar Surface Pumps' },
    { id: 3, ar: 'ثالثًا — أنظمة الضخ بالطاقة الشمسية', en: '3. Solar Pumping Systems' },
    { id: 4, ar: 'رابعًا — وحدات التحكم والإنفرتر', en: '4. Pump Controllers & Inverters' },
    { id: 5, ar: 'خامسًا — ألواح الطاقة الشمسية', en: '5. PV Solar Modules' },
    { id: 6, ar: 'سادسًا — الحلول الزراعية', en: '6. Agricultural Solutions' },
    { id: 7, ar: 'سابعًا — الخدمات الهندسية', en: '7. Engineering Services' },
  ];

  // Filtered documents calculation
  const filteredDocs = useMemo(() => {
    return docList.filter((doc) => {
      const matchesCategory =
        selectedCategory === 0 || doc.categoryNumber === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        doc.titleAr.toLowerCase().includes(q) ||
        doc.titleEn.toLowerCase().includes(q) ||
        doc.descriptionAr.toLowerCase().includes(q) ||
        doc.descriptionEn.toLowerCase().includes(q) ||
        (doc.modelNumber && doc.modelNumber.toLowerCase().includes(q)) ||
        doc.categoryAr.toLowerCase().includes(q) ||
        doc.categoryEn.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [docList, selectedCategory, searchQuery]);

  // Handle Download Action
  const handleDownload = (doc: DocumentItem) => {
    const title = isRtl ? doc.titleAr : doc.titleEn;
    setDownloadedDoc(title);
    setTimeout(() => setDownloadedDoc(null), 4000);

    // Update download count
    setDocList((prev) =>
      prev.map((item) =>
        item.id === doc.id
          ? { ...item, downloadCount: (item.downloadCount || 0) + 1 }
          : item
      )
    );

    // Trigger dummy PDF file download simulation
    const link = document.createElement('a');
    link.href = '#download-' + doc.id;
    link.setAttribute('download', `${doc.id}-${doc.titleEn.replace(/\s+/g, '_')}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Open Preview Modal
  const handleOpenPreview = (doc: DocumentItem) => {
    setPreviewDoc(doc);
    setPreviewPage(1);
    setZoomLevel(100);

    // Increment view count
    setDocList((prev) =>
      prev.map((item) =>
        item.id === doc.id
          ? { ...item, viewCount: (item.viewCount || 0) + 1 }
          : item
      )
    );
  };

  // Handle Request Quote Redirection
  const handleRequestQuote = (doc: DocumentItem) => {
    const name = isRtl ? doc.titleAr : doc.titleEn;
    if (onSelectProductForQuote) {
      onSelectProductForQuote(name);
    }
    if (onNavigate) {
      onNavigate('request-quote');
    }
  };

  // Handle Tech Consultation Redirection
  const handleConsultation = () => {
    if (onNavigate) {
      onNavigate('tech-consultation');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* 1. Page Header Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#071A2B] via-[#0B2E59] to-[#08223d] text-white p-8 sm:p-12 rounded-3xl border border-blue-900/60 shadow-2xl space-y-6">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-300"></div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-sky-300 font-extrabold text-xs uppercase tracking-wider bg-sky-950/80 px-3.5 py-1.5 rounded-full border border-sky-800/50">
            <BookOpen className="w-4 h-4 text-sky-400" />
            <span>
              {isRtl ? 'المكتبة الهندسية المعتمدة' : 'Official Engineering Portal'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-300">
            <span className="flex items-center gap-1 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              {isRtl ? 'تحديثات ٢٠٢٦' : '2026 Edition'}
            </span>
            <span className="flex items-center gap-1 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              {isRtl ? '٧ قطاعات تخصصية' : '7 Core Categories'}
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {isRtl ? 'الكتالوجات والملفات الفنية' : 'CATALOGS & TECHNICAL DOCUMENTS'}
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-4xl leading-relaxed">
            {isRtl
              ? 'المكتبة الهندسية الشاملة لشركة BIN RAMADAN Ai — تصفح وحمّل كتالوجات طلمبات الطاقة الشمسية، نشرات المواصفات الفنية، مغيرات السرعة والإنفرتر، وأدلة الحلول الزراعية للآبار الجوفية في مصر.'
              : 'BIN RAMADAN Ai comprehensive engineering documents — Browse and download solar pump catalogs, technical datasheets, MPPT inverter manuals, and agricultural irrigation solution guides.'}
          </p>
        </div>

        {/* Live Search & Quick Filter Input */}
        <div className="pt-2 flex flex-col sm:flex-row gap-4 max-w-3xl">
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                isRtl
                  ? 'ابحث باسم الكتالوج، الموديل (مثل: BRP-S100, SHK-4OS)، أو القطاع...'
                  : 'Search by document title, model number (e.g. SHK-4OS, BRP-S100), or category...'
              }
              className="w-full bg-slate-900/90 border border-slate-700 text-white placeholder-slate-400 text-sm rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute left-3 top-3 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Download Notification Toast */}
      {downloadedDoc && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-900 p-4 rounded-2xl flex items-center gap-3 text-sm font-bold shadow-md animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            {isRtl
              ? `بدأ تحميل الملف الهندسي: "${downloadedDoc}" بنجاح!`
              : `Downloading document: "${downloadedDoc}" successfully!`}
          </span>
        </div>
      )}

      {/* 3. Category Filter Tabs Bar (7 Categories as requested in Phase 3) */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 uppercase tracking-wider">
          <Filter className="w-4 h-4 text-sky-600" />
          <span>{isRtl ? 'تصفية حسب القطاع والتخصص' : 'Filter by Category & Sector'}</span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all border flex items-center gap-2 shadow-sm ${
                  isActive
                    ? 'bg-[#0B2E59] text-white border-[#0B2E59] shadow-md ring-2 ring-sky-400/30'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span>{isRtl ? cat.ar : cat.en}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Phase 10 Engineering Disclaimer Banner */}
      <div className="bg-amber-50/90 border border-amber-300/80 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-amber-950 text-xs sm:text-sm leading-relaxed shadow-sm">
        <div className="p-2.5 bg-amber-100 rounded-xl shrink-0 text-amber-800">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <span className="font-black text-amber-900 block text-sm">
            {isRtl ? 'إخلاء مسؤولية هندسي وتنويه فني هام' : 'Engineering Disclaimer Notice'}
          </span>
          <p className="text-slate-800">
            {isRtl
              ? 'النتائج والمعلومات الفنية المعروضة لأغراض مبدئية وإرشادية، ويجب مراجعتها واعتمادها من خلال مهندس مختص من BIN RAMADAN Ai بعد دراسة الموقع والبيانات الفعلية.'
              : 'Technical results and information are preliminary and for guidance only. Final recommendations should be reviewed and approved by a BIN RAMADAN Ai engineer after evaluating the actual site conditions and technical data.'}
          </p>
        </div>
      </div>

      {/* 5. Documents Grid Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
          <span>
            {isRtl
              ? `تم العثور على (${filteredDocs.length}) مستند هندسي`
              : `Found (${filteredDocs.length}) engineering documents`}
          </span>
          {selectedCategory !== 0 && (
            <button
              onClick={() => setSelectedCategory(0)}
              className="text-sky-600 font-bold hover:underline"
            >
              {isRtl ? 'عرض جميع القطاعات' : 'Show All Sectors'}
            </button>
          )}
        </div>

        {filteredDocs.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-300 text-center space-y-4">
            <FileText className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="font-bold text-slate-800 text-lg">
              {isRtl
                ? 'لا توجد مستندات تطابق معايير البحث الحالية'
                : 'No documents match your search criteria'}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              {isRtl
                ? 'يرجى تغيير كلمة البحث أو اختيار قطاع آخر من قائمة التصفية أعلاه.'
                : 'Please clear your search query or select another category filter above.'}
            </p>
            <button
              onClick={() => {
                setSelectedCategory(0);
                setSearchQuery('');
              }}
              className="bg-sky-50 text-sky-700 hover:bg-sky-100 font-bold px-5 py-2.5 rounded-xl text-xs transition-colors"
            >
              {isRtl ? 'إعادة ضبط البحث' : 'Reset Search'}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredDocs.map((doc) => {
              const isShaktiShared =
                doc.brandPresentation === 'SHAKTI_BIN_RAMADAN_SHARED';

              return (
                <div
                  key={doc.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Top Bar / Category & Type Header */}
                  <div className="p-6 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <span className="bg-sky-100/80 text-sky-900 text-[11px] font-black px-3 py-1 rounded-lg">
                        {isRtl ? doc.categoryAr : doc.categoryEn}
                      </span>

                      <div className="flex items-center gap-2">
                        {doc.modelNumber && (
                          <span className="bg-slate-100 text-slate-700 font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-md border border-slate-200">
                            {doc.modelNumber}
                          </span>
                        )}
                        <span className="bg-slate-900 text-white font-mono text-[10px] font-bold px-2 py-0.5 rounded">
                          {doc.fileType}
                        </span>
                      </div>
                    </div>

                    {/* Co-Branding Header Banner (Phase 4 Specification) */}
                    {isShaktiShared ? (
                      <div className="bg-gradient-to-r from-blue-900 via-sky-900 to-slate-900 text-white p-3 rounded-2xl border border-blue-800/80 space-y-1">
                        <div className="flex items-center justify-between text-xs font-bold">
                          <span className="text-sky-300 font-black tracking-wide">
                            {BRAND_CONFIG.nameEn}
                          </span>
                          <span className="text-slate-300 text-[10px] font-mono">
                            ×
                          </span>
                          <span className="text-amber-300 font-black tracking-wide">
                            SHAKTI PUMPS
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-200 leading-tight">
                          {isRtl
                            ? 'منتجات وحلول فنية مختارة من Shakti Pumps، يتم تقديمها ودعمها محليًا من خلال BIN RAMADAN Ai.'
                            : 'Selected products and technical solutions from Shakti Pumps, presented and supported locally by BIN RAMADAN Ai.'}
                        </p>
                      </div>
                    ) : (
                      <div className="bg-slate-50 border border-slate-200 p-2.5 rounded-xl flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-sky-600" />
                          <span className="font-black text-slate-800">
                            {BRAND_CONFIG.nameEn} • {BRAND_CONFIG.taglineAr}
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-medium">
                          {isRtl ? 'مستند ميكانيكي معتمد' : 'Approved Document'}
                        </span>
                      </div>
                    )}

                    {/* Document Title & Description */}
                    <div className="space-y-2">
                      <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-sky-600 transition-colors">
                        {isRtl ? doc.titleAr : doc.titleEn}
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {isRtl ? doc.descriptionAr : doc.descriptionEn}
                      </p>
                    </div>

                    {/* Technical Specifications Grid / Fallback */}
                    <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-2">
                      <div className="text-[11px] font-bold text-slate-700 flex items-center justify-between border-b border-slate-200/80 pb-1.5">
                        <span>{isRtl ? 'المواصفات الفنية المعتمدة' : 'Technical Specifications'}</span>
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                      </div>

                      {doc.hasUnknownSpecs || !doc.specifications ? (
                        <p className="text-xs text-slate-400 italic py-1">
                          {isRtl
                            ? 'غير متوفر في البيانات الحالية'
                            : 'Not specified in the available document.'}
                        </p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {Object.entries(doc.specifications).map(([key, val]) => (
                            <div key={key} className="flex items-start justify-between gap-1 text-[11px]">
                              <span className="text-slate-500 shrink-0 font-medium">{key}:</span>
                              <span className="font-bold text-slate-800 text-right">{val}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Bottom Meta & CTAs Bar */}
                  <div className="p-6 bg-slate-50/80 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                      <span>حجم الملف: {doc.fileSize}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5 text-slate-400" />
                          {doc.viewCount || 120}
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-3.5 h-3.5 text-slate-400" />
                          {doc.downloadCount || 45}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                      {/* Preview Button */}
                      <button
                        onClick={() => handleOpenPreview(doc)}
                        className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <Eye className="w-4 h-4 text-sky-600" />
                        <span>{isRtl ? 'معاينة' : 'Preview'}</span>
                      </button>

                      {/* Download Button */}
                      <button
                        onClick={() => handleDownload(doc)}
                        className="bg-sky-600 hover:bg-sky-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <Download className="w-4 h-4" />
                        <span>{isRtl ? 'تحميل' : 'Download'}</span>
                      </button>

                      {/* Request Quote Button */}
                      <button
                        onClick={() => handleRequestQuote(doc)}
                        className="bg-[#0B2E59] hover:bg-blue-800 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <span>{isRtl ? 'طلب سعر' : 'Quote'}</span>
                      </button>

                      {/* Consultation Button */}
                      <button
                        onClick={handleConsultation}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <span>{isRtl ? 'استشارة' : 'Consult'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 6. Interactive Arabic-First Document Reader & Preview Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden border border-slate-200 flex flex-col max-h-[92vh]">
            {/* Modal Top Header Bar */}
            <div className="bg-[#071A2B] text-white p-4 sm:p-5 flex items-center justify-between gap-4 border-b border-blue-900">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-[10px] text-sky-300 font-mono">
                  <span>
                    {previewDoc.brandPresentation === 'SHAKTI_BIN_RAMADAN_SHARED'
                      ? 'SHAKTI PUMPS × BIN RAMADAN Ai'
                      : 'BIN RAMADAN Ai OFFICIAL TECHNICAL DOCUMENT'}
                  </span>
                  <span>•</span>
                  <span>{previewDoc.modelNumber || 'BRA-DOC'}</span>
                </div>
                <h2 className="font-extrabold text-white text-sm sm:text-base line-clamp-1">
                  {isRtl ? previewDoc.titleAr : previewDoc.titleEn}
                </h2>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center bg-slate-800 rounded-xl p-1 text-slate-300">
                  <button
                    onClick={() => setZoomLevel((z) => Math.max(70, z - 15))}
                    className="p-1.5 hover:text-white"
                    title="Zoom Out"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </button>
                  <span className="text-xs font-mono px-2">{zoomLevel}%</span>
                  <button
                    onClick={() => setZoomLevel((z) => Math.min(150, z + 15))}
                    className="p-1.5 hover:text-white"
                    title="Zoom In"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setZoomLevel(100)}
                    className="p-1.5 hover:text-white border-l border-slate-700 ml-1 pl-1.5"
                    title="Reset Zoom"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => setPreviewDoc(null)}
                  className="bg-slate-800 hover:bg-slate-700 p-2 rounded-xl text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Content Canvas Area */}
            <div className="flex-1 overflow-y-auto bg-slate-200/80 p-4 sm:p-8 flex justify-center">
              <div
                style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
                className="bg-white w-full max-w-3xl min-h-[600px] shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-300 space-y-8 transition-transform duration-200"
              >
                {/* Document Page Header inside canvas */}
                <div className="border-b-2 border-slate-900 pb-4 flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-xl font-black text-slate-900">
                      {previewDoc.brandPresentation === 'SHAKTI_BIN_RAMADAN_SHARED'
                        ? 'BIN RAMADAN Ai × SHAKTI PUMPS'
                        : 'BIN RAMADAN Ai'}
                    </div>
                    <div className="text-xs text-sky-700 font-bold">
                      {BRAND_CONFIG.taglineAr} • {BRAND_CONFIG.taglineEn}
                    </div>
                  </div>
                  <div className="text-right text-xs text-slate-500 font-mono">
                    <div>DATE: {previewDoc.uploadDate}</div>
                    <div>REV: {previewDoc.revisionYear || '2026'}</div>
                  </div>
                </div>

                {/* Shared Shakti Disclaimer in Canvas if Applicable */}
                {previewDoc.brandPresentation === 'SHAKTI_BIN_RAMADAN_SHARED' && (
                  <div className="bg-sky-50 border-r-4 border-sky-600 p-3 rounded text-xs text-sky-950 font-medium">
                    {isRtl
                      ? 'منتجات وحلول فنية مختارة من Shakti Pumps، يتم تقديمها ودعمها محليًا من خلال BIN RAMADAN Ai.'
                      : 'Selected products and technical solutions from Shakti Pumps, presented and supported locally by BIN RAMADAN Ai.'}
                  </div>
                )}

                {/* PAGE 1 CONTENT */}
                {previewPage === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2 text-center py-6 border-b border-slate-200">
                      <span className="inline-block bg-sky-100 text-sky-800 font-bold text-xs px-3 py-1 rounded-full">
                        {isRtl ? previewDoc.categoryAr : previewDoc.categoryEn}
                      </span>
                      <h1 className="text-2xl font-black text-slate-900">
                        {isRtl ? previewDoc.titleAr : previewDoc.titleEn}
                      </h1>
                      <p className="text-sm text-slate-600 max-w-xl mx-auto">
                        {isRtl ? previewDoc.descriptionAr : previewDoc.descriptionEn}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <h3 className="font-extrabold text-slate-900 text-sm">
                        {isRtl ? 'المواصفات الفنية والهيدروليكية الرئيسية' : 'Key Specifications'}
                      </h3>
                      <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                        {previewDoc.specifications &&
                          Object.entries(previewDoc.specifications).map(([k, v]) => (
                            <div key={k} className="flex justify-between text-xs py-1 border-b border-slate-200/60 last:border-0">
                              <span className="text-slate-600 font-medium">{k}:</span>
                              <span className="font-bold text-slate-900">{v}</span>
                            </div>
                          ))}
                      </div>
                    </div>

                    <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-[11px] text-amber-900">
                      <strong>{isRtl ? 'ملاحظة:' : 'Notice:'}</strong>{' '}
                      {isRtl
                        ? 'النتائج والمعلومات الفنية المعروضة لأغراض مبدئية وإرشادية، ويجب مراجعتها واعتمادها من خلال مهندس مختص من BIN RAMADAN Ai.'
                        : 'Technical results are preliminary and for guidance only. Final recommendations must be approved by a BIN RAMADAN Ai engineer.'}
                    </div>
                  </div>
                )}

                {/* PAGE 2 CONTENT */}
                {previewPage === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-black text-slate-900 border-b pb-2">
                      {isRtl ? 'منحنيات الأداء الهيدروليكي والكفاءة' : 'Hydraulic Performance & Efficiency Curves'}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {isRtl
                        ? 'توضح هذه الصفحة العلاقة الميكانيكية بين معدل التدفق (م³/ساعة) والعمق الهيدروليكي (متر) بالنسبة للقدرات الكهربية المتوفرة بالألواح الشمسية.'
                        : 'This page illustrates the mechanical flow rate vs. hydraulic total head curves under operating PV solar irradiance conditions.'}
                    </p>

                    <div className="bg-slate-900 text-sky-400 p-6 rounded-2xl border border-slate-800 text-center font-mono text-xs space-y-2">
                      <Zap className="w-8 h-8 text-amber-400 mx-auto" />
                      <div>[ HYDRAULIC PERFORMANCE MATRIX & SOLAR RADIATION CURVES ]</div>
                      <div className="text-slate-400 text-[10px]">
                        OPTIMIZED FOR EGYPTIAN DESERT RECLAMATION GROUNDWATER SITES
                      </div>
                    </div>
                  </div>
                )}

                {/* PAGE 3 CONTENT */}
                {previewPage === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-black text-slate-900 border-b pb-2">
                      {isRtl ? 'دليل التركيب والتوصيل والبرمجة' : 'Installation, Wiring & Programming Guide'}
                    </h3>
                    <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <strong className="text-slate-900 block">
                          1. {isRtl ? 'مخطط التوصيل الكهربائي (DC/AC Wiring):' : 'DC/AC Wiring Protocol:'}
                        </strong>
                        <p>
                          {isRtl
                            ? 'توصيل مصفوفات الألواح مع قواطع الحماية DC Breakers والتأريض مع إنفرتر الضخ.'
                            : 'Connect solar PV arrays with DC circuit breakers and surge protection before entering the MPPT inverter.'}
                        </p>
                      </div>

                      <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                        <strong className="text-slate-900 block">
                          2. {isRtl ? 'حماية التشغيل الجاف بدون حساسية:' : 'Sensorless Dry-Run Protection:'}
                        </strong>
                        <p>
                          {isRtl
                            ? 'معايرة أمبير الحمل الأدنى لإيقاف الطلمبة تلقائيًا عند هبوط منسوب الماء بالبئر.'
                            : 'Calibrate lower current threshold to automatically stop pump on groundwater level drop.'}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* PAGE 4 CONTENT */}
                {previewPage === 4 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-black text-slate-900 border-b pb-2">
                      {isRtl ? 'التطبيقات الميدانية ومراكز الخدمة' : 'Field Applications & Service Scope'}
                    </h3>

                    <div className="bg-sky-50 p-4 rounded-xl border border-sky-200 space-y-2 text-xs text-slate-800">
                      <div className="font-bold text-sky-900">
                        {isRtl ? 'تغطية المشروعات والخدمات الميدانية:' : 'Regional Service Scope:'}
                      </div>
                      <p>
                        {isRtl
                          ? 'الدراسات الهندسية والمناظرة الميدانية تغطي مشروعات الاستصلاح الزراعي في: وادي النطرون، مدينة السادات، مدينة بدر، والمناطق المجاورة.'
                          : 'Engineering studies and field inspections covering: Wadi El Natrun, Sadat City, Badr City, and surrounding farming areas.'}
                      </p>

                      <div className="pt-2 border-t border-sky-200/80 flex flex-wrap gap-4 text-[11px] font-bold text-sky-950">
                        <span>HEAD OFFICE: Alexandria, Egypt</span>
                        <span>PROPOSED BRANCH: Qaryat Al Najah, Egypt</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Document Footer inside canvas */}
                <div className="border-t border-slate-200 pt-4 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>CONFIDENTIAL • BIN RAMADAN Ai</span>
                  <span>
                    PAGE {previewPage} OF 4
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Bottom Pagination & Actions Bar */}
            <div className="bg-slate-900 text-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
              {/* Page Navigator */}
              <div className="flex items-center gap-2 text-xs">
                <button
                  disabled={previewPage <= 1}
                  onClick={() => setPreviewPage((p) => p - 1)}
                  className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 p-2 rounded-xl text-white transition-colors"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <span className="font-mono px-2">
                  {isRtl ? `صفحة ${previewPage} من ٤` : `Page ${previewPage} of 4`}
                </span>
                <button
                  disabled={previewPage >= 4}
                  onClick={() => setPreviewPage((p) => p + 1)}
                  className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 p-2 rounded-xl text-white transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Bottom CTAs */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    handleDownload(previewDoc);
                  }}
                  className="bg-sky-600 hover:bg-sky-500 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow"
                >
                  <Download className="w-4 h-4" />
                  <span>{isRtl ? 'تحميل المستند' : 'Download PDF'}</span>
                </button>

                <button
                  onClick={() => {
                    setPreviewDoc(null);
                    handleRequestQuote(previewDoc);
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow"
                >
                  <span>{isRtl ? 'طلب عرض سعر للمعدة' : 'Request Quote'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. Call to Action Footer Box for Farm Owners */}
      <div className="bg-gradient-to-r from-[#0B2E59] to-[#071A2B] text-white p-8 sm:p-12 rounded-3xl border border-blue-900 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-2xl text-center md:text-right">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            {isRtl
              ? 'هل تحتاج استشارة هندسية خاصة بمشروعك الزراعي؟'
              : 'Need a Custom Engineering Assessment for Your Farm?'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {isRtl
              ? 'يقوم فريق مهندسي بن رمضان Ai بتحليل عمق البئر، تصرف المياه المطلوب، وموقع المزرعة لتقديم الدراسة الهندسية وتحديد القدرة الكهروميكانيكية المثالية.'
              : 'Our engineering team analyzes well depth, required water flow, and farm location to deliver a customized solar pumping specification.'}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={handleConsultation}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-black px-6 py-3.5 rounded-2xl text-sm shadow-lg flex items-center justify-center gap-2 transition-all"
          >
            <span>{isRtl ? 'طلب معاينة موقع وبئر' : 'Request Site Inspection'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
