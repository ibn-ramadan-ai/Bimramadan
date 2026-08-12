import React, { useState } from 'react';
import { Language } from '../types';
import { getTranslation } from '../data/translations';
import { BRAND_CONFIG } from '../config/brand';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
} from 'lucide-react';

interface ContactPageProps {
  currentLang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ currentLang }) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const whatsappUrl = `https://wa.me/${BRAND_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
    isRtl
      ? 'مرحباً شركة بن رمضان Ai، أريد استفسار عن موقع المعرض وطلمبات الطاقة الشمسية...'
      : 'Hello BIN RAMADAN Ai, I am inquiring about your showroom location and solar pump products...'
  )}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="bg-[#071A2B] text-white p-8 sm:p-12 rounded-2xl border border-blue-900 shadow-xl space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
            <MapPin className="w-5 h-5 text-sky-400" />
            <span>{isRtl ? 'اتصل بنا وموقع المعرض' : 'Contact & Strategic Location'}</span>
          </div>
          <div className="bg-[#0B2E59] border border-amber-500/40 px-3 py-1 rounded-xl text-xs font-black text-white shadow-sm flex items-center gap-1.5">
            <span>BIN RAMADAN Ai</span>
            <span className="text-amber-400 font-mono">×</span>
            <span className="text-amber-400">SHAKTI PUMPS</span>
          </div>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {text.navContact}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {isRtl
            ? 'تواصل مباشرة مع المهندسين وفريق خدمة العملاء بشركة بن رمضان Ai، مع إتاحة كافة منتجات وحلول طلمبات الطاقة الشمسية من Shakti Pumps.'
            : 'Connect with BIN RAMADAN Ai engineers for Shakti Pumps solar water pumping solutions or visit our strategic showroom & service center.'}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Info Col */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
            <h2 className="font-bold text-slate-900 text-lg border-b pb-2">
              {isRtl ? 'معلومات الاتصال المباشر' : 'Direct Contact Information'}
            </h2>

            <div className="space-y-4 text-xs">
              {/* Head Office Block */}
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                <div className="p-2 bg-sky-100 text-sky-700 rounded-lg shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block text-xs uppercase text-sky-800">
                    {isRtl ? BRAND_CONFIG.headOffice.titleAr : BRAND_CONFIG.headOffice.titleEn}
                  </span>
                  <span className="text-slate-700 font-semibold text-sm block pt-0.5">
                    {isRtl ? BRAND_CONFIG.headOffice.locationAr : BRAND_CONFIG.headOffice.locationEn}
                  </span>
                  <span className="text-[11px] text-slate-500 block pt-0.5">
                    {isRtl ? 'إدارة الشركة والشؤون المركزية' : 'Corporate Administration & Executive Management'}
                  </span>
                </div>
              </div>

              {/* Proposed Branch Block */}
              <div className="flex items-start gap-3 p-3 bg-amber-50/80 rounded-xl border border-amber-200">
                <div className="p-2 bg-amber-100 text-amber-800 rounded-lg shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-amber-900 block text-xs uppercase">
                    {isRtl ? BRAND_CONFIG.proposedBranch.titleAr : BRAND_CONFIG.proposedBranch.titleEn}
                  </span>
                  <span className="text-slate-800 font-bold text-sm block pt-0.5">
                    {isRtl ? BRAND_CONFIG.proposedBranch.locationAr : BRAND_CONFIG.proposedBranch.locationEn}
                  </span>
                  <span className="text-[11px] text-slate-600 block pt-0.5 leading-snug">
                    {isRtl ? 'الموقع المقترح لخدمة مشاريع ومزارع: وادي النطرون، مدينة السادات، مدينة بدر، والمناطق الزراعية المحيطة.' : 'Proposed location intended to support customers & projects in Wadi El Natrun, Sadat City, Badr City, and surrounding areas.'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-100 text-sky-700 rounded-lg shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{isRtl ? 'الهاتف:' : 'Phone:'}</span>
                  <a href={`tel:${BRAND_CONFIG.contact.phone}`} className="text-sky-700 hover:underline font-mono" dir="ltr">
                    {BRAND_CONFIG.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-100 text-emerald-700 rounded-lg shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{isRtl ? 'مبيعات الواتساب:' : 'WhatsApp Sales:'}</span>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-emerald-600 hover:underline font-medium"
                  >
                    {isRtl ? 'انقر للتحدث عبر الواتساب' : 'Click to chat on WhatsApp'}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-100 text-sky-700 rounded-lg shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{isRtl ? 'البريد الإلكتروني:' : 'Email:'}</span>
                  <a href={`mailto:${BRAND_CONFIG.contact.email}`} className="text-sky-700 hover:underline">
                    {BRAND_CONFIG.contact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-100 text-sky-700 rounded-lg shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 block">{isRtl ? 'مواعيد العمل:' : 'Business Hours:'}</span>
                  <span className="text-slate-600">
                    {isRtl ? BRAND_CONFIG.contact.businessHoursAr : BRAND_CONFIG.contact.businessHoursEn}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Showroom Map Preview Widget */}
          <div className="bg-[#071A2B] text-white p-6 rounded-2xl border border-blue-900 shadow-md space-y-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase">
              <MapPin className="w-4 h-4" />
              <span>{isRtl ? 'الفرع ومركز الخدمة المقترح' : 'PROPOSED BRANCH & SERVICE CENTER'}</span>
            </div>

            <div className="h-44 bg-[#0B2E59] rounded-xl border border-blue-800 flex items-center justify-center relative overflow-hidden text-center p-4">
              <div className="space-y-1 z-10">
                <span className="font-black text-amber-300 text-sm block">
                  {isRtl ? 'قرية النجاح – مصر (الفرع المقترح)' : 'Qaryat Al Najah, Egypt (Proposed Branch)'}
                </span>
                <span className="text-[11px] text-slate-300 block">
                  {isRtl ? 'خدمة مناطق: وادي النطرون • مدينة السادات • مدينة بدر' : 'Supporting Wadi El Natrun • Sadat City • Badr City'}
                </span>
                <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded inline-block mt-1">
                  GPS: 30.4152° N, 30.3218° E
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Col */}
        <div className="lg:col-span-7">
          <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="font-bold text-slate-900 text-lg border-b pb-2">
              {isRtl ? 'إرسال رسالة مباشرة' : 'Send Us a Message'}
            </h2>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-300 p-6 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="font-bold text-emerald-900 text-base">
                  {isRtl ? 'تم إرسال رسالتك بنجاح' : 'Message Sent Successfully'}
                </h3>
                <p className="text-xs text-emerald-700">
                  {isRtl ? 'سيقوم مسؤول خدمة العملاء بالرد عليك خلال ساعات العمل.' : 'Our customer support team will reply to you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      {text.fieldName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    {isRtl ? 'موضوع الرسالة' : 'Subject'}
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder={isRtl ? 'استفسار عن طلمبة طاقة شمسية' : 'e.g. Solar pump inquiry'}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isRtl ? 'الرسالة' : 'Message'} *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold py-3 px-6 rounded-xl text-xs sm:text-sm shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isRtl ? 'إرسال الرسالة' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
