import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RelatedRoutes({ route }) {
  if (!route.relatedRoutes || route.relatedRoutes.length === 0) return null;

  return (
    <section className="py-12 bg-slate-50 border-t border-slate-100">
      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
        <h3 className="text-2xl font-black text-[#3b2b98] mb-8">Related Routes</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {route.relatedRoutes.map((r, index) => (
            <Link 
              key={index}
              to={`/${r.slug}`} 
              className="group bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all flex items-center justify-between"
            >
              <div>
                <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{r.name}</h4>
                <p className="text-xs text-slate-500 mt-1">{r.distance}</p>
              </div>
              <ChevronRight size={18} className="text-slate-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
