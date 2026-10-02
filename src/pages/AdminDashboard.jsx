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

  if (state.loading) {
    return (
      <div className="hand-page grid min-h-[60vh] place-items-center">
        <p className="ink-soft flex items-center gap-2.5">
          <Loader2 className="animate-spin" size={20} aria-hidden="true" /> Checking your session…
        </p>
      </div>
    );
  }
  if (!state.user) return <Navigate to="/admin/login" replace />;
  return children;
}

/* Status pills use the palette rather than an arbitrary rainbow: marker red for
   the states that need attention, ballpoint blue for progress, pencil for the rest. */
const statusTone = (status) => {
  if (status === 'won') return 'status-won';
  if (status === 'lost') return 'status-lost';
  if (status === 'new') return 'status-new';
  return 'status-mid';
};

function RefreshButton({ onRefresh }) {
  return (
    <button type="button" onClick={onRefresh} className="btn btn-quiet">
      <RefreshCw size={15} aria-hidden="true" /> Refresh
    </button>
  );
}

function Overview({ leads, onRefresh }) {
  const totalLeads = leads.length;
  const webLeads = leads.filter((l) => l.type === 'audit' || l.type === 'web_quote').length;
  const storeLeads = leads.filter((l) => l.type === 'deal_alert' || l.type === 'vendor_application' || l.type === 'referral').length;
  const estRevenue = leads.reduce((sum, l) => sum + (l.estimated_value || 0), 0);
  const stats = [
    { label: 'Total leads', value: totalLeads },
    { label: 'Web clients', value: webLeads },
    { label: 'Store leads', value: storeLeads },
    { label: 'Est. revenue', value: formatKES(estRevenue) },
  ];
  const recentLeads = [...leads].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 10);

  return (
    <div className="hand-stack" style={{ '--stack-gap': '26px' }}>
      <div className="section-head">
        <div>
          <p className="kicker">Admin</p>
          <h2 className="hand-h3">Overview</h2>
        </div>
        <RefreshButton onRefresh={onRefresh} />
      </div>

      <div className="stat-tiles">
        {stats.map((s, i) => (
          <div key={s.label} className={`card card-pad ${i % 2 ? 'tilt-1' : 'tilt-n1'}`}>
            <p className="kicker">{s.label}</p>
            <p className="stat-tile-value">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="admin-panel-title">Recent leads</h3>
        <div className="overflow-x-auto">
          <table className="hand-table">
            <thead>
              <tr><th>Name</th><th>Type</th><th>Phone</th><th>Date</th></tr>
            </thead>
            <tbody>
              {recentLeads.map((l) => (
                <tr key={l.id}>
                  <td>{l.name}</td>
                  <td><span className="chip">{l.type}</span></td>
                  <td>{l.phone}</td>
                  <td className="muted">{new Date(l.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {recentLeads.length === 0 && (
                <tr><td colSpan={4} className="p-8 text-center muted">No leads yet.</td></tr>
              )}
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
  const filtered = leads.filter((l) => (!search || l.name?.toLowerCase().includes(search.toLowerCase()) || l.phone?.includes(search) || l.email?.toLowerCase().includes(search.toLowerCase())) && (!typeFilter || l.type === typeFilter) && (!statusFilter || l.status === statusFilter));

  return (
    <div className="hand-stack" style={{ '--stack-gap': '22px' }}>
      <div className="section-head">
        <div>
          <p className="kicker">Pipeline</p>
          <h2 className="hand-h3">Leads</h2>
        </div>
        <RefreshButton onRefresh={onRefresh} />
      </div>

      <div className="admin-filters">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, phone, email…"
          aria-label="Search leads"
          className="field"
        />
        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} aria-label="Filter by type" className="field">
          <option value="">All types</option>
          {LEAD_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} aria-label="Filter by status" className="field">
          <option value="">All statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </div>

      <div className="card">
        <div className="overflow-x-auto">
          <table className="hand-table">
            <thead>
              <tr><th>Name</th><th>Type</th><th>Phone</th><th>County</th><th>Status</th><th>Date</th></tr>
            </thead>
            <tbody>
              {filtered.map((l) => (
                <tr key={l.id}>
                  <td>{l.name}</td>
                  <td><span className="chip">{l.type}</span></td>
                  <td>{l.phone}</td>
                  <td>{l.county || '—'}</td>
                  <td>
                    <select
                      value={l.status || 'new'}
                      onChange={(e) => onUpdateStatus(l.id, e.target.value)}
                      aria-label={`Status for ${l.name}`}
                      className={`field field-compact ${statusTone(l.status)}`}
                    >
                      {LEAD_STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </td>
                  <td className="muted">{new Date(l.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={6} className="p-8 text-center muted">No leads match those filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function DataTable({ title, kicker, rows, columns, onRefresh }) {
  return (
    <div className="hand-stack" style={{ '--stack-gap': '22px' }}>
      <div className="section-head">
        <div>
          <p className="kicker">{kicker}</p>
          <h2 className="hand-h3">{title}</h2>
        </div>
        <RefreshButton onRefresh={onRefresh} />
      </div>
      <div className="card">
        <div className="overflow-x-auto">
          <table className="hand-table">
            <thead>
              <tr>{columns.map(c => <th key={c.label}>{c.label}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.id}>
                  {columns.map(c => <td key={c.label}>{c.render ? c.render(row) : row[c.key] || '—'}</td>)}
                </tr>
              ))}
              {rows.length === 0 && (
                <tr><td colSpan={columns.length} className="p-8 text-center muted">Nothing filed here yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
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
  const [leads, setLeads] = useState([]);
  const [audits, setAudits] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAll = async () => {
    if (!supabase) return;
    setLoading(true);
    const [leadsRes, auditsRes, vendorsRes, alertsRes] = await Promise.all([
      supabase.from('leads').select('*').order('created_at', { ascending: false }),
      supabase.from('business_audits').select('*').order('created_at', { ascending: false }),
      supabase.from('vendor_applications').select('*').order('created_at', { ascending: false }),
      supabase.from('deal_alerts').select('*').order('created_at', { ascending: false }),
    ]);
    if (leadsRes.error) console.error('Leads fetch:', leadsRes.error);
    if (auditsRes.error) console.error('Audits fetch:', auditsRes.error);
    if (vendorsRes.error) console.error('Vendors fetch:', vendorsRes.error);
    if (alertsRes.error) console.error('Alerts fetch:', alertsRes.error);
    setLeads(leadsRes.data || []);
    setAudits(auditsRes.data || []);
    setVendors(vendorsRes.data || []);
    setAlerts(alertsRes.data || []);
    setLoading(false);
  };
  useEffect(() => { fetchAll(); }, []);

  const handleUpdateStatus = async (id, status) => {
    const { error } = await supabase.from('leads').update({ status }).eq('id', id);
    if (!error) setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };
  const handleVendorAction = async (id, status) => {
    const { error } = await supabase.from('vendor_applications').update({ status }).eq('id', id);
    if (!error) setVendors(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };
  const handleLogout = async () => { await supabase?.auth.signOut(); navigate('/admin/login'); };

  const renderPage = () => {
    if (loading) {
      return (
        <div className="grid place-items-center py-20">
          <p className="ink-soft flex items-center gap-2.5">
            <Loader2 className="animate-spin" size={20} aria-hidden="true" /> Loading the notebook…
          </p>
        </div>
      );
    }
    switch (page) {
      case 'overview': return <Overview leads={leads} onRefresh={fetchAll} />;
      case 'leads': return <LeadsPage leads={leads} onRefresh={fetchAll} onUpdateStatus={handleUpdateStatus} />;
      case 'audits': return <DataTable kicker="Business" title="Audits" rows={audits} onRefresh={fetchAll} columns={[{ label: 'Business', key: 'business_name' }, { label: 'Industry', key: 'industry' }, { label: 'County', key: 'county' }, { label: 'Score', key: 'score' }, { label: 'Website', key: 'website_url' }, { label: 'Date', render: r => new Date(r.created_at).toLocaleDateString() }]} />;
      case 'vendors': return <DataTable kicker="OMIX Store" title="Vendor applications" rows={vendors} onRefresh={fetchAll} columns={[{ label: 'Business', key: 'business_name' }, { label: 'Owner', key: 'owner_name' }, { label: 'Industry', key: 'industry' }, { label: 'County', key: 'county' }, { label: 'Status', key: 'status' }, { label: 'Action', render: r => r.status === 'pending' ? <div className="flex gap-2"><button onClick={() => handleVendorAction(r.id, 'approved')} className="icon-btn" title="Approve" aria-label={`Approve ${r.business_name}`}><CheckCircle size={18} aria-hidden="true" /></button><button onClick={() => handleVendorAction(r.id, 'rejected')} className="icon-btn" title="Reject" aria-label={`Reject ${r.business_name}`}><XCircle size={18} aria-hidden="true" /></button></div> : '—' }]} />;
      case 'alerts': return <DataTable kicker="Subscribers" title="Deal alerts" rows={alerts} onRefresh={fetchAll} columns={[{ label: 'Name', key: 'name' }, { label: 'Phone', key: 'phone' }, { label: 'Category', key: 'category' }, { label: 'County', key: 'county' }, { label: 'Date', render: r => new Date(r.created_at).toLocaleDateString() }]} />;
      default: return null;
    }
  };

  return (
    <AdminGuard>
      <div className="hand-page admin-shell">
        <aside className="admin-side">
          <div className="admin-side-head">
            <span className="brand-name">OMIX Admin</span>
            <span className="brand-kicker">Lead notebook</span>
          </div>
          <nav className="admin-nav" aria-label="Admin sections">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setPage(item.key)}
                aria-current={page === item.key ? 'page' : undefined}
              >
                <item.icon size={19} aria-hidden="true" /> {item.label}
              </button>
            ))}
          </nav>
          <div className="admin-side-foot">
            <button type="button" onClick={handleLogout}>
              <LogOut size={17} aria-hidden="true" /> Log out
            </button>
          </div>
        </aside>
        <main className="admin-main">{renderPage()}</main>
      </div>
    </AdminGuard>
  );
}
