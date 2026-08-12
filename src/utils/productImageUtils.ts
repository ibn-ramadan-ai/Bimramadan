import { Product } from '../types';

export interface CategoryImageData {
  defaultImage: string;
  secondaryImage?: string;
  fallbackTitleAr: string;
  fallbackTitleEn: string;
  categoryBadgeAr: string;
  categoryBadgeEn: string;
}

export const CATEGORY_IMAGE_MAP: Record<string, CategoryImageData> = {
  'Solar Submersible Pumps': {
    defaultImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80',
    fallbackTitleAr: 'طلمبة غاطسة شمسية - Shakti DCSSP',
    fallbackTitleEn: 'Solar Submersible Pump - Shakti DCSSP',
    categoryBadgeAr: 'طلمبات غاطسة شمسية',
    categoryBadgeEn: 'Solar Submersible Pumps',
  },
  'Solar Surface Pumps': {
    defaultImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    fallbackTitleAr: 'طلمبة سطحية طرد مركزي - Shakti DCSMP',
    fallbackTitleEn: 'Solar Surface Pump - Shakti DCSMP',
    categoryBadgeAr: 'طلمبات سطحية شمسية',
    categoryBadgeEn: 'Solar Surface Pumps',
  },
  'Solar Openwell Pumps': {
    defaultImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    fallbackTitleAr: 'طلمبة آبار مفتوحة - Shakti DCSOP',
    fallbackTitleEn: 'Solar Openwell Pump - Shakti DCSOP',
    categoryBadgeAr: 'طلمبات آبار مفتوحة',
    categoryBadgeEn: 'Solar Openwell Pumps',
  },
  'Solar Pump Controllers': {
    defaultImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80',
    fallbackTitleAr: 'وحدة تحكم ومغير شمسية - Shakti USPC',
    fallbackTitleEn: 'Universal Solar Controller - Shakti USPC',
    categoryBadgeAr: 'وحدات تحكم بالضخ الشمسي',
    categoryBadgeEn: 'Solar Pump Controllers',
  },
  'Inverters & Drives': {
    defaultImage: 'https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    fallbackTitleAr: 'إنفرتر ومغير تردد - Shakti Nandi Drive',
    fallbackTitleEn: 'Solar Inverter & VFD - Shakti Nandi Drive',
    categoryBadgeAr: 'إنفرترات ومغيرات سرعة',
    categoryBadgeEn: 'Inverters & Drives',
  },
  'AC & Multistage Pumps': {
    defaultImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    fallbackTitleAr: 'طلمبة رأسية متعددة المراحل - Shakti AC Multistage',
    fallbackTitleEn: 'Vertical Multistage Pump - Shakti AC Multistage',
    categoryBadgeAr: 'طلمبات AC وطرد مركزي',
    categoryBadgeEn: 'AC & Multistage Pumps',
  },
  'PV Solar Modules': {
    defaultImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    fallbackTitleAr: 'ألواح شمسية مزدوجة الزجاج - TOPCon N-Type',
    fallbackTitleEn: 'Bifacial PV Modules - TOPCon N-Type',
    categoryBadgeAr: 'ألواح شمسية',
    categoryBadgeEn: 'PV Solar Modules',
  },
  'Solar Pumping Systems': {
    defaultImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
    fallbackTitleAr: 'محطة ضخ شمسية متكاملة - تسليم مفتاح',
    fallbackTitleEn: 'Turnkey Solar Pumping Station',
    categoryBadgeAr: 'أنظمة ضخ شمسية متكاملة',
    categoryBadgeEn: 'Solar Pumping Systems',
  },
  'Water Pump Accessories': {
    defaultImage: 'https://images.unsplash.com/photo-1544724569-5f546fd6f2b5?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    fallbackTitleAr: 'كابلات غاطسة مسلحة ووصلات عزل هيدروليكي',
    fallbackTitleEn: 'Submersible Cables & Splicing Kits',
    categoryBadgeAr: 'كابلات وملحقات الطلمبات',
    categoryBadgeEn: 'Pump Cables & Accessories',
  },
  'Irrigation System Components': {
    defaultImage: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?auto=format&fit=crop&w=800&q=80',
    secondaryImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
    fallbackTitleAr: 'هياكل معدنية مجلفنة للقواعد الشمسية',
    fallbackTitleEn: 'Galvanized Solar Mounting Structures',
    categoryBadgeAr: 'هياكل وتجهيزات الري',
    categoryBadgeEn: 'Mounting & Structures',
  },
};

export const DEFAULT_FALLBACK_CATEGORY: CategoryImageData = {
  defaultImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
  secondaryImage: 'https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=800&q=80',
  fallbackTitleAr: 'معدة ضخ وحلول شمسية - بن رمضان Ai × Shakti Pumps',
  fallbackTitleEn: 'Solar Pumping Equipment - BIN RAMADAN Ai × Shakti Pumps',
  categoryBadgeAr: 'حلول ضخ المياه بالطاقة الشمسية',
  categoryBadgeEn: 'Solar Water Pumping Solutions',
};

export function getCategoryData(category?: string): CategoryImageData {
  if (!category) return DEFAULT_FALLBACK_CATEGORY;
  return CATEGORY_IMAGE_MAP[category] || DEFAULT_FALLBACK_CATEGORY;
}

export function getProductPrimaryImage(product: Partial<Product>): string {
  if (product.image && typeof product.image === 'string' && product.image.trim() !== '' && product.image !== 'undefined') {
    return product.image;
  }
  const categoryData = getCategoryData(product.category);
  return categoryData.defaultImage;
}
