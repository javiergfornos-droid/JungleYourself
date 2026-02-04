// ===============================================
// JUNGLE YOURSELF - KIT FINDER WIZARD
// 4-step guided product selection
// ===============================================

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check,
  Ruler,
  Grid3X3,
  Sun,
  Target,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import WizardStepper from '../components/wizard/WizardStepper';
import type { SurfaceType, Exposure, Goal, MaintenanceLevel, Product } from '../types';
import analytics from '../utils/analytics';

// Wizard step definitions
const STEPS = [
  { id: 1, title: 'Terrace Size', description: 'How big is your space?', icon: Ruler },
  { id: 2, title: 'Surface Type', description: 'What are you working with?', icon: Grid3X3 },
  { id: 3, title: 'Sun Exposure', description: 'How much light?', icon: Sun },
  { id: 4, title: 'Goals', description: 'What do you want?', icon: Target },
];

// Size options with visual representation
const SIZE_OPTIONS = [
  { min: 2, max: 5, label: '2-5 m²', description: 'Small balcony or corner', visual: '▪️▪️' },
  { min: 5, max: 10, label: '5-10 m²', description: 'Medium terrace or roof section', visual: '▪️▪️▪️▪️' },
  { min: 10, max: 20, label: '10-20 m²', description: 'Large terrace or rooftop', visual: '▪️▪️▪️▪️▪️▪️' },
];

const SURFACE_OPTIONS: { value: SurfaceType; label: string; description: string }[] = [
  { value: 'tile', label: 'Ceramic Tiles', description: 'Standard terrace flooring' },
  { value: 'concrete', label: 'Concrete', description: 'Raw or painted concrete' },
  { value: 'decking', label: 'Wood Decking', description: 'Natural or composite wood' },
  { value: 'gravel', label: 'Gravel/Aggregate', description: 'Loose stones or pebbles' },
];

const EXPOSURE_OPTIONS: { value: Exposure; label: string; description: string; hours: string }[] = [
  { value: 'full-sun', label: 'Full Sun', description: 'Direct sunlight most of the day', hours: '6+ hours' },
  { value: 'partial-shade', label: 'Partial Shade', description: 'Mix of sun and shade', hours: '3-6 hours' },
  { value: 'shade', label: 'Shade', description: 'Limited or indirect light', hours: '<3 hours' },
];

const GOAL_OPTIONS: { value: Goal; label: string; description: string; icon: string }[] = [
  { value: 'low-maintenance', label: 'Low Maintenance', description: 'Set it and forget it', icon: '⏰' },
  { value: 'biodiversity', label: 'Biodiversity', description: 'Support pollinators', icon: '🦋' },
  { value: 'aesthetics', label: 'Aesthetics', description: 'Beautiful design', icon: '✨' },
  { value: 'edible', label: 'Edible Garden', description: 'Grow your own food', icon: '🥗' },
  { value: 'drainage', label: 'Better Drainage', description: 'Manage rainwater', icon: '💧' },
  { value: 'shade', label: 'Shade Tolerant', description: 'Thrives in low light', icon: '🌙' },
];

const MAINTENANCE_OPTIONS: { value: MaintenanceLevel; label: string; description: string }[] = [
  { value: 'low', label: 'Minimal', description: 'Water monthly, occasional weeding' },
  { value: 'medium', label: 'Moderate', description: 'Weekly watering, seasonal care' },
  { value: 'high', label: 'Dedicated', description: 'Regular attention and care' },
];

interface WizardState {
  terraceSizeM2: { min: number; max: number } | null;
  surfaceType: SurfaceType | null;
  exposure: Exposure | null;
  goals: Goal[];
  maintenancePreference: MaintenanceLevel | null;
}

const initialState: WizardState = {
  terraceSizeM2: null,
  surfaceType: null,
  exposure: null,
  goals: [],
  maintenancePreference: null,
};

