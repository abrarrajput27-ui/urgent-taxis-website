import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { getCurrentLocationConfig } from '../lib/location';
import { ShieldCheck, Clock, MapPin, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';

export default function AboutUsPage() {
  const currentLocation = getCurrentLocationConfig();
  const city = currentLocation.city;
  const address = currentLocation.address;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <SEOHead 
        title={`About Urgent Taxis ${city} - Premium Outstation & Local Cabs`}
        description={`Learn more about Urgent Taxis ${city}. We provide reliable outstation cabs, airport transfers, and local rentals.`}
        canonicalUrl="https://urgenttaxis.com/about"
      />
      <Header />
      
      <main className="pt-[60px] lg:pt-[70px]">
        <div className="bg-[#0B132B] text-white py-16 px-4 relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[300px]">
          <div className="max-w-[800px] mx-auto relative z-10 w-full">
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">About Urgent Taxis</h1>
            <p className="text-gray-300 text-lg font-medium max-w-2xl mx-auto">
              Your trusted local and outstation taxi service partner. We guarantee punctual, safe, and comfortable journeys.
            </p>
            <div className="w-16 h-1 bg-[#1877F2] rounded-full mt-6 mx-auto"></div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 py-16">
          <div className="prose prose-blue max-w-none text-gray-700 leading-relaxed text-lg space-y-6">
            <p>
              Welcome to <strong>Urgent Taxis</strong>, the leading provider of premium cab services, airport transfers, and outstation trips in the region. We are committed to serving you with safe, comfortable, and reliable transportation options.
            </p>
            <p>
              Whether you need a quick one-way drop to Delhi, a spiritual journey to Haridwar, a round-trip family vacation to the hills of Nainital or Mussoorie, or a local rental, we ensure you get the best vehicle at the most competitive pricing.
            </p>
            <p>
              Our local dispatch team operates 24/7 to monitor and coordinate your rides. With a verified fleet of Sedans, Ertigas, Innova Crystas, and Tempo Travellers, we guarantee a punctual, stress-free travel experience.
            </p>
          </div>

          <div className="mt-16">
            <h2 className="text-3xl font-black text-gray-900 text-center mb-10">Why Travel With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <div className="flex items-start bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-950 text-lg mb-1.5">100% Verified Fleet</h3>
                  <p className="text-gray-600 text-sm">Every car is thoroughly inspected and drivers undergo strict background checks before every trip.</p>
                </div>
              </div>

              <div className="flex items-start bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-950 text-lg mb-1.5">Zero Wait Time</h3>
                  <p className="text-gray-600 text-sm">Our drivers arrive 15 minutes before your scheduled pickup time. No delays, no excuses.</p>
                </div>
              </div>

              <div className="flex items-start bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-950 text-lg mb-1.5">Transparent Pricing</h3>
                  <p className="text-gray-600 text-sm">What you see is what you pay. Tolls and state taxes are clearly explained upfront.</p>
                </div>
              </div>

              <div className="flex items-start bg-slate-50 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full mr-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-950 text-lg mb-1.5">Local Experts</h3>
                  <p className="text-gray-600 text-sm">Drivers are local residents who are intimately familiar with highway conditions and local sightseeing spots.</p>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-16 bg-gradient-to-br from-blue-900 to-indigo-950 text-white rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl">
              <h3 className="text-2xl md:text-3xl font-black mb-3">Ready to Book?</h3>
              <p className="text-blue-100 mb-6 text-sm md:text-base">
                Get in touch with our booking center today for custom travel packages or instant taxi dispatch.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <a href={`tel:${currentLocation.phone}`} className="bg-white text-blue-900 hover:bg-gray-100 transition-colors font-black px-6 py-3.5 rounded-xl flex items-center justify-center text-sm md:text-base shadow-lg">
                  <svg className="w-5 h-5 mr-2 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Call {currentLocation.phone.replace('+91', '+91 ')}
                </a>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
