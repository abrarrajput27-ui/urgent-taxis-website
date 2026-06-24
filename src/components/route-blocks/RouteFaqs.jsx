import React, { useState } from 'react';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function RouteFaqs({ route }) {
  const [openFaq, setOpenFaq] = useState(null);

  if (!route.content?.faqs) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-6 border-b border-slate-100 bg-slate-50">
        <h2 className="text-2xl font-black text-[#3b2b98] flex items-center gap-2">
          <HelpCircle className="text-blue-500" /> Frequently Asked Questions
        </h2>
      </div>
      
      <div className="p-6">
        <div className="space-y-4">
          {route.content.faqs.map((faq, index) => (
            <div 
              key={index}
              className={`border border-slate-200 rounded-xl overflow-hidden transition-all duration-300 ${openFaq === index ? 'shadow-md bg-white' : 'bg-slate-50 hover:bg-white'}`}
            >
              <button 
                className="w-full text-left px-6 py-4 flex items-center justify-between font-bold text-slate-800"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {faq.question || faq.q}
                <ChevronDown 
                  size={18} 
                  className={`text-slate-400 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} 
                />
              </button>
              <div 
                className={`px-6 text-sm text-slate-600 leading-relaxed transition-all duration-300 overflow-hidden ${
                  openFaq === index ? 'max-h-[1000px] pb-4 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {(faq.answer || faq.a || '').replace(/₹\d+/, '₹' + route.price)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
