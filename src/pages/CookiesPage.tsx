// ===============================================
// COOKIE POLICY PAGE
// GDPR-compliant cookie policy
// ===============================================

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

interface CookieCategory {
  name: string;
  description: string;
  required: boolean;
  cookies: {
    name: string;
    purpose: string;
    duration: string;
    provider: string;
  }[];
}

export default function CookiesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Cookie Policy - Jungle Yourself';
  }, []);

  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const lastUpdated = 'January 15, 2026';

  const cookieCategories: CookieCategory[] = [
    {
      name: 'Essential Cookies',
      description: 'These cookies are necessary for the website to function and cannot be switched off. They are usually set in response to your actions such as setting privacy preferences, logging in, or filling in forms.',
      required: true,
      cookies: [
        {
          name: 'session_id',
          purpose: 'Maintains user session state across page requests',
          duration: 'Session',
          provider: 'Jungle Yourself'
        },
        {
          name: 'csrf_token',
          purpose: 'Protects against cross-site request forgery attacks',
          duration: 'Session',
          provider: 'Jungle Yourself'
        },
        {
          name: 'cart_items',
          purpose: 'Stores shopping cart contents',
          duration: '30 days',
          provider: 'Jungle Yourself'
        },
        {
          name: 'cookie_consent',
          purpose: 'Stores your cookie consent preferences',
          duration: '1 year',
          provider: 'Jungle Yourself'
        }
      ]
    },
    {
      name: 'Functional Cookies',
      description: 'These cookies enable enhanced functionality and personalisation, such as remembering your preferences and recent searches. If you disable these cookies, some features may not work properly.',
      required: false,
      cookies: [
        {
          name: 'language_preference',
          purpose: 'Remembers your preferred language',
          duration: '1 year',
          provider: 'Jungle Yourself'
        },
        {
          name: 'recently_viewed',
          purpose: 'Stores your recently viewed products',
          duration: '30 days',
          provider: 'Jungle Yourself'
        },
        {
          name: 'wizard_progress',
          purpose: 'Saves your progress in the Kit Finder wizard',
          duration: '7 days',
          provider: 'Jungle Yourself'
        }
      ]
    },
    {
      name: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our website.',
      required: false,
      cookies: [
        {
          name: '_ga',
          purpose: 'Distinguishes unique users for Google Analytics',
          duration: '2 years',
          provider: 'Google'
        },
        {
          name: '_ga_*',
          purpose: 'Maintains session state for Google Analytics 4',
          duration: '2 years',
          provider: 'Google'
        },
        {
          name: '_gid',
          purpose: 'Distinguishes users for Google Analytics',
          duration: '24 hours',
          provider: 'Google'
        },
        {
          name: '_gat',
          purpose: 'Throttles request rate to Google Analytics',
          duration: '1 minute',
          provider: 'Google'
        }
      ]
    },
    {
      name: 'Marketing Cookies',
      description: 'These cookies are used to track visitors across websites to display relevant advertisements. They may be set by advertising partners to build a profile of your interests.',
      required: false,
      cookies: [
        {
          name: '_fbp',
          purpose: 'Used by Facebook to deliver advertisements',
          duration: '90 days',
          provider: 'Facebook'
        },
        {
          name: 'fr',
          purpose: 'Enables Facebook ad targeting',
          duration: '90 days',
          provider: 'Facebook'
        },
        {
          name: 'IDE',
          purpose: 'Used by Google DoubleClick for ad targeting',
          duration: '13 months',
          provider: 'Google'
        },
        {
          name: 'NID',
          purpose: 'Stores preferences for Google ads',
          duration: '6 months',
          provider: 'Google'
        }
      ]
    }
  ];

  return (
    <div className="bg-cream min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <nav className="text-sm text-sage mb-4">
            <Link to="/" className="hover:text-forest">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-forest">Cookie Policy</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl text-forest mb-4">
            Cookie Policy
          </h1>
          <p className="text-sage">Last updated: {lastUpdated}</p>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">What Are Cookies?</h2>
            <p className="text-charcoal mb-4">
              Cookies are small text files that are placed on your computer or mobile 
              device when you visit a website. They are widely used to make websites 
              work more efficiently, provide a better user experience, and give website 
              owners information about how visitors use their site.
            </p>
            <p className="text-charcoal">
              This Cookie Policy explains what cookies we use on jungleurself.com, 
              why we use them, and how you can control them.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">How We Use Cookies</h2>
            <p className="text-charcoal mb-4">
              We use cookies for several purposes:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>
                <strong>Essential functions:</strong> To enable core website functionality 
                such as shopping cart, user authentication, and security
              </li>
              <li>
                <strong>Preferences:</strong> To remember your settings and preferences
              </li>
              <li>
                <strong>Analytics:</strong> To understand how visitors use our website 
                and improve our services
              </li>
              <li>
                <strong>Marketing:</strong> To deliver relevant advertisements and 
                measure their effectiveness
              </li>
            </ul>
          </section>

          {/* Cookie Categories */}
          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-6">Types of Cookies We Use</h2>
            
            <div className="space-y-4">
              {cookieCategories.map((category) => (
                <div 
                  key={category.name}
                  className="border border-sage/30 rounded-lg overflow-hidden"
                >
                  <button
                    className="w-full flex items-center justify-between p-4 bg-white hover:bg-sand/20 transition-colors text-left"
                    onClick={() => setActiveCategory(
                      activeCategory === category.name ? null : category.name
                    )}
                    aria-expanded={activeCategory === category.name}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-forest">{category.name}</span>
                      {category.required && (
                        <span className="text-xs bg-moss/20 text-moss px-2 py-0.5 rounded">
                          Always Active
                        </span>
                      )}
                    </div>
                    <svg 
                      className={`w-5 h-5 text-sage transition-transform ${
                        activeCategory === category.name ? 'rotate-180' : ''
                      }`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  
                  {activeCategory === category.name && (
                    <div className="p-4 bg-sand/10 border-t border-sage/20">
                      <p className="text-charcoal mb-4 text-sm">{category.description}</p>
                      
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-sage/30">
                              <th className="text-left py-2 px-2 font-semibold text-forest">Cookie</th>
                              <th className="text-left py-2 px-2 font-semibold text-forest">Purpose</th>
                              <th className="text-left py-2 px-2 font-semibold text-forest">Duration</th>
                              <th className="text-left py-2 px-2 font-semibold text-forest">Provider</th>
                            </tr>
                          </thead>
                          <tbody>
                            {category.cookies.map((cookie, index) => (
                              <tr 
                                key={cookie.name}
                                className={index !== category.cookies.length - 1 ? 'border-b border-sage/20' : ''}
                              >
                                <td className="py-2 px-2 font-mono text-moss text-xs">{cookie.name}</td>
                                <td className="py-2 px-2 text-charcoal">{cookie.purpose}</td>
                                <td className="py-2 px-2 text-charcoal whitespace-nowrap">{cookie.duration}</td>
                                <td className="py-2 px-2 text-charcoal">{cookie.provider}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">Managing Your Cookie Preferences</h2>
            
            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">Cookie Consent Banner</h3>
            <p className="text-charcoal mb-4">
              When you first visit our website, you will see a cookie consent banner 
              that allows you to accept or customise your cookie preferences. You can 
              change your preferences at any time by clicking the "Cookie Settings" 
              link in our website footer.
            </p>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">Browser Settings</h3>
            <p className="text-charcoal mb-4">
              Most web browsers allow you to control cookies through their settings. 
              You can typically:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>View what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from particular websites</li>
              <li>Block all cookies from being set</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>
            <p className="text-charcoal mb-4">
              Here are links to cookie management instructions for popular browsers:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>
                <a 
                  href="https://support.google.com/chrome/answer/95647" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-moss hover:text-forest underline"
                >
                  Google Chrome
                </a>
              </li>
              <li>
                <a 
                  href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-moss hover:text-forest underline"
                >
                  Mozilla Firefox
                </a>
              </li>
              <li>
                <a 
                  href="https://support.apple.com/en-gb/guide/safari/sfri11471/mac" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-moss hover:text-forest underline"
                >
                  Safari
                </a>
              </li>
              <li>
                <a 
                  href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-moss hover:text-forest underline"
                >
                  Microsoft Edge
                </a>
              </li>
            </ul>

            <div className="bg-sand/30 p-4 rounded-lg">
              <p className="text-charcoal text-sm">
                <strong>Note:</strong> If you block all cookies, some parts of our 
                website may not function properly. Essential cookies are required for 
                features like the shopping cart and checkout process.
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">Third-Party Cookies</h2>
            <p className="text-charcoal mb-4">
              Some cookies on our website are set by third-party services that appear 
              on our pages. We do not control these cookies. The third parties that 
              set cookies on our website include:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>
                <strong>Google Analytics:</strong> For website analytics. 
                <a 
                  href="https://policies.google.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-moss hover:text-forest underline ml-1"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong>Facebook:</strong> For social sharing and advertising. 
                <a 
                  href="https://www.facebook.com/privacy/explanation" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-moss hover:text-forest underline ml-1"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong>Stripe:</strong> For payment processing. 
                <a 
                  href="https://stripe.com/privacy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-moss hover:text-forest underline ml-1"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">Do Not Track</h2>
            <p className="text-charcoal">
              Some browsers have a "Do Not Track" feature that signals to websites 
              that you do not want to have your online activity tracked. Currently, 
              there is no industry standard for how companies should respond to 
              Do Not Track signals. We recommend using our cookie consent tool to 
              manage your preferences.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">Updates to This Policy</h2>
            <p className="text-charcoal">
              We may update this Cookie Policy from time to time to reflect changes 
              in our practices or for legal, operational, or regulatory reasons. 
              We will notify you of any significant changes by posting a notice on 
              our website. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">Contact Us</h2>
            <p className="text-charcoal mb-4">
              If you have questions about our use of cookies, please contact us:
            </p>
            <div className="bg-sand/30 p-6 rounded-lg">
              <p className="text-charcoal mb-2">
                <strong>Jungle Yourself S.L.</strong>
              </p>
              <p className="text-charcoal mb-2">
                Email:{' '}
                <a href="mailto:privacy@jungleurself.com" className="text-moss hover:text-forest underline">
                  privacy@jungleurself.com
                </a>
              </p>
              <p className="text-charcoal">
                Phone: +34 93 123 4567
              </p>
            </div>
          </section>
        </div>

        {/* Cookie Settings Button (Placeholder) */}
        <div className="mt-10 p-6 bg-moss/10 border border-moss/30 rounded-lg text-center">
          <h3 className="font-display text-lg text-forest mb-3">Manage Your Preferences</h3>
          <p className="text-charcoal text-sm mb-4">
            You can update your cookie preferences at any time.
          </p>
          <button 
            className="px-6 py-3 bg-forest text-white rounded-lg hover:bg-moss transition-colors"
            onClick={() => alert('Cookie settings dialog would open here')}
          >
            Open Cookie Settings
          </button>
        </div>

        {/* Related Links */}
        <div className="mt-12 pt-8 border-t border-sage/20">
          <h3 className="font-display text-xl text-forest mb-4">Related Policies</h3>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/privacy" 
              className="px-4 py-2 bg-sand/50 hover:bg-sand text-charcoal rounded-lg transition-colors"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="px-4 py-2 bg-sand/50 hover:bg-sand text-charcoal rounded-lg transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link 
              to="/disclaimer" 
              className="px-4 py-2 bg-sand/50 hover:bg-sand text-charcoal rounded-lg transition-colors"
            >
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
