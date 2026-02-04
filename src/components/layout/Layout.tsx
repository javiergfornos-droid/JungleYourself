// ===============================================
// JUNGLE YOURSELF - LAYOUT COMPONENT
// Wraps all pages with Header and Footer
// ===============================================

import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-warm-white">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
