import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { cities } from '../data/cities';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import RelatedCityNavigation from '../components/city-blocks/RelatedCityNavigation';

const CityTaxiPage = () => {
  const { citySlug } = useParams();
  
  const city = cities.find(c => (c.slug || c.citySlug) === citySlug);

  if (!city) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-[#3b2b98] mb-4">City Not Found</h1>
        <p className="text-gray-600 mb-8">We couldn't find the taxi services for this city.</p>
        <Link to="/" className="px-6 py-3 bg-[#3b2b98] text-white rounded-lg font-bold">
          Go Back Home
        </Link>
      </div>
    );
  }

  const schemas = [];

  if (city.faqs && city.faqs.length > 0) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": city.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    });
  }

  schemas.push({
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "Urgent Taxis",
    "url": `https://urgenttaxis.com/city/${city.slug || city.citySlug}`,
    "telephone": "7310651940",
    "areaServed": city.cityName,
    "description": city.seoDescription
  });

  return (
    <>
      <SEOHead 
        title={city.seoTitle}
        description={city.seoDescription}
        canonicalUrl={`https://urgenttaxis.com/city/${city.slug || city.citySlug}`}
        schemas={schemas}
      />
      <Header />
      {/* Hero Section */}
      <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          {(city.heroImage || city.image) && (
            <img src={city.heroImage || city.image} alt={city.cityName} className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1746a2] to-[#0c3182] mix-blend-multiply opacity-90"></div>
        </div>
        
        <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto relative z-10 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight tracking-tight break-words hyphens-auto">
              {city.h1}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed break-words">
              {city.seoSubtitle || city.subtitle}
            </p>
            


            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/918595066033"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#00914d] border-2 border-[#00914d] text-white hover:bg-green-700 hover:border-green-700 transition-colors py-3.5 px-8 rounded-xl font-black tracking-wide flex items-center justify-center gap-2 text-center shadow-lg"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                WhatsApp 8595066033
              </a>
              <a 
                href="tel:7310651940"
                className="bg-white text-[#3b2b98] hover:bg-slate-50 transition-colors py-3.5 px-8 rounded-xl font-black tracking-wide flex items-center justify-center gap-2 text-center shadow-lg"
              >
                CALL 7310651940
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-5xl">

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-[#3b2b98] mb-4">About Our Services in {city.cityName}</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{city.intro || city.about}</p>
        </div>

        {/* Services & Routes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Main Services */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
            <h2 className="text-2xl font-bold text-[#3b2b98] mb-6">Main Services</h2>
            <ul className="space-y-3">
              {(city.services || city.mainServices)?.map((service, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-[#00914d] rounded-full mr-3"></span>
                  <span className="font-medium">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Routes */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
            <h2 className="text-2xl font-bold text-[#3b2b98] mb-6">Popular Routes</h2>
            <ul className="space-y-3">
              {city.popularRoutes?.map((route, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-[#3b2b98] rounded-full mr-3"></span>
                  <span className="font-medium">{route}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* FAQs */}
        {city.faqs && city.faqs.length > 0 && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 md:p-8">
            <h2 className="text-2xl font-bold text-[#3b2b98] mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              {city.faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{faq.question}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
    
    <RelatedCityNavigation city={city} />
    <Footer />
    </>
  );
};

export default CityTaxiPage;
