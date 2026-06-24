import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

export default function RoutePickupDropPoints({ route }) {
  if (!route.pickupPoints && !route.dropPoints) return null;
  if (route.pickupPoints?.length === 0 && route.dropPoints?.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-xl md:text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <MapPin className="text-blue-500" /> Pickup & Drop Points
        </h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {route.pickupPoints && route.pickupPoints.length > 0 && (
          <div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg">
              <Navigation size={18} className="text-green-500" /> Available Pickups
            </h3>
            <ul className="space-y-3">
              {route.pickupPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-600 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0"></div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {route.dropPoints && route.dropPoints.length > 0 && (
          <div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg">
              <MapPin size={18} className="text-red-500" /> Available Drops
            </h3>
            <ul className="space-y-3">
              {route.dropPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-600 text-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
