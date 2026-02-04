// ===============================================
// JUNGLE YOURSELF - FOOTER COMPONENT
// ===============================================

import { Link } from 'react-router-dom';
import { Leaf, Mail, Phone, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'All Products', href: '/shop' },
      { name: 'Kits', href: '/shop?type=kit' },
      { name: 'Components', href: '/shop?type=component' },
      { name: 'Kit Finder', href: '/kit-finder' },
      { name: 'Calculator', href: '/calculator' },
    ],
    learn: [
      { name: 'Guides', href: '/guides' },
      { name: 'Sample Project', href: '/sample-project' },
      { name: 'FAQ', href: '/faq' },
      { name: 'Installation Tips', href: '/guides/installation-step-by-step' },
    ],
    support: [
      { name: 'Contact Us', href: '/support' },
      { name: 'Shipping Info', href: '/support#shipping' },
      { name: 'Returns', href: '/support#returns' },
      { name: 'Track Order', href: '/support#track' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms & Conditions', href: '/terms' },
      { name: 'Disclaimer', href: '/disclaimer' },
      { name: 'Cookie Policy', href: '/cookies' },
    ],
  };

  return (
    <footer className="bg-forest text-cream">
      {/* Newsletter Section */}
      <div className="border-b border-forest-light">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-3xl mb-2">Join the Urban Jungle</h3>
            <p className="text-sage mb-6">
              Get growing tips, project inspiration, and exclusive offers delivered to your inbox.
            </p>
            <form 
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
              onSubmit={(e) => {
                e.preventDefault();
                // Placeholder - would integrate with email service
                alert('Thank you for subscribing! (Demo only)');
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg bg-forest-light border border-sage/30 text-cream placeholder-sage focus:outline-none focus:ring-2 focus:ring-sage/50"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-terracotta hover:bg-terracotta-dark text-warm-white font-medium rounded-lg transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Leaf className="w-7 h-7 text-sage" />
              <span className="font-display text-2xl font-semibold">Jungle Yourself</span>
            </Link>
            <p className="text-sage mb-6 max-w-xs">
              Build your green terrace in a weekend with lightweight modular kits, 
              clear guides, and reliable shipping across Europe.
            </p>
            <div className="space-y-2 text-sage">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>hola@jungleyourself.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Barcelona, Spain</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-warm-white mb-4">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sage hover:text-warm-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learn Links */}
          <div>
            <h4 className="font-semibold text-warm-white mb-4">Learn</h4>
            <ul className="space-y-2">
              {footerLinks.learn.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sage hover:text-warm-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-warm-white mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sage hover:text-warm-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-warm-white mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-sage hover:text-warm-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-forest-light">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sage text-sm">
              © {currentYear} Jungle Yourself. All rights reserved.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sage hover:text-warm-white transition-colors"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sage hover:text-warm-white transition-colors"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-sage hover:text-warm-white transition-colors"
                aria-label="Watch us on YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Payment Methods Placeholder */}
            <div className="flex items-center gap-2 text-sage text-sm">
              <span>We accept:</span>
              <span className="px-2 py-1 bg-forest-light rounded text-xs">Visa</span>
              <span className="px-2 py-1 bg-forest-light rounded text-xs">Mastercard</span>
              <span className="px-2 py-1 bg-forest-light rounded text-xs">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
