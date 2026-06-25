import React, { useEffect } from 'react';

export default function GoogleReviews() {
  useEffect(() => {
    // Load the SociableKIT script only once
    const scriptId = 'sociablekit-google-reviews';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.src = "https://widgets.sociablekit.com/google-reviews/widget.js";
      script.defer = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-black text-[#3b2b98] mb-4">Genuine Customer Reviews</h2>
        <p className="text-lg text-slate-600 font-medium">Read what our customers have to say about us</p>
      </div>
      
      {/* SociableKIT Google Reviews Widget */}
      <div className="sk-ww-google-reviews w-full" data-embed-id="25692559"></div>
    </div>
  );
}
