import React from 'react';
import { ShieldCheck, CheckCircle2, PhoneCall } from 'lucide-react';

export default function TrustSection({ getWhatsAppLink }) {
  return (
    <div className="bg-gradient-to-br from-[#3b2b98] to-blue-900 rounded-2xl shadow-xl p-6 text-white">
      <h3 className="text-xl font-black mb-6 flex items-center gap-2">
        <ShieldCheck size={20} className="text-blue-300" />
        Booking & Support
      </h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">Booking Process</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-blue-50"><CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0" /> Fast WhatsApp Booking</li>
            <li className="flex items-start gap-2 text-sm text-blue-50"><CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0" /> Transparent Pricing Quote</li>
            <li className="flex items-start gap-2 text-sm text-blue-50"><CheckCircle2 size={16} className="text-green-400 mt-0.5 shrink-0" /> Driver Details 30 mins prior</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2">Support & Policies</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-2 text-sm text-blue-50"><CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" /> 24x7 Emergency Support Line</li>
            <li className="flex items-start gap-2 text-sm text-blue-50"><CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" /> Immediate Vehicle Replacement</li>
            <li className="flex items-start gap-2 text-sm text-blue-50"><CheckCircle2 size={16} className="text-amber-400 mt-0.5 shrink-0" /> Flexible Trip Modification Policy</li>
          </ul>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white/20">
        <a 
          href="tel:+917310651940"
          className="w-full bg-white text-[#3b2b98] hover:bg-slate-100 transition-colors py-3 rounded-xl font-black text-sm tracking-wide flex items-center justify-center gap-2 shadow-md mb-3"
        >
          <PhoneCall size={16} /> CALL 7310651940
        </a>
        {getWhatsAppLink && (
          <a 
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#00914d] text-white hover:bg-[#00914d] transition-colors py-3 rounded-xl font-black text-sm tracking-wide flex items-center justify-center shadow-md"
          >
            WHATSAPP US
          </a>
        )}
      </div>
    </div>
  );
}
