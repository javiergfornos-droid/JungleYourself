// ===============================================
// JUNGLE YOURSELF - SHOP PAGE
// Product listing with filters and search
// ===============================================

import { useState, useMemo, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  SlidersHorizontal, 
  X, 
  ChevronDown, 
  Search,
  Grid3X3,
  LayoutList,
  Sparkles
} from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import type { 
  FilterState, 
  SizeCategory, 
  Exposure, 
  MaintenanceLevel, 
  Goal, 
  ProductType 
} from '../types';
import analytics from '../utils/analytics';

// Filter configuration
const SIZE_OPTIONS: { value: SizeCategory; label: string }[] = [
  { value: '2-5', label: '2-5 m² (Small)' },
  { value: '5-10', label: '5-10 m² (Medium)' },
  { value: '10-20', label: '10-20 m² (Large)' },
];

const EXPOSURE_OPTIONS: { value: Exposure; label: string }[] = [
  { value: 'full-sun', label: 'Full Sun' },
  { value: 'partial-shade', label: 'Partial Shade' },
  { value: 'shade', label: 'Shade' },
];

const MAINTENANCE_OPTIONS: { value: MaintenanceLevel; label: string }[] = [
  { value: 'low', label: 'Low Maintenance' },
  { value: 'medium', label: 'Medium Maintenance' },
  { value: 'high', label: 'High Maintenance' },
];

const GOAL_OPTIONS: { value: Goal; label: string }[] = [
  { value: 'low-maintenance', label: 'Low Maintenance' },
  { value: 'biodiversity', label: 'Biodiversity' },
  { value: 'aesthetics', label: 'Aesthetics' },
  { value: 'shade', label: 'Shade Tolerant' },
  { value: 'drainage', label: 'Good Drainage' },
  { value: 'edible', label: 'Edible Garden' },
];

const PRODUCT_TYPE_OPTIONS: { value: ProductType; label: string }[] = [
  { value: 'kit', label: 'Complete Kits' },
  { value: 'component', label: 'Individual Components' },
];

