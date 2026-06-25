import { ArrowRight, ChevronLeft, ChevronRight, RefreshCw, Car, Plane, MapPin, Calendar, Heart } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/mockData';
import serviceOneWayImg from '../assets/images/service-oneway.jpg';
import serviceRoundTripImg from '../assets/images/roundtrip.jpg';
import serviceAirportImg from '../assets/images/Airport Transfers j.jpg';
import serviceLocalImg from '../assets/images/service-local.jpg';
import serviceTourImg from '../assets/images/tour packages.jpg';
import serviceRailwayImg from '../assets/images/railway transfers.jpg';
import serviceWeddingImg from '../assets/images/wedding.jpg';
import serviceCorporateImg from '../assets/images/corporate.jpg';

export default function Services({ gridMode = false }) {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Mobile auto slow-motion scroll effect
  useEffect(() => {
    if (gridMode || !scrollContainerRef.current) return;

    let intervalId;
    const startAutoPlay = () => {
      intervalId = setInterval(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        
        // Only run auto-scroll if it's mobile/tablet size and not being manually scrolled
        if (window.innerWidth >= 1024) return;

        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        if (container.scrollLeft >= maxScrollLeft - 5) {
          container.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          container.scrollBy({ left: 220, behavior: 'smooth' });
        }
      }, 5000); // Slow motion - every 5 seconds
    };

    startAutoPlay();
    return () => clearInterval(intervalId);
  }, [gridMode]);

  const getServiceSlug = (title) => {
    const slugMap = {
      'Outstation One Way Taxi': 'outstation-one-way',
      'Outstation Round Trip Taxi': 'outstation-round-trip',
      'Airport Transfer': 'airport-transfer',
      'Local Rental': 'local-rental',
      'Tour Packages': 'tour-packages',
      'Railway Transfer': 'railway-transfer',
      'Wedding Car Rental': 'wedding-car-rental',
      'Corporate Taxi': 'corporate-taxi'
    };
    return slugMap[title] || 'outstation-one-way';
  };

  const getServiceIcon = (title) => {
    const lower = title.toLowerCase();
    if (lower.includes('one way')) return <ArrowRight size={20} className="text-white" />;
    if (lower.includes('round trip')) return <RefreshCw size={20} className="text-white" />;
    if (lower.includes('airport')) return <Plane size={20} className="text-white" />;
    if (lower.includes('local rental')) return <Car size={20} className="text-white" />;
    if (lower.includes('tour')) return <MapPin size={20} className="text-white" />;
    if (lower.includes('railway')) return <Calendar size={20} className="text-white" />;
    if (lower.includes('wedding')) return <Heart size={20} className="text-white" />;
    return <Car size={20} className="text-white" />;
  };

  const getServiceImage = (title, originalImg) => {
    const lower = title.toLowerCase();
    if (lower.includes('one way')) return serviceOneWayImg;
    if (lower.includes('round trip')) return serviceRoundTripImg;
    if (lower.includes('airport')) return serviceAirportImg;
    if (lower.includes('local rental')) return serviceLocalImg;
    if (lower.includes('tour')) return serviceTourImg;
    if (lower.includes('railway')) return serviceRailwayImg;
    if (lower.includes('wedding')) return serviceWeddingImg;
    if (lower.includes('corporate')) return serviceCorporateImg;
    return originalImg;
  };

  const services = servicesData;

  return (
    <section id="services" className="pt-4 pb-0 bg-white relative">
      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
        {/* Centered Heading */}
        <div className="text-center mb-6">
          <span className="text-[12px] font-black tracking-widest text-[#00914d] uppercase mb-2 block">WHAT WE OFFER</span>
          <h2 className="text-3xl md:text-[40px] font-black text-[#3b2b98] mb-4">Our Taxi Services</h2>
          <p className="text-slate-500 text-[15px] font-medium max-w-2xl mx-auto">Choose from a wide range of premium taxi services tailored for you</p>
        </div>

        {/* Carousel or Grid Area */}
        <div className={`relative mx-auto ${gridMode ? '' : 'px-4 sm:px-14 group/carousel'}`}>
          {/* Left Arrow (Desktop Only) */}
          {!gridMode && (
            <button 
              onClick={() => scroll('left')}
              className="hidden lg:flex absolute left-0 top-[calc(50%-16px)] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg items-center justify-center text-[#3b2b98] hover:bg-[#3b2b98] hover:text-white transition-all opacity-90 hover:opacity-100"
              aria-label="Previous services"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Right Arrow (Desktop Only) */}
          {!gridMode && (
            <button 
              onClick={() => scroll('right')}
              className="hidden lg:flex absolute right-0 top-[calc(50%-16px)] -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-slate-200 shadow-lg items-center justify-center text-[#3b2b98] hover:bg-[#3b2b98] hover:text-white transition-all opacity-90 hover:opacity-100"
              aria-label="Next services"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Container */}
          <div 
            ref={gridMode ? null : scrollContainerRef}
            className={gridMode ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pb-8 pt-4 px-1" : "flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 pt-4 px-1 scroll-smooth [&::-webkit-scrollbar]:hidden"}
            style={gridMode ? {} : { scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service, index) => {
              return (
                <div 
                  key={index} 
                  className={gridMode ? "w-full bg-white rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.2)] flex flex-col hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300 group overflow-hidden" : "w-[calc(100vw-40px)] sm:w-[320px] md:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] shrink-0 snap-center bg-white rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.2)] flex flex-col hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-2 transition-all duration-300 group overflow-hidden mx-auto"}
                >
                  <Link to={`/service/${getServiceSlug(service.title)}`} className="w-full h-48 relative overflow-hidden shrink-0 block">
                    <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-all duration-300 z-10"></div>
                    <img 
                      src={getServiceImage(service.title, service.img)} 
                      alt={service.title} 
                      loading="lazy"
                      className="w-full h-full object-cover relative z-0 group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>
                  
                  <div className="p-5 flex flex-col flex-grow w-full text-left">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 shrink-0 rounded-full bg-[#00914d] flex items-center justify-center shadow-md">
                        {getServiceIcon(service.title)}
                      </div>
                      <Link to={`/service/${getServiceSlug(service.title)}`} className="flex-1">
                        <h3 className="text-[16px] font-black text-[#0b132b] leading-tight hover:text-[#3b2b98] transition-colors">{service.title}</h3>
                      </Link>
                    </div>
                    <p className="text-[13px] text-slate-500 font-medium leading-relaxed mb-4">{service.desc}</p>
                    
                    <a 
                      href={`https://wa.me/918595066033?text=${encodeURIComponent(`Hi, I want to book: ${service.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto w-full bg-white border-2 border-[#00914d] text-[#00914d] hover:bg-[#00914d] hover:text-white text-[13px] font-bold py-2 px-4 rounded-[8px] flex items-center justify-center gap-2 transition-all duration-300 group/btn"
                    >
                      Book Now <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
