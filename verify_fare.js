import { getAllVehicleFares } from './src/lib/pricingEngine.js';
import { TRIP_TYPES } from './src/lib/pricingRules.js';

try {
  const fares = getAllVehicleFares({
    tripType: TRIP_TYPES.ONE_WAY,
    distanceKm: 250,
    estimatedToll: 300,
    estimatedStateTax: 200,
    tollCount: 3,
    travelTime: '5 hours',
    routeSource: 'google',
    distanceSource: 'google',
    isUnknownRoute: false,
    pickupDate: '2026-10-10',
    returnDate: '',
    localPackage: '',
    pickupTime: '10:00 AM'
  });

  console.log("ONE WAY FARES:");
  fares.forEach(f => {
    console.log(`- ${f.title}: Base ${f.baseFare}, Total ${f.totalFare}, Market ${f.marketFare}, Save ${f.youSave}`);
  });

  const localFares = getAllVehicleFares({
    tripType: TRIP_TYPES.LOCAL,
    distanceKm: 0,
    estimatedToll: 0,
    estimatedStateTax: 0,
    tollCount: 0,
    travelTime: '',
    routeSource: 'local',
    distanceSource: 'local',
    isUnknownRoute: false,
    pickupDate: '2026-10-10',
    returnDate: '',
    localPackage: '8hr/80km',
    pickupTime: '10:00 AM'
  });

  console.log("\nLOCAL FARES (8hr/80km):");
  localFares.forEach(f => {
    console.log(`- ${f.title}: Base ${f.baseFare}, Total ${f.totalFare}, Market ${f.marketFare}`);
  });

} catch (error) {
  console.error("Verification failed:", error);
}
