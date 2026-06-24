import { testimonialsData } from '../data/mockData';
import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-8 bg-slate-50">
      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
        <div className="text-center mb-12">
          <span className="text-[11px] font-black tracking-widest text-green-500 uppercase mb-2 block">What Our Customers Say</span>
          <h2 className="text-3xl md:text-[40px] font-black text-blue-900">Happy Customers, Happy Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonialsData.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] flex flex-col h-full hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                    <img src={t.photo} alt={t.name} loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-bold text-[14px] text-slate-800 leading-tight">{t.name}</h4>
                    <p className="text-[11px] text-slate-500 font-medium">{t.date}</p>
                  </div>
                </div>
                <div className="w-6 h-6 flex-shrink-0">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" alt="Google" loading="lazy" decoding="async" className="w-full h-full object-contain" />
                </div>
              </div>
              
              <div className="flex gap-1 mb-3">
                {[...Array(t.rating || 5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-[14px] text-slate-600 font-medium mb-2 flex-grow leading-relaxed">
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
