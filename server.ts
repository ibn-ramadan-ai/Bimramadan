import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_PRODUCTS, INITIAL_PROJECTS, INITIAL_DOCUMENTS, INITIAL_LEADS, INITIAL_CONSULTATIONS, INITIAL_QUOTES } from './src/data/initialData';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // In-memory data store for live API interaction
  let leadsList = [...INITIAL_LEADS];
  let consultationsList = [...INITIAL_CONSULTATIONS];
  let quotesList = [...INITIAL_QUOTES];
  let productsList = [...INITIAL_PRODUCTS];

  // ================= API ROUTES =================

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      company: 'BIN RAMADAN Ai',
      tagline: 'SOLAR ENERGY & WATER PUMPS',
      arabicTagline: 'طلمبات وطاقة شمسية',
      timestamp: new Date().toISOString()
    });
  });

  // Leads API
  app.get('/api/leads', (req, res) => {
    res.json(leadsList);
  });

  app.post('/api/leads', (req, res) => {
    const newLead = {
      id: `lead-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'NEW',
      priority: 'MEDIUM',
      assignedEmployee: 'Unassigned',
      ...req.body
    };
    leadsList.unshift(newLead);
    res.status(201).json(newLead);
  });

  app.patch('/api/leads/:id', (req, res) => {
    const { id } = req.params;
    const index = leadsList.findIndex(l => l.id === id);
    if (index !== -1) {
      leadsList[index] = {
        ...leadsList[index],
        ...req.body,
        updatedAt: new Date().toISOString()
      };
      res.json(leadsList[index]);
    } else {
      res.status(404).json({ error: 'Lead not found' });
    }
  });

  // Technical Consultations API
  app.get('/api/consultations', (req, res) => {
    res.json(consultationsList);
  });

  app.post('/api/consultations', (req, res) => {
    const refNumber = `BRA-TC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newConsultation = {
      id: `tc-${Date.now()}`,
      referenceNo: refNumber,
      createdAt: new Date().toISOString(),
      status: 'PENDING',
      ...req.body
    };

    consultationsList.unshift(newConsultation);

    // Also auto-create a corresponding Lead entry in CRM
    const correspondingLead = {
      id: `lead-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      customer: newConsultation.customerName,
      company: newConsultation.companyOrFarmName || 'Farm Project',
      phone: newConsultation.phone,
      whatsapp: newConsultation.whatsapp || newConsultation.phone,
      email: newConsultation.email || '',
      location: `${newConsultation.governorate} - ${newConsultation.projectLocation}`,
      leadSource: 'WEBSITE_FORM' as const,
      interestedProduct: `Solar Pump Assessment: ${newConsultation.requiredFlowRate} @ ${newConsultation.requiredHead}`,
      projectType: newConsultation.applicationType,
      estimatedValueEgp: 950000,
      status: 'NEW' as const,
      priority: 'HIGH' as const,
      assignedEmployee: 'Technical Team',
      notes: `Flow Rate: ${newConsultation.requiredFlowRate}, Head: ${newConsultation.requiredHead}, Water Source: ${newConsultation.waterSource}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    leadsList.unshift(correspondingLead);

    res.status(201).json({
      success: true,
      referenceNo: refNumber,
      data: newConsultation
    });
  });

  // Quotations API
  app.get('/api/quotes', (req, res) => {
    res.json(quotesList);
  });

  app.post('/api/quotes', (req, res) => {
    const refNumber = `BRA-QR-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newQuote = {
      id: `qr-${Date.now()}`,
      referenceNo: refNumber,
      createdAt: new Date().toISOString(),
      status: 'NEW',
      ...req.body
    };

    quotesList.unshift(newQuote);

    // Auto-create lead
    const correspondingLead = {
      id: `lead-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      customer: newQuote.customerName,
      company: newQuote.companyName || 'Agri Client',
      phone: newQuote.phone,
      whatsapp: newQuote.whatsapp || newQuote.phone,
      email: newQuote.email || '',
      location: newQuote.location,
      leadSource: 'WEBSITE_FORM' as const,
      interestedProduct: newQuote.productOrService,
      projectType: 'Quotation Request',
      estimatedValueEgp: 1200000,
      status: 'QUOTATION_REQUESTED' as const,
      priority: 'HIGH' as const,
      assignedEmployee: 'Sales Team',
      notes: `Requested: ${newQuote.productOrService}. Qty: ${newQuote.requiredQuantity}. Budget: ${newQuote.budgetRange}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    leadsList.unshift(correspondingLead);

    res.status(201).json({
      success: true,
      referenceNo: refNumber,
      data: newQuote
    });
  });

  // Catalog, Projects, Documents
  app.get('/api/products', (req, res) => {
    res.json(productsList);
  });

  app.get('/api/projects', (req, res) => {
    res.json(INITIAL_PROJECTS);
  });

  app.get('/api/documents', (req, res) => {
    res.json(INITIAL_DOCUMENTS);
  });

  // Analytics Stats
  app.get('/api/stats', (req, res) => {
    const totalEgp = leadsList.reduce((acc, curr) => acc + (curr.estimatedValueEgp || 0), 0);
    res.json({
      totalLeads: leadsList.length,
      newLeads: leadsList.filter(l => l.status === 'NEW').length,
      activeProjects: INITIAL_PROJECTS.length,
      quotationRequests: quotesList.length,
      technicalRequests: consultationsList.length,
      pendingFollowups: leadsList.filter(l => l.status === 'FOLLOW_UP').length,
      wonOpportunities: leadsList.filter(l => l.status === 'WON').length,
      estimatedPipelineEgp: totalEgp
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`BIN RAMADAN Ai Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
