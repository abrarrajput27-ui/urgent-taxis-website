import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { routes } from '../data/routes';
import { ChevronLeft, MapPin, Clock, Info, PhoneCall, ImageOff, Phone } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Route Blocks
import RouteMapIntelligence from '../components/route-blocks/RouteMapIntelligence';
import LiveRouteInsight from '../components/route-blocks/LiveRouteInsight';
import RouteOverview from '../components/route-blocks/RouteOverview';
import VehicleGuide from '../components/route-blocks/VehicleGuide';
import AirportPickupGuide from '../components/route-blocks/AirportPickupGuide';
import HighwayFacilitiesGuide from '../components/route-blocks/HighwayFacilitiesGuide';
import WashroomGuide from '../components/route-blocks/WashroomGuide';
import FuelPlanning from '../components/route-blocks/FuelPlanning';
import NearbyDestinations from '../components/route-blocks/NearbyDestinations';
import RouteFaqs from '../components/route-blocks/RouteFaqs';
import FareSection from '../components/route-blocks/FareSection';
import TrustSection from '../components/route-blocks/TrustSection';
import RelatedRoutes from '../components/route-blocks/RelatedRoutes';
import TouristPlanning from '../components/route-blocks/TouristPlanning';
import CoveragePlanner from '../components/route-blocks/CoveragePlanner';
import GlobalDisclaimer from '../components/route-blocks/GlobalDisclaimer';
import FamousPlaces from '../components/route-blocks/FamousPlaces';
import TollsAndTaxes from '../components/route-blocks/TollsAndTaxes';
import RoutePickupDropPoints from '../components/route-blocks/RoutePickupDropPoints';
import RouteInclusionsExclusions from '../components/route-blocks/RouteInclusionsExclusions';
import RouteCabOptionsDetail from '../components/route-blocks/RouteCabOptionsDetail';
import RouteWhyChooseUs from '../components/route-blocks/RouteWhyChooseUs';
import RouteTravelTips from '../components/route-blocks/RouteTravelTips';
import RouteBookingProcess from '../components/route-blocks/RouteBookingProcess';
import RouteNearbyDestinations from '../components/route-blocks/RouteNearbyDestinations';
import RouteNotes from '../components/route-blocks/RouteNotes';

// New Conditional Blocks
import HarKiPauriGuide from '../components/route/HarKiPauriGuide';
import ArrivalTransitGuide from '../components/route/ArrivalTransitGuide';
import RouteTravelAdvisory from '../components/route/RouteTravelAdvisory';
import RelatedRouteLinks from '../components/route/RelatedRouteLinks';
import LatestBlogs from '../components/blog/LatestBlogs';

// SEO Base System
import SEOHead from '../components/SEOHead';
import { createRouteSchema, createFAQSchema, createBreadcrumbSchema } from '../utils/seoHelpers';
import Breadcrumbs from '../components/Breadcrumbs';

