import React from 'react';
import { Plane, Info, CheckCircle2 } from 'lucide-react';
import { airportGuideData } from '../../data/mockData';

export default function AirportPickupGuide() {
  const guide = airportGuideData.delhi;

  if (!guide) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
            <Plane className="text-blue-500" /> Airport Pickup Guide
          </h2>
          <p className="text-slate-500 text-sm mt-1">{guide.airportName}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1.5 rounded-full">
          {guide.airportCode}
        </div>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h4 className="font-bold text-slate-800 mb-3 text-sm">Terminal Information</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guide.terminals.map((t, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <h5 className="font-bold text-[#3b2b98] mb-1">{t.name}</h5>
                <p className="text-xs text-slate-600 leading-relaxed">{t.notes}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl mt-6">
          <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-4">
            <Info size={18} className="text-blue-500" /> Pickup Policies
          </h4>
          <div className="space-y-4 text-sm text-slate-700 font-medium">
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100">
              <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <p>{guide.rules.pickupProcess}</p>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100">
              <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <p>{guide.rules.meetingPoint}</p>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100">
              <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <p>{guide.rules.waitingRules}</p>
            </div>
            <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-slate-100">
              <CheckCircle2 size={18} className="text-blue-500 shrink-0 mt-0.5" />
              <p>{guide.rules.parkingRules}</p>
            </div>
          </div>
        </div>

        {guide.facilities && (
          <div className="mt-6 pt-6 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">Food Options</h4>
              <p className="text-sm text-slate-600">{guide.facilities.food}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">ATM</h4>
              <p className="text-sm text-slate-600">{guide.facilities.atm}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">Washrooms</h4>
              <p className="text-sm text-slate-600">{guide.facilities.washrooms}</p>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-800 text-xs uppercase mb-1">Luggage Trolleys</h4>
              <p className="text-sm text-slate-600">{guide.facilities.trolleys}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
