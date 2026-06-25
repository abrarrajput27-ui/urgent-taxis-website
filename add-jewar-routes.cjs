const fs = require("fs");
const path = require("path");

const routesFile = path.join("src", "data", "routes.js");
let content = fs.readFileSync(routesFile, "utf8");

const cities = [
  "Delhi", "Noida", "Greater Noida", "Ghaziabad", "Gurugram", 
  "Faridabad", "Haldwani", "Nainital", "Haridwar", "Rishikesh", 
  "Dehradun", "Jim Corbett", "Ramnagar", "Agra", "Mathura", 
  "Vrindavan", "Jaipur", "Lucknow", "Ayodhya", "Chandigarh"
];

const newRoutes = cities.map((city, index) => {
  const toCityLower = city.toLowerCase().replace(/ /g, "-");
  const slug = `noida-international-airport-to-${toCityLower}-taxi`;
  
  return `{
    "id": 9000 + ${index},
    "fromCity": "Noida International Airport",
    "toCity": "${city}",
    "fromAliases": ["jewar airport", "noida airport", "noida international airport jewar", "jewar international airport"],
    "distanceKm": "On Request",
    "duration": "On Request",
    "sedanFare": "On Request",
    "ertigaFare": "On Request",
    "crystaFare": "On Request",
    "routeSlug": "${slug}",
    "seoTitle": "Noida International Airport to ${city} Taxi | Jewar Airport Cab",
    "seoDescription": "Book a reliable taxi from Noida International Airport (Jewar) to ${city}. Transparent fare, experienced drivers, and timely airport pickups.",
    "slug": "${slug}",
    "from": "Noida International Airport",
    "to": "${city}",
    "route": "Noida International Airport to ${city}",
    "type": "One Way",
    "distance": "On Request",
    "travelTime": "On Request",
    "vehicle": "Sedan, Ertiga, Innova Crysta",
    "price": "On Request",
    "originalPrice": "On Request",
    "image": "/images/routes/default-airport-transfer.webp",
    "imageVerified": false,
    "seo": {
      "title": "Noida International Airport to ${city} Taxi | Jewar Airport Cab",
      "metaDescription": "Book a reliable taxi from Noida International Airport (Jewar) to ${city}. Transparent fare, experienced drivers, and timely airport pickups.",
      "h1": "Noida International Airport to ${city} Taxi",
      "subtitle": "Book reliable Noida International Airport (Jewar) to ${city} taxi with timely pickups and clean cabs."
    },
    "content": {
      "about": "Are you landing at the upcoming Noida International Airport (Jewar) and planning your onward journey to ${city}? Booking a reliable taxi service directly from the airport terminal is the most convenient way to travel. Urgent Taxis offers premium, fully sanitized outstation and local cabs to ensure a smooth, hassle-free ride after your flight. We monitor flight timings to provide timely pickups and our chauffeurs assist with your luggage. Whether you need a comfortable Sedan for business travel, a spacious Ertiga for family, or an Innova Crysta for premium comfort, we have you covered. Enjoy a transparent fare structure with absolutely no hidden charges.",
      "faqs": [
        {
          "question": "What is the taxi fare from Noida International Airport to ${city}?",
          "answer": "The fare for a Sedan, Ertiga, or Innova Crysta is currently On Request. Please contact our 24/7 support for the latest accurate fare."
        },
        {
          "question": "How do I book a cab from Jewar Airport to ${city}?",
          "answer": "You can easily book by contacting our 24/7 customer support via WhatsApp or direct call with your flight details."
        },
        {
          "question": "Will the driver wait if my flight is delayed?",
          "answer": "Yes, we monitor flight statuses to ensure your driver is waiting for you exactly when you land at Noida International Airport."
        },
        {
          "question": "Are there any hidden charges?",
          "answer": "No, Urgent Taxis operates on a 100% transparent pricing policy. Any tolls or parking will be clearly communicated."
        },
        {
          "question": "Which vehicles are available from Jewar Airport?",
          "answer": "We offer premium Sedans, Maruti Suzuki Ertigas, and Toyota Innova Crystas."
        },
        {
          "question": "Do you provide late-night airport pickups?",
          "answer": "Yes, our airport taxi service operates 24/7 to accommodate flights landing at any hour."
        },
        {
          "question": "Is luggage assistance provided?",
          "answer": "Absolutely. Our professional chauffeurs will assist you with loading and unloading your luggage at the airport terminal."
        },
        {
          "question": "Can I book a one-way drop from Noida Airport to ${city}?",
          "answer": "Yes, we specialize in one-way taxi services, meaning you only pay for the drop to ${city} without return fare obligations."
        }
      ]
    },
    "availableServices": [
      "Airport Transfer",
      "One Way Taxi",
      "Round Trip Taxi",
      "Local Rental"
    ],
    "importantNotes": [
      "Fare may change based on pickup timing and vehicle availability.",
      "Airport parking and toll taxes are charged as per actuals.",
      "Final fare is confirmed by the Urgent Taxis team before booking."
    ],
    "serviceType": "Airport Transfer",
    "h1": "Noida International Airport to ${city} Taxi",
    "seoSubtitle": "Book reliable Noida International Airport (Jewar) to ${city} taxi with timely pickups and clean cabs.",
    "heroImage": "/images/routes/default-airport-transfer.webp",
    "routeHighlights": "Booking a reliable taxi from Noida International Airport (Jewar) to ${city} has never been easier. Avoid the stress of finding transport after a long flight. Our professional drivers will be waiting for you at the arrivals terminal to assist with your luggage and provide a safe, smooth journey to your destination. We offer specialized one-way drops, family travel MPVs, and luxury business cabs with a strict transparent pricing policy.",
    "pickupPoints": [
      "Noida International Airport (Jewar)",
      "Arrivals Terminal"
    ],
    "dropPoints": [
      "Any location in ${city}"
    ],
    "vehicleOptions": [
      "Sedan",
      "SUV",
      "Innova Crysta"
    ],
    "inclusions": [
      "Driver Allowance"
    ],
    "exclusions": [
      "Airport Parking",
      "Toll Tax",
      "State Tax"
    ],
    "whyChooseUs": "<p>We offer punctual airport pickups, verified chauffeurs, and clean sanitized cars. Our transparent pricing means no surprise costs at the end of your trip.</p>",
    "travelTips": "<ul><li>Share your flight PNR with us so we can track delays.</li><li>Keep your phone charged upon arrival for easy driver coordination.</li></ul>",
    "bestTime": "<p>Available 24/7 for all arriving and departing flights.</p>",
    "bookingProcess": "<p>Contact us via WhatsApp with your flight details. We will share the driver details well before your landing time.</p>",
    "nearbyDestinations": "<ul><li><strong>Greater Noida:</strong> Easily accessible via the Yamuna Expressway.</li><li><strong>Delhi NCR:</strong> Seamless connections to the capital.</li></ul>",
    "fareNotes": "<p>The listed fares are On Request. Airport parking charges and toll taxes (if applicable) are extra and paid as per actuals.</p>",
    "safetyNotes": "<p>All vehicles are GPS-enabled and driven by licensed professionals. We mandate seatbelts and ensure the car is sanitized before airport pickup.</p>",
    "faqs": [
        {
          "question": "What is the taxi fare from Noida International Airport to ${city}?",
          "answer": "The fare for a Sedan, Ertiga, or Innova Crysta is currently On Request. Please contact our 24/7 support for the latest accurate fare."
        },
        {
          "question": "How do I book a cab from Jewar Airport to ${city}?",
          "answer": "You can easily book by contacting our 24/7 customer support via WhatsApp or direct call with your flight details."
        },
        {
          "question": "Will the driver wait if my flight is delayed?",
          "answer": "Yes, we monitor flight statuses to ensure your driver is waiting for you exactly when you land at Noida International Airport."
        },
        {
          "question": "Are there any hidden charges?",
          "answer": "No, Urgent Taxis operates on a 100% transparent pricing policy. Any tolls or parking will be clearly communicated."
        },
        {
          "question": "Which vehicles are available from Jewar Airport?",
          "answer": "We offer premium Sedans, Maruti Suzuki Ertigas, and Toyota Innova Crystas."
        },
        {
          "question": "Do you provide late-night airport pickups?",
          "answer": "Yes, our airport taxi service operates 24/7 to accommodate flights landing at any hour."
        },
        {
          "question": "Is luggage assistance provided?",
          "answer": "Absolutely. Our professional chauffeurs will assist you with loading and unloading your luggage at the airport terminal."
        },
        {
          "question": "Can I book a one-way drop from Noida Airport to ${city}?",
          "answer": "Yes, we specialize in one-way taxi services, meaning you only pay for the drop to ${city} without return fare obligations."
        }
    ]
  }`;
});

const insertPos = content.lastIndexOf("];");
if (insertPos !== -1) {
  const before = content.substring(0, insertPos);
  const after = content.substring(insertPos);
  const newContent = before + ",\n  " + newRoutes.join(",\n  ") + "\n" + after;
  fs.writeFileSync(routesFile, newContent, "utf8");
  console.log("Successfully added 20 new Jewar routes to routes.js");
} else {
  console.error("Could not find end of routes array.");
}

