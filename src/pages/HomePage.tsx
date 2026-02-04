// ===============================================
// JUNGLE YOURSELF - HOME PAGE (REFACTORED)
// Split layout: Hero + Testimonials | Kits Sidebar
// ===============================================

import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Star,
  Shield,
  Truck
} from 'lucide-react';
import Button from '../components/ui/Button';
import { products } from '../data/products';

export default function HomePage() {
  // Get featured kits
  const featuredKits = products
    .filter(p => p.type === 'kit')
    .slice(0, 4);

  const testimonials = [
    {
      author: 'María G.',
      location: 'Madrid',
      content: 'I had zero gardening experience and managed to install the Starter Kit in one afternoon. Now I have fresh herbs all summer!',
      rating: 5,
    },
    {
      author: 'Thomas B.',
      location: 'Barcelona',
      content: 'The quality of materials exceeded my expectations. The drainage system handles our heavy autumn rains perfectly.',
      rating: 5,
    },
    {
      author: 'Elena S.',
      location: 'Valencia',
      content: 'Within weeks of installing the Biodiversity Kit, we had bees, butterflies, and even a robin visiting. Magical!',
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-cream">
      {/* Main Split Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 py-8">
          
          {/* LEFT COLUMN - Main Content (70-75%) */}
          <div className="w-full lg:w-3/4">
            
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-forest via-forest to-moss rounded-2xl py-16 px-8 md:py-20 md:px-12 mb-8">
              <div className="max-w-2xl">
                {/* Badge */}
                <span className="inline-block px-4 py-1.5 bg-white/10 text-cream rounded-full text-sm font-medium mb-6">
                  🌱 Build Your Green Terrace in a Weekend
                </span>
                
                {/* Headline - Strictly 2 lines */}
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                  Transform your terrace into a<br />
                  <span className="text-sage">Living Garden</span>
                </h1>
                
                {/* Subtitle */}
                <p className="text-lg md:text-xl text-white/80 mb-8 max-w-xl">
                  Lightweight modular kits by m², clear step-by-step guides, and reliable 
                  shipping across Europe. No gardening experience needed.
                </p>

                {/* CTA Button */}
                <Link to="/calculator">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
                    Create your Project
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>

                {/* Trust Indicators */}
                <div className="flex flex-wrap items-center gap-6 mt-10 text-white/70">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm">30-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    <span className="text-sm">Free Shipping €150+</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-current" />
                    <span className="text-sm">4.9/5 Rating</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-12">
              <h2 className="font-display text-3xl md:text-4xl font-semibold text-charcoal mb-8">
                What Our Customers Say
              </h2>
              <p className="text-charcoal/70 mb-10">
                Join hundreds of happy urban gardeners across Europe.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {testimonials.map((testimonial, index) => (
                  <div 
                    key={index}
                    className="bg-white rounded-xl p-6 border border-sand shadow-sm hover:shadow-md transition-shadow"
                  >
                    {/* Rating */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-terracotta fill-current" />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-charcoal mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-moss/20 rounded-full flex items-center justify-center">
                        <span className="text-moss font-semibold">
                          {testimonial.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-charcoal">{testimonial.author}</p>
                        <p className="text-sm text-charcoal/60">{testimonial.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN - Kits Sidebar (25-30%) */}
          <aside className="w-full lg:w-1/4">
            <div className="bg-sand/30 rounded-2xl p-5 lg:sticky lg:top-24 border border-sand">
              <h2 className="font-display text-2xl font-semibold text-charcoal mb-2">
                Popular Kits
              </h2>
              <p className="text-sm text-charcoal/60 mb-6">
                Everything you need in one box.
              </p>

              {/* Vertical Stack of Kit Cards */}
              <div className="flex flex-col gap-4">
                {featuredKits.map((kit) => (
                  <Link 
                    key={kit.id} 
                    to={`/product/${kit.slug}`}
                    className="block bg-white rounded-xl overflow-hidden border border-sand hover:shadow-md transition-all group"
                  >
                    {/* Kit Image */}
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={kit.images[0]?.url || 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop'}
                        alt={kit.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    
                    {/* Kit Info */}
                    <div className="p-4">
                      <p className="text-xs text-moss font-medium uppercase tracking-wider mb-1">
                        Kit {kit.sizeCategory} m²
                      </p>
                      <h3 className="font-display text-base font-semibold text-charcoal mb-2 line-clamp-2 group-hover:text-moss transition-colors">
                        {kit.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-forest">
                          €{kit.price}
                        </span>
                        <span className="text-xs text-moss flex items-center gap-1">
                          View <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* View All Link */}
              <Link 
                to="/shop" 
                className="block mt-6 text-center py-3 px-4 bg-forest text-white rounded-lg font-medium hover:bg-moss transition-colors"
              >
                View All Kits
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
