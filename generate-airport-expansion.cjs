const fs = require("fs");
const path = require("path");

const destinations = [
  "Delhi", "New Delhi", "Noida", "Greater Noida", "Ghaziabad", "Gurugram", "Faridabad", "Sonipat", "Panipat", "Rohtak", "Bahadurgarh",
  "Haldwani", "Nainital", "Bhimtal", "Sattal", "Mukteshwar", "Kainchi Dham", "Ramnagar", "Jim Corbett", "Rudrapur", "Almora", "Ranikhet", "Kausani", "Haridwar", "Rishikesh", "Dehradun", "Mussoorie",
  "Agra", "Mathura", "Vrindavan", "Bareilly", "Moradabad", "Rampur", "Lucknow", "Ayodhya", "Prayagraj", "Varanasi", "Gorakhpur", "Kanpur", "Aligarh", "Meerut",
  "Jaipur", "Ajmer", "Pushkar", "Udaipur", "Jodhpur",
  "Karnal", "Kurukshetra", "Ambala",
  "Chandigarh", "Amritsar", "Ludhiana", "Jalandhar",
  "Shimla", "Manali", "Dharamshala", "Dalhousie", "Kasol",
  "Jammu", "Srinagar"
];

const uniqueDestinations = [...new Set(destinations)];

