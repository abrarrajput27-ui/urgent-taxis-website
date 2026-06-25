import { fleetData } from '../data/mockData';
import { Users, Briefcase, Snowflake, Music, ShieldCheck, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Fleet() {
  const scrollContainerRef = useRef(null);

  const getWhatsAppLink = (car) => {
    const isTT = car.categoryName.toLowerCase().includes('traveller') || car.categoryName.toLowerCase().includes('urbania');
    
    const msg = `Hi, I would like to book a taxi. Here are the details I am interested in:

*Vehicle Category:* ${car.categoryName}
*Available Models:* ${car.vehiclesList}
*Capacity:* ${car.pax} & ${car.luggage}

*Features:*
✅ AC
✅ Music System
✅ Same Category Guaranteed
✅ Clean & Sanitized Vehicle

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

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Mobile auto slow-motion scroll
  useEffect(() => {
    let intervalId;
    intervalId = setInterval(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
      if (window.innerWidth >= 1024) return;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScrollLeft - 5) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 220, behavior: 'smooth' });
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section id="fleet" className="pt-4 pb-8 bg-slate-50 relative z-10">
      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
        <div className="text-center mb-6">
          <span className="text-[12px] font-black tracking-widest text-[#00914d] uppercase mb-2 block">OUR FLEET</span>
          <h2 className="text-3xl md:text-[40px] font-black text-[#3b2b98] mb-4">Wide Range of Clean & Comfortable Cars</h2>
          <p className="text-slate-500 text-[15px] font-medium max-w-2xl mx-auto">Premium vehicles tailored for your comfort</p>
        </div>

        {/* Carousel Area */}
        <div className="relative group/carousel mx-auto px-4 sm:px-14">
          {/* Left Arrow */}
          <button 
            onClick={() => scroll('left')}
          className="hidden lg:flex absolute left-0 top-[calc(50%-16px)] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 shadow-lg items-center justify-center text-[#3b2b98] hover:bg-[#3b2b98] hover:text-white transition-all opacity-90 hover:opacity-100"
            aria-label="Previous vehicles"
          >
            <ChevronLeft size={24} />
          </button>

          {/* Scroll Container */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-3 pt-6 pb-2 px-2 -mx-2 snap-x snap-mandatory hide-scrollbar items-stretch"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {fleetData.map((car) => (
              <div 
                key={car.id} 
                className="w-[82vw] sm:w-[320px] md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-center bg-white rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col hover:shadow-[0_12px_40px_rgba(0,0,0,0.16)] hover:-translate-y-2 transition-all duration-300 group overflow-hidden h-full"
              >
                {/* Image Section */}
                <div className="w-full h-56 relative overflow-hidden shrink-0 bg-slate-50 flex items-center justify-center">
                  <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-all duration-300 z-20 pointer-events-none"></div>
                  <div className="w-full h-full relative z-10 flex items-center justify-center p-3">
                      <img 
                        src={car.image} 
                        alt={car.name || car.categoryName} 
                        loading="lazy"
                        decoding="async"
                        className={`w-full h-full object-contain object-center transition-transform duration-500 ${car.blend ? 'mix-blend-multiply' : ''}`}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                  </div>
                  {/* Fallback */}
                  <div className="hidden absolute inset-0 w-full px-4 text-slate-300 bg-slate-50 items-center justify-center h-full z-0">
                    <span className="text-[10px] uppercase font-bold tracking-widest">Image Unavailable</span>
                  </div>
                </div>
                
                {/* Content Section */}
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
                          <span className="text-slate-600">{v.seats}</span>
                          <span className="text-[#00914d]">₹{v.plain} <span className="text-slate-400 text-[10px] font-normal tracking-tighter">P</span></span>
                          <span className="text-[#3b2b98]">₹{v.hill} <span className="text-slate-400 text-[10px] font-normal tracking-tighter">H</span></span>
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

          {/* Right Arrow */}
          <button 
            onClick={() => scroll('right')}
            className="hidden lg:flex absolute right-0 top-[calc(50%-16px)] -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border border-slate-200 shadow-lg items-center justify-center text-[#3b2b98] hover:bg-[#3b2b98] hover:text-white transition-all opacity-90 hover:opacity-100"
            aria-label="Next vehicles"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        </div>
      </section>
  );
}
