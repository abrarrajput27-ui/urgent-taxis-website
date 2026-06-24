import React from 'react';
import { Activity, ThermometerSun, CloudRain, EyeOff, Moon, Mountain, CarFront } from 'lucide-react';

export default function LiveRouteInsight({ route }) {
  if (!route.liveRouteInsight) return null;
  const { liveRouteInsight } = route;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <Activity className="text-blue-500" /> Route Intelligence
        </h2>
        {/* Placeholder for future live traffic / weather data */}
        <div className="flex items-center gap-2 text-xs font-bold px-3 py-1.5 bg-green-50 text-green-700 rounded-full border border-green-200">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          Live Monitoring Active
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-2">
              <ThermometerSun size={14} className="text-amber-500" /> Best Travel Time
            </h4>
            <p className="text-sm font-semibold text-slate-800">{liveRouteInsight.bestTravelTime}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-2">
              <CarFront size={14} className="text-red-400" /> Weekend Traffic
            </h4>
            <p className="text-sm font-semibold text-slate-800">{liveRouteInsight.weekendTraffic}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-2">
              <Activity size={14} className="text-orange-500" /> Peak Season
            </h4>
            <p className="text-sm font-semibold text-slate-800">{liveRouteInsight.peakSeasonCongestion}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-2">
              <Moon size={14} className="text-indigo-500" /> Night Travel
            </h4>
            <p className="text-sm font-semibold text-slate-800">{liveRouteInsight.nightTravelSuitability}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-2">
              <CloudRain size={14} className="text-blue-400" /> Monsoon Risk
            </h4>
            <p className="text-sm font-semibold text-slate-800">{liveRouteInsight.monsoonRisk}</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="text-xs font-bold text-slate-500 uppercase flex items-center gap-1 mb-2">
              <EyeOff size={14} className="text-slate-400" /> Fog Risk
            </h4>
            <p className="text-sm font-semibold text-slate-800">{liveRouteInsight.fogRisk}</p>
          </div>
        </div>
        
        {liveRouteInsight.hillDriving && (
          <div className="mt-4 bg-blue-50 border border-blue-100 p-4 rounded-xl flex items-start gap-3">
            <Mountain className="text-blue-500 shrink-0 mt-0.5" size={20} />
            <div>
              <h4 className="text-sm font-bold text-blue-900 mb-1">Hill Driving Requirement</h4>
              <p className="text-sm text-blue-800">{liveRouteInsight.hillDriving}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
