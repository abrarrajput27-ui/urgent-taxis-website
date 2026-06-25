import React, { useEffect, useState } from 'react';
import { Users, Briefcase, Snowflake, Music, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import SEOQuickLinks from '../components/SEOQuickLinks';
import { fleetData } from '../data/mockData';

export default function FleetMasterPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getWhatsAppLink = (car) => {
    const isTT = car.categoryName.toLowerCase().includes('traveller') || car.categoryName.toLowerCase().includes('urbania');
    
    const msg = `Hi, I would like to book a taxi. Here are the details I am interested in:

*Vehicle Category:* ${car.categoryName}
*Available Models:* ${car.vehiclesList}
*Capacity:* ${car.pax} & ${car.luggage}

*Features:*
• AC
• Music System
• Same Category Guaranteed
• Clean & Sanitized Vehicle

*Fare Details:*
${car.pricingType === 'multi' 
  ? car.pricingVariants.map(v => `- ${v.seats}: ₹${v.plain}/km (Plain) | ₹${v.hill}/km (Hill)`).join('\n')
  : `- Plain Roads: ₹${car.pricing.plain}/km\n- Hilly Areas: ₹${car.pricing.hill}/km`
}

*Rules & Terms:*
- Minimum billing of 300 km per day.
- Tolls, Parking, and State Taxes are extra.${isTT ? '\n- *Please note:* Tempo Travellers and Urbanias are available for Round Trip bookings only.' : ''}

Please share the availability and exact quote.`;

    return `https://wa.me/918595066033?text=${encodeURIComponent(msg)}`;
  };

  const getSlug = (category) => {
    if (category === 'MUV / MPV') return 'muv';
    if (category === 'Premium SUV') return 'premium';
    if (category.includes('Traveller')) return 'traveller';
    if (category.includes('Urbania')) return 'urbania';
    if (category.includes('Bus')) return 'bus';
    return category.toLowerCase();
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <SEOHead 
        title="Our Premium Taxi Fleet | Urgent Taxis"
        description="Explore our range of well-maintained and clean vehicles. From economical hatchbacks to luxury SUVs, we have the perfect ride for your journey."
      />
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-slate-900"></div>
        </div>
        
        <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-block bg-blue-600/20 border border-blue-500/30 backdrop-blur-sm text-blue-200 text-[10px] font-black tracking-[0.2em] px-4 py-2 rounded-full mb-6 uppercase">
            Comfort & Premium Travel
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Our Taxi Fleet
          </h1>
          <p className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto font-medium">
            Explore our range of well-maintained and clean vehicles. From economical hatchbacks to luxury SUVs, we have the perfect ride for your journey.
          </p>
          <div className="w-16 h-1 bg-blue-500 mt-8 rounded-full"></div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-16">
        <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto max-w-7xl">
          {['Cars & SUVs', 'Tempo Travellers', 'Urbania', 'Luxury Buses'].map(groupName => {
            const groupCars = fleetData.filter(car => {
              const name = car.categoryName || '';
              if (groupName === 'Cars & SUVs') return ['Hatchback', 'Sedan', 'MUV', 'SUV'].some(k => name.includes(k));
              if (groupName === 'Tempo Travellers') return name.includes('Traveller');
              if (groupName === 'Urbania') return name.includes('Urbania');
              if (groupName === 'Luxury Buses') return name.includes('Bus');
              return false;
            });
            
            if (groupCars.length === 0) return null;

            return (
              <div key={groupName} className="mb-16 last:mb-0">
                <h2 className="text-3xl font-black text-[#3b2b98] mb-8 relative inline-block">
                  {groupName}
                  <div className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-600 rounded-full"></div>
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
                  {groupCars.map((car) => (
                    <div 
                      key={car.id} 
                      className="bg-white rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.06)] flex flex-col hover:shadow-xl hover:shadow-blue-900/10 hover:border-blue-200 hover:-translate-y-2 transition-all duration-300 group overflow-hidden h-full"
                    >
                      {/* Image Section */}
                      <div className="w-full h-56 relative overflow-hidden shrink-0 bg-slate-50 flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-all duration-300 z-20 pointer-events-none"></div>
                        <div className="w-full h-full relative z-10 flex items-center justify-center p-6">
                            <img 
                              src={car.image} 
                              alt={car.categoryName} 
                              className={`w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-x-[-1] ${car.blend ? 'mix-blend-multiply' : ''}`}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                        </div>
                        {/* Fallback */}
                        <div className="hidden absolute inset-0 w-full px-4 text-slate-300 items-center justify-center h-full z-0">
                          <span className="text-[10px] uppercase font-bold tracking-widest">Image Unavailable</span>
                        </div>
                      </div>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-black text-[22px] text-[#3b2b98] mb-1 leading-tight">{car.categoryName}</h3>
                        <p className="text-[13px] font-bold text-slate-500 mb-3">{car.vehiclesList}</p>
                        
                        {/* Icons Grid */}
                        <div className="grid grid-cols-2 gap-y-3 gap-x-2 text-[12px] font-bold text-slate-600 mb-4">
                          <div className="flex items-center gap-2"><Users size={16} className="text-[#00914d] shrink-0" /> <span className="truncate">{car.pax}</span></div>
                          <div className="flex items-center gap-2"><Briefcase size={16} className="text-[#00914d] shrink-0" /> <span className="truncate">{car.luggage}</span></div>
                          <div className="flex items-center gap-2"><Snowflake size={16} className="text-[#00914d] shrink-0" /> <span className="truncate">AC</span></div>
                          <div className="flex items-center gap-2"><Music size={16} className="text-[#00914d] shrink-0" /> <span className="truncate">Music System</span></div>
                          <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-[#00914d] shrink-0" /> <span className="truncate">Same Category</span></div>
                          <div className="flex items-center gap-2"><Sparkles size={16} className="text-[#00914d] shrink-0" /> <span className="truncate">Clean Vehicle</span></div>
                        </div>

                        {/* Pricing Area */}
                          {car.pricingType === 'car' ? (
                            <div className="w-full flex gap-2 mb-4 mt-auto">
                              <div className="flex-1 bg-blue-50 border border-blue-100 rounded-xl p-2 flex flex-col justify-center items-center text-center">
                                <span className="text-blue-600/70 text-[10px] uppercase tracking-wider font-bold">Plain Area</span>
                                <span className="text-blue-700 text-[15px] font-black">₹{car.pricing?.plain}/km</span>
                              </div>
                              <div className="flex-1 bg-green-50 border border-green-100 rounded-xl p-2 flex flex-col justify-center items-center text-center">
                                <span className="text-green-600/70 text-[10px] uppercase tracking-wider font-bold">Hilly Area</span>
                                <span className="text-green-700 text-[15px] font-black">₹{car.pricing?.hill}/km</span>
                              </div>
                            </div>
                          ) : (
                          <div className="w-full bg-slate-50 border border-slate-100 rounded-xl p-3 mb-4 flex flex-col gap-1.5 mt-auto">
                            <span className="text-slate-400 text-[10px] uppercase tracking-wider font-black text-center border-b border-slate-200 pb-1 mb-1">Round Trip Fares</span>
                            {car.pricingVariants?.map((v, i) => (
                              <div key={i} className="flex justify-between items-center text-[12px] font-bold">
                                <span className="text-slate-600 w-24">{v.seats}</span>
                                <span className="text-blue-600 font-black">₹{v.plain}/km <span className="text-[10px] text-slate-400 font-medium">Plain</span></span>
                                <span className="text-green-600 font-black">₹{v.hill}/km <span className="text-[10px] text-slate-400 font-medium">Hill</span></span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Button Area */}
                        <div className="pt-4 border-t border-slate-100 w-full flex flex-col xl:flex-row gap-3">
                          <Link 
                            to={`/fleet/${getSlug(car.categoryName)}`}
                            className="w-full xl:w-1/2 flex items-center justify-center bg-white border-2 border-[#3b2b98] text-[#3b2b98] hover:bg-[#3b2b98] hover:text-white transition-colors h-10 rounded-xl text-[13px] font-black tracking-wide"
                          >
                            VIEW FARE
                          </Link>
                          <a 
                            href={getWhatsAppLink(car)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full xl:w-1/2 flex items-center justify-center bg-white border-2 border-[#00914d] text-[#00914d] hover:bg-[#00914d] hover:text-white transition-colors h-10 rounded-xl text-[13px] font-black tracking-wide shadow-sm"
                          >
                            BOOK NOW
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
          </div>
        
        {/* Disclaimer Area */}
        <div className="mt-12 bg-white rounded-2xl py-6 px-8 border border-slate-100 shadow-sm max-w-4xl mx-auto text-center">
          <h4 className="text-[14px] font-black text-[#3b2b98] uppercase tracking-widest mb-4 border-b border-slate-100 pb-3">Important Fare Rules</h4>
          <ul className="text-[13px] font-medium text-slate-500 space-y-3 list-disc list-inside">
            <li><strong className="text-slate-700">Minimum 300 km/day</strong> is applicable for all outstation trips.</li>
            <li><strong>One Way</strong> fare includes toll and state tax.</li>
            <li><strong>Round Trip, Local Rental & Airport Transfer:</strong> Toll and state tax are extra.</li>
            <li>Parking, entry charges, permit, driver night allowance, and other charges are not included unless mentioned.</li>
            <li><strong>Tempo Traveller & Urbania:</strong> Available for Round Trip only (One-way fare is not applicable).</li>
          </ul>
        </div>
      </section>

      <SEOQuickLinks />
      <Footer />
    </div>
  );
}
