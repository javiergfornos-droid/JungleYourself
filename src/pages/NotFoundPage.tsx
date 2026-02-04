// ===============================================
// 404 NOT FOUND PAGE
// Friendly error page with helpful navigation
// ===============================================

import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFoundPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Page Not Found - Jungle Yourself';
  }, []);

  const popularPages = [
    { name: 'Shop All Products', path: '/shop', icon: '🌱' },
    { name: 'Kit Finder Wizard', path: '/kit-finder', icon: '🧭' },
    { name: 'Installation Guides', path: '/guides', icon: '📚' },
    { name: 'Calculator', path: '/calculator', icon: '📐' },
    { name: 'FAQ', path: '/faq', icon: '❓' },
    { name: 'Contact Support', path: '/support', icon: '💬' },
  ];

  return (
    <div className="bg-cream min-h-screen py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        {/* Illustration */}
        <div className="mb-8">
          <div className="relative inline-block">
            {/* Plant pot illustration using CSS */}
            <div className="w-48 h-48 mx-auto relative">
              {/* Pot */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-24 bg-terracotta rounded-b-3xl">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-36 h-6 bg-terracotta/80 rounded-full"></div>
              </div>
              {/* Soil */}
              <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-28 h-4 bg-charcoal/30 rounded-t-full"></div>
              {/* Drooping plant */}
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2">
                <div className="text-6xl animate-pulse" style={{ transform: 'rotate(-15deg)' }}>🥀</div>
              </div>
              {/* 404 text */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 font-display text-7xl text-forest/20 font-bold">
                404
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="font-display text-4xl md:text-5xl text-forest mb-4">
          Oops! This page has wilted.
        </h1>
        <p className="text-lg text-charcoal mb-8 max-w-md mx-auto">
          The page you're looking for seems to have dried up. 
          Don't worry – let's help you find your way back to greener pastures.
        </p>

        {/* Primary CTA */}
        <div className="mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-forest text-white font-semibold rounded-lg hover:bg-moss transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Return to Homepage
          </Link>
        </div>

        {/* Popular Pages */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="font-display text-xl text-forest mb-6">
            Popular Pages
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {popularPages.map((page) => (
              <Link
                key={page.path}
                to={page.path}
                className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-sand/30 transition-colors group"
              >
                <span className="text-2xl group-hover:scale-110 transition-transform">
                  {page.icon}
                </span>
                <span className="text-sm text-charcoal text-center group-hover:text-forest transition-colors">
                  {page.name}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Search Suggestion */}
        <div className="mt-10 p-6 bg-sand/30 rounded-xl">
          <p className="text-charcoal mb-4">
            Looking for something specific? Try searching:
          </p>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search products, guides, FAQs..."
              className="w-full px-4 py-3 pl-12 border border-sage/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-moss focus:border-transparent"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const value = (e.target as HTMLInputElement).value;
                  if (value) {
                    window.location.href = `/shop?search=${encodeURIComponent(value)}`;
                  }
                }
              }}
            />
            <svg 
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage"
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-10 text-center">
          <p className="text-sage text-sm">
            Still can't find what you're looking for?{' '}
            <Link to="/support" className="text-moss hover:text-forest underline">
              Contact our support team
            </Link>
          </p>
        </div>

        {/* Fun Facts */}
        <div className="mt-12 pt-8 border-t border-sage/20">
          <p className="text-sm text-sage italic">
            🌿 Fun fact: While you're here, did you know that green roofs can reduce 
            urban temperatures by up to 5°C? Now that's cool!
          </p>
        </div>
      </div>
    </div>
  );
}
