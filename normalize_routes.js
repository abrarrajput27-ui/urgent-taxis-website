import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { routes } from './src/data/routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const routesPath = path.join(__dirname, 'src', 'data', 'routes.js');

function getImageForCity(city) {
  if (!city) return '/images/routes/route-nainital.webp';
  const c = city.toLowerCase();
  if (c.includes('nainital') || c.includes('almora') || c.includes('ranikhet') || c.includes('kausani') || c.includes('kainchi') || c.includes('bhimtal') || c.includes('sattal') || c.includes('mukteshwar')) return '/images/routes/delhi-to-nainital-lake.webp';
  if (c.includes('haldwani') || c.includes('kathgodam') || c.includes('rudrapur')) return '/images/routes/delhi-to-haldwani-tikonia.webp';
  if (c.includes('haridwar')) return '/images/routes/delhi-to-haridwar-ganga-aarti.webp';
  if (c.includes('rishikesh')) return '/images/routes/delhi-to-rishikesh-ramjhula.webp';
  if (c.includes('dehradun') || c.includes('mussoorie')) return '/images/routes/delhi-to-dehradun-route.webp';
  if (c.includes('ramnagar') || c.includes('corbett')) return '/images/routes/delhi-to-ramnagar-corbett.webp';
  if (c.includes('shimla') || c.includes('manali')) return '/images/routes/route-shimla.webp';
  
  // Default fallback
  return '/images/routes/route-nainital.webp';
}

const updatedRoutes = routes.map(r => {
  const routeName = r.route || `${r.fromCity} to ${r.toCity}`;
  const toCity = r.toCity || r.to;
  return {
    ...r,
    route: routeName,
    type: r.type || (r.serviceType && r.serviceType.split(' / ')[0]) || 'One Way',
    distance: r.distance || '250 km',
    vehicle: r.vehicle || 'Sedan',
    price: r.price || r.sedanFare || 3000,
    originalPrice: r.originalPrice || (r.sedanFare ? r.sedanFare + 2000 : 5000),
    image: getImageForCity(toCity)
  };
});

const fileOutput = `export const routes = ${JSON.stringify(updatedRoutes, null, 2)};\n`;

fs.writeFileSync(routesPath, fileOutput, 'utf8');
console.log('Routes updated successfully!');
