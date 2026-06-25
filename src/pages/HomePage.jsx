import Header from '../components/Header';
import Hero from '../components/Hero';
import TrustStrip from '../components/TrustStrip';
import Services from '../components/Services';
import Fleet from '../components/Fleet';
import PopularRoutes from '../components/PopularRoutes';
import Testimonials from '../components/Testimonials';

import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { createLocalBusinessSchema } from '../utils/seoHelpers';
import PopularCities from '../components/PopularCities';
import AirportHubs from '../components/AirportHubs';


import LatestBlogs from '../components/blog/LatestBlogs';

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
        <Services />
        <Fleet />
        <PopularRoutes />
        <AirportHubs />
        <PopularCities />
        <Testimonials />
        {/* GoogleReviews removed from HomePage */}
        <LatestBlogs />
      </main>
      <Footer />
    </div>
  );
}
