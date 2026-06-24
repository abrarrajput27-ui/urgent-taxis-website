import React from 'react';
import { Map, MapPin, Milestone, Signpost } from 'lucide-react';

export default function RouteMapIntelligence({ route }) {
  if (!route.routeMapIntelligence) return null;
  const { routeMapIntelligence, travelTimeline } = route;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <Map className="text-blue-500" /> Route Map Intelligence
        </h2>
        {route.liveStatus?.closures && (
          <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full animate-pulse">
            Road Closure Alert
          </span>
        )}
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Main Route</p>
              <p className="font-semibold text-slate-800 flex items-start gap-2">
                <Signpost size={18} className="text-blue-500 mt-0.5 shrink-0" />
                {routeMapIntelligence.mainRoute}
              </p>
            </div>
            {routeMapIntelligence.alternativeRoute && (
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Alternative Route</p>
                <p className="font-semibold text-slate-800 flex items-start gap-2">
                  <Signpost size={18} className="text-amber-500 mt-0.5 shrink-0" />
                  {routeMapIntelligence.alternativeRoute}
                </p>
              </div>
            )}
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">City Crossings</p>
              <div className="flex flex-wrap gap-2 mt-1">
                {routeMapIntelligence.cityCrossings.map((city, idx) => (
                  <span key={idx} className="bg-slate-100 text-slate-700 px-2 py-1 rounded-md text-xs font-medium">
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Toll Plazas</p>
              <p className="font-semibold text-slate-800 flex items-start gap-2">
                <Milestone size={18} className="text-blue-500 mt-0.5 shrink-0" />
                {routeMapIntelligence.tollPlazas}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">State Border Entry</p>
              <p className="font-semibold text-slate-800 flex items-start gap-2">
                <MapPin size={18} className="text-green-500 mt-0.5 shrink-0" />
                {routeMapIntelligence.stateBorder}
              </p>
            </div>
            {routeMapIntelligence.airportPickupRoute && (
              <div>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mb-1">Airport Pickup Route</p>
                <p className="text-sm font-medium text-slate-700">{routeMapIntelligence.airportPickupRoute}</p>
              </div>
            )}
          </div>
        </div>

        {/* Visual Timeline Stepper */}
        {travelTimeline && travelTimeline.length > 0 && (
          <div className="mt-8 pt-6 border-t border-slate-100">
            <h3 className="font-bold text-slate-800 mb-6 text-sm">Visual Route Timeline</h3>
            <div className="relative">
              <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-blue-100 hidden sm:block"></div>
              <div className="space-y-6">
                {travelTimeline.map((item, index) => (
                  <div key={index} className="flex gap-4 sm:gap-6 relative z-10">
                    <div className="shrink-0 hidden sm:flex flex-col items-center">
                      <div className={`w-4 h-4 rounded-full border-2 border-white shadow-sm flex items-center justify-center ${index === 0 ? 'bg-green-500' : index === travelTimeline.length - 1 ? 'bg-red-500' : 'bg-blue-500'}`}>
                      </div>
                    </div>
                    <div className="flex-1 bg-slate-50 p-4 rounded-xl border border-slate-200">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h4 className="font-bold text-slate-800">{item.point}</h4>
                        <div className="flex gap-3 text-xs font-semibold text-slate-500">
                          <span className="bg-white px-2 py-1 rounded border border-slate-200">{item.distanceFromDelhi}</span>
                          <span className="bg-white px-2 py-1 rounded border border-slate-200">{item.approxTime}</span>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600">{item.notes}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
