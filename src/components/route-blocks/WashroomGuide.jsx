import React from 'react';
import { Droplets, CheckCircle2 } from 'lucide-react';

export default function WashroomGuide() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <Droplets className="text-blue-500" /> Washroom Guide
        </h2>
        <span className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-500 font-bold">
          Last Updated: 18/06/2026
        </span>
      </div>
      
      <div className="p-6">
        <p className="text-sm text-slate-600 mb-6">
          We understand that clean washrooms are a priority for families. Our drivers are trained to stop only at verified locations.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="text-blue-500 shrink-0 mt-0.5" size={16} />
              <div>
                <h4 className="font-bold text-blue-900 text-sm mb-1">Family Friendly</h4>
                <p className="text-xs text-blue-800">We prioritize stopping at premium rest areas and family dhabas known for cleanliness.</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={16} />
              <div>
                <h4 className="font-bold text-green-900 text-sm mb-1">Cleanliness Assured</h4>
                <p className="text-xs text-green-800">Locations like Bikanerwala, Haldirams, and premium fuel pumps are preferred.</p>
              </div>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="text-purple-500 shrink-0 mt-0.5" size={16} />
              <div>
                <h4 className="font-bold text-purple-900 text-sm mb-1">24x7 Availability</h4>
                <p className="text-xs text-purple-800">Major highway petrol pumps and 24x7 dhabas provide access during night journeys.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
