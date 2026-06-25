
import heroCarImg from '../assets/images/hero-car.jpg';
import hatchbackImg from '../assets/images/Hatchback.webp';
import sedanImg from '../assets/images/sedan.webp';
import ertigaImg from '../assets/images/MUV.webp';
import innovaImg from '../assets/images/with logo innova.png';
import travellerImg from '../assets/images/car-traveller.webp';
import urbaniaImg from '../assets/images/Urbania.webp';
import busImg from '../assets/images/volvo-bus.jpg';
import serviceOneWayImg from '../assets/images/service-oneway.jpg';
import serviceRoundTripImg from '../assets/images/roundtrip.jpg';
import serviceAirportImg from '../assets/images/Airport Transfers j.jpg';
import serviceLocalImg from '../assets/images/service-local.jpg';
import serviceTourImg from '../assets/images/tour packages.jpg';
import serviceRailwayImg from '../assets/images/railway transfers.jpg';
import serviceWeddingImg from '../assets/images/wedding.jpg';
import serviceCorporateImg from '../assets/images/corporate.jpg';


export const vehicleImages = {
  hatchback: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&q=80&w=400', // White WagonR/Hatchback
  sedan: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=400', // White Sedan
  ertiga: 'https://images.unsplash.com/photo-1621245053093-9c8e100fb160?auto=format&fit=crop&q=80&w=400', // White MUV
  innova: 'https://images.unsplash.com/photo-1608625345758-c92c81daabda?auto=format&fit=crop&q=80&w=400', // White Innova
  crysta: 'https://images.unsplash.com/photo-1608625345758-c92c81daabda?auto=format&fit=crop&q=80&w=400', // White Crysta
  traveller: 'https://images.unsplash.com/photo-1600851897255-ceb8aef4cb30?auto=format&fit=crop&q=80&w=400', // White Minibus
  heroCar: heroCarImg // Large White Innova
};

export const fleetData = [
  {
    id: 1,
    categoryName: 'Hatchback',
    vehiclesList: 'WagonR • Swift • Baleno',
    pax: '4 Pax',
    luggage: '2 Bags',
    ac: true,
    music: true,
    fuel: true,
    image: hatchbackImg, blend: true,
    pricingType: 'car',
    pricing: { plain: 12, hill: 18 }
  },
  {
    id: 2,
    categoryName: 'Sedan',
    vehiclesList: 'Dzire • Aura • Amaze',
    pax: '4 Pax',
    luggage: '3 Bags',
    ac: true,
    music: true,
    fuel: true,
    image: sedanImg, blend: true,
    pricingType: 'car',
    pricing: { plain: 14, hill: 20 }
  },
  {
    id: 3,
    categoryName: 'MUV / MPV',
    vehiclesList: 'Ertiga • Triber • Carens',
    pax: '6-7 Pax',
    luggage: '4 Bags',
    ac: true,
    music: true,
    fuel: true,
    image: ertigaImg, blend: true,
    pricingType: 'car',
    pricing: { plain: 16, hill: 22 }
  },
  {
    id: 4,
    categoryName: 'Premium SUV',
    vehiclesList: 'Innova Crysta • Hycross',
    pax: '6-7 Pax',
    luggage: '4 Bags',
    ac: true,
    music: true,
    fuel: true,
    image: innovaImg, blend: true,
    pricingType: 'car',
    pricing: { plain: 24, hill: 30 }
  },
  {
    id: 5,
    categoryName: '12 Seater Traveller',
    vehiclesList: 'Force Traveller AC',
    pax: '12 Pax',
    luggage: 'Spacious',
    ac: true,
    music: true,
    fuel: true,
    image: travellerImg,
    pricingType: 'car',
    pricing: { plain: 26, hill: 32 }
  },
  {
    id: 51,
    categoryName: '16 Seater Traveller',
    vehiclesList: 'Force Traveller AC',
    pax: '16 Pax',
    luggage: 'Spacious',
    ac: true,
    music: true,
    fuel: true,
    image: travellerImg,
    pricingType: 'car',
    pricing: { plain: 30, hill: 36 }
  },
  {
    id: 52,
    categoryName: '20 Seater Traveller',
    vehiclesList: 'Force Traveller AC',
    pax: '20 Pax',
    luggage: 'Spacious',
    ac: true,
    music: true,
    fuel: true,
    image: travellerImg,
    pricingType: 'car',
    pricing: { plain: 34, hill: 40 }
  },
  {
    id: 53,
    categoryName: '26 Seater Traveller',
    vehiclesList: 'Force Traveller AC',
    pax: '26 Pax',
    luggage: 'Spacious',
    ac: true,
    music: true,
    fuel: true,
    image: travellerImg,
    pricingType: 'car',
    pricing: { plain: 38, hill: 44 }
  },
  {
    id: 6,
    categoryName: '12 Seater Urbania',
    vehiclesList: 'Force Urbania Premium',
    pax: '12 Pax',
    luggage: 'Spacious',
    ac: true,
    music: true,
    fuel: true,
    image: urbaniaImg,
    pricingType: 'car',
    perKmRate: 42,
    pricing: { plain: 42, hill: 50 }
  },
  {
    id: 61,
    categoryName: '16 Seater Urbania',
    vehiclesList: 'Force Urbania Premium',
    pax: '16 Pax',
    luggage: 'Spacious',
    ac: true,
    music: true,
    fuel: true,
    image: urbaniaImg,
    pricingType: 'car',
    perKmRate: 46,
    pricing: { plain: 46, hill: 52 }
  },
  {
    id: 7,
    categoryName: '27 Seater Bus',
    vehiclesList: 'Luxury AC Bus',
    pax: '27 Pax',
    luggage: 'Spacious Boot Space',
    ac: true,
    music: true,
    fuel: true,
    image: busImg,
    pricingType: 'car',
    perKmRate: 52,
    pricing: { plain: 52, hill: 60 }
  },
  {
    id: 71,
    categoryName: '45 Seater Bus',
    vehiclesList: 'Luxury AC Bus',
    pax: '45 Pax',
    luggage: 'Large Boot Space',
    ac: true,
    music: true,
    fuel: true,
    image: busImg,
    pricingType: 'car',
    perKmRate: 62,
    pricing: { plain: 62, hill: 70 }
  }
];

