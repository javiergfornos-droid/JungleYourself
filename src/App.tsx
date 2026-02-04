// ===============================================
// JUNGLE YOURSELF - MAIN APP WITH ROUTING
// ===============================================

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import KitFinderPage from './pages/KitFinderPage';
import ProductDetailPage from './pages/ProductDetailPage';
import GuidesPage from './pages/GuidesPage';
import GuideDetailPage from './pages/GuideDetailPage';
import CalculatorPage from './pages/CalculatorPage';
import SampleProjectPage from './pages/SampleProjectPage';
import FAQPage from './pages/FAQPage';
import SupportPage from './pages/SupportPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import DisclaimerPage from './pages/DisclaimerPage';
import CookiesPage from './pages/CookiesPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Main Pages */}
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="kit-finder" element={<KitFinderPage />} />
          <Route path="product/:slug" element={<ProductDetailPage />} />
          
          {/* Guides */}
          <Route path="guides" element={<GuidesPage />} />
          <Route path="guides/:slug" element={<GuideDetailPage />} />
          
          {/* Tools */}
          <Route path="calculator" element={<CalculatorPage />} />
          <Route path="sample-project" element={<SampleProjectPage />} />
          
          {/* Support */}
          <Route path="faq" element={<FAQPage />} />
          <Route path="support" element={<SupportPage />} />
          
          {/* Cart & Checkout */}
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          
          {/* Legal */}
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="disclaimer" element={<DisclaimerPage />} />
          <Route path="cookies" element={<CookiesPage />} />
          
          {/* 404 */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
