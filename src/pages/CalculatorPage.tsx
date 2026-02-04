// ===============================================
// CALCULATOR PAGE
// m² calculator with weight and budget estimates
// ===============================================

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculator,
  Scale,
  Euro,
  Ruler,
  ChevronRight,
  Info,
  AlertTriangle,
  Package,
  Leaf
} from 'lucide-react';
import TerracePreview from '../components/TerracePreview';

interface CalculationResult {
  area: number;
  systemType: 'extensive' | 'semi-intensive' | 'intensive';
  weightMin: number;
  weightMax: number;
  budgetMin: number;
  budgetMax: number;
  recommendedKit: string;
  kitSlug: string;
}

const systemTypes = {
  extensive: {
    name: 'Extensive (Sedum)',
    description: 'Lightweight, low-maintenance sedum and succulent systems',
    weightPerM2: { min: 60, max: 90 },
    pricePerM2: { min: 45, max: 70 },
    maintenance: 'Very low',
    plants: 'Sedum, succulents, alpine plants'
  },
  'semi-intensive': {
    name: 'Semi-Intensive',
    description: 'Mixed planting with herbs, grasses, and small shrubs',
    weightPerM2: { min: 120, max: 200 },
    pricePerM2: { min: 60, max: 100 },
    maintenance: 'Moderate',
    plants: 'Herbs, grasses, perennials, small shrubs'
  },
  intensive: {
    name: 'Intensive',
    description: 'Full garden with vegetables, larger plants, and diverse planting',
    weightPerM2: { min: 250, max: 400 },
    pricePerM2: { min: 85, max: 150 },
    maintenance: 'Higher',
    plants: 'Vegetables, flowers, shrubs, small trees'
  }
};

