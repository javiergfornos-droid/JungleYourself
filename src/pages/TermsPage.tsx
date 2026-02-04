// ===============================================
// TERMS & CONDITIONS PAGE
// Comprehensive e-commerce terms of service
// ===============================================

import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Terms & Conditions - Jungle Yourself';
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
            <span className="text-forest">Terms & Conditions</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl text-forest mb-4">
            Terms & Conditions
          </h1>
          <p className="text-sage">Last updated: {lastUpdated}</p>
        </header>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">1. Agreement to Terms</h2>
            <p className="text-charcoal mb-4">
              These Terms and Conditions ("Terms") constitute a legally binding agreement 
              between you and Jungle Yourself S.L. ("Company", "we", "us", or "our") 
              regarding your use of our website jungleurself.com and purchase of our products.
            </p>
            <p className="text-charcoal">
              By accessing our website or placing an order, you agree to be bound by these Terms, 
              our Privacy Policy, and any additional terms that may apply. If you do not agree 
              with any part of these Terms, you must not use our website or services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">2. Products and Services</h2>
            
            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">2.1 Product Descriptions</h3>
            <p className="text-charcoal mb-4">
              We make every effort to display our products accurately, including descriptions, 
              images, and specifications. However, we cannot guarantee that your monitor's 
              display will accurately reflect the actual colours or appearance of products.
            </p>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">2.2 Product Availability</h3>
            <p className="text-charcoal mb-4">
              All products are subject to availability. We reserve the right to discontinue 
              any product at any time. If a product you ordered is unavailable, we will 
              contact you to offer alternatives or a full refund.
            </p>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">2.3 DIY Products</h3>
            <p className="text-charcoal">
              Our products are designed for do-it-yourself installation. Proper installation 
              requires following our guides and using appropriate tools and safety equipment. 
              We are not responsible for damage caused by improper installation.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">3. Orders and Pricing</h2>
            
            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">3.1 Order Acceptance</h3>
            <p className="text-charcoal mb-4">
              Your order constitutes an offer to purchase our products. We reserve the right 
              to accept or decline any order. An order is not accepted until we send you an 
              order confirmation email.
            </p>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">3.2 Pricing</h3>
            <p className="text-charcoal mb-4">
              All prices are displayed in Euros (€) and include VAT where applicable. 
              We reserve the right to change prices at any time without notice, but changes 
              will not affect orders that have already been confirmed.
            </p>
            <p className="text-charcoal mb-4">
              In the unlikely event of a pricing error, we will contact you before processing 
              your order to inform you of the correct price. You may then choose to proceed 
              with the corrected price or cancel your order for a full refund.
            </p>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">3.3 Payment</h3>
            <p className="text-charcoal mb-4">
              We accept the following payment methods:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Credit and debit cards (Visa, Mastercard, American Express)</li>
              <li>PayPal</li>
              <li>Bank transfer (for orders over €500)</li>
            </ul>
            <p className="text-charcoal">
              Payment is processed securely through our payment providers. We do not store 
              your complete payment details on our servers.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">4. Shipping and Delivery</h2>
            
            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">4.1 Delivery Areas</h3>
            <p className="text-charcoal mb-4">
              We currently ship to Spain, Portugal, France, Italy, and Germany. 
              Delivery to the Canary Islands, Ceuta, Melilla, and other non-mainland 
              territories may incur additional charges and longer delivery times.
            </p>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">4.2 Delivery Times</h3>
            <p className="text-charcoal mb-4">
              Estimated delivery times are provided at checkout and in your order confirmation. 
              These are estimates only and may vary due to factors beyond our control, including 
              courier delays, customs procedures, and weather conditions.
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Spain (mainland): 3-5 working days</li>
              <li>Portugal: 5-7 working days</li>
              <li>France, Italy, Germany: 5-10 working days</li>
            </ul>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">4.3 Shipping Costs</h3>
            <p className="text-charcoal mb-4">
              Shipping costs are calculated based on weight, volume, and destination. 
              Free shipping is available on orders over €150 within mainland Spain. 
              Final shipping costs are displayed at checkout before payment.
            </p>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">4.4 Risk of Loss</h3>
            <p className="text-charcoal">
              Risk of loss and title for products purchased from us pass to you upon 
              delivery of the items to the carrier.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">5. Returns and Refunds</h2>
            
            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">5.1 Right of Withdrawal</h3>
            <p className="text-charcoal mb-4">
              Under EU consumer law, you have the right to withdraw from your purchase 
              within 14 days of receiving your order without giving any reason. To exercise 
              this right, you must inform us of your decision using a clear statement 
              (e.g., email, letter, or our online return form).
            </p>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">5.2 Extended Return Period</h3>
            <p className="text-charcoal mb-4">
              We offer an extended 30-day return period from the date of delivery for 
              unopened products in their original packaging.
            </p>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">5.3 Return Conditions</h3>
            <p className="text-charcoal mb-4">
              To be eligible for a return, products must be:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>In their original, unopened packaging</li>
              <li>Unused and in the same condition as received</li>
              <li>Accompanied by proof of purchase</li>
            </ul>
            <p className="text-charcoal mb-4">
              The following items cannot be returned:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Live plants that have been planted or damaged</li>
              <li>Custom-cut or made-to-measure products</li>
              <li>Products that have been installed</li>
            </ul>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">5.4 Return Process</h3>
            <p className="text-charcoal mb-4">
              To initiate a return:
            </p>
            <ol className="list-decimal pl-6 text-charcoal mb-4 space-y-2">
              <li>Contact us at returns@jungleurself.com within the return period</li>
              <li>Receive your return authorisation and shipping label</li>
              <li>Pack products securely in original packaging</li>
              <li>Ship to our returns centre</li>
            </ol>
            <p className="text-charcoal">
              Return shipping costs are the responsibility of the customer unless the 
              product was defective or we made an error.
            </p>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">5.5 Refunds</h3>
            <p className="text-charcoal">
              Once we receive and inspect your return, we will process your refund within 
              14 days. Refunds will be issued to the original payment method. Please note 
              that it may take additional time for your bank to process the refund.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">6. Product Warranty</h2>
            
            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">6.1 Legal Guarantee</h3>
            <p className="text-charcoal mb-4">
              All products sold by Jungle Yourself come with the legal guarantee required 
              by EU consumer law (minimum 2 years from delivery). This covers defects in 
              materials and workmanship that were present at the time of delivery.
            </p>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">6.2 Extended Warranties</h3>
            <p className="text-charcoal mb-4">
              Some products carry extended manufacturer warranties:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>EPDM membranes: 20-year warranty against material defects</li>
              <li>Drainage panels: 10-year warranty</li>
              <li>Metal edging: 5-year warranty against rust</li>
            </ul>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">6.3 Warranty Exclusions</h3>
            <p className="text-charcoal">
              Warranties do not cover damage caused by improper installation, misuse, 
              neglect, accidents, modifications, or exposure to conditions beyond the 
              product's specifications.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">7. Limitation of Liability</h2>
            <p className="text-charcoal mb-4">
              To the fullest extent permitted by law:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>
                We are not liable for any indirect, incidental, special, or consequential 
                damages arising from your use of our products or website
              </li>
              <li>
                Our total liability for any claim shall not exceed the amount you paid 
                for the product(s) in question
              </li>
              <li>
                We are not responsible for any damage to your property resulting from 
                improper installation or use of our products
              </li>
            </ul>
            <p className="text-charcoal">
              Nothing in these Terms excludes or limits our liability for death or personal 
              injury caused by our negligence, fraud, or any other liability that cannot be 
              excluded by law.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">8. Intellectual Property</h2>
            <p className="text-charcoal mb-4">
              All content on our website, including text, images, graphics, logos, and 
              software, is the property of Jungle Yourself S.L. or our licensors and is 
              protected by intellectual property laws.
            </p>
            <p className="text-charcoal">
              You may not reproduce, distribute, modify, or create derivative works from 
              our content without our prior written consent, except for personal, 
              non-commercial use.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">9. User Accounts</h2>
            <p className="text-charcoal mb-4">
              If you create an account on our website, you are responsible for:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us immediately of any unauthorised use</li>
            </ul>
            <p className="text-charcoal">
              We reserve the right to suspend or terminate accounts that violate these Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">10. Governing Law and Disputes</h2>
            <p className="text-charcoal mb-4">
              These Terms are governed by the laws of Spain. Any disputes arising from 
              these Terms or your use of our services shall be subject to the exclusive 
              jurisdiction of the courts of Barcelona, Spain.
            </p>
            <p className="text-charcoal mb-4">
              For EU consumers: You may also have the right to use the EU Online Dispute 
              Resolution platform at{' '}
              <a 
                href="https://ec.europa.eu/consumers/odr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-moss hover:text-forest underline"
              >
                https://ec.europa.eu/consumers/odr
              </a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">11. Changes to Terms</h2>
            <p className="text-charcoal">
              We may modify these Terms at any time by posting the revised Terms on our 
              website. Changes will take effect immediately upon posting. Your continued 
              use of our website after any changes indicates your acceptance of the 
              modified Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">12. Severability</h2>
            <p className="text-charcoal">
              If any provision of these Terms is found to be invalid or unenforceable, 
              the remaining provisions will continue in full force and effect.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">13. Contact Information</h2>
            <p className="text-charcoal mb-4">
              For questions about these Terms, please contact us:
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
                <a href="mailto:legal@jungleurself.com" className="text-moss hover:text-forest underline">
                  legal@jungleurself.com
                </a>
              </p>
              <p className="text-charcoal mb-2">
                Phone: +34 93 123 4567
              </p>
              <p className="text-charcoal">
                Company Registration: B12345678<br />
                VAT Number: ESB12345678
              </p>
            </div>
          </section>
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
