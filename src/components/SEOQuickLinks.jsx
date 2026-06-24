import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { routes } from '../data/routes';
import { cities } from '../data/cities';

export default function SEOQuickLinks() {
  const topRoutes = routes.slice(0, 8);
  const topCities = cities.slice(0, 6);

  return (
    <div className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-[1000px] mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Related Routes */}
          <div>
            <h3 className="text-xl font-bold text-[#3b2b98] mb-6 flex items-center gap-2">
              <MapPin className="text-[#00914d]" size={20} /> Popular Destinations
            </h3>
            <div className="flex flex-col gap-3">
              {topRoutes.map((r, index) => (
                <Link 
                  key={index}
                  to={`/${r.slug}`} 
                  className="group bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-[#00914d] hover:shadow-sm transition-all flex items-center justify-between"
                >
                  <span className="font-bold text-slate-700 group-hover:text-[#00914d] transition-colors text-sm">
                    {r.route || r.seoTitle}
                  </span>
                  <ArrowRight size={16} className="text-slate-400 group-hover:text-[#00914d] shrink-0" />
                </Link>
              ))}
            </div>
          </div>

          {/* Related Cities */}
          <div>
            <h3 className="text-xl font-bold text-[#3b2b98] mb-6 flex items-center gap-2">
              <MapPin className="text-blue-500" size={20} /> Top City Taxi Services
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {topCities.map((c, index) => (
                <Link 
                  key={index}
                  to={`/city/${c.slug || c.citySlug}`} 
                  className="group bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-400 hover:shadow-sm transition-all text-center flex flex-col items-center justify-center gap-2"
                >
                  <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors text-sm">
                    {c.cityName}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
