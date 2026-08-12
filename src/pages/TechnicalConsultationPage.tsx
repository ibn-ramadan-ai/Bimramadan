import React, { useState, useEffect } from 'react';
import { Language, TechnicalConsultationRequest } from '../types';
import { getTranslation } from '../data/translations';
import { api } from '../services/api';
import { Calculator, CheckCircle2, Upload, FileText, AlertCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface TechnicalConsultationPageProps {
  currentLang: Language;
  prefilledCalcData?: any;
  onNavigate: (page: string) => void;
}

export const TechnicalConsultationPage: React.FC<TechnicalConsultationPageProps> = ({
  currentLang,
  prefilledCalcData,
  onNavigate,
}) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const [formData, setFormData] = useState({
    customerName: '',
    companyOrFarmName: '',
    phone: '',
    whatsapp: '',
    governorate: 'Beheira (وادي النطرون)',
    projectLocation: '',
    applicationType: 'Groundwater Irrigation (آبار جوفية)',
    waterSource: 'Deep Groundwater Well (بئر جوفي عميق)',
    requiredFlowRate: prefilledCalcData?.requiredFlowRate ? `${prefilledCalcData.requiredFlowRate} m³/h` : '60 m³/h',
    requiredHead: prefilledCalcData?.totalHeadMeters ? `${prefilledCalcData.totalHeadMeters} Meters` : '120 Meters',
    pumpType: prefilledCalcData?.pumpType || 'Submersible Stainless Steel',
    availableElectricalPower: 'None (100% Solar Off-Grid)',
    solarRequirement: prefilledCalcData?.recommendedSolarArrayKwp ? `${prefilledCalcData.recommendedSolarArrayKwp} kWp PV Array` : 'Complete Solar Station',
    dailyOperatingHours: '7 Hours',
    projectSizeFeddan: '50 Feddans',
    additionalNotes: prefilledCalcData ? `Sizing Estimator Calculated: Motor ~${prefilledCalcData.motorPowerHp} HP` : '',
  });

  const [uploadedFiles, setUploadedFiles] = useState<Array<{ name: string; size: number }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successResult, setSuccessResult] = useState<{ referenceNo: string; data: TechnicalConsultationRequest } | null>(null);

  useEffect(() => {
    if (prefilledCalcData) {
      setFormData((prev) => ({
        ...prev,
        requiredFlowRate: `${prefilledCalcData.requiredFlowRate} m³/h`,
        requiredHead: `${prefilledCalcData.totalHeadMeters} Meters`,
        pumpType: prefilledCalcData.pumpType || 'Submersible Stainless Steel',
        solarRequirement: `${prefilledCalcData.recommendedSolarArrayKwp} kWp PV Array`,
        additionalNotes: `Calculated values: Motor ~${prefilledCalcData.motorPowerHp} HP (${prefilledCalcData.hydraulicPowerKw} kW)`,
      }));
    }
  }, [prefilledCalcData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const filesArray = (Array.from(e.target.files) as File[]).map((f) => ({
        name: f.name,
        size: Math.round(f.size / 1024), // KB
      }));
      setUploadedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await api.submitConsultation({
        ...formData,
        files: uploadedFiles,
      });
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
            <Calculator className="w-5 h-5 text-sky-400" />
            <span>{isRtl ? 'دراسة موقع واستشارة هندسية' : 'Engineering Field Analysis'}</span>
          </div>
          <div className="bg-[#0B2E59] border border-amber-500/40 px-3 py-1 rounded-xl text-xs font-black text-white shadow-sm flex items-center gap-1.5">
            <span>BIN RAMADAN Ai</span>
            <span className="text-amber-400 font-mono">×</span>
            <span className="text-amber-400">SHAKTI PUMPS</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          {text.consultationTitle}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          {text.consultationSub}
        </p>
      </div>

      {successResult ? (
        <div className="bg-white p-8 rounded-2xl border border-emerald-500/40 shadow-xl text-center space-y-6">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              {text.consultationSuccessTitle}
            </h2>
            <p className="text-xs text-slate-600">{text.consultationSuccessDesc}</p>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 inline-block text-center space-y-2 max-w-md mx-auto">
            <span className="text-xs text-slate-500 font-medium block">
              {text.consultationSuccessRef}
            </span>
            <span className="text-2xl font-mono font-black text-sky-700 tracking-wider block">
              {successResult.referenceNo}
            </span>
            <span className="text-[11px] text-slate-400 block pt-1">
              {isRtl ? 'يرجى الحفاظ على هذا الرقم للمتابعة الفنية' : 'Please keep this reference ID for project tracking'}
            </span>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="bg-[#0B2E59] text-white font-bold py-2.5 px-6 rounded-xl text-xs"
            >
              {text.navHome}
            </button>

            <button
              onClick={() => {
                setSuccessResult(null);
                setFormData((prev) => ({ ...prev, customerName: '', phone: '' }));
              }}
              className="bg-slate-100 text-slate-700 font-bold py-2.5 px-6 rounded-xl text-xs hover:bg-slate-200"
            >
              {isRtl ? 'تقديم طلب آخر' : 'Submit Another Request'}
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldName} *
              </label>
              <input
                type="text"
                required
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                placeholder={isRtl ? 'م. محمود جابر' : 'e.g. Eng. Mahmoud Gaber'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Company / Farm Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldCompany}
              </label>
              <input
                type="text"
                value={formData.companyOrFarmName}
                onChange={(e) => setFormData({ ...formData, companyOrFarmName: e.target.value })}
                placeholder={isRtl ? 'مزرعة الصفا للاستصلاح' : 'e.g. Al-Safa Agro Farm'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldPhone} *
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+20 100 000 0000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                dir="ltr"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldWhatsapp}
              </label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                placeholder="+20 100 000 0000"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                dir="ltr"
              />
            </div>

            {/* Governorate */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldGovernorate}
              </label>
              <select
                value={formData.governorate}
                onChange={(e) => setFormData({ ...formData, governorate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              >
                <option value="Beheira (وادي النطرون)">Beheira / Wadi El Natrun (محافظة البحيرة - وادي النطرون)</option>
                <option value="Monufia (مدينة السادات)">Monufia / Sadat City (محافظة المنوفية - مدينة السادات)</option>
                <option value="Giza / Cairo (مدينة بدر)">Giza & Cairo Expansion / Badr Road (مدينة بدر ومحور التوسع)</option>
                <option value="Matrouh">Matrouh / El-Dabaa (محافظة مطروح / الضبعة)</option>
                <option value="New Valley (الوادي الجديد)">New Valley (الوادي الجديد - الفرافرة)</option>
                <option value="Minya / Upper Egypt">Minya / Upper Egypt (المنيا والصعيد)</option>
                <option value="Other Area in Egypt">Other Governorate in Egypt (محافظة أخرى بمصر)</option>
              </select>
            </div>

            {/* Project Location */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldLocation}
              </label>
              <input
                type="text"
                value={formData.projectLocation}
                onChange={(e) => setFormData({ ...formData, projectLocation: e.target.value })}
                placeholder={isRtl ? 'الكيلو ١١٠ طريق مصر إسكندرية الصحراوي / قرية النجاح' : 'e.g. KM 110 Desert Road / Qaryat Al Najah'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Flow Rate */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldFlowRate}
              </label>
              <input
                type="text"
                value={formData.requiredFlowRate}
                onChange={(e) => setFormData({ ...formData, requiredFlowRate: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Head */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldHead}
              </label>
              <input
                type="text"
                value={formData.requiredHead}
                onChange={(e) => setFormData({ ...formData, requiredHead: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            {/* Pump Type */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldPumpType}
              </label>
              <select
                value={formData.pumpType}
                onChange={(e) => setFormData({ ...formData, pumpType: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              >
                <option value="Submersible Stainless Steel">Submersible Stainless Steel Pump (طلمبة غاطسة آبار)</option>
                <option value="Surface Centrifugal">Surface Centrifugal Pump (طلمبة سطحية ترع ومكاشف)</option>
                <option value="Booster Pump">Pressure Booster Pump (طلمبة رفع ضغط ري محوري)</option>
              </select>
            </div>

            {/* Project Size */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                {text.fieldProjectSize}
              </label>
              <input
                type="text"
                value={formData.projectSizeFeddan}
                onChange={(e) => setFormData({ ...formData, projectSizeFeddan: e.target.value })}
                placeholder="e.g. 50 Feddans"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              {text.fieldNotes}
            </label>
            <textarea
              rows={3}
              value={formData.additionalNotes}
              onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
              placeholder={isRtl ? 'أدخل أي تفاصيل إضافية عن ملوحة المياه، المحاصيل، أو ساعات التشغيل...' : 'Enter details regarding water salinity, crops, generator backup, etc.'}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
            ></textarea>
          </div>

          {/* Attachment File Upload Simulation */}
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center bg-slate-50 space-y-2">
            <Upload className="w-6 h-6 text-slate-400 mx-auto" />
            <span className="text-xs font-bold text-slate-700 block">
              {text.fieldUploadFiles}
            </span>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-sky-100 file:text-sky-800 hover:file:bg-sky-200"
            />

            {uploadedFiles.length > 0 && (
              <div className="pt-2 flex flex-wrap gap-2 justify-center text-[11px] text-slate-600">
                {uploadedFiles.map((f, idx) => (
                  <span key={idx} className="bg-white border px-2 py-1 rounded shadow-sm">
                    📄 {f.name} ({f.size} KB)
                  </span>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span>{isRtl ? 'جاري جاري الإرسال...' : 'Submitting Inquiry...'}</span>
            ) : (
              <>
                <Calculator className="w-4 h-4" />
                <span>{text.btnSubmitRequest}</span>
              </>
            )}
          </button>
        </form>
      )}
    </div>
  );
};
