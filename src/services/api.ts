import { Lead, TechnicalConsultationRequest, QuotationRequest, Product, ProjectItem, DocumentItem, DashboardMetrics } from '../types';
import { INITIAL_PRODUCTS, INITIAL_PROJECTS, INITIAL_DOCUMENTS, INITIAL_LEADS, INITIAL_CONSULTATIONS, INITIAL_QUOTES } from '../data/initialData';

// Local storage keys for client side persistence fallback
const STORAGE_KEYS = {
  LEADS: 'bra_leads_v1',
  CONSULTATIONS: 'bra_consultations_v1',
  QUOTES: 'bra_quotes_v1',
  PRODUCTS: 'bra_products_v1',
};

// Helper to initialize local storage
function getStored<T>(key: string, defaultValue: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStored<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error', e);
  }
}

export const api = {
  async getProducts(): Promise<Product[]> {
    try {
      const res = await fetch('/api/products');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return getStored(STORAGE_KEYS.PRODUCTS, INITIAL_PRODUCTS);
  },

  async getProjects(): Promise<ProjectItem[]> {
    try {
      const res = await fetch('/api/projects');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return INITIAL_PROJECTS;
  },

  async getDocuments(): Promise<DocumentItem[]> {
    try {
      const res = await fetch('/api/documents');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return INITIAL_DOCUMENTS;
  },

  async getLeads(): Promise<Lead[]> {
    try {
      const res = await fetch('/api/leads');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return getStored(STORAGE_KEYS.LEADS, INITIAL_LEADS);
  },

  async updateLead(id: string, updates: Partial<Lead>): Promise<Lead> {
    try {
      const res = await fetch(`/api/leads/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    const currentLeads = getStored(STORAGE_KEYS.LEADS, INITIAL_LEADS);
    const index = currentLeads.findIndex(l => l.id === id);
    if (index !== -1) {
      currentLeads[index] = { ...currentLeads[index], ...updates, updatedAt: new Date().toISOString() };
      setStored(STORAGE_KEYS.LEADS, currentLeads);
      return currentLeads[index];
    }
    throw new Error('Lead not found');
  },

  async getConsultations(): Promise<TechnicalConsultationRequest[]> {
    try {
      const res = await fetch('/api/consultations');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return getStored(STORAGE_KEYS.CONSULTATIONS, INITIAL_CONSULTATIONS);
  },

  async submitConsultation(data: Omit<TechnicalConsultationRequest, 'id' | 'referenceNo' | 'createdAt' | 'status'>): Promise<{ referenceNo: string; data: TechnicalConsultationRequest }> {
    try {
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const responseData = await res.json();
        return { referenceNo: responseData.referenceNo, data: responseData.data };
      }
    } catch {
      // fallback
    }

    const refNumber = `BRA-TC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newConsultation: TechnicalConsultationRequest = {
      id: `tc-${Date.now()}`,
      referenceNo: refNumber,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
      ...data,
    };

    const consultations = getStored(STORAGE_KEYS.CONSULTATIONS, INITIAL_CONSULTATIONS);
    consultations.unshift(newConsultation);
    setStored(STORAGE_KEYS.CONSULTATIONS, consultations);

    // Also auto-generate lead
    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      customer: data.customerName,
      company: data.companyOrFarmName || 'Agri Farm Project',
      phone: data.phone,
      whatsapp: data.whatsapp || data.phone,
      email: '',
      location: `${data.governorate} - ${data.projectLocation}`,
      leadSource: 'WEBSITE_FORM',
      interestedProduct: `Solar Pump Assessment: ${data.requiredFlowRate} @ ${data.requiredHead}`,
      projectType: data.applicationType || 'Groundwater Irrigation',
      estimatedValueEgp: 950000,
      status: 'NEW',
      priority: 'HIGH',
      assignedEmployee: 'Technical Team',
      notes: `Flow: ${data.requiredFlowRate}, Head: ${data.requiredHead}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const leads = getStored(STORAGE_KEYS.LEADS, INITIAL_LEADS);
    leads.unshift(newLead);
    setStored(STORAGE_KEYS.LEADS, leads);

    return { referenceNo: refNumber, data: newConsultation };
  },

  async getQuotes(): Promise<QuotationRequest[]> {
    try {
      const res = await fetch('/api/quotes');
      if (res.ok) return await res.json();
    } catch {
      // fallback
    }
    return getStored(STORAGE_KEYS.QUOTES, INITIAL_QUOTES);
  },

  async submitQuoteRequest(data: Omit<QuotationRequest, 'id' | 'referenceNo' | 'createdAt' | 'status'>): Promise<{ referenceNo: string; data: QuotationRequest }> {
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const responseData = await res.json();
        return { referenceNo: responseData.referenceNo, data: responseData.data };
      }
    } catch {
      // fallback
    }

    const refNumber = `BRA-QR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQuote: QuotationRequest = {
      id: `qr-${Date.now()}`,
      referenceNo: refNumber,
      createdAt: new Date().toISOString(),
      status: 'NEW',
      ...data,
    };

    const quotes = getStored(STORAGE_KEYS.QUOTES, INITIAL_QUOTES);
    quotes.unshift(newQuote);
    setStored(STORAGE_KEYS.QUOTES, quotes);

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      customer: data.customerName,
      company: data.companyName || 'Agri Client',
      phone: data.phone,
      whatsapp: data.whatsapp || data.phone,
      email: data.email || '',
      location: data.location,
      leadSource: 'WEBSITE_FORM',
      interestedProduct: data.productOrService,
      projectType: 'Quotation Request',
      estimatedValueEgp: 1200000,
      status: 'QUOTATION_REQUESTED',
      priority: 'HIGH',
      assignedEmployee: 'Sales Team',
      notes: `Req: ${data.productOrService}, Qty: ${data.requiredQuantity}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const leads = getStored(STORAGE_KEYS.LEADS, INITIAL_LEADS);
    leads.unshift(newLead);
    setStored(STORAGE_KEYS.LEADS, leads);

    return { referenceNo: refNumber, data: newQuote };
  },

  async getMetrics(): Promise<DashboardMetrics> {
    const leads = await this.getLeads();
    const consultations = await this.getConsultations();
    const quotes = await this.getQuotes();
    const projects = await this.getProjects();

    const totalEgp = leads.reduce((acc, curr) => acc + (curr.estimatedValueEgp || 0), 0);

    return {
      totalLeads: leads.length,
      newLeads: leads.filter(l => l.status === 'NEW').length,
      activeProjects: projects.length,
      quotationRequests: quotes.length,
      technicalRequests: consultations.length,
      pendingFollowups: leads.filter(l => l.status === 'FOLLOW_UP').length,
      wonOpportunities: leads.filter(l => l.status === 'WON').length,
      estimatedPipelineEgp: totalEgp,
    };
  }
};
