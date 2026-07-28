import urllib.request, json

pat = 'sbp_80863d2993e4d573bc0c8f06ce6da4bce6e81e74'
ref = 'xmdyovfcjogkarwxiyhb'

def run_sql(sql):
    data = json.dumps({'query': sql}).encode()
    req = urllib.request.Request(
        f'https://api.supabase.com/v1/projects/{ref}/database/query',
        data=data,
        headers={
            'Authorization': f'Bearer {pat}',
            'Content-Type': 'application/json'
        }
    )
    try:
        resp = urllib.request.urlopen(req)
        return True, None
    except Exception as e:
        err = e.read().decode()[:200] if hasattr(e, 'read') else str(e)[:200]
        return False, err

# Create tables
tables = [
    ("leads", """CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT,
  business_name TEXT, county TEXT, industry TEXT, lead_type TEXT NOT NULL DEFAULT 'shopper',
  source TEXT NOT NULL DEFAULT 'manual', status TEXT NOT NULL DEFAULT 'new',
  budget_range TEXT, notes TEXT, referral_code TEXT, referred_by TEXT,
  features_interest TEXT[], website_url TEXT, estimated_value INTEGER DEFAULT 0,
  tags TEXT[], created_at TIMESTAMPTZ DEFAULT NOW(), updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_contacted_at TIMESTAMPTZ, next_followup_at TIMESTAMPTZ)"""),
    ("referrals", """CREATE TABLE IF NOT EXISTS referrals (
  id BIGSERIAL PRIMARY KEY, code TEXT UNIQUE NOT NULL,
  lead_id BIGINT REFERENCES leads(id), referred_lead_id BIGINT REFERENCES leads(id),
  reward_type TEXT DEFAULT 'credit', reward_amount INTEGER DEFAULT 100,
  claimed BOOLEAN DEFAULT FALSE, created_at TIMESTAMPTZ DEFAULT NOW())"""),
    ("lead_activities", """CREATE TABLE IF NOT EXISTS lead_activities (
  id BIGSERIAL PRIMARY KEY, lead_id BIGINT REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT NOT NULL, note TEXT, created_at TIMESTAMPTZ DEFAULT NOW(), created_by TEXT)"""),
    ("deal_alerts", """CREATE TABLE IF NOT EXISTS deal_alerts (
  id BIGSERIAL PRIMARY KEY, phone TEXT NOT NULL, name TEXT, category TEXT,
  county TEXT DEFAULT 'Kericho', active BOOLEAN DEFAULT TRUE, created_at TIMESTAMPTZ DEFAULT NOW())"""),
    ("vendor_applications", """CREATE TABLE IF NOT EXISTS vendor_applications (
  id BIGSERIAL PRIMARY KEY, business_name TEXT NOT NULL, owner_name TEXT NOT NULL,
  phone TEXT NOT NULL, email TEXT, county TEXT, industry TEXT, products_description TEXT,
  has_existing_website BOOLEAN DEFAULT FALSE, website_url TEXT, status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW())"""),
    ("business_audits", """CREATE TABLE IF NOT EXISTS business_audits (
  id BIGSERIAL PRIMARY KEY, business_name TEXT NOT NULL, phone TEXT NOT NULL, email TEXT,
  county TEXT, industry TEXT, website_url TEXT, has_website BOOLEAN,
  has_google_listing BOOLEAN, has_social_media BOOLEAN, audit_score INTEGER,
  audit_notes TEXT, lead_id BIGINT REFERENCES leads(id), created_at TIMESTAMPTZ DEFAULT NOW())"""),
]

print("Creating tables...")
for name, ddl in tables:
    ok, err = run_sql(ddl)
    print(f"  {'✅' if ok else '❌'} {name}: {err or 'OK'}")

# Enable RLS
print("\nEnabling RLS...")
for name in ['leads', 'referrals', 'lead_activities', 'deal_alerts', 'vendor_applications', 'business_audits']:
    ok, err = run_sql(f"ALTER TABLE {name} ENABLE ROW LEVEL SECURITY")
    print(f"  {'✅' if ok else '❌'} {name} RLS: {err or 'OK'}")

# Add policies
print("\nAdding policies...")
policies = [
    ("leads_insert", "CREATE POLICY leads_insert ON leads FOR INSERT WITH CHECK (true)"),
    ("leads_all", "CREATE POLICY leads_all ON leads FOR ALL USING (true) WITH CHECK (true)"),
    ("referrals_insert", "CREATE POLICY referrals_insert ON referrals FOR INSERT WITH CHECK (true)"),
    ("referrals_all", "CREATE POLICY referrals_all ON referrals FOR ALL USING (true) WITH CHECK (true)"),
    ("activities_insert", "CREATE POLICY activities_insert ON lead_activities FOR INSERT WITH CHECK (true)"),
    ("activities_all", "CREATE POLICY activities_all ON lead_activities FOR ALL USING (true) WITH CHECK (true)"),
    ("deal_alerts_insert", "CREATE POLICY deal_alerts_insert ON deal_alerts FOR INSERT WITH CHECK (true)"),
    ("deal_alerts_all", "CREATE POLICY deal_alerts_all ON deal_alerts FOR ALL USING (true) WITH CHECK (true)"),
    ("vendor_apps_insert", "CREATE POLICY vendor_apps_insert ON vendor_applications FOR INSERT WITH CHECK (true)"),
    ("vendor_apps_all", "CREATE POLICY vendor_apps_all ON vendor_applications FOR ALL USING (true) WITH CHECK (true)"),
    ("audits_insert", "CREATE POLICY audits_insert ON business_audits FOR INSERT WITH CHECK (true)"),
    ("audits_all", "CREATE POLICY audits_all ON business_audits FOR ALL USING (true) WITH CHECK (true)"),
]

for name, sql in policies:
    ok, err = run_sql(sql)
    print(f"  {'✅' if ok else '❌'} {name}: {err or 'OK'}")

print("\nDone!")
