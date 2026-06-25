
-- Leads table
CREATE TABLE IF NOT EXISTS leads (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  business_name TEXT,
  county TEXT,
  industry TEXT,
  lead_type TEXT NOT NULL DEFAULT 'shopper',
  source TEXT NOT NULL DEFAULT 'manual',
  status TEXT NOT NULL DEFAULT 'new',
  budget_range TEXT,
  notes TEXT,
  referral_code TEXT,
  referred_by TEXT,
  features_interest TEXT[],
  website_url TEXT,
  estimated_value INTEGER DEFAULT 0,
  tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  last_contacted_at TIMESTAMPTZ,
  next_followup_at TIMESTAMPTZ
);

-- Referral tracking
CREATE TABLE IF NOT EXISTS referrals (
  id BIGSERIAL PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  lead_id BIGINT REFERENCES leads(id),
  referred_lead_id BIGINT REFERENCES leads(id),
  reward_type TEXT DEFAULT 'credit',
  reward_amount INTEGER DEFAULT 100,
  claimed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Follow-ups / activities
CREATE TABLE IF NOT EXISTS lead_activities (
  id BIGSERIAL PRIMARY KEY,
  lead_id BIGINT REFERENCES leads(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by TEXT
);

-- Deal alerts (store shoppers who want notifications)
CREATE TABLE IF NOT EXISTS deal_alerts (
  id BIGSERIAL PRIMARY KEY,
  phone TEXT NOT NULL,
  name TEXT,
  category TEXT,
  county TEXT DEFAULT 'Kericho',
  active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Vendor applications (businesses wanting to sell on Omix Store)
CREATE TABLE IF NOT EXISTS vendor_applications (
  id BIGSERIAL PRIMARY KEY,
  business_name TEXT NOT NULL,
  owner_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  county TEXT,
  industry TEXT,
  products_description TEXT,
  has_existing_website BOOLEAN DEFAULT FALSE,
  website_url TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Business audit requests
CREATE TABLE IF NOT EXISTS business_audits (
  id BIGSERIAL PRIMARY KEY,
  business_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  county TEXT,
  industry TEXT,
  website_url TEXT,
  has_website BOOLEAN,
  has_google_listing BOOLEAN,
  has_social_media BOOLEAN,
  audit_score INTEGER,
  audit_notes TEXT,
  lead_id BIGINT REFERENCES leads(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE deal_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE vendor_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_audits ENABLE ROW LEVEL SECURITY;

-- Public insert policies (for lead capture forms)
CREATE POLICY "Public can insert leads" ON leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert referrals" ON referrals FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert deal_alerts" ON deal_alerts FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert vendor_applications" ON vendor_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can insert business_audits" ON business_audits FOR INSERT WITH CHECK (true);

-- Service role full access (for admin dashboard)
CREATE POLICY "Service role full access on leads" ON leads FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on referrals" ON referrals FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on lead_activities" ON lead_activities FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on deal_alerts" ON deal_alerts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on vendor_applications" ON vendor_applications FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Service role full access on business_audits" ON business_audits FOR ALL USING (true) WITH CHECK (true);
