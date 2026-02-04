// ===============================================
// JUNGLE YOURSELF - HEADER COMPONENT
// Main navigation and search
// ===============================================

import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown,
  Leaf
} from 'lucide-react';
import { useCartStore } from '../../stores/cartStore';
import { products } from '../../data/products';
import { searchProducts, getSearchSuggestions } from '../../utils/search';
import analytics from '../../utils/analytics';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const itemCount = useCartStore(state => state.getItemCount());

  // Handle click outside search
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
        setSuggestions([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update suggestions as user types
  useEffect(() => {
    if (searchQuery.length >= 2) {
      setSuggestions(getSearchSuggestions(products, searchQuery));
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const results = searchProducts(products, searchQuery);
      analytics.search(searchQuery, results.length);
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { name: 'Shop', href: '/shop', hasDropdown: true },
    { name: 'Kit Finder', href: '/kit-finder' },
    { name: 'Guides', href: '/guides' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Support', href: '/support' },
  ];

  const shopCategories = [
    { name: 'All Products', href: '/shop' },
    { name: 'Kits by Size', items: [
      { name: '2-5 m²', href: '/shop?size=2-5' },
      { name: '5-10 m²', href: '/shop?size=5-10' },
      { name: '10-20 m²', href: '/shop?size=10-20' },
    ]},
    { name: 'Kits by Goal', items: [
      { name: 'Low Maintenance', href: '/shop?goal=low-maintenance' },
      { name: 'Biodiversity', href: '/shop?goal=biodiversity' },
      { name: 'Aesthetics', href: '/shop?goal=aesthetics' },
      { name: 'Shade Garden', href: '/shop?goal=shade' },
      { name: 'Drainage Focus', href: '/shop?goal=drainage' },
    ]},
    { name: 'Components', items: [
      { name: 'Membranes', href: '/shop?type=component&category=membrane' },
      { name: 'Drainage', href: '/shop?type=component&category=drainage' },
      { name: 'Substrate', href: '/shop?type=component&category=substrate' },
      { name: 'Edging', href: '/shop?type=component&category=edging' },
      { name: 'Irrigation', href: '/shop?type=component&category=irrigation' },
      { name: 'Plants', href: '/shop?type=component&category=plants' },
    ]},
  ];

  return (
    <header className="sticky top-0 z-50 bg-warm-white/95 backdrop-blur-sm border-b border-sand">
      {/* Top Bar */}
      <div className="bg-forest text-cream text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <span className="animate-fade-in">🌿 Free shipping on orders over €150 | Build your green terrace in a weekend</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
            aria-label="Jungle Yourself - Home"
          >
            <Leaf className="w-8 h-8 text-moss transition-transform group-hover:rotate-12" />
            <span className="font-display text-2xl md:text-3xl font-semibold text-forest tracking-tight">
              Jungle Yourself
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <div 
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setShopDropdownOpen(true)}
                onMouseLeave={() => setShopDropdownOpen(false)}
              >
                <Link
                  to={link.href}
                  className="flex items-center gap-1 text-charcoal hover:text-moss transition-colors font-medium"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Shop Dropdown */}
                {link.hasDropdown && shopDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-64 bg-warm-white rounded-lg shadow-lg border border-sand p-4 animate-fade-in"
                    role="menu"
                  >
                    {shopCategories.map((category, idx) => (
                      <div key={idx} className="mb-4 last:mb-0">
                        {category.items ? (
                          <>
                            <span className="text-xs font-semibold text-moss uppercase tracking-wider">
                              {category.name}
                            </span>
                            <div className="mt-2 space-y-1">
                              {category.items.map((item) => (
                                <Link
                                  key={item.href}
                                  to={item.href}
                                  className="block px-2 py-1 text-charcoal hover:text-moss hover:bg-cream rounded transition-colors"
                                  role="menuitem"
                                >
                                  {item.name}
                                </Link>
                              ))}
                            </div>
                          </>
                        ) : (
                          <Link
                            to={category.href || '#'}
                            className="block font-medium text-charcoal hover:text-moss transition-colors"
                            role="menuitem"
                          >
                            {category.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-charcoal hover:text-moss transition-colors"
                aria-label="Search products"
              >
                <Search className="w-5 h-5" />
              </button>

              {searchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-warm-white rounded-lg shadow-lg border border-sand p-4 animate-slide-in">
                  <form onSubmit={handleSearch}>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-4 pr-10 py-2 border border-sand rounded-lg focus:outline-none focus:ring-2 focus:ring-moss/50 focus:border-moss"
                        autoFocus
                      />
                      <button 
                        type="submit"
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-moss"
                      >
                        <Search className="w-4 h-4" />
                      </button>
                    </div>
                  </form>

                  {suggestions.length > 0 && (
                    <div className="mt-2 border-t border-sand pt-2">
                      {suggestions.map((suggestion, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setSearchQuery(suggestion);
                            navigate(`/shop?search=${encodeURIComponent(suggestion)}`);
                            setSearchOpen(false);
                          }}
                          className="block w-full text-left px-2 py-1 text-sm text-charcoal hover:bg-cream rounded"
                        >
                          {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative p-2 text-charcoal hover:text-moss transition-colors"
              aria-label={`Shopping cart with ${itemCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-terracotta text-warm-white text-xs font-medium rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-charcoal hover:text-moss transition-colors"
              aria-label="Toggle menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-warm-white border-t border-sand animate-fade-in">
          <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-charcoal hover:text-moss transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-sand">
              <Link
                to="/sample-project"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-charcoal hover:text-moss transition-colors"
              >
                Sample Project
              </Link>
              <Link
                to="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-charcoal hover:text-moss transition-colors"
              >
                FAQ
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
