import BookingCard from './BookingCard';
import { CheckCircle2, Zap, Tag, Headphones } from 'lucide-react';
import { vehicleImages } from '../data/mockData';
import heroBg from '../assets/images/hero-bg.webp';

export default function Hero() {
  return (
    <div className="relative min-h-[500px] flex items-center bg-white pt-20 pb-4 md:pb-0">
      {/* Decorative City Background */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat h-[109%]"
        style={{ 
          backgroundImage: `url(${heroBg})`,
          opacity: 0.8
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-white/95 via-white/80 to-white/30 h-[109%]"></div>

      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 h-full pt-4">
        
        {/* Left Column - Hero Text */}
        <div className="w-full md:w-[45%] text-left pt-2 md:pt-0 relative z-20 md:-translate-x-6">
          <h1 className="text-[36px] md:text-5xl lg:text-[64px] font-black text-[#0b132b] leading-[1.1] mb-4 tracking-tight break-words hyphens-auto">
            Book Trusted<br/>
            <span className="text-[#3b2b98]">Taxi</span> in Seconds
          </h1>
          <p className="text-slate-600 font-bold text-[14px] md:text-[15px] mb-8 flex flex-wrap items-center justify-start gap-2">
            One Way <span className="text-slate-300">|</span> Round Trip <span className="text-slate-300">|</span> Airport Transfers
          </p>

          <div className="flex flex-col gap-6 mb-8 items-start text-left">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#3b2b98] flex items-center justify-center flex-shrink-0 shadow-md">
                <Zap size={18} className="text-white fill-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#0b132b] font-bold text-[15px] leading-tight">Instant Booking</span>
                <span className="text-slate-500 font-medium text-[13px]">Quick &amp; easy booking in just 2 clicks</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#00914d] flex items-center justify-center flex-shrink-0 shadow-md">
                <Tag size={18} className="text-white fill-white transform -scale-x-100" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#0b132b] font-bold text-[15px] leading-tight">Affordable Pricing</span>
                <span className="text-slate-500 font-medium text-[13px]">Best price guarantee with no hidden charges</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-[#3b2b98] flex items-center justify-center flex-shrink-0 shadow-md">
                <Headphones size={18} className="text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#0b132b] font-bold text-[15px] leading-tight">24/7 Support</span>
                <span className="text-slate-500 font-medium text-[13px]">We are always here to help you anytime</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column - Car Image (Desktop only overlap shifted down & left) */}
        <div className="hidden lg:block absolute left-1/2 bottom-0 -translate-x-[52%] translate-y-[40%] z-10 w-[680px] pointer-events-none">
          <img 
            src={vehicleImages.heroCar} 
            alt="Premium Taxi" 
            loading="eager"
            fetchPriority="high"
            decoding="sync"
            className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          {/* Polished SVG Fallback */}
          <div className="hidden w-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)] bg-transparent">
            <svg viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
              <path d="M150 250 L200 150 L550 150 L650 250 L750 250 L750 320 L50 320 L50 250 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="4"/>
              <path d="M220 160 L380 160 L380 240 L180 240 Z" fill="#e2e8f0"/>
              <path d="M400 160 L540 160 L620 240 L400 240 Z" fill="#e2e8f0"/>
              <circle cx="200" cy="320" r="40" fill="#1e293b" />
              <circle cx="200" cy="320" r="20" fill="#94a3b8" />
              <circle cx="600" cy="320" r="40" fill="#1e293b" />
              <circle cx="600" cy="320" r="20" fill="#94a3b8" />
              <rect x="70" y="270" width="30" height="15" fill="#f59e0b" rx="5"/>
              <rect x="700" y="270" width="30" height="15" fill="#ef4444" rx="5"/>
            </svg>
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div className="w-full md:w-auto flex justify-center md:justify-end z-20 pb-4 md:pb-0 -mt-10 md:mt-0 md:translate-x-6">
          <BookingCard />
        </div>
      </div>
    </div>
  );
}
