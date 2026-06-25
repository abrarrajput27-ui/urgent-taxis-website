import fs from 'fs';
import { routes } from './src/data/routes.js';

let updatedRoutes = [...routes];

updatedRoutes = updatedRoutes.map(route => {
  const r = { ...route };
  
  // 2. SEO Fixes
  r.seo = r.seo || {};

  // Sync existing top-level fields if seo object missing them
  if (r.seoTitle && !r.seo.title) r.seo.title = r.seoTitle;
  if (r.seoDescription && !r.seo.metaDescription) r.seo.metaDescription = r.seoDescription;
  if (r.h1 && !r.seo.h1) r.seo.h1 = r.h1;

  // Now fix "Lowest Price" and fill missing
  if (!r.seo.title || r.seo.title.includes('Lowest Price')) {
    r.seo.title = `${r.fromCity} to ${r.toCity} Taxi Service | Book Reliable Cab`;
    r.seoTitle = r.seo.title;
  }
  
  if (!r.seo.metaDescription) {
    r.seo.metaDescription = `Book reliable ${r.fromCity} to ${r.toCity} taxi with Urgent Taxis. Compare Sedan, SUV, Innova fares. Quick booking, transparent pricing and clean cabs.`;
    r.seoDescription = r.seo.metaDescription;
  }
  
  if (!r.seo.h1) {
    r.seo.h1 = `${r.fromCity} to ${r.toCity} Taxi Service`;
    r.h1 = r.seo.h1;
  }

  return r;
});

const outputStr = `export const routes = ${JSON.stringify(updatedRoutes, null, 2)};\n`;
fs.writeFileSync('src/data/routes.js', outputStr, 'utf8');

console.log('Successfully updated src/data/routes.js');
