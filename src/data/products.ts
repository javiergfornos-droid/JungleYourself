// ===============================================
// JUNGLE YOURSELF - PRODUCT SEED DATA
// ===============================================

import type { Product } from '../types';

// Placeholder image URLs (using geometric patterns)
const placeholderImages = {
  kit: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
  membrane: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
  drainage: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=600&h=400&fit=crop',
  substrate: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&h=400&fit=crop',
  plants: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=600&h=400&fit=crop',
  geotextile: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=600&h=400&fit=crop',
  edging: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop',
  irrigation: 'https://images.unsplash.com/photo-1563514227147-6d2ff665a6a0?w=600&h=400&fit=crop',
};

export const products: Product[] = [
  // ==================== KITS ====================
  {
    id: 'kit-starter-small',
    name: 'Starter Garden Kit – 2-5 m²',
    slug: 'starter-garden-kit-small',
    type: 'kit',
    shortDescription: 'Everything you need to transform a small balcony or terrace into a thriving green space.',
    longDescription: `The perfect introduction to terrace gardening. This comprehensive kit includes all essential layers and materials for creating a lightweight, well-draining garden bed on your balcony or small terrace.

Designed for beginners, the Starter Garden Kit comes with detailed step-by-step instructions and all necessary materials pre-cut to size. No specialised tools required – just basic household items.

The modular design allows for easy installation on tile, concrete, or wooden decking surfaces. The drainage system ensures proper water management, protecting your terrace from water damage whilst keeping plants healthy.`,
    price: 189,
    currency: 'EUR',
    images: [
      { url: placeholderImages.kit, alt: 'Starter Garden Kit components laid out' },
      { url: placeholderImages.substrate, alt: 'Installation in progress' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 3,
    weightPerUnit: 45,
    weightPerM2: 15,
    compatibility: ['tile', 'concrete', 'decking'],
    exposure: ['full-sun', 'partial-shade'],
    maintenance: 'low',
    goals: ['low-maintenance', 'aesthetics'],
    badges: ['beginner-friendly', 'lightweight', 'best-seller'],
    sizeCategory: '2-5',
    coverageM2: { min: 2, max: 5 },
    includedItems: [
      { productId: 'membrane-root-barrier', quantity: 5, unit: 'm²' },
      { productId: 'drainage-mat-20mm', quantity: 5, unit: 'm²' },
      { productId: 'geotextile-premium', quantity: 5, unit: 'm²' },
      { productId: 'substrate-universal', quantity: 3, unit: 'bags (25L)' },
      { productId: 'edging-aluminium', quantity: 4, unit: 'm' },
    ],
    stillNeeded: ['Plants (choose your own)', 'Watering can or hose', 'Gardening gloves'],
    toolsNeeded: ['Scissors or utility knife', 'Tape measure', 'Level (optional)'],
    timeEstimate: '2-3 hours',
    documents: [
      { name: 'Installation Guide', url: '#', type: 'instructions' },
      { name: 'Technical Datasheet', url: '#', type: 'datasheet' },
    ],
    reviews: [
      {
        id: 'r1',
        author: 'María G.',
        rating: 5,
        date: '2024-11-15',
        title: 'Perfect for beginners!',
        content: 'I had zero gardening experience and managed to install this in one afternoon. The instructions were crystal clear.',
        verified: true,
      },
      {
        id: 'r2',
        author: 'Thomas B.',
        rating: 4,
        date: '2024-10-28',
        title: 'Great quality materials',
        content: 'Everything arrived well-packaged. Would have liked more substrate included, but overall very happy.',
        verified: true,
      },
    ],
    faqs: [
      {
        question: 'Is this kit suitable for a rented apartment?',
        answer: 'Yes! The system is completely removable and won\'t damage your terrace. You can take it with you when you move.',
      },
      {
        question: 'How much does the complete installation weigh?',
        answer: 'When fully installed with substrate and plants, expect approximately 15-20 kg/m² when saturated with water.',
      },
    ],
  },
  {
    id: 'kit-family-medium',
    name: 'Family Garden Kit – 5-10 m²',
    slug: 'family-garden-kit-medium',
    type: 'kit',
    shortDescription: 'Transform your terrace into a productive family garden with this comprehensive medium-sized kit.',
    longDescription: `Create a substantial green space perfect for growing herbs, vegetables, and ornamental plants. The Family Garden Kit provides everything needed for medium-sized terraces and rooftops.

This kit includes an integrated drip irrigation system, making maintenance effortless. The enhanced drainage layer handles heavy rainfall whilst the premium substrate provides optimal growing conditions.

Ideal for families who want to introduce children to gardening or urban dwellers seeking a productive outdoor space.`,
    price: 349,
    currency: 'EUR',
    images: [
      { url: placeholderImages.kit, alt: 'Family Garden Kit overview' },
      { url: placeholderImages.irrigation, alt: 'Irrigation system detail' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 5,
    weightPerUnit: 95,
    weightPerM2: 18,
    compatibility: ['tile', 'concrete', 'decking'],
    exposure: ['full-sun', 'partial-shade', 'shade'],
    maintenance: 'medium',
    goals: ['aesthetics', 'edible', 'biodiversity'],
    badges: ['beginner-friendly', 'best-seller'],
    sizeCategory: '5-10',
    coverageM2: { min: 5, max: 10 },
    includedItems: [
      { productId: 'membrane-root-barrier', quantity: 10, unit: 'm²' },
      { productId: 'drainage-mat-25mm', quantity: 10, unit: 'm²' },
      { productId: 'geotextile-premium', quantity: 10, unit: 'm²' },
      { productId: 'substrate-universal', quantity: 8, unit: 'bags (25L)' },
      { productId: 'edging-aluminium', quantity: 8, unit: 'm' },
      { productId: 'irrigation-drip-kit', quantity: 1, unit: 'set' },
    ],
    stillNeeded: ['Plants of your choice', 'Timer for irrigation (optional)', 'Gardening tools'],
    toolsNeeded: ['Scissors or utility knife', 'Tape measure', 'Screwdriver'],
    timeEstimate: '4-6 hours',
    documents: [
      { name: 'Installation Guide', url: '#', type: 'instructions' },
      { name: 'Irrigation Setup', url: '#', type: 'instructions' },
    ],
    reviews: [
      {
        id: 'r3',
        author: 'Carlos M.',
        rating: 5,
        date: '2024-12-01',
        title: 'Growing tomatoes on our roof!',
        content: 'Never thought we could have a proper vegetable garden in our city apartment. The kids love it!',
        verified: true,
      },
    ],
    faqs: [
      {
        question: 'Can I grow vegetables in this system?',
        answer: 'Absolutely! The substrate depth is sufficient for most vegetables including tomatoes, peppers, lettuce, and herbs.',
      },
    ],
  },
  {
    id: 'kit-biodiversity-medium',
    name: 'Biodiversity Haven Kit – 5-10 m²',
    slug: 'biodiversity-haven-kit-medium',
    type: 'kit',
    shortDescription: 'Create a wildlife-friendly garden that supports pollinators, birds, and beneficial insects.',
    longDescription: `Designed in collaboration with urban ecologists, the Biodiversity Haven Kit transforms your terrace into a thriving ecosystem. The varied substrate depths and native plant recommendations create diverse microhabitats.

Includes special features like a small insect hotel mount and bird-safe planting guidance. The sedum and wildflower substrate mix provides excellent drainage whilst supporting diverse plant life.

Perfect for environmentally conscious homeowners who want to make a positive impact on urban biodiversity.`,
    price: 399,
    currency: 'EUR',
    images: [
      { url: placeholderImages.plants, alt: 'Biodiversity garden with wildflowers' },
      { url: placeholderImages.kit, alt: 'Kit components' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 5,
    weightPerUnit: 85,
    weightPerM2: 16,
    compatibility: ['tile', 'concrete', 'decking', 'gravel'],
    exposure: ['full-sun', 'partial-shade'],
    maintenance: 'low',
    goals: ['biodiversity', 'low-maintenance'],
    badges: ['biodiversity', 'low-maintenance', 'new'],
    sizeCategory: '5-10',
    coverageM2: { min: 5, max: 10 },
    includedItems: [
      { productId: 'membrane-root-barrier', quantity: 10, unit: 'm²' },
      { productId: 'drainage-mat-25mm', quantity: 10, unit: 'm²' },
      { productId: 'geotextile-premium', quantity: 10, unit: 'm²' },
      { productId: 'substrate-sedum', quantity: 6, unit: 'bags (25L)' },
      { productId: 'edging-corten', quantity: 8, unit: 'm' },
      { productId: 'plant-pack-pollinator', quantity: 1, unit: 'set' },
    ],
    stillNeeded: ['Additional native plants (optional)', 'Insect hotel (optional)'],
    toolsNeeded: ['Scissors', 'Tape measure', 'Watering can'],
    timeEstimate: '3-5 hours',
    documents: [
      { name: 'Biodiversity Guide', url: '#', type: 'instructions' },
      { name: 'Native Plant List', url: '#', type: 'datasheet' },
    ],
    reviews: [
      {
        id: 'r4',
        author: 'Elena S.',
        rating: 5,
        date: '2024-11-20',
        title: 'Bees everywhere!',
        content: 'Within weeks we had bees, butterflies, and even a robin visiting. Feels wonderful to help nature.',
        verified: true,
      },
    ],
    faqs: [
      {
        question: 'What plants are included?',
        answer: 'The pollinator plant pack includes a mix of sedum, thyme, lavender plugs, and wildflower seeds suited to your climate zone.',
      },
    ],
  },
  {
    id: 'kit-professional-large',
    name: 'Professional Rooftop Kit – 10-20 m²',
    slug: 'professional-rooftop-kit-large',
    type: 'kit',
    shortDescription: 'Commercial-grade materials for serious rooftop garden installations.',
    longDescription: `Our most comprehensive kit, designed for larger terraces and rooftops. Features professional-grade materials that meet building regulations for intensive green roofs.

Includes reinforced drainage system, deep substrate capability, and all fixings for permanent installation. The modular design allows for zoning – create different areas for relaxation, growing, and wildlife.

Recommended for homeowners committed to a significant green transformation or those working with contractors.`,
    price: 749,
    currency: 'EUR',
    images: [
      { url: placeholderImages.kit, alt: 'Professional rooftop installation' },
      { url: placeholderImages.drainage, alt: 'Heavy-duty drainage system' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 7,
    weightPerUnit: 180,
    weightPerM2: 22,
    compatibility: ['concrete', 'decking'],
    exposure: ['full-sun', 'partial-shade', 'shade'],
    maintenance: 'medium',
    goals: ['aesthetics', 'shade', 'drainage'],
    badges: ['best-seller'],
    sizeCategory: '10-20',
    coverageM2: { min: 10, max: 20 },
    includedItems: [
      { productId: 'membrane-root-barrier', quantity: 20, unit: 'm²' },
      { productId: 'drainage-mat-40mm', quantity: 20, unit: 'm²' },
      { productId: 'geotextile-premium', quantity: 20, unit: 'm²' },
      { productId: 'substrate-universal', quantity: 16, unit: 'bags (25L)' },
      { productId: 'edging-aluminium', quantity: 16, unit: 'm' },
      { productId: 'irrigation-drip-kit', quantity: 2, unit: 'sets' },
    ],
    stillNeeded: ['Plants', 'Irrigation timer', 'Structural assessment (recommended)'],
    toolsNeeded: ['Utility knife', 'Tape measure', 'Level', 'Drill (for edging)'],
    timeEstimate: '1-2 days',
    documents: [
      { name: 'Professional Installation Guide', url: '#', type: 'instructions' },
      { name: 'Load Calculations', url: '#', type: 'datasheet' },
    ],
    reviews: [
      {
        id: 'r5',
        author: 'Arquitecto J.R.',
        rating: 5,
        date: '2024-10-15',
        title: 'Excellent for professional projects',
        content: 'Used this kit for a client project. Materials are top quality and the documentation is thorough.',
        verified: true,
      },
    ],
    faqs: [
      {
        question: 'Do I need a structural engineer?',
        answer: 'For installations over 10m², we recommend consulting a structural engineer to verify your roof can support the load. We provide load calculation documents to assist.',
      },
    ],
  },
  {
    id: 'kit-shade-garden',
    name: 'Shade Garden Kit – 2-5 m²',
    slug: 'shade-garden-kit-small',
    type: 'kit',
    shortDescription: 'Specially designed for north-facing terraces and shaded balconies.',
    longDescription: `Not every terrace bathes in sunlight. The Shade Garden Kit is specifically formulated for north-facing balconies, covered terraces, and areas with limited sun exposure.

Features a moisture-retaining substrate blend and includes shade-tolerant plant recommendations. The drainage system prevents waterlogging whilst maintaining adequate moisture for ferns, hostas, and other shade lovers.`,
    price: 209,
    currency: 'EUR',
    images: [
      { url: placeholderImages.plants, alt: 'Lush shade garden' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 3,
    weightPerUnit: 48,
    weightPerM2: 16,
    compatibility: ['tile', 'concrete', 'decking'],
    exposure: ['partial-shade', 'shade'],
    maintenance: 'low',
    goals: ['shade', 'aesthetics', 'low-maintenance'],
    badges: ['beginner-friendly', 'lightweight'],
    sizeCategory: '2-5',
    coverageM2: { min: 2, max: 5 },
    includedItems: [
      { productId: 'membrane-root-barrier', quantity: 5, unit: 'm²' },
      { productId: 'drainage-mat-20mm', quantity: 5, unit: 'm²' },
      { productId: 'geotextile-premium', quantity: 5, unit: 'm²' },
      { productId: 'substrate-shade', quantity: 4, unit: 'bags (25L)' },
      { productId: 'edging-aluminium', quantity: 4, unit: 'm' },
    ],
    stillNeeded: ['Shade-tolerant plants', 'Mulch (recommended)'],
    toolsNeeded: ['Scissors', 'Tape measure'],
    timeEstimate: '2-3 hours',
    documents: [
      { name: 'Shade Plant Guide', url: '#', type: 'instructions' },
    ],
    reviews: [],
    faqs: [
      {
        question: 'Will this work on a covered balcony that gets no direct sun?',
        answer: 'Yes! This kit is designed for exactly those conditions. We include a list of plants that thrive in deep shade.',
      },
    ],
  },
  {
    id: 'kit-drainage-focus',
    name: 'Storm-Ready Drainage Kit – 5-10 m²',
    slug: 'storm-ready-drainage-kit',
    type: 'kit',
    shortDescription: 'Enhanced drainage system for areas with heavy rainfall or drainage concerns.',
    longDescription: `Living in a rainy climate or dealing with drainage issues? The Storm-Ready Kit features our most robust water management system. The 40mm drainage layer handles even the heaviest downpours.

Includes overflow outlets and water retention capabilities that slow runoff whilst keeping your plants happy. Perfect for Mediterranean climates with intense but infrequent rainfall.`,
    price: 429,
    currency: 'EUR',
    images: [
      { url: placeholderImages.drainage, alt: 'Advanced drainage system' },
    ],
    stockStatus: 'low-stock',
    leadTimeDays: 5,
    weightPerUnit: 90,
    weightPerM2: 14,
    compatibility: ['tile', 'concrete'],
    exposure: ['full-sun', 'partial-shade', 'shade'],
    maintenance: 'low',
    goals: ['drainage', 'low-maintenance'],
    badges: ['lightweight', 'low-maintenance'],
    sizeCategory: '5-10',
    coverageM2: { min: 5, max: 10 },
    includedItems: [
      { productId: 'membrane-root-barrier', quantity: 10, unit: 'm²' },
      { productId: 'drainage-mat-40mm', quantity: 10, unit: 'm²' },
      { productId: 'geotextile-premium', quantity: 10, unit: 'm²' },
      { productId: 'substrate-universal', quantity: 6, unit: 'bags (25L)' },
      { productId: 'edging-aluminium', quantity: 8, unit: 'm' },
    ],
    stillNeeded: ['Plants', 'Overflow connector (if needed)'],
    toolsNeeded: ['Scissors', 'Tape measure', 'Level'],
    timeEstimate: '4-5 hours',
    documents: [
      { name: 'Drainage Guide', url: '#', type: 'instructions' },
    ],
    reviews: [],
    faqs: [],
  },
  {
    id: 'kit-sedum-extensive',
    name: 'Sedum Carpet Kit – 10-20 m²',
    slug: 'sedum-carpet-kit-large',
    type: 'kit',
    shortDescription: 'Ultra-lightweight sedum roof system for maximum coverage with minimum maintenance.',
    longDescription: `Create a living carpet of succulent sedum that practically takes care of itself. This extensive green roof system is the lightest option we offer, making it suitable for structures with limited load capacity.

The sedum substrate is just 8cm deep yet supports a vibrant mix of drought-tolerant succulents that change colour through the seasons. Requires no irrigation once established and only 1-2 maintenance visits per year.`,
    price: 599,
    currency: 'EUR',
    images: [
      { url: placeholderImages.plants, alt: 'Sedum carpet in bloom' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 7,
    weightPerUnit: 120,
    weightPerM2: 10,
    compatibility: ['concrete', 'decking'],
    exposure: ['full-sun'],
    maintenance: 'low',
    goals: ['low-maintenance', 'biodiversity', 'drainage'],
    badges: ['lightweight', 'low-maintenance', 'biodiversity'],
    sizeCategory: '10-20',
    coverageM2: { min: 10, max: 20 },
    includedItems: [
      { productId: 'membrane-root-barrier', quantity: 20, unit: 'm²' },
      { productId: 'drainage-mat-20mm', quantity: 20, unit: 'm²' },
      { productId: 'geotextile-premium', quantity: 20, unit: 'm²' },
      { productId: 'substrate-sedum', quantity: 10, unit: 'bags (25L)' },
      { productId: 'plant-pack-sedum', quantity: 20, unit: 'm² coverage' },
    ],
    stillNeeded: ['Edge restraint (optional)', 'Initial watering access'],
    toolsNeeded: ['Scissors', 'Rake', 'Watering access'],
    timeEstimate: '1 day',
    documents: [
      { name: 'Sedum Care Guide', url: '#', type: 'instructions' },
    ],
    reviews: [],
    faqs: [],
  },

  // ==================== COMPONENTS ====================
  {
    id: 'membrane-root-barrier',
    name: 'Root Barrier Membrane',
    slug: 'root-barrier-membrane',
    type: 'component',
    shortDescription: 'Heavy-duty HDPE root barrier to protect your terrace surface.',
    longDescription: `Essential protection for any terrace garden installation. This 0.5mm HDPE membrane creates an impenetrable barrier against root penetration, protecting tiles, concrete, and waterproofing layers.

UV-stabilised for exposed edges and resistant to common garden chemicals. Easy to install with overlap joints – no special tools or adhesives required.

Sold per square metre. We recommend adding 10% extra for overlaps.`,
    price: 8.5,
    currency: 'EUR',
    images: [
      { url: placeholderImages.membrane, alt: 'Root barrier membrane roll' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 2,
    weightPerUnit: 0.5,
    compatibility: ['tile', 'concrete', 'decking', 'gravel'],
    exposure: ['full-sun', 'partial-shade', 'shade'],
    maintenance: 'low',
    goals: ['drainage'],
    badges: [],
    documents: [
      { name: 'Technical Specifications', url: '#', type: 'datasheet' },
    ],
    reviews: [],
    faqs: [
      {
        question: 'How much overlap do I need between sheets?',
        answer: 'We recommend a minimum 15cm overlap between sheets. Use our membrane tape for extra security.',
      },
    ],
  },
  {
    id: 'drainage-mat-20mm',
    name: 'Drainage Mat 20mm',
    slug: 'drainage-mat-20mm',
    type: 'component',
    shortDescription: 'Lightweight drainage layer for standard terrace gardens.',
    longDescription: `Our 20mm drainage mat provides essential water management for most terrace garden applications. The dimpled design creates air pockets and water channels beneath your substrate.

Made from recycled HDPE, each mat includes water retention cups that store moisture for dry periods whilst allowing excess water to drain freely. Ideal for small to medium installations.`,
    price: 12,
    currency: 'EUR',
    images: [
      { url: placeholderImages.drainage, alt: 'Drainage mat detail' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 2,
    weightPerUnit: 0.8,
    compatibility: ['tile', 'concrete', 'decking'],
    exposure: ['full-sun', 'partial-shade', 'shade'],
    maintenance: 'low',
    goals: ['drainage'],
    badges: ['lightweight'],
    documents: [
      { name: 'Flow Rate Specifications', url: '#', type: 'datasheet' },
    ],
    reviews: [],
    faqs: [],
  },
  {
    id: 'drainage-mat-25mm',
    name: 'Drainage Mat 25mm',
    slug: 'drainage-mat-25mm',
    type: 'component',
    shortDescription: 'Enhanced drainage layer for intensive gardens and rainy climates.',
    longDescription: `Step up to the 25mm drainage mat for larger installations or areas with heavy rainfall. Greater water storage capacity and improved airflow support healthier root development.

The interlocking edge design ensures continuous drainage across large areas without gaps or pooling. Essential for vegetable gardens and intensive green roofs.`,
    price: 15,
    currency: 'EUR',
    images: [
      { url: placeholderImages.drainage, alt: 'Drainage mat 25mm' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 2,
    weightPerUnit: 1.0,
    compatibility: ['tile', 'concrete', 'decking'],
    exposure: ['full-sun', 'partial-shade', 'shade'],
    maintenance: 'low',
    goals: ['drainage'],
    badges: [],
    documents: [],
    reviews: [],
    faqs: [],
  },
  {
    id: 'drainage-mat-40mm',
    name: 'Drainage Mat 40mm – Heavy Duty',
    slug: 'drainage-mat-40mm-heavy-duty',
    type: 'component',
    shortDescription: 'Professional-grade drainage for intensive green roofs and storm management.',
    longDescription: `Our heaviest-duty drainage solution, designed for professional installations and areas requiring serious water management. The 40mm profile handles extreme rainfall events whilst maintaining optimal growing conditions.

Features integrated inspection channels and connection points for overflow systems. Meets intensive green roof standards for commercial buildings.`,
    price: 22,
    currency: 'EUR',
    images: [
      { url: placeholderImages.drainage, alt: 'Heavy duty drainage' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 3,
    weightPerUnit: 1.5,
    compatibility: ['concrete'],
    exposure: ['full-sun', 'partial-shade', 'shade'],
    maintenance: 'low',
    goals: ['drainage'],
    badges: [],
    documents: [],
    reviews: [],
    faqs: [],
  },
  {
    id: 'geotextile-premium',
    name: 'Filter Geotextile – Premium',
    slug: 'filter-geotextile-premium',
    type: 'component',
    shortDescription: 'Prevents substrate washing into drainage whilst allowing water through.',
    longDescription: `This non-woven geotextile is the critical layer between your substrate and drainage mat. It prevents fine particles from clogging the drainage system whilst allowing water to pass freely.

Our premium grade is extra durable for installations where root penetration pressure is high. Also known as filter fabric or separation mesh.`,
    price: 4.5,
    currency: 'EUR',
    images: [
      { url: placeholderImages.geotextile, alt: 'Geotextile fabric' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 2,
    weightPerUnit: 0.2,
    compatibility: ['tile', 'concrete', 'decking', 'gravel'],
    exposure: ['full-sun', 'partial-shade', 'shade'],
    maintenance: 'low',
    goals: ['drainage'],
    badges: [],
    documents: [],
    reviews: [],
    faqs: [
      {
        question: 'What\'s the difference between this and the root barrier?',
        answer: 'The root barrier is waterproof and stops roots. The geotextile allows water through whilst filtering out soil particles. You need both!',
      },
    ],
  },
  {
    id: 'substrate-universal',
    name: 'Universal Growing Substrate – 25L',
    slug: 'universal-growing-substrate-25l',
    type: 'component',
    shortDescription: 'Lightweight, well-draining growing medium for most terrace plants.',
    longDescription: `Our specially formulated terrace substrate combines mineral aggregates with organic matter for optimal plant growth. Significantly lighter than garden soil whilst providing better drainage and aeration.

Suitable for ornamentals, herbs, and most vegetables. The pH is balanced for a wide range of plants. Each 25L bag covers approximately 0.25m² at 10cm depth.`,
    price: 18,
    currency: 'EUR',
    images: [
      { url: placeholderImages.substrate, alt: 'Growing substrate' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 2,
    weightPerUnit: 12,
    compatibility: ['tile', 'concrete', 'decking'],
    exposure: ['full-sun', 'partial-shade', 'shade'],
    maintenance: 'medium',
    goals: ['aesthetics', 'edible'],
    badges: [],
    documents: [],
    reviews: [],
    faqs: [
      {
        question: 'How many bags do I need?',
        answer: 'For 10cm depth, you need approximately 4 bags per m². For vegetables, we recommend 15cm depth (6 bags per m²).',
      },
    ],
  },
  {
    id: 'substrate-sedum',
    name: 'Sedum & Succulent Substrate – 25L',
    slug: 'sedum-succulent-substrate-25l',
    type: 'component',
    shortDescription: 'Mineral-rich, fast-draining mix for sedums and drought-tolerant plants.',
    longDescription: `Specially formulated for extensive green roofs and drought-tolerant plantings. This highly mineral substrate drains almost instantly whilst retaining just enough moisture for sedum and succulents.

Contains crusite, pumice, and composted bark. Extremely lightweight when dry – perfect for structures with load limitations.`,
    price: 16,
    currency: 'EUR',
    images: [
      { url: placeholderImages.substrate, alt: 'Sedum substrate' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 2,
    weightPerUnit: 10,
    compatibility: ['tile', 'concrete', 'decking'],
    exposure: ['full-sun'],
    maintenance: 'low',
    goals: ['low-maintenance', 'biodiversity'],
    badges: ['lightweight', 'low-maintenance'],
    documents: [],
    reviews: [],
    faqs: [],
  },
  {
    id: 'substrate-shade',
    name: 'Shade Garden Substrate – 25L',
    slug: 'shade-garden-substrate-25l',
    type: 'component',
    shortDescription: 'Moisture-retaining mix for ferns, hostas, and shade-loving plants.',
    longDescription: `Formulated for the unique needs of shade gardens where evaporation is lower but drainage remains essential. Contains extra organic matter and moisture-retaining minerals.

Perfect for north-facing balconies and covered terraces. Supports ferns, hostas, heuchera, and other shade-loving plants.`,
    price: 19,
    currency: 'EUR',
    images: [
      { url: placeholderImages.substrate, alt: 'Shade substrate' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 2,
    weightPerUnit: 13,
    compatibility: ['tile', 'concrete', 'decking'],
    exposure: ['partial-shade', 'shade'],
    maintenance: 'low',
    goals: ['shade', 'aesthetics'],
    badges: [],
    documents: [],
    reviews: [],
    faqs: [],
  },
  {
    id: 'edging-aluminium',
    name: 'Aluminium Edging Profile – 2m',
    slug: 'aluminium-edging-profile-2m',
    type: 'component',
    shortDescription: 'Clean, modern border to contain your substrate and define garden edges.',
    longDescription: `These powder-coated aluminium profiles create a clean, professional edge to your terrace garden. At 15cm high, they contain substrate whilst providing a contemporary aesthetic.

Easy to install with corner connectors (sold separately) and compatible with all our drainage systems. Available in anthracite grey.`,
    price: 24,
    currency: 'EUR',
    images: [
      { url: placeholderImages.edging, alt: 'Aluminium edging' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 3,
    weightPerUnit: 1.2,
    compatibility: ['tile', 'concrete', 'decking'],
    exposure: ['full-sun', 'partial-shade', 'shade'],
    maintenance: 'low',
    goals: ['aesthetics'],
    badges: [],
    documents: [],
    reviews: [],
    faqs: [],
  },
  {
    id: 'edging-corten',
    name: 'Corten Steel Edging – 2m',
    slug: 'corten-steel-edging-2m',
    type: 'component',
    shortDescription: 'Weathering steel edging that develops a beautiful rust patina over time.',
    longDescription: `For those who appreciate natural materials, our Corten steel edging develops a protective rust patina that stops further corrosion. The warm orange-brown colour complements green foliage beautifully.

Each piece arrives with a mill finish and will develop its characteristic patina over 6-12 months of outdoor exposure.`,
    price: 38,
    currency: 'EUR',
    images: [
      { url: placeholderImages.edging, alt: 'Corten steel edging' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 5,
    weightPerUnit: 2.5,
    compatibility: ['tile', 'concrete', 'decking', 'gravel'],
    exposure: ['full-sun', 'partial-shade', 'shade'],
    maintenance: 'low',
    goals: ['aesthetics', 'biodiversity'],
    badges: [],
    documents: [],
    reviews: [],
    faqs: [],
  },
  {
    id: 'irrigation-drip-kit',
    name: 'Drip Irrigation Starter Kit',
    slug: 'drip-irrigation-starter-kit',
    type: 'component',
    shortDescription: 'Complete drip system for up to 10m² with adjustable drippers.',
    longDescription: `Take the guesswork out of watering with this complete drip irrigation kit. Includes 25m of 16mm main line, 50 adjustable drippers, connectors, and a tap adapter.

Compatible with standard garden taps and optional timers. Each dripper can be adjusted from 0-40 litres per hour. Covers up to 10m² depending on plant density.`,
    price: 45,
    currency: 'EUR',
    images: [
      { url: placeholderImages.irrigation, alt: 'Drip irrigation kit' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 2,
    weightPerUnit: 2,
    compatibility: ['tile', 'concrete', 'decking', 'gravel'],
    exposure: ['full-sun', 'partial-shade', 'shade'],
    maintenance: 'medium',
    goals: ['edible', 'aesthetics'],
    badges: ['beginner-friendly'],
    documents: [
      { name: 'Installation Guide', url: '#', type: 'instructions' },
    ],
    reviews: [],
    faqs: [],
  },
  {
    id: 'plant-pack-pollinator',
    name: 'Pollinator Plant Pack',
    slug: 'pollinator-plant-pack',
    type: 'component',
    shortDescription: '24 plug plants chosen to support bees and butterflies throughout the seasons.',
    longDescription: `This carefully curated selection of 24 plug plants provides nectar and pollen from spring through autumn. Includes lavender, sedum, thyme, oregano, echinacea, and wildflower plugs.

All plants are grown without neonicotinoids and are suited to terrace growing conditions. Covers approximately 2-3m² depending on spacing.`,
    price: 65,
    currency: 'EUR',
    images: [
      { url: placeholderImages.plants, alt: 'Pollinator plant selection' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 5,
    weightPerUnit: 4,
    compatibility: ['tile', 'concrete', 'decking'],
    exposure: ['full-sun', 'partial-shade'],
    maintenance: 'low',
    goals: ['biodiversity', 'aesthetics'],
    badges: ['biodiversity'],
    documents: [],
    reviews: [],
    faqs: [],
  },
  {
    id: 'plant-pack-sedum',
    name: 'Sedum Mat – Pre-grown (per m²)',
    slug: 'sedum-mat-pre-grown',
    type: 'component',
    shortDescription: 'Instant green roof coverage with pre-grown sedum mats.',
    longDescription: `Skip the waiting – our pre-grown sedum mats provide instant coverage with an established mix of 6-8 sedum varieties. Simply roll out onto prepared substrate for an immediate green roof.

Each mat is grown for 18 months before harvest, ensuring robust plants with well-developed root systems. Mats arrive fresh and should be installed within 48 hours.`,
    price: 35,
    currency: 'EUR',
    images: [
      { url: placeholderImages.plants, alt: 'Sedum mat' },
    ],
    stockStatus: 'in-stock',
    leadTimeDays: 7,
    weightPerUnit: 20,
    compatibility: ['tile', 'concrete', 'decking'],
    exposure: ['full-sun'],
    maintenance: 'low',
    goals: ['low-maintenance', 'biodiversity', 'drainage'],
    badges: ['low-maintenance', 'biodiversity'],
    documents: [],
    reviews: [],
    faqs: [],
  },
];

// Helper function to get product by ID
export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
};

// Helper function to get product by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find(p => p.slug === slug);
};

// Helper function to get products by type
export const getProductsByType = (type: 'kit' | 'component'): Product[] => {
  return products.filter(p => p.type === type);
};

// Helper function to get kits by size category
export const getKitsBySizeCategory = (category: '2-5' | '5-10' | '10-20'): Product[] => {
  return products.filter(p => p.type === 'kit' && p.sizeCategory === category);
};

// Helper function to get related products based on type and goals
export const getRelatedProducts = (productId: string, limit: number = 4): Product[] => {
  const product = products.find(p => p.id === productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId)
    .filter(p => p.type === product.type || p.goals.some(g => product.goals.includes(g)))
    .slice(0, limit);
};
