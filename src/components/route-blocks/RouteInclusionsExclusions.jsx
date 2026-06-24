import React from 'react';
import { CheckCircle2, XCircle, ListChecks } from 'lucide-react';

export default function RouteInclusionsExclusions({ route }) {
  if (!route.inclusions && !route.exclusions) return null;
  if (route.inclusions?.length === 0 && route.exclusions?.length === 0) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-xl md:text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <ListChecks className="text-blue-500" /> Inclusions & Exclusions
        </h2>
      </div>
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        {route.inclusions && route.inclusions.length > 0 && (
          <div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg">
              <CheckCircle2 size={18} className="text-green-500" /> What's Included
            </h3>
            <ul className="space-y-3">
              {route.inclusions.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-600 text-sm">
                  <CheckCircle2 size={16} className="text-green-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {route.exclusions && route.exclusions.length > 0 && (
          <div>
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2 text-lg">
              <XCircle size={18} className="text-red-500" /> What's Excluded
            </h3>
            <ul className="space-y-3">
              {route.exclusions.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-600 text-sm">
                  <XCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
