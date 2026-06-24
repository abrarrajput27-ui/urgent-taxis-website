const fs = require('fs');
const path = require('path');

function getSlugs(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    // Match both slug: '...' and "slug": "..."
    const regex = /"?slug"?:\s*['"]([^'"]+)['"]/g;
    const slugs = [];
    let match;
    while ((match = regex.exec(content)) !== null) {
      slugs.push(match[1]);
    }
    return slugs;
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

async function generateSitemap() {
  const baseUrl = 'https://urgenttaxis.com';
  
  // Static routes
  const staticRoutes = [
    '',
    '/services',
    '/fleet',
    '/reviews',
    '/blog',
    '/about-us',
    '/contact-us'
  ];

  // Get dynamic slugs
  const dataDir = path.join(__dirname, '../src/data');
  
  const routeSlugs = getSlugs(path.join(dataDir, 'routes.js'));
  const citySlugs = getSlugs(path.join(dataDir, 'cities.js'));
  const blogSlugs = getSlugs(path.join(dataDir, 'blogData.js'));

  // Ensure uniqueness
  const allUrls = new Set([
    ...staticRoutes.map(route => `${baseUrl}${route}`),
    ...routeSlugs.map(slug => `${baseUrl}/${slug}`),
    ...citySlugs.map(slug => `${baseUrl}/city/${slug}`),
    ...blogSlugs.map(slug => `${baseUrl}/blog/${slug}`)
  ]);

  const date = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const url of allUrls) {
    // Basic priority logic
    let priority = '0.80';
    if (url === baseUrl) priority = '1.00';
    else if (url.includes('/services') || url.includes('/fleet')) priority = '0.90';
    
    xml += `  <url>\n`;
    xml += `    <loc>${url}</loc>\n`;
    xml += `    <lastmod>${date}</lastmod>\n`;
    xml += `    <priority>${priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, xml);
  
  console.log(`✅ Sitemap successfully generated with ${allUrls.size} URLs.`);
}

generateSitemap();
