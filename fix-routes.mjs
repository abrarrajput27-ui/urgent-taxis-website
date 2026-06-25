import fs from 'fs';
import { routes } from './src/data/routes.js';

let updatedRoutes = [...routes];

// 1. Remove duplicate ID 1142
updatedRoutes = updatedRoutes.filter(r => r.id !== 1142);

// Precompute valid slugs
const validSlugs = updatedRoutes.map(r => r.slug);

// Helper to find related routes
function getRelatedRoutes(currentRoute) {
  let related = new Set();
  
  // Same fromCity
  for (let r of updatedRoutes) {
    if (r.slug !== currentRoute.slug && r.fromCity === currentRoute.fromCity) {
      related.add(r.slug);
    }
  }
  
  // Same toCity
  for (let r of updatedRoutes) {
    if (r.slug !== currentRoute.slug && r.toCity === currentRoute.toCity) {
      related.add(r.slug);
    }
  }

  // Same airport cluster if applicable
  if (currentRoute.type?.includes('Airport') || currentRoute.fromCity?.includes('Airport')) {
    for (let r of updatedRoutes) {
      if (r.slug !== currentRoute.slug && (r.type?.includes('Airport') || r.fromCity?.includes('Airport'))) {
        related.add(r.slug);
      }
    }
  }

  return Array.from(related).slice(0, 6);
}

updatedRoutes = updatedRoutes.map(route => {
  const r = { ...route };
  
  // 2. SEO Fixes
  r.seo = r.seo || {};
  if (!r.seoTitle && !r.seo?.title) {
    r.seoTitle = `${r.fromCity} to ${r.toCity} Taxi Service | Book Reliable Cab`;
    r.seo.title = r.seoTitle;
  }
  if (!r.seoDescription && !r.seo?.metaDescription) {
    r.seoDescription = `Book reliable ${r.fromCity} to ${r.toCity} taxi with Urgent Taxis. Compare Sedan, SUV, Innova fares. Quick booking, transparent pricing and clean cabs.`;
    r.seo.metaDescription = r.seoDescription;
  }
  if (!r.h1 && !r.seo?.h1) {
    r.h1 = `${r.fromCity} to ${r.toCity} Taxi Service`;
    r.seo.h1 = r.h1;
  }

  // Canonical (make sure it exists)
  r.seo.canonical = r.seo.canonical || `https://urgenttaxis.com/${r.slug}`;

  // 3. FAQ Fixes
  if (!r.faqs || r.faqs.length < 8) {
    let newFaqs = [
      {
        question: `What is the taxi fare from ${r.fromCity} to ${r.toCity}?`,
        answer: `Fare depends on vehicle type, pickup time, route type and availability. Final quotation will be shared before booking.`
      },
      {
        question: `How much time does it take to travel from ${r.fromCity} to ${r.toCity}?`,
        answer: `The travel time is approximately ${r.travelTime || r.duration || 'a few hours'} depending on traffic conditions.`
      },
      {
        question: `Are there any hidden charges for the ${r.fromCity} to ${r.toCity} taxi?`,
        answer: `No, we maintain 100% transparency. Any tolls or state taxes are clearly mentioned.`
      },
      {
        question: `Which vehicles are available for the ${r.fromCity} to ${r.toCity} route?`,
        answer: `We offer a wide range of vehicles including Sedans (Dzire), MPVs (Ertiga), and Premium SUVs (Innova Crysta).`
      },
      {
        question: `Is it safe to travel from ${r.fromCity} to ${r.toCity} at night?`,
        answer: `Yes, our drivers are highly experienced and verified, ensuring a safe journey regardless of the time.`
      },
      {
        question: `Do you offer round-trip cabs for ${r.fromCity} to ${r.toCity}?`,
        answer: `Yes, we offer both one-way drops and round-trip bookings for this route.`
      },
      {
        question: `How can I book a taxi from ${r.fromCity} to ${r.toCity}?`,
        answer: `You can easily book online through our website or reach out to us via WhatsApp/Call.`
      },
      {
        question: `Do I need to pay an advance for booking the cab?`,
        answer: `A nominal advance may be required to confirm your booking, with the balance payable to the driver.`
      }
    ];

    if (r.type?.includes('Airport') || r.fromCity?.includes('Airport')) {
      newFaqs[2] = {
        question: `Will the driver wait if my flight is delayed?`,
        answer: `Yes, we track flight statuses and our driver will wait for you without any extra waiting charges for reasonable delays.`
      };
      newFaqs[3] = {
        question: `Are airport parking charges included?`,
        answer: `No, airport parking/entry charges are extra and to be paid as per the actual receipt.`
      };
    }

    r.faqs = newFaqs;
  }

  // 4. Related Routes Fixes
  if (!r.relatedRoutes || r.relatedRoutes.length < 6) {
    const generatedRelated = getRelatedRoutes(r);
    // Merge without duplicates
    const combined = Array.from(new Set([...(r.relatedRoutes || []), ...generatedRelated]));
    r.relatedRoutes = combined.slice(0, 6);
  }

  return r;
});

const outputStr = `export const routes = ${JSON.stringify(updatedRoutes, null, 2)};\n`;
fs.writeFileSync('src/data/routes.js', outputStr, 'utf8');

console.log('Successfully updated src/data/routes.js');