function generateSlug(from, to) {
  return `${from}-to-${to}-taxi`.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function generateRouteObjects() {
  const routes = [];
  let idCounter = 1000;

  const airports = [
    {
      name: "Noida International Airport",
      aliases: ["jewar airport", "noida airport", "noida international airport jewar", "jewar international airport"],
      image: "/images/routes/jewar-airport.webp",
      shortName: "Jewar Airport"
    },
    {
      name: "Delhi Airport",
      aliases: ["igi airport", "indira gandhi airport", "delhi airport t3", "delhi airport t1", "delhi airport t2"],
      image: "/images/routes/default-airport-transfer.webp",
      shortName: "Delhi Airport"
    }
  ];

  for (const airport of airports) {
    for (const city of uniqueDestinations) {
      if (airport.name.toLowerCase() === city.toLowerCase() || airport.name.includes(city) && city !== "Delhi" && city !== "Noida") {
         // Skip self-routes like Delhi Airport to Delhi? No, the user wants "Delhi Airport to Delhi". 
         // But Noida International Airport to Noida is fine.
      }

      // Airport to Destination
      routes.push({
        id: idCounter++,
        fromCity: airport.name,
        fromAliases: airport.aliases,
        toCity: city,
        routeSlug: generateSlug(airport.name, city),
        seoTitle: `${airport.name} to ${city} Taxi Fare | ${airport.shortName} Cab`,
        seoDescription: `Book reliable ${airport.name} to ${city} taxi with Urgent Taxis. Compare fares. Quick booking, 100% transparent pricing.`,
        slug: generateSlug(airport.name, city),
        from: airport.name,
        to: city,
        route: `${airport.name} to ${city}`,
        type: "One Way",
        distance: "Call for exact distance",
        travelTime: "Call for exact time",
        vehicle: "Sedan, Ertiga, Innova Crysta",
        price: "On Request",
        originalPrice: "On Request",
        sedanFare: "On Request",
        ertigaFare: "On Request",
        crystaFare: "On Request",
        image: airport.image,
        heroImage: airport.image,
        imageVerified: true,
        seo: {
          title: `${airport.name} to ${city} Taxi Fare | ${airport.shortName} Cab`,
          metaDescription: `Book reliable ${airport.name} to ${city} taxi with Urgent Taxis. Compare fares. Quick booking, 100% transparent pricing.`,
          h1: `${airport.name} to ${city} Taxi Service`,
          subtitle: `Book reliable ${airport.name} to ${city} taxi with transparent fare, clean cabs and fast support.`
        },
        content: {
          about: `Are you planning a trip from ${airport.name} to ${city}? Booking a reliable taxi service has never been easier with Urgent Taxis. Whether you need a quick one way taxi for a solo journey or a spacious vehicle for a group vacation, we have the perfect ride tailored to your needs. Our well-maintained fleet includes comfortable premium Sedans, spacious Maruti Suzuki Ertigas, and the luxurious Toyota Innova Crysta, ensuring a smooth and relaxing travel experience. We pride ourselves on offering a completely transparent fare structure, which means no hidden costs or surprise charges at the end of your trip. We provide convenient pickup directly from the airport to your exact drop location in ${city}. Our professional chauffeurs are highly experienced, making us the top choice for family vacations, important business trips, and tourist travel. Ready to start your journey? Get an instant quote or confirm your booking in seconds through a quick WhatsApp message or a direct call. Choose Urgent Taxis for your drop and travel with absolute peace of mind.`,
          faqs: [
            {
              question: `What is the taxi fare from ${airport.name} to ${city}?`,
              answer: "The fare is currently On Request. Please contact us for the latest and most accurate pricing for Sedans, SUVs, and Tempo Travellers."
            },
            {
              question: `How can I book a ${airport.name} to ${city} taxi?`,
              answer: "You can book by calling 7310651940 or sending your trip details on WhatsApp at 8595066033."
            },
            {
              question: `Do you provide airport pickup at ${airport.name}?`,
              answer: "Yes, we provide reliable and timely airport pickups with flight tracking to ensure zero waiting time."
            },
            {
              question: "Are there any hidden charges in the fare?",
              answer: "No, we strictly follow a 100% transparent pricing policy with zero hidden charges."
            },
            {
              question: "Which vehicles are available for this route?",
              answer: "We offer Sedans (Dzire/Etios), SUVs (Ertiga/Innova Crysta), and Tempo Travellers based on your group size."
            },
            {
              question: "Do I need to pay advance for booking?",
              answer: "A nominal token amount may be required to confirm your booking, with the rest payable directly to the driver."
            },
            {
              question: "Are the drivers experienced on this route?",
              answer: "Absolutely. All our drivers are highly experienced, verified, and familiar with the route to ensure a safe journey."
            },
            {
              question: "Can I book a round trip instead of one-way?",
              answer: "Yes, we offer both one-way drops and flexible round-trip packages customized to your travel itinerary."
            }
          ]
        },
        availableServices: [
          "Airport Transfer",
          "One Way Taxi",
          "Round Trip Taxi",
          "Corporate Taxi Service"
        ]
      });

      // Destination to Airport
      routes.push({
        id: idCounter++,
        fromCity: city,
        toCity: airport.name,
        toAliases: airport.aliases,
        routeSlug: generateSlug(city, airport.name),
        seoTitle: `${city} to ${airport.name} Taxi Fare | ${airport.shortName} Drop`,
        seoDescription: `Book reliable ${city} to ${airport.name} taxi with Urgent Taxis. Compare fares. Quick booking, 100% transparent pricing.`,
        slug: generateSlug(city, airport.name),
        from: city,
        to: airport.name,
        route: `${city} to ${airport.name}`,
        type: "One Way",
        distance: "Call for exact distance",
        travelTime: "Call for exact time",
        vehicle: "Sedan, Ertiga, Innova Crysta",
        price: "On Request",
        originalPrice: "On Request",
        sedanFare: "On Request",
        ertigaFare: "On Request",
        crystaFare: "On Request",
        image: airport.image,
        heroImage: airport.image,
        imageVerified: true,
        seo: {
          title: `${city} to ${airport.name} Taxi Fare | ${airport.shortName} Drop`,
          metaDescription: `Book reliable ${city} to ${airport.name} taxi with Urgent Taxis. Compare fares. Quick booking, 100% transparent pricing.`,
          h1: `${city} to ${airport.name} Taxi Service`,
          subtitle: `Book reliable ${city} to ${airport.name} taxi with transparent fare, clean cabs and fast support.`
        },
        content: {
          about: `Are you planning a trip from ${city} to ${airport.name}? Booking a reliable taxi service has never been easier with Urgent Taxis. Whether you need a quick one way taxi for a solo journey or a spacious vehicle for a group vacation, we have the perfect ride tailored to your needs. Our well-maintained fleet includes comfortable premium Sedans, spacious Maruti Suzuki Ertigas, and the luxurious Toyota Innova Crysta, ensuring a smooth and relaxing travel experience. We pride ourselves on offering a completely transparent fare structure, which means no hidden costs or surprise charges at the end of your trip. We provide convenient door-to-door service directly from your location to the airport. Our professional chauffeurs are highly experienced, making us the top choice for timely airport drops. Ready to start your journey? Get an instant quote or confirm your booking in seconds through a quick WhatsApp message or a direct call. Choose Urgent Taxis for your drop and travel with absolute peace of mind.`,
          faqs: [
            {
              question: `What is the taxi fare from ${city} to ${airport.name}?`,
              answer: "The fare is currently On Request. Please contact us for the latest and most accurate pricing for Sedans, SUVs, and Tempo Travellers."
            },
            {
              question: `How can I book a ${city} to ${airport.name} taxi?`,
              answer: "You can book by calling 7310651940 or sending your trip details on WhatsApp at 8595066033."
            },
            {
              question: `Do you guarantee on-time drop at ${airport.name}?`,
              answer: "Yes, we understand the importance of catching a flight and ensure punctual pickups for all airport drops."
            },
            {
              question: "Are there any hidden charges in the fare?",
              answer: "No, we strictly follow a 100% transparent pricing policy with zero hidden charges."
            },
            {
              question: "Which vehicles are available for this route?",
              answer: "We offer Sedans (Dzire/Etios), SUVs (Ertiga/Innova Crysta), and Tempo Travellers based on your group size."
            },
            {
              question: "Do I need to pay advance for booking?",
              answer: "A nominal token amount may be required to confirm your booking, with the rest payable directly to the driver."
            },
            {
              question: "Are the drivers experienced on this route?",
              answer: "Absolutely. All our drivers are highly experienced, verified, and familiar with the route to ensure a safe journey."
            },
            {
              question: "Can I book a round trip instead of one-way?",
              answer: "Yes, we offer both one-way drops and flexible round-trip packages customized to your travel itinerary."
            }
          ]
        },
        availableServices: [
          "Airport Transfer",
          "One Way Taxi",
          "Round Trip Taxi",
          "Corporate Taxi Service"
        ]
      });
    }
  }

  return routes;
}

function processRoutesFile() {
  const routesPath = path.join("src", "data", "routes.js");
  let content = fs.readFileSync(routesPath, "utf8");

  // Since it's a JS file, we will find the start of the array and the end.
  // Wait, parsing JS is hard. Let's use regex to find existing objects that have fromCity or toCity as our airports, and remove them.
  // Actually, the previous Jewar routes were added at the end. We can just split by "export const routes = ["
  
  // A safer way is to read the file, evaluate it to get the array, filter the array, then write it back.
  // We can strip "export const routes = " and parse it, but there might be imports or images.
  // Since there are imports like `import serviceAirportImg from ...`, evaluating is tricky.
}

// Let's write a simpler regex based replacer, or just write a script that generates the objects as a string and appends them.
// We can manually remove the 20 Jewar routes from routes.js and then append the 172 new ones.

// Just generate the 172 routes as a string to console or file, then I will insert them.
const newRoutes = generateRouteObjects();
fs.writeFileSync("generated_routes.json", JSON.stringify(newRoutes, null, 2), "utf8");
console.log("Generated " + newRoutes.length + " routes to generated_routes.json");

// Generate indexing priority list
let priorityUrls = [];
priorityUrls.push("https://urgenttaxis.com/city/noida-international-airport");
priorityUrls.push("https://urgenttaxis.com/city/delhi-airport");

newRoutes.slice(0, 98).forEach(r => {
  priorityUrls.push("https://urgenttaxis.com/" + r.slug);
});

fs.writeFileSync("airport-index-priority.md", priorityUrls.join("\n"), "utf8");
console.log("Generated airport-index-priority.md");

