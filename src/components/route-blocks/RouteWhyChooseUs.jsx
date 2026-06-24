import React from 'react';
import { ShieldCheck } from 'lucide-react';

export default function RouteWhyChooseUs({ route }) {
  if (!route.whyChooseUs) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-xl md:text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <ShieldCheck className="text-blue-500" /> Why Choose Us for {route.toCity || route.to}?
        </h2>
      </div>
      <div className="p-6 prose prose-sm text-slate-600 leading-relaxed max-w-none" dangerouslySetInnerHTML={{ __html: route.whyChooseUs }} />
    </div>
  );
}
