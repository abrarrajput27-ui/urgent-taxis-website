import React from 'react';
import { IndianRupee, Info, CheckCircle2 } from 'lucide-react';
import { fleetData } from '../../data/mockData';
import { getRouteFares, formatFare } from '../../utils/fareEngine';

export default function FareSection({ route }) {
  const isRoundTrip = route?.type?.toLowerCase().includes('round');
  const dynamic = route ? getRouteFares(route, isRoundTrip) : null;

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <IndianRupee className="text-blue-500" /> Fare Chart
        </h2>
      </div>

      {route && dynamic && (
        <div className="p-6 bg-blue-50/50 border-b border-slate-100">
          <h3 className="font-bold text-[#3b2b98] mb-4 text-lg">
            {isRoundTrip ? 'Round Trip Fares for' : 'One Way Fares for'} {route.route || route.seoTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm text-center">
              <span className="text-sm font-bold text-slate-500 uppercase block mb-1">Sedan</span>
              <span className={`font-black text-[#00914d] block mb-1 ${dynamic.fares.sedan ? 'text-2xl' : 'text-lg mt-1'}`}>
                {formatFare(dynamic.fares.sedan)}
              </span>
              {dynamic.isEstimated && dynamic.fares.sedan && (
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider block mb-1">Estimated Fare</span>
              )}
              <span className="text-xs text-slate-400">Swift Dzire, Etios or similar</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm text-center">
              <span className="text-sm font-bold text-slate-500 uppercase block mb-1">Ertiga / MPV</span>
              <span className={`font-black text-[#00914d] block mb-1 ${dynamic.fares.ertiga ? 'text-2xl' : 'text-lg mt-1'}`}>
                {formatFare(dynamic.fares.ertiga)}
              </span>
              {dynamic.isEstimated && dynamic.fares.ertiga && (
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider block mb-1">Estimated Fare</span>
              )}
              <span className="text-xs text-slate-400">Maruti Ertiga, Carens or similar</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm text-center">
              <span className="text-sm font-bold text-slate-500 uppercase block mb-1">Innova Crysta</span>
              <span className={`font-black text-[#00914d] block mb-1 ${dynamic.fares.crysta ? 'text-2xl' : 'text-lg mt-1'}`}>
                {formatFare(dynamic.fares.crysta)}
              </span>
              {dynamic.isEstimated && dynamic.fares.crysta && (
                <span className="text-[10px] font-bold text-orange-500 uppercase tracking-wider block mb-1">Estimated Fare</span>
              )}
              <span className="text-xs text-slate-400">Premium 6/7 Seater SUV</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-xs text-slate-500 italic">Final fare may vary based on pickup time, route, vehicle availability and applicable charges.</p>
          </div>
        </div>
      )}
      
      <div className="overflow-x-auto p-6 pb-0">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <th className="p-4 border-b border-slate-100">Vehicle Category</th>
              <th className="p-4 border-b border-slate-100">Available Models</th>
              <th className="p-4 border-b border-slate-100">Plain Roads</th>
              <th className="p-4 border-b border-slate-100">Hilly Areas</th>
            </tr>
          </thead>
          <tbody>
            {fleetData.filter(car => car.pricingType === 'car').map((car, index) => (
              <tr key={index} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="p-4 font-bold text-slate-800">{car.categoryName}</td>
                <td className="p-4 text-sm text-slate-600">{car.vehiclesList}</td>
                <td className="p-4 text-sm font-semibold text-slate-700">₹{car.pricing.plain}/km</td>
                <td className="p-4 text-sm font-semibold text-slate-700">₹{car.pricing.hill}/km</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Tempo Travellers */}
      <div className="p-6 bg-slate-50/50 border-t border-slate-100">
        <h4 className="font-bold text-slate-800 mb-4 text-sm">Tempo Travellers & Urbanias</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {fleetData.filter(car => car.pricingType === 'multi').map((car) => (
            car.pricingVariants.map((v, i) => (
              <div key={`${car.id}-${i}`} className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm flex flex-col">
                <span className="text-xs font-bold text-blue-600 uppercase mb-1">{car.categoryName}</span>
                <span className="font-bold text-slate-800 text-sm mb-2">{v.seats} Seater</span>
                <div className="flex justify-between items-center text-xs text-slate-600 mt-auto">
                  <span>Plain: ₹{v.plain}/km</span>
                  <span>Hill: ₹{v.hill}/km</span>
                </div>
              </div>
            ))
          ))}
        </div>
      </div>

      {/* Important Fare Rules Box */}
      <div className="p-6 border-t border-slate-100">
        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex flex-col md:flex-row gap-6">
          <div className="shrink-0">
            <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
              <Info size={24} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold text-blue-900 mb-3">Important Fare Rules</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0" /> Minimum billing 250 km/day for round trips</li>
              <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500 shrink-0" /> Driver night allowance extra (10 PM - 6 AM)</li>
              <li className="flex items-start gap-2 md:col-span-2 mt-2"><Info size={16} className="text-orange-500 shrink-0 mt-0.5" /> <span className="text-slate-600 font-medium">Toll, state tax, parking, airport entry and permit charges may apply as per actual.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
