// ===============================================
// CHECKOUT PAGE
// Shipping address form, payment UI placeholder, order summary
// ===============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft,
  CreditCard,
  Lock,
  Truck,
  Check,
  ChevronRight,
  Shield,
  AlertCircle
} from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { products } from '../data/products';
import analytics from '../utils/analytics';
import Button from '../components/ui/Button';

interface ShippingForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  postalCode: string;
  country: string;
}

export default function CheckoutPage() {
  const { items, getTotal, getShippingEstimate, clearCart } = useCartStore();
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  
  const [shippingForm, setShippingForm] = useState<ShippingForm>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    country: 'ES'
  });

  const total = getTotal(products);
  const shippingInfo = getShippingEstimate(products);
  const shipping = total >= 150 ? 0 : shippingInfo.cost;
  const grandTotal = total + shipping;

  // Track begin checkout on mount
  useEffect(() => {
    if (items.length > 0) {
      analytics.beginCheckout(grandTotal, items.length);
    }
  }, []);

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setShippingForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate order ID
    const newOrderId = `JY-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(newOrderId);
    
    // Track purchase
    analytics.purchase(newOrderId, grandTotal, items.map(i => ({ id: i.productId, quantity: i.quantity })));
    
    // Clear cart and show confirmation
    clearCart();
    setStep('confirmation');
    setIsProcessing(false);
  };

  // Redirect if cart is empty and not on confirmation
  if (items.length === 0 && step !== 'confirmation') {
    return (
      <div className="min-h-screen bg-cream py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-display text-forest mb-4">Your Cart is Empty</h1>
          <p className="text-forest/70 mb-8">
            Add some products to your cart before checking out.
          </p>
          <Link to="/shop">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Order Confirmation
  if (step === 'confirmation' && orderId) {
    return (
      <div className="min-h-screen bg-cream py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm text-center">
            <div className="w-20 h-20 bg-moss/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-moss" />
            </div>
            <h1 className="text-3xl font-display text-forest mb-4">Order Confirmed!</h1>
            <p className="text-forest/70 mb-2">
              Thank you for your order. We've sent a confirmation email to{' '}
              <strong>{shippingForm.email}</strong>
            </p>
            <p className="text-lg font-medium text-forest mb-8">
              Order Number: <span className="text-moss">{orderId}</span>
            </p>

            <div className="bg-sand/30 rounded-xl p-6 mb-8 text-left">
              <h2 className="font-display text-forest mb-4">What's Next?</h2>
              <ul className="space-y-3 text-sm text-forest/70">
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-moss text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">1</span>
                  <span>We'll prepare your order within 1-2 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-moss text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">2</span>
                  <span>You'll receive a shipping confirmation with tracking number</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-moss text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs">3</span>
                  <span>Delivery typically takes 3-5 business days in Spain</span>
                </li>
              </ul>
            </div>

            {/* Email Template Preview (for dev purposes) */}
            <details className="text-left mb-8">
              <summary className="cursor-pointer text-sm text-forest/60 hover:text-forest">
                View email template (dev preview)
              </summary>
              <div className="mt-4 p-4 bg-cream rounded-lg text-sm font-mono text-forest/70 overflow-x-auto">
                <p><strong>Subject:</strong> Your Jungle Yourself Order #{orderId}</p>
                <br />
                <p>Hi {shippingForm.firstName},</p>
                <br />
                <p>Thank you for your order! We're excited to help you create your green terrace.</p>
                <br />
                <p><strong>Order Details:</strong></p>
                <p>Order Number: {orderId}</p>
                <p>Total: €{grandTotal.toFixed(2)}</p>
                <br />
                <p><strong>Shipping Address:</strong></p>
                <p>{shippingForm.firstName} {shippingForm.lastName}</p>
                <p>{shippingForm.address}{shippingForm.apartment ? `, ${shippingForm.apartment}` : ''}</p>
                <p>{shippingForm.postalCode} {shippingForm.city}</p>
                <p>{shippingForm.country}</p>
                <br />
                <p>We'll send you another email with tracking information once your order ships.</p>
                <br />
                <p>Need help? Check out our installation guides at jungleyourself.com/guides</p>
                <br />
                <p>Happy gardening!</p>
                <p>The Jungle Yourself Team</p>
              </div>
            </details>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/guides">
                <Button>
                  View Installation Guides
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/">
                <Button variant="outline">
                  Return to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="mb-8">
          <Link to="/cart" className="inline-flex items-center gap-2 text-moss hover:text-forest mb-2 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to cart</span>
          </Link>
          <h1 className="text-3xl font-display text-forest">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-moss' : 'text-forest'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step === 'shipping' ? 'bg-moss text-white' : 'bg-moss/20 text-moss'
            }`}>
              {step === 'payment' || step === 'confirmation' ? <Check className="w-4 h-4" /> : '1'}
            </span>
            <span className="font-medium">Shipping</span>
          </div>
          <div className="flex-1 h-px bg-sand" />
          <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-moss' : 'text-forest/50'}`}>
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
              step === 'payment' ? 'bg-moss text-white' : 
              step === 'confirmation' ? 'bg-moss/20 text-moss' : 'bg-sand text-forest/50'
            }`}>
              {step === 'confirmation' ? <Check className="w-4 h-4" /> : '2'}
            </span>
            <span className="font-medium">Payment</span>
          </div>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            {/* Shipping Form */}
            {step === 'shipping' && (
              <form onSubmit={handleShippingSubmit} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <Truck className="w-5 h-5 text-moss" />
                  <h2 className="text-xl font-display text-forest">Shipping Information</h2>
                </div>

                <div className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-forest mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={shippingForm.firstName}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                                 focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-forest mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={shippingForm.lastName}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                                 focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-forest mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={shippingForm.email}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                                 focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-forest mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={shippingForm.phone}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                                 focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-forest mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={shippingForm.address}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                               focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                    />
                  </div>

                  <div>
                    <label htmlFor="apartment" className="block text-sm font-medium text-forest mb-2">
                      Apartment, suite, etc. (optional)
                    </label>
                    <input
                      type="text"
                      id="apartment"
                      name="apartment"
                      value={shippingForm.apartment}
                      onChange={handleShippingChange}
                      className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                               focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-forest mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        required
                        value={shippingForm.postalCode}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                                 focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-forest mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={shippingForm.city}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                                 focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-sm font-medium text-forest mb-2">
                        Country *
                      </label>
                      <select
                        id="country"
                        name="country"
                        required
                        value={shippingForm.country}
                        onChange={handleShippingChange}
                        className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                                 focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                      >
                        <option value="ES">Spain</option>
                        <option value="PT">Portugal</option>
                        <option value="FR">France</option>
                        <option value="IT">Italy</option>
                        <option value="DE">Germany</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button type="submit" size="lg" className="w-full sm:w-auto">
                    Continue to Payment
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            )}

            {/* Payment Form */}
            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard className="w-5 h-5 text-moss" />
                  <h2 className="text-xl font-display text-forest">Payment Information</h2>
                </div>

                {/* Shipping Summary */}
                <div className="bg-sand/30 rounded-xl p-4 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-forest/60">Shipping to</p>
                      <p className="font-medium text-forest">
                        {shippingForm.firstName} {shippingForm.lastName}
                      </p>
                      <p className="text-sm text-forest/70">
                        {shippingForm.address}, {shippingForm.postalCode} {shippingForm.city}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="text-sm text-moss hover:underline"
                    >
                      Edit
                    </button>
                  </div>
                </div>

                {/* Payment UI Placeholder */}
                <div className="border-2 border-dashed border-sand rounded-xl p-8 text-center mb-6">
                  <Lock className="w-8 h-8 text-forest/40 mx-auto mb-3" />
                  <p className="font-medium text-forest mb-2">Payment Form Placeholder</p>
                  <p className="text-sm text-forest/60 mb-4">
                    In production, this would integrate with Stripe, PayPal, or another payment processor.
                  </p>
                  <div className="flex justify-center gap-4">
                    <img src="https://js.stripe.com/v3/fingerprinted/img/visa-729c05c240c4bdb47b03ac81d9945bfe.svg" alt="Visa" className="h-6" />
                    <img src="https://js.stripe.com/v3/fingerprinted/img/mastercard-4d8844094130711885b5e41b28c9848f.svg" alt="Mastercard" className="h-6" />
                    <img src="https://js.stripe.com/v3/fingerprinted/img/amex-a49b82f46c5cd6a96a6e418a6ca1717c.svg" alt="Amex" className="h-6" />
                  </div>
                </div>

                {/* Demo Note */}
                <div className="p-4 bg-terracotta/10 border border-terracotta/20 rounded-xl mb-6">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-forest/80">
                      <strong>Demo Mode:</strong> This is a demo checkout. Click "Place Order" to simulate 
                      a successful payment and see the confirmation page.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setStep('shipping')}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit" size="lg" disabled={isProcessing}>
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Place Order — €{grandTotal.toFixed(2)}
                      </>
                    )}
                  </Button>
                </div>

                <p className="mt-4 text-sm text-forest/60 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Your payment information is encrypted and secure.
                </p>
              </form>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="mt-8 lg:mt-0">
            <div className="bg-white rounded-xl p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-display text-forest mb-4">Order Summary</h2>

              {/* Items */}
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {items.map(item => {
                  const product = products.find(p => p.id === item.productId);
                  if (!product) return null;
                  return (
                    <div key={item.productId} className="flex gap-3">
                      <div className="relative">
                        <img
                          src={product.images[0]?.url || 'https://via.placeholder.com/64'}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-moss text-white text-xs 
                                       rounded-full flex items-center justify-center">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-forest truncate">{product.name}</p>
                        <p className="text-sm text-forest/60">€{(product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Totals */}
              <div className="border-t border-sand pt-4 space-y-2">
                <div className="flex justify-between text-sm text-forest/70">
                  <span>Subtotal</span>
                  <span>€{total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-forest/70">
                  <span>Shipping</span>
                  {shipping === 0 ? (
                    <span className="text-moss font-medium">FREE</span>
                  ) : (
                    <span>€{shipping.toFixed(2)}</span>
                  )}
                </div>
                <div className="flex justify-between pt-2 border-t border-sand">
                  <span className="font-medium text-forest">Total</span>
                  <span className="text-xl font-display text-forest">€{grandTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
