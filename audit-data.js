import fs from 'fs';
import path from 'path';

async function runStaticAudit() {
  const routesDataStr = fs.readFileSync('src/data/routes.js', 'utf8');
  const citiesDataStr = fs.readFileSync('src/data/cities.js', 'utf8');

  // We can't simply require because it's ES module or JS file with exports
  // Let's use a dynamic import or extract the arrays.
  
  // Actually, since type is module, we can just import them dynamically!
  const routesModule = await import('./src/data/routes.js');
  const routes = routesModule.routes || routesModule.default || [];
  
  const citiesModule = await import('./src/data/cities.js');
  const cities = citiesModule.cities || citiesModule.default || [];

  console.log("--- STATIC AUDIT ---");
  
  // 1. Total routes count
  console.log(`1. Total routes count: ${routes.length}`);

  // 2. Duplicate slugs
  const slugs = routes.map(r => r.slug);
  const duplicateSlugs = slugs.filter((item, index) => slugs.indexOf(item) !== index);
  console.log(`2. Duplicate slugs: ${[...new Set(duplicateSlugs)].length > 0 ? [...new Set(duplicateSlugs)].join(', ') : 'None'}`);

  // 3. Routes without SEO title
  const missingSeoTitle = routes.filter(r => !r.seo?.title);
  console.log(`3. Routes without SEO title: ${missingSeoTitle.length} (Example: ${missingSeoTitle[0]?.slug || 'N/A'})`);

  // 4. Routes without image
  const missingImage = routes.filter(r => !r.image);
  console.log(`4. Routes without image: ${missingImage.length} (Example: ${missingImage[0]?.slug || 'N/A'})`);

  // 5. Routes without FAQ
  const missingFaq = routes.filter(r => !r.faqs || r.faqs.length === 0);
  console.log(`5. Routes without FAQ: ${missingFaq.length} (Example: ${missingFaq[0]?.slug || 'N/A'})`);

  // 6. Routes without related routes
  const missingRelated = routes.filter(r => !r.relatedRoutes || r.relatedRoutes.length === 0);
  console.log(`6. Routes without related routes: ${missingRelated.length} (Example: ${missingRelated[0]?.slug || 'N/A'})`);

  // 7. City page count
  console.log(`7. Total city pages: ${cities.length}`);
}

runStaticAudit().catch(console.error);
