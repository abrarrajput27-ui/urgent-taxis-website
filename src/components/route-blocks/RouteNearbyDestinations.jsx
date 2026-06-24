import React from 'react';
import { MountainSnow } from 'lucide-react';

export default function RouteNearbyDestinations({ route }) {
  if (!route.nearbyDestinations) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-xl md:text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <MountainSnow className="text-blue-500" /> Nearby Destinations & Places to Visit
        </h2>
      </div>
      <div className="p-6 prose prose-sm text-slate-600 leading-relaxed max-w-none" dangerouslySetInnerHTML={{ __html: route.nearbyDestinations }} />
    </div>
  );
}
