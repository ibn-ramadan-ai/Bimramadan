import React, { useState, useEffect } from 'react';
import { Language, Product, ProjectItem, DocumentItem } from './types';
import { INITIAL_PRODUCTS, INITIAL_PROJECTS, INITIAL_DOCUMENTS } from './data/initialData';
import { BRAND_CONFIG } from './config/brand';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutUsPage } from './pages/AboutUsPage';
import { SolarPumpsPage } from './pages/SolarPumpsPage';
import { SolarEnergyPage } from './pages/SolarEnergyPage';
import { ProductsPage } from './pages/ProductsPage';
import { ServicesPage } from './pages/ServicesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AgriculturalSolutionsPage } from './pages/AgriculturalSolutionsPage';
import { TechnicalConsultationPage } from './pages/TechnicalConsultationPage';
import { QuotationRequestPage } from './pages/QuotationRequestPage';
import { CompanyProfilePage } from './pages/CompanyProfilePage';
import { DownloadsPage } from './pages/DownloadsPage';
import { ContactPage } from './pages/ContactPage';
import { AdminDashboard } from './pages/AdminDashboard';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('ar');
  const [currentPage, setCurrentPage] = useState<string>('home');

  // State for prefilled form transfers
  const [prefilledCalcData, setPrefilledCalcData] = useState<any>(null);
  const [prefilledProductName, setPrefilledProductName] = useState<string>('');

  // Catalog Data
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [projects] = useState<ProjectItem[]>(INITIAL_PROJECTS);
  const [documents] = useState<DocumentItem[]>(INITIAL_DOCUMENTS);

  // Dynamic Page Title & Meta SEO update
  useEffect(() => {
    const isRtl = currentLang === 'ar';
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    document.documentElement.lang = currentLang;

    let titleSuffix = isRtl
      ? `${BRAND_CONFIG.nameAr} | ${BRAND_CONFIG.taglineAr}`
      : `${BRAND_CONFIG.nameEn} | ${BRAND_CONFIG.taglineEn}`;

    switch (currentPage) {
      case 'home':
        document.title = titleSuffix;
        break;
      case 'about':
        document.title = `${isRtl ? 'عن الشركة' : 'About Us'} - ${titleSuffix}`;
        break;
      case 'solar-pumps':
        document.title = `${isRtl ? 'طلمبات الطاقة الشمسية' : 'Solar Pumps'} - ${titleSuffix}`;
        break;
      case 'solar-energy':
        document.title = `${isRtl ? 'أنظمة الطاقة الشمسية' : 'Solar PV & Inverters'} - ${titleSuffix}`;
        break;
      case 'products':
        document.title = `${isRtl ? 'كتالوج المنتجات والمعدات' : 'Product Catalog'} - ${titleSuffix}`;
        break;
      case 'services':
        document.title = `${isRtl ? 'الخدمات الهندسية والصيانة' : 'Engineering Services'} - ${titleSuffix}`;
        break;
      case 'projects':
        document.title = `${isRtl ? 'سجل المشاريع والأعمال' : 'Projects Portfolio'} - ${titleSuffix}`;
        break;
      case 'agri-solutions':
        document.title = `${isRtl ? 'حلول الري والقطاع الزراعي' : 'Agricultural Solar Pumping'} - ${titleSuffix}`;
        break;
      case 'tech-consultation':
        document.title = `${isRtl ? 'طلب استشارة هندسية ودراسة موقع' : 'Technical Consultation'} - ${titleSuffix}`;
        break;
      case 'request-quote':
        document.title = `${isRtl ? 'طلب عرض سعر للمعدات' : 'Request Quotation'} - ${titleSuffix}`;
        break;
      case 'company-profile':
        document.title = `${isRtl ? 'بروفايل الشركة المعتمد' : 'Official Company Profile'} - ${titleSuffix}`;
        break;
      case 'downloads':
        document.title = `${isRtl ? 'مركز المستندات والكتالوجات' : 'Downloads Center'} - ${titleSuffix}`;
        break;
      case 'contact':
        document.title = `${isRtl ? 'اتصل بنا وموقع المعرض' : 'Contact Us'} - ${titleSuffix}`;
        break;
      case 'admin':
        document.title = `Admin Portal - ${BRAND_CONFIG.nameEn}`;
        break;
      default:
        document.title = titleSuffix;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, currentLang]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleSelectProductForQuote = (productName: string) => {
    setPrefilledProductName(productName);
  };

  const handleOpenConsultationWithData = (calcData: any) => {
    setPrefilledCalcData(calcData);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans flex flex-col justify-between selection:bg-sky-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar
        currentLang={currentLang}
        currentPage={currentPage}
        onLanguageChange={setCurrentLang}
        onNavigate={handleNavigate}
      />

      {/* Main Page View Router */}
      <main className="flex-1 pb-16">
        {currentPage === 'home' && (
          <HomePage
            currentLang={currentLang}
            products={products}
            projects={projects}
            onNavigate={handleNavigate}
            onSelectProductForQuote={handleSelectProductForQuote}
            onOpenConsultationWithData={handleOpenConsultationWithData}
          />
        )}

        {currentPage === 'about' && (
          <AboutUsPage currentLang={currentLang} onNavigate={handleNavigate} />
        )}

        {currentPage === 'solar-pumps' && (
          <SolarPumpsPage
            currentLang={currentLang}
            products={products}
            onNavigate={handleNavigate}
            onSelectProductForQuote={handleSelectProductForQuote}
          />
        )}

        {currentPage === 'solar-energy' && (
          <SolarEnergyPage
            currentLang={currentLang}
            products={products}
            onNavigate={handleNavigate}
            onSelectProductForQuote={handleSelectProductForQuote}
          />
        )}

        {currentPage === 'products' && (
          <ProductsPage
            currentLang={currentLang}
            products={products}
            onNavigate={handleNavigate}
            onSelectProductForQuote={handleSelectProductForQuote}
          />
        )}

        {currentPage === 'services' && (
          <ServicesPage currentLang={currentLang} onNavigate={handleNavigate} />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage
            currentLang={currentLang}
            projects={projects}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'agri-solutions' && (
          <AgriculturalSolutionsPage
            currentLang={currentLang}
            onNavigate={handleNavigate}
            onOpenConsultationWithData={handleOpenConsultationWithData}
          />
        )}

        {currentPage === 'tech-consultation' && (
          <TechnicalConsultationPage
            currentLang={currentLang}
            prefilledCalcData={prefilledCalcData}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'request-quote' && (
          <QuotationRequestPage
            currentLang={currentLang}
            prefilledProductName={prefilledProductName}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage === 'company-profile' && (
          <CompanyProfilePage currentLang={currentLang} />
        )}

        {currentPage === 'downloads' && (
          <DownloadsPage
            currentLang={currentLang}
            documents={documents}
            onNavigate={handleNavigate}
            onSelectProductForQuote={handleSelectProductForQuote}
          />
        )}

        {currentPage === 'contact' && <ContactPage currentLang={currentLang} />}

        {currentPage === 'admin' && <AdminDashboard currentLang={currentLang} />}
      </main>

      {/* Floating Call to Action */}
      <WhatsAppButton currentLang={currentLang} />

      {/* Global Footer */}
      <Footer currentLang={currentLang} onNavigate={handleNavigate} />
    </div>
  );
}
