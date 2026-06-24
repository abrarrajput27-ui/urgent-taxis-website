import React, { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import Breadcrumbs from '../components/Breadcrumbs';
import GoogleReviews from '../components/GoogleReviews';
import { createBreadcrumbSchema } from '../utils/seoHelpers';
import CtaBand from '../components/CtaBand';

export default function ReviewsPage() {
  const breadcrumbItems = [
    { name: 'Reviews', url: '/reviews' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      <SEOHead 
        title="Genuine Google Reviews | Urgent Taxis"
        description="Read genuine customer reviews from our verified Google Business Profile. See why travelers trust Urgent Taxis for their outstation and local trips."
        canonicalUrl="https://urgenttaxis.com/reviews"
        schemas={[createBreadcrumbSchema(breadcrumbItems)]}
      />
      <Header />
      
      <main className="flex-grow pt-[60px] lg:pt-[70px]">
        {/* Reviews Hero */}
        <div className="bg-[#0B132B] text-white py-16 px-4 relative overflow-hidden flex flex-col items-center justify-center text-center min-h-[300px]">
          <div className="max-w-[800px] mx-auto relative z-10 w-full">
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">Customer Trust & Reviews</h1>
            <p className="text-gray-300 text-lg font-medium max-w-2xl mx-auto">
              We pride ourselves on providing top-tier service. Read genuine feedback from our passengers across India.
            </p>
            <div className="w-16 h-1 bg-[#1877F2] rounded-full mt-6 mx-auto"></div>
          </div>
        </div>

        {/* Reviews Component */}
        <section className="py-8 bg-white">
          <GoogleReviews />
        </section>
      </main>

      <Footer />
    </div>
  );
}
