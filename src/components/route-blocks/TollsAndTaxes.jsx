import React from 'react';
import { Landmark, Receipt, AlertTriangle, ShieldCheck } from 'lucide-react';
import { tollDatabase, stateTaxDatabase } from '../../data/databases';

export default function TollsAndTaxes({ route }) {
  if ((!route.tollIds || route.tollIds.length === 0) && (!route.stateTaxIds || route.stateTaxIds.length === 0)) return null;

  const tolls = (route.tollIds || []).map(id => tollDatabase[id]).filter(Boolean);
  const taxes = (route.stateTaxIds || []).map(id => stateTaxDatabase[id]).filter(Boolean);

  // Use the most recent update date from tolls or taxes
  let latestUpdate = "N/A";
  if (tolls.length > 0) latestUpdate = tolls[0].lastUpdated;
  else if (taxes.length > 0) latestUpdate = taxes[0].lastUpdated;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <Landmark className="text-blue-500" /> Estimated Tolls & Taxes
        </h2>
        <span className="text-[10px] bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-500 font-bold">
          Last Updated: {latestUpdate}
        </span>
      </div>

      <div className="bg-amber-50 border-b border-amber-200 p-4 flex gap-3">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
        <p className="text-xs text-amber-800 font-medium leading-relaxed">
          Indicative charges only. Actual toll/state tax may change based on vehicle category, route, FASTag/cash payment, permit rules and government updates. Do not consider these as exact/guaranteed amounts.
        </p>
      </div>
      
      <div className="p-6 space-y-6">
        
        {tolls.length > 0 && (
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Receipt size={18} className="text-blue-500"/> Toll Information
            </h3>
            <p className="text-sm text-slate-600 mb-4">
              There are approximately <strong className="text-slate-800">{tolls.length} major toll plazas</strong> on this route. FASTag is highly recommended to avoid double cash penalties.
            </p>
            <div className="flex flex-wrap gap-2">
              {tolls.map((toll, idx) => (
                <span key={idx} className="bg-white border border-slate-200 text-slate-700 text-xs px-3 py-1.5 rounded-lg font-medium">
                  {toll.tollName}
                </span>
              ))}
            </div>
          </div>
        )}

        {taxes.length > 0 && (
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <ShieldCheck size={18} className="text-green-600"/> State Border Tax
            </h3>
            <p className="text-sm text-slate-600 mb-2 font-medium">
              As Per Applicable State Transport Rules
            </p>
            <p className="text-sm text-slate-600 mb-3">
              State tax applies when crossing borders into {taxes.map(t => t.state).join(', ')}. Tax amount varies by:
            </p>
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 ml-1">
              <li>Vehicle category (Hatchback/Sedan vs Commercial MUV/Minibus)</li>
              <li>Permit type (All-India Tourist Permit vs State Permit)</li>
              <li>Trip duration and state regulations</li>
            </ul>
          </div>
        )}

      </div>
    </div>
  );
}
