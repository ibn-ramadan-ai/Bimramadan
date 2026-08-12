import React, { useState } from 'react';
import { Language, ProjectItem } from '../types';
import { getTranslation } from '../data/translations';
import { MapPin, ShieldCheck, Filter, ArrowRight, ArrowLeft } from 'lucide-react';
import { SafeImage } from '../components/SafeImage';

interface ProjectsPageProps {
  currentLang: Language;
  projects: ProjectItem[];
  onNavigate: (page: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ currentLang, projects, onNavigate }) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Agricultural', 'Irrigation', 'Industrial', 'Water Supply'];

  const filteredProjects = projects.filter(
    (p) => selectedCategory === 'All' || p.category === selectedCategory
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#071A2B] text-white p-8 sm:p-12 rounded-2xl border border-blue-900 shadow-xl space-y-3">
        <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
          <ShieldCheck className="w-5 h-5 text-sky-400" />
          <span>{isRtl ? 'المشاريع والسابقة الهندسية' : 'Completed Projects & Field History'}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white">
          {text.navProjects}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          {isRtl
            ? 'نماذج سابقة لمشاريع أنظمة الضخ الشمسي التي تم تنفيذها للمزارع والمستثمرين بوادي النطرون، مدينة السادات، وبدر.'
            : 'Portfolio of solar water pumping stations engineered and commissioned for agricultural farms in Egypt.'}
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-[#0B2E59] text-sky-300 border border-sky-400/50 shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat === 'All' ? text.allCategories : cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="relative h-56 bg-slate-100 overflow-hidden">
                <SafeImage
                  src={proj.image}
                  alt={isRtl ? proj.titleAr : proj.titleEn}
                  category="Solar Pumping Systems"
                  showBrandedOverlay={true}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow z-10">
                  {isRtl ? proj.statusAr : proj.statusEn}
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-1.5 text-sky-700 font-bold text-xs bg-sky-50 px-3 py-1 rounded-md w-fit">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{isRtl ? proj.locationAr : proj.locationEn}</span>
                </div>

                <h3 className="font-bold text-slate-900 text-base leading-snug">
                  {isRtl ? proj.titleAr : proj.titleEn}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {isRtl ? proj.descriptionAr : proj.descriptionEn}
                </p>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">{isRtl ? 'التطبيق:' : 'Application:'}</span>
                    <span className="font-bold text-slate-800">{isRtl ? proj.applicationAr : proj.applicationEn}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">{isRtl ? 'قدرة النظام:' : 'System Capacity:'}</span>
                    <span className="font-bold text-sky-700">{proj.capacity}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0">
              <button
                onClick={() => onNavigate('tech-consultation')}
                className="w-full bg-[#0B2E59] hover:bg-[#071A2B] text-sky-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-colors"
              >
                {isRtl ? 'طلب محطة مماثلة لمزرعتك' : 'Request Similar Station Sizing'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
