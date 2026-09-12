import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Search, Store, Bell, LogOut,
  RefreshCw, Loader2, CheckCircle, XCircle,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatKES, LEAD_STATUSES, LEAD_TYPES } from '../lib/constants';

function AdminGuard({ children }) {
  const [state, setState] = useState({ loading: true, user: null });

  useEffect(() => {
    if (!supabase) {
      setState({ loading: false, user: null });
      return undefined;
    }

    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (mounted) setState({ loading: false, user: data.session?.user || null });
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) setState({ loading: false, user: session?.user || null });
    });

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  if (state.loading) return <div className="min-h-screen flex items-center justify-center text-gray-500"><Loader2 className="animate-spin mr-2" size={20} /> Checking session...</div>;
  if (!state.user) return <Navigate to="/admin/login" replace />;
  return children;
}

function Overview({ leads, audits, vendors, alerts, onRefresh }) {
  const totalLeads = leads.length;
  const webLeads = leads.filter((l) => l.type === 'audit' || l.type === 'web_quote').length;
  const storeLeads = leads.filter((l) => l.type === 'deal_alert' || l.type === 'vendor_application' || l.type === 'referral').length;
  const estRevenue = leads.reduce((sum, l) => sum + (l.estimated_value || 0), 0);
  const stats = [
    { label: 'Total Leads', value: totalLeads, color: 'bg-blue-50 text-blue-600' },
    { label: 'Web Clients', value: webLeads, color: 'bg-purple-50 text-purple-600' },
    { label: 'Store Leads', value: storeLeads, color: 'bg-red-50 text-red-600' },
    { label: 'Est. Revenue', value: formatKES(estRevenue), color: 'bg-green-50 text-green-600' },
  ];
  const recentLeads = [...leads].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);
  return <div className="space-y-6">
    <div className="flex justify-between items-center"><h2 className="text-xl font-bold">Overview</h2><button onClick={onRefresh} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"><RefreshCw size={14} /> Refresh</button></div>
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{stats.map((s) => <div key={s.label} className={`rounded-xl p-4 ${s.color}`}><p className="text-sm opacity-80">{s.label}</p><p className="text-2xl font-bold">{s.value}</p></div>)}</div>
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"><h3 className="font-semibold p-4 border-b">Recent Leads</h3><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-gray-50 text-gray-500"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Type</th><th className="p-3 text-left">Phone</th><th className="p-3 text-left">Date</th></tr></thead><tbody>{recentLeads.map((l) => <tr key={l.id} className="border-t hover:bg-gray-50"><td className="p-3 font-medium">{l.name}</td><td className="p-3"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{l.type}</span></td><td className="p-3">{l.phone}</td><td className="p-3 text-gray-500">{new Date(l.created_at).toLocaleDateString()}</td></tr>)}{recentLeads.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-gray-400">No leads yet</td></tr>}</tbody></table></div></div>
  </div>
}

function LeadsPage({ leads, onRefresh, onUpdateStatus }) {
  const [search, setSearch] = useState(''); const [typeFilter, setTypeFilter] = useState(''); const [statusFilter, setStatusFilter] = useState('');
  const filtered = leads.filter((l) => (!search || l.name?.toLowerCase().includes(search.toLowerCase()) || l.phone?.includes(search) || l.email?.toLowerCase().includes(search.toLowerCase())) && (!typeFilter || l.type === typeFilter) && (!statusFilter || l.status === statusFilter));
  const statusColor = (status) => LEAD_STATUSES.find((s) => s.value === status)?.color || 'bg-gray-100 text-gray-600';
  return <div className="space-y-4"><div className="flex flex-wrap justify-between items-center gap-2"><h2 className="text-xl font-bold">Leads</h2><button onClick={onRefresh} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"><RefreshCw size={14} /> Refresh</button></div><div className="flex flex-wrap gap-2"><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, email..." className="border rounded-lg px-3 py-2 text-sm flex-1 min-w-[200px] focus:ring-2 focus:ring-[#ff385c] outline-none" /><select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm bg-white"><option value="">All Types</option>{LEAD_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}</select><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border rounded-lg px-3 py-2 text-sm bg-white"><option value="">All Statuses</option>{LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}</select></div><div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-gray-50 text-gray-500"><tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Type</th><th className="p-3 text-left">Phone</th><th className="p-3 text-left">County</th><th className="p-3 text-left">Status</th><th className="p-3 text-left">Date</th></tr></thead><tbody>{filtered.map((l) => <tr key={l.id} className="border-t hover:bg-gray-50"><td className="p-3 font-medium">{l.name}</td><td className="p-3"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{l.type}</span></td><td className="p-3">{l.phone}</td><td className="p-3">{l.county || '—'}</td><td className="p-3"><select value={l.status || 'new'} onChange={(e) => onUpdateStatus(l.id, e.target.value)} className={`${statusColor(l.status)} px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer`}>{LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}</select></td><td className="p-3 text-gray-500">{new Date(l.created_at).toLocaleDateString()}</td></tr>)}{filtered.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-gray-400">No leads found</td></tr>}</tbody></table></div></div></div>
}

