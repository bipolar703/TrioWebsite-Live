import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/ui/ScrollToTop';
import TranslateButton from './components/ui/TranslateButton';
import PageTransition from './components/ui/PageTransition';
import usePageTransition from './hooks/usePageTransition';
import useScrollToTop from './hooks/useScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import GasSystems from './pages/GasSystems';
import Generators from './pages/Generators';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Services from './pages/Services';
import CentralGasNetworks from './pages/CentralGasNetworks';
import GasAccessories from './pages/GasAccessories';
import MaintenanceServices from './pages/MaintenanceServices';
import Enjaz from './pages/Enjaz';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { Toaster } from 'sonner';
import WhatsAppButton from './components/ui/WhatsAppButton';

function AppContent() {
  const isLoading = usePageTransition();
  useScrollToTop();

  useEffect(() => {
    const metaCache = document.createElement('meta');
    metaCache.httpEquiv = 'Cache-Control';
    metaCache.content = 'no-cache, no-store, must-revalidate';
    document.head.appendChild(metaCache);

    const metaPragma = document.createElement('meta');
    metaPragma.httpEquiv = 'Pragma';
    metaPragma.content = 'no-cache';
    document.head.appendChild(metaPragma);

    const metaExpires = document.createElement('meta');
    metaExpires.httpEquiv = 'Expires';
    metaExpires.content = '0';
    document.head.appendChild(metaExpires);

    return () => {
      document.head.removeChild(metaCache);
      document.head.removeChild(metaPragma);
      document.head.removeChild(metaExpires);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {isLoading && <PageTransition />}
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gas-systems" element={<CentralGasNetworks />} />
          <Route path="/generators" element={<Generators />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/gas-accessories" element={<GasAccessories />} />
          <Route path="/maintenance" element={<MaintenanceServices />} />
          <Route
            path="/enjaz"
            element={
              <ProtectedRoute>
                <Enjaz />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <div className="fixed bottom-4 right-4 z-50">
        <TranslateButton />
      </div>
      <ScrollToTop />
      <WhatsAppButton />
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}