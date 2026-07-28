#!/usr/bin/env python3
"""Kilimall bulk product scraper - extracts products with images from sitemap URLs"""
import urllib.request, re, json, time, sys, os

OUTPUT_DIR = '/home/oliver/omix-leads/kilimall_data'
os.makedirs(OUTPUT_DIR, exist_ok=True)

def scrape_product(url):
    """Scrape a single Kilimall product page and extract JSON-LD data + images"""
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
        
        # Extract images
        images = p.get('image', [])
        if isinstance(images, str):
            images = [images]
        # Clean image URLs - remove query params and webp conversion
        clean_images = []
        for img in images:
            base = img.split('?')[0]
            if base.startswith('http'):
                clean_images.append(base)
        
        # Extract sizes from description
        desc = p.get('description', '')
        sizes = []
        size_match = re.findall(r'(?:size[s]?\s*:?\s*|number\s+)([\d,\s]+)', desc, re.IGNORECASE)
        if size_match:
            sizes = [s.strip() for s in size_match[0].split(',') if s.strip().isdigit()]
        
        # Extract colors from description
        color_words = ['black', 'white', 'red', 'blue', 'brown', 'grey', 'gray', 'green', 
                       'navy', 'beige', 'gold', 'silver', 'pink', 'yellow', 'orange', 'purple',
                       'khaki', 'maroon', 'coral', 'turquoise', 'tan', 'burgundy']
        colors = []
        for word in desc.lower().replace(',', ' ').split():
            if word.strip('.,;:') in color_words:
                colors.append(word.strip('.,;:').title())
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
    # Load URLs
    with open('/home/oliver/omix-leads/kilimall_urls.json') as f:
        all_urls = json.load(f)
    
    # Categories to scrape with target counts
    targets = {
        "Men's Shoes": 80,
        "Women's Shoes": 80,
        "Men's Clothing": 80,
        "Women's Clothing": 80,
        "Mobile Accessories": 60,
        "Beauty": 60,
        "Watches": 40,
        "Jewelry": 40,
    }
    
    all_products = []
    seen_skus = set()
    
    for cat, target in targets.items():
        urls = all_urls.get(cat, [])
        if not urls:
            print(f"⚠️  {cat}: no URLs found")
            continue
        
        # Sample spread across the URL list for variety (avoid old products at start)
        start = min(5000, len(urls) // 2)
        end = len(urls)
        step = max(1, (end - start) // (target * 2))
        selected = urls[start:end:step][:target * 2]
        
        cat_products = []
        for i, url in enumerate(selected):
            if len(cat_products) >= target:
                break
            
            p = scrape_product(url)
            if p and p['name'] and p['price'] > 0 and p['sku'] not in seen_skus:
                seen_skus.add(p['sku'])
                p['source_category'] = cat
                p['source_url'] = url
                cat_products.append(p)
            
            # Progress every 20
            if (i + 1) % 20 == 0:
                print(f"  {cat}: {i+1}/{len(selected)} scraped, {len(cat_products)} valid", flush=True)
            
            time.sleep(0.15)
        
        all_products.extend(cat_products)
        print(f"✅ {cat}: {len(cat_products)} products", flush=True)
        
        # Save progress after each category
        with open(f'{OUTPUT_DIR}/kilimall_catalog.json', 'w') as f:
            json.dump(all_products, f, indent=2, ensure_ascii=False)
    
    # Final save
    with open(f'{OUTPUT_DIR}/kilimall_catalog.json', 'w') as f:
        json.dump(all_products, f, indent=2, ensure_ascii=False)
    
    # Summary
    print(f"\n{'='*50}", flush=True)
    print(f"SCRAPING COMPLETE", flush=True)
    print(f"Total products: {len(all_products)}", flush=True)
    
    prices = [p['price'] for p in all_products if p['price'] > 0]
    with_images = sum(1 for p in all_products if p.get('images'))
    total_images = sum(len(p.get('images', [])) for p in all_products)
    
    print(f"Products with images: {with_images}", flush=True)
    print(f"Total images: {total_images}", flush=True)
    print(f"Price range: KES {min(prices):,.0f} - {max(prices):,.0f}", flush=True)
    print(f"Average: KES {sum(prices)/len(prices):,.0f}", flush=True)
    
    # Category breakdown
    cats = {}
    for p in all_products:
        c = p.get('source_category', 'Unknown')
        cats[c] = cats.get(c, 0) + 1
    for c, n in cats.items():
        print(f"  {c}: {n}", flush=True)
    
    print(f"\nSaved to {OUTPUT_DIR}/kilimall_catalog.json", flush=True)


if __name__ == '__main__':
    main()
