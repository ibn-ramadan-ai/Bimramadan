import React, { useState, useEffect } from 'react';
import { Language, QuotationRequest } from '../types';
import { getTranslation } from '../data/translations';
import { api } from '../services/api';
import { FileText, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

interface QuotationRequestPageProps {
  currentLang: Language;
  prefilledProductName?: string;
  onNavigate: (page: string) => void;
}

export const QuotationRequestPage: React.FC<QuotationRequestPageProps> = ({
  currentLang,
  prefilledProductName,
  onNavigate,
}) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  const [formData, setFormData] = useState({
    customerName: '',
    companyName: '',
    phone: '',
    email: '',
    whatsapp: '',
    location: 'Wadi El Natrun (وادي النطرون)',
    productOrService: prefilledProductName || 'Shakti Solar Pumping Station',
    requiredQuantity: '1 Station',
    wellDepthMeters: '',
    waterLevelMeters: '',
    requiredFlowRate: '',
    operatingHoursPerDay: '',
    irrigationType: 'Drip Irrigation (الري بالتنقيط)',
    wellDiameterInches: '8 Inch',
    deliveryPipeLengthMeters: '',
    currentPumpDetails: '',
    projectDescription: '',
    additionalNotes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<{ referenceNo: string; data: QuotationRequest } | null>(null);

  useEffect(() => {
    if (prefilledProductName) {
      setFormData((prev) => ({ ...prev, productOrService: prefilledProductName }));
    }
  }, [prefilledProductName]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.submitQuoteRequest(formData);
      setSuccessResult(res);
    } catch (err) {
      console.error('Submission failed', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#071A2B] text-white p-8 rounded-2xl border border-blue-900 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
            <FileText className="w-5 h-5 text-sky-400" />
            <span>{isRtl ? 'عرض سعر رسمي للمعدات' : 'Official Pricing Quotation'}</span>
          </div>
          <div className="bg-[#0B2E59] border border-amber-500/40 px-3 py-1 rounded-xl text-xs font-black text-white shadow-sm flex items-center gap-1.5">
            <span>BIN RAMADAN Ai</span>
            <span className="text-amber-400 font-mono">×</span>
            <span className="text-amber-400">SHAKTI PUMPS</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {text.quoteTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {text.quoteSub}
        </p>
      </div>

      {successResult ? (
        <div className="bg-white p-8 rounded-2xl border border-emerald-500/40 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              {text.quoteSuccessTitle}
            </h2>
            <p className="text-xs text-slate-600">
              {isRtl ? 'تم استلام طلب عرض السعر بنجاح، وستقوم إدارة المبيعات بالتواصل معكم وتزويدكم بالافتراضات الهندسية المطلوبة.' : 'Your quotation request has been received successfully. Our sales engineers will follow up with you.'}
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 inline-block text-center space-y-2 max-w-md mx-auto">
            <span className="text-xs text-slate-500 font-medium block">
              {text.quoteSuccessRef}
            </span>
            <span className="text-2xl font-mono font-black text-sky-700 tracking-wider block">
              {successResult.referenceNo}
            </span>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="bg-[#0B2E59] text-white font-bold py-2.5 px-6 rounded-xl text-xs"
            >
              {text.navHome}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldName} *
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldCompany}
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldPhone} *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldEmail}
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldWhatsapp}
              </label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                dir="ltr"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldLocation}
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldProductService} *
              </label>
              <input
                type="text"
                required
                value={formData.productOrService}
                onChange={(e) => setFormData({ ...formData, productOrService: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500 font-bold text-sky-900"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldQuantity}
              </label>
              <input
                type="text"
                value={formData.requiredQuantity}
                onChange={(e) => setFormData({ ...formData, requiredQuantity: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* WELL & TECHNICAL PARAMETERS SECTION */}
          <div className="bg-[#071A2B] text-white p-5 rounded-2xl border border-sky-500/40 space-y-4">
            <div className="border-b border-sky-800 pb-2">
              <span className="text-amber-400 font-black text-xs uppercase tracking-wider block">
                {isRtl ? 'بيانات البئر والطلمبة المطلوبة لتحديد السعر والتكوين' : 'Borehole & Hydraulic Parameters for Pricing & Setup'}
              </span>
              <p className="text-xs text-sky-200 mt-1">
                {isRtl
                  ? 'مش كل بئر محتاج نفس الطلمبة. اختيار الطلمبة الصح يبدأ من بيانات مشروعك. ابعتلنا البيانات التالية وهنحدد لك الحل المناسب والسعر.'
                  : 'Every well requires custom sizing. Provide your well data below so our engineering team can determine the exact Shakti configuration and pricing.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 text-slate-900 text-xs">
              <div>
                <label className="block text-sky-200 font-bold mb-1">
                  {isRtl ? '١. عمق البئر الكلي (متر)' : '1. Total Borehole Depth (m)'}
                </label>
                <input
                  type="text"
                  placeholder="مثال: 120 متر"
                  value={formData.wellDepthMeters}
                  onChange={(e) => setFormData({ ...formData, wellDepthMeters: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-sky-200 font-bold mb-1">
                  {isRtl ? '٢. مستوى المياه / الانخفاض (متر)' : '2. Dynamic Water Level (m)'}
                </label>
                <input
                  type="text"
                  placeholder="مثال: 60 متر"
                  value={formData.waterLevelMeters}
                  onChange={(e) => setFormData({ ...formData, waterLevelMeters: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-sky-200 font-bold mb-1">
                  {isRtl ? '٣. التصرف المطلوب (م³/ساعة)' : '3. Required Flow Rate (m³/h)'}
                </label>
                <input
                  type="text"
                  placeholder="مثال: 80 متر مكعب/ساعة"
                  value={formData.requiredFlowRate}
                  onChange={(e) => setFormData({ ...formData, requiredFlowRate: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-sky-200 font-bold mb-1">
                  {isRtl ? '٤. عدد ساعات التشغيل اليومية' : '4. Operating Hours / Day'}
                </label>
                <input
                  type="text"
                  placeholder="مثال: 7 - 9 ساعات طاقة شمسية"
                  value={formData.operatingHoursPerDay}
                  onChange={(e) => setFormData({ ...formData, operatingHoursPerDay: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-sky-200 font-bold mb-1">
                  {isRtl ? '٥. نوع نظام الري' : '5. Irrigation System Type'}
                </label>
                <select
                  value={formData.irrigationType}
                  onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400"
                >
                  <option value="Drip Irrigation (تنقيط)">{isRtl ? 'ري بالتنقيط (Drip)' : 'Drip Irrigation'}</option>
                  <option value="Sprinkler System (رش)">{isRtl ? 'ري بالرش (Sprinkler)' : 'Sprinkler System'}</option>
                  <option value="Center Pivot (ري محوري)">{isRtl ? 'ري محوري (Center Pivot)' : 'Center Pivot'}</option>
                  <option value="Basin / Canal Transfer (أحواض وترع)">{isRtl ? 'ضخ للأحواض والترع (Flood/Basin)' : 'Basin / Canal Transfer'}</option>
                </select>
              </div>

              <div>
                <label className="block text-sky-200 font-bold mb-1">
                  {isRtl ? '٦. قطر البئر (بوصة)' : '6. Well Casing Diameter (in)'}
                </label>
                <input
                  type="text"
                  placeholder="مثال: 8 بوصة أو 10 بوصة"
                  value={formData.wellDiameterInches}
                  onChange={(e) => setFormData({ ...formData, wellDiameterInches: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sky-200 font-bold mb-1">
                  {isRtl ? '٧. طول وقطر خط الطرد الرئيسي (متر)' : '7. Delivery Pipeline Distance & Diameter'}
                </label>
                <input
                  type="text"
                  placeholder="مثال: 300 متر خط بلاستيك PVC قطر 6 بوصة"
                  value={formData.deliveryPipeLengthMeters}
                  onChange={(e) => setFormData({ ...formData, deliveryPipeLengthMeters: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>

              <div>
                <label className="block text-sky-200 font-bold mb-1">
                  {isRtl ? '٨. صورة أو بيانات الطلمبة الحالية (إن وجدت)' : '8. Current Pump Data (If any)'}
                </label>
                <input
                  type="text"
                  placeholder="مثال: طلمبة 50 حصان أو محرك ديزل"
                  value={formData.currentPumpDetails}
                  onChange={(e) => setFormData({ ...formData, currentPumpDetails: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-sky-400"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {text.fieldDescription}
            </label>
            <textarea
              rows={3}
              value={formData.projectDescription}
              onChange={(e) => setFormData({ ...formData, projectDescription: e.target.value })}
              placeholder={isRtl ? 'وصف الموجز للمشروع أو أي متطلبات خاصة...' : 'Brief project description or special requirements...'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>{isRtl ? 'جاري الإرسال...' : 'Submitting Request...'}</span>
            ) : (
              <>
                <FileText className="w-4 h-4" />
                <span>{text.btnRequestQuote}</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
