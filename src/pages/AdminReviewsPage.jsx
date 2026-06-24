import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEOHead from '../components/SEOHead';
import { createBreadcrumbSchema } from '../utils/seoHelpers';
import { getPendingReviews, updateReviewStatus, deleteReview } from '../utils/reviewHelpers';

export default function AdminReviewsPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [pending, setPending] = useState([]);

  const breadcrumbItems = [
    { name: 'Admin', url: '/admin' },
    { name: 'Reviews', url: '/admin/reviews' }
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setAuthenticated(true);
    } else {
      alert('Incorrect password');
    }
  };

  const loadPending = () => {
    const list = getPendingReviews();
    setPending(list);
  };

  useEffect(() => {
    if (authenticated) loadPending();
  }, [authenticated]);

  const handleAction = (id, action) => {
    if (action === 'approve') updateReviewStatus(id, 'approved');
    else if (action === 'reject') updateReviewStatus(id, 'rejected');
    else if (action === 'delete') deleteReview(id);
    loadPending();
  };

  // Login screen – centered card, no header/footer
  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans selection:bg-blue-200">
        <SEOHead
          title="Admin Login"
          description="Admin login to manage reviews"
          canonicalUrl="https://urgenttaxis.com/admin/login"
          schemas={[createBreadcrumbSchema(breadcrumbItems)]}
        />
        <form onSubmit={handleLogin} className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded px-3 py-2 mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Enter Admin Panel
          </button>
        </form>
      </div>
    );
  }

  // Dashboard layout – header, centered content, footer at bottom
  return (
    <div className="bg-slate-50">
      <SEOHead title="Admin Review Management" description="Manage reviews" />
      <Header />
      <main className="max-w-5xl mx-auto px-4 pt-24 pb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center">Pending Reviews ({pending.length})</h2>
        {pending.length > 0 ? (
          <div className="space-y-4 sm:space-y-6">
            {pending.map((review) => (
              <div key={review.id} className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
                <p className="font-semibold text-sm sm:text-base truncate">{review.reviewerName}</p>
                <p className="text-slate-600 my-1 sm:my-2 text-xs sm:text-sm truncate">{review.reviewText}</p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <button className="bg-blue-600 text-white px-3 py-1 text-sm sm:text-base rounded w-full sm:w-auto" onClick={() => handleAction(review.id, 'approve')}>Approve</button>
                  <button className="bg-gray-200 px-3 py-1 text-sm sm:text-base rounded w-full sm:w-auto" onClick={() => handleAction(review.id, 'reject')}>Reject</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 text-center">
            <h3 className="text-lg sm:text-xl font-semibold mb-2">No pending reviews</h3>
            <p className="text-slate-600 text-sm sm:text-base">All reviews are processed.</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
