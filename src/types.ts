export type Language = 'ar' | 'en';

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'QUALIFIED'
  | 'QUOTATION_REQUESTED'
  | 'QUOTATION_SENT'
  | 'NEGOTIATION'
  | 'WON'
  | 'LOST'
  | 'FOLLOW_UP';

export type LeadPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';

export type ProductCategory =
  | 'Solar Submersible Pumps'
  | 'Solar Surface Pumps'
  | 'Solar Openwell Pumps'
  | 'Solar Pump Controllers'
  | 'Inverters & Drives'
  | 'AC & Multistage Pumps'
  | 'PV Solar Modules'
  | 'Solar Pumping Systems'
  | 'Water Pump Accessories'
  | 'Irrigation System Components';

export interface PerformanceHeadFlow {
  headMeters: number;
  flowLpm: number;
}

export interface PerformanceCurvePoint {
  solarPowerWp: number;
  headFlows: PerformanceHeadFlow[];
}

export interface Product {
  id: string;
  nameEn: string;
  nameAr: string;
  category: ProductCategory;
  brandManufacturerEn?: string; // e.g., 'Shakti Pumps' or 'BIN RAMADAN Ai'
  brandManufacturerAr?: string; // e.g., 'Shakti Pumps' or 'بن رمضان Ai'
  solutionProviderEn?: string;  // 'BIN RAMADAN Ai'
  solutionProviderAr?: string;  // 'BIN RAMADAN Ai'
  modelNumber?: string;         // e.g. 'SOLAR 16.5 DCSSP 900'
  productTypeEn?: string;       // e.g. 'DC Submersible Solar Pump'
  productTypeAr?: string;       // e.g. 'طلمبة غاطسة تعمل بالطاقة الشمسية DC'
  pumpCode?: string;            // e.g. '9000017895'
  pumpSetCode?: string;         // e.g. '9500000828'
  dutyHead?: string;            // e.g. '10 meters'
  solarInputPower?: string;     // e.g. '900 Wp'
  bsp?: string;                 // e.g. '50 mm (4×6)'
  dailyDischarge?: string;      // e.g. '81,000 L/day'
  weeklyDischarge?: string;     // e.g. '90.0 m³/week'
  performanceTable?: PerformanceCurvePoint[];
  engineeringDisclaimerEn?: string;
  engineeringDisclaimerAr?: string;
  shortDescEn: string;
  shortDescAr: string;
  image: string;
  specifications: Record<string, string>; // e.g. {"Flow Rate": "10-120 m³/h", "Head": "20-250 m"}
  hasUnknownSpecs?: boolean;
  applicationsEn: string[];
  applicationsAr: string[];
  configurationsEn?: string[];
  configurationsAr?: string[];
}

export interface TechnicalConsultationRequest {
  id: string;
  referenceNo: string;
  customerName: string;
  companyOrFarmName: string;
  phone: string;
  whatsapp: string;
  governorate: string;
  projectLocation: string;
  applicationType: string;
  waterSource: string;
  requiredFlowRate: string; // m³/h
  requiredHead: string; // m
  pumpType: string;
  availableElectricalPower: string;
  solarRequirement: string;
  dailyOperatingHours: string;
  projectSizeFeddan: string;
  additionalNotes?: string;
  files?: Array<{ name: string; size: number; url?: string }>;
  createdAt: string;
  status: 'PENDING' | 'IN_REVIEW' | 'COMPLETED' | 'CONTACTED';
}

export interface QuotationRequest {
  id: string;
  referenceNo: string;
  customerName: string;
  companyName: string;
  phone: string;
  email: string;
  whatsapp: string;
  location: string;
  productOrService: string;
  requiredQuantity: string;
  projectDescription: string;
  budgetRange: string;
  expectedInstallationDate: string;
  additionalNotes?: string;
  createdAt: string;
  status: 'NEW' | 'PROCESSING' | 'QUOTATION_SENT' | 'REJECTED';
}

export interface Lead {
  id: string;
  date: string;
  customer: string;
  company: string;
  phone: string;
  whatsapp: string;
  email: string;
  location: string;
  leadSource: 'WEBSITE_FORM' | 'WHATSAPP' | 'PHONE' | 'SHOWROOM' | 'REFERRAL' | 'OTHER';
  interestedProduct: string;
  projectType: string;
  estimatedValueEgp: number;
  status: LeadStatus;
  priority: LeadPriority;
  assignedEmployee: string;
  notes: string;
  followUpDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectItem {
  id: string;
  titleEn: string;
  titleAr: string;
  locationEn: string;
  locationAr: string;
  applicationEn: string;
  applicationAr: string;
  systemTypeEn: string;
  systemTypeAr: string;
  capacity: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  statusEn: 'Completed' | 'In Progress' | 'Planned';
  statusAr: 'مكتمل' | 'قيد التنفيذ' | 'مخطط';
  category: 'Agricultural' | 'Commercial' | 'Industrial' | 'Irrigation' | 'Water Supply';
}

export interface DocumentItem {
  id: string;
  titleEn: string;
  titleAr: string;
  categoryNumber: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  categoryEn: string;
  categoryAr: string;
  documentTypeEn: string;
  documentTypeAr: string;
  manufacturerSource: 'BIN RAMADAN Ai' | 'Shakti Pumps' | 'BIN RAMADAN Ai × Shakti Pumps';
  brandPresentation: 'BIN_RAMADAN_ONLY' | 'SHAKTI_BIN_RAMADAN_SHARED';
  modelNumber?: string;
  revisionYear?: string;
  language: 'ar' | 'en' | 'bilingual';
  fileSize: string;
  fileType: string;
  downloadUrl: string;
  uploadDate: string;
  descriptionEn: string;
  descriptionAr: string;
  specifications?: Record<string, string>;
  hasUnknownSpecs?: boolean;
  viewCount?: number;
  downloadCount?: number;
}

export interface PartnerBrand {
  id: string;
  name: string;
  origin: string;
  category: string;
  logoUrl?: string;
  status: 'International Manufacturer' | 'Supplier' | 'Technology Component';
}

export interface DashboardMetrics {
  totalLeads: number;
  newLeads: number;
  activeProjects: number;
  quotationRequests: number;
  technicalRequests: number;
  pendingFollowups: number;
  wonOpportunities: number;
  estimatedPipelineEgp: number;
}