export const airportGuideData = {
  delhi: {
    airportCode: 'DEL',
    airportName: 'Indira Gandhi International Airport, New Delhi',
    terminals: [
      {
        name: 'Terminal 1 (T1)',
        notes: 'Domestic low-cost carriers. Pickup usually outside Arrivals Gate 1 & 2.'
      },
      {
        name: 'Terminal 2 (T2)',
        notes: 'Domestic flights. Short walk from T3. Pickup at designated cab area.'
      },
      {
        name: 'Terminal 3 (T3)',
        notes: 'International & Premium Domestic. Multi-level car parking. Pickup typically at Pillar 10 or 14 (Level 2).'
      }
    ],
    rules: {
      pickupProcess: 'Your driver will track your flight status. Call the driver once you collect your luggage. They will guide you to the specific pillar number.',
      waitingRules: 'First 30 minutes of waiting is complimentary. Beyond that, standard waiting charges apply.',
      parkingRules: 'Airport parking charges are extra and must be paid by the customer as per the parking slip.',
      meetingPoint: 'Usually Pillar 10 or 14 at T3, and Gate 2 at T1. Confirmed by driver upon landing.'
    },
    facilities: {
      food: 'Multiple food courts (KFC, Costa Coffee, Haldirams) available just outside Arrivals.',
      atm: 'ATMs available near Exit Gates in all terminals.',
      washrooms: 'Clean and free washrooms inside Arrivals and near parking waiting areas.',
      trolleys: 'Free luggage trolleys available near baggage claim and till the parking lot.'
    }
  }
};

export const fleetPagesData = [
  {
    slug: 'hatchback',
    categoryName: 'Hatchback Cabs',
    suitableRoutes: ['City tours', 'Short intercity drops (e.g., Delhi to Agra)', 'Airport Transfers'],
    groupSize: '1 to 4 Passengers',
    luggage: '1-2 Small Bags',
    fuelNotes: 'Generally CNG in Delhi NCR, Petrol/Diesel on highways. Fuel type depends on availability. Same vehicle category is guaranteed.',
    plainSuitability: 'Excellent for smooth plain roads and city traffic.',
    hillSuitability: 'Average. Can struggle on steep inclines if fully loaded. Limited luggage space for hill station trips.',
    pros: ['Highly affordable', 'Easy to park in tight spots', 'Great for solo travelers or couples'],
    limitations: ['Not ideal for heavy luggage', 'Less legroom for tall passengers', 'Bumpy ride on very rough roads'],
    typicalModels: ['Maruti WagonR', 'Swift', 'Baleno'],
    faqs: [
      { q: 'Is a hatchback suitable for long trips?', a: 'It is best suited for trips under 4 hours or distances less than 200 km. For longer trips, consider a Sedan.' },
      { q: 'Can I carry 3 large suitcases?', a: 'No, hatchbacks have limited boot space. They can comfortably hold 1 medium and 1 small bag.' }
    ]
  },
  // ... (other fleetPagesData entries omitted for brevity)
];