export default function CalculatorPage() {
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [customArea, setCustomArea] = useState<string>('');
  const [useCustomArea, setUseCustomArea] = useState(false);
  const [systemType, setSystemType] = useState<'extensive' | 'semi-intensive' | 'intensive'>('extensive');
  const [roofLoadCapacity, setRoofLoadCapacity] = useState<string>('');

  const calculation = useMemo((): CalculationResult | null => {
    const area = useCustomArea 
      ? parseFloat(customArea) 
      : parseFloat(length) * parseFloat(width);
    
    if (isNaN(area) || area <= 0) return null;

    const system = systemTypes[systemType];
    const weightMin = Math.round(area * system.weightPerM2.min);
    const weightMax = Math.round(area * system.weightPerM2.max);
    const budgetMin = Math.round(area * system.pricePerM2.min);
    const budgetMax = Math.round(area * system.pricePerM2.max);

    // Recommend kit based on area
    let recommendedKit = 'Starter Garden Kit';
    let kitSlug = 'starter-garden-kit';
    
    if (systemType === 'extensive') {
      if (area <= 5) {
        recommendedKit = 'Starter Garden Kit (2-5m²)';
        kitSlug = 'starter-garden-kit';
      } else if (area <= 10) {
        recommendedKit = 'Sedum Carpet Kit (10-20m²)';
        kitSlug = 'sedum-carpet-kit';
      } else {
        recommendedKit = 'Professional Rooftop Kit (10-20m²)';
        kitSlug = 'professional-rooftop-kit';
      }
    } else if (systemType === 'semi-intensive') {
      if (area <= 5) {
        recommendedKit = 'Family Garden Kit (5-10m²)';
        kitSlug = 'family-garden-kit';
      } else if (area <= 10) {
        recommendedKit = 'Biodiversity Haven Kit (5-10m²)';
        kitSlug = 'biodiversity-haven-kit';
      } else {
        recommendedKit = 'Professional Rooftop Kit (10-20m²)';
        kitSlug = 'professional-rooftop-kit';
      }
    } else {
      if (area <= 10) {
        recommendedKit = 'Family Garden Kit (5-10m²)';
        kitSlug = 'family-garden-kit';
      } else {
        recommendedKit = 'Professional Rooftop Kit (10-20m²)';
        kitSlug = 'professional-rooftop-kit';
      }
    }

    return {
      area,
      systemType,
      weightMin,
      weightMax,
      budgetMin,
      budgetMax,
      recommendedKit,
      kitSlug
    };
  }, [length, width, customArea, useCustomArea, systemType]);

  const weightExceedsCapacity = useMemo(() => {
    if (!calculation || !roofLoadCapacity) return false;
    const capacity = parseFloat(roofLoadCapacity);
    if (isNaN(capacity)) return false;
    return calculation.weightMax / calculation.area > capacity;
  }, [calculation, roofLoadCapacity]);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest to-moss text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-white/80 mb-4">
              <Calculator className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Planning Tool</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-display mb-4">
              Project Calculator
            </h1>
            <p className="text-xl text-white/80">
              Estimate the materials, weight, and budget for your terrace garden project. 
              Get personalised recommendations based on your space.
            </p>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* AI Terrace Preview - Prominent Feature */}
        <TerracePreview />

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Step 1: Area */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-moss/10 rounded-full flex items-center justify-center">
                  <Ruler className="w-5 h-5 text-moss" />
                </div>
                <div>
                  <h2 className="text-xl font-display text-forest">Step 1: Your Space</h2>
                  <p className="text-sm text-forest/60">Enter your terrace dimensions</p>
                </div>
              </div>

              {/* Toggle between L x W or custom area */}
              <div className="flex gap-4 mb-6">
                <button
                  onClick={() => setUseCustomArea(false)}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    !useCustomArea 
                      ? 'border-moss bg-moss/5' 
                      : 'border-sand hover:border-moss/50'
                  }`}
                >
                  <span className="font-medium text-forest">Length × Width</span>
                </button>
                <button
                  onClick={() => setUseCustomArea(true)}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${
                    useCustomArea 
                      ? 'border-moss bg-moss/5' 
                      : 'border-sand hover:border-moss/50'
                  }`}
                >
                  <span className="font-medium text-forest">Custom Area</span>
                </button>
              </div>

              {!useCustomArea ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-forest mb-2">
                      Length (metres)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={length}
                      onChange={(e) => setLength(e.target.value)}
                      placeholder="e.g., 4"
                      className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                               focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-forest mb-2">
                      Width (metres)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      value={width}
                      onChange={(e) => setWidth(e.target.value)}
                      placeholder="e.g., 2.5"
                      className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                               focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-forest mb-2">
                    Total Area (m²)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={customArea}
                    onChange={(e) => setCustomArea(e.target.value)}
                    placeholder="e.g., 10"
                    className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                             focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                  />
                </div>
              )}
            </div>

            {/* Step 2: System Type */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-moss/10 rounded-full flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-moss" />
                </div>
                <div>
                  <h2 className="text-xl font-display text-forest">Step 2: Garden Type</h2>
                  <p className="text-sm text-forest/60">Choose your planting approach</p>
                </div>
              </div>

              <div className="space-y-3">
                {(Object.entries(systemTypes) as [keyof typeof systemTypes, typeof systemTypes['extensive']][]).map(([key, system]) => (
                  <button
                    key={key}
                    onClick={() => setSystemType(key)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      systemType === key 
                        ? 'border-moss bg-moss/5' 
                        : 'border-sand hover:border-moss/50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="font-medium text-forest">{system.name}</span>
                        <p className="text-sm text-forest/60 mt-1">{system.description}</p>
                      </div>
                      <span className="text-sm text-moss font-medium">
                        {system.weightPerM2.min}-{system.weightPerM2.max} kg/m²
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Roof Capacity (Optional) */}
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-moss/10 rounded-full flex items-center justify-center">
                  <Scale className="w-5 h-5 text-moss" />
                </div>
                <div>
                  <h2 className="text-xl font-display text-forest">Step 3: Load Capacity (Optional)</h2>
                  <p className="text-sm text-forest/60">Check if your roof can support the weight</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-forest mb-2">
                  Roof Load Capacity (kg/m²)
                </label>
                <input
                  type="number"
                  step="10"
                  min="0"
                  value={roofLoadCapacity}
                  onChange={(e) => setRoofLoadCapacity(e.target.value)}
                  placeholder="e.g., 150"
                  className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                           focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                />
                <p className="text-sm text-forest/60 mt-2 flex items-start gap-2">
                  <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  Don't know your roof's capacity? Consult a structural engineer or building manager.
                </p>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Results Card */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-display text-forest mb-4">Your Estimate</h3>

                {calculation ? (
                  <div className="space-y-6">
                    {/* Area */}
                    <div className="flex justify-between items-center pb-4 border-b border-sand">
                      <span className="text-forest/70">Total Area</span>
                      <span className="text-2xl font-display text-forest">
                        {calculation.area.toFixed(1)} m²
                      </span>
                    </div>

                    {/* Weight */}
                    <div>
                      <div className="flex items-center gap-2 text-forest/70 mb-2">
                        <Scale className="w-4 h-4" />
                        <span>Estimated Weight (saturated)</span>
                      </div>
                      <p className="text-xl font-display text-forest">
                        {calculation.weightMin.toLocaleString()} – {calculation.weightMax.toLocaleString()} kg
                      </p>
                      <p className="text-sm text-forest/60 mt-1">
                        {Math.round(calculation.weightMin / calculation.area)} – {Math.round(calculation.weightMax / calculation.area)} kg/m²
                      </p>
                    </div>

                    {/* Weight Warning */}
                    {weightExceedsCapacity && (
                      <div className="p-4 bg-terracotta/10 border border-terracotta/20 rounded-xl">
                        <div className="flex items-start gap-3">
                          <AlertTriangle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
                          <div>
                            <p className="font-medium text-terracotta">Weight Warning</p>
                            <p className="text-sm text-forest/70 mt-1">
                              This system may exceed your roof's load capacity. Consider an 
                              extensive (sedum) system or consult a structural engineer.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Budget */}
                    <div>
                      <div className="flex items-center gap-2 text-forest/70 mb-2">
                        <Euro className="w-4 h-4" />
                        <span>Estimated Budget</span>
                      </div>
                      <p className="text-xl font-display text-forest">
                        €{calculation.budgetMin.toLocaleString()} – €{calculation.budgetMax.toLocaleString()}
                      </p>
                      <p className="text-sm text-forest/60 mt-1">
                        Materials only, excluding shipping
                      </p>
                    </div>

                    {/* System Info */}
                    <div className="p-4 bg-moss/10 rounded-xl">
                      <p className="font-medium text-forest mb-2">
                        {systemTypes[calculation.systemType].name}
                      </p>
                      <p className="text-sm text-forest/70">
                        <strong>Maintenance:</strong> {systemTypes[calculation.systemType].maintenance}
                      </p>
                      <p className="text-sm text-forest/70 mt-1">
                        <strong>Ideal plants:</strong> {systemTypes[calculation.systemType].plants}
                      </p>
                    </div>

                    {/* Recommended Kit */}
                    <div className="pt-4 border-t border-sand">
                      <div className="flex items-center gap-2 text-forest/70 mb-3">
                        <Package className="w-4 h-4" />
                        <span>Recommended Kit</span>
                      </div>
                      <Link
                        to={`/product/${calculation.kitSlug}`}
                        className="block p-4 bg-moss text-white rounded-xl hover:bg-forest transition-colors"
                      >
                        <p className="font-medium">{calculation.recommendedKit}</p>
                        <span className="text-sm text-white/80 flex items-center gap-1 mt-1">
                          View Kit <ChevronRight className="w-4 h-4" />
                        </span>
                      </Link>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-forest/60">
                    <Calculator className="w-12 h-12 mx-auto mb-3 opacity-30" />
                    <p>Enter your dimensions to see estimates</p>
                  </div>
                )}
              </div>

              {/* Help Link */}
              <div className="bg-sand/30 rounded-xl p-4">
                <p className="text-sm text-forest/70">
                  Need help choosing? Try our{' '}
                  <Link to="/kit-finder" className="text-moss font-medium hover:underline">
                    Kit Finder Wizard
                  </Link>{' '}
                  for personalised recommendations.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-12 p-6 bg-sand/30 rounded-xl">
          <h3 className="font-display text-forest mb-2">Important Notes</h3>
          <ul className="space-y-2 text-sm text-forest/70">
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-moss rounded-full mt-2 flex-shrink-0" />
              Estimates are based on typical material requirements. Actual needs may vary based on your specific situation.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-moss rounded-full mt-2 flex-shrink-0" />
              Weight calculations assume fully saturated soil after rain. Dry weight is typically 30-40% less.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-moss rounded-full mt-2 flex-shrink-0" />
              Always verify your roof's load capacity with a structural engineer before installation.
            </li>
            <li className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 bg-moss rounded-full mt-2 flex-shrink-0" />
              Budget estimates do not include shipping, tools, or professional installation if required.
            </li>
          </ul>
        </div>

        {/* CTA Section */}
        <section className="mt-12 bg-gradient-to-br from-terracotta to-terracotta/80 rounded-2xl p-8 lg:p-12 text-white">
          <div className="max-w-2xl">
            <h2 className="text-2xl lg:text-3xl font-display mb-4">
              See a Real Project in Action
            </h2>
            <p className="text-white/80 mb-6">
              View our sample project with a complete bill of materials, step-by-step photos, 
              and exact costs to help you plan your own terrace garden.
            </p>
            <Link
              to="/sample-project"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-terracotta 
                       rounded-lg font-medium hover:bg-cream transition-colors"
            >
              View Sample Project
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
