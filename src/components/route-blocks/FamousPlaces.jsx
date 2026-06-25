import React from 'react';
import { Camera, Clock, MapPin, Navigation, ImageOff } from 'lucide-react';
import { routeDestinationDatabase, destinationHubs } from '../../data/databases';

export default function FamousPlaces({ route }) {
  if (!route.destinationIds || route.destinationIds.length === 0) return null;

  const destinations = route.destinationIds.map(id => routeDestinationDatabase[id]).filter(Boolean);
  const hub = route.hubIds && route.hubIds.length > 0 ? destinationHubs[route.hubIds[0]] : null;

  if (destinations.length === 0) return null;

  // Group by distance band
  // Group by distance band
  const groupedDestinations = destinations.reduce((acc, dest) => {
    let band = dest.distanceBand || "Nearby";
    
    // Validation Rule: If destination is the hub itself, override its values
    if (hub && dest.destination === hub.hubName) {
      band = "0 km";
    }

    if (!acc[band]) acc[band] = [];
    acc[band].push(dest);
    return acc;
  }, {});

  const distanceOrder = ["0 km", "25 km", "50 km", "75 km", "100 km", "Nearby"];
  const sortedBands = Object.keys(groupedDestinations).sort((a, b) => distanceOrder.indexOf(a) - distanceOrder.indexOf(b));

  return (
    <section className="py-12 bg-white border-b border-slate-100">
      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
        <div className="flex justify-between items-end flex-wrap gap-4 mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-[#3b2b98] flex items-center gap-2">
              <Navigation className="text-blue-500" /> Destination Hub: {hub ? hub.hubName : 'Nearby Places'}
            </h2>
            <p className="text-slate-500 text-sm mt-2">{hub ? hub.description : 'Discover popular spots and plan your sightseeing trips easily.'}</p>
          </div>
          <span className="text-[10px] bg-slate-100 border border-slate-200 px-2 py-0.5 rounded text-slate-500 font-bold">
            Last Updated: {destinations[0]?.lastUpdated || "18/06/2026"}
          </span>
        </div>

        <div className="space-y-12">
          {sortedBands.map(band => (
            <div key={band}>
              <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2">
                Within {band}
                <div className="h-px bg-slate-200 flex-1 ml-4"></div>
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groupedDestinations[band].map((dest, idx) => (
                  <div key={idx} className="bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 hover:shadow-lg transition-all group">
                    <div className="h-40 overflow-hidden relative">
                      {dest.imageVerified === false || !dest.image ? (
                        <div className="w-full h-full bg-slate-200 flex flex-col items-center justify-center text-slate-400">
                           <ImageOff size={24} className="mb-1 opacity-50" />
                           <span className="text-[10px] font-bold uppercase tracking-wider text-center px-2">Image Not Verified</span>
                        </div>
                      ) : (
                        <img 
                          src={dest.image} 
                          alt={dest.destination} 
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded">
                        {dest.category}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-slate-800 mb-2">{dest.destination}</h3>
                      
                      <div className="space-y-1 mb-3">
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                          <MapPin size={12} className="text-blue-500" /> {hub && dest.destination === hub.hubName ? "0 km" : (dest.distance === "0 km" && hub && dest.destination !== hub.hubName ? "Varies" : dest.distance)}
                        </div>
                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                          <Clock size={12} className="text-blue-500" /> {hub && dest.destination === hub.hubName ? "0 Hours" : (dest.travelTime === "0 Hours" && hub && dest.destination !== hub.hubName ? "Varies" : dest.travelTime)} {dest.travelTime !== "0 Hours" || (hub && dest.destination === hub.hubName) ? "Travel" : ""}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-200">
                        {/* Placeholder for future internal link generation */}
                        <div className="text-xs text-blue-600 font-bold hover:underline cursor-pointer">
                          View {dest.destination} Taxi Fares →
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
