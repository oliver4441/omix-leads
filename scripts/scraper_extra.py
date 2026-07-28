#!/usr/bin/env python3
"""Scrape additional Kilimall products — picks from different URL offsets to avoid duplicates"""
import urllib.request, re, json, time, sys, os

OUTPUT_DIR = '/home/oliver/omix-leads/kilimall_data'
CATALOG_PATH = f'{OUTPUT_DIR}/kilimall_catalog.json'

def scrape_product(url):
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'text/html,application/xhtml+xml',
            'Accept-Language': 'en-US,en;q=0.9',
        })
        resp = urllib.request.urlopen(req, timeout=8)
        html = resp.read().decode()
        
        match = re.search(r'<script type="application/ld\+json">(.*?)</script>', html, re.DOTALL)
        if not match:
            return None
        
        data = json.loads(match.group(1))
        p = data.get('mainEntity', {})
        o = p.get('offers', {})
        
        images = p.get('image', [])
        if isinstance(images, str):
            images = [images]
        clean_images = []
        for img in images:
            base = img.split('?')[0]
            if base.startswith('http'):
                clean_images.append(base)
        
        desc = p.get('description', '')
        sizes = []
        size_match = re.findall(r'(?:size[s]?\s*:?\s*|number\s+)([\d,\s]+)', desc, re.IGNORECASE)
        if size_match:
            sizes = [s.strip() for s in size_match[0].split(',') if s.strip().isdigit()]
        
        color_words = ['black', 'white', 'red', 'blue', 'brown', 'grey', 'gray', 'green', 
                       'navy', 'beige', 'gold', 'silver', 'pink', 'yellow', 'orange', 'purple',
                       'khaki', 'maroon', 'coral', 'turquoise', 'tan', 'burgundy']
        colors = []
        for word in desc.lower().replace(',', ' ').split():
            w = word.strip('.,;:')
            if w in color_words:
                colors.append(w.title())
        colors = list(set(colors))
        
        return {
            'name': p.get('name', '').strip()[:300],
            'description': desc[:1000],
            'brand': p.get('brand', {}).get('name', 'Generic'),
            'price': float(o.get('price', 0)),
            'currency': o.get('priceCurrency', 'KES'),
            'sku': p.get('sku', ''),
            'availability': 'InStock' in str(o.get('availability', '')),
            'images': clean_images[:8],
            'sizes': sizes,
            'colors': colors,
            'rating': float(p.get('aggregateRating', {}).get('ratingValue', 0)) if p.get('aggregateRating') else 0,
            'reviews': int(p.get('aggregateRating', {}).get('reviewCount', 0)) if p.get('aggregateRating') else 0,
        }
    except Exception as e:
        return None

def main():
    # Load existing catalog
    with open(CATALOG_PATH) as f:
        existing = json.load(f)
    
    # Build set of existing SKUs + name hashes to avoid duplicates
    existing_skus = set()
    existing_name_hashes = set()
    for p in existing:
        if p.get('sku'):
            existing_skus.add(p['sku'])
        existing_name_hashes.add(hash(p['name'].lower().strip()[:50]))
    
    print(f"Existing: {len(existing)} products, {len(existing_skus)} SKUs")
    
    # Load URLs
    with open('/home/oliver/omix-leads/kilimall_urls.json') as f:
        all_urls = json.load(f)
    
    # Scrape more from each category — 100 each, with different offset
    # Previous scrape used: start ~5000 or len//2, step ~ len//160
    # We'll use a different offset range
    extras_per_cat = 100
    new_products = []
    
    for cat, urls in all_urls.items():
        existing_count = sum(1 for p in existing if p.get('source_category') == cat)
        print(f"\n=== {cat}: {existing_count} existing, scraping +{extras_per_cat} ===")
        
        if len(urls) < 20000:
            # For smaller categories, use beginning range
            start = 2000
            step = max(1, (len(urls) - start) // (extras_per_cat * 3))
        else:
            # For larger categories, pick from middle section
            mid = len(urls) // 2
            start = mid + 5000
            step = max(1, (len(urls) - start) // (extras_per_cat * 2))
        
        selected = urls[start:len(urls):step][:extras_per_cat * 3]
        print(f"  Sampling {len(selected)} URLs (start={start}, step={step})")
        
        cat_new = 0
        for i, url in enumerate(selected):
            if cat_new >= extras_per_cat:
                break
            
            p = scrape_product(url)
            if p and p['name'] and p['price'] > 0:
                # Check if we already have this product
                if p['sku'] and p['sku'] in existing_skus:
                    continue
                if hash(p['name'].lower().strip()[:50]) in existing_name_hashes:
                    continue
                
                p['source_category'] = cat
                p['source_url'] = url
                
                new_products.append(p)
                existing_skus.add(p['sku'])
                existing_name_hashes.add(hash(p['name'].lower().strip()[:50]))
                cat_new += 1
            
            if (i + 1) % 25 == 0:
                print(f"  {cat}: scanned {i+1}, got {cat_new} new", flush=True)
            
            time.sleep(0.12)  # Rate limiting
        
        print(f"  ✅ {cat}: +{cat_new} new products", flush=True)
        
        # Save progress
        combined = existing + new_products
        with open(CATALOG_PATH, 'w') as f:
            json.dump(combined, f, indent=2, ensure_ascii=False)
    
    # Final save
    combined = existing + new_products
    with open(CATALOG_PATH, 'w') as f:
        json.dump(combined, f, indent=2, ensure_ascii=False)
    
    print(f"\n{'='*50}")
    print(f"SCRAPING COMPLETE")
    print(f"New products: {len(new_products)}")
    print(f"Total products: {len(combined)}")
    
    prices = [p['price'] for p in combined if p['price'] > 0]
    with_images = sum(1 for p in combined if p.get('images'))
    total_images = sum(len(p.get('images', [])) for p in combined)
    
    print(f"Products with images: {with_images}")
    print(f"Total images: {total_images}")
    print(f"Price range: KES {min(prices):,.0f} - {max(prices):,.0f}")
    print(f"Average: KES {sum(prices)/len(prices):,.0f}")
    
    cats = {}
    for p in combined:
        c = p.get('source_category', 'Unknown')
        cats[c] = cats.get(c, 0) + 1
    for c, n in sorted(cats.items()):
        print(f"  {c}: {n}")
    
    print(f"\nSaved to {CATALOG_PATH}")
    return new_products

if __name__ == '__main__':
    main()
