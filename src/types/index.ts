// ===============================================
// JUNGLE YOURSELF - TYPE DEFINITIONS
// ===============================================

export type ProductType = 'kit' | 'component';

export type SurfaceType = 'tile' | 'concrete' | 'decking' | 'gravel';

export type Exposure = 'full-sun' | 'partial-shade' | 'shade';

export type MaintenanceLevel = 'low' | 'medium' | 'high';

export type Goal = 
  | 'low-maintenance' 
  | 'biodiversity' 
  | 'aesthetics' 
  | 'shade' 
  | 'drainage'
  | 'edible';

export type Badge = 
  | 'beginner-friendly' 
  | 'lightweight' 
  | 'low-maintenance' 
  | 'biodiversity'
  | 'best-seller'
  | 'new';

export type StockStatus = 'in-stock' | 'low-stock' | 'out-of-stock' | 'pre-order';

export type SizeCategory = '2-5' | '5-10' | '10-20';

export interface ProductImage {
  url: string;
  alt: string;
}

export interface ProductDocument {
  name: string;
  url: string;
  type: 'datasheet' | 'instructions' | 'warranty';
}

export interface IncludedItem {
  productId: string;
  quantity: number;
  unit: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  type: ProductType;
  shortDescription: string;
  longDescription: string;
  price: number;
  currency: string;
  images: ProductImage[];
  stockStatus: StockStatus;
  leadTimeDays: number;
  weightPerUnit: number; // kg
  weightPerM2?: number; // kg/m² (for kits)
  compatibility: SurfaceType[];
  exposure: Exposure[];
  maintenance: MaintenanceLevel;
  goals: Goal[];
  badges: Badge[];
  sizeCategory?: SizeCategory; // for kits
  coverageM2?: { min: number; max: number }; // for kits
  includedItems?: IncludedItem[]; // for kits
  stillNeeded?: string[]; // what's not included
  toolsNeeded?: string[];
  timeEstimate?: string;
  documents: ProductDocument[];
  reviews: Review[];
  faqs: FAQ[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verified: boolean;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: (products: Product[]) => number;
  getItemCount: () => number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface Guide {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  readTime: number;
  category: 'installation' | 'maintenance' | 'inspiration' | 'tips';
  relatedProducts: string[];
  publishedAt: string;
}

export interface WizardState {
  step: number;
  terraceSizeM2: number | null;
  surfaceType: SurfaceType | null;
  exposure: Exposure | null;
  goals: Goal[];
  maintenancePreference: MaintenanceLevel | null;
}

export interface FilterState {
  sizeCategory: SizeCategory[];
  exposure: Exposure[];
  maintenance: MaintenanceLevel[];
  goals: Goal[];
  priceRange: { min: number; max: number };
  productType: ProductType[];
}

export interface SearchResult {
  product: Product;
  score: number;
}

// Analytics Event Types
export type AnalyticsEvent = 
  | 'view_item'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'begin_checkout'
  | 'purchase'
  | 'search'
  | 'filter_applied'
  | 'wizard_started'
  | 'wizard_completed'
  | 'guide_viewed';

export interface AnalyticsPayload {
  event: AnalyticsEvent;
  data?: Record<string, unknown>;
  timestamp: number;
}
