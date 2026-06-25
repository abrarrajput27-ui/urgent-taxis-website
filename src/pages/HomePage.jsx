import React, { lazy, Suspense } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';

const Services = lazy(() => import('../components/Services'));
const Fleet = lazy(() => import('../components/Fleet'));
const PopularRoutes = lazy(() => import('../components/PopularRoutes'));
const AirportHubs = lazy(() => import('../components/AirportHubs'));
const PopularCities = lazy(() => import('../components/PopularCities'));
const GoogleReviews = lazy(() => import('../components/GoogleReviews'));
const LatestBlogs = lazy(() => import('../components/blog/LatestBlogs'));

import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { createLocalBusinessSchema } from '../utils/seoHelpers';

export default function HomePage() {
  const schema = createLocalBusinessSchema();

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <SEOHead 
        title="Urgent Taxis - Reliable Outstation Taxi Service in Delhi NCR"
        description="Book premium outstation cabs, one-way taxis, and airport transfers from Delhi. Best fares, verified drivers, and top-rated service."
        canonicalUrl="https://urgenttaxis.com/"
        schemas={[schema]}
      />
      <Header />
      <main className="flex-grow">
        <Hero />
        <TrustStrip />
        <Suspense fallback={<div className="h-20 w-full flex items-center justify-center"><div className="animate-pulse bg-slate-200 h-8 w-32 rounded"></div></div>}>
          <Services />
          <Fleet />
          <PopularRoutes />
          <AirportHubs />
          <PopularCities />
          <GoogleReviews />
          <LatestBlogs />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
