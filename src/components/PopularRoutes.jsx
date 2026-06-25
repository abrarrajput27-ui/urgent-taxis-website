import { routes } from '../data/routes';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { getRouteFares, guessRouteDistance, formatFare } from '../utils/fareEngine';

export default function PopularRoutes({ hideViewAll = false }) {
  const getRouteWhatsAppLink = (route) => {
    const distance = route.distance || `${guessRouteDistance(route)} km`;
    const fares = getRouteFares(route);
    const price = route.price || (fares.isValid ? fares.fares.sedan : 'On Request');
    
    const msg = `Hi, I would like to book a taxi. Here are the details I am interested in:

*Route:* ${route.route} (${route.type || 'One Way'})
*Vehicle:* ${route.vehicle || 'Sedan'}
*Starting Fare:* ${price !== 'On Request' ? '₹' : ''}${price}
*Approx Distance:* ${distance}

Please share the availability and exact quote.`;

    return `https://wa.me/918595066033?text=${encodeURIComponent(msg)}`;
  };

  const displayRoutes = hideViewAll ? routes : routes.slice(0, 12);

  return (
    <section id="routes" className="pt-2 pb-8 bg-white">
      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-2 gap-4">
          <div>
            <span className="text-[12px] font-black tracking-widest text-[#00914d] uppercase mb-2 block">POPULAR ROUTES</span>
            <h2 className="text-3xl md:text-[40px] font-black text-[#3b2b98]">Most Booked Routes</h2>
          </div>
          {!hideViewAll && (
            <Link to="/routes" className="flex items-center gap-2 text-[13px] font-bold text-[#3b2b98] border border-blue-200 rounded-full px-6 py-2.5 hover:bg-blue-50 transition w-fit shadow-sm">
              View All Routes <ArrowRight size={16} />
            </Link>
          )}
        </div>
        
        <p className="text-[12px] text-slate-500 font-medium mb-6">Approx. distance shown from Delhi. Actual km may vary based on pickup location, drop location and selected route.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayRoutes.map((route) => {
            const distance = route.distance || `${guessRouteDistance(route)} km`;
            const fares = getRouteFares(route);
            const price = route.price || (fares.isValid ? formatFare(fares.fares.sedan).replace('₹', '') : 'On Request');
            
            return (
            <div key={route.id} className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] overflow-hidden group hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-300 flex flex-col h-full">
              <div className="h-48 overflow-hidden relative bg-slate-50 flex items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-all duration-300 z-20 pointer-events-none"></div>
                <img 
                  src={route.image} 
                  alt={route.route} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover relative z-10 group-hover:scale-110 transition duration-700" 
                />
              </div>
              <div className="p-5 relative z-20 bg-white flex-1 flex flex-col">
                <h3 className="font-black text-[18px] text-[#3b2b98] mb-1 leading-tight">{route.route.replace(' to ', ' → ')}</h3>
                <p className="text-[13px] font-bold text-slate-500 mb-4">📍 Approx. {distance.replace('~', '')}</p>
                
                <div className="mt-auto border-t border-slate-100 pt-4 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{route.vehicle || 'Sedan'} from</span>
                    <div className="flex items-baseline gap-1.5">
                      {route.originalPrice && <span className="text-[13px] font-bold text-slate-400 line-through">₹{route.originalPrice}</span>}
                      <span className="text-[18px] font-black text-slate-800 leading-none">{price === 'On Request' ? price : `₹${price}`}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {route.slug ? (
                      <Link 
                        to={`/${route.slug}`}
                        className="bg-white border-2 border-[#3b2b98] text-[#3b2b98] hover:bg-[#3b2b98] hover:text-white text-[12px] font-bold px-3 py-2 rounded-lg transition-all shadow-sm"
                      >
                        View Fare
                      </Link>
                    ) : (
                      <button className="bg-white border-2 border-[#3b2b98] text-[#3b2b98] hover:bg-[#3b2b98] hover:text-white text-[12px] font-bold px-3 py-2 rounded-lg transition-all shadow-sm">
                        View Fare
                      </button>
                    )}
                    <a 
                      href={getRouteWhatsAppLink(route)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white border-2 border-[#00914d] text-[#00914d] hover:bg-[#00914d] hover:text-white text-[12px] font-bold px-3 py-2 rounded-lg transition-all shadow-sm flex items-center justify-center"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
