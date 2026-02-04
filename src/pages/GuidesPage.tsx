// ===============================================
// GUIDES PAGE
// Educational content listing with categories
// ===============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  ChevronRight,
  Search,
  Leaf,
  Wrench,
  Calendar,
  Lightbulb
} from 'lucide-react';
import { guides } from '../data/guides';
import analytics from '../utils/analytics';
import type { Guide } from '../types';

type GuideCategory = Guide['category'];

const categoryIcons: Record<GuideCategory, React.ElementType> = {
  'installation': Wrench,
  'maintenance': Calendar,
  'inspiration': Lightbulb,
  'tips': Leaf
};

const categoryNames: Record<GuideCategory, string> = {
  'installation': 'Installation',
  'maintenance': 'Maintenance',
  'inspiration': 'Inspiration',
  'tips': 'Tips & Tricks'
};

const allCategories: GuideCategory[] = ['installation', 'maintenance', 'inspiration', 'tips'];

export default function GuidesPage() {
  const [selectedCategory, setSelectedCategory] = useState<GuideCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Guides - Jungle Yourself';
  }, []);

  const filteredGuides = guides.filter(guide => {
    const matchesCategory = selectedCategory === 'all' || guide.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-cream min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest to-moss py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-white/10 rounded-full">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="font-display text-4xl md:text-5xl text-white mb-4">
            Learn to Green Your Space
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            Step-by-step guides, expert tips, and inspiration to help you create 
            and maintain your perfect terrace garden.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sage" />
            <input
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-moss"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-forest text-white'
                  : 'bg-sand/50 text-charcoal hover:bg-sand'
              }`}
            >
              All Guides
            </button>
            {allCategories.map((category) => {
              const Icon = categoryIcons[category];
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-forest text-white'
                      : 'bg-sand/50 text-charcoal hover:bg-sand'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {categoryNames[category]}
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <p className="text-sage mb-8 text-center">
            {filteredGuides.length} guide{filteredGuides.length !== 1 ? 's' : ''} found
          </p>

          {/* Guides Grid */}
          {filteredGuides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.id} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="w-16 h-16 text-sage/50 mx-auto mb-4" />
              <h3 className="text-xl font-display text-forest mb-2">No guides found</h3>
              <p className="text-charcoal/60 mb-6">
                Try adjusting your search or category filter.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                }}
                className="px-4 py-2 bg-forest text-white rounded-lg hover:bg-moss transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-sand/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-moss/10 rounded-lg">
                  <Leaf className="w-6 h-6 text-moss" />
                </div>
                <h3 className="font-display text-xl text-forest">Not sure where to start?</h3>
              </div>
              <p className="text-charcoal/70 mb-6">
                Our Kit Finder wizard will recommend the perfect setup based on your 
                space, goals, and experience level.
              </p>
              <Link
                to="/kit-finder"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-white rounded-lg hover:bg-moss transition-colors"
              >
                Find Your Kit
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-terracotta/10 rounded-lg">
                  <Calendar className="w-6 h-6 text-terracotta" />
                </div>
                <h3 className="font-display text-xl text-forest">Calculate your project</h3>
              </div>
              <p className="text-charcoal/70 mb-6">
                Get weight estimates, budget calculations, and material quantities 
                for your terrace garden project.
              </p>
              <Link
                to="/calculator"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-terracotta text-white rounded-lg hover:bg-terracotta/90 transition-colors"
              >
                Use Calculator
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Guide Card Component
function GuideCard({ guide }: { guide: Guide }) {
  const Icon = categoryIcons[guide.category];

  const handleClick = () => {
    analytics.guideViewed(guide.id, guide.title);
  };

  return (
    <Link
      to={`/guides/${guide.slug}`}
      onClick={handleClick}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
    >
      {/* Image */}
      <div className="aspect-video overflow-hidden">
        <img
          src={guide.image}
          alt={guide.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Category Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-sand/50 rounded-full text-xs font-medium text-moss">
            <Icon className="w-3 h-3" />
            {categoryNames[guide.category]}
          </span>
          <span className="flex items-center gap-1 text-xs text-sage">
            <Clock className="w-3 h-3" />
            {guide.readTime} min read
          </span>
        </div>

        {/* Title */}
        <h3 className="font-display text-lg text-forest mb-2 group-hover:text-moss transition-colors">
          {guide.title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-charcoal/70 line-clamp-2 mb-4">
          {guide.excerpt}
        </p>

        {/* Read More */}
        <span className="inline-flex items-center gap-1 text-sm font-medium text-moss group-hover:text-forest transition-colors">
          Read guide
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
