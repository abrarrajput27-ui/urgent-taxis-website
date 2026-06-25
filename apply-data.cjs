const fs = require("fs");
const path = require("path");

// 1. Process routes.js
const routesPath = path.join("src", "data", "routes.js");
let routesContent = fs.readFileSync(routesPath, "utf8");

// Remove the 20 old Jewar routes. I know they were appended at the end.
// Let's split the file by "fromCity": "Noida International Airport"
// Wait, the safest way is to find the index of the first occurrence of "Noida International Airport",
// and then backtrack to the start of that object "{" and cut the string there.
const firstNoidaIndex = routesContent.indexOf(`"fromCity": "Noida International Airport"`);
if (firstNoidaIndex !== -1) {
  const cutIndex = routesContent.lastIndexOf(`  {`, firstNoidaIndex);
  if (cutIndex !== -1) {
    routesContent = routesContent.substring(0, cutIndex).trim();
    if (routesContent.endsWith(",")) {
      routesContent = routesContent.substring(0, routesContent.length - 1);
    }
  }
} else {
  // If no Jewar routes were found, just remove the closing bracket
  routesContent = routesContent.replace(/\];[\s\S]*$/, "").trim();
  if (routesContent.endsWith(",")) {
    routesContent = routesContent.substring(0, routesContent.length - 1);
  }
}

// Ensure the content doesn't have a trailing comma before we append
if (routesContent.endsWith(",")) {
  routesContent = routesContent.substring(0, routesContent.length - 1);
}

const generatedRoutes = JSON.parse(fs.readFileSync("generated_routes.json", "utf8"));
// Convert to string without brackets
let newRoutesStr = JSON.stringify(generatedRoutes, null, 2);
newRoutesStr = newRoutesStr.substring(2, newRoutesStr.length - 2);

// Assemble
routesContent = routesContent + ",\n  " + newRoutesStr + "\n];\n";

fs.writeFileSync(routesPath, routesContent, "utf8");
console.log("Updated routes.js");

// 2. Process cities.js
const citiesPath = path.join("src", "data", "cities.js");
let citiesContent = fs.readFileSync(citiesPath, "utf8");

const newCities = [
  {
    id: 901,
    cityName: "Noida International Airport",
    state: "Uttar Pradesh",
    citySlug: "noida-international-airport",
    image: "/images/routes/jewar-airport.webp",
    seoTitle: "Taxi Service in Noida International Airport (Jewar) | Urgent Taxis",
    seoDescription: "Book reliable taxi service from Noida International Airport (Jewar). Outstation cabs, airport drops, and pickups to Delhi NCR, UP, and Uttarakhand.",
    h1: "Taxi Service at Noida International Airport (Jewar)",
    subtitle: "Book reliable outstation taxi and airport transfers from Jewar Airport.",
    mainServices: [
      "Airport Transfer",
      "Outstation One Way Taxi",
      "Outstation Round Trip Taxi",
      "Corporate Taxi Service"
    ],
    popularRoutes: [
      "Noida International Airport to Delhi",
      "Noida International Airport to Noida",
      "Noida International Airport to Greater Noida",
      "Noida International Airport to Gurugram",
      "Noida International Airport to Haldwani",
      "Noida International Airport to Agra"
    ],
    about: "Welcome to Urgent Taxis at Noida International Airport (Jewar). As the newest and most prominent aviation hub in North India, Jewar Airport connects you to major cities across Delhi NCR, Uttar Pradesh, Uttarakhand, and beyond. We provide dedicated, 24/7 airport transfer services ensuring you never miss a flight and always reach your destination comfortably. Whether you need a quick drop to Greater Noida or an outstation trip to Agra or Nainital, our verified drivers and premium fleet are at your service.",
    faqs: [
      {
        question: "How do I book a taxi from Noida International Airport?",
        answer: "You can easily book a cab by calling our 24/7 helpline or sending a quick WhatsApp message. We provide instant confirmations."
      },
      {
        question: "Are your taxis available 24/7 at Jewar Airport?",
        answer: "Yes, our airport taxi services operate 24/7 to accommodate all flight schedules, including late-night arrivals and early-morning departures."
      }
    ]
  },
  {
    id: 902,
    cityName: "Delhi Airport",
    state: "Delhi",
    citySlug: "delhi-airport",
    image: "/images/routes/default-airport-transfer.webp",
    seoTitle: "Taxi Service at Delhi Airport (IGI) | Urgent Taxis",
    seoDescription: "Book reliable taxi service from Indira Gandhi International (IGI) Airport Delhi. Premium cabs, airport transfers, and outstation taxis.",
    h1: "Taxi Service at Delhi Airport (IGI)",
    subtitle: "Book reliable outstation taxi and airport transfers from Delhi Airport.",
    mainServices: [
      "Airport Transfer",
      "Outstation One Way Taxi",
      "Outstation Round Trip Taxi",
      "Corporate Taxi Service"
    ],
    popularRoutes: [
      "Delhi Airport to Chandigarh",
      "Delhi Airport to Jaipur",
      "Delhi Airport to Haldwani",
      "Delhi Airport to Dehradun",
      "Delhi Airport to Agra",
      "Delhi Airport to Haridwar"
    ],
    about: "Urgent Taxis provides premium and hassle-free airport transfer services at Indira Gandhi International (IGI) Airport, Delhi. Navigating through India's busiest airport can be stressful, which is why we offer reliable pickups, comfortable drops, and outstation connections right from the terminal. Whether you need a quick ride into the city or a long-distance taxi to Punjab, Rajasthan, or Uttarakhand, our extensive fleet of Sedans, SUVs, and Tempo Travellers is ready for you.",
    faqs: [
      {
        question: "Do you offer pickups from T1, T2, and T3 at Delhi Airport?",
        answer: "Yes, we provide seamless pickups and drops across all terminals (T1, T2, and T3) at IGI Airport."
      },
      {
        question: "Can I book a taxi from Delhi Airport to an outstation city?",
        answer: "Absolutely! We specialize in outstation trips directly from Delhi Airport to cities like Jaipur, Agra, Chandigarh, and Dehradun."
      }
    ]
  }
];

citiesContent = citiesContent.replace(/\];[\s\S]*$/, "").trim();
if (citiesContent.endsWith(",")) {
  citiesContent = citiesContent.substring(0, citiesContent.length - 1);
}

let newCitiesStr = JSON.stringify(newCities, null, 2);
newCitiesStr = newCitiesStr.substring(2, newCitiesStr.length - 2);

citiesContent = citiesContent + ",\n  " + newCitiesStr + "\n];\n";
fs.writeFileSync(citiesPath, citiesContent, "utf8");
console.log("Updated cities.js");

