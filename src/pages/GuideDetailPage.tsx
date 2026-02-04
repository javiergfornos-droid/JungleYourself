// ===============================================
// GUIDE DETAIL PAGE
// Full guide content with table of contents
// ===============================================

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar,
  Share2,
  Printer,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { guides } from '../data/guides';
import Button from '../components/ui/Button';

export default function GuideDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [guide, setGuide] = useState(guides.find(g => g.slug === slug));

  useEffect(() => {
    const foundGuide = guides.find(g => g.slug === slug);
    setGuide(foundGuide);
    window.scrollTo(0, 0);
  }, [slug]);

  if (!guide) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-display text-forest mb-4">Guide Not Found</h1>
          <p className="text-forest/70 mb-6">The guide you're looking for doesn't exist.</p>
          <Link to="/guides">
            <Button>Browse All Guides</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Extract headings for table of contents
  const headings = guide.content
    .split('\n')
    .filter(line => line.startsWith('## '))
    .map(line => ({
      text: line.replace('## ', ''),
      id: line.replace('## ', '').toLowerCase().replace(/[^a-z0-9]+/g, '-')
    }));

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: guide.title,
        text: guide.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Related guides (same category, excluding current)
  const relatedGuides = guides
    .filter(g => g.category === guide.category && g.id !== guide.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-gradient-to-br from-forest to-moss text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <Link 
            to="/guides" 
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Guides
          </Link>
          
          <div className="flex items-center gap-3 text-white/80 mb-4">
            <BookOpen className="w-5 h-5" />
            <span className="text-sm font-medium uppercase tracking-wider capitalize">
              {guide.category}
            </span>
          </div>
          
          <h1 className="text-3xl lg:text-4xl xl:text-5xl font-display mb-4">
            {guide.title}
          </h1>
          
          <p className="text-xl text-white/80 max-w-3xl mb-6">
            {guide.excerpt}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-white/70">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{guide.readTime} min read</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{new Date(guide.publishedAt).toLocaleDateString('en-GB', { 
                day: 'numeric', 
                month: 'long', 
                year: 'numeric' 
              })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar - Table of Contents */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              {headings.length > 0 && (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="font-display text-lg text-forest mb-4">Contents</h2>
                  <nav className="space-y-2">
                    {headings.map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
                        className="block text-sm text-forest/70 hover:text-moss transition-colors"
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}
              
              {/* Share Buttons */}
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h2 className="font-display text-lg text-forest mb-4">Share</h2>
                <div className="flex gap-3">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2 bg-sand/50 rounded-lg hover:bg-sand transition-colors text-forest"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-sand/50 rounded-lg hover:bg-sand transition-colors text-forest"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Cover Image */}
            {guide.image && (
              <div className="mb-8 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={guide.image}
                  alt={guide.title}
                  className="w-full h-64 lg:h-80 object-cover"
                />
              </div>
            )}

            {/* Article Content */}
            <article className="prose prose-forest prose-lg max-w-none">
              {guide.content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  const text = line.replace('## ', '');
                  const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                  return <h2 key={index} id={id} className="scroll-mt-24">{text}</h2>;
                }
                if (line.startsWith('### ')) {
                  return <h3 key={index}>{line.replace('### ', '')}</h3>;
                }
                if (line.startsWith('**') && line.endsWith('**')) {
                  return <p key={index}><strong>{line.replace(/\*\*/g, '')}</strong></p>;
                }
                if (line.startsWith('- ')) {
                  return <li key={index}>{line.replace('- ', '')}</li>;
                }
                if (line.match(/^\d+\. /)) {
                  return <li key={index}>{line.replace(/^\d+\. /, '')}</li>;
                }
                if (line.trim() === '') {
                  return null;
                }
                return <p key={index}>{line}</p>;
              })}
            </article>

            {/* Mobile Share */}
            <div className="mt-8 lg:hidden flex gap-3">
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-sand/50 rounded-lg hover:bg-sand transition-colors text-forest"
              >
                <Share2 className="w-4 h-4" />
                Share
              </button>
              <button
                onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-sand/50 rounded-lg hover:bg-sand transition-colors text-forest"
              >
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <div className="mt-16 border-t border-sand pt-12">
            <h2 className="text-2xl font-display text-forest mb-6">Related Guides</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedGuides.map(relatedGuide => (
                <Link
                  key={relatedGuide.id}
                  to={`/guides/${relatedGuide.slug}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  {relatedGuide.image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={relatedGuide.image}
                        alt={relatedGuide.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <h3 className="font-display text-forest group-hover:text-moss transition-colors mb-2">
                      {relatedGuide.title}
                    </h3>
                    <p className="text-sm text-forest/60 line-clamp-2">{relatedGuide.excerpt}</p>
                    <div className="flex items-center gap-1 text-sm text-moss mt-3">
                      Read more <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-br from-moss to-forest rounded-2xl p-8 text-center text-white">
          <h2 className="text-2xl font-display mb-3">Ready to Start Your Project?</h2>
          <p className="text-white/80 mb-6">
            Find the perfect kit for your terrace with our Kit Finder tool.
          </p>
          <Link to="/kit-finder">
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-forest">
              Find Your Kit
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
