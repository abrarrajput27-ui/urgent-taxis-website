import React from 'react';
import { Car } from 'lucide-react';

export default function RouteCabOptionsDetail({ route }) {
  if (!route.vehicleOptions || route.vehicleOptions.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-xl md:text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <Car className="text-blue-500" /> Available Cab Options
        </h2>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-3 mb-4">
          {route.vehicleOptions.map((vehicle, index) => (
            <span key={index} className="bg-blue-50 text-[#3b2b98] px-4 py-2 rounded-lg font-bold text-sm border border-blue-100">
              {vehicle}
            </span>
          ))}
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          We offer a wide range of well-maintained vehicles for your {route.route} trip. Choose from our comfortable Sedans for small families or solo travelers, spacious SUVs like Ertiga for medium groups, or premium Innova Crysta for maximum comfort on longer journeys.
        </p>
      </div>
    </div>
  );
}
