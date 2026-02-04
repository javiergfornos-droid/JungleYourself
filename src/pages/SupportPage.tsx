// ===============================================
// SUPPORT PAGE
// Contact form and returns/warranty information
// ===============================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageSquare, 
  Mail, 
  Phone, 
  MapPin,
  Clock,
  ChevronRight,
  Check,
  RefreshCw,
  Shield,
  Package,
  AlertCircle,
  Send
} from 'lucide-react';
import Button from '../components/ui/Button';

interface ContactForm {
  name: string;
  email: string;
  orderNumber: string;
  subject: string;
  message: string;
}

export default function SupportPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    orderNumber: '',
    subject: 'general',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    console.log('Contact form submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-forest to-moss text-white py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-white/80 mb-4">
              <MessageSquare className="w-5 h-5" />
              <span className="text-sm font-medium uppercase tracking-wider">Support</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-display mb-4">
              How Can We Help?
            </h1>
            <p className="text-xl text-white/80">
              Get in touch with our team for questions about orders, installation advice, 
              or anything else. We're here to help you succeed with your garden project.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
              <h2 className="text-2xl font-display text-forest mb-6">Send Us a Message</h2>
              
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-moss/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-moss" />
                  </div>
                  <h3 className="text-xl font-display text-forest mb-2">Message Sent!</h3>
                  <p className="text-forest/70 mb-6">
                    Thank you for contacting us. We'll get back to you within 24-48 hours.
                  </p>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        orderNumber: '',
                        subject: 'general',
                        message: ''
                      });
                    }}
                    className="text-moss font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-forest mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                                 focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-forest mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                                 focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="orderNumber" className="block text-sm font-medium text-forest mb-2">
                        Order Number (if applicable)
                      </label>
                      <input
                        type="text"
                        id="orderNumber"
                        name="orderNumber"
                        placeholder="e.g., JY-123456"
                        value={formData.orderNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                                 focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-forest mb-2">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                                 focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss"
                      >
                        <option value="general">General Question</option>
                        <option value="order">Order Enquiry</option>
                        <option value="installation">Installation Help</option>
                        <option value="returns">Returns & Refunds</option>
                        <option value="wholesale">Wholesale / Trade</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-forest mb-2">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe how we can help you..."
                      className="w-full px-4 py-3 border border-sand rounded-lg bg-cream/50 
                               focus:outline-none focus:ring-2 focus:ring-moss/20 focus:border-moss resize-none"
                    />
                  </div>

                  <Button type="submit" disabled={isSubmitting} size="lg">
                    {isSubmitting ? (
                      <>Sending...</>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>

          {/* Contact Info & FAQ */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h3 className="text-lg font-display text-forest mb-4">Contact Information</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-moss flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-forest/60">Email</p>
                    <a href="mailto:hola@jungleyourself.com" className="text-forest hover:text-moss transition-colors">
                      hola@jungleyourself.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-moss flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-forest/60">Phone</p>
                    <a href="tel:+34900123456" className="text-forest hover:text-moss transition-colors">
                      +34 900 123 456
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-moss flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-forest/60">Hours</p>
                    <p className="text-forest">Mon-Fri: 9:00 - 18:00 CET</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-moss flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-forest/60">Address</p>
                    <p className="text-forest">
                      Carrer del Rosselló 123<br />
                      08036 Barcelona, Spain
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Quick Help */}
            <div className="bg-sand/30 rounded-2xl p-6">
              <h3 className="text-lg font-display text-forest mb-4">Quick Help</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/faq" className="flex items-center gap-2 text-moss hover:text-forest transition-colors">
                    <ChevronRight className="w-4 h-4" />
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link to="/guides" className="flex items-center gap-2 text-moss hover:text-forest transition-colors">
                    <ChevronRight className="w-4 h-4" />
                    Installation Guides
                  </Link>
                </li>
                <li>
                  <Link to="/calculator" className="flex items-center gap-2 text-moss hover:text-forest transition-colors">
                    <ChevronRight className="w-4 h-4" />
                    Project Calculator
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Returns & Warranty Section */}
        <section className="mt-16 pt-12 border-t border-sand">
          <h2 className="text-2xl font-display text-forest mb-8">Returns & Warranty</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* 30-Day Returns */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-moss/10 rounded-full flex items-center justify-center mb-4">
                <RefreshCw className="w-6 h-6 text-moss" />
              </div>
              <h3 className="text-lg font-display text-forest mb-2">30-Day Returns</h3>
              <p className="text-forest/70 text-sm mb-4">
                Not satisfied? Return unused products in original packaging within 30 days 
                of delivery for a full refund.
              </p>
              <ul className="space-y-2 text-sm text-forest/70">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                  Original packaging required
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                  Products must be unused
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                  Refund within 14 days
                </li>
              </ul>
            </div>

            {/* Product Warranty */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-moss/10 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-moss" />
              </div>
              <h3 className="text-lg font-display text-forest mb-2">Product Warranty</h3>
              <p className="text-forest/70 text-sm mb-4">
                All our products come with a manufacturer warranty covering defects in 
                materials and workmanship.
              </p>
              <ul className="space-y-2 text-sm text-forest/70">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                  10 years on membranes
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                  5 years on drainage layers
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                  2 years on irrigation
                </li>
              </ul>
            </div>

            {/* Damaged Goods */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="w-12 h-12 bg-moss/10 rounded-full flex items-center justify-center mb-4">
                <Package className="w-6 h-6 text-moss" />
              </div>
              <h3 className="text-lg font-display text-forest mb-2">Damaged in Transit</h3>
              <p className="text-forest/70 text-sm mb-4">
                If your order arrives damaged, contact us within 48 hours with photos 
                and we'll send a replacement at no cost.
              </p>
              <ul className="space-y-2 text-sm text-forest/70">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                  Report within 48 hours
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                  Include photos of damage
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-moss flex-shrink-0 mt-0.5" />
                  Free replacement shipping
                </li>
              </ul>
            </div>
          </div>

          {/* Return Process */}
          <div className="mt-8 bg-sand/30 rounded-xl p-6 lg:p-8">
            <h3 className="text-lg font-display text-forest mb-4">How to Return an Item</h3>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-moss text-white rounded-full flex items-center justify-center flex-shrink-0 font-display">
                  1
                </span>
                <div>
                  <p className="font-medium text-forest">Contact us</p>
                  <p className="text-sm text-forest/70">
                    Email hola@jungleyourself.com with your order number and reason for return.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-moss text-white rounded-full flex items-center justify-center flex-shrink-0 font-display">
                  2
                </span>
                <div>
                  <p className="font-medium text-forest">Get return label</p>
                  <p className="text-sm text-forest/70">
                    We'll email you a prepaid return label within 24 hours.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-moss text-white rounded-full flex items-center justify-center flex-shrink-0 font-display">
                  3
                </span>
                <div>
                  <p className="font-medium text-forest">Ship the package</p>
                  <p className="text-sm text-forest/70">
                    Pack items securely in original packaging and drop off at any courier point.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="w-8 h-8 bg-moss text-white rounded-full flex items-center justify-center flex-shrink-0 font-display">
                  4
                </span>
                <div>
                  <p className="font-medium text-forest">Receive refund</p>
                  <p className="text-sm text-forest/70">
                    Once we receive and inspect the items, your refund will be processed within 14 days.
                  </p>
                </div>
              </li>
            </ol>
          </div>

          {/* Note */}
          <div className="mt-6 p-4 bg-terracotta/10 border border-terracotta/20 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-terracotta flex-shrink-0 mt-0.5" />
              <div className="text-sm text-forest/80">
                <p className="font-medium text-forest mb-1">Important Note</p>
                <p>
                  Due to hygiene reasons, plant materials (seeds, bulbs, live plants) and substrate 
                  that has been opened cannot be returned. Please check compatibility before ordering.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
