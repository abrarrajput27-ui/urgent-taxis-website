import React from 'react';
import { Smartphone, CheckCircle, MessageSquare } from 'lucide-react';

export default function RouteBookingProcess({ route }) {
  if (!route.bookingProcess) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-xl md:text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <Smartphone className="text-blue-500" /> How to Book {route.fromCity || route.from} to {route.toCity || route.to} Taxi
        </h2>
      </div>
      <div className="p-6">
        <div className="prose prose-sm text-slate-600 leading-relaxed max-w-none mb-6" dangerouslySetInnerHTML={{ __html: route.bookingProcess }} />
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <MessageSquare size={20} />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Step 1: Contact Us</h4>
            <p className="text-xs text-slate-500">Call or WhatsApp your travel details</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <span className="font-bold">₹</span>
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Step 2: Get Quote</h4>
            <p className="text-xs text-slate-500">Receive instant confirmed pricing</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex flex-col items-center text-center">
            <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
              <CheckCircle size={20} />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">Step 3: Confirmed</h4>
            <p className="text-xs text-slate-500">Cab gets assigned for your trip</p>
          </div>
        </div>
      </div>
    </div>
  );
}
