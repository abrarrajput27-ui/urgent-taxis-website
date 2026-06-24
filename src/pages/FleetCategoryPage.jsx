import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fleetPagesData, fleetData } from '../data/mockData';
import { ChevronLeft, CheckCircle2, AlertTriangle, Car, Users, Luggage, MapPin, Check, X, PhoneCall } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RouteFaqs from '../components/route-blocks/RouteFaqs';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import { createBreadcrumbSchema } from '../utils/seoHelpers';

export default function FleetCategoryPage() {
  const { category } = useParams();
  const [fleetPage, setFleetPage] = useState(null);
  const [fleetModel, setFleetModel] = useState(null);

  useEffect(() => {
    const pageData = fleetPagesData.find(f => f.slug === category);
    const modelData = fleetData.find(f => f.categoryName.toLowerCase().includes(category) || (category === 'premium' && f.categoryName.includes('Premium')));
    
    if (pageData) {
      setFleetPage(pageData);
      setFleetModel(modelData);
      window.scrollTo(0, 0);
    }
  }, [category]);

  if (!fleetPage) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Fleet Category Not Found</h1>
        <Link to="/" className="text-blue-600 hover:underline">Return to Home</Link>
      </div>
    );
  }

  const getWhatsAppLink = () => {
    const msg = `Hi, I want to inquire about booking a ${fleetPage.categoryName}.`;
    return `https://wa.me/918595066033?text=${encodeURIComponent(msg)}`;
  };

  const breadcrumbItems = [
    { name: 'Fleet', url: '/#fleet' },
    { name: `${fleetPage.categoryName} Taxi`, url: `/fleet/${category}` }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      <SEOHead 
        title={`${fleetPage.categoryName} Taxi Booking | Urgent Taxis`}
        description={`Book ${fleetPage.categoryName} taxis for outstation trips and local rentals. Affordable fares, experienced drivers, and well-maintained cabs.`}
        canonicalUrl={`https://urgenttaxis.com/fleet/${category}`}
        schemas={[createBreadcrumbSchema(breadcrumbItems)]}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-10 pb-16 lg:pt-16 lg:pb-24 bg-[#3b2b98] overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center"></div>
        </div>
        
        <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto relative z-10 text-white">
          <Link to="/#fleet" className="inline-flex items-center gap-1 text-blue-200 hover:text-white transition-colors mb-6 text-sm font-medium">
            <ChevronLeft size={16} /> Back to Fleet
          </Link>
          
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                {fleetPage.categoryName}
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 leading-relaxed">
                The perfect vehicle for {fleetPage.suitableRoutes.join(', ').toLowerCase()}.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#00914d] text-white hover:bg-[#00914d] transition-colors py-3.5 px-8 rounded-xl font-black tracking-wide flex items-center justify-center text-center shadow-lg"
                >
                  BOOK ON WHATSAPP
                </a>
                <a 
                  href="tel:+917310651940"
                  className="bg-white text-[#3b2b98] hover:bg-slate-50 transition-colors py-3.5 px-8 rounded-xl font-black tracking-wide flex items-center justify-center gap-2 text-center shadow-lg"
                >
                  <PhoneCall size={18} /> CALL US
                </a>
              </div>
            </div>
            {fleetModel && (
              <div className="flex-1 flex justify-center w-full">
                <img src={fleetModel.image} alt={fleetPage.categoryName} className="w-full max-w-md drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]" />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-20">
        <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
          
          {/* Global Disclaimer */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8">
            <div className="flex gap-3">
              <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={20} />
              <div className="text-sm text-amber-800">
                <p className="font-bold mb-1">Important Note:</p>
                <p>Same vehicle category is guaranteed, exact model ({fleetPage.typicalModels.join(', ')}) is subject to availability. Fuel type depends on availability.</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Capacity & Fuel */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><Users className="text-blue-500" size={18}/> Capacity</h3>
                  <p className="text-sm text-slate-600 mb-2"><strong>Passengers:</strong> {fleetPage.groupSize}</p>
                  <p className="text-sm text-slate-600"><strong>Luggage:</strong> {fleetPage.luggage}</p>
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 flex items-center gap-2 mb-3"><Car className="text-blue-500" size={18}/> Details</h3>
                  <p className="text-sm text-slate-600 mb-2"><strong>Typical Models:</strong> {fleetPage.typicalModels.join(', ')}</p>
                  <p className="text-sm text-slate-600"><strong>Fuel Note:</strong> {fleetPage.fuelNotes}</p>
                </div>
              </div>

              {/* Route Suitability */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-xl font-black text-[#3b2b98] mb-6 border-b border-slate-100 pb-4 flex items-center gap-2">
                  <MapPin className="text-blue-500" /> Terrain Suitability
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">Plain Areas & Highways</h4>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {fleetPage.plainSuitability}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">Hill Stations & Mountains</h4>
                    <p className="text-sm text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {fleetPage.hillSuitability}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-2">Best For</h4>
                    <div className="flex flex-wrap gap-2">
                      {fleetPage.suitableRoutes.map((route, i) => (
                        <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium border border-blue-100">
                          {route}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h4 className="font-bold text-green-700 mb-4 flex items-center gap-2"><Check size={20}/> Advantages</h4>
                  <ul className="space-y-3">
                    {fleetPage.pros.map((pro, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-green-500 shrink-0 mt-0.5" /> {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h4 className="font-bold text-red-600 mb-4 flex items-center gap-2"><X size={20}/> Limitations</h4>
                  <ul className="space-y-3">
                    {fleetPage.limitations.map((lim, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" /> {lim}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* FAQs */}
              <RouteFaqs route={{ content: { faqs: fleetPage.faqs } }} />

            </div>

            {/* Right Column */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <div className="bg-gradient-to-br from-[#3b2b98] to-blue-900 rounded-2xl shadow-xl p-6 text-white mb-6">
                  <h3 className="text-xl font-black mb-4">Book this Vehicle</h3>
                  <p className="text-sm text-blue-100 mb-6 leading-relaxed">
                    Need a quote for {fleetPage.categoryName}? Message us on WhatsApp with your pickup location and destination.
                  </p>
                  <a 
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-[#00914d] text-white hover:bg-[#00914d] transition-colors py-3 rounded-xl font-black text-sm tracking-wide flex items-center justify-center shadow-md mb-3"
                  >
                    WHATSAPP US
                  </a>
                  <a 
                    href="tel:+917310651940"
                    className="w-full bg-white text-[#3b2b98] hover:bg-slate-100 transition-colors py-3 rounded-xl font-black text-sm tracking-wide flex items-center justify-center shadow-md"
                  >
                    CALL NOW
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
