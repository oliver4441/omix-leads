import { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Search, Store, Bell, LogOut,
  ChevronDown, RefreshCw, Loader2, Shield, CheckCircle, XCircle, AlertCircle, Eye,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { formatKES, LEAD_STATUSES, LEAD_TYPES } from '../lib/constants';

/* ─── Admin Guard ─── */
function AdminGuard({ children }) {
  if (localStorage.getItem('omix_admin') !== 'true') {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}

/* ─── Sub-pages ─── */

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Overview</h2>
        <button onClick={onRefresh} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"><RefreshCw size={14} /> Refresh</button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className={`rounded-xl p-4 ${s.color}`}>
            <p className="text-sm opacity-80">{s.label}</p>
            <p className="text-2xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <h3 className="font-semibold p-4 border-b">Recent Leads</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr><th className="p-3 text-left">Name</th><th className="p-3 text-left">Type</th><th className="p-3 text-left">Phone</th><th className="p-3 text-left">Date</th></tr>
            </thead>
            <tbody>
              {recentLeads.map((l) => (
                <tr key={l.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{l.name}</td>
                  <td className="p-3"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{l.type}</span></td>
                  <td className="p-3">{l.phone}</td>
                  <td className="p-3 text-gray-500">{new Date(l.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {recentLeads.length === 0 && <tr><td colSpan={4} className="p-6 text-center text-gray-400">No leads yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function LeadsPage({ leads, onRefresh, onUpdateStatus }) {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const filtered = leads.filter((l) => {
    const matchSearch = !search || l.name?.toLowerCase().includes(search.toLowerCase()) || l.phone?.includes(search) || l.email?.toLowerCase().includes(search.toLowerCase());
    const matchType = !typeFilter || l.type === typeFilter;
    const matchStatus = !statusFilter || l.status === statusFilter;
    return matchSearch && matchType && matchStatus;
  });

  const statusColor = (status) => {
    const found = LEAD_STATUSES.find((s) => s.value === status);
    return found?.color || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="text-xl font-bold">Leads</h2>
        <button onClick={onRefresh} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"><RefreshCw size={14} /> Refresh</button>
      </div>

      <div className="flex flex-wrap gap-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name, phone, email..."
          className="border rounded-lg px-3 py-2 text-sm flex-1 min-w-[200px] focus:ring-2 focus:ring-[#ff385c] outline-none" />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#ff385c] outline-none">
          <option value="">All Types</option>
          {LEAD_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-[#ff385c] outline-none">
          <option value="">All Statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">County</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{l.name}</td>
                  <td className="p-3"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs">{l.type}</span></td>
                  <td className="p-3">{l.phone}</td>
                  <td className="p-3">{l.county || '—'}</td>
                  <td className="p-3">
                    <select value={l.status || 'new'} onChange={(e) => onUpdateStatus(l.id, e.target.value)}
                      className={`${statusColor(l.status)} px-2 py-1 rounded text-xs font-medium border-0 cursor-pointer`}>
                      {LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </td>
                  <td className="p-3 text-gray-500">{new Date(l.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-gray-400">No leads found</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AuditsPage({ audits, onRefresh }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Business Audits</h2>
        <button onClick={onRefresh} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"><RefreshCw size={14} /> Refresh</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-3 text-left">Business</th>
                <th className="p-3 text-left">Industry</th>
                <th className="p-3 text-left">County</th>
                <th className="p-3 text-left">Score</th>
                <th className="p-3 text-left">Website</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {audits.map((a) => (
                <tr key={a.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{a.business_name}</td>
                  <td className="p-3">{a.industry}</td>
                  <td className="p-3">{a.county}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${(a.score || 0) >= 50 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                      {a.score}/100
                    </span>
                  </td>
                  <td className="p-3">{a.website_url ? <a href={a.website_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-xs">{a.website_url.slice(0, 30)}...</a> : <span className="text-gray-400">—</span>}</td>
                  <td className="p-3 text-gray-500">{new Date(a.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {audits.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-gray-400">No audits yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function VendorsPage({ vendors, onRefresh, onVendorAction }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Vendor Applications</h2>
        <button onClick={onRefresh} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"><RefreshCw size={14} /> Refresh</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-3 text-left">Business</th>
                <th className="p-3 text-left">Owner</th>
                <th className="p-3 text-left">Industry</th>
                <th className="p-3 text-left">County</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((v) => (
                <tr key={v.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{v.business_name}</td>
                  <td className="p-3">{v.owner_name}</td>
                  <td className="p-3">{v.industry}</td>
                  <td className="p-3">{v.county}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      v.status === 'approved' ? 'bg-green-100 text-green-700' :
                      v.status === 'rejected' ? 'bg-red-100 text-red-600' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>{v.status}</span>
                  </td>
                  <td className="p-3">
                    {v.status === 'pending' && (
                      <div className="flex gap-1">
                        <button onClick={() => onVendorAction(v.id, 'approved')} className="text-green-600 hover:text-green-800" title="Approve"><CheckCircle size={18} /></button>
                        <button onClick={() => onVendorAction(v.id, 'rejected')} className="text-red-500 hover:text-red-700" title="Reject"><XCircle size={18} /></button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {vendors.length === 0 && <tr><td colSpan={6} className="p-6 text-center text-gray-400">No vendor applications</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function AlertsPage({ alerts, onRefresh }) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Deal Alert Subscribers</h2>
        <button onClick={onRefresh} className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"><RefreshCw size={14} /> Refresh</button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Category</th>
                <th className="p-3 text-left">County</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((a) => (
                <tr key={a.id} className="border-t hover:bg-gray-50">
                  <td className="p-3 font-medium">{a.name}</td>
                  <td className="p-3">{a.phone}</td>
                  <td className="p-3"><span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-xs">{a.category}</span></td>
                  <td className="p-3">{a.county}</td>
                  <td className="p-3 text-gray-500">{new Date(a.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {alerts.length === 0 && <tr><td colSpan={5} className="p-6 text-center text-gray-400">No subscribers yet</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Dashboard ─── */

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
  const [leads, setLeads] = useState([]);
  const [audits, setAudits] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [leadsRes, auditsRes, vendorsRes, alertsRes] = await Promise.all([
        supabase.from('leads').select('*').order('created_at', { ascending: false }),
        supabase.from('business_audits').select('*').order('created_at', { ascending: false }),
        supabase.from('vendor_applications').select('*').order('created_at', { ascending: false }),
        supabase.from('deal_alerts').select('*').order('created_at', { ascending: false }),
      ]);
      setLeads(leadsRes.data || []);
      setAudits(auditsRes.data || []);
      setVendors(vendorsRes.data || []);
      setAlerts(alertsRes.data || []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, []);

  const handleUpdateStatus = async (id, status) => {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (!error) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    }
  };

  const handleVendorAction = async (id, status) => {
    const { error } = await supabase.from('vendor_applications').update({ status }).eq('id', id);
    if (!error) {
      setVendors((prev) => prev.map((v) => (v.id === id ? { ...v, status } : v)));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('omix_admin');
    navigate('/admin/login');
  };

  const renderPage = () => {
    if (loading) {
      return <div className="flex items-center justify-center py-20 text-gray-400"><Loader2 className="animate-spin mr-2" size={20} /> Loading...</div>;
    }
    switch (page) {
      case 'overview': return <Overview leads={leads} audits={audits} vendors={vendors} alerts={alerts} onRefresh={fetchAll} />;
      case 'leads': return <LeadsPage leads={leads} onRefresh={fetchAll} onUpdateStatus={handleUpdateStatus} />;
      case 'audits': return <AuditsPage audits={audits} onRefresh={fetchAll} />;
      case 'vendors': return <VendorsPage vendors={vendors} onRefresh={fetchAll} onVendorAction={handleVendorAction} />;
      case 'alerts': return <AlertsPage alerts={alerts} onRefresh={fetchAll} />;
      default: return null;
    }
  };

  return (
    <AdminGuard>
      <div className="min-h-screen bg-gray-50 flex">
        {/* Sidebar */}
        <aside className="w-56 bg-gray-900 text-white flex flex-col shrink-0">
          <div className="p-4 border-b border-gray-800">
            <h1 className="font-bold text-lg">Omix Admin</h1>
            <p className="text-xs text-gray-400">Dashboard</p>
          </div>
          <nav className="flex-1 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => setPage(item.key)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                  page === item.key ? 'bg-[#ff385c] text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                <item.icon size={18} /> {item.label}
              </button>
            ))}
          </nav>
          <div className="p-4 border-t border-gray-800">
            <button onClick={handleLogout} className="w-full flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
              <LogOut size={16} /> Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 overflow-auto">
          {renderPage()}
        </main>
      </div>
    </AdminGuard>
  );
}
