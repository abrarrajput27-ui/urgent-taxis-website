import { getRouteFares } from '../src/utils/fareEngine.js';

const routesToTest = [
  { name: 'Delhi Airport to Haldwani', type: 'Plain', data: { route: 'Delhi Airport to Haldwani', distanceKm: 280 } },
  { name: 'Noida to Nainital', type: 'Hill', data: { route: 'Noida to Nainital', distanceKm: 310 } },
  { name: 'Delhi to Haridwar', type: 'Plain', data: { route: 'Delhi to Haridwar', distanceKm: 220 } },
  { name: 'Delhi to Dehradun', type: 'Hill', data: { route: 'Delhi to Dehradun', distanceKm: 250 } },
  { name: 'Ghaziabad to Haldwani', type: 'Plain', data: { route: 'Ghaziabad to Haldwani', distanceKm: 260 } },
  { name: 'Delhi Airport to Agra', type: 'Airport (Plain)', data: { route: 'Delhi Airport to Agra', distanceKm: 230 } },
  { name: 'Delhi to Jaipur', type: 'Plain', data: { route: 'Delhi to Jaipur', distanceKm: 280 } },
  { name: 'Delhi to Shimla', type: 'Hill', data: { route: 'Delhi to Shimla', distanceKm: 340 } },
  { name: 'Delhi to Unknown', type: 'Missing Distance', data: { route: 'Delhi to Unknown', distanceKm: null } },
  { name: 'Noida to Agra', type: 'Manual Override', data: { route: 'Noida to Agra', distanceKm: 200, manualFares: { sedan: 2500, ertiga: 3500 } } },
];

console.log("=== ONE WAY FARE VERIFICATION ===");
routesToTest.forEach(test => {
  const result = getRouteFares(test.data);
  console.log(`\nRoute: ${test.name} (${test.type}, ${test.data.distanceKm || 'N/A'}km)`);
  console.log(`isManual: ${result.isManual}, isEstimated: ${result.isEstimated}, isValid: ${result.isValid}`);
  if (result.isValid) {
    console.log(JSON.stringify(result.fares, null, 2));
  } else {
    console.log("Result: On Request (Invalid/Missing Distance)");
  }
});

console.log("\n=== ROUND TRIP FARE VERIFICATION (3 Days) ===");
const roundTripResult = getRouteFares({ route: 'Delhi to Jaipur', distanceKm: 280 }, true, 3);
console.log(`Route: Delhi to Jaipur (280km) for 3 days`);
console.log(`isManual: ${roundTripResult.isManual}, isEstimated: ${roundTripResult.isEstimated}, isValid: ${roundTripResult.isValid}`);
console.log(JSON.stringify(roundTripResult.fares, null, 2));
