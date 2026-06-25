import React from 'react';
import { Car } from 'lucide-react';
import { getRouteFares, formatFare } from '../../utils/fareEngine';

export default function RouteCabOptionsDetail({ route }) {
  const isRoundTrip = route?.type?.toLowerCase().includes('round');
  const dynamic = route ? getRouteFares(route, isRoundTrip) : null;
  
  if (!dynamic || !dynamic.isValid) return null;

  const vehicleLabels = {
    hatchback: 'Hatchback',
    sedan: 'Sedan',
    ertiga: 'Ertiga / SUV',
    crysta: 'Innova Crysta',
    premiumSuv: 'Premium SUV',
    traveller: 'Tempo Traveller',
    urbania: 'Urbania',
    volvo: 'Volvo Bus'
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-xl md:text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <Car className="text-blue-500" /> Available Vehicles & Fares
        </h2>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {Object.entries(dynamic.fares).map(([key, amount]) => (
            amount && (
              <div key={key} className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex flex-col">
                <span className="text-xs font-bold text-slate-500 uppercase">{vehicleLabels[key]}</span>
                <span className="text-lg font-black text-[#00914d]">{formatFare(amount)}</span>
                {dynamic.isEstimated && (
                  <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider">Estimated</span>
                )}
              </div>
            )
          ))}
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">
          We offer a wide range of well-maintained vehicles for your {route.route || route.seoTitle} trip. Choose from our comfortable Sedans for small families or solo travelers, spacious SUVs like Ertiga for medium groups, or premium Innova Crysta for maximum comfort on longer journeys.
        </p>
        <p className="text-xs text-slate-500 italic mt-4">Final fare may vary based on pickup time, route, vehicle availability and applicable charges. Toll, state tax, parking, airport entry and permit charges may apply as per actual.</p>
      </div>
    </div>
  );
}
