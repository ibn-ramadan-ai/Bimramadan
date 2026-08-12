import React from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import {
  Wrench,
  Calculator,
  Sun,
  Droplets,
  ShieldCheck,
  CheckCircle2,
  FileText,
  MapPin,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface ServicesPageProps {
  currentLang: Language;
  onNavigate: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ currentLang, onNavigate }) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';
  const ArrowIcon = isRtl ? ArrowLeft : ArrowRight;

  const servicesList = [
    {
      id: 'srv-1',
      titleEn: 'Hydraulic System Sizing & Solar Pump Engineering',
      titleAr: 'الحسابات الهيدروليكية والتصميم الهندسي لطلمبات الطاقة الشمسية',
      descEn: 'Accurate water head, pipe loss, and flow rate analysis to select the exact pump power and solar array capacity.',
      descAr: 'تحليل دقيق للرفع الهيدروليكي، الفاقد في الأنابيب، ومعدل التصرف لاختيار قدرة الطلمبة ومصفوفة الألواح بدون هدر.',
      icon: Calculator,
    },
    {
      id: 'srv-2',
      titleEn: 'Turnkey Solar Water Pumping Station Installation',
      titleAr: 'توريد وتركيب محطات ضخ المياه بالطاقة الشمسية (تسليم مفتاح)',
      descEn: 'Complete supply and field installation of submersible pumps, surface pumps, VFD inverters, cabling, and hot-dip galvanized mounting structures.',
      descAr: 'توريد وتركيب شامل للطلمبات الغاطسة والسطحية، إنفرترات مغير السرعة، الكابلات، والهياكل المعدنية المجلفنة.',
      icon: Droplets,
    },
    {
      id: 'srv-3',
      titleEn: 'Agricultural Photovoltaic & Off-Grid Solar Power',
      titleAr: 'محطات الطاقة الشمسية الكهروضوئية للمزارع والمنشآت',
      descEn: 'Off-grid and hybrid solar PV power systems for farm headquarters, cold stores, and irrigation equipment.',
      descAr: 'أنظمة طاقة شمسية مستقلة وهجينة لتغذية مباني المزارع، ثلاجات التبريد، ومعدات الري الكهربائية.',
      icon: Sun,
    },
    {
      id: 'srv-4',
      titleEn: 'Field Maintenance & After-Sales Technical Support',
      titleAr: 'الصيانة الميدانية والدعم الفني وخدمات ما بعد البيع',
      descEn: 'Prompt emergency field repair, inverter parameter optimization, and regular preventive maintenance.',
      descAr: 'فريق استجابة سريعة للصيانة الميدانية، إعادة ضبط برامترات الإنفرترات، والصيانة الوقائية الدورية.',
      icon: Wrench,
    },
    {
      id: 'srv-5',
      titleEn: 'Project Management & Technical Consultation',
      titleAr: 'إدارة المشاريع والاستشارات الفنية للقطاع الزراعي',
      descEn: 'Comprehensive project management from initial site analysis to final commissioning and operator training.',
      descAr: 'إدارة هندسية شاملة بدءاً من معاينة الموقع الجغرافي وحتى التشغيل النهائي وتدريب الفنيين بالمزرعة.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-[#071A2B] text-white p-8 sm:p-12 rounded-2xl border border-blue-900 shadow-lg space-y-3">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
          <Wrench className="w-4 h-4" />
          <span>{isRtl ? 'الخدمات الهندسية' : 'Engineering Services'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {text.navServices}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {isRtl
            ? 'تقدم شركة بن رمضان Ai حزمة متكاملة من الخدمات الهندسية لتصميم وتوريد وتركيب وصيانة أنظمة الضخ الشمسي وطاقة المزارع في مصر.'
            : 'BIN RAMADAN Ai delivers end-to-end solar pumping engineering, system design, turnkey installation, and field technical support.'}
        </p>
      </div>

      {/* Services List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {servicesList.map((srv) => {
          const Icon = srv.icon;
          return (
            <div
              key={srv.id}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 bg-[#0B2E59] text-sky-300 rounded-xl flex items-center justify-center border border-blue-800">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg leading-snug">
                  {isRtl ? srv.titleAr : srv.titleEn}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {isRtl ? srv.descAr : srv.descEn}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => onNavigate('tech-consultation')}
                  className="text-xs font-bold text-sky-700 hover:text-sky-900 flex items-center gap-1"
                >
                  <span>{text.btnGetConsultation}</span>
                  <ArrowIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="bg-[#0B2E59] text-white p-8 rounded-2xl border border-blue-800 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left rtl:sm:text-right">
          <h2 className="text-xl font-bold text-white">
            {isRtl ? 'تحتاج إلى استشارة هندسية لمشروعك؟' : 'Need Technical Consultation for Your Project?'}
          </h2>
          <p className="text-xs text-sky-200">
            {isRtl
              ? 'تواصل مع المهندسين المتخصصين بمركز خدمات بن رمضان Ai بقرية النجاح.'
              : 'Contact our engineers at the Qaryat Al Najah service center for project evaluation.'}
          </p>
        </div>

        <button
          onClick={() => onNavigate('tech-consultation')}
          className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-3 px-6 rounded-xl text-xs whitespace-nowrap shadow-md"
        >
          {text.btnGetConsultation}
        </button>
      </div>
    </div>
  );
};