export default function KitFinderPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [state, setState] = useState<WizardState>(initialState);
  const [showResults, setShowResults] = useState(false);

  // Track wizard start
  useState(() => {
    analytics.wizardStarted();
  });

  // Calculate recommended products based on wizard answers
  const recommendedProducts = useMemo(() => {
    if (!showResults) return [];

    const kits = products.filter(p => p.type === 'kit');
    
    return kits
      .map(kit => {
        let score = 0;
        const reasons: string[] = [];

        // Size match
        if (state.terraceSizeM2 && kit.coverageM2) {
          const sizeMatch = 
            kit.coverageM2.min <= state.terraceSizeM2.max && 
            kit.coverageM2.max >= state.terraceSizeM2.min;
          if (sizeMatch) {
            score += 30;
            reasons.push(`Covers ${kit.coverageM2.min}-${kit.coverageM2.max} m²`);
          }
        }

        // Surface compatibility
        if (state.surfaceType && kit.compatibility.includes(state.surfaceType)) {
          score += 20;
          reasons.push(`Works on ${state.surfaceType}`);
        }

        // Exposure match
        if (state.exposure && kit.exposure.includes(state.exposure)) {
          score += 25;
          reasons.push(`Suited for ${state.exposure.replace('-', ' ')}`);
        }

        // Goals match
        const matchingGoals = state.goals.filter(g => kit.goals.includes(g));
        if (matchingGoals.length > 0) {
          score += matchingGoals.length * 15;
          reasons.push(`Matches your ${matchingGoals.length > 1 ? 'goals' : 'goal'}: ${matchingGoals.join(', ')}`);
        }

        // Maintenance match
        if (state.maintenancePreference && kit.maintenance === state.maintenancePreference) {
          score += 10;
          reasons.push(`${kit.maintenance} maintenance`);
        }

        return { product: kit, score, reasons };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [showResults, state]);

  // Recommended add-ons based on goals
  const recommendedAddons = useMemo(() => {
    if (!showResults) return [];

    const components = products.filter(p => p.type === 'component');
    const addons: Product[] = [];

    if (state.goals.includes('biodiversity')) {
      const pollinatorPack = components.find(c => c.id === 'plants-pollinator-pack');
      if (pollinatorPack) addons.push(pollinatorPack);
    }

    if (state.goals.includes('edible') || state.maintenancePreference !== 'low') {
      const irrigation = components.find(c => c.id === 'irrigation-drip-kit');
      if (irrigation) addons.push(irrigation);
    }

    return addons.slice(0, 2);
  }, [showResults, state]);

  const canProceed = () => {
    switch (currentStep) {
      case 1: return state.terraceSizeM2 !== null;
      case 2: return state.surfaceType !== null;
      case 3: return state.exposure !== null;
      case 4: return state.goals.length > 0 && state.maintenancePreference !== null;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
      analytics.wizardCompleted([], state as unknown as Record<string, unknown>);
    }
  };

  const handleBack = () => {
    if (showResults) {
      setShowResults(false);
    } else if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    setState(initialState);
    setCurrentStep(1);
    setShowResults(false);
    analytics.wizardStarted();
  };

  const toggleGoal = (goal: Goal) => {
    setState(prev => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter(g => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  // Results View
  if (showResults) {
    return (
      <div className="min-h-screen bg-warm-white">
        {/* Success Header */}
        <section className="relative bg-gradient-to-br from-moss to-forest py-16 overflow-hidden">
          <div className="absolute inset-0 leaf-pattern opacity-30" />
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-fade-in-up">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-white mb-4 animate-fade-in-up stagger-1">
              Your Perfect Kits
            </h1>
            <p className="text-sage text-lg animate-fade-in-up stagger-2">
              Based on your {state.terraceSizeM2?.min}-{state.terraceSizeM2?.max} m² {state.surfaceType} terrace with {state.exposure?.replace('-', ' ')} exposure.
            </p>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Recommended Kits */}
          {recommendedProducts.length > 0 ? (
            <div className="mb-12">
              <h2 className="font-display text-2xl text-charcoal mb-6">
                Recommended Kits for You
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {recommendedProducts.map(({ product, reasons }, index) => (
                  <div 
                    key={product.id}
                    className="relative animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {index === 0 && (
                      <div className="absolute -top-3 left-4 z-10 bg-terracotta text-white text-xs font-medium px-3 py-1 rounded-full">
                        Best Match
                      </div>
                    )}
                    <ProductCard product={product} variant="grid" />
                    <div className="mt-3 p-3 bg-moss/5 rounded-lg">
                      <p className="text-sm font-medium text-moss mb-1">Why we recommend it:</p>
                      <ul className="text-xs text-charcoal/70 space-y-0.5">
                        {reasons.map((reason, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <Check className="w-3 h-3 text-moss mt-0.5 flex-shrink-0" />
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-sand/30 rounded-2xl mb-12">
              <p className="text-charcoal/70 mb-4">No exact matches found for your criteria.</p>
              <Link 
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3 bg-moss text-white rounded-lg hover:bg-forest transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Browse All Products
              </Link>
            </div>
          )}

          {/* Recommended Add-ons */}
          {recommendedAddons.length > 0 && (
            <div className="mb-12">
              <h2 className="font-display text-2xl text-charcoal mb-2">
                Recommended Add-ons
              </h2>
              <p className="text-charcoal/60 mb-6">Enhance your green terrace with these extras.</p>
              <div className="grid sm:grid-cols-2 gap-6">
                {recommendedAddons.map((product, index) => (
                  <div 
                    key={product.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <ProductCard product={product} variant="grid" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Your Selections Summary */}
          <div className="bg-cream rounded-2xl p-6 mb-8">
            <h3 className="font-semibold text-charcoal mb-4">Your Selections</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <SummaryItem 
                icon="📐"
                label="Size"
                value={`${state.terraceSizeM2?.min}-${state.terraceSizeM2?.max} m²`}
              />
              <SummaryItem 
                icon="🏗️"
                label="Surface"
                value={SURFACE_OPTIONS.find(o => o.value === state.surfaceType)?.label || ''}
              />
              <SummaryItem 
                icon="☀️"
                label="Exposure"
                value={EXPOSURE_OPTIONS.find(o => o.value === state.exposure)?.label || ''}
              />
              <SummaryItem 
                icon="🎯"
                label="Goals"
                value={state.goals.map(g => GOAL_OPTIONS.find(o => o.value === g)?.icon).join(' ')}
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleRestart}
              className="px-6 py-3 border-2 border-moss text-moss rounded-lg font-medium hover:bg-moss/5 transition-colors"
            >
              Start Over
            </button>
            <Link
              to="/shop"
              className="px-6 py-3 bg-moss text-white rounded-lg font-medium hover:bg-forest transition-colors text-center"
            >
              Browse All Products
            </Link>
            <Link
              to="/calculator"
              className="px-6 py-3 bg-terracotta text-white rounded-lg font-medium hover:bg-terracotta-dark transition-colors text-center"
            >
              Calculate Exact Quantities
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Wizard View
  return (
    <div className="min-h-screen bg-warm-white">
      {/* Header */}
      <section className="relative bg-gradient-to-br from-forest to-forest-light py-12 overflow-hidden">
        <div className="absolute inset-0 leaf-pattern opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-3xl md:text-4xl text-white mb-2 animate-fade-in-up">
            Find Your Perfect Kit
          </h1>
          <p className="text-sage animate-fade-in-up stagger-1">
            Answer 4 quick questions to get personalised recommendations.
          </p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stepper */}
        <WizardStepper 
          steps={STEPS} 
          currentStep={currentStep} 
          className="mb-8"
        />

        {/* Step Content */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-sand/50 min-h-[400px]">
          {/* Step 1: Size */}
          {currentStep === 1 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-2xl text-charcoal mb-2">
                How big is your terrace?
              </h2>
              <p className="text-charcoal/60 mb-6">
                Measure the area you want to transform into a green space.
              </p>
              
              <div className="grid gap-4">
                {SIZE_OPTIONS.map(option => (
                  <button
                    key={option.label}
                    onClick={() => setState(prev => ({ ...prev, terraceSizeM2: { min: option.min, max: option.max } }))}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      state.terraceSizeM2?.min === option.min
                        ? 'border-moss bg-moss/5'
                        : 'border-sand hover:border-sage'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-charcoal">{option.label}</span>
                        <p className="text-sm text-charcoal/60">{option.description}</p>
                      </div>
                      <div className="text-2xl opacity-30">{option.visual}</div>
                    </div>
                  </button>
                ))}
              </div>
              
              <p className="mt-4 text-sm text-charcoal/50">
                💡 Tip: Use our <Link to="/calculator" className="text-moss underline">Calculator</Link> for precise measurements.
              </p>
            </div>
          )}

          {/* Step 2: Surface */}
          {currentStep === 2 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-2xl text-charcoal mb-2">
                What's your terrace surface?
              </h2>
              <p className="text-charcoal/60 mb-6">
                Our kits work on most surfaces – we just need to know what you have.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {SURFACE_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setState(prev => ({ ...prev, surfaceType: option.value }))}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      state.surfaceType === option.value
                        ? 'border-moss bg-moss/5'
                        : 'border-sand hover:border-sage'
                    }`}
                  >
                    <span className="font-semibold text-charcoal">{option.label}</span>
                    <p className="text-sm text-charcoal/60">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Exposure */}
          {currentStep === 3 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-2xl text-charcoal mb-2">
                How much sun does it get?
              </h2>
              <p className="text-charcoal/60 mb-6">
                Think about a typical summer day.
              </p>
              
              <div className="grid gap-4">
                {EXPOSURE_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setState(prev => ({ ...prev, exposure: option.value }))}
                    className={`p-4 border-2 rounded-xl text-left transition-all ${
                      state.exposure === option.value
                        ? 'border-moss bg-moss/5'
                        : 'border-sand hover:border-sage'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-semibold text-charcoal">{option.label}</span>
                        <p className="text-sm text-charcoal/60">{option.description}</p>
                      </div>
                      <span className="text-sm font-medium text-moss bg-moss/10 px-2 py-1 rounded-full">
                        {option.hours}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Goals & Maintenance */}
          {currentStep === 4 && (
            <div className="animate-fade-in-up">
              <h2 className="font-display text-2xl text-charcoal mb-2">
                What are your goals?
              </h2>
              <p className="text-charcoal/60 mb-6">
                Select all that apply.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-3 mb-8">
                {GOAL_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    onClick={() => toggleGoal(option.value)}
                    className={`p-3 border-2 rounded-xl text-left transition-all ${
                      state.goals.includes(option.value)
                        ? 'border-moss bg-moss/5'
                        : 'border-sand hover:border-sage'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{option.icon}</span>
                      <div>
                        <span className="font-medium text-charcoal text-sm">{option.label}</span>
                        <p className="text-xs text-charcoal/60">{option.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <h3 className="font-semibold text-charcoal mb-3">
                How much time can you dedicate?
              </h3>
              <div className="grid sm:grid-cols-3 gap-3">
                {MAINTENANCE_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    onClick={() => setState(prev => ({ ...prev, maintenancePreference: option.value }))}
                    className={`p-3 border-2 rounded-xl text-left transition-all ${
                      state.maintenancePreference === option.value
                        ? 'border-moss bg-moss/5'
                        : 'border-sand hover:border-sage'
                    }`}
                  >
                    <span className="font-medium text-charcoal text-sm">{option.label}</span>
                    <p className="text-xs text-charcoal/60">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? 'text-charcoal/30 cursor-not-allowed'
                : 'text-charcoal hover:bg-sand/50'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <div className="flex items-center gap-2">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`w-2 h-2 rounded-full transition-colors ${
                  step.id === currentStep
                    ? 'bg-moss'
                    : step.id < currentStep
                    ? 'bg-sage'
                    : 'bg-sand'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg font-medium transition-colors ${
              canProceed()
                ? 'bg-moss text-white hover:bg-forest'
                : 'bg-sand text-charcoal/40 cursor-not-allowed'
            }`}
          >
            {currentStep === 4 ? 'See Results' : 'Next'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

// Summary Item Component
function SummaryItem({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl">{icon}</span>
      <div>
        <p className="text-xs text-charcoal/50">{label}</p>
        <p className="font-medium text-charcoal">{value}</p>
      </div>
    </div>
  );
}
