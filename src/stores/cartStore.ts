// ===============================================
// JUNGLE YOURSELF - CART STORE
// State management with Zustand
// ===============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem, Product } from '../types';
import analytics from '../utils/analytics';

interface CartStore {
  items: CartItem[];
  addItem: (productId: string, quantity?: number, product?: Product) => void;
  removeItem: (productId: string, product?: Product) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: (products: Product[]) => number;
  getItemCount: () => number;
  getShippingEstimate: (products: Product[]) => { weight: number; cost: number };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (productId: string, quantity: number = 1, product?: Product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.productId === productId);
          
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          
          return {
            items: [...state.items, { productId, quantity }],
          };
        });

        // Track analytics
        if (product) {
          analytics.addToCart(productId, product.name, quantity, product.price * quantity);
        }
      },

      removeItem: (productId: string, product?: Product) => {
        const item = get().items.find(i => i.productId === productId);
        
        set((state) => ({
          items: state.items.filter(item => item.productId !== productId),
        }));

        // Track analytics
        if (product && item) {
          analytics.removeFromCart(productId, product.name, item.quantity);
        }
      },

      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }

        set((state) => ({
          items: state.items.map(item =>
            item.productId === productId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: (products: Product[]) => {
        return get().items.reduce((total, item) => {
          const product = products.find(p => p.id === item.productId);
          return total + (product ? product.price * item.quantity : 0);
        }, 0);
      },

      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },

      getShippingEstimate: (products: Product[]) => {
        const totalWeight = get().items.reduce((weight, item) => {
          const product = products.find(p => p.id === item.productId);
          return weight + (product ? product.weightPerUnit * item.quantity : 0);
        }, 0);

        // Simplified shipping cost calculation
        // In production, this would call a shipping API
        let cost = 0;
        if (totalWeight <= 5) {
          cost = 9.95;
        } else if (totalWeight <= 20) {
          cost = 19.95;
        } else if (totalWeight <= 50) {
          cost = 34.95;
        } else {
          cost = 49.95 + Math.ceil((totalWeight - 50) / 25) * 15;
        }

        return { weight: totalWeight, cost };
      },
    }),
    {
      name: 'jungle-yourself-cart',
    }
  )
);

export default useCartStore;
