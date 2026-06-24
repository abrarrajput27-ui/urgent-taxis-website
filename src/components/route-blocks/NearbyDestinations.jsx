import React from 'react';
import { Map, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NearbyDestinations({ route }) {
  if (!route.nearbyDestinations || route.nearbyDestinations.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <Map className="text-blue-500" /> Nearby Destinations
        </h2>
      </div>
      
      <div className="p-6">
        <p className="text-slate-600 mb-6 text-sm">Popular tourist spots and cities easily accessible from your destination.</p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {route.nearbyDestinations.map((dest, index) => (
            <div key={index} className="group bg-slate-50 hover:bg-blue-50 transition-colors p-4 rounded-xl border border-slate-200 hover:border-blue-200 flex flex-col justify-between cursor-pointer">
              <div>
                <h4 className="font-bold text-slate-800 group-hover:text-blue-800 transition-colors">{dest.name}</h4>
                <p className="text-xs text-slate-500 mb-2">{dest.distance} away</p>
              </div>
              <ArrowRight size={16} className="text-blue-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
