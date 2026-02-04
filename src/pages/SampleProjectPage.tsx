// ===============================================
// SAMPLE PROJECT PAGE
// Real example with BOM and step-by-step documentation
// ===============================================

import { Link } from 'react-router-dom';
import { 
  MapPin,
  Calendar,
  Clock,
  Euro,
  ChevronRight,
  Check,
  Camera,
  Package,
  Users,
  Sun,
  Ruler,
  Wrench
} from 'lucide-react';
import Button from '../components/ui/Button';
import { useCartStore } from '../stores/cartStore';
import { products } from '../data/products';

// Sample project data
const sampleProject = {
  title: 'Barcelona Balcony Garden',
  location: 'Eixample, Barcelona',
  completedDate: 'September 2024',
  area: 6,
  duration: '1 weekend',
  totalCost: 487,
  exposure: 'Partial shade (south-west facing)',
  surfaceType: 'Ceramic tiles',
  buildingAge: 'Built 1920s, reinforced balcony',
  
  overview: `Maria transformed her 6m² L-shaped balcony into a thriving urban garden using our 
    Family Garden Kit. The project was completed over a single weekend with just basic hand tools. 
    The balcony now hosts a mix of herbs, flowering perennials, and seasonal vegetables.`,
  
  beforeAfter: {
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop'
  },
  
  billOfMaterials: [
    { 
      name: 'Family Garden Kit (5-10m²)', 
      slug: 'family-garden-kit',
      quantity: 1, 
      unitPrice: 349, 
      total: 349,
      category: 'kit'
    },
    { 
      name: 'Additional Universal Substrate 25L', 
      slug: 'universal-substrate',
      quantity: 3, 
      unitPrice: 18, 
      total: 54,
      category: 'component'
    },
    { 
      name: 'Aluminium Edging 2m', 
      slug: 'aluminium-edging',
      quantity: 2, 
      unitPrice: 24, 
      total: 48,
      category: 'component'
    },
    { 
      name: 'Pollinator Plant Pack', 
      slug: 'pollinator-plant-pack',
      quantity: 1, 
      unitPrice: 65, 
      total: 65,
      category: 'component'
    }
  ],
  
  steps: [
    {
      number: 1,
      title: 'Preparation & Planning',
      duration: '2 hours',
      description: 'Measured the space, cleaned the tiles, and laid out all materials. Checked drainage points and planned the layout.',
      image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&auto=format&fit=crop',
      tips: ['Clear the entire balcony before starting', 'Take photos of existing drainage', 'Lay out materials to visualise the final result']
    },
    {
      number: 2,
      title: 'Root Barrier Installation',
      duration: '30 minutes',
      description: 'Rolled out the HDPE root barrier membrane across the tile surface, overlapping edges by 15cm.',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&auto=format&fit=crop',
      tips: ['Ensure 15cm overlap at all seams', 'Tape seams for extra security', 'Leave extra material at edges to trim later']
    },
    {
      number: 3,
      title: 'Drainage Layer',
      duration: '1 hour',
      description: 'Placed the 25mm drainage modules cup-side down, connecting them across the entire surface.',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&auto=format&fit=crop',
      tips: ['Check cups face downward', 'Ensure modules click together', 'Create slight slope toward drain point']
    },
    {
      number: 4,
      title: 'Geotextile Filter Fabric',
      duration: '20 minutes',
      description: 'Laid the geotextile fabric over the drainage layer to prevent substrate washing through.',
      image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?w=600&auto=format&fit=crop',
      tips: ['Overlap edges by 10cm', 'Tuck under edging when installed', 'Cut around obstacles carefully']
    },
    {
      number: 5,
      title: 'Edge Installation',
      duration: '1 hour',
      description: 'Secured the aluminium edging around the perimeter to contain the substrate.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop',
      tips: ['Use corner connectors for clean joins', 'Leave small gaps at drainage points', 'Check level before final tightening']
    },
    {
      number: 6,
      title: 'Substrate & Planting',
      duration: '3 hours',
      description: 'Filled with substrate to 8cm depth, then planted herbs, perennials, and pollinator-friendly flowers.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop',
      tips: ['Moisten substrate before planting', 'Group plants by water needs', 'Leave space for growth']
    },
    {
      number: 7,
      title: 'Irrigation Setup',
      duration: '1 hour',
      description: 'Connected the drip irrigation kit to the balcony tap with a timer for automatic watering.',
      image: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&auto=format&fit=crop',
      tips: ['Test system before burying lines', 'Place drippers near plant bases', 'Set timer for early morning watering']
    },
    {
      number: 8,
      title: 'Final Touches',
      duration: '30 minutes',
      description: 'Added mulch around plants, gave everything a good water, and cleaned up.',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&auto=format&fit=crop',
      tips: ['Mulch helps retain moisture', 'Take before/after photos!', 'Set a reminder for first fertilisation in 4 weeks']
    }
  ],
  
  sixMonthsLater: {
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&auto=format&fit=crop',
    text: `Six months after installation, Maria's balcony garden is thriving. The herbs provide 
      fresh ingredients for cooking, the flowers attract bees and butterflies, and the space 
      has become her favourite spot for morning coffee. Total maintenance time: about 30 minutes 
      per week, mostly enjoying the space!`
  },
  
  testimonial: {
    text: `"I was nervous about the weight and whether I could do it myself, but the kit made 
      everything so straightforward. The instructions were clear, and the result exceeded my 
      expectations. My neighbours are already asking how they can do the same!"`,
    author: 'Maria G.',
    location: 'Barcelona'
  }
};

