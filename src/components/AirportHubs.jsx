import { Link } from 'react-router-dom';
import { ArrowRight, PlaneTakeoff, Plane } from 'lucide-react';

export default function AirportHubs() {
  return (
    <section className="py-12 bg-slate-50 border-t border-slate-100">
      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
        <div className="mb-8">
          <span className="text-[12px] font-black tracking-widest text-[#00914d] uppercase mb-2 block">AIRPORT SEO HUBS</span>
          <h2 className="text-3xl md:text-[40px] font-black text-[#3b2b98]">Popular Airport Transfers</h2>
          <p className="text-slate-600 font-medium mt-2 max-w-2xl">Seamless airport pickups and drops from Delhi NCR's leading aviation hubs to any outstation destination.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Jewar Airport */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            <div className="h-48 overflow-hidden relative">
              <img src="/images/routes/jewar-airport.webp" alt="Noida International Airport Jewar" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0">
                  <PlaneTakeoff className="text-white" size={20} />
                </div>
                <h3 className="text-white text-xl font-bold">Noida International Airport</h3>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">Book reliable airport transfer and outstation taxi services directly from Jewar Airport to major cities across North India.</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Link to="/noida-international-airport-to-delhi-taxi" className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition">To Delhi</Link>
                <Link to="/noida-international-airport-to-agra-taxi" className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition">To Agra</Link>
                <Link to="/noida-international-airport-to-haldwani-taxi" className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition">To Haldwani</Link>
                <Link to="/noida-international-airport-to-jaipur-taxi" className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition">To Jaipur</Link>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100">
                <Link to="/city/noida-international-airport" className="flex items-center justify-between text-[#3b2b98] font-bold hover:text-blue-700 transition group-hover:gap-2">
                  <span>Explore Jewar Routes</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

          {/* Delhi Airport */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
            <div className="h-48 overflow-hidden relative">
              <img src="/images/routes/default-airport-transfer.webp" alt="Delhi Airport IGI" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0">
                  <Plane className="text-white" size={20} />
                </div>
                <h3 className="text-white text-xl font-bold">Delhi Airport (IGI)</h3>
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <p className="text-slate-600 text-sm mb-4 line-clamp-2">Premium outstation cabs, round trips, and one-way drops directly from Indira Gandhi International Airport to any city.</p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                <Link to="/delhi-airport-to-chandigarh-taxi" className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition">To Chandigarh</Link>
                <Link to="/delhi-airport-to-dehradun-taxi" className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition">To Dehradun</Link>
                <Link to="/delhi-airport-to-nainital-taxi" className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition">To Nainital</Link>
                <Link to="/delhi-airport-to-rishikesh-taxi" className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition">To Rishikesh</Link>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-100">
                <Link to="/city/delhi-airport" className="flex items-center justify-between text-[#3b2b98] font-bold hover:text-blue-700 transition group-hover:gap-2">
                  <span>Explore Delhi IGI Routes</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
