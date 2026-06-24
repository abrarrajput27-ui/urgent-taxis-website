import { useEffect } from 'react';

export default function SEOHead({ 
  title, 
  description, 
  canonicalUrl, 
  imageUrl = "https://urgenttaxis.com/images/routes/delhi-to-nainital-lake.webp", 
  type = "website",
  schemas = [] 
}) {
  useEffect(() => {
    // 1. Update Title
    if (title) {
      document.title = title;
    }

    // Helper to update meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return null;
      let meta = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attrName, attrValue);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
      return meta;
    };

    const addedMetas = [];

    // 2. Update Meta Description
    addedMetas.push(setMetaTag('name', 'description', description));

    // 3. Open Graph Tags
    addedMetas.push(setMetaTag('property', 'og:title', title));
    addedMetas.push(setMetaTag('property', 'og:description', description));
    addedMetas.push(setMetaTag('property', 'og:image', imageUrl));
    addedMetas.push(setMetaTag('property', 'og:url', canonicalUrl || window.location.href));
    addedMetas.push(setMetaTag('property', 'og:type', type));

    // 4. Twitter Card Tags
    addedMetas.push(setMetaTag('name', 'twitter:card', 'summary_large_image'));
    addedMetas.push(setMetaTag('name', 'twitter:title', title));
    addedMetas.push(setMetaTag('name', 'twitter:description', description));
    addedMetas.push(setMetaTag('name', 'twitter:image', imageUrl));

    // 5. Update Canonical URL
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (canonicalUrl) {
      if (!linkCanonical) {
        linkCanonical = document.createElement('link');
        linkCanonical.setAttribute('rel', 'canonical');
        document.head.appendChild(linkCanonical);
      }
      linkCanonical.setAttribute('href', canonicalUrl);
    }

    // 6. Schemas are now rendered directly in the React tree below

    // Cleanup function
    return () => {
      // Clean up OG and Twitter tags so they don't linger incorrectly
      addedMetas.filter(Boolean).forEach(meta => {
        if (meta.getAttribute('name') !== 'description') {
          meta.remove();
        }
      });
      if (linkCanonical) {
        linkCanonical.remove();
      }
    };
  }, [title, description, canonicalUrl, imageUrl, type]);

  return (
    <>
      {schemas.map((schema, index) => {
        if (!schema) return null;
        return (
          <script
            key={`seo-schema-${index}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        );
      })}
    </>
  );
}
