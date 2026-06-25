import React, { useState, useEffect } from 'react';
import { Star, ShieldCheck, UserCircle2 } from 'lucide-react';
import { googleReviewsData } from '../data/reviewsData';
import { getAllReviews, addReview } from '../utils/reviewHelpers';
import WriteReview from './WriteReview';

export default function GoogleReviews() {
  const [showForm, setShowForm] = useState(false);
  const [combinedReviews, setCombinedReviews] = useState([]);

  // Load reviews (Google active + approved custom) whenever component mounts or a new review is added
  useEffect(() => {
    const googleActive = googleReviewsData.filter(r => r.status === 'active');
    const customApproved = getAllReviews();
    setCombinedReviews([...googleActive, ...customApproved]);
  }, []);

  const handleSubmit = (newReview) => {
    const review = {
      reviewerName: newReview.reviewerName,
      rating: newReview.rating,
      reviewText: newReview.reviewText,
      profilePhoto: newReview.profilePhoto || '',
      date: new Date().toISOString().split('T')[0],
      status: 'pending',
    };
    addReview(review);
    setShowForm(false);
    // Refresh list (only approved will show)
    const googleActive = googleReviewsData.filter(r => r.status === 'active');
    const customApproved = getAllReviews();
    setCombinedReviews([...googleActive, ...customApproved]);
  };

  const activeReviews = combinedReviews;

  if (activeReviews.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-12 text-center">
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 flex flex-col items-center justify-center">
          <ShieldCheck size={48} className="text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-700 mb-2">Google Reviews Sync is Being Prepared</h3>
          <p className="text-slate-500 max-w-lg mx-auto">
            Genuine customer reviews will appear here after verification. We only show real reviews directly from our Google Business Profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-[#3b2b98] mb-3">Genuine Google Reviews</h2>
        <div className="flex flex-col items-center justify-center gap-2 text-slate-600">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-slate-800">4.9</span>
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={24} className="text-yellow-400 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-500">(50+ Reviews)</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <ShieldCheck size={20} className="text-green-600" />
            <p className="font-medium">Verified reviews from our Google Business Profile</p>
          </div>
        </div>
        {/* Add Review Button */}
        <button
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => setShowForm(true)}
        >
          <Star size={16} /> Write a Review
        </button>
      </div>

      {showForm && <WriteReview onClose={() => setShowForm(false)} onSubmit={handleSubmit} />}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeReviews.map((review, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-md border border-slate-100 p-6 flex flex-col h-full">
            <div className="flex items-center gap-4 mb-4">
              {review.profilePhoto ? (
                <img src={review.profilePhoto} alt={review.reviewerName} loading="lazy" decoding="async" className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <UserCircle2 size={48} className="text-slate-300" />
              )}
              <div>
                <h4 className="font-bold text-slate-800">{review.reviewerName}</h4>
                <p className="text-xs text-slate-500">{review.date || review.reviewDate}</p>
              </div>
            </div>

            <div className="flex items-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} className={i < review.rating ? "text-yellow-400 fill-current" : "text-slate-200"} />
              ))}
            </div>

            <p className="text-slate-600 text-sm leading-relaxed flex-grow">{review.reviewText}</p>

            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1 font-medium text-slate-500">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"/></svg>
                Google Review
              </span>
              <span>Synced: {review.lastSyncedAt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
