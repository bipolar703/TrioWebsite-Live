import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import trioLogo from '../../images/triologo.png';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === '/' || location.pathname === '/home';

  // Handle scroll behavior
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const middleOfSlide = window.innerHeight / 2;

    // Update background based on scroll position
    if (isHomePage) {
      setIsScrolled(currentScrollY > middleOfSlide);
    } else {
      setIsScrolled(currentScrollY > 50);
    }
  }, [isHomePage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Handle touch gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStart) return;
    
    const currentTouch = e.touches[0].clientX;
    const diff = touchStart - currentTouch;

    if (diff > 50) { // Swipe left to close
      setIsOpen(false);
    }
  };

  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  const navBackground = isHomePage && !isScrolled 
    ? 'bg-transparent' 
    : 'bg-white/95 backdrop-blur-sm shadow-md';

  const textColor = isHomePage && !isScrolled ? 'text-white' : 'text-gray-800';

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${navBackground}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-row-reverse md:flex-row justify-between items-center h-16">
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-12">
              <NavLink
                to="/"
                className={() =>
                  `px-3 py-2 relative group ${textColor} hover:opacity-80 transition-all`
                }
              >
                {({ isActive }) => (
                  <>
                    الرئيسية
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-current transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50'}`} />
                  </>
                )}
              </NavLink>

              <NavLink
                to="/about"
                className={() =>
                  `px-3 py-2 relative group ${textColor} hover:opacity-80 transition-all`
                }
              >
                {({ isActive }) => (
                  <>
                    من نحن
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-current transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50'}`} />
                  </>
                )}
              </NavLink>

              {/* Services Dropdown */}
              <div className="relative group">
                <NavLink
                  to="/services"
                  className={() =>
                    `px-3 py-2 relative group inline-flex items-center ${textColor} hover:opacity-80 transition-all`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span>خدماتنا</span>
                      <ChevronDown className="h-4 w-4 mr-1" />
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-current transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50'}`} />
                    </>
                  )}
                </NavLink>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-1 group-hover:translate-y-0">
                  <Link
                    to="/gas-systems"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                  >
                    أنظمة الغاز المركزي
                  </Link>
                  <Link
                    to="/generators"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                  >
                    المولدات والتوربينات
                  </Link>
                  <Link
                    to="/gas-accessories"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                  >
                    اكسسوارات وقطع الغاز
                  </Link>
                  <Link
                    to="/maintenance"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 whitespace-nowrap"
                  >
                    خدمات الصيانة
                  </Link>
                </div>
              </div>

              <NavLink
                to="/contact"
                className={() =>
                  `px-3 py-2 relative group ${textColor} hover:opacity-80 transition-all`
                }
              >
                {({ isActive }) => (
                  <>
                    اتصل بنا
                    <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-current transform origin-left transition-transform duration-300 ${isActive ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-50'}`} />
                  </>
                )}
              </NavLink>
            </div>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={trioLogo}
                alt="Trio Logo"
                className="h-12 w-auto filter drop-shadow-[0_0_4px_rgba(255,255,255,0.3)]"
              />
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`md:hidden p-2 rounded-md ${textColor} hover:opacity-80`}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        handleTouchStart={handleTouchStart}
        handleTouchMove={handleTouchMove}
        handleTouchEnd={handleTouchEnd}
      />
    </>
  );
}
