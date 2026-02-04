// ===============================================
// PRODUCT DETAIL PAGE
// Full product information with images, specs, reviews, Q&A
// ===============================================

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Package, 
  Clock, 
  Scale, 
  Sun, 
  CloudRain,
  Leaf,
  ChevronRight,
  Check,
  AlertTriangle,
  FileText,
  Star,
  ChevronDown,
  ChevronUp,
  Truck,
  Shield,
  ArrowLeft,
  Plus,
  Minus
} from 'lucide-react';
import { products, getRelatedProducts } from '../data/products';
import { useCartStore } from '../stores/cartStore';
import analytics from '../utils/analytics';
import type { Product, Review, FAQ } from '../types';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import ProductCard from '../components/product/ProductCard';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'specs' | 'reviews' | 'faq'>('description');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  
  const { addItem } = useCartStore();

  useEffect(() => {
    const foundProduct = products.find(p => p.slug === slug);
    setProduct(foundProduct || null);
    
    if (foundProduct) {
      analytics.viewItem(foundProduct.id, foundProduct.name, foundProduct.price);
      window.scrollTo(0, 0);
    }
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product.id, quantity, product);
    analytics.addToCart(product.id, product.name, quantity, product.price);
  };

  const relatedProducts = product ? getRelatedProducts(product.id) : [];

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-forest mb-4">Product Not Found</h1>
          <p className="text-forest/70 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/shop">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  const primaryExposure = product.exposure[0] || 'partial-shade';
  const ExposureIcon = primaryExposure === 'full-sun' ? Sun : 
                       primaryExposure === 'shade' ? CloudRain : Leaf;

  return (
    <div className="min-h-screen bg-cream">
      {/* Breadcrumb */}
      <div className="bg-sand/30 border-b border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-forest/60 hover:text-forest transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 text-forest/40" />
            <Link to="/shop" className="text-forest/60 hover:text-forest transition-colors">Shop</Link>
            <ChevronRight className="w-4 h-4 text-forest/40" />
            <span className="text-forest font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-moss hover:text-forest mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to shop</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-2xl overflow-hidden shadow-lg">
              <img
                src={product.images[selectedImage]?.url || 'https://via.placeholder.com/600'}
                alt={product.images[selectedImage]?.alt || product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-moss ring-2 ring-moss/20' 
                        : 'border-transparent hover:border-sand'
                    }`}
                  >
                    <img src={image.url} alt={image.alt} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {product.badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.badges.map(badge => (
                  <Badge key={badge} type={badge} />
                ))}
              </div>
            )}

            <div>
              <h1 className="text-3xl lg:text-4xl font-display text-forest mb-2">
                {product.name}
              </h1>
              <p className="text-lg text-forest/70">{product.shortDescription}</p>
            </div>

            <div className="flex items-baseline gap-3">
              <span className="text-3xl font-display text-forest">
                €{product.price.toFixed(2)}
              </span>
              {product.type === 'component' && (
                <span className="text-forest/60">per unit</span>
              )}
              {product.type === 'kit' && product.coverageM2 && (
                <span className="text-forest/60">
                  covers {product.coverageM2.min}–{product.coverageM2.max} m²
                </span>
              )}
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 p-4 bg-sand/30 rounded-xl">
              {product.type === 'kit' && product.weightPerM2 && (
                <div className="flex items-center gap-3">
                  <Scale className="w-5 h-5 text-moss" />
                  <div>
                    <p className="text-sm text-forest/60">Weight</p>
                    <p className="font-medium text-forest">{product.weightPerM2} kg/m²</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <ExposureIcon className="w-5 h-5 text-moss" />
                <div>
                  <p className="text-sm text-forest/60">Exposure</p>
                  <p className="font-medium text-forest capitalize">
                    {product.exposure.map(e => e.replace('-', ' ')).join(', ')}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-moss" />
                <div>
                  <p className="text-sm text-forest/60">Maintenance</p>
                  <p className="font-medium text-forest capitalize">{product.maintenance}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5 text-moss" />
                <div>
                  <p className="text-sm text-forest/60">Lead Time</p>
                  <p className="font-medium text-forest">{product.leadTimeDays} days</p>
                </div>
              </div>
            </div>

            {/* Stock Status */}
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              product.stockStatus === 'in-stock' ? 'bg-moss/10 text-moss' :
              product.stockStatus === 'low-stock' ? 'bg-amber-100 text-amber-700' :
              product.stockStatus === 'out-of-stock' ? 'bg-red-100 text-red-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {product.stockStatus === 'in-stock' && <Check className="w-5 h-5" />}
              {product.stockStatus === 'low-stock' && <AlertTriangle className="w-5 h-5" />}
              {product.stockStatus === 'out-of-stock' && <AlertTriangle className="w-5 h-5" />}
              <span className="font-medium capitalize">
                {product.stockStatus === 'in-stock' && 'In Stock – Ready to ship'}
                {product.stockStatus === 'low-stock' && 'Low Stock – Order soon'}
                {product.stockStatus === 'out-of-stock' && 'Out of Stock'}
                {product.stockStatus === 'pre-order' && `Pre-order – Ships in ${product.leadTimeDays} days`}
              </span>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-sand rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3 hover:bg-sand/30 transition-colors"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-5 h-5 text-forest" />
                </button>
                <span className="px-6 py-3 font-medium text-forest min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3 hover:bg-sand/30 transition-colors"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-5 h-5 text-forest" />
                </button>
              </div>
              <Button
                onClick={handleAddToCart}
                className="flex-1 py-4"
                disabled={product.stockStatus === 'out-of-stock'}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart – €{(product.price * quantity).toFixed(2)}
              </Button>
            </div>

            {/* Benefits */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-sand">
              <div className="flex items-center gap-2 text-sm text-forest/70">
                <Truck className="w-4 h-4" />
                <span>Free shipping over €150</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-forest/70">
                <Shield className="w-4 h-4" />
                <span>2-year warranty</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-forest/70">
                <FileText className="w-4 h-4" />
                <span>30-day returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-12 border-t border-sand pt-8">
          <div className="flex gap-1 border-b border-sand overflow-x-auto">
            {(['description', 'specs', 'reviews', 'faq'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab 
                    ? 'text-moss border-b-2 border-moss -mb-px' 
                    : 'text-forest/60 hover:text-forest'
                }`}
              >
                {tab === 'faq' ? 'FAQ' : tab}
                {tab === 'reviews' && product.reviews.length > 0 && (
                  <span className="ml-2 text-sm bg-sand/50 px-2 py-0.5 rounded-full">
                    {product.reviews.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-forest max-w-none">
                <div className="whitespace-pre-line text-forest/80 leading-relaxed">
                  {product.longDescription}
                </div>
                
                {product.includedItems && product.includedItems.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-display text-forest mb-4">What's Included</h3>
                    <ul className="space-y-2">
                      {product.includedItems.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-forest/80">
                          <Check className="w-5 h-5 text-moss flex-shrink-0" />
                          <span>{item.quantity} {item.unit} – {item.productId}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {product.stillNeeded && product.stillNeeded.length > 0 && (
                  <div className="mt-8 p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <h3 className="text-lg font-display text-amber-800 mb-3">You'll Also Need</h3>
                    <ul className="space-y-1">
                      {product.stillNeeded.map((item, index) => (
                        <li key={index} className="text-amber-700 text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-display text-lg text-forest">Dimensions & Weight</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between py-2 border-b border-sand/50">
                        <dt className="text-forest/60">Weight per unit</dt>
                        <dd className="font-medium text-forest">{product.weightPerUnit} kg</dd>
                      </div>
                      {product.weightPerM2 && (
                        <div className="flex justify-between py-2 border-b border-sand/50">
                          <dt className="text-forest/60">Weight per m²</dt>
                          <dd className="font-medium text-forest">{product.weightPerM2} kg/m²</dd>
                        </div>
                      )}
                      {product.coverageM2 && (
                        <div className="flex justify-between py-2 border-b border-sand/50">
                          <dt className="text-forest/60">Coverage</dt>
                          <dd className="font-medium text-forest">{product.coverageM2.min}–{product.coverageM2.max} m²</dd>
                        </div>
                      )}
                    </dl>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-display text-lg text-forest">Compatibility</h3>
                    <dl className="space-y-2">
                      <div className="flex justify-between py-2 border-b border-sand/50">
                        <dt className="text-forest/60">Surface types</dt>
                        <dd className="font-medium text-forest capitalize">
                          {product.compatibility.join(', ')}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b border-sand/50">
                        <dt className="text-forest/60">Sun exposure</dt>
                        <dd className="font-medium text-forest capitalize">
                          {product.exposure.map(e => e.replace('-', ' ')).join(', ')}
                        </dd>
                      </div>
                      <div className="flex justify-between py-2 border-b border-sand/50">
                        <dt className="text-forest/60">Maintenance level</dt>
                        <dd className="font-medium text-forest capitalize">{product.maintenance}</dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {product.documents && product.documents.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-display text-lg text-forest mb-4">Documentation</h3>
                    <div className="flex flex-wrap gap-3">
                      {product.documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-sand/30 rounded-lg hover:bg-sand/50 transition-colors text-forest"
                        >
                          <FileText className="w-4 h-4" />
                          <span>{doc.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {product.reviews.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-forest/60 mb-4">No reviews yet. Be the first to review this product!</p>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-6 p-6 bg-sand/30 rounded-xl">
                      <div className="text-center">
                        <div className="text-4xl font-display text-forest">
                          {(product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length).toFixed(1)}
                        </div>
                        <div className="flex gap-1 justify-center mt-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= Math.round(product.reviews.reduce((acc, r) => acc + r.rating, 0) / product.reviews.length)
                                  ? 'text-amber-400 fill-amber-400'
                                  : 'text-sand'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-forest/60 mt-1">{product.reviews.length} reviews</p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {product.reviews.map((review: Review) => (
                        <div key={review.id} className="border-b border-sand pb-6">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-forest">{review.author}</span>
                                {review.verified && (
                                  <span className="text-xs bg-moss/10 text-moss px-2 py-0.5 rounded-full">
                                    Verified Purchase
                                  </span>
                                )}
                              </div>
                              <div className="flex gap-1 mt-1">
                                {[1, 2, 3, 4, 5].map(star => (
                                  <Star
                                    key={star}
                                    className={`w-4 h-4 ${
                                      star <= review.rating ? 'text-amber-400 fill-amber-400' : 'text-sand'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-forest/60">{review.date}</span>
                          </div>
                          <h4 className="font-medium text-forest mb-2">{review.title}</h4>
                          <p className="text-forest/70">{review.content}</p>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="space-y-4">
                {product.faqs.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-forest/60 mb-4">No FAQs for this product yet.</p>
                    <Link to="/faq" className="text-moss hover:text-forest underline">
                      Visit our general FAQ page
                    </Link>
                  </div>
                ) : (
                  product.faqs.map((faq: FAQ, index: number) => (
                    <div key={index} className="border border-sand rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === `faq-${index}` ? null : `faq-${index}`)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-sand/20 transition-colors"
                      >
                        <span className="font-medium text-forest">{faq.question}</span>
                        {expandedFaq === `faq-${index}` ? (
                          <ChevronUp className="w-5 h-5 text-forest/60 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-forest/60 flex-shrink-0" />
                        )}
                      </button>
                      {expandedFaq === `faq-${index}` && (
                        <div className="px-4 pb-4 text-forest/70">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-12 border-t border-sand pt-12">
            <h2 className="text-2xl font-display text-forest mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct: Product) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}

        {/* Safety Disclaimer */}
        <div className="mt-12 p-6 bg-amber-50 rounded-xl border border-amber-200">
          <div className="flex gap-4">
            <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0" />
            <div>
              <h3 className="font-display text-lg text-amber-800 mb-2">Important Safety Information</h3>
              <p className="text-amber-700 text-sm">
                Before installation, verify that your terrace or balcony can support the weight of a planted green roof system 
                when fully saturated with water. Consult a structural engineer if you're unsure about load capacity. 
                Always follow local building codes and regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
