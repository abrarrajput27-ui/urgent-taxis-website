import React from 'react';
import { ArrowRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function RelatedRouteLinks({ routeSlug }) {
  // Only show related routes for Delhi to Haridwar for now as per requirements
  if (routeSlug !== 'delhi-to-haridwar-taxi') return null;

  const routes = [
    { name: "Delhi → Rishikesh", path: "/delhi-to-rishikesh-taxi" },
    { name: "Delhi → Dehradun", path: "/delhi-to-dehradun-taxi" },
    { name: "Delhi → Mussoorie", path: "/delhi-to-mussoorie-taxi" },
    { name: "Delhi → Chilla", path: "/delhi-to-chilla-taxi" },
    { name: "Delhi → Rajaji National Park", path: "/delhi-to-rajaji-taxi" }
  ];

  return (
    <div className="py-12 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center">
          <MapPin className="h-6 w-6 text-primary-600 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900">Explore Related Routes</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {routes.map((route, idx) => (
            <Link 
              key={idx} 
              to={route.path}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors border border-gray-100"
            >
              <span className="font-medium text-gray-800">{route.name}</span>
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
