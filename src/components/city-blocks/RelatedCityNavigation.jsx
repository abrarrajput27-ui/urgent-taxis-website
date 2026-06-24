import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Car } from 'lucide-react';
import { routes } from '../../data/routes';
import { cities } from '../../data/cities';
import { servicesData } from '../../data/mockData';
import { getRelatedCities, getPopularRoutesFromCity } from '../../utils/internalLinking';

export default function RelatedCityNavigation({ city }) {
  const cityName = city.cityName || city.h1?.replace('Taxi Service in ', '') || city.citySlug;
  const popularRoutes = getPopularRoutesFromCity(cityName, routes, 8);
  const relatedCities = getRelatedCities(city, cities, 6);
  const services = servicesData.slice(0, 4);

  return (
    <div className="py-12 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {/* Popular Routes */}
        {popularRoutes.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-black text-[#3b2b98] mb-6 flex items-center gap-2">
              <MapPin className="text-[#00914d]" /> Popular Routes from {cityName}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {popularRoutes.map((r, index) => (
                <Link 
                  key={index}
                  to={`/${r.slug}`} 
                  className="group bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-[#00914d] hover:shadow-md transition-all flex items-center justify-between"
                >
                  <span className="font-bold text-slate-700 group-hover:text-[#00914d] transition-colors text-sm">
                    {r.route || r.seoTitle}
                  </span>
                  <ArrowRight size={16} className="text-slate-400 group-hover:text-[#00914d] shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Cities */}
        {relatedCities.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-black text-[#3b2b98] mb-6 flex items-center gap-2">
              <MapPin className="text-[#00914d]" /> Nearby City Services
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {relatedCities.map((c, index) => (
                <Link 
                  key={index}
                  to={`/city/${c.slug || c.citySlug}`} 
                  className="group bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-400 hover:shadow-md transition-all text-center flex flex-col items-center justify-center gap-2"
                >
                  <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors text-sm">
                    {c.cityName}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        <div>
          <h2 className="text-2xl font-black text-[#3b2b98] mb-6 flex items-center gap-2">
            <Car className="text-[#00914d]" /> Available Services in {cityName}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((s, index) => (
              <Link 
                key={index}
                to={`/service/${s.slug}`} 
                className="group bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-400 hover:shadow-md transition-all flex items-center justify-between"
              >
                <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors text-sm">
                  {s.title}
                </span>
                <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600 shrink-0" />
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
