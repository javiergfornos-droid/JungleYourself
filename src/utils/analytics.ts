// ===============================================
// JUNGLE YOURSELF - ANALYTICS UTILITY
// Placeholder implementation with console logging
// Replace with actual analytics service in production
// ===============================================

import type { AnalyticsEvent, AnalyticsPayload } from '../types';

/**
 * Track an analytics event
 * In production, this would send to Google Analytics, Mixpanel, etc.
 */
export const trackEvent = (event: AnalyticsEvent, data?: Record<string, unknown>): void => {
  const payload: AnalyticsPayload = {
    event,
    data,
    timestamp: Date.now(),
  };

  // Log to console for development
  console.log(`📊 [Analytics] ${event}`, payload);

  // In production, you would send this to your analytics service:
  // window.gtag?.('event', event, data);
  // mixpanel.track(event, data);
  // etc.
};

// Convenience functions for common events
export const analytics = {
  viewItem: (productId: string, productName: string, price: number) => {
    trackEvent('view_item', { productId, productName, price, currency: 'EUR' });
  },

  addToCart: (productId: string, productName: string, quantity: number, price: number) => {
    trackEvent('add_to_cart', { productId, productName, quantity, price, currency: 'EUR' });
  },

  removeFromCart: (productId: string, productName: string, quantity: number) => {
    trackEvent('remove_from_cart', { productId, productName, quantity });
  },

  beginCheckout: (cartTotal: number, itemCount: number) => {
    trackEvent('begin_checkout', { cartTotal, itemCount, currency: 'EUR' });
  },

  purchase: (orderId: string, total: number, items: Array<{ id: string; quantity: number }>) => {
    trackEvent('purchase', { orderId, total, items, currency: 'EUR' });
  },

  search: (query: string, resultsCount: number) => {
    trackEvent('search', { query, resultsCount });
  },

  filterApplied: (filterType: string, filterValue: string | string[]) => {
    trackEvent('filter_applied', { filterType, filterValue });
  },

  wizardStarted: () => {
    trackEvent('wizard_started', {});
  },

  wizardCompleted: (recommendations: string[], selections: Record<string, unknown>) => {
    trackEvent('wizard_completed', { recommendations, selections });
  },

  guideViewed: (guideId: string, guideTitle: string) => {
    trackEvent('guide_viewed', { guideId, guideTitle });
  },
};

export default analytics;
