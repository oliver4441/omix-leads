export const OMIX_STORE_URL = import.meta.env.VITE_OMIX_STORE_URL || 'https://stor1-web.onrender.com'

export const KENYAN_COUNTIES = [
  'Baringo', 'Bomet', 'Bungoma', 'Busia', 'Elgeyo-Marakwet', 'Embu',
  'Garissa', 'Homa Bay', 'Isiolo', 'Kajiado', 'Kakamega', 'Kericho',
  'Kiambu', 'Kilifi', 'Kirinyaga', 'Kisii', 'Kisumu', 'Kitui',
  'Kwale', 'Laikipia', 'Lamu', 'Machakos', 'Makueni', 'Mandera',
  'Marsabit', 'Meru', 'Migori', 'Mombasa', 'Murang\'a', 'Nairobi',
  'Nakuru', 'Nandi', 'Narok', 'Nyamira', 'Nyandarua', 'Nyeri',
  'Samburu', 'Siaya', 'Taita-Taveta', 'Tana River', 'Tharaka-Nithi',
  'Trans-Nzoia', 'Turkana', 'Uasin Gishu', 'Vihiga', 'Wajir', 'West Pokot'
]

export const BUSINESS_INDUSTRIES = [
  'Retail / Shop', 'Restaurant / Food', 'Salon / Barber', 'School / Education',
  'Church / Religious', 'Hospital / Clinic', 'Hotel / Lodge', 'Transport / Matatu',
  'Farm / Agriculture', 'Real Estate', 'Law Firm / Legal', 'Accounting / Finance',
  'NGO / Charity', 'Government', 'Tech / Software', 'Fashion / Clothing',
  'Hardware / Construction', 'Pharmacy / Medical', 'Photography / Media',
  'Events / Planning', 'Other'
]

export const LEAD_SOURCES = [
  'store_referral', 'store_vendor_signup', 'store_deal_alert',
  'web_audit', 'web_quote', 'web_directory', 'web_portfolio',
  'whatsapp', 'manual', 'other'
]

export const LEAD_STATUSES = [
  { value: 'new', label: 'New', color: 'blue' },
  { value: 'contacted', label: 'Contacted', color: 'yellow' },
  { value: 'qualified', label: 'Qualified', color: 'purple' },
  { value: 'proposal', label: 'Proposal Sent', color: 'orange' },
  { value: 'won', label: 'Closed Won', color: 'green' },
  { value: 'lost', label: 'Lost', color: 'red' },
]

export const LEAD_TYPES = [
  { value: 'shopper', label: 'Omix Store Shopper', category: 'store' },
  { value: 'vendor', label: 'Omix Store Vendor', category: 'store' },
  { value: 'web_client', label: 'Web Dev Client', category: 'systems' },
  { value: 'both', label: 'Store + Web Client', category: 'both' },
]

export const WEBSITE_FEATURES = [
  { id: 'homepage', label: 'Homepage', price: 5000 },
  { id: 'about', label: 'About Page', price: 3000 },
  { id: 'contact', label: 'Contact Form', price: 2000 },
  { id: 'gallery', label: 'Photo Gallery', price: 3000 },
  { id: 'products', label: 'Product Catalog', price: 8000 },
  { id: 'booking', label: 'Booking/Appointment System', price: 10000 },
  { id: 'blog', label: 'Blog / News Section', price: 5000 },
  { id: 'ecommerce', label: 'Full E-commerce (Buy Online)', price: 25000 },
  { id: 'whatsapp', label: 'WhatsApp Integration', price: 2000 },
  { id: 'mpesa', label: 'M-Pesa Payment', price: 8000 },
  { id: 'maps', label: 'Google Maps / Location', price: 2000 },
  { id: 'social', label: 'Social Media Links & Feed', price: 1500 },
  { id: 'seo', label: 'SEO Optimization', price: 5000 },
  { id: 'analytics', label: 'Analytics / Visitor Tracking', price: 2000 },
]

export const formatKES = (amount) =>
  new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES', maximumFractionDigits: 0 }).format(amount)
