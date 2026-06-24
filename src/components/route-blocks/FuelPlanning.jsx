import React from 'react';
import { Fuel, CheckCircle2 } from 'lucide-react';

export default function FuelPlanning({ route }) {
  if (!route.fuelPlanning) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <Fuel className="text-blue-500" /> Fuel & CNG Planning
        </h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">Petrol & Diesel Availability</h4>
            <p className="text-sm text-slate-600 leading-relaxed flex items-start gap-2">
              <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
              {route.fuelPlanning.petrolDiesel}
            </p>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <h4 className="font-bold text-slate-800 mb-2">CNG Availability</h4>
            <p className="text-sm text-slate-600 leading-relaxed flex items-start gap-2">
              <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
              {route.fuelPlanning.cngAvailability}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