export default function RouteLandingPage() {
  const { slug } = useParams();
  const cleanSlug = slug ? slug.trim().toLowerCase().replace(/\/$/, '') : '';
  const baseRoute = routes.find(r => 
    (r.slug && r.slug.toLowerCase() === cleanSlug) || 
    (r.routeSlug && r.routeSlug.toLowerCase() === cleanSlug)
  );

  const availableImages = [
    'haldwani', 'nainital', 'haridwar', 'rishikesh', 'dehradun', 
    'jim-corbett', 'mussoorie', 'ayodhya', 'varanasi', 'shimla', 
    'manali', 'delhi', 'delhi-airport', 'gurugram', 'ghaziabad', 
    'rudrapur', 'ranikhet', 'noida', 'kainchi-dham', 'bhimtal', 'sattal'
  ];

  const toSlug = baseRoute?.toCity?.toLowerCase().replace(/ /g, '-') || '';
  const fromSlug = baseRoute?.fromCity?.toLowerCase().replace(/ /g, '-') || '';

  // Priority: 
  // 1. If toCity is an airport, use airport image
  // 2. Otherwise, use destination (toCity) image if available
  // 3. Otherwise, use fromCity image if available (especially if fromCity is airport)
  const imageTarget = toSlug.includes('airport') ? toSlug : (availableImages.includes(toSlug) ? toSlug : (availableImages.includes(fromSlug) ? fromSlug : 'fallback'));
  const dynamicHeroImage = imageTarget !== 'fallback' ? `/images/destinations/${imageTarget}.webp` : (baseRoute?.heroImage || '/hero-bg.webp');

  const route = baseRoute ? {
    ...baseRoute,
    heroImage: dynamicHeroImage,
    image: dynamicHeroImage,
    routeHighlights: `Are you planning a trip from the bustling streets of ${baseRoute.fromCity || baseRoute.from} to the scenic gateway of ${baseRoute.toCity || baseRoute.to}? Booking a reliable ${baseRoute.fromCity || baseRoute.from} to ${baseRoute.toCity || baseRoute.to} taxi service has never been easier with Urgent Taxis. Whether you need a quick one way taxi for a solo journey or a spacious vehicle for a group vacation, we have the perfect ride tailored to your needs. Our well-maintained fleet includes comfortable premium Sedans, spacious Maruti Suzuki Ertigas, and the luxurious Toyota Innova Crysta, ensuring a smooth and relaxing travel experience. We pride ourselves on offering a completely transparent fare structure, which means no hidden costs or surprise charges at the end of your trip. We provide convenient door-to-door service with flexible pickup options from anywhere across ${baseRoute.fromCity || baseRoute.from} directly to your exact drop location in ${baseRoute.toCity || baseRoute.to}. Our professional chauffeurs are experienced on this highway, making us the top choice for family vacations, important business trips, and tourist travel. We prioritize your safety, comfort, and time above all else. Ready to start your journey? Get an instant quote or confirm your booking in seconds through a quick WhatsApp message or a direct call. Choose Urgent Taxis for your ${baseRoute.fromCity || baseRoute.from} to ${baseRoute.toCity || baseRoute.to} drop and travel with absolute peace of mind.`,
    whyChooseUs: `<p>When booking a ride to ${baseRoute.toCity || baseRoute.to}, reliability is key. We offer verified commercial vehicles, experienced highway-certified drivers, and a strict no-hidden-cost policy. We guarantee timely pickups so your travel schedule is never delayed.</p>`,
    travelTips: `<ul><li>Carry light woolens if traveling in the evening.</li><li>Keep motion sickness medicine handy for the winding roads nearing ${baseRoute.toCity || baseRoute.to}.</li><li>Start early morning to avoid traffic.</li></ul>`,
    bestTime: `<p>${baseRoute.toCity || baseRoute.to} is accessible year-round, but the best time for onward journeys is between March to June, and September to December.</p>`,
    bookingProcess: `<p>Booking your ride is simple and takes less than 2 minutes. We do not require complex app downloads or upfront payments. Follow the 3 easy steps below or simply tap the WhatsApp button to get started.</p>`,
    nearbyDestinations: `<ul><li><strong>Local Sightseeing:</strong> Explore the best spots around ${baseRoute.toCity || baseRoute.to}.</li><li><strong>Nearby Hubs:</strong> Easy connectivity to nearby towns and cities.</li><li><strong>Transit points:</strong> Convenient access to the nearest railway or bus stations.</li></ul>`,
    fareNotes: `<p>The fares mentioned are for one-way drops. Toll taxes (approx. ₹300-₹500) and state taxes are not included in the base fare and will be added to the final bill. No night charges if journey completes before 10 PM.</p>`,
    safetyNotes: `<p>All our vehicles are GPS-enabled and driven by commercially licensed drivers with police verification. We sanitize the cabs before every trip and mandate seatbelts for all passengers.</p>`,
    overview: {
      distance: `${baseRoute.distanceKm || 'Approx'} km`,
      travelTime: baseRoute.duration || 'Varies',
      bestTravelTime: "Early Morning (5 AM - 7 AM)",
      dayVsNight: "Day travel is highly recommended for scenic views and safety. Night travel is safe but requires slower driving on highway stretches.",
      roadCondition: "The highway route is generally well-maintained with clear signage and frequent toll booths."
    },
    faqs: [
      {
        question: `What is the taxi fare from ${baseRoute.fromCity || baseRoute.from} to ${baseRoute.toCity || baseRoute.to}?`,
        answer: `The base sedan fare starts from ₹${baseRoute.sedanFare || 2999}. Fares for Ertiga/SUV start at ₹${baseRoute.ertigaFare || 3999}, and Innova Crysta at ₹${baseRoute.crystaFare || 6999}. Final fare depends on exact pickup/drop locations.`
      },
      {
        question: `How can I book a ${baseRoute.fromCity || baseRoute.from} to ${baseRoute.toCity || baseRoute.to} taxi?`,
        answer: `You can book easily by calling our 24/7 helpline at 7310651940 or by sending your trip details on WhatsApp at 8595066033. No app download is required.`
      },
      {
        question: `Are toll taxes included in the fare?`,
        answer: `No, toll taxes and state taxes (if applicable) are extra and to be paid by the customer as per actual receipts during the journey.`
      },
      {
        question: `How much time does it take to reach ${baseRoute.toCity || baseRoute.to} from ${baseRoute.fromCity || baseRoute.from}?`,
        answer: `The typical travel time is around ${baseRoute.duration || 'a few hours'} to cover the ${baseRoute.distanceKm || ''} km distance, depending on traffic conditions.`
      },
      {
        question: `Is it safe to travel at night?`,
        answer: `Yes, it is perfectly safe. Our drivers are highly experienced with the highway and our cabs are GPS-monitored. We operate 24/7.`
      },
      {
        question: `Do I have to pay in advance?`,
        answer: `We usually require a small token advance to confirm your booking and assign the cab. The remaining balance can be paid directly to the driver.`
      },
      {
        question: `What kind of vehicles are available?`,
        answer: `We offer Sedans (Dzire, Etios), 6-seater SUVs (Ertiga, Carens), and premium SUVs (Innova Crysta). We also provide Tempo Travellers for larger groups.`
      },
      {
        question: `Can I modify my booking later?`,
        answer: `Yes, you can modify your pickup time or location by informing us at least 4 hours before the scheduled pickup time without any extra charges.`
      }
    ]
  } : null;

  const [loadHeavy, setLoadHeavy] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (baseRoute) {
      // Reset loadHeavy on route change
      setLoadHeavy(false);
      
      // Delay heavy rendering by 150ms to allow initial critical paint to finish instantly
      const timer = setTimeout(() => setLoadHeavy(true), 150);
      return () => clearTimeout(timer);
    }
  }, [cleanSlug]);

  const slugParts = cleanSlug.replace('-taxi', '').split('-to-');
  const fallbackFrom = slugParts[0] ? slugParts[0].charAt(0).toUpperCase() + slugParts[0].slice(1) : 'City';
  const fallbackTo = slugParts[1] ? slugParts[1].charAt(0).toUpperCase() + slugParts[1].slice(1) : 'Destination';
  const routeName = route ? `${route.fromCity || route.from} to ${route.toCity || route.to}` : `${fallbackFrom} to ${fallbackTo}`;

  const safeSeoTitle = route?.seoTitle || route?.seo?.title || `${routeName} Taxi Service | Book Reliable Cab`;
  const safeSeoDescription = route?.seoDescription || route?.seo?.metaDescription || `Book ${routeName} taxi with Urgent Taxis. Premium cabs, transparent pricing, and professional drivers.`;
  const safeCanonicalUrl = `https://urgenttaxis.com/${route?.slug || route?.routeSlug || cleanSlug}`;
  const safeH1 = route?.h1 || route?.seo?.h1 || `${routeName} Taxi Service`;

  if (!route) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
        <SEOHead 
          title={safeSeoTitle}
          description={safeSeoDescription}
          canonicalUrl={safeCanonicalUrl}
        />
        <Header />
        <div className="flex flex-col pt-32 pb-20">
          <div className="w-full max-w-3xl mx-auto px-4 text-center">
            <div className="bg-white rounded-3xl shadow-xl p-10 md:p-16 border border-slate-100">
              <h1 className="text-4xl md:text-5xl font-black text-[#3b2b98] mb-6">{safeH1}</h1>
              <p className="text-lg md:text-xl text-slate-600 font-medium mb-10">This route guide is being prepared. Please contact us for fare and booking.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="tel:7310651940" className="flex items-center justify-center gap-2 w-full sm:w-auto bg-[#3b2b98] text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-900 transition shadow-md">
                  <Phone size={20} /> Call 7310651940
                </a>
                <a href="https://wa.me/918595066033" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 w-full sm:w-auto bg-[#00914d] text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition shadow-md">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp 8595066033
                </a>
              </div>
            </div>
            <div className="mt-8">
              <Link to="/" className="inline-block text-slate-500 font-bold hover:text-[#3b2b98] transition underline underline-offset-4">Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const getWhatsAppLink = () => {
    const msg = `Hi, I would like to book a taxi. Here are the details I am interested in:

*Route:* ${route.route || route.seoTitle} (${route.serviceType || route.type})
*Starting Fare:* ₹${route.sedanFare || route.price}
*Approx Distance:* ${route.distance || route.distanceKm}

Please share the availability and exact quote.`;
    return `https://wa.me/918595066033?text=${encodeURIComponent(msg)}`;
  };

  const breadcrumbItems = [
    { name: 'Routes', url: '/routes' },
    { name: `${route.fromCity || route.from} to ${route.toCity || route.to} Taxi`, url: `/${route.slug}` }
  ];

  const schemas = [
    createRouteSchema(route),
    createFAQSchema((route.faqs || route.content?.faqs)?.map(faq => ({ question: faq.question || faq.q, answer: faq.answer || faq.a }))),
    createBreadcrumbSchema(breadcrumbItems)
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200">
      <SEOHead 
        title={safeSeoTitle}
        description={safeSeoDescription}
        canonicalUrl={safeCanonicalUrl}
        schemas={schemas}
      />
      <Header />
      
      {/* Route Hero Section */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={route.heroImage || route.image || '/hero-bg.webp'} alt={route.route || route.seoTitle} loading="eager" fetchPriority="high" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/80 mix-blend-multiply"></div>
        </div>
        
        <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto relative z-10 text-white">
          <Link to="/routes" className="inline-flex items-center gap-1 text-blue-200 hover:text-white transition-colors mb-6 text-sm font-medium">
            <ChevronLeft size={16} /> Back to Routes
          </Link>
          
          <div className="max-w-4xl">
            <div className="inline-block bg-blue-500/20 backdrop-blur-md border border-blue-400/30 text-blue-100 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
              Trusted One Way & Round Trip Taxi Service
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight tracking-tight break-words hyphens-auto">
              {safeH1}
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-2xl leading-relaxed break-words">
              {route.seoSubtitle || route.seo?.subtitle}
            </p>
            


            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white border-2 border-[#00914d] text-[#00914d] hover:bg-[#00914d] hover:text-white transition-colors py-3.5 px-8 rounded-xl font-black tracking-wide flex items-center justify-center text-center shadow-sm"
              >
                BOOK NOW ON WHATSAPP
              </a>
              <a 
                href="tel:+917310651940"
                className="bg-white text-[#3b2b98] hover:bg-slate-50 transition-colors py-3.5 px-8 rounded-xl font-black tracking-wide flex items-center justify-center gap-2 text-center shadow-lg shadow-black/10"
              >
                <PhoneCall size={18} /> CALL 7310651940
              </a>
            </div>
            <p className="mt-4 text-xs text-blue-200 opacity-80 flex items-center gap-1.5">
              <Info size={14} /> Approx. distance may vary depending on pickup and drop location.
            </p>
          </div>
        </div>
      </section>

      {/* Main Framework Section */}
      <FamousPlaces route={route} />
      
      <section className="py-8 lg:py-12">
        <div className="w-full px-4 sm:px-8 lg:px-12 mx-auto">
          
          {/* Global Disclaimer */}
          <GlobalDisclaimer />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-8">
            
            {/* Left Column - Main Travel Intelligence */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Inside Page Image */}
              {route.image && (
                <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white">
                  <img src={route.image} alt={route.route} loading="lazy" className="w-full h-[200px] md:h-[280px] object-cover" />
                </div>
              )}

              <RouteOverview route={route} />
              
              {/* Defer Heavy SEO Components to prevent Main Thread blocking */}
              {loadHeavy ? (
                <>
                  <RouteWhyChooseUs route={route} />
                  <RouteMapIntelligence route={route} />
                  <LiveRouteInsight route={route} />
                  {route.travelAdvisory && <RouteTravelAdvisory data={route.travelAdvisory} />}
                  <RouteCabOptionsDetail route={route} />
                  <VehicleGuide />
                  <FareSection route={route} />
                  <RouteNotes route={route} />
                  <RouteBookingProcess route={route} />
                  <RoutePickupDropPoints route={route} />
                  <RouteInclusionsExclusions route={route} />
                  <AirportPickupGuide />
                  
                  {/* Conditional Transit / Destination Guides */}
                  {route.transitGuide && <ArrivalTransitGuide data={route.transitGuide} />}
                  {route.harKiPauri && <HarKiPauriGuide data={route.harKiPauri} />}
                  
                  <RouteTravelTips route={route} />
                  <RouteNearbyDestinations route={route} />
                  
                  <HighwayFacilitiesGuide route={route} />
                  <WashroomGuide />
                  <TollsAndTaxes route={route} />
                  <FuelPlanning route={route} />
                  <TouristPlanning route={route} />
                  <CoveragePlanner route={route} />
                  <RouteFaqs route={route} />
                </>
              ) : (
                <div className="h-[1000px] flex items-start justify-center pt-20">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin opacity-50"></div>
                </div>
              )}
            </div>

            {/* Right Column - Sidebar */}
            <div className="lg:col-span-1 space-y-8">
              
              {/* Quick Booking / CTA Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-[#00914d]"></div>
                <h3 className="text-xl font-black text-[#3b2b98] mb-4">Quick Booking</h3>
                <p className="text-sm text-slate-600 mb-6">Need a cab urgently? Book instantly via WhatsApp or Call.</p>
                <div className="flex flex-col gap-3">
                  <a 
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#00914d] text-white hover:bg-[#00914d] transition-colors py-3 px-4 rounded-xl font-bold text-center flex items-center justify-center gap-2"
                  >
                    WhatsApp Booking
                  </a>
                  <a 
                    href="tel:+917310651940"
                    className="bg-slate-50 text-[#3b2b98] hover:bg-slate-100 border border-slate-200 transition-colors py-3 px-4 rounded-xl font-bold text-center flex items-center justify-center gap-2"
                  >
                    <PhoneCall size={16} /> +91 7310651940
                  </a>
                </div>
              </div>

              <TrustSection getWhatsAppLink={getWhatsAppLink} />
              
              {/* Route Summary / About */}
              {route.content?.about && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-xl font-black text-[#3b2b98] mb-4">Route Summary</h3>
                  <div className="prose prose-sm text-slate-600 leading-relaxed">
                    <p>{route.content.about}</p>
                  </div>
                </div>
              )}

              {/* Available Services */}
              {route.availableServices && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-xl font-black text-[#3b2b98] mb-4">Available Services</h3>
                  <ul className="space-y-3">
                    {route.availableServices.map((service, index) => (
                      <li key={index} className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                        {service}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Important Notes */}
              {route.importantNotes && (
                <div className="bg-orange-50 rounded-2xl shadow-sm border border-orange-100 p-6">
                  <h3 className="text-lg font-black text-orange-800 mb-3 flex items-center gap-2">
                    <Info size={18} /> Important Notes
                  </h3>
                  <ul className="space-y-2 text-sm text-orange-700">
                    {route.importantNotes.map((note, index) => (
                      <li key={index}>• {note}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact Support */}
              <div className="bg-blue-50 rounded-2xl shadow-sm border border-blue-100 p-6">
                <h3 className="text-lg font-black text-[#3b2b98] mb-2">24/7 Support</h3>
                <p className="text-sm text-blue-800 mb-4">Need help planning your route? Our experts are here.</p>
                <div className="text-sm font-bold text-[#3b2b98]">Email: booking@urgenttaxis.com</div>
              </div>

            </div>

          </div>
        </div>
      </section>

      <LatestBlogs currentRoute={route.slug} />
      <RelatedRoutes route={route} />
      <RelatedRouteLinks routeSlug={route.slug} />
      <Footer />
    </div>
  );
}
