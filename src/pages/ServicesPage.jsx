import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import Services from '../components/Services';

export default function ServicesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#f8f9fa] min-h-screen flex flex-col font-sans">
      <SEOHead 
        title="Our Services | Urgent Taxis"
        description="Explore premium taxi services by Urgent Taxis. Outstation cabs, local rentals, airport transfers, and more."
      />
      <Header />
      
      <main className="flex-grow pt-[60px] lg:pt-[70px] pb-16">
        <div className="bg-[#0B132B] text-white py-16 px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-black mb-4">Our Taxi Services</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Choose from a wide range of premium taxi services tailored for your travel needs.
          </p>
        </div>
        <div className="mt-8">
          <Services gridMode={true} />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
