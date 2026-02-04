// ===============================================
// PRIVACY POLICY PAGE
// Comprehensive GDPR-compliant privacy policy
// ===============================================

import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Privacy Policy - Jungle Yourself';
  }, []);

  const lastUpdated = 'January 15, 2026';

  return (
    <div className="bg-cream min-h-screen py-12 md:py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <nav className="text-sm text-sage mb-4">
            <Link to="/" className="hover:text-forest">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-forest">Privacy Policy</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl text-forest mb-4">
            Privacy Policy
          </h1>
          <p className="text-sage">Last updated: {lastUpdated}</p>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">1. Introduction</h2>
            <p className="text-charcoal mb-4">
              Jungle Yourself ("we", "our", or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website jungleurself.com and make purchases 
              from our online store.
            </p>
            <p className="text-charcoal">
              By using our website, you consent to the data practices described in this policy. 
              If you do not agree with our policies and practices, please do not use our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">2. Information We Collect</h2>
            
            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">2.1 Personal Information</h3>
            <p className="text-charcoal mb-4">
              We collect personal information that you voluntarily provide to us when you:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Create an account or place an order</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us through our support form</li>
              <li>Participate in promotions or surveys</li>
            </ul>
            <p className="text-charcoal mb-4">This information may include:</p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Name and contact details (email address, phone number)</li>
              <li>Billing and shipping address</li>
              <li>Payment information (processed securely by our payment providers)</li>
              <li>Order history and preferences</li>
            </ul>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-charcoal mb-4">
              When you visit our website, we automatically collect certain information, including:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Device information (browser type, operating system)</li>
              <li>IP address and approximate location</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website or source</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">3. How We Use Your Information</h2>
            <p className="text-charcoal mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Process and fulfil your orders</li>
              <li>Communicate with you about your orders and enquiries</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and product offerings</li>
              <li>Personalise your shopping experience</li>
              <li>Detect and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">4. Legal Basis for Processing (GDPR)</h2>
            <p className="text-charcoal mb-4">
              Under the General Data Protection Regulation (GDPR), we process your personal data based on:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>
                <strong>Contract performance:</strong> Processing necessary to fulfil your orders 
                and provide our services
              </li>
              <li>
                <strong>Legitimate interests:</strong> Processing for fraud prevention, 
                website improvement, and marketing to existing customers
              </li>
              <li>
                <strong>Consent:</strong> Marketing communications to new customers 
                and non-essential cookies
              </li>
              <li>
                <strong>Legal obligation:</strong> Tax records, regulatory compliance
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">5. Information Sharing</h2>
            <p className="text-charcoal mb-4">
              We do not sell your personal information. We may share your data with:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>
                <strong>Service providers:</strong> Payment processors, shipping carriers, 
                email service providers, and analytics services
              </li>
              <li>
                <strong>Legal authorities:</strong> When required by law or to protect our rights
              </li>
              <li>
                <strong>Business transfers:</strong> In the event of a merger, acquisition, 
                or sale of assets
              </li>
            </ul>
            <p className="text-charcoal">
              All third-party service providers are contractually obligated to protect your 
              data and use it only for the purposes we specify.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">6. Data Retention</h2>
            <p className="text-charcoal mb-4">
              We retain your personal information for as long as necessary to:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Provide our services and fulfil your orders</li>
              <li>Comply with legal obligations (typically 7 years for tax records)</li>
              <li>Resolve disputes and enforce agreements</li>
            </ul>
            <p className="text-charcoal">
              You may request deletion of your account and personal data at any time, 
              subject to our legal retention requirements.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">7. Your Rights (GDPR)</h2>
            <p className="text-charcoal mb-4">
              If you are located in the European Economic Area (EEA), you have the following rights:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>
                <strong>Access:</strong> Request a copy of the personal data we hold about you
              </li>
              <li>
                <strong>Rectification:</strong> Request correction of inaccurate data
              </li>
              <li>
                <strong>Erasure:</strong> Request deletion of your personal data
              </li>
              <li>
                <strong>Restriction:</strong> Request limited processing of your data
              </li>
              <li>
                <strong>Portability:</strong> Receive your data in a structured, 
                machine-readable format
              </li>
              <li>
                <strong>Objection:</strong> Object to processing based on legitimate interests
              </li>
              <li>
                <strong>Withdraw consent:</strong> Withdraw previously given consent at any time
              </li>
            </ul>
            <p className="text-charcoal">
              To exercise these rights, please contact us at{' '}
              <a href="mailto:privacy@jungleurself.com" className="text-moss hover:text-forest underline">
                privacy@jungleurself.com
              </a>. 
              We will respond within 30 days.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">8. Cookies</h2>
            <p className="text-charcoal mb-4">
              We use cookies and similar technologies to enhance your browsing experience. 
              For detailed information about our cookie practices, please see our{' '}
              <Link to="/cookies" className="text-moss hover:text-forest underline">
                Cookie Policy
              </Link>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">9. Security</h2>
            <p className="text-charcoal mb-4">
              We implement appropriate technical and organisational measures to protect 
              your personal data, including:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>SSL/TLS encryption for all data transmission</li>
              <li>Secure payment processing through PCI-DSS compliant providers</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and employee training</li>
            </ul>
            <p className="text-charcoal">
              While we strive to protect your information, no method of transmission 
              over the internet is 100% secure.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">10. International Transfers</h2>
            <p className="text-charcoal">
              Your data may be transferred to and processed in countries outside the EEA. 
              We ensure appropriate safeguards are in place, including Standard Contractual 
              Clauses approved by the European Commission, to protect your data in 
              accordance with this policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">11. Children's Privacy</h2>
            <p className="text-charcoal">
              Our services are not directed to individuals under 16 years of age. 
              We do not knowingly collect personal information from children. 
              If you believe we have collected data from a child, please contact us 
              immediately at{' '}
              <a href="mailto:privacy@jungleurself.com" className="text-moss hover:text-forest underline">
                privacy@jungleurself.com
              </a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">12. Changes to This Policy</h2>
            <p className="text-charcoal">
              We may update this Privacy Policy from time to time. We will notify you 
              of any material changes by posting the new policy on this page and updating 
              the "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">13. Contact Us</h2>
            <p className="text-charcoal mb-4">
              If you have questions about this Privacy Policy or our data practices, 
              please contact us:
            </p>
            <div className="bg-sand/30 p-6 rounded-lg">
              <p className="text-charcoal mb-2">
                <strong>Jungle Yourself S.L.</strong>
              </p>
              <p className="text-charcoal mb-2">
                Carrer de la Marina, 123<br />
                08013 Barcelona, Spain
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

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">14. Supervisory Authority</h2>
            <p className="text-charcoal">
              If you are not satisfied with our response to your privacy concerns, 
              you have the right to lodge a complaint with your local data protection authority. 
              In Spain, this is the Agencia Española de Protección de Datos (AEPD) at{' '}
              <a 
                href="https://www.aepd.es" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-moss hover:text-forest underline"
              >
                www.aepd.es
              </a>.
            </p>
          </section>
        </div>

        {/* Related Links */}
        <div className="mt-12 pt-8 border-t border-sage/20">
          <h3 className="font-display text-xl text-forest mb-4">Related Policies</h3>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/terms" 
              className="px-4 py-2 bg-sand/50 hover:bg-sand text-charcoal rounded-lg transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link 
              to="/cookies" 
              className="px-4 py-2 bg-sand/50 hover:bg-sand text-charcoal rounded-lg transition-colors"
            >
              Cookie Policy
            </Link>
            <Link 
              to="/disclaimer" 
              className="px-4 py-2 bg-sand/50 hover:bg-sand text-charcoal rounded-lg transition-colors"
            >
              Disclaimer
            </Link>
            <Link 
              to="/support" 
              className="px-4 py-2 bg-sand/50 hover:bg-sand text-charcoal rounded-lg transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