export const routesData = [
  { id: 1, route: 'Delhi to Haldwani', type: 'One Way', distance: '280 km', vehicle: 'Sedan', originalPrice: '5,999', price: '3,999', slug: 'delhi-to-haldwani-taxi', image: '/images/routes/delhi-to-haldwani-tikonia.webp' },
  { id: 2, route: 'Delhi to Nainital', type: 'One Way', distance: '310 km', vehicle: 'Sedan', originalPrice: '6,999', price: '4,999', slug: 'delhi-to-nainital-taxi', image: '/images/routes/delhi-to-nainital-lake.webp' },
  { id: 3, route: 'Delhi to Rishikesh', type: 'One Way', distance: '250 km', vehicle: 'Sedan', originalPrice: '5,999', price: '3,999', slug: 'delhi-to-rishikesh-taxi', image: '/images/routes/delhi-to-rishikesh-ramjhula.webp' },
  { id: 4, route: 'Delhi to Dehradun', type: 'One Way', distance: '260 km', vehicle: 'Sedan', originalPrice: '5,999', price: '3,999', slug: 'delhi-to-dehradun-taxi', image: '/images/routes/delhi-to-dehradun-route.webp' },
  { id: 5, route: 'Delhi to Ramnagar', type: 'One Way', distance: '260 km', vehicle: 'Sedan', originalPrice: '5,999', price: '3,999', slug: 'delhi-to-ramnagar-taxi', image: '/images/routes/delhi-to-ramnagar-corbett.webp' },
  { id: 6, route: 'Delhi to Haridwar', type: 'One Way', distance: '220 km', vehicle: 'Sedan', originalPrice: '5,999', price: '3,999', slug: 'delhi-to-haridwar-taxi', image: '/images/routes/delhi-to-haridwar-ganga-aarti.webp' },
  { id: 7, route: 'Noida to Haldwani', type: 'One Way', distance: '270 km', vehicle: 'Sedan', originalPrice: '5,999', price: '3,999', slug: 'noida-to-haldwani-taxi', image: '/images/routes/delhi-to-haldwani-tikonia.webp' },
  { id: 8, route: 'Ghaziabad to Haldwani', type: 'One Way', distance: '250 km', vehicle: 'Sedan', originalPrice: '5,999', price: '3,999', slug: 'ghaziabad-to-haldwani-taxi', image: '/images/routes/delhi-to-haldwani-tikonia.webp' },
  { id: 9, route: 'Gurugram to Nainital', type: 'One Way', distance: '330 km', vehicle: 'Sedan', originalPrice: '7,499', price: '5,499', slug: 'gurugram-to-nainital-taxi', image: '/images/routes/delhi-to-nainital-lake.webp' },
  { id: 10, route: 'Faridabad to Rishikesh', type: 'One Way', distance: '280 km', vehicle: 'Sedan', originalPrice: '5,999', price: '4,499', slug: 'faridabad-to-rishikesh-taxi', image: '/images/routes/delhi-to-rishikesh-ramjhula.webp' }
];

