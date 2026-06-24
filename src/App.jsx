import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import HomePage from './pages/HomePage';
import ScrollToTop from './components/ScrollToTop';

const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ContactUsPage = lazy(() => import('./pages/ContactUsPage'));
const RouteLandingPage = lazy(() => import('./pages/RouteLandingPage'));
const FleetCategoryPage = lazy(() => import('./pages/FleetCategoryPage'));
const FleetMasterPage = lazy(() => import('./pages/FleetMasterPage'));
const ServiceLandingPage = lazy(() => import('./pages/ServiceLandingPage'));
const RoutesPage = lazy(() => import('./pages/RoutesPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const CityTaxiPage = lazy(() => import('./pages/CityTaxiPage'));

const LazyAdminReviewsPage = lazy(() => import('./pages/AdminReviewsPage'));
const LazyCheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const LazyFareResultsPage = lazy(() => import('./pages/FareResultsPage'));
const LazyReviewsPage = lazy(() => import('./pages/ReviewsPage'));
const LazyBlogListPage = lazy(() => import('./pages/BlogListPage'));
const LazyBlogPostPage = lazy(() => import('./pages/BlogPostPage'));

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fare-results" element={<LazyFareResultsPage />} />
        <Route path="/checkout" element={<LazyCheckoutPage />} />
        <Route path="/service/:slug" element={<ServiceLandingPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/fleet" element={<FleetMasterPage />} />
        <Route path="/fleet/:category" element={<FleetCategoryPage />} />
        <Route path="/reviews" element={<LazyReviewsPage />} />
        <Route path="/admin/reviews" element={<LazyAdminReviewsPage />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/blog" element={<LazyBlogListPage />} />
        <Route path="/blog/:slug" element={<LazyBlogPostPage />} />
        <Route path="/taxi-service-in/:citySlug" element={<CityTaxiPage />} />
        <Route path="/city/:citySlug" element={<CityTaxiPage />} />
        <Route path="/:slug" element={<RouteLandingPage />} />
      </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
