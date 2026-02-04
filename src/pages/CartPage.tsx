// ===============================================
// CART PAGE
// Shopping cart with quantity controls and shipping estimate
// ===============================================

import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ChevronRight,
  ArrowLeft,
  Truck,
  Shield,
  Package,
  Tag
} from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { products } from '../data/products';
import Button from '../components/ui/Button';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, getItemCount, getShippingEstimate, clearCart } = useCartStore();

  const total = getTotal(products);
  const itemCount = getItemCount();
  const shippingInfo = getShippingEstimate(products);
  const freeShippingThreshold = 150;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - total);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-20 h-20 bg-sand/50 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-10 h-10 text-forest/40" />
          </div>
          <h1 className="text-3xl font-display text-forest mb-4">Your Cart is Empty</h1>
          <p className="text-forest/70 mb-8">
            Looks like you haven't added any items yet. Explore our kits and components to 
            start building your green terrace.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/shop">
              <Button size="lg">
                <Package className="w-4 h-4 mr-2" />
                Browse Products
              </Button>
            </Link>
            <Link to="/kit-finder">
              <Button variant="outline" size="lg">
                Find Your Kit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link to="/shop" className="inline-flex items-center gap-2 text-moss hover:text-forest mb-2 transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Continue shopping</span>
            </Link>
            <h1 className="text-3xl font-display text-forest">
              Your Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-forest/60 hover:text-terracotta transition-colors"
          >
            Clear cart
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => {
              const product = products.find(p => p.id === item.productId);
              if (!product) return null;
              
              return (
                <div
                  key={item.productId}
                  className="bg-white rounded-xl p-4 lg:p-6 shadow-sm"
                >
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link to={`/product/${product.slug}`} className="flex-shrink-0">
                      <img
                        src={product.images[0]?.url || 'https://via.placeholder.com/128'}
                        alt={product.name}
                        className="w-24 h-24 lg:w-32 lg:h-32 object-cover rounded-lg"
                      />
                    </Link>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <div>
                          <Link 
                            to={`/product/${product.slug}`}
                            className="font-display text-forest hover:text-moss transition-colors line-clamp-2"
                          >
                            {product.name}
                          </Link>
                          <p className="text-sm text-forest/60 mt-1">
                            {product.type === 'kit' && product.coverageM2 && (
                              <>Covers {product.coverageM2.min}–{product.coverageM2.max} m²</>
                            )}
                          </p>
                        </div>
                        <p className="font-display text-forest text-lg">
                          €{(product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.productId, Math.max(0, item.quantity - 1))}
                            className="w-8 h-8 flex items-center justify-center border border-sand rounded-lg 
                                     hover:bg-sand/50 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4 text-forest" />
                          </button>
                          <span className="w-10 text-center font-medium text-forest">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center border border-sand rounded-lg 
                                     hover:bg-sand/50 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4 text-forest" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.productId)}
                          className="flex items-center gap-1 text-sm text-forest/60 hover:text-terracotta transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>

                      {/* Unit Price */}
                      <p className="text-sm text-forest/60 mt-2">
                        €{product.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Free Shipping Progress */}
            {remainingForFreeShipping > 0 && (
              <div className="bg-moss/10 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Truck className="w-5 h-5 text-moss" />
                  <p className="text-forest">
                    Add <strong>€{remainingForFreeShipping.toFixed(2)}</strong> more for free shipping!
                  </p>
                </div>
                <div className="h-2 bg-white rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-moss rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, (total / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-xl font-display text-forest mb-6">Order Summary</h2>

              <div className="space-y-3 pb-4 border-b border-sand">
                <div className="flex justify-between text-forest/70">
                  <span>Subtotal</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-forest/70">
                  <span className="flex items-center gap-1">
                    Shipping
                    <span className="text-xs text-forest/50">(estimate)</span>
                  </span>
                  {total >= freeShippingThreshold ? (
                    <span className="text-moss font-medium">FREE</span>
                  ) : (
                    <span>€{shippingInfo.cost.toFixed(2)}</span>
                  )}
                </div>
              </div>

              <div className="flex justify-between py-4 border-b border-sand">
                <span className="text-lg font-medium text-forest">Total</span>
                <span className="text-2xl font-display text-forest">
                  €{(total + (total >= freeShippingThreshold ? 0 : shippingInfo.cost)).toFixed(2)}
                </span>
              </div>

              {/* Promo Code (placeholder) */}
              <div className="py-4">
                <button className="flex items-center gap-2 text-moss hover:text-forest transition-colors">
                  <Tag className="w-4 h-4" />
                  <span className="text-sm font-medium">Add promo code</span>
                </button>
              </div>

              <Link to="/checkout" className="block">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-sand space-y-3">
                <div className="flex items-center gap-2 text-sm text-forest/70">
                  <Shield className="w-4 h-4 text-moss" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-forest/70">
                  <Truck className="w-4 h-4 text-moss" />
                  <span>Free shipping over €150</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-forest/70">
                  <Package className="w-4 h-4 text-moss" />
                  <span>30-day returns</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <section className="mt-16 pt-12 border-t border-sand">
          <h2 className="text-2xl font-display text-forest mb-6">You Might Also Need</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Placeholder suggestions - would normally be dynamic */}
            <Link to="/product/universal-substrate" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&auto=format&fit=crop"
                alt="Universal Substrate"
                className="w-full aspect-square object-cover rounded-lg mb-3"
              />
              <h3 className="font-medium text-forest text-sm">Universal Substrate 25L</h3>
              <p className="text-moss font-display">€18.00</p>
            </Link>
            <Link to="/product/aluminium-edging" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&auto=format&fit=crop"
                alt="Aluminium Edging"
                className="w-full aspect-square object-cover rounded-lg mb-3"
              />
              <h3 className="font-medium text-forest text-sm">Aluminium Edging 2m</h3>
              <p className="text-moss font-display">€24.00</p>
            </Link>
            <Link to="/product/drip-irrigation-kit" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=300&auto=format&fit=crop"
                alt="Drip Irrigation Kit"
                className="w-full aspect-square object-cover rounded-lg mb-3"
              />
              <h3 className="font-medium text-forest text-sm">Drip Irrigation Kit</h3>
              <p className="text-moss font-display">€45.00</p>
            </Link>
            <Link to="/product/pollinator-plant-pack" className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&auto=format&fit=crop"
                alt="Pollinator Plant Pack"
                className="w-full aspect-square object-cover rounded-lg mb-3"
              />
              <h3 className="font-medium text-forest text-sm">Pollinator Plant Pack</h3>
              <p className="text-moss font-display">€65.00</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
