// ===============================================
// FAQ PAGE
// Categorized FAQs with search and JSON-LD
// ===============================================

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  HelpCircle, 
  Search, 
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Package,
  Wrench,
  Leaf,
  RefreshCw
} from 'lucide-react';
import { faqs, faqCategories } from '../data/faqs';
import type { FAQCategory, FAQItem } from '../data/faqs';

const categoryIcons: Record<FAQCategory, React.ElementType> = {
  'general': HelpCircle,
  'ordering': Package,
  'installation': Wrench,
  'maintenance': Leaf,
  'returns': RefreshCw
};

const categoryNames: Record<FAQCategory, string> = {
  'general': 'General Questions',
  'ordering': 'Ordering & Shipping',
  'installation': 'Installation',
  'maintenance': 'Maintenance & Care',
  'returns': 'Returns & Warranty'
};

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<FAQCategory | 'all'>('all');
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  // Generate JSON-LD structured data
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.question,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answer
        }
      }))
    });
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch = searchQuery === '' ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Group FAQs by category for display
  const groupedFaqs = faqCategories.reduce<Record<FAQCategory, FAQItem[]>>((acc, category) => {
    const categoryFaqs = filteredFaqs.filter(faq => faq.category === category);
    if (categoryFaqs.length > 0) {
      acc[category] = categoryFaqs;
    }
    return acc;
  }, {} as Record<FAQCategory, FAQItem[]>);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest to-moss text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-white/80 mb-4">
              <HelpCircle className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Support</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-display mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/80">
              Find answers to common questions about our products, shipping, installation, 
              and more. Can't find what you're looking for? Contact our support team.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-forest/40" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-sand rounded-lg bg-white 
                       focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
            />
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-moss text-white'
                  : 'bg-sand/50 text-forest hover:bg-sand'
              }`}
            >
              All Topics
            </button>
            {faqCategories.map(category => {
              const Icon = categoryIcons[category];
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors 
                            flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-moss text-white'
                      : 'bg-sand/50 text-forest hover:bg-sand'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {categoryNames[category]}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQs */}
        {filteredFaqs.length > 0 ? (
          selectedCategory === 'all' ? (
            // Grouped view
            <div className="space-y-10">
              {Object.entries(groupedFaqs).map(([category, categoryFaqs]) => {
                const Icon = categoryIcons[category as FAQCategory];
                return (
                  <div key={category}>
                    <div className="flex items-center gap-3 mb-4">
                      <Icon className="w-5 h-5 text-moss" />
                      <h2 className="text-xl font-display text-forest">
                        {categoryNames[category as FAQCategory]}
                      </h2>
                    </div>
                    <div className="space-y-3">
                      {categoryFaqs.map(faq => (
                        <div
                          key={faq.id}
                          className="bg-white rounded-xl overflow-hidden shadow-sm"
                        >
                          <button
                            onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                            className="w-full flex items-start justify-between p-5 text-left 
                                     hover:bg-sand/30 transition-colors"
                          >
                            <span className="font-medium text-forest pr-4">{faq.question}</span>
                            {expandedFaq === faq.id ? (
                              <ChevronUp className="w-5 h-5 text-moss flex-shrink-0" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-moss flex-shrink-0" />
                            )}
                          </button>
                          {expandedFaq === faq.id && (
                            <div className="px-5 pb-5 text-forest/70 leading-relaxed">
                              {faq.answer}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            // Flat view for single category
            <div className="space-y-3">
              {filteredFaqs.map(faq => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                    className="w-full flex items-start justify-between p-5 text-left 
                             hover:bg-sand/30 transition-colors"
                  >
                    <span className="font-medium text-forest pr-4">{faq.question}</span>
                    {expandedFaq === faq.id ? (
                      <ChevronUp className="w-5 h-5 text-moss flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-moss flex-shrink-0" />
                    )}
                  </button>
                  {expandedFaq === faq.id && (
                    <div className="px-5 pb-5 text-forest/70 leading-relaxed">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <HelpCircle className="w-12 h-12 text-forest/30 mx-auto mb-4" />
            <h3 className="text-xl font-display text-forest mb-2">No matching questions</h3>
            <p className="text-forest/60 mb-6">
              Try adjusting your search or browse all categories.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="text-moss font-medium hover:underline"
            >
              View all FAQs
            </button>
          </div>
        )}

        {/* Quick Links */}
        <section className="mt-16 pt-12 border-t border-sand">
          <h2 className="text-xl font-display text-forest mb-6">Helpful Resources</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              to="/guides/beginners-guide-to-terrace-gardens"
              className="p-5 bg-white rounded-xl hover:shadow-md transition-shadow group"
            >
              <Leaf className="w-6 h-6 text-moss mb-3" />
              <h3 className="font-display text-forest group-hover:text-moss transition-colors">
                Beginner's Guide
              </h3>
              <p className="text-sm text-forest/60 mt-1">
                New to terrace gardening? Start here.
              </p>
            </Link>
            <Link
              to="/guides/step-by-step-installation"
              className="p-5 bg-white rounded-xl hover:shadow-md transition-shadow group"
            >
              <Wrench className="w-6 h-6 text-moss mb-3" />
              <h3 className="font-display text-forest group-hover:text-moss transition-colors">
                Installation Guide
              </h3>
              <p className="text-sm text-forest/60 mt-1">
                Step-by-step instructions.
              </p>
            </Link>
            <Link
              to="/calculator"
              className="p-5 bg-white rounded-xl hover:shadow-md transition-shadow group"
            >
              <Package className="w-6 h-6 text-moss mb-3" />
              <h3 className="font-display text-forest group-hover:text-moss transition-colors">
                Project Calculator
              </h3>
              <p className="text-sm text-forest/60 mt-1">
                Estimate materials and cost.
              </p>
            </Link>
            <Link
              to="/support"
              className="p-5 bg-white rounded-xl hover:shadow-md transition-shadow group"
            >
              <HelpCircle className="w-6 h-6 text-moss mb-3" />
              <h3 className="font-display text-forest group-hover:text-moss transition-colors">
                Contact Support
              </h3>
              <p className="text-sm text-forest/60 mt-1">
                Get help from our team.
              </p>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-br from-sand to-sand/50 rounded-2xl p-8 lg:p-12">
          <div className="md:flex md:items-center md:justify-between">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-display text-forest mb-2">
                Still Have Questions?
              </h2>
              <p className="text-forest/70">
                Our support team is here to help you with any questions about your project.
              </p>
            </div>
            <Link
              to="/support"
              className="inline-flex items-center gap-2 px-6 py-3 bg-moss text-white 
                       rounded-lg font-medium hover:bg-forest transition-colors"
            >
              Contact Support
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
