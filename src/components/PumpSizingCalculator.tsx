import React, { useState } from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { Calculator, ArrowRight, ArrowLeft, Sun, Droplets, Zap, CheckCircle2 } from 'lucide-react';

interface PumpSizingCalculatorProps {
  currentLang: Language;
  onOpenConsultationWithData?: (calcData: any) => void;
}

export const PumpSizingCalculator: React.FC<PumpSizingCalculatorProps> = ({
  currentLang,
  onOpenConsultationWithData,
}) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  // Inputs
  const [wellDepth, setWellDepth] = useState<number>(120); // meters
  const [pipeFriction, setPipeFriction] = useState<number>(15); // meters loss estimate
  const [requiredFlowRate, setRequiredFlowRate] = useState<number>(60); // m3/h
  const [dailySolarHours, setDailySolarHours] = useState<number>(7); // hours
  const [pumpType, setPumpType] = useState<string>('submersible'); // submersible or surface

  // Calculations
  const totalHeadMeters = wellDepth + pipeFriction;
  // Hydraulic Power (kW) = (Flow m3/h * Head m * 9.81 * 1000) / (3600 * 1000 * Pump efficiency ~ 0.55)
  // Simplified formula: kW = (Flow * Head) / 200
  const hydraulicPowerKw = Math.round(((requiredFlowRate * totalHeadMeters) / 200) * 10) / 10;
  const motorPowerHp = Math.round(hydraulicPowerKw * 1.34 * 10) / 10;
  // Recommended PV Array Size = Hydraulic Power kW * 1.5 (safety margin for solar irradiance)
  const recommendedSolarArrayKwp = Math.round(hydraulicPowerKw * 1.55 * 10) / 10;
  // Estimated Daily Water Output
  const dailyWaterM3 = Math.round(requiredFlowRate * dailySolarHours);
  // Diesel Replacement Estimate: ~0.25 L diesel per kW-hour * operating hours * 300 days
  const annualDieselLitersSaved = Math.round(hydraulicPowerKw * dailySolarHours * 300 * 0.28);
  const annualEgpSaved = Math.round(annualDieselLitersSaved * 18); // assuming ~18 EGP per liter diesel fuel & maintenance cost

  const handleRequestConsultation = () => {
    if (onOpenConsultationWithData) {
      onOpenConsultationWithData({
        wellDepth,
        totalHeadMeters,
        requiredFlowRate,
        hydraulicPowerKw,
        motorPowerHp,
        recommendedSolarArrayKwp,
        pumpType: pumpType === 'submersible' ? 'Submersible Stainless Steel' : 'Surface Centrifugal',
      });
    }
  };

  return (
    <div className="bg-[#0B2E59] text-white rounded-2xl p-6 sm:p-8 border border-sky-500/30 shadow-2xl relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 border-b border-blue-800/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-500/20 text-sky-300 rounded-xl border border-sky-400/30">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {isRtl ? 'حاسبة التقدير الهيدروليكي لمضخات الطاقة الشمسية' : 'Solar Water Pump Hydraulic Sizing Estimator'}
            </h2>
            <p className="text-xs text-sky-300">
              {isRtl
                ? 'احسب القدرة الكهربائية المطلوبة وحجم مصفوفة الألواح الشمسية لبئرك الزراعي'
                : 'Calculate required motor power and PV array capacity for your agricultural well'}
            </p>
          </div>
        </div>
        <div className="bg-[#071A2B] border border-amber-500/40 px-3 py-1.5 rounded-xl text-xs font-black text-white shadow-sm flex items-center gap-1.5">
          <span>BIN RAMADAN Ai</span>
          <span className="text-amber-400 font-mono">×</span>
          <span className="text-amber-400">SHAKTI PUMPS</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Column */}
        <div className="lg:col-span-6 space-y-5">
          {/* Well Depth Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-2 text-slate-200">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-sky-400" />
                {isRtl ? 'عمق البئر / مستوى انخفاض المياه (متر)' : 'Well Water Depth / Static Head (Meters)'}
              </span>
              <span className="text-sky-300 font-bold bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                {wellDepth} {isRtl ? 'متر' : 'm'}
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="300"
              step="5"
              value={wellDepth}
              onChange={(e) => setWellDepth(Number(e.target.value))}
              className="w-full accent-sky-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10m</span>
              <span>150m</span>
              <span>300m</span>
            </div>
          </div>

          {/* Flow Rate Slider */}
          <div>
            <div className="flex justify-between items-center text-xs font-semibold mb-2 text-slate-200">
              <span className="flex items-center gap-1.5">
                <Droplets className="w-4 h-4 text-emerald-400" />
                {isRtl ? 'معدل التصرف المطلوب (متر مكعب / ساعة)' : 'Required Flow Rate (m³/h)'}
              </span>
              <span className="text-emerald-300 font-bold bg-blue-950 px-2 py-0.5 rounded border border-blue-800">
                {requiredFlowRate} m³/h
              </span>
            </div>
            <input
              type="range"
              min="10"
              max="250"
              step="5"
              value={requiredFlowRate}
              onChange={(e) => setRequiredFlowRate(Number(e.target.value))}
              className="w-full accent-emerald-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1">
              <span>10 m³/h</span>
              <span>120 m³/h</span>
              <span>250 m³/h</span>
            </div>
          </div>

          {/* Daily Operating Solar Hours */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-200">
                {isRtl ? 'نوع المضخة' : 'Pump Type'}
              </label>
              <select
                value={pumpType}
                onChange={(e) => setPumpType(e.target.value)}
                className="w-full bg-[#071A2B] border border-blue-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              >
                <option value="submersible">
                  {isRtl ? 'طلمبة غاطسة (للآبار)' : 'Submersible (Deep Well)'}
                </option>
                <option value="surface">
                  {isRtl ? 'طلمبة سطحية (ترع ومجاري)' : 'Surface Centrifugal'}
                </option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5 text-slate-200">
                {isRtl ? 'ساعات التشغيل الشمسي' : 'Daily Solar Hours'}
              </label>
              <select
                value={dailySolarHours}
                onChange={(e) => setDailySolarHours(Number(e.target.value))}
                className="w-full bg-[#071A2B] border border-blue-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-400"
              >
                <option value={6}>6 {isRtl ? 'ساعات' : 'Hours'}</option>
                <option value={7}>7 {isRtl ? 'ساعات (متوسط مصر)' : 'Hours (Avg Egypt)'}</option>
                <option value={8}>8 {isRtl ? 'ساعات (صيفاً)' : 'Hours (Summer)'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Calculated Results Display Card */}
        <div className="lg:col-span-6 bg-[#071A2B]/90 rounded-xl p-5 border border-sky-500/40 flex flex-col justify-between">
          <div className="space-y-4">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block border-b border-blue-900 pb-2">
              {isRtl ? 'نتائج التقدير الهيدروليكي (تقدير أولي)' : 'Calculated Engineering Metrics (Initial Estimate)'}
            </span>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0B2E59] p-3 rounded-lg border border-blue-800/60">
                <span className="text-[11px] text-slate-400 block">{isRtl ? 'إجمالي الرفع الهيدروليكي' : 'Total Head'}</span>
                <span className="text-lg font-black text-white">{totalHeadMeters} {isRtl ? 'متر' : 'm'}</span>
              </div>

              <div className="bg-[#0B2E59] p-3 rounded-lg border border-blue-800/60">
                <span className="text-[11px] text-slate-400 block">{isRtl ? 'قدرة محرك الطلمبة المقدرة' : 'Est. Motor Power'}</span>
                <span className="text-lg font-black text-sky-300">{motorPowerHp} HP ({hydraulicPowerKw} kW)</span>
              </div>

              <div className="bg-[#0B2E59] p-3 rounded-lg border border-blue-800/60">
                <span className="text-[11px] text-slate-400 block">{isRtl ? 'حجم مصفوفة الألواح الشمسية' : 'Recommended PV Array'}</span>
                <span className="text-lg font-black text-amber-300">{recommendedSolarArrayKwp} kWp</span>
              </div>

              <div className="bg-[#0B2E59] p-3 rounded-lg border border-blue-800/60">
                <span className="text-[11px] text-slate-400 block">{isRtl ? 'التدفق اليومي المتوقع' : 'Daily Water Discharge'}</span>
                <span className="text-lg font-black text-emerald-400">{dailyWaterM3} m³/day</span>
              </div>
            </div>

            {/* Savings Callout */}
            <div className="bg-emerald-950/40 border border-emerald-500/30 rounded-lg p-3 text-xs flex items-center gap-3">
              <Zap className="w-5 h-5 text-emerald-400 shrink-0" />
              <div className="text-emerald-200">
                <span className="font-bold block">
                  {isRtl ? 'توفير وقود السولار اليومي والسنوي:' : 'Annual Fuel & Maintenance Savings:'}
                </span>
                <span>
                  {isRtl
                    ? `توفير حوالي ${annualDieselLitersSaved.toLocaleString()} لتر سولار سنوياً (~${annualEgpSaved.toLocaleString()} جنيه مصري)`
                    : `Est. ${annualDieselLitersSaved.toLocaleString()} Liters of Diesel Saved Annually (~${annualEgpSaved.toLocaleString()} EGP)`}
                </span>
              </div>
            </div>

            {/* Engineering Disclaimer */}
            <div className="bg-amber-950/30 border border-amber-500/30 rounded-lg p-2.5 text-[11px] text-amber-200/90 leading-relaxed">
              <span className="font-bold text-amber-300 block">
                {isRtl ? 'تقدير أولي:' : 'Initial Estimate:'}
              </span>
              <span>
                {isRtl
                  ? 'التصميم النهائي يتطلب مراجعة بيانات البئر والمواسير والفواقد وظروف التشغيل بواسطة مهندس مختص.'
                  : 'Final design requires engineering review of borehole parameters, pipe sizing, friction losses, and site operating conditions by a specialized engineer.'}
              </span>
            </div>
          </div>

          <div className="pt-5">
            <button
              onClick={handleRequestConsultation}
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-sky-500/25 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm"
            >
              <span>{isRtl ? 'طلب دراسة هيدروليكية وعرض سعر لهذه الحسابات' : 'Submit These Metrics for Engineering Review'}</span>
              <ArrowIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
