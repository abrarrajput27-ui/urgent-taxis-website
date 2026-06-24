import React from 'react';
import { MapPin, Clock, AlertTriangle, CloudRain, Snowflake, Sunrise } from 'lucide-react';

export default function RouteOverview({ route }) {
  if (!route.overview) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <MapPin className="text-blue-500" /> Route Overview
        </h2>
      </div>
      
      <div className="p-6 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Distance & Time</p>
            <p className="text-slate-800 font-bold text-lg">{route.overview.distance} • {route.overview.travelTime}</p>
          </div>
          <div className="bg-blue-50/50 p-4 rounded-xl border border-blue-100">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Best Travel Time</p>
            <p className="text-slate-800 font-bold text-lg">{route.overview.bestTravelTime}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <Sunrise size={18} className="text-orange-500" /> Day vs Night Travel
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">{route.overview.dayVsNight}</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800 mb-2">Road Condition</h3>
            <p className="text-slate-600 text-sm leading-relaxed">{route.overview.roadCondition}</p>
          </div>
        </div>

        {route.travelAlerts && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-slate-100">
            {route.travelAlerts.hillDriving && (
              <div className="flex gap-3 items-start bg-orange-50 p-3 rounded-lg border border-orange-100">
                <AlertTriangle size={18} className="text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-orange-800 uppercase mb-0.5">Hill Driving</p>
                  <p className="text-xs text-orange-700">{route.travelAlerts.hillDriving}</p>
                </div>
              </div>
            )}
            {route.travelAlerts.monsoonWarning && (
              <div className="flex gap-3 items-start bg-blue-50 p-3 rounded-lg border border-blue-100">
                <CloudRain size={18} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-blue-800 uppercase mb-0.5">Monsoon Advisory</p>
                  <p className="text-xs text-blue-700">{route.travelAlerts.monsoonWarning}</p>
                </div>
              </div>
            )}
            {route.travelAlerts.winterWarning && (
              <div className="flex gap-3 items-start bg-slate-100 p-3 rounded-lg border border-slate-200">
                <Snowflake size={18} className="text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-slate-700 uppercase mb-0.5">Winter Advisory</p>
                  <p className="text-xs text-slate-600">{route.travelAlerts.winterWarning}</p>
                </div>
              </div>
            )}
            {route.travelAlerts.nightDriving && (
              <div className="flex gap-3 items-start bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                <Clock size={18} className="text-indigo-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-indigo-800 uppercase mb-0.5">Night Driving</p>
                  <p className="text-xs text-indigo-700">{route.travelAlerts.nightDriving}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {route.travelTimeline && route.travelTimeline.length > 0 && (
          <div className="pt-6 border-t border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Travel Timeline</h3>
            <div className="relative border-l-2 border-blue-200 ml-3 space-y-6">
              {route.travelTimeline.map((point, index) => (
                <div key={index} className="relative pl-6">
                  <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-4 border-blue-500"></div>
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                    <h4 className="font-bold text-slate-800">{point.point}</h4>
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{point.distanceFromDelhi} • {point.approxTime}</span>
                  </div>
                  <p className="text-xs text-slate-500">{point.notes}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