export default function SampleProjectPage() {
  const { addItem } = useCartStore();
  
  const subtotal = sampleProject.billOfMaterials.reduce((sum, item) => sum + item.total, 0);
  
  const handleAddAllToCart = () => {
    sampleProject.billOfMaterials.forEach(item => {
      const product = products.find(p => p.slug === item.slug);
      if (product) {
        addItem(product.id, item.quantity, product);
      }
    });
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest to-moss text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={sampleProject.beforeAfter.after}
            alt="Completed project"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/90 to-forest/70" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="flex items-center gap-2 text-white/80 mb-4">
            <Camera className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider">Case Study</span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-display mb-4">
            {sampleProject.title}
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mb-8">
            {sampleProject.overview}
          </p>
          
          {/* Project Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl">
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                <Ruler className="w-4 h-4" />
                Area
              </div>
              <p className="text-xl font-display">{sampleProject.area} m²</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                <Clock className="w-4 h-4" />
                Duration
              </div>
              <p className="text-xl font-display">{sampleProject.duration}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                <Euro className="w-4 h-4" />
                Total Cost
              </div>
              <p className="text-xl font-display">€{sampleProject.totalCost}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-4">
              <div className="flex items-center gap-2 text-white/60 text-sm mb-1">
                <MapPin className="w-4 h-4" />
                Location
              </div>
              <p className="text-xl font-display">Barcelona</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Before/After */}
        <section className="mb-16">
          <h2 className="text-2xl font-display text-forest mb-6">Before & After</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={sampleProject.beforeAfter.before}
                alt="Before"
                className="w-full aspect-[4/3] object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-black/50 text-white text-sm rounded-full">
                Before
              </span>
            </div>
            <div className="relative rounded-xl overflow-hidden">
              <img
                src={sampleProject.beforeAfter.after}
                alt="After"
                className="w-full aspect-[4/3] object-cover"
              />
              <span className="absolute top-4 left-4 px-3 py-1 bg-moss text-white text-sm rounded-full">
                After
              </span>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="mb-16 grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <Sun className="w-6 h-6 text-moss mb-3" />
            <h3 className="font-display text-forest mb-2">Sun Exposure</h3>
            <p className="text-forest/70">{sampleProject.exposure}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <Package className="w-6 h-6 text-moss mb-3" />
            <h3 className="font-display text-forest mb-2">Surface Type</h3>
            <p className="text-forest/70">{sampleProject.surfaceType}</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <Calendar className="w-6 h-6 text-moss mb-3" />
            <h3 className="font-display text-forest mb-2">Building Info</h3>
            <p className="text-forest/70">{sampleProject.buildingAge}</p>
          </div>
        </section>

        {/* Bill of Materials */}
        <section className="mb-16">
          <h2 className="text-2xl font-display text-forest mb-6">Bill of Materials</h2>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-sand/30">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-forest">Item</th>
                    <th className="px-6 py-4 text-center text-sm font-medium text-forest">Qty</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-forest">Unit Price</th>
                    <th className="px-6 py-4 text-right text-sm font-medium text-forest">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand">
                  {sampleProject.billOfMaterials.map((item, index) => (
                    <tr key={index} className="hover:bg-sand/10 transition-colors">
                      <td className="px-6 py-4">
                        <Link 
                          to={`/product/${item.slug}`}
                          className="text-forest hover:text-moss transition-colors font-medium"
                        >
                          {item.name}
                        </Link>
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                          item.category === 'kit' ? 'bg-moss/10 text-moss' : 'bg-sand text-forest/60'
                        }`}>
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-forest/70">{item.quantity}</td>
                      <td className="px-6 py-4 text-right text-forest/70">€{item.unitPrice}</td>
                      <td className="px-6 py-4 text-right font-medium text-forest">€{item.total}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-moss/10">
                  <tr>
                    <td colSpan={3} className="px-6 py-4 text-right font-medium text-forest">
                      Subtotal (excl. shipping)
                    </td>
                    <td className="px-6 py-4 text-right text-xl font-display text-forest">
                      €{subtotal}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-sand">
              <Button onClick={handleAddAllToCart} className="w-full sm:w-auto">
                <Package className="w-4 h-4 mr-2" />
                Add All Items to Cart
              </Button>
            </div>
          </div>
        </section>

        {/* Step by Step */}
        <section className="mb-16">
          <h2 className="text-2xl font-display text-forest mb-6">Step-by-Step Installation</h2>
          <div className="space-y-8">
            {sampleProject.steps.map((step) => (
              <div key={step.number} className="bg-white rounded-xl overflow-hidden shadow-sm">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>
                  <div className="p-6 md:w-2/3">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="w-8 h-8 bg-moss text-white rounded-full flex items-center justify-center font-display">
                        {step.number}
                      </span>
                      <div>
                        <h3 className="font-display text-forest">{step.title}</h3>
                        <p className="text-sm text-forest/60 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {step.duration}
                        </p>
                      </div>
                    </div>
                    <p className="text-forest/70 mb-4">{step.description}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-forest">Pro Tips:</p>
                      <ul className="space-y-1">
                        {step.tips.map((tip, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-forest/70">
                            <Check className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6 Months Later */}
        <section className="mb-16">
          <h2 className="text-2xl font-display text-forest mb-6">Six Months Later</h2>
          <div className="bg-moss/10 rounded-2xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img
                  src={sampleProject.sixMonthsLater.image}
                  alt="Garden after 6 months"
                  className="w-full h-64 md:h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2 flex flex-col justify-center">
                <p className="text-lg text-forest/80 mb-6">
                  {sampleProject.sixMonthsLater.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-moss/20 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-moss" />
                  </div>
                  <div>
                    <p className="font-medium text-forest">{sampleProject.testimonial.author}</p>
                    <p className="text-sm text-forest/60">{sampleProject.testimonial.location}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="mb-16">
          <blockquote className="bg-white rounded-2xl p-8 lg:p-12 shadow-sm">
            <p className="text-xl lg:text-2xl text-forest/80 font-display italic mb-6">
              {sampleProject.testimonial.text}
            </p>
            <footer className="flex items-center gap-4">
              <div className="w-12 h-12 bg-terracotta/20 rounded-full flex items-center justify-center">
                <span className="font-display text-terracotta">M</span>
              </div>
              <div>
                <p className="font-medium text-forest">{sampleProject.testimonial.author}</p>
                <p className="text-sm text-forest/60">{sampleProject.testimonial.location}</p>
              </div>
            </footer>
          </blockquote>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-br from-terracotta to-terracotta/80 rounded-2xl p-8 lg:p-12 text-white">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl lg:text-3xl font-display mb-2">
                Start Your Own Project
              </h2>
              <p className="text-white/80">
                Ready to transform your terrace? Let us help you find the perfect kit.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/kit-finder"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-terracotta 
                         rounded-lg font-medium hover:bg-cream transition-colors"
              >
                Find Your Kit
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 
                         text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
              >
                <Wrench className="w-4 h-4" />
                Use Calculator
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
