// ===============================================
// JUNGLE YOURSELF - PRODUCT CARD COMPONENT
// Displays product in grid/list views
// ===============================================

import { Link } from 'react-router-dom';
import { ShoppingBag, Eye, Package } from 'lucide-react';
import type { Product } from '../../types';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { useCartStore } from '../../stores/cartStore';

export interface ProductCardProps {
  product: Product;
  featured?: boolean;
  variant?: 'grid' | 'list';
}

export default function ProductCard({ product, featured = false }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product.id, 1, product);
  };

  const stockStatusColors: Record<string, string> = {
    'in-stock': 'text-moss',
    'low-stock': 'text-amber-600',
    'out-of-stock': 'text-red-600',
    'pre-order': 'text-blue-600',
  };

  const stockStatusLabels: Record<string, string> = {
    'in-stock': 'In Stock',
    'low-stock': 'Low Stock',
    'out-of-stock': 'Out of Stock',
    'pre-order': 'Pre-order',
  };

  return (
    <Link 
      to={`/product/${product.slug}`}
      className={`group block bg-warm-white rounded-xl overflow-hidden border border-sand hover:shadow-lg transition-all duration-300 ${
        featured ? 'md:flex' : ''
      }`}
    >
      {/* Image Container */}
      <div className={`relative overflow-hidden ${featured ? 'md:w-1/2' : ''}`}>
        <div className="aspect-[4/3] bg-cream">
          <img
            src={product.images[0]?.url || 'https://via.placeholder.com/400x300'}
            alt={product.images[0]?.alt || product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        
        {/* Badges */}
        {product.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {product.badges.slice(0, 2).map((badge) => (
              <Badge key={badge} type={badge} size="sm" />
            ))}
          </div>
        )}

        {/* Product Type Tag */}
        {product.type === 'kit' && (
          <div className="absolute top-3 right-3 bg-forest text-warm-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
            <Package className="w-3 h-3" />
            Complete Kit
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-forest/0 group-hover:bg-forest/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2">
            <button
              onClick={handleAddToCart}
              className="p-3 bg-warm-white rounded-full shadow-lg hover:bg-cream transition-colors"
              aria-label="Add to cart"
              disabled={product.stockStatus === 'out-of-stock'}
            >
              <ShoppingBag className="w-5 h-5 text-forest" />
            </button>
            <span className="p-3 bg-warm-white rounded-full shadow-lg">
              <Eye className="w-5 h-5 text-forest" />
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-4 ${featured ? 'md:w-1/2 md:p-6 md:flex md:flex-col md:justify-center' : ''}`}>
        {/* Category/Type */}
        <p className="text-xs text-moss uppercase tracking-wider font-medium mb-1">
          {product.type === 'kit' ? `Kit ${product.sizeCategory} m²` : 'Component'}
        </p>

        {/* Name */}
        <h3 className={`font-display font-semibold text-charcoal group-hover:text-moss transition-colors ${
          featured ? 'text-2xl mb-2' : 'text-lg mb-1'
        }`}>
          {product.name}
        </h3>

        {/* Description */}
        <p className={`text-charcoal/70 line-clamp-2 ${featured ? 'mb-4' : 'mb-3 text-sm'}`}>
          {product.shortDescription}
        </p>

        {/* Coverage (for kits) */}
        {product.coverageM2 && (
          <p className="text-sm text-moss mb-2">
            Covers {product.coverageM2.min}–{product.coverageM2.max} m²
          </p>
        )}

        {/* Price and Stock */}
        <div className="flex items-center justify-between">
          <div>
            <span className={`font-semibold ${featured ? 'text-2xl' : 'text-xl'} text-forest`}>
              €{product.price.toFixed(2)}
            </span>
            {product.type === 'component' && (
              <span className="text-sm text-charcoal/60 ml-1">/ m²</span>
            )}
          </div>
          <span className={`text-sm font-medium ${stockStatusColors[product.stockStatus]}`}>
            {stockStatusLabels[product.stockStatus]}
          </span>
        </div>

        {/* Featured: Add to Cart Button */}
        {featured && (
          <Button 
            onClick={handleAddToCart}
            className="mt-4"
            disabled={product.stockStatus === 'out-of-stock'}
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        )}
      </div>
    </Link>
  );
}
