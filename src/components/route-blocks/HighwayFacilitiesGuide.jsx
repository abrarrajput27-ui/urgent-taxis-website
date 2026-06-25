import React, { useState } from 'react';
import { Coffee, MapPin, Clock, Fuel, ShieldPlus, Wrench, ImageOff } from 'lucide-react';
import { getActiveFacilitiesByRoute, sortFacilitiesByRanking, sortFacilitiesByRouteOrder, getLastUpdatedForRoute } from '../../utils/routeHelpers';

export default function HighwayFacilitiesGuide({ route }) {
  const [viewMode, setViewMode] = useState('recommended'); // 'recommended' | 'route'
  
  if (!route) return null;

  // Extract base tag like "delhi-nainital" from "delhi-to-nainital-taxi"
  const routeTag = route.slug ? route.slug.replace('-to-', '-').replace('-taxi', '') : null;
  
  const activeFacilities = routeTag ? getActiveFacilitiesByRoute(routeTag) : [];
  if (activeFacilities.length === 0) return null;

  const foodFacilities = activeFacilities.filter(f => f.category === 'Food & Restaurants');
  const recommendedStops = sortFacilitiesByRanking(foodFacilities);
  const routeOrderStops = sortFacilitiesByRouteOrder(activeFacilities);

  const displayList = viewMode === 'recommended' ? recommendedStops : routeOrderStops;
  const lastUpdated = routeTag ? getLastUpdatedForRoute(routeTag) : "18/06/2026";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
            <Coffee className="text-blue-500" /> Highway Facilities Guide
          </h2>
          <p className="text-xs text-slate-500 mt-1">Important facilities on this route. More verified places may be added over time.</p>
          <div className="flex gap-2 mt-3">
            <button 
              onClick={() => setViewMode('recommended')}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${viewMode === 'recommended' ? 'bg-[#3b2b98] text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
            >
              Top Recommended Food
            </button>
            <button 
              onClick={() => setViewMode('route')}
              className={`text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${viewMode === 'route' ? 'bg-[#3b2b98] text-white' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}`}
            >
              Coming Up On Route
            </button>
          </div>
        </div>
        <span className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-500 font-bold">
          Last Updated: {lastUpdated}
        </span>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {displayList.map((stop) => (
            <div key={stop.id} className="flex flex-col sm:flex-row gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200 hover:border-blue-300 transition-colors">
              
              <div className="sm:w-48 h-32 shrink-0 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center relative">
                {stop.imageVerified && stop.image ? (
                  <img src={stop.image} alt={stop.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                ) : (
                  <div className="flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                    <ImageOff size={24} className="mb-2 opacity-50" />
                    <span className="text-xs font-semibold">Image not verified</span>
                    <span className="text-[10px] text-blue-500 mt-1 cursor-pointer hover:underline">Suggest Image Update</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-lg text-slate-800">{stop.name}</h4>
                    <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold uppercase">{stop.category}</span>
                  </div>
                  {stop.rating && (
                    <div className="text-right">
                      <span className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                        ★ {stop.rating}
                      </span>
                      <p className="text-[10px] text-slate-400 mt-1">{stop.reviewCount} reviews</p>
                    </div>
                  )}
                </div>

                {stop.typicalServiceTime && (
                  <div className="flex flex-wrap gap-3 mb-3 text-xs font-semibold text-slate-600 bg-white p-2 rounded border border-slate-100 inline-flex">
                    <span className="flex items-center gap-1 text-slate-700">Typical Service Time: <span className="text-blue-600">{stop.typicalServiceTime}</span></span>
                  </div>
                )}

                <div className="flex flex-wrap gap-3 mb-3 text-xs font-semibold text-slate-600">
                  <span className="flex items-center gap-1"><MapPin size={12}/> {stop.distanceFromPickup} km</span>
                  <span className="flex items-center gap-1"><Clock size={12}/> {stop.approxTravelTimeFromPickup}</span>
                  {stop.openHours && <span className="flex items-center gap-1 text-blue-600 border border-blue-200 px-1 rounded">{stop.openHours}</span>}
                </div>

                <div className="flex flex-wrap gap-2 text-xs mt-3 pt-3 border-t border-slate-200">
                  {stop.vegNonVeg === 'Pure Veg' && <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded font-medium">Pure Veg</span>}
                  
                  {stop.facilityTags && stop.facilityTags.map((fac, i) => {
                    let Icon = ShieldPlus;
                    if (fac.includes('Fuel') || fac.includes('Petrol') || fac.includes('CNG')) Icon = Fuel;
                    if (fac.includes('Tyre')) Icon = Wrench;
                    return (
                      <span key={i} className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-1 rounded font-medium flex items-center gap-1">
                        <Icon size={12}/> {fac}
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
