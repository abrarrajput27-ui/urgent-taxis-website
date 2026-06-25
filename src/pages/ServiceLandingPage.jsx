import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData } from '../data/mockData';
import { routes } from '../data/routes';
import { Phone, CheckCircle2, Shield, Info, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BookingCard from '../components/BookingCard';

// SEO Base System
import SEOHead from '../components/SEOHead';
import { createServiceSchema, createBreadcrumbSchema } from '../utils/seoHelpers';
import Breadcrumbs from '../components/Breadcrumbs';

export default function ServiceLandingPage() {
  const { slug } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    const foundService = servicesData.find(s => s.slug === slug);
    if (foundService) {
      setService(foundService);
      window.scrollTo(0, 0);
    }
  }, [slug]);

  if (!service) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-slate-50 flex flex-col pt-32 pb-20">
          <div className="w-full max-w-3xl mx-auto px-4 text-center">
            <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 border border-slate-100">
              <h1 className="text-4xl md:text-5xl font-black text-[#3b2b98] mb-6">Service Coming Soon</h1>
              <p className="text-lg md:text-xl text-slate-600 font-medium mb-10">This service page is currently being updated. Please contact us directly for inquiries and bookings.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="tel:7310651940" className="flex items-center justify-center gap-2 w-full sm:w-auto bg-[#3b2b98] text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-900 transition shadow-md">
                  <Phone size={20} /> Call 7310651940
                </a>
                <a href="https://wa.me/918595066033" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full sm:w-auto bg-[#00914d] text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition shadow-md">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp 8595066033
                </a>
              </div>
              <div className="mt-8">
                <Link to="/" className="inline-block text-slate-500 font-bold hover:text-[#3b2b98] transition underline underline-offset-4">Back to Home</Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const whatsappText = encodeURIComponent(`Hi, I would like to inquire about the ${service.title} service.`);

  const breadcrumbItems = [
    { name: 'Services', url: '/services' },
    { name: service.title, url: `/service/${service.slug}` }
  ];

  const schemas = [
    createServiceSchema(service),
    createBreadcrumbSchema(breadcrumbItems)
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <SEOHead 
        title={service.seoTitle || `${service.title} - Urgent Taxis`}
        description={service.seoDesc || service.desc}
        canonicalUrl={`https://urgenttaxis.com/service/${service.slug}`}
        schemas={schemas}
      />
      <Header />

      {/* 2. Service Hero */}
      <div className="relative pt-28 pb-12 md:pt-36 md:pb-20 bg-white border-b border-slate-200 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10">
           <img src={service.img} alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-green-100 text-green-700 font-bold px-3 py-1 rounded-full text-xs tracking-wider mb-4 uppercase">
              Premium Taxi Service
            </span>
            <h1 className="text-4xl md:text-[54px] font-black text-[#3b2b98] leading-tight mb-6 break-words hyphens-auto">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto break-words">
              {service.desc}
            </p>
          </div>
        </div>
      </div>

      <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Left Column */}
          <div className="flex-1 space-y-10">
            
            {/* Inside Page Image */}
            <div className="rounded-3xl overflow-hidden shadow-sm border border-slate-100 bg-white">
              <img src={service.img} alt={service.title} className="w-full h-[300px] md:h-[400px] object-cover" />
            </div>

            {/* 3. Service Overview */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-2xl font-black text-[#3b2b98] mb-4">Service Overview</h2>
              <p className="text-slate-600 font-medium leading-relaxed mb-6">
                Experience seamless travel with our {service.title} service. Whether you're traveling for business, leisure, or special occasions, our well-maintained fleet and professional drivers ensure a comfortable journey. Enjoy transparent pricing, 24/7 support, and on-time pickups.
              </p>
              
              {/* 4. What is included */}
              <h3 className="text-lg font-bold text-slate-800 mt-8 mb-4">What's Included?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} /><span className="text-slate-600 font-medium">Clean and sanitized vehicles</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} /><span className="text-slate-600 font-medium">Professional and verified drivers</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} /><span className="text-slate-600 font-medium">24/7 dedicated customer support</span></li>
                <li className="flex items-start gap-3"><CheckCircle2 className="text-green-500 shrink-0 mt-0.5" size={20} /><span className="text-slate-600 font-medium">Transparent billing with zero hidden costs</span></li>
              </ul>
            </div>

            {/* 5. Best use cases */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-2xl font-black text-[#3b2b98] mb-4">Best Use Cases</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-1">Corporate Travel</h4>
                  <p className="text-sm text-slate-500">Ideal for business meetings and client visits.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-1">Family Vacations</h4>
                  <p className="text-sm text-slate-500">Spacious vehicles for a comfortable family trip.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-1">Airport Transit</h4>
                  <p className="text-sm text-slate-500">Reliable drops and pickups to avoid missing flights.</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <h4 className="font-bold text-slate-800 mb-1">Special Events</h4>
                  <p className="text-sm text-slate-500">Premium cars for weddings and VIP transportation.</p>
                </div>
              </div>
            </div>

            {/* 6. Available vehicles */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-2xl font-black text-[#3b2b98] mb-4">Available Vehicles</h2>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-blue-50 text-blue-800 font-bold rounded-lg border border-blue-100">Hatchback (WagonR, Swift)</span>
                <span className="px-4 py-2 bg-blue-50 text-blue-800 font-bold rounded-lg border border-blue-100">Sedan (Dzire, Amaze)</span>
                <span className="px-4 py-2 bg-blue-50 text-blue-800 font-bold rounded-lg border border-blue-100">MUV (Ertiga, Innova)</span>
                <span className="px-4 py-2 bg-blue-50 text-blue-800 font-bold rounded-lg border border-blue-100">Premium SUV (Innova Crysta)</span>
              </div>
            </div>

            {/* 7. Important fare rules */}
            <div className="bg-orange-50 rounded-3xl shadow-sm border border-orange-100 p-8">
              <div className="flex items-center gap-3 mb-4">
                <Info className="text-orange-600" size={24} />
                <h2 className="text-xl font-black text-orange-900">Important Fare Rules</h2>
              </div>
              <ul className="space-y-2 text-orange-800 font-medium text-sm">
                <li>• Toll taxes and state taxes are extra as applicable.</li>
                <li>• Parking charges (if any) are to be paid directly by the customer.</li>
                <li>• Night allowance applies for driving between 10 PM and 6 AM.</li>
                <li>• Rates may vary during peak holiday seasons.</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Booking & CTAs */}
          <div className="lg:w-[420px] flex flex-col gap-6">
            
            {/* 8. BookingCard */}
            <div className="lg:sticky lg:top-24">
              <div className="block w-full h-auto self-start">
                <BookingCard />
              </div>
              
              <div className="mt-6 flex flex-col gap-4">
                {/* 9. Call button */}
                <a href="tel:7310651940" className="w-full bg-[#3b2b98] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-900 transition shadow-lg hover:-translate-y-1">
                  <Phone size={20} />
                  Call to Book Now
                </a>
                
                {/* 10. WhatsApp button */}
                <a href={`https://wa.me/918595066033?text=${whatsappText}`} target="_blank" rel="noopener noreferrer" className="w-full bg-[#00914d] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-green-700 transition shadow-lg hover:-translate-y-1">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  Chat on WhatsApp
                </a>
              </div>
            </div>
            
            {/* 11. Related services */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mt-6">
              <h3 className="font-bold text-slate-800 mb-4">Explore Other Services</h3>
              <div className="flex flex-col gap-3">
                {servicesData.filter(s => s.slug !== slug).slice(0, 4).map(s => (
                  <Link key={s.slug} to={`/service/${s.slug}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 group">
                    <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0">
                      <img src={s.img} alt={s.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-800 group-hover:text-[#3b2b98] transition">{s.title}</h4>
                    </div>
                    <ArrowRight size={16} className="text-slate-400 group-hover:text-[#3b2b98]" />
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 12. Popular Routes for this Service */}
      <div className="py-12 bg-white border-t border-slate-100">
        <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
          <h2 className="text-2xl font-black text-[#3b2b98] mb-6">Popular Taxi Routes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {service.slug === 'airport-transfer' 
              ? <>
                  {routes.filter(r => r.fromCity === 'Noida International Airport').slice(0, 4).map((r, index) => (
                    <Link 
                      key={`jewar-${index}`}
                      to={`/${r.slug}`} 
                      className="group bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-400 hover:shadow-md transition-all flex items-center justify-between"
                    >
                      <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors text-sm">
                        {r.route || r.seoTitle}
                      </span>
                      <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600 shrink-0" />
                    </Link>
                  ))}
                  {routes.filter(r => r.fromCity === 'Delhi Airport').slice(0, 4).map((r, index) => (
                    <Link 
                      key={`delhi-${index}`}
                      to={`/${r.slug}`} 
                      className="group bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-400 hover:shadow-md transition-all flex items-center justify-between"
                    >
                      <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors text-sm">
                        {r.route || r.seoTitle}
                      </span>
                      <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600 shrink-0" />
                    </Link>
                  ))}
                  <Link to="/city/delhi-airport" className="group bg-blue-50 p-4 rounded-xl border border-blue-200 hover:border-blue-500 hover:shadow-md transition-all flex items-center justify-between md:col-span-2">
                    <span className="font-bold text-blue-800 text-sm">View All Delhi Airport Taxi Routes</span>
                    <ArrowRight size={16} className="text-blue-600 shrink-0" />
                  </Link>
                  <Link to="/city/noida-international-airport" className="group bg-green-50 p-4 rounded-xl border border-green-200 hover:border-green-500 hover:shadow-md transition-all flex items-center justify-between md:col-span-2">
                    <span className="font-bold text-green-800 text-sm">View All Jewar Airport Taxi Routes</span>
                    <ArrowRight size={16} className="text-green-600 shrink-0" />
                  </Link>
                </>
              : routes.slice(0, 8).map((r, index) => (
                  <Link 
                    key={index}
                    to={`/${r.slug}`} 
                    className="group bg-slate-50 p-4 rounded-xl border border-slate-100 hover:border-blue-400 hover:shadow-md transition-all flex items-center justify-between"
                  >
                    <span className="font-bold text-slate-700 group-hover:text-blue-600 transition-colors text-sm">
                      {r.route || r.seoTitle}
                    </span>
                    <ArrowRight size={16} className="text-slate-400 group-hover:text-blue-600 shrink-0" />
                  </Link>
                ))
            }
          </div>
        </div>
      </div>

      {/* 13. Footer */}
      <Footer />
    </div>
  );
}
