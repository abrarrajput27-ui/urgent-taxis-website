import React, { useEffect } from 'react';

export default function GoogleReviews() {
  useEffect(() => {
    // Load the EmbedSocial script only once
    const scriptId = 'EmbedSocialHashtagScript';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://embedsocial.com/cdn/ht.js";
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full py-12 bg-slate-50">
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl md:text-4xl font-black text-[#3b2b98] mb-4">Genuine Customer Reviews</h2>
        <p className="text-lg text-slate-600 font-medium">Read what our customers have to say about us</p>
      </div>
      
      {/* EmbedSocial Google Reviews Widget */}
      <div className="embedsocial-hashtag" data-ref="0d241ea4b2bb88c736d703fa907f708cfcb143aa" data-dynamicload="yes" data-lazyload="yes">
        <a className="feed-powered-by-es feed-powered-by-es-feed-img es-widget-branding" href="https://embedsocial.com/google-reviews-widget/" target="_blank" rel="noreferrer" title="Embed Google reviews">
          <img src="https://embedsocial.com/cdn/icon/embedsocial-logo.webp" alt="EmbedSocial" />
          <div className="es-widget-branding-text">Embed Google reviews</div>
        </a>
      </div>
    </div>
  );
}
