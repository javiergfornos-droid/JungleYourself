// ===============================================
// DISCLAIMER PAGE
// Important disclaimers for DIY green roof products
// ===============================================

import { Link } from 'react-router-dom';
import { useEffect } from 'react';

export default function DisclaimerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Disclaimer - Jungle Yourself';
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
            <span className="text-forest">Disclaimer</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl text-forest mb-4">
            Disclaimer
          </h1>
          <p className="text-sage">Last updated: {lastUpdated}</p>
        </header>

        {/* Important Notice Banner */}
        <div className="bg-terracotta/10 border-l-4 border-terracotta p-6 rounded-r-lg mb-10">
          <h2 className="font-display text-xl text-terracotta mb-2">
            ⚠️ Important Notice
          </h2>
          <p className="text-charcoal">
            Please read this disclaimer carefully before purchasing or installing any 
            products from Jungle Yourself. Our products require proper planning, 
            assessment, and in some cases, professional consultation before installation.
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">1. General Disclaimer</h2>
            <p className="text-charcoal mb-4">
              The information, guides, calculators, and tools provided on jungleurself.com 
              ("Website") are for general informational purposes only. While we strive to 
              provide accurate and up-to-date information, we make no representations or 
              warranties of any kind, express or implied, about the completeness, accuracy, 
              reliability, suitability, or availability of the information, products, or 
              services contained on this Website.
            </p>
            <p className="text-charcoal">
              Any reliance you place on such information is strictly at your own risk. 
              We will not be liable for any loss or damage arising from your use of 
              this Website or our products.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">2. Structural Load and Building Safety</h2>
            
            <div className="bg-red-50 border border-red-200 p-6 rounded-lg mb-6">
              <h3 className="font-bold text-red-800 mb-3">⚠️ Critical Safety Information</h3>
              <p className="text-charcoal mb-4">
                <strong>Adding weight to roofs, terraces, and balconies can pose serious 
                structural risks.</strong> You must verify that your structure can safely 
                support the additional load before installing any green roof or terrace 
                garden system.
              </p>
            </div>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">2.1 Load Calculations</h3>
            <p className="text-charcoal mb-4">
              The weight estimates provided on our Website, including in our Calculator tool 
              and product specifications, are approximate and based on typical conditions. 
              Actual weights may vary significantly based on:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Water saturation levels (weight increases substantially when wet)</li>
              <li>Plant growth and maturity</li>
              <li>Snow and ice accumulation</li>
              <li>Substrate settling and compaction</li>
              <li>Additional features or modifications</li>
            </ul>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">2.2 Professional Assessment Required</h3>
            <p className="text-charcoal mb-4">
              Before installing any green roof or terrace garden system, you should:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>
                <strong>Consult a structural engineer or architect</strong> to assess your 
                building's load-bearing capacity
              </li>
              <li>
                <strong>Review your building's original construction documents</strong> to 
                understand its design load specifications
              </li>
              <li>
                <strong>Consider cumulative loads</strong> including existing roofing materials, 
                furniture, people, and environmental factors
              </li>
              <li>
                <strong>Account for saturated weight</strong>, which can be 2-3 times higher 
                than dry weight
              </li>
            </ul>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">2.3 Our Responsibility</h3>
            <p className="text-charcoal">
              Jungle Yourself is not responsible for determining whether your specific 
              structure can support our products. We do not conduct structural assessments 
              and our weight estimates and recommendations should not be considered 
              professional engineering advice.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">3. Waterproofing and Drainage</h2>
            
            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">3.1 Existing Waterproofing</h3>
            <p className="text-charcoal mb-4">
              Our products are designed to be installed over existing, intact waterproof 
              membranes. Before installation, you should:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Verify that your existing waterproofing is in good condition</li>
              <li>Repair any leaks, cracks, or damaged areas</li>
              <li>Ensure proper drainage systems are in place and functional</li>
              <li>Consider a professional waterproofing inspection</li>
            </ul>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">3.2 Root Protection</h3>
            <p className="text-charcoal mb-4">
              While our systems include root barrier membranes, these are designed for 
              the shallow-rooted plants recommended for extensive green roofs. We cannot 
              guarantee protection against:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Plants with aggressive root systems</li>
              <li>Trees or large shrubs not recommended for your system type</li>
              <li>Pre-existing waterproofing defects</li>
            </ul>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">3.3 Water Damage</h3>
            <p className="text-charcoal">
              Jungle Yourself is not responsible for water damage, leaks, or structural 
              damage caused by improper installation, inadequate existing waterproofing, 
              or failure to maintain proper drainage.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">4. Building Regulations and Permits</h2>
            
            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">4.1 Local Regulations</h3>
            <p className="text-charcoal mb-4">
              Building regulations, permits, and requirements vary by location. It is 
              your responsibility to:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Check local building codes and regulations</li>
              <li>Obtain necessary permits before installation</li>
              <li>Comply with community or building association rules</li>
              <li>Understand fire safety requirements for your area</li>
              <li>Verify insurance implications</li>
            </ul>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">4.2 Listed Buildings and Protected Areas</h3>
            <p className="text-charcoal mb-4">
              If your building is listed, historic, or located in a protected area, 
              additional restrictions may apply. Consult with local authorities before 
              making any modifications.
            </p>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">4.3 Rental Properties</h3>
            <p className="text-charcoal">
              If you are a tenant, you must obtain written permission from your landlord 
              before installing any green roof or terrace garden system.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">5. Installation Disclaimer</h2>
            
            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">5.1 DIY Risks</h3>
            <p className="text-charcoal mb-4">
              Our products are designed for do-it-yourself installation, but all DIY 
              construction work carries inherent risks. Working at height and handling 
              heavy materials can result in injury or death.
            </p>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">5.2 Safety Precautions</h3>
            <p className="text-charcoal mb-4">
              You are responsible for taking appropriate safety precautions, including:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Using appropriate personal protective equipment (PPE)</li>
              <li>Following all safety guidelines in our installation guides</li>
              <li>Working with a helper when handling heavy materials</li>
              <li>Using proper fall protection when working at height</li>
              <li>Avoiding work in adverse weather conditions</li>
            </ul>

            <h3 className="font-semibold text-xl text-charcoal mt-6 mb-3">5.3 Professional Installation</h3>
            <p className="text-charcoal">
              If you are unsure about any aspect of the installation, we strongly 
              recommend hiring a professional installer. Jungle Yourself can provide 
              referrals to qualified installers in your area upon request.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">6. Plant Health and Survival</h2>
            <p className="text-charcoal mb-4">
              While we carefully select plants suitable for green roof and terrace 
              conditions, we cannot guarantee plant survival or performance. Success 
              depends on many factors including:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Local climate and microclimate conditions</li>
              <li>Proper installation and establishment care</li>
              <li>Ongoing maintenance and watering</li>
              <li>Sun exposure and wind conditions</li>
              <li>Substrate depth and quality</li>
            </ul>
            <p className="text-charcoal">
              Live plant products are excluded from our standard return policy once 
              planted. Please review our plant care guides carefully and contact us 
              within 48 hours of delivery if plants arrive in poor condition.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">7. Calculator and Estimation Tools</h2>
            <p className="text-charcoal mb-4">
              The Calculator tool and other estimation features on our Website provide 
              rough estimates based on simplified assumptions. These tools:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Are for general guidance only</li>
              <li>Should not replace professional assessment</li>
              <li>May not account for your specific conditions</li>
              <li>Use average values that may not apply to your situation</li>
            </ul>
            <p className="text-charcoal">
              Always consult with professionals and verify calculations before making 
              purchasing or installation decisions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">8. Environmental Factors</h2>
            <p className="text-charcoal mb-4">
              Green roofs and terrace gardens are living systems affected by environmental 
              conditions. We are not responsible for damage or failure caused by:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Extreme weather events (heat waves, frost, storms, flooding)</li>
              <li>Drought or irrigation failure</li>
              <li>Pest infestations</li>
              <li>Disease outbreaks</li>
              <li>Air pollution or chemical contamination</li>
              <li>Climate change impacts</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">9. Insurance</h2>
            <p className="text-charcoal mb-4">
              We strongly recommend that you:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Inform your home insurance provider before installation</li>
              <li>Verify that your policy covers green roof or terrace garden systems</li>
              <li>Understand any exclusions or additional requirements</li>
              <li>Consider additional coverage if recommended</li>
            </ul>
            <p className="text-charcoal">
              Failure to inform your insurer may void your coverage for related claims.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">10. Third-Party Links</h2>
            <p className="text-charcoal">
              Our Website may contain links to third-party websites or resources. 
              We are not responsible for the content, accuracy, or practices of 
              these external sites. Links are provided for convenience and do not 
              constitute endorsement.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">11. Limitation of Liability</h2>
            <p className="text-charcoal mb-4">
              To the maximum extent permitted by law, Jungle Yourself S.L., its 
              directors, employees, and agents shall not be liable for:
            </p>
            <ul className="list-disc pl-6 text-charcoal mb-4 space-y-2">
              <li>Any structural damage to your property</li>
              <li>Water damage or leaks</li>
              <li>Personal injury during installation or maintenance</li>
              <li>Plant failure or loss</li>
              <li>Loss of use or enjoyment of your property</li>
              <li>Any indirect, consequential, or punitive damages</li>
            </ul>
            <p className="text-charcoal">
              This disclaimer does not affect your statutory rights as a consumer 
              or any liability that cannot be excluded under applicable law.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-display text-2xl text-forest mb-4">12. Contact Us</h2>
            <p className="text-charcoal mb-4">
              If you have questions about this disclaimer or need clarification 
              before purchasing, please contact us:
            </p>
            <div className="bg-sand/30 p-6 rounded-lg">
              <p className="text-charcoal mb-2">
                <strong>Jungle Yourself S.L.</strong>
              </p>
              <p className="text-charcoal mb-2">
                Email:{' '}
                <a href="mailto:info@jungleurself.com" className="text-moss hover:text-forest underline">
                  info@jungleurself.com
                </a>
              </p>
              <p className="text-charcoal">
                Phone: +34 93 123 4567
              </p>
            </div>
          </section>
        </div>

        {/* Acknowledgement */}
        <div className="mt-10 p-6 bg-moss/10 border border-moss/30 rounded-lg">
          <p className="text-charcoal text-sm">
            <strong>By purchasing from Jungle Yourself, you acknowledge that you have 
            read, understood, and agree to this Disclaimer.</strong> You confirm that 
            you will take appropriate steps to verify structural capacity, obtain 
            necessary permissions, and follow safety guidelines before installing 
            any products.
          </p>
        </div>

        {/* Related Links */}
        <div className="mt-12 pt-8 border-t border-sage/20">
          <h3 className="font-display text-xl text-forest mb-4">Related Pages</h3>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/terms" 
              className="px-4 py-2 bg-sand/50 hover:bg-sand text-charcoal rounded-lg transition-colors"
            >
              Terms & Conditions
            </Link>
            <Link 
              to="/calculator" 
              className="px-4 py-2 bg-sand/50 hover:bg-sand text-charcoal rounded-lg transition-colors"
            >
              Calculator
            </Link>
            <Link 
              to="/guides" 
              className="px-4 py-2 bg-sand/50 hover:bg-sand text-charcoal rounded-lg transition-colors"
            >
              Installation Guides
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
