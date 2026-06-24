import React from 'react';
import { Camera, Clock, CheckCircle2, Car, MapPin } from 'lucide-react';

export default function TouristPlanning({ route }) {
  if (!route.touristPlanning || route.touristPlanning.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <Camera className="text-blue-500" /> Tourist Planning
        </h2>
        <p className="text-slate-500 text-sm mt-1">Plan your local sightseeing after reaching {route.route.split(' to ')[1]}.</p>
      </div>
      
      <div className="overflow-x-auto p-6">
        <div className="min-w-[800px] grid grid-cols-12 gap-4 text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 px-2">
          <div className="col-span-3">Place Name</div>
          <div className="col-span-2">Distance</div>
          <div className="col-span-2">Travel Time</div>
          <div className="col-span-2">Rec. Stay</div>
          <div className="col-span-3 text-right">Facilities</div>
        </div>
        
        <div className="space-y-3">
          {route.touristPlanning.map((place, idx) => (
            <div key={idx} className="min-w-[800px] grid grid-cols-12 gap-4 items-center bg-slate-50 border border-slate-200 p-4 rounded-xl hover:bg-white hover:border-blue-200 transition-colors">
              <div className="col-span-3 font-bold text-slate-800 flex items-center gap-2">
                <MapPin size={16} className="text-blue-500 shrink-0" /> {place.name}
              </div>
              <div className="col-span-2 text-sm font-semibold text-slate-700">{place.distance}</div>
              <div className="col-span-2 text-sm font-semibold text-slate-700 flex items-center gap-1">
                <Clock size={14} className="text-slate-400" /> {place.travelTime}
              </div>
              <div className="col-span-2 text-sm text-slate-600">{place.stayTime}</div>
              <div className="col-span-3 flex flex-wrap justify-end gap-2 text-xs">
                {place.familyFriendly === 'Yes' && (
                  <span className="bg-green-50 text-green-700 border border-green-200 px-2 py-1 rounded font-medium">Family Friendly</span>
                )}
                {place.parking && (
                  <span className="bg-slate-100 text-slate-600 border border-slate-200 px-2 py-1 rounded font-medium flex items-center gap-1">
                    <Car size={12} /> Parking: {place.parking}
                  </span>
                )}
                <span className="bg-blue-50 text-blue-700 border border-blue-200 px-2 py-1 rounded font-medium">{place.difficulty}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
