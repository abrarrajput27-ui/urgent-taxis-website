// verification_runner.js
import { getAllVehicleFares } from '../../src/lib/pricingEngine.js';
import { TRIP_TYPES } from '../../src/lib/pricingRules.js';

const routes = [
  { name: 'Delhi Airport → Haldwani', distanceKm: 250, isAirport: true },
  { name: 'Noida → Nainital', distanceKm: 300 },
  { name: 'Delhi → Haridwar', distanceKm: 220 },
  { name: 'Delhi → Dehradun', distanceKm: 240 },
  { name: 'Ghaziabad → Haldwani', distanceKm: 260 },
  { name: 'Missing Distance Route', distanceKm: 0, isUnknownRoute: true }
];

function testRoute(route) {
  console.log(`\n=== Route: ${route.name} ===`);
  const tripType = route.isAirport ? TRIP_TYPES.AIRPORT : TRIP_TYPES.ONE_WAY;
  const paramsBase = {
    tripType,
    distanceKm: route.distanceKm,
    estimatedToll: 300,
    estimatedStateTax: 200,
    tollCount: 3,
    pickupDate: '2026-10-10',
    returnDate: '',
    localPackage: '',
    pickupTime: '10:00',
    isUnknownRoute: !!route.isUnknownRoute,
    routeSource: route.isUnknownRoute ? 'fallback_estimate' : 'google',
    distanceSource: route.isUnknownRoute ? 'fallback_estimate' : 'google'
  };
  const fares = getAllVehicleFares(paramsBase);
  fares.forEach(f => {
    console.log(`${f.title}: Total ${f.totalFare}, Market ${f.marketFare}, Save ${f.youSave}, Toll ${f.estimatedToll}, Tax ${f.estimatedStateTax}, UnknownRoute ${f.isUnknownRoute}`);
  });
}

routes.forEach(testRoute);
