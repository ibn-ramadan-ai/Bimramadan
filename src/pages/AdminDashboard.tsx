import React, { useState, useEffect } from 'react';
import { Language, Lead, TechnicalConsultationRequest, QuotationRequest, DashboardMetrics, LeadStatus } from '../types';
import { getTranslation } from '../data/translations';
import { api } from '../services/api';
import {
  LayoutDashboard,
  Users,
  FileText,
  Calculator,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertCircle,
  TrendingUp,
  Download,
  Edit,
  DollarSign,
  PieChart,
  BarChart,
  MapPin,
  RefreshCw,
} from 'lucide-react';

interface AdminDashboardProps {
  currentLang: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentLang }) => {
  const text = getTranslation(currentLang);
  const isRtl = currentLang === 'ar';

  const [activeTab, setActiveTab] = useState<'leads' | 'consultations' | 'quotes' | 'analytics'>('leads');
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [consultations, setConsultations] = useState<TechnicalConsultationRequest[]>([]);
  const [quotes, setQuotes] = useState<QuotationRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  // Lead Status Edit Modal state
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [editStatus, setEditStatus] = useState<LeadStatus>('NEW');
  const [editNotes, setEditNotes] = useState('');

  const loadData = async () => {
    try {
      const [m, l, c, q] = await Promise.all([
        api.getMetrics(),
        api.getLeads(),
        api.getConsultations(),
        api.getQuotes(),
      ]);
      setMetrics(m);
      setLeads(l);
      setConsultations(c);
      setQuotes(q);
    } catch (err) {
      console.error('Failed to load dashboard data', err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateLeadStatus = async () => {
    if (!editingLead) return;
    try {
      await api.updateLead(editingLead.id, {
        status: editStatus,
        notes: editNotes,
      });
      setEditingLead(null);
      loadData();
    } catch (err) {
      console.error('Error updating lead status', err);
    }
  };

  const filteredLeads = leads.filter((l) => {
    const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;
    const matchesSearch =
      l.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ leads, consultations, quotes }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `bin_ramadan_ai_leads_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="bg-[#071A2B] text-white p-6 sm:p-8 rounded-2xl border border-blue-900 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
            <LayoutDashboard className="w-4 h-4" />
            <span>{isRtl ? 'إدارة الأعمال والعملاء' : 'Internal Business Management Portal'}</span>
          </div>
          <h1 className="text-xl sm:text-3xl font-black text-white mt-1">
            {text.adminTitle}
          </h1>
          <p className="text-xs text-slate-300 pt-0.5">
            {text.adminSub}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadData}
            className="bg-blue-900/80 hover:bg-blue-800 text-sky-300 px-3.5 py-2 rounded-xl text-xs font-bold border border-blue-700/50 flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>{isRtl ? 'تحديث' : 'Refresh'}</span>
          </button>

          <button
            onClick={exportToJson}
            className="bg-sky-500 hover:bg-sky-400 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isRtl ? 'تصدير البيانات' : 'Export JSON'}</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards Grid */}
      {metrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] text-slate-500 font-medium block">{text.metricTotalLeads}</span>
            <span className="text-xl font-black text-slate-900 block">{metrics.totalLeads}</span>
          </div>

          <div className="bg-sky-50 p-3.5 rounded-xl border border-sky-200 shadow-sm space-y-1">
            <span className="text-[11px] text-sky-800 font-medium block">{text.metricNewLeads}</span>
            <span className="text-xl font-black text-sky-900 block">{metrics.newLeads}</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] text-slate-500 font-medium block">{text.metricActiveProjects}</span>
            <span className="text-xl font-black text-slate-900 block">{metrics.activeProjects}</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] text-slate-500 font-medium block">{text.metricQuoteReqs}</span>
            <span className="text-xl font-black text-slate-900 block">{metrics.quotationRequests}</span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] text-slate-500 font-medium block">{text.metricTechReqs}</span>
            <span className="text-xl font-black text-slate-900 block">{metrics.technicalRequests}</span>
          </div>

          <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 shadow-sm space-y-1">
            <span className="text-[11px] text-amber-800 font-medium block">{text.metricPendingFollowups}</span>
            <span className="text-xl font-black text-amber-900 block">{metrics.pendingFollowups}</span>
          </div>

          <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 shadow-sm space-y-1">
            <span className="text-[11px] text-emerald-800 font-medium block">{text.metricWonOpportunities}</span>
            <span className="text-xl font-black text-emerald-900 block">{metrics.wonOpportunities}</span>
          </div>

          <div className="bg-[#0B2E59] text-white p-3.5 rounded-xl border border-blue-800 shadow-sm space-y-1">
            <span className="text-[10px] text-sky-300 font-medium block">{text.metricPipelineValue}</span>
            <span className="text-xs font-black text-sky-400 block font-mono">
              {(metrics.estimatedPipelineEgp / 1000000).toFixed(2)} M EGP
            </span>
          </div>
        </div>
      )}

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        {[
          { id: 'leads', label: text.tabLeads, icon: Users, count: leads.length },
          { id: 'consultations', label: text.tabConsultations, icon: Calculator, count: consultations.length },
          { id: 'quotes', label: text.tabQuotes, icon: FileText, count: quotes.length },
          { id: 'analytics', label: text.tabAnalytics, icon: BarChart, count: null },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-[#0B2E59] text-sky-300 shadow-sm border border-sky-400/40'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== null && (
                <span className="bg-sky-500 text-slate-950 px-1.5 py-0.5 rounded-full text-[10px] font-black">
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB 1: LEADS MANAGEMENT */}
      {activeTab === 'leads' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm space-y-4 p-5">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute top-3 left-3 rtl:left-auto rtl:right-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isRtl ? 'بحث باسم العميل، المزرعة، أو الموقع...' : 'Search leads, customer, location...'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 rtl:pl-3 rtl:pr-9 py-2 text-xs text-slate-900 focus:outline-none focus:border-sky-500"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs text-slate-500 font-bold">{isRtl ? 'الحالة:' : 'Status:'}</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-medium focus:outline-none"
              >
                <option value="ALL">{isRtl ? 'الكل' : 'All Statuses'}</option>
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="QUALIFIED">QUALIFIED</option>
                <option value="QUOTATION_REQUESTED">QUOTATION_REQUESTED</option>
                <option value="WON">WON</option>
                <option value="LOST">LOST</option>
              </select>
            </div>
          </div>

          {/* Leads Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left rtl:text-right border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3">Lead ID</th>
                  <th className="p-3">{isRtl ? 'العميل والمزرعة' : 'Customer / Company'}</th>
                  <th className="p-3">{isRtl ? 'الموقع' : 'Location'}</th>
                  <th className="p-3">{isRtl ? 'المنتج المهتم به' : 'Interested Product'}</th>
                  <th className="p-3">{isRtl ? 'القيمة التقديرية' : 'Est. Value'}</th>
                  <th className="p-3">{isRtl ? 'الحالة' : 'Status'}</th>
                  <th className="p-3">{isRtl ? 'الأولوية' : 'Priority'}</th>
                  <th className="p-3 text-center">{isRtl ? 'إجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-mono font-bold text-slate-500">{lead.id}</td>
                    <td className="p-3">
                      <span className="font-bold text-slate-900 block">{lead.customer}</span>
                      <span className="text-slate-500 text-[11px] block">{lead.company}</span>
                      <span className="text-sky-700 text-[10px] font-mono block" dir="ltr">{lead.phone}</span>
                    </td>
                    <td className="p-3 text-slate-700 font-medium">{lead.location}</td>
                    <td className="p-3 text-slate-800 font-medium max-w-xs">{lead.interestedProduct}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">
                      {lead.estimatedValueEgp?.toLocaleString()} EGP
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold inline-block ${
                          lead.status === 'NEW'
                            ? 'bg-sky-100 text-sky-800 border border-sky-300'
                            : lead.status === 'WON'
                            ? 'bg-emerald-100 text-emerald-800'
                            : lead.status === 'QUOTATION_REQUESTED'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          lead.priority === 'URGENT' || lead.priority === 'HIGH'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        {lead.priority}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => {
                          setEditingLead(lead);
                          setEditStatus(lead.status);
                          setEditNotes(lead.notes || '');
                        }}
                        className="p-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-[11px] font-bold flex items-center gap-1 mx-auto"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>{isRtl ? 'تعديل' : 'Edit'}</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: TECHNICAL CONSULTATIONS */}
      {activeTab === 'consultations' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h2 className="font-bold text-slate-900 text-sm border-b pb-2">
            {isRtl ? 'سجل طلبات الاستشارات الهندسية للآبار والري' : 'Technical Consultation Requests Log'}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left rtl:text-right border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3">Ref No</th>
                  <th className="p-3">{isRtl ? 'العميل' : 'Customer'}</th>
                  <th className="p-3">{isRtl ? 'المحافظة / الموقع' : 'Governorate / Site'}</th>
                  <th className="p-3">{isRtl ? 'التصرف (m³/h) والرفع (m)' : 'Flow & Head'}</th>
                  <th className="p-3">{isRtl ? 'المصدر والقدرة' : 'Source & Power'}</th>
                  <th className="p-3">{isRtl ? 'التاريخ' : 'Date'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {consultations.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-sky-700">{c.referenceNo}</td>
                    <td className="p-3 font-bold text-slate-900">
                      {c.customerName}
                      <span className="block text-[11px] font-normal text-slate-500">{c.companyOrFarmName}</span>
                    </td>
                    <td className="p-3 text-slate-700">{c.governorate} - {c.projectLocation}</td>
                    <td className="p-3 font-mono font-bold text-slate-900">
                      {c.requiredFlowRate} @ {c.requiredHead}
                    </td>
                    <td className="p-3 text-slate-700">{c.waterSource}</td>
                    <td className="p-3 text-slate-500 font-mono">{c.createdAt.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: QUOTATION REQUESTS */}
      {activeTab === 'quotes' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-4">
          <h2 className="font-bold text-slate-900 text-sm border-b pb-2">
            {isRtl ? 'طلبات عروض الأسعار للمعدات والمحطات' : 'Quotation Requests Log'}
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left rtl:text-right border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-3">Ref No</th>
                  <th className="p-3">{isRtl ? 'العميل' : 'Customer'}</th>
                  <th className="p-3">{isRtl ? 'المنتج / الخدمة' : 'Product / Service'}</th>
                  <th className="p-3">{isRtl ? 'الموقع' : 'Location'}</th>
                  <th className="p-3">{isRtl ? 'الميزانية' : 'Budget'}</th>
                  <th className="p-3">{isRtl ? 'التاريخ' : 'Date'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {quotes.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50">
                    <td className="p-3 font-mono font-bold text-sky-700">{q.referenceNo}</td>
                    <td className="p-3 font-bold text-slate-900">
                      {q.customerName}
                      <span className="block text-[11px] font-normal text-slate-500">{q.companyName}</span>
                    </td>
                    <td className="p-3 text-slate-900 font-bold max-w-xs">{q.productOrService}</td>
                    <td className="p-3 text-slate-700">{q.location}</td>
                    <td className="p-3 font-mono text-slate-800">{q.budgetRange}</td>
                    <td className="p-3 text-slate-500 font-mono">{q.createdAt.split('T')[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: ANALYTICS CHARTS */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <PieChart className="w-4 h-4 text-sky-600" />
              <span>{isRtl ? 'توزيع الطلبات حسب المنطقة الجغرافية' : 'Inquiries by Regional Location'}</span>
            </h3>

            <div className="space-y-3 pt-2">
              {[
                { name: 'Wadi El Natrun (وادي النطرون)', pct: 45, count: 18 },
                { name: 'Sadat City (مدينة السادات)', pct: 30, count: 12 },
                { name: 'Badr City Axis (مدينة بدر والمحور)', pct: 15, count: 6 },
                { name: 'Other Agricultural Areas in Egypt', pct: 10, count: 4 },
              ].map((loc, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium text-slate-700">
                    <span>{loc.name}</span>
                    <span className="font-bold text-sky-800">{loc.count} ({loc.pct}%)</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-sky-500 rounded-full" style={{ width: `${loc.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <BarChart className="w-4 h-4 text-emerald-600" />
              <span>{isRtl ? 'المنتجات والحلول الأكثر طلباً' : 'Top Requested Product Types'}</span>
            </h3>

            <div className="space-y-3 pt-2">
              {[
                { name: 'Solar Submersible Pumps (طلمبات غاطسة)', pct: 50 },
                { name: 'Solar Pump Controllers / Inverters (إنفرترات)', pct: 25 },
                { name: 'PV Solar Arrays (ألواح شمسية)', pct: 15 },
                { name: 'Solar Surface Pumps (طلمبات سطحية)', pct: 10 },
              ].map((p, idx) => (
                <div key={idx} className="space-y-1 text-xs">
                  <div className="flex justify-between font-medium text-slate-700">
                    <span>{p.name}</span>
                    <span className="font-bold text-emerald-800">{p.pct}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${p.pct}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lead Edit Status Modal */}
      {editingLead && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 border-b pb-2">
              {isRtl ? 'تحديث حالة الطلب والعميل' : 'Update Lead Status'} - {editingLead.id}
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">{isRtl ? 'الحالة جديدة:' : 'New Status:'}</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as LeadStatus)}
                  className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs text-slate-900 font-bold"
                >
                  <option value="NEW">NEW</option>
                  <option value="CONTACTED">CONTACTED</option>
                  <option value="QUALIFIED">QUALIFIED</option>
                  <option value="QUOTATION_REQUESTED">QUOTATION_REQUESTED</option>
                  <option value="QUOTATION_SENT">QUOTATION_SENT</option>
                  <option value="NEGOTIATION">NEGOTIATION</option>
                  <option value="WON">WON</option>
                  <option value="LOST">LOST</option>
                  <option value="FOLLOW_UP">FOLLOW_UP</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">{isRtl ? 'ملاحظات المتابعة:' : 'Follow-up Notes:'}</label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full bg-slate-50 border rounded-xl p-2.5 text-xs text-slate-900"
                ></textarea>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingLead(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold"
              >
                {isRtl ? 'إلغاء' : 'Cancel'}
              </button>

              <button
                onClick={handleUpdateLeadStatus}
                className="bg-[#0B2E59] hover:bg-[#071A2B] text-white px-5 py-2 rounded-xl text-xs font-bold shadow"
              >
                {isRtl ? 'حفظ التحديث' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