export const testimonialsData = [
  { id: 1, name: 'Rahul Sharma', location: 'New Delhi', text: 'Excellent service! Driver was on time, polite and the car was well maintained.', date: '2 days ago', photo: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150&h=150', rating: 5 },
  { id: 2, name: 'Priya Verma', location: 'Gurgaon', text: 'Booked for Delhi to Haridwar trip. Very comfortable journey at best price. The driver was very professional.', date: '1 week ago', photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150', rating: 5 },
  { id: 3, name: 'Amit Singh', location: 'Noida', text: 'Very quick response on WhatsApp and smooth booking experience. I highly recommend Urgent Taxis for outstation trips.', date: '3 weeks ago', photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150', rating: 5 },
  { id: 4, name: 'Neha Kapoor', location: 'Faridabad', text: 'Best taxi service I have ever used. The Innova Crysta was very clean and the driver drove safely on the hills.', date: '1 month ago', photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150&h=150', rating: 5 }
];

export const baseVehicles = [
  { id: 1, name: 'Maruti WagonR', category: 'Hatchback', seats: 4, luggage: 2, ac: true, rating: 4.5, fuelType: 'CNG', image: '/fleet/hatchback-white.png?v=10', blend: true, perKmRate: 10 },
  { id: 2, name: 'Swift Dzire', category: 'Sedan', seats: 4, luggage: 3, ac: true, rating: 4.8, fuelType: 'Diesel', image: '/fleet/sedan-white.png?v=40', blend: true, perKmRate: 11 },
  { id: 3, name: 'Toyota Etios', category: 'Sedan', seats: 4, luggage: 3, ac: true, rating: 4.7, fuelType: 'Petrol', image: '/fleet/sedan-white.png?v=40', blend: true, perKmRate: 11 },
  { id: 4, name: 'Maruti Ertiga', category: 'MUV', seats: 6, luggage: 3, ac: true, rating: 4.6, fuelType: 'CNG', image: '/fleet/muv-white.png?v=40', blend: true, perKmRate: 14 },
  { id: 5, name: 'Toyota Innova Crysta', category: 'SUV', seats: 6, luggage: 4, ac: true, rating: 4.9, fuelType: 'Diesel', image: '/fleet/innova-hycross-official.png?v=40', blend: true, perKmRate: 18 },
  { id: 6, name: 'Force Traveller AC', category: 'Minibus', seats: 12, luggage: 8, ac: true, rating: 4.7, fuelType: 'Diesel', image: '/fleet/traveller-white.png?v=4', perKmRate: 25 }
];

export const servicesData = [
  {
    id: 1,
    slug: 'outstation-one-way',
    title: 'Outstation One Way Taxi',
    desc: 'Affordable one-way drops across cities. Enjoy a comfortable ride without paying for the return journey.',
    img: serviceOneWayImg,
    seoTitle: 'Outstation One Way Taxi Services | Urgent Taxis',
    seoDesc: 'Book reliable one-way outstation taxis. Pay only for one side.'
  },
  {
    id: 2,
    slug: 'outstation-round-trip',
    title: 'Outstation Round Trip Taxi',
    desc: 'Perfect for weekend getaways and business trips. Flexible return options with multi-city travel support.',
    img: serviceRoundTripImg,
    seoTitle: 'Outstation Round Trip Taxi Services | Urgent Taxis',
    seoDesc: 'Book outstation round trip taxis with flexible return options.'
  },
  {
    id: 3,
    slug: 'airport-transfer',
    title: 'Airport Transfer',
    desc: 'Timely and reliable airport pickups and drops. We track your flight to ensure zero waiting time.',
    img: serviceAirportImg,
    seoTitle: 'Airport Transfer Services | Urgent Taxis',
    seoDesc: 'Reliable airport taxi transfers. Timely pickups and drops.'
  },
  {
    id: 4,
    slug: 'local-rental',
    title: 'Local Rental',
    desc: 'Rent a taxi for local city travel. Choose from 4hrs/40kms, 8hrs/80kms or full day packages.',
    img: serviceLocalImg,
    seoTitle: 'Local Taxi Rental Services | Urgent Taxis',
    seoDesc: 'Rent a local taxi for city travel with flexible hourly packages.'
  },
  {
    id: 5,
    slug: 'tour-packages',
    title: 'Tour Packages',
    desc: 'Customized holiday packages for families and groups. Includes sightseeing and dedicated driver.',
    img: serviceTourImg,
    seoTitle: 'Custom Tour Packages | Urgent Taxis',
    seoDesc: 'Book customized holiday tour packages across India.'
  },
  {
    id: 6,
    slug: 'railway-transfer',
    title: 'Railway Transfer',
    desc: 'Hassle-free transfers to and from major railway stations with punctual service.',
    img: serviceRailwayImg,
    seoTitle: 'Railway Transfer Services | Urgent Taxis',
    seoDesc: 'Book reliable railway station transfers.'
  },
  {
    id: 7,
    slug: 'wedding-car-rental',
    title: 'Wedding Car Rental',
    desc: 'Premium luxury cars and spacious MUVs available for wedding events and guest transportation.',
    img: serviceWeddingImg,
    seoTitle: 'Wedding Car Rental Services | Urgent Taxis',
    seoDesc: 'Premium cars for wedding events and guest transport.'
  },
  {
    id: 8,
    slug: 'corporate-taxi',
    title: 'Corporate Taxi',
    desc: 'Professional transportation solutions for corporate clients, business meetings, and employee transit.',
    img: serviceCorporateImg,
    seoTitle: 'Corporate Taxi Services | Urgent Taxis',
    seoDesc: 'Professional taxi services for corporate clients.'
  }
];
