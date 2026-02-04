// ===============================================
// JUNGLE YOURSELF - FAQ DATA
// ===============================================

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'ordering' | 'installation' | 'maintenance' | 'returns';
}

export const faqs: FAQItem[] = [
  // General
  {
    id: 'faq-1',
    question: 'Is my balcony/terrace suitable for a green roof system?',
    answer: 'Most balconies and terraces can support a green roof system. Our lightest sedum systems weigh just 60-100 kg/m² when saturated, which is typically well within building load limits. For installations over 10m² or on older buildings, we recommend checking with a structural engineer. Our team can provide load calculation documents to assist.',
    category: 'general',
  },
  {
    id: 'faq-2',
    question: 'Will the system damage my terrace tiles or waterproofing?',
    answer: 'No. Our systems include a root barrier membrane as the first layer, which protects your existing surface. The system is completely removable if needed – ideal for renters. In fact, the coverage often protects your waterproofing from UV damage and thermal stress.',
    category: 'general',
  },
  {
    id: 'faq-3',
    question: 'Do I need planning permission?',
    answer: 'In most cases, no. However, regulations vary by municipality. Check with your local authority if you\'re unsure, particularly for larger installations or in conservation areas. If you\'re renting, always get written permission from your landlord.',
    category: 'general',
  },
  {
    id: 'faq-4',
    question: 'How long does a terrace garden system last?',
    answer: 'With proper maintenance, the infrastructure (membrane, drainage, edging) lasts 20+ years. Plants may need replacing or refreshing every 5-10 years depending on type and conditions.',
    category: 'general',
  },
  
  // Ordering
  {
    id: 'faq-5',
    question: 'How long does delivery take?',
    answer: 'Standard delivery in mainland Spain is 3-7 working days depending on stock. We ship to all EU countries with delivery times of 5-10 working days. Plant packs are shipped separately to ensure freshness and may have specific delivery windows.',
    category: 'ordering',
  },
  {
    id: 'faq-6',
    question: 'Do you deliver to upper floors?',
    answer: 'We deliver to the street address. For upper floor delivery, check if your building has freight lift access. Our kits are packaged in boxes under 25kg to make carrying up stairs manageable. For large orders, we can arrange special delivery – contact us for a quote.',
    category: 'ordering',
  },
  {
    id: 'faq-7',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit and debit cards (Visa, Mastercard, Maestro), PayPal, and bank transfer for orders over €500. All transactions are processed securely through our encrypted payment system.',
    category: 'ordering',
  },
  {
    id: 'faq-8',
    question: 'Can I order samples before buying?',
    answer: 'Yes! We offer a sample pack containing swatches of our membrane, drainage mat, geotextile, and substrate for €15 (refundable against orders over €150). Contact our team to request one.',
    category: 'ordering',
  },
  
  // Installation
  {
    id: 'faq-9',
    question: 'Can I install this myself?',
    answer: 'Absolutely! Our kits are designed for DIY installation with no specialised tools. Most small kits (2-5m²) can be completed in a single afternoon. We provide detailed step-by-step instructions with photos, and our support team is available to answer questions.',
    category: 'installation',
  },
  {
    id: 'faq-10',
    question: 'What tools do I need?',
    answer: 'For most installations you\'ll need: a tape measure, sharp scissors or utility knife, gardening gloves, and optionally a small level. Nothing specialised or expensive. A broom for cleaning the surface first is also helpful.',
    category: 'installation',
  },
  {
    id: 'faq-11',
    question: 'What do I do about existing drains?',
    answer: 'Never cover or block existing drains. Our systems are designed with gaps around drainage points. We include drain guards in our kits to prevent substrate from washing into drains whilst maintaining water flow.',
    category: 'installation',
  },
  {
    id: 'faq-12',
    question: 'Can I install in winter?',
    answer: 'You can install the structural layers (membrane, drainage, edging) any time of year. However, we recommend planting between March and October for best establishment. Sedum mats can be installed year-round except during frost.',
    category: 'installation',
  },
  
  // Maintenance
  {
    id: 'faq-13',
    question: 'How often do I need to water?',
    answer: 'It depends on your plant choices and conditions. Sedum systems may only need watering during prolonged drought. Vegetable gardens and ornamental plantings need regular watering in summer – typically every 1-2 days during hot weather. An automatic drip system takes the guesswork out.',
    category: 'maintenance',
  },
  {
    id: 'faq-14',
    question: 'Do I need to fertilise?',
    answer: 'Yes, but sparingly. Our substrates include initial nutrients. After the first year, apply a slow-release fertiliser in spring. Sedum systems need very little – once a year is plenty. Over-fertilising can cause problems, so less is more.',
    category: 'maintenance',
  },
  {
    id: 'faq-15',
    question: 'What about pests and diseases?',
    answer: 'Terrace gardens typically have fewer pest problems than ground-level gardens because they\'re isolated from soil-borne issues. Occasional aphids or caterpillars can be managed with organic methods. Good drainage prevents most fungal problems.',
    category: 'maintenance',
  },
  
  // Returns
  {
    id: 'faq-16',
    question: 'What is your return policy?',
    answer: 'Unused products in original packaging can be returned within 30 days for a full refund. Due to their perishable nature, live plants and sedum mats cannot be returned unless damaged in transit. Custom-cut items are non-returnable.',
    category: 'returns',
  },
  {
    id: 'faq-17',
    question: 'What if my order arrives damaged?',
    answer: 'If any items arrive damaged, take photos and contact us within 48 hours. We\'ll arrange a replacement or refund. For plant packs, report any issues within 24 hours of delivery.',
    category: 'returns',
  },
  {
    id: 'faq-18',
    question: 'Can I change my order after placing it?',
    answer: 'If your order hasn\'t shipped yet, we can make changes. Contact us immediately via email or phone. Once shipped, you\'ll need to follow our returns process for any unwanted items.',
    category: 'returns',
  },
];

// Helper function to get FAQs by category
export const getFAQsByCategory = (category: FAQItem['category']): FAQItem[] => {
  return faqs.filter(faq => faq.category === category);
};

// Category type export
export type FAQCategory = FAQItem['category'];

// Categories list for iteration
export const faqCategories: FAQCategory[] = ['general', 'ordering', 'installation', 'maintenance', 'returns'];
