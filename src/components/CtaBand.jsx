import { Phone } from 'lucide-react';
import { vehicleImages } from '../data/mockData';

export default function CtaBand() {
  return (
    <section className="pt-8 pb-12 bg-white relative">
      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto relative z-10">
        <div className="bg-[#1746a2] bg-gradient-to-r from-[#1746a2] to-[#0c3182] rounded-xl px-6 pt-[120px] pb-6 md:px-8 md:py-8 flex flex-col md:flex-row items-center justify-between relative shadow-2xl mt-20 md:mt-12">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none z-0 overflow-hidden rounded-xl">
            <div className="absolute right-0 top-0 w-96 h-96 bg-white rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute left-0 bottom-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
          </div>
          
          {/* Left Content with Overlapping Car */}
          <div className="absolute -top-20 md:top-1/2 left-1/2 md:-left-12 -translate-x-1/2 md:translate-x-0 md:-translate-y-[55%] w-[310px] md:w-[500px] z-30 pointer-events-none">
            <img 
              src={vehicleImages.heroCar} 
              alt="Premium Taxi" 
              className="w-full h-auto object-contain drop-shadow-2xl"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full relative z-20">
            {/* Text Content */}
            <div className="text-center md:text-left md:pl-[500px] mb-5 md:mb-0 w-full md:w-auto">
              <h2 className="text-xl md:text-[28px] font-black text-white mb-1 leading-tight tracking-tight">Book your ride in just 2 clicks</h2>
              <p className="text-blue-100 text-[13px] md:text-[14px] font-medium">Get instant confirmation via WhatsApp</p>
            </div>
            
            {/* Right Actions */}
            <div className="flex flex-row gap-2 sm:gap-3 w-full md:w-auto justify-center">
              <a 
                href="tel:7310651940"
                className="bg-white text-[#3b2b98] px-2 sm:px-6 py-3 rounded-xl font-bold flex flex-1 items-center justify-center gap-1.5 sm:gap-2 hover:bg-slate-50 transition shadow-lg text-[13px] sm:text-[15px] whitespace-nowrap"
              >
                <Phone size={16} strokeWidth={2.5} className="sm:w-[18px] sm:h-[18px]" /> Call Now
              </a>
              
              <a 
                href="https://wa.me/918595066033"
                target="_blank"
                rel="noreferrer"
                className="bg-[#00914d] text-white px-2 sm:px-6 py-3 rounded-xl font-bold flex flex-1 items-center justify-center gap-1.5 sm:gap-2 hover:bg-green-700 transition shadow-lg shadow-green-950/20 text-[13px] sm:text-[15px] whitespace-nowrap"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.031 2a9.978 9.978 0 0 0-9.969 9.97c0 1.764.462 3.42 1.272 4.877L2 22l5.308-1.24a9.97 9.97 0 0 0 4.723 1.206h.004a9.98 9.98 0 0 0 9.97-9.97A9.979 9.979 0 0 0 12.031 2zm0 1.5c4.686 0 8.5 3.815 8.5 8.5a8.508 8.508 0 0 1-8.5 8.5c-1.58 0-3.064-.433-4.348-1.183l-.312-.183-3.23.754.772-3.12-.199-.319A8.47 8.47 0 0 1 3.5 12.003c0-4.686 3.814-8.503 8.531-8.503zm-3.05 4.545c-.174 0-.36.035-.506.198-.157.17-.601.586-.601 1.428 0 .842.613 1.658.7 1.77.086.115 1.182 1.892 2.915 2.585.41.164.73.263.98.341.413.13.79.112 1.087.067.33-.05 1.022-.417 1.164-.819.143-.404.143-.75.1-.82-.043-.073-.157-.116-.33-.203-.173-.087-1.022-.505-1.18-.563-.158-.058-.273-.087-.39.087-.114.17-.442.56-.542.672-.1.115-.2.128-.372.043-.173-.087-.732-.27-1.393-.86-.514-.458-.862-1.025-.963-1.197-.1-.173-.01-.267.076-.353.078-.077.173-.203.26-.304.086-.1.114-.173.173-.29.057-.115.028-.216-.014-.303-.043-.087-.39-.938-.533-1.282-.14-.337-.282-.29-.387-.295-.1-.005-.215-.005-.33-.005z"/></svg>
                Book on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
