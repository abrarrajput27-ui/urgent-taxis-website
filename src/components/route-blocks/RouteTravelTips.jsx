import React from 'react';
import { Lightbulb, CalendarDays } from 'lucide-react';

export default function RouteTravelTips({ route }) {
  if (!route.travelTips && !route.bestTime) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-xl md:text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <Lightbulb className="text-blue-500" /> Travel Tips & Best Time to Visit
        </h2>
      </div>
      <div className="p-6 space-y-6">
        {route.bestTime && (
          <div>
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-lg">
              <CalendarDays size={18} className="text-orange-500" /> Best Time to Travel
            </h3>
            <div className="text-slate-600 text-sm leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: route.bestTime }} />
          </div>
        )}
        
        {route.travelTips && (
          <div>
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2 text-lg">
              <Lightbulb size={18} className="text-yellow-500" /> Essential Travel Tips
            </h3>
            <div className="text-slate-600 text-sm leading-relaxed prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: route.travelTips }} />
          </div>
        )}
      </div>
    </div>
  );
}
