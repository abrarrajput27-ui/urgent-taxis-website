import React from 'react';
import { Car, Users, Luggage, CheckCircle2 } from 'lucide-react';
import { fleetData } from '../../data/mockData';

export default function VehicleGuide() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <Car className="text-blue-500" /> Vehicle Availability Guide
        </h2>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {fleetData.map((car, index) => (
            <div key={index} className="bg-slate-50 p-5 rounded-xl border border-slate-200">
              <h4 className="font-bold text-[#3b2b98] text-lg mb-1">{car.categoryName}</h4>
              <p className="text-xs text-slate-500 mb-4 h-8">{car.vehiclesList}</p>
              
              <div className="flex items-center gap-4 text-slate-700 mb-4">
                <div className="flex items-center gap-1.5">
                  <Users size={16} className="text-blue-500" />
                  <span className="text-sm font-bold">{car.pax}</span>
                </div>
                <div className="w-px h-4 bg-slate-300"></div>
                <div className="flex items-center gap-1.5">
                  <Luggage size={16} className="text-blue-500" />
                  <span className="text-sm font-bold">{car.luggage}</span>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Plain Area Suitability:</span>
                  <span className="font-bold text-green-600">Excellent</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Hill Area Suitability:</span>
                  <span className={`font-bold ${car.categoryName.includes('Hatchback') ? 'text-orange-500' : 'text-green-600'}`}>
                    {car.categoryName.includes('Hatchback') ? 'Average' : 'Excellent'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
          <h4 className="text-sm font-bold text-blue-900 mb-2">Fuel Type Availability</h4>
          <div className="flex flex-wrap gap-2 mb-3">
            {['Petrol', 'Diesel', 'CNG', 'EV'].map(fuel => (
              <span key={fuel} className="px-2.5 py-1 bg-white border border-blue-200 text-blue-800 text-xs font-semibold rounded-md shadow-sm">
                {fuel}
              </span>
            ))}
          </div>
          <p className="text-xs text-blue-800 flex items-start gap-1.5 leading-relaxed">
            <CheckCircle2 size={14} className="mt-0.5 shrink-0" />
            <span><strong>Note:</strong> Vehicle fuel type depends strictly on local availability at the time of dispatch. However, we <strong>guarantee</strong> providing the exact vehicle category you book.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