const initialFilters: FilterState = {
  sizeCategory: [],
  exposure: [],
  maintenance: [],
  goals: [],
  priceRange: { min: 0, max: 1000 },
  productType: [],
};

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState<FilterState>(initialFilters);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'name' | 'popular'>('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Initialize from URL params
  useEffect(() => {
    const type = searchParams.get('type');
    const size = searchParams.get('size');
    const goal = searchParams.get('goal');
    
    if (type || size || goal) {
      setFilters(prev => ({
        ...prev,
        productType: type ? [type as ProductType] : [],
        sizeCategory: size ? [size as SizeCategory] : [],
        goals: goal ? [goal as Goal] : [],
      }));
    }
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.goals.some(g => g.toLowerCase().includes(query))
      );
    }

    // Product type filter
    if (filters.productType.length > 0) {
      result = result.filter(p => filters.productType.includes(p.type));
    }

    // Size category filter (kits only)
    if (filters.sizeCategory.length > 0) {
      result = result.filter(p => 
        p.sizeCategory && filters.sizeCategory.includes(p.sizeCategory)
      );
    }

    // Exposure filter
    if (filters.exposure.length > 0) {
      result = result.filter(p => 
        p.exposure.some(e => filters.exposure.includes(e))
      );
    }

    // Maintenance filter
    if (filters.maintenance.length > 0) {
      result = result.filter(p => filters.maintenance.includes(p.maintenance));
    }

    // Goals filter
    if (filters.goals.length > 0) {
      result = result.filter(p => 
        p.goals.some(g => filters.goals.includes(g))
      );
    }

    // Price range filter
    result = result.filter(p => 
      p.price >= filters.priceRange.min && p.price <= filters.priceRange.max
    );

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'popular':
      default:
        result.sort((a, b) => {
          const aScore = a.badges.includes('best-seller') ? 10 : 0;
          const bScore = b.badges.includes('best-seller') ? 10 : 0;
          return bScore - aScore;
        });
    }

    return result;
  }, [products, filters, searchQuery, sortBy]);

  // Track filter changes
  const handleFilterChange = <K extends keyof FilterState>(
    key: K, 
    value: FilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    // Convert value to string for analytics
    const analyticsValue = Array.isArray(value) 
      ? value 
      : typeof value === 'object' 
        ? JSON.stringify(value) 
        : String(value);
    analytics.filterApplied(key, analyticsValue);
  };

  const toggleArrayFilter = <T extends string>(
    key: keyof FilterState,
    value: T,
    currentArray: T[]
  ) => {
    const newArray = currentArray.includes(value)
      ? currentArray.filter(v => v !== value)
      : [...currentArray, value];
    handleFilterChange(key, newArray as FilterState[typeof key]);
  };

  const clearFilters = () => {
    setFilters(initialFilters);
    setSearchQuery('');
    setSearchParams({});
  };

  const activeFilterCount = 
    filters.sizeCategory.length +
    filters.exposure.length +
    filters.maintenance.length +
    filters.goals.length +
    filters.productType.length +
    (filters.priceRange.min > 0 || filters.priceRange.max < 1000 ? 1 : 0);

  // Kits and Components counts
  const kitsCount = products.filter(p => p.type === 'kit').length;
  const componentsCount = products.filter(p => p.type === 'component').length;

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest to-forest-light py-16 overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-30" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4 animate-fade-in-up">
            Shop Green Terrace Solutions
          </h1>
          <p className="text-sage text-lg max-w-2xl mx-auto animate-fade-in-up stagger-1">
            {kitsCount} complete kits and {componentsCount} individual components for every terrace size and style.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Category Links */}
        <div className="flex flex-wrap gap-3 mb-8 animate-fade-in-up stagger-2">
          <Link 
            to="/shop?type=kit"
            className="px-4 py-2 bg-moss/10 hover:bg-moss/20 text-moss rounded-full text-sm font-medium transition-colors"
          >
            🌿 Complete Kits
          </Link>
          <Link 
            to="/shop?size=2-5"
            className="px-4 py-2 bg-moss/10 hover:bg-moss/20 text-moss rounded-full text-sm font-medium transition-colors"
          >
            2-5 m²
          </Link>
          <Link 
            to="/shop?size=5-10"
            className="px-4 py-2 bg-moss/10 hover:bg-moss/20 text-moss rounded-full text-sm font-medium transition-colors"
          >
            5-10 m²
          </Link>
          <Link 
            to="/shop?size=10-20"
            className="px-4 py-2 bg-moss/10 hover:bg-moss/20 text-moss rounded-full text-sm font-medium transition-colors"
          >
            10-20 m²
          </Link>
          <Link 
            to="/shop?goal=biodiversity"
            className="px-4 py-2 bg-moss/10 hover:bg-moss/20 text-moss rounded-full text-sm font-medium transition-colors"
          >
            🦋 Biodiversity
          </Link>
          <Link 
            to="/shop?type=component"
            className="px-4 py-2 bg-moss/10 hover:bg-moss/20 text-moss rounded-full text-sm font-medium transition-colors"
          >
            🔧 Components
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Search */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-sand/50">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="bg-white rounded-xl p-4 shadow-sm border border-sand/50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-charcoal">Filters</h3>
                  {activeFilterCount > 0 && (
                    <button 
                      onClick={clearFilters}
                      className="text-xs text-terracotta hover:text-terracotta-dark"
                    >
                      Clear all
                    </button>
                  )}
                </div>

                {/* Product Type */}
                <FilterSection title="Product Type">
                  {PRODUCT_TYPE_OPTIONS.map(option => (
                    <FilterCheckbox
                      key={option.value}
                      label={option.label}
                      checked={filters.productType.includes(option.value)}
                      onChange={() => toggleArrayFilter('productType', option.value, filters.productType)}
                    />
                  ))}
                </FilterSection>

                {/* Size Category */}
                <FilterSection title="Size (Kits)">
                  {SIZE_OPTIONS.map(option => (
                    <FilterCheckbox
                      key={option.value}
                      label={option.label}
                      checked={filters.sizeCategory.includes(option.value)}
                      onChange={() => toggleArrayFilter('sizeCategory', option.value, filters.sizeCategory)}
                    />
                  ))}
                </FilterSection>

                {/* Exposure */}
                <FilterSection title="Sun Exposure">
                  {EXPOSURE_OPTIONS.map(option => (
                    <FilterCheckbox
                      key={option.value}
                      label={option.label}
                      checked={filters.exposure.includes(option.value)}
                      onChange={() => toggleArrayFilter('exposure', option.value, filters.exposure)}
                    />
                  ))}
                </FilterSection>

                {/* Maintenance */}
                <FilterSection title="Maintenance Level">
                  {MAINTENANCE_OPTIONS.map(option => (
                    <FilterCheckbox
                      key={option.value}
                      label={option.label}
                      checked={filters.maintenance.includes(option.value)}
                      onChange={() => toggleArrayFilter('maintenance', option.value, filters.maintenance)}
                    />
                  ))}
                </FilterSection>

                {/* Goals */}
                <FilterSection title="Goals">
                  {GOAL_OPTIONS.map(option => (
                    <FilterCheckbox
                      key={option.value}
                      label={option.label}
                      checked={filters.goals.includes(option.value)}
                      onChange={() => toggleArrayFilter('goals', option.value, filters.goals)}
                    />
                  ))}
                </FilterSection>

                {/* Price Range */}
                <FilterSection title="Price Range">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.priceRange.min || ''}
                        onChange={(e) => handleFilterChange('priceRange', {
                          ...filters.priceRange,
                          min: Number(e.target.value) || 0
                        })}
                        className="w-full px-3 py-1.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moss/20"
                      />
                      <span className="text-charcoal/40">–</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.priceRange.max === 1000 ? '' : filters.priceRange.max}
                        onChange={(e) => handleFilterChange('priceRange', {
                          ...filters.priceRange,
                          max: Number(e.target.value) || 1000
                        })}
                        className="w-full px-3 py-1.5 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moss/20"
                      />
                    </div>
                  </div>
                </FilterSection>
              </div>

              {/* Kit Finder CTA */}
              <Link 
                to="/kit-finder"
                className="block bg-gradient-to-br from-terracotta to-terracotta-dark rounded-xl p-4 text-white hover:shadow-lg transition-shadow"
              >
                <Sparkles className="w-6 h-6 mb-2" />
                <h4 className="font-semibold mb-1">Not sure which kit?</h4>
                <p className="text-sm text-white/80">Find your perfect match in 60 seconds →</p>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b border-sand/50">
              <div className="flex items-center gap-4">
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-sand rounded-lg text-sm font-medium hover:bg-cream transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                  {activeFilterCount > 0 && (
                    <span className="bg-moss text-white text-xs px-1.5 py-0.5 rounded-full">
                      {activeFilterCount}
                    </span>
                  )}
                </button>

                <p className="text-sm text-charcoal/60">
                  <span className="font-medium text-charcoal">{filteredProducts.length}</span> products
                </p>
              </div>

              <div className="flex items-center gap-4">
                {/* Sort */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                    className="appearance-none pl-3 pr-8 py-2 bg-white border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moss/20 cursor-pointer"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40 pointer-events-none" />
                </div>

                {/* View Toggle */}
                <div className="hidden sm:flex items-center border border-sand rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-moss text-white' : 'bg-white text-charcoal hover:bg-cream'} transition-colors`}
                    aria-label="Grid view"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-moss text-white' : 'bg-white text-charcoal hover:bg-cream'} transition-colors`}
                    aria-label="List view"
                  >
                    <LayoutList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Active Filters */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-sm text-charcoal/60">Active filters:</span>
                {filters.productType.map(type => (
                  <FilterTag 
                    key={type} 
                    label={PRODUCT_TYPE_OPTIONS.find(o => o.value === type)?.label || type}
                    onRemove={() => toggleArrayFilter('productType', type, filters.productType)}
                  />
                ))}
                {filters.sizeCategory.map(size => (
                  <FilterTag 
                    key={size} 
                    label={SIZE_OPTIONS.find(o => o.value === size)?.label || size}
                    onRemove={() => toggleArrayFilter('sizeCategory', size, filters.sizeCategory)}
                  />
                ))}
                {filters.exposure.map(exp => (
                  <FilterTag 
                    key={exp} 
                    label={EXPOSURE_OPTIONS.find(o => o.value === exp)?.label || exp}
                    onRemove={() => toggleArrayFilter('exposure', exp, filters.exposure)}
                  />
                ))}
                {filters.maintenance.map(m => (
                  <FilterTag 
                    key={m} 
                    label={MAINTENANCE_OPTIONS.find(o => o.value === m)?.label || m}
                    onRemove={() => toggleArrayFilter('maintenance', m, filters.maintenance)}
                  />
                ))}
                {filters.goals.map(goal => (
                  <FilterTag 
                    key={goal} 
                    label={GOAL_OPTIONS.find(o => o.value === goal)?.label || goal}
                    onRemove={() => toggleArrayFilter('goals', goal, filters.goals)}
                  />
                ))}
                <button
                  onClick={clearFilters}
                  className="text-sm text-terracotta hover:text-terracotta-dark underline"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-4'
              }>
                {filteredProducts.map((product, index) => (
                  <div 
                    key={product.id} 
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <ProductCard 
                      product={product} 
                      variant={viewMode === 'list' ? 'list' : 'grid'}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-sand/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-charcoal/30" />
                </div>
                <h3 className="font-display text-xl text-charcoal mb-2">No products found</h3>
                <p className="text-charcoal/60 mb-4">Try adjusting your filters or search terms.</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-moss text-white rounded-lg hover:bg-forest transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white overflow-y-auto animate-slide-in">
            <div className="sticky top-0 bg-white border-b border-sand p-4 flex items-center justify-between">
              <h2 className="font-semibold text-lg">Filters</h2>
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="p-2 hover:bg-sand/50 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-4 space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-sand rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-moss/20"
                />
              </div>

              {/* Product Type */}
              <FilterSection title="Product Type">
                {PRODUCT_TYPE_OPTIONS.map(option => (
                  <FilterCheckbox
                    key={option.value}
                    label={option.label}
                    checked={filters.productType.includes(option.value)}
                    onChange={() => toggleArrayFilter('productType', option.value, filters.productType)}
                  />
                ))}
              </FilterSection>

              {/* Size */}
              <FilterSection title="Size (Kits)">
                {SIZE_OPTIONS.map(option => (
                  <FilterCheckbox
                    key={option.value}
                    label={option.label}
                    checked={filters.sizeCategory.includes(option.value)}
                    onChange={() => toggleArrayFilter('sizeCategory', option.value, filters.sizeCategory)}
                  />
                ))}
              </FilterSection>

              {/* Exposure */}
              <FilterSection title="Sun Exposure">
                {EXPOSURE_OPTIONS.map(option => (
                  <FilterCheckbox
                    key={option.value}
                    label={option.label}
                    checked={filters.exposure.includes(option.value)}
                    onChange={() => toggleArrayFilter('exposure', option.value, filters.exposure)}
                  />
                ))}
              </FilterSection>

              {/* Maintenance */}
              <FilterSection title="Maintenance Level">
                {MAINTENANCE_OPTIONS.map(option => (
                  <FilterCheckbox
                    key={option.value}
                    label={option.label}
                    checked={filters.maintenance.includes(option.value)}
                    onChange={() => toggleArrayFilter('maintenance', option.value, filters.maintenance)}
                  />
                ))}
              </FilterSection>

              {/* Goals */}
              <FilterSection title="Goals">
                {GOAL_OPTIONS.map(option => (
                  <FilterCheckbox
                    key={option.value}
                    label={option.label}
                    checked={filters.goals.includes(option.value)}
                    onChange={() => toggleArrayFilter('goals', option.value, filters.goals)}
                  />
                ))}
              </FilterSection>
            </div>

            <div className="sticky bottom-0 bg-white border-t border-sand p-4 space-y-3">
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full py-3 bg-moss text-white rounded-lg font-medium hover:bg-forest transition-colors"
              >
                Show {filteredProducts.length} results
              </button>
              <button
                onClick={clearFilters}
                className="w-full py-2 text-terracotta hover:text-terracotta-dark text-sm"
              >
                Clear all filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Filter Section Component
function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className="border-b border-sand/50 pb-4 mb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-2 text-left"
      >
        <span className="text-sm font-medium text-charcoal">{title}</span>
        <ChevronDown className={`w-4 h-4 text-charcoal/40 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  );
}

// Filter Checkbox Component
function FilterCheckbox({ 
  label, 
  checked, 
  onChange 
}: { 
  label: string; 
  checked: boolean; 
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-sand text-moss focus:ring-moss/20"
      />
      <span className="text-sm text-charcoal/70 group-hover:text-charcoal transition-colors">
        {label}
      </span>
    </label>
  );
}

// Filter Tag Component
function FilterTag({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 bg-moss/10 text-moss text-sm rounded-full">
      {label}
      <button 
        onClick={onRemove}
        className="hover:bg-moss/20 rounded-full p-0.5"
        aria-label={`Remove ${label} filter`}
      >
        <X className="w-3 h-3" />
      </button>
    </span>
  );
}
