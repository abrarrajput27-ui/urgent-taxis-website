// verification_runner.js
// Runs fare calculations for all required vehicle categories and sample routes using local pricing engine.
import { getAllVehicleFares } from '../src/lib/pricingEngine.js';
import { TRIP_TYPES } from '../src/lib/pricingRules.js';

const routes = [
  { name: 'Delhi Airport → Haldwani', distance: 250 },
  { name: 'Noida → Nainital', distance: 300 },
  { name: 'Delhi → Haridwar', distance: 210 },
  { name: 'Delhi → Dehradun', distance: 260 },
  { name: 'Ghaziabad → Haldwani', distance: 240 },
  { name: 'Airport (missing distance)', distance: null },
  { name: 'Hill route (example)', distance: 180 },
  { name: 'Plain route (example)', distance: 120 },
];

// Mapping of display names to the internal vehicle keys used in pricingRules
const vehicleMap = [
  { display: 'Hatchback', key: 'Hatchback' },
  { display: 'Sedan', key: 'Sedan' },
  { display: 'Ertiga/MUV', key: 'Ertiga' },
  { display: 'Innova Crysta', key: 'Innova Crysta' },
  { display: 'Premium SUV', key: 'Bus 45' }, // mapped to Volvo/Scania bus as premium SUV
  { display: 'Tempo Traveller', key: 'Traveller 12' },
  { display: 'Urbania', key: 'Urbania 12' },
  { display: 'Volvo Bus', key: 'Bus 45' }
];

function formatCurrency(value) {
  return `₹ ${Number(value).toLocaleString('en-IN')}`;
}

function testOneWay(route, vehicle) {
  const params = {
    tripType: TRIP_TYPES.ONE_WAY,
    distanceKm: route.distance ?? 0,
    estimatedToll: 0,
    estimatedStateTax: 0,
    tollCount: 0,
    travelTime: '5 hours',
    routeSource: 'google',
    distanceSource: 'google',
    isUnknownRoute: route.distance == null,
    pickupDate: '2026-10-10',
    returnDate: '',
    localPackage: '',
    pickupTime: '10:00 AM',
  };
  const fares = getAllVehicleFares({ ...params, vehicleCategory: vehicle.key });
  const fare = fares[0];
  const display = route.distance == null ? 'On Request' : formatCurrency(fare.totalFare);
  console.log(`${route.name} | ${vehicle.display} => ${display}`);
}

// One‑Way tests
for (const route of routes) {
  for (const vehicle of vehicleMap) {
    try {
      testOneWay(route, vehicle);
    } catch (e) {
      console.error('Error', route.name, vehicle.display, e);
    }
  }
}

// Round‑Trip test (minimum 250 km/day logic)
const roundTripParams = {
  tripType: TRIP_TYPES.ROUND_TRIP,
  distanceKm: 300, // per leg
  estimatedToll: 0,
  estimatedStateTax: 0,
  tollCount: 0,
  travelTime: '5 hours',
  routeSource: 'google',
  distanceSource: 'google',
  isUnknownRoute: false,
  pickupDate: '2026-10-10',
  returnDate: '2026-10-12',
  localPackage: '',
  pickupTime: '10:00 AM'
};
const roundTripFares = getAllVehicleFares(roundTripParams);
console.log('\n--- Round Trip Sample (300 km each leg) ---');
roundTripFares.forEach(f => {
  console.log(`${f.category}: Total ${formatCurrency(f.totalFare)}`);
});
