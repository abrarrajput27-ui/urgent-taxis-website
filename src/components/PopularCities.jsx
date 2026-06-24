import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';

export default function PopularCities() {
  const cities = [
    { name: 'Delhi Taxi Service', url: '/taxi-service-in/delhi' },
    { name: 'Noida Taxi Service', url: '/taxi-service-in/noida' },
    { name: 'Ghaziabad Taxi Service', url: '/taxi-service-in/ghaziabad' },
    { name: 'Gurugram Taxi Service', url: '/taxi-service-in/gurugram' },
    { name: 'Haldwani Taxi Service', url: '/taxi-service-in/haldwani' },
    { name: 'Nainital Taxi Service', url: '/taxi-service-in/nainital' },
    { name: 'Haridwar Taxi Service', url: '/taxi-service-in/haridwar' },
    { name: 'Rishikesh Taxi Service', url: '/taxi-service-in/rishikesh' }
  ];

  return (
    <section className="py-8 bg-slate-50">
      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
        <div className="mb-6">
          <span className="text-[12px] font-black tracking-widest text-[#00914d] uppercase mb-2 block">CITY TAXIS</span>
          <h2 className="text-3xl md:text-[40px] font-black text-[#3b2b98] leading-tight mb-2">Popular City Taxi Services</h2>
          <p className="text-[14px] text-slate-500 font-medium">Book reliable local, airport and outstation taxi services from major cities.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cities.map((city, index) => (
            <Link 
              key={index}
              to={city.url} 
              className="bg-white p-5 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-[#3b2b98] transition-colors duration-300">
                  <MapPin size={18} className="text-[#3b2b98] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-[15px] text-[#3b2b98] group-hover:text-[#00914d] transition-colors">{city.name}</h3>
              </div>
              <ArrowRight size={18} className="text-slate-300 group-hover:text-[#00914d] group-hover:translate-x-1 transition-all duration-300" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
