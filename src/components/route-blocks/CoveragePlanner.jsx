import React from 'react';
import { CalendarDays, Clock } from 'lucide-react';

export default function CoveragePlanner({ route }) {
  if (!route.coveragePlanner) return null;
  const { coveragePlanner } = route;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <CalendarDays className="text-blue-500" /> One Day Coverage Planner
        </h2>
        <p className="text-slate-500 text-sm mt-1">Suggested itineraries for your stay.</p>
      </div>
      
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {Object.entries(coveragePlanner).map(([key, data]) => {
          const titles = { halfDay: 'Half Day Plan', fullDay: 'Full Day Plan', twoDay: '2 Day Plan', threeDay: '3 Day Plan' };
          return (
            <div key={key} className="bg-slate-50 border border-slate-200 p-5 rounded-xl">
              <div className="flex justify-between items-start mb-3">
                <h4 className="font-bold text-slate-800 text-sm">{titles[key]}</h4>
                <span className="text-xs font-semibold bg-white px-2 py-1 rounded border border-slate-200 flex items-center gap-1 text-slate-600">
                  <Clock size={12} /> {data.time}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed font-medium">{data.plan}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
