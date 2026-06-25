/**
 * Dynamic Fare Engine
 * Centralized utility to estimate and fetch fares for outstation routes.
 */

export const VEHICLE_RATES = {
  hatchback: { perKm: 9.0, driverAllowance: 300 },
  sedan: { perKm: 10.0, driverAllowance: 300 },
  ertiga: { perKm: 13.0, driverAllowance: 300 },
  crysta: { perKm: 18.0, driverAllowance: 300 },
  premiumSuv: { perKm: 35.0, driverAllowance: 500 },
  traveller: { perKm: 24.0, driverAllowance: 500 },
  urbania: { perKm: 28.0, driverAllowance: 500 },
  volvo: { perKm: 50.0, driverAllowance: 1000 },
};

export const TERRAIN_MULTIPLIERS = {
  plain: 1.0,
  hill: 1.25,
};

export const BUSINESS_MARGIN = 1.10; // 10% margin
export const MIN_KM_PER_DAY = 250;

/**
 * Checks if a route name implies a hill station route
 */
export const isHillRoute = (routeName) => {
  if (!routeName) return false;
  const lower = routeName.toLowerCase();
  const hills = ['nainital', 'shimla', 'manali', 'dehradun', 'mussoorie', 'rishikesh', 'kullu', 'dharamshala'];
  return hills.some(hill => lower.includes(hill));
};

/**
 * Validates distance
 */
export const extractDistance = (distanceStr) => {
  if (!distanceStr) return 0;
  const parsed = parseInt(distanceStr.toString().replace(/[^0-9]/g, ''), 10);
  return isNaN(parsed) ? 0 : parsed;
};

/**
 * Formats currency safely
 */
export const formatFare = (amount) => {
  if (amount === null || amount === undefined) return 'On Request';
  return `₹${amount.toLocaleString('en-IN')}`;
};

/**
 * Core One Way calculation formula
 */
export const calculateOneWayFare = (distanceKm, vehicleKey, options = {}) => {
  if (!distanceKm || distanceKm <= 0) return null;
  
  const vehicle = VEHICLE_RATES[vehicleKey] || VEHICLE_RATES.sedan;
  const multiplier = options.isHill ? TERRAIN_MULTIPLIERS.hill : TERRAIN_MULTIPLIERS.plain;
  
  const baseCost = distanceKm * vehicle.perKm * multiplier;
  let total = baseCost + vehicle.driverAllowance;
  
  total = total * BUSINESS_MARGIN;
  
  // Fix floating point errors before rounding
  total = Math.round(total);
  // Round up to nearest 10 for clean prices
  return Math.ceil(total / 10) * 10;
};

/**
 * Core Round Trip calculation formula
 */
export const calculateRoundTripFare = (days, vehicleKey) => {
  if (!days || days <= 0) days = 1;
  const vehicle = VEHICLE_RATES[vehicleKey] || VEHICLE_RATES.sedan;
  
  const minKmBilled = days * MIN_KM_PER_DAY;
  const baseCost = minKmBilled * vehicle.perKm;
  const driverAllowance = days * vehicle.driverAllowance;
  
  let total = baseCost + driverAllowance;
  total = total * BUSINESS_MARGIN;
  
  total = Math.round(total);
  return Math.ceil(total / 10) * 10;
};

/**
 * Get unified fares for a route object. 
 * Supports manual overrides if `route.manualFares` exists.
 */
export const getRouteFares = (route, isRoundTrip = false, days = 1) => {
  const result = {
    isManual: false,
    isValid: true,
    isEstimated: true,
    fares: {
      hatchback: null,
      sedan: null,
      ertiga: null,
      crysta: null,
      premiumSuv: null,
      traveller: null,
      urbania: null,
      volvo: null
    }
  };

  // If route explicitly provides manual overrides
  if (route?.manualFares) {
    result.isManual = true;
    result.isEstimated = false; // Manual overrides are exact
    result.fares = { ...result.fares, ...route.manualFares };
    return result;
  }

  // Calculate Distance
  const routeStr = route?.route || route?.slug || '';
  const distanceKm = extractDistance(route?.distanceKm || route?.distance);
  
  if (!distanceKm || distanceKm <= 0) {
    result.isValid = false;
    return result; // "On Request" state
  }

  const isHill = isHillRoute(routeStr);

  // Compute each vehicle
  Object.keys(result.fares).forEach(key => {
    if (isRoundTrip) {
      result.fares[key] = calculateRoundTripFare(days, key);
    } else {
      result.fares[key] = calculateOneWayFare(distanceKm, key, { isHill });
    }
  });

  return result;
};
