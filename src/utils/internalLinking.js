/**
 * Utility functions to handle Automatic Internal Linking across the app.
 * Goal: Maximize SEO by ensuring all pages have contextual cross-links.
 */

// 1. Get Related Routes dynamically
export const getRelatedRoutes = (currentRoute, allRoutes, minCount = 6, maxCount = 10) => {
  if (!currentRoute || !allRoutes) return [];
  
  // If the route has manual related routes and they meet the minimum, use them.
  let manualRoutes = [];
  if (currentRoute.relatedRoutes && Array.isArray(currentRoute.relatedRoutes)) {
    manualRoutes = allRoutes.filter(r => currentRoute.relatedRoutes.includes(r.slug));
  }
  
  // If we already have enough, return them
  if (manualRoutes.length >= minCount) {
    return manualRoutes.slice(0, maxCount);
  }
  
  // Otherwise, automatically calculate related routes based on fromCity or toCity
  const { fromCity, toCity, slug } = currentRoute;
  
  const autoRoutes = allRoutes.filter(r => {
    if (r.slug === slug) return false; // Exclude current
    
    // Prefer routes that share the same origin or destination
    const sharesOrigin = r.fromCity === fromCity && fromCity !== undefined;
    const sharesDest = r.toCity === toCity && toCity !== undefined;
    
    return sharesOrigin || sharesDest;
  });
  
  // Combine manual and auto, deduplicate, and limit
  const combined = [...manualRoutes, ...autoRoutes];
  const unique = Array.from(new Set(combined.map(r => r.slug)))
    .map(s => combined.find(r => r.slug === s));
    
  // If we STILL don't have enough (e.g. unique route), just pick random ones for SEO crawling
  if (unique.length < minCount) {
    const fallback = allRoutes.filter(r => r.slug !== slug && !unique.find(u => u.slug === r.slug));
    unique.push(...fallback.slice(0, minCount - unique.length));
  }
  
  return unique.slice(0, maxCount);
};


// 2. Get Related Cities
export const getRelatedCities = (currentCity, allCities, count = 6) => {
  if (!currentCity || !allCities) return [];
  const currentSlug = currentCity.slug || currentCity.citySlug;
  
  // Return cities from the same state or just top ones
  const filtered = allCities.filter(c => (c.slug || c.citySlug) !== currentSlug);
  return filtered.slice(0, count);
};


// 3. Get Popular Routes from a specific City
export const getPopularRoutesFromCity = (cityName, allRoutes, count = 8) => {
  if (!cityName || !allRoutes) return [];
  return allRoutes
    .filter(r => r.fromCity === cityName || r.toCity === cityName)
    .slice(0, count);
};

// 4. Contextual Text Auto-Linking
// This finds city names in plain text and converts them to internal links.
// It uses regex that prevents replacing text inside existing HTML tags.
export const contextualizeText = (htmlString, allCities, allRoutes) => {
  if (!htmlString) return htmlString;
  
  let modifiedHtml = htmlString;
  
  // Create a priority map of keywords to URLs
  // E.g., 'Nainital' -> '/city/nainital'
  const linkMap = {};
  
  // Add cities
  allCities.forEach(city => {
    if (city.cityName && city.cityName.length > 3) {
      linkMap[city.cityName] = `/city/${city.slug || city.citySlug}`;
    }
  });
  
  // Only process up to 10 replacements to avoid "link stuffing" penalty
  let replacements = 0;
  
  for (const [keyword, url] of Object.entries(linkMap)) {
    if (replacements >= 10) break;
    
    // Regex: Match word boundary, keyword, word boundary
    // Negative lookahead: (?![^<]*>) ensures we don't match inside <a href="...">Nainital</a>
    // We only replace the FIRST occurrence of each keyword to avoid spam
    const regex = new RegExp(`\\b(${keyword})\\b(?![^<]*>)`, 'i');
    
    if (regex.test(modifiedHtml)) {
      modifiedHtml = modifiedHtml.replace(regex, `<a href="${url}" class="text-[#00914d] font-semibold hover:underline" title="Taxi Service in $1">$1</a>`);
      replacements++;
    }
  }
  
  return modifiedHtml;
};
