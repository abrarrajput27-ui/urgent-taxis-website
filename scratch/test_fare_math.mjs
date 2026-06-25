import { getRouteFares } from '../src/utils/fareEngine.js';

// Example 1: Delhi Airport -> Haldwani
const route1 = { route: 'Delhi Airport to Haldwani', distanceKm: 280 };
const fares1 = getRouteFares(route1);
console.log("Delhi Airport -> Haldwani (Plain, 280km)");
console.log("Expected Sedan: 3410");
console.log("Actual Sedan:", fares1.fares.sedan);

// Example 2: Noida -> Nainital
const route2 = { route: 'Noida to Nainital', distanceKm: 310 };
const fares2 = getRouteFares(route2);
console.log("\nNoida -> Nainital (Hill, 310km)");
console.log("Expected Ertiga: 5871 (which will be 5880 after round to 10)");
console.log("Actual Ertiga:", fares2.fares.ertiga);

