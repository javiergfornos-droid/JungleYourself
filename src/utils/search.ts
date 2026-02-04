// ===============================================
// JUNGLE YOURSELF - SEARCH UTILITY
// Basic keyword matching with synonym support
// ===============================================

import type { Product, SearchResult } from '../types';

// Synonym mappings for common terms
const synonyms: Record<string, string[]> = {
  'geotextile': ['mesh', 'malla', 'filter', 'fabric', 'tela'],
  'membrane': ['barrier', 'sheet', 'liner', 'membrana'],
  'drainage': ['drenaje', 'water', 'drain'],
  'substrate': ['soil', 'tierra', 'growing medium', 'compost', 'sustrato'],
  'sedum': ['succulent', 'suculenta', 'stonecrop'],
  'edging': ['border', 'edge', 'borde', 'perfil'],
  'irrigation': ['watering', 'drip', 'riego', 'goteo'],
  'kit': ['pack', 'bundle', 'set', 'sistema'],
  'plants': ['plantas', 'flowers', 'flores', 'vegetation'],
  'rooftop': ['roof', 'terrace', 'terraza', 'balcony', 'balcón'],
  'lightweight': ['light', 'ligero', 'liviano'],
  'biodiversity': ['wildlife', 'pollinator', 'bees', 'butterflies', 'eco'],
};

/**
 * Expand search query with synonyms
 */
const expandQuery = (query: string): string[] => {
  const terms = query.toLowerCase().split(/\s+/);
  const expanded: Set<string> = new Set(terms);

  terms.forEach(term => {
    // Add synonyms for this term
    Object.entries(synonyms).forEach(([key, values]) => {
      if (key === term || values.includes(term)) {
        expanded.add(key);
        values.forEach(v => expanded.add(v));
      }
    });
  });

  return Array.from(expanded);
};

/**
 * Calculate relevance score for a product
 */
const calculateScore = (product: Product, searchTerms: string[]): number => {
  let score = 0;
  const searchableText = [
    product.name,
    product.shortDescription,
    product.longDescription,
    product.type,
    ...product.goals,
    ...product.badges,
    ...(product.exposure || []),
  ].join(' ').toLowerCase();

  searchTerms.forEach(term => {
    // Exact match in name (highest weight)
    if (product.name.toLowerCase().includes(term)) {
      score += 10;
    }
    // Match in short description
    if (product.shortDescription.toLowerCase().includes(term)) {
      score += 5;
    }
    // Match in long description or other fields
    if (searchableText.includes(term)) {
      score += 2;
    }
  });

  return score;
};

/**
 * Search products by query
 */
export const searchProducts = (products: Product[], query: string): SearchResult[] => {
  if (!query.trim()) {
    return [];
  }

  const searchTerms = expandQuery(query);
  
  const results: SearchResult[] = products
    .map(product => ({
      product,
      score: calculateScore(product, searchTerms),
    }))
    .filter(result => result.score > 0)
    .sort((a, b) => b.score - a.score);

  return results;
};

/**
 * Get search suggestions based on partial query
 */
export const getSearchSuggestions = (products: Product[], query: string): string[] => {
  if (query.length < 2) {
    return [];
  }

  const lowerQuery = query.toLowerCase();
  const suggestions: Set<string> = new Set();

  // Add matching product names
  products.forEach(product => {
    if (product.name.toLowerCase().includes(lowerQuery)) {
      suggestions.add(product.name);
    }
  });

  // Add matching synonym keywords
  Object.keys(synonyms).forEach(key => {
    if (key.includes(lowerQuery)) {
      suggestions.add(key.charAt(0).toUpperCase() + key.slice(1));
    }
  });

  return Array.from(suggestions).slice(0, 5);
};

export default { searchProducts, getSearchSuggestions };
