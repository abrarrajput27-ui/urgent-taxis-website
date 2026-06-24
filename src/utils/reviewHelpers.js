// src/utils/reviewHelpers.js

/**
 * Helper functions to manage custom reviews stored in browser LocalStorage.
 * All reviews have the shape:
 * {
 *   id: string,
 *   reviewerName: string,
 *   rating: number (1-5),
 *   reviewText: string,
 *   profilePhoto: string (optional URL),
 *   date: string (ISO date),
 *   status: 'pending' | 'approved' | 'rejected'
 * }
 */

const STORAGE_KEY = 'customReviews';

function loadCustomReviews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Failed to parse custom reviews from LocalStorage', e);
    return [];
  }
}

function saveCustomReviews(reviews) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reviews));
}

export function getAllReviews() {
  // This will be used by the public component. It returns an array of reviews
  // that are either Google active reviews or locally stored approved reviews.
  // Importing the Google data is done in the consumer to avoid circular deps.
  const custom = loadCustomReviews();
  return custom.filter(r => r.status === 'approved');
}

export function getPendingReviews() {
  const custom = loadCustomReviews();
  return custom.filter(r => r.status === 'pending');
}

export function addReview(review) {
  const custom = loadCustomReviews();
  custom.push({ ...review, id: `${Date.now()}_${Math.random()}` });
  saveCustomReviews(custom);
}

export function updateReviewStatus(id, newStatus) {
  const custom = loadCustomReviews();
  const idx = custom.findIndex(r => r.id === id);
  if (idx !== -1) {
    custom[idx].status = newStatus;
    // update last updated date
    custom[idx].date = new Date().toISOString().split('T')[0];
    saveCustomReviews(custom);
  }
}

export function deleteReview(id) {
  const custom = loadCustomReviews();
  const filtered = custom.filter(r => r.id !== id);
  saveCustomReviews(filtered);
}
