import { facilitiesDatabase, routeDestinationDatabase } from '../data/databases';

export const getActiveFacilitiesByRoute = (routeTag) => {
  return Object.values(facilitiesDatabase).filter(
    facility => facility.routeTags.includes(routeTag) && facility.status === 'active'
  );
};

export const getFacilitiesByCategory = (routeTag, category) => {
  const activeFacilities = getActiveFacilitiesByRoute(routeTag);
  return activeFacilities.filter(facility => facility.category === category);
};

export const sortFacilitiesByRouteOrder = (facilities) => {
  return [...facilities].sort((a, b) => a.distanceFromPickup - b.distanceFromPickup);
};

export const sortFacilitiesByRanking = (facilities) => {
  return [...facilities].sort((a, b) => {
    let scoreA = (a.rating || 0) * 10 + (a.reviewCount || 0) / 1000;
    let scoreB = (b.rating || 0) * 10 + (b.reviewCount || 0) / 1000;

    // Feature bonuses
    if (a.familyFriendly) scoreA += 5;
    if (b.familyFriendly) scoreB += 5;
    
    if (a.washroom && typeof a.washroom === 'string' && a.washroom.toLowerCase().includes('clean')) scoreA += 5;
    if (b.washroom && typeof b.washroom === 'string' && b.washroom.toLowerCase().includes('clean')) scoreB += 5;
    
    if (a.parking) scoreA += 2;
    if (b.parking) scoreB += 2;

    return scoreB - scoreA; // Descending
  });
};

export const getLastUpdatedForRoute = (routeTag) => {
  const activeFacilities = getActiveFacilitiesByRoute(routeTag);
  
  const activeDestinations = Object.values(routeDestinationDatabase).filter(
    dest => dest.routeTags && dest.routeTags.includes(routeTag) && dest.status === 'active'
  );

  let latestDateStr = "18/06/2026"; // Default baseline
  let latestDate = new Date("2026-06-18");

  const parseAndCompare = (dateStr) => {
    if (!dateStr) return;
    const [day, month, year] = dateStr.split('/');
    if (day && month && year) {
      const d = new Date(`${year}-${month}-${day}`);
      if (d > latestDate) {
        latestDate = d;
        latestDateStr = dateStr;
      }
    }
  };

  activeFacilities.forEach(f => parseAndCompare(f.lastUpdated));
  activeDestinations.forEach(d => parseAndCompare(d.lastUpdated));

  return latestDateStr;
};