function DataTable({ title, rows, columns, onRefresh }) {
  return <div className="space-y-4"><div className="flex justify-between items-center"><h2 className="text-xl font-bold">{title}</h2><button onClick={onRefresh} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"><RefreshCw size={14} /> Refresh</button></div><div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"><div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-gray-50 text-gray-500"><tr>{columns.map(c => <th key={c.label} className="p-3 text-left">{c.label}</th>)}</tr></thead><tbody>{rows.map(row => <tr key={row.id} className="border-t hover:bg-gray-50">{columns.map(c => <td key={c.label} className="p-3">{c.render ? c.render(row) : row[c.key] || '—'}</td>)}</tr>)}{rows.length === 0 && <tr><td colSpan={columns.length} className="p-6 text-center text-gray-400">No records yet</td></tr>}</tbody></table></div></div></div>
}

const navItems = [
  { key: 'overview', label: 'Overview', icon: LayoutDashboard },
  { key: 'leads', label: 'Leads', icon: Users },
  { key: 'audits', label: 'Audits', icon: Search },
  { key: 'vendors', label: 'Vendors', icon: Store },
  { key: 'alerts', label: 'Alerts', icon: Bell },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [page, setPage] = useState('overview');
  const [leads, setLeads] = useState([]); const [audits, setAudits] = useState([]); const [vendors, setVendors] = useState([]); const [alerts, setAlerts] = useState([]); const [loading, setLoading] = useState(true);
  const fetchAll = async () => {
    if (!supabase) return;
    setLoading(true);
    const [leadsRes, auditsRes, vendorsRes, alertsRes] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }), supabase.from('business_audits').select('*').order('created_at', { ascending: false }), supabase.from('vendor_applications').select('*').order('created_at', { ascending: false }), supabase.from('deal_alerts').select('*').order('created_at', { ascending: false }),
    ]);
    if (leadsRes.error) console.error('Leads fetch:', leadsRes.error); if (auditsRes.error) console.error('Audits fetch:', auditsRes.error); if (vendorsRes.error) console.error('Vendors fetch:', vendorsRes.error); if (alertsRes.error) console.error('Alerts fetch:', alertsRes.error);
    setLeads(leadsRes.data || []); setAudits(auditsRes.data || []); setVendors(vendorsRes.data || []); setAlerts(alertsRes.data || []); setLoading(false);
  };
  useEffect(() => { fetchAll(); }, []);
  const handleUpdateStatus = async (id, status) => { const { error } = await supabase.from('leads').update({ status }).eq('id', id); if (!error) setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l)); };
  const handleVendorAction = async (id, status) => { const { error } = await supabase.from('vendor_applications').update({ status }).eq('id', id); if (!error) setVendors(prev => prev.map(v => v.id === id ? { ...v, status } : v)); };
  const handleLogout = async () => { await supabase?.auth.signOut(); navigate('/admin/login'); };
  const renderPage = () => {
    if (loading) return <div className="flex items-center justify-center py-20 text-gray-400"><Loader2 className="animate-spin mr-2" size={20} /> Loading...</div>;
    switch (page) {
      case 'overview': return <Overview leads={leads} audits={audits} vendors={vendors} alerts={alerts} onRefresh={fetchAll} />;
      case 'leads': return <LeadsPage leads={leads} onRefresh={fetchAll} onUpdateStatus={handleUpdateStatus} />;
      case 'audits': return <DataTable title="Business Audits" rows={audits} onRefresh={fetchAll} columns={[{label:'Business',key:'business_name'},{label:'Industry',key:'industry'},{label:'County',key:'county'},{label:'Score',key:'score'},{label:'Website',key:'website_url'},{label:'Date',render:r=>new Date(r.created_at).toLocaleDateString()}]} />;
      case 'vendors': return <DataTable title="Vendor Applications" rows={vendors} onRefresh={fetchAll} columns={[{label:'Business',key:'business_name'},{label:'Owner',key:'owner_name'},{label:'Industry',key:'industry'},{label:'County',key:'county'},{label:'Status',key:'status'},{label:'Action',render:r=>r.status==='pending'?<div className="flex gap-2"><button onClick={()=>handleVendorAction(r.id,'approved')} className="text-green-600" title="Approve"><CheckCircle size={18}/></button><button onClick={()=>handleVendorAction(r.id,'rejected')} className="text-red-500" title="Reject"><XCircle size={18}/></button></div>:'—'}]} />;
      case 'alerts': return <DataTable title="Deal Alert Subscribers" rows={alerts} onRefresh={fetchAll} columns={[{label:'Name',key:'name'},{label:'Phone',key:'phone'},{label:'Category',key:'category'},{label:'County',key:'county'},{label:'Date',render:r=>new Date(r.created_at).toLocaleDateString()}]} />;
      default: return null;
    }
  };
  return <AdminGuard><div className="min-h-screen bg-gray-50 flex"><aside className="w-56 bg-gray-900 text-white flex flex-col shrink-0"><div className="p-4 border-b border-gray-800"><h1 className="font-bold text-lg">Omix Admin</h1><p className="text-xs text-gray-400">Dashboard</p></div><nav className="flex-1 py-4 space-y-1">{navItems.map(item=><button key={item.key} onClick={()=>setPage(item.key)} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm ${page===item.key?'bg-[#ff385c] text-white':'text-gray-400 hover:text-white hover:bg-gray-800'}`}><item.icon size={18}/>{item.label}</button>)}</nav><div className="p-4 border-t border-gray-800"><button onClick={handleLogout} className="w-full flex items-center gap-2 text-sm text-gray-400 hover:text-white"><LogOut size={16}/> Logout</button></div></aside><main className="flex-1 p-6 overflow-auto">{renderPage()}</main></div></AdminGuard>;
}
