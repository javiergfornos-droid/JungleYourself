// ===============================================
// JUNGLE YOURSELF - ABOUT PAGE
// Contains: How It Works, Why Choose Us, Benefits
// Moved from HomePage for cleaner landing page
// ===============================================

import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Package, 
  BookOpen, 
  Calculator, 
  Truck, 
  Clock,
  Leaf,
  Sun,
  Droplets,
  CheckCircle
} from 'lucide-react';
import Button from '../components/ui/Button';

export default function AboutPage() {
  const steps = [
    {
      icon: Calculator,
      title: 'Measure Your Space',
      description: 'Calculate your terrace area in square metres. Our kits cover from 2m² balconies to 20m² rooftops.',
    },
    {
      icon: Package,
      title: 'Choose Your Kit',
      description: 'Use our Kit Finder to get personalised recommendations based on your space, sun exposure, and goals.',
    },
    {
      icon: Truck,
      title: 'Install in a Weekend',
      description: 'Everything arrives ready to install. Follow our step-by-step guides and transform your terrace.',
    },
  ];

  const benefits = [
    {
      icon: Leaf,
      title: 'Lightweight Systems',
      description: 'Our kits weigh just 15-22 kg/m² – safe for most balconies and terraces.',
    },
    {
      icon: Sun,
      title: 'All Exposures',
      description: 'Whether full sun or deep shade, we have solutions for every condition.',
    },
    {
      icon: Droplets,
      title: 'Smart Drainage',
      description: 'Professional-grade drainage protects your terrace whilst keeping plants healthy.',
    },
    {
      icon: Clock,
      title: 'Low Maintenance',
      description: 'Choose from virtually self-sustaining sedum systems to productive vegetable gardens.',
    },
  ];

  const features = [
    'Pre-cut materials – no measuring or cutting needed',
    'Lightweight substrate replaces heavy garden soil',
    'Root barrier protects your existing surface',
    'Drainage system prevents waterlogging',
    'Detailed photo instructions included',
    'Video tutorials available online',
    'Expert support via email and phone',
    '2-year warranty on all materials',
  ];

  return (
    <div className="min-h-screen bg-warm-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest to-moss py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
            How Jungle Yourself Works
          </h1>
          <p className="text-xl text-cream/90 max-w-2xl mx-auto">
            From measuring your space to enjoying your new garden – we make every step simple.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-charcoal mb-4">
              Three Simple Steps
            </h2>
            <p className="text-charcoal/70 max-w-2xl mx-auto">
              No gardening experience needed. Our kits are designed for complete beginners.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                {/* Step Number + Icon */}
                <div className="relative inline-block mb-8">
                  <div className="w-24 h-24 bg-moss/10 rounded-2xl flex items-center justify-center">
                    <step.icon className="w-12 h-12 text-moss" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-terracotta text-white rounded-full flex items-center justify-center text-lg font-bold shadow-lg">
                    {index + 1}
                  </div>
                </div>

                <h3 className="font-display text-2xl font-semibold text-charcoal mb-4">
                  {step.title}
                </h3>
                <p className="text-charcoal/70 leading-relaxed text-lg">
                  {step.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link to="/calculator">
              <Button size="lg">
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-6 bg-forest text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4">
              Why Choose Jungle Yourself
            </h2>
            <p className="text-sage max-w-2xl mx-auto">
              Designed by urban gardeners, for urban gardeners. Professional quality made accessible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 mx-auto mb-6 bg-sage/20 rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-sage" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-3">
                  {benefit.title}
                </h3>
                <p className="text-sage text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-charcoal mb-4">
              What's Included in Every Kit
            </h2>
            <p className="text-charcoal/70">
              Everything you need to transform your terrace, delivered to your door.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-center gap-4 p-4 bg-cream rounded-lg"
              >
                <CheckCircle className="w-6 h-6 text-moss flex-shrink-0" />
                <span className="text-charcoal">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guides CTA Section */}
      <section className="py-20 px-6 bg-sand/50">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="w-16 h-16 text-moss mx-auto mb-6" />
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-charcoal mb-4">
            Need More Information?
          </h2>
          <p className="text-charcoal/70 mb-8 max-w-2xl mx-auto">
            Read our comprehensive guides covering everything from choosing the right system 
            to seasonal maintenance tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/guides">
              <Button variant="outline">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Guides
              </Button>
            </Link>
            <Link to="/faq">
              <Button variant="outline">
                View FAQ
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-gradient-to-br from-moss to-forest text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-cream/90 text-lg mb-8">
            Use our calculator to find the perfect kit for your space and budget.
          </p>
          <Link to="/calculator">
            <Button size="lg" variant="secondary">
              Create Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
