import React, { useEffect } from 'react';
import { MapPin, Clock, ArrowRight, MessageCircle, PhoneCall, ShieldCheck } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import Header from '../components/Header';
import Footer from '../components/Footer';
import PopularRoutes from '../components/PopularRoutes';
import { getCurrentLocationConfig } from '../lib/location';
import { getCityRouteConfig } from '../config/locationRoutes';

export default function RoutesPage() {
  const locationConfig = getCurrentLocationConfig();
  const routeConfig = getCityRouteConfig();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getWhatsAppLink = (destination, title) => {
    const msg = `Hi Urgent Taxis, I want to book a taxi for:
🛣️ Route: ${title}
📍 Pickup: ${locationConfig.city}
📍 Drop: ${destination}

Please share the pricing and availability.`;
    return `https://wa.me/917310651940?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-16 flex flex-col font-sans">
      <SEOHead 
        title={`Taxi Routes from ${routeConfig.city} | Urgent Taxis`}
        description={`Explore premium outstation cab routes from ${routeConfig.city} to top travel destinations. Punctual, safe, and comfortable journeys.`}
      />
      <Header />
      
      <main className="flex-grow pt-[60px] lg:pt-[70px]">
        <div className="bg-[#0B132B] text-white py-12 px-4 relative overflow-hidden text-center">
          <div className="max-w-[800px] mx-auto relative z-10">
            <span className="bg-blue-600/30 text-blue-400 text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-500/20 inline-block mb-4">
              One-Way & Round Trips
            </span>
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">Top Popular Routes</h1>
            <p className="text-gray-300 text-lg font-medium max-w-lg mx-auto">
              Explore premium outstation cab routes to top travel destinations. Punctual, safe, and comfortable journeys guaranteed.
            </p>
            <div className="w-16 h-1 bg-blue-500 rounded-full mt-6 mx-auto"></div>
          </div>
        </div>

        <div className="pt-8">
          <PopularRoutes hideViewAll={true} />
        </div>

        <div className="max-w-[1200px] mx-auto px-4 pt-12">
          {routeConfig.faqs && routeConfig.faqs.length > 0 && (
            <div className="max-w-[800px] mx-auto bg-white p-8 rounded-3xl border border-gray-100 shadow-xl mb-16">
              <h3 className="text-2xl font-black text-gray-900 mb-8 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 mr-2 text-blue-600" /> Frequently Asked Questions
              </h3>
              <div className="space-y-6">
                {routeConfig.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-5 last:border-0 last:pb-0">
                    <h4 className="font-bold text-gray-900 text-lg mb-2">{faq.q}</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
