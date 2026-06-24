export const createLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Urgent Taxis",
    "image": "https://urgenttaxis.com/logo.png",
    "url": "https://urgenttaxis.com",
    "telephone": "+917310651940",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Delhi",
      "addressRegion": "Delhi",
      "addressCountry": "IN"
    },
    "priceRange": "₹₹",
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 28.6139,
        "longitude": 77.2090
      },
      "geoRadius": "500000"
    }
  };
};

export const createBreadcrumbSchema = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `https://urgenttaxis.com${crumb.url}`
    }))
  };
};

export const createFAQSchema = (faqs) => {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
};

export const createServiceSchema = (service) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.desc || service.description,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Urgent Taxis"
    },
    "areaServed": "India"
  };
};

export const createRouteSchema = (route) => {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `Taxi from ${route.from} to ${route.to}`,
    "description": route.seo?.metaDescription || route.seoDescription || `Book reliable ${route.from} to ${route.to} outstation taxi service with Urgent Taxis.`,
    "brand": {
      "@type": "Brand",
      "name": "Urgent Taxis"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://urgenttaxis.com/${route.slug}`,
      "priceCurrency": "INR",
      "price": route.price || route.sedanFare || "2500",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Urgent Taxis"
      }
    }
  };
};
export const createArticleSchema = (blog) => {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.seoDescription || blog.excerpt,
    "image": "https://urgenttaxis.com" + blog.featuredImage,
    "author": {
      "@type": "Organization",
      "name": blog.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Urgent Taxis",
      "logo": {
        "@type": "ImageObject",
        "url": "https://urgenttaxis.com/logo.png"
      }
    },
    "datePublished": blog.publishDate,
    "dateModified": blog.updatedDate || blog.publishDate
  };
};

export const createTaxiServiceSchema = (route) => {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": `Taxi from ${route.from} to ${route.to}`,
    "description": `Book reliable and affordable taxi service from ${route.from} to ${route.to} with Urgent Taxis.`,
    "provider": {
      "@type": "LocalBusiness",
      "name": "Urgent Taxis"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": route.from
      },
      {
        "@type": "City",
        "name": route.to
      }
    ],
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": route.price || "2500",
      "url": `https://urgenttaxis.com/${route.slug}`
    }
  };
};

export const createAggregateRatingSchema = (itemReviewedName, ratingValue = "4.9", reviewCount = "150") => {
  return {
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "Organization",
      "name": itemReviewedName || "Urgent Taxis"
    },
    "ratingValue": ratingValue,
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": reviewCount
  };
};

export const createReviewSchema = (review) => {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    "itemReviewed": {
      "@type": "Organization",
      "name": "Urgent Taxis"
    },
    "author": {
      "@type": "Person",
      "name": review.authorName
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating || "5",
      "bestRating": "5"
    },
    "reviewBody": review.reviewText,
    "datePublished": review.publishDate
  };
};

export const createVehicleSchema = (vehicle) => {
  return {
    "@context": "https://schema.org",
    "@type": "Vehicle",
    "name": vehicle.name,
    "vehicleConfiguration": vehicle.type,
    "vehicleSeatingCapacity": vehicle.seats,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "INR",
      "price": vehicle.pricePerKm,
      "unitText": "per km"
    }
  };
};
