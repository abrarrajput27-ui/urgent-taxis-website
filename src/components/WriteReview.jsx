// src/components/WriteReview.jsx

import React, { useState } from 'react';
import { Star } from 'lucide-react';

export default function WriteReview({ onClose, onSubmit }) {
  const [reviewerName, setReviewerName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reviewerName.trim() || !reviewText.trim()) {
      alert('Please fill in your name and review text.');
      return;
    }
    onSubmit({ reviewerName, rating, reviewText, profilePhoto });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-4">Write a Review</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Your Name</label>
            <input
              type="text"
              className="w-full border rounded px-3 py-2"
              value={reviewerName}
              onChange={(e) => setReviewerName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Rating</label>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  size={24}
                  className={i <= rating ? "text-yellow-400 fill-current cursor-pointer" : "text-slate-200 cursor-pointer"}
                  onClick={() => setRating(i)}
                />
              ))}
            </div>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Review Text</label>
            <textarea
              className="w-full border rounded px-3 py-2"
              rows={4}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium mb-1">Image URL (optional)</label>
            <input
              type="url"
              className="w-full border rounded px-3 py-2"
              placeholder="https://example.com/avatar.jpg"
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={onClose}>Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}
