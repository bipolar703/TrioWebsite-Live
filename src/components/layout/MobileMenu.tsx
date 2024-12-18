import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  handleTouchStart: (e: React.TouchEvent) => void;
  handleTouchMove: (e: React.TouchEvent) => void;
  handleTouchEnd: () => void;
}

export default function MobileMenu({ 
  isOpen, 
  onClose,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd 
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-50">
      {/* Dark overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        ref={menuRef}
        className="absolute inset-y-0 right-0 w-full bg-white transform transition-transform duration-300"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Decorative energy lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top right corner decoration */}
          <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/5 rounded-full" />
          <div className="absolute top-0 right-0 w-64 h-64">
            <div className="absolute inset-0 bg-gradient-to-bl from-primary/10 to-transparent" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }} />
          </div>
          
          {/* Energy lines */}
          <div className="absolute top-20 right-8 w-32 h-[1px] bg-gradient-to-l from-primary/20 to-transparent transform -rotate-45" />
          <div className="absolute top-40 right-12 w-24 h-[1px] bg-gradient-to-l from-primary/15 to-transparent transform -rotate-30" />
          <div className="absolute bottom-40 right-10 w-28 h-[1px] bg-gradient-to-l from-primary/20 to-transparent transform rotate-45" />
          
          {/* Bottom left decoration */}
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-accent/5 rounded-full" />
          <div className="absolute bottom-0 left-0 w-64 h-64">
            <div className="absolute inset-0 bg-gradient-to-tr from-accent/10 to-transparent" style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }} />
          </div>
        </div>

        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-2 text-gray-600 hover:text-primary transition-colors"
            aria-label="إغلاق القائمة"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Menu items */}
        <div className="px-8 py-6 space-y-8">
          <Link
            to="/"
            className="block text-xl text-gray-800 hover:text-primary transition-colors"
            onClick={onClose}
          >
            الرئيسية
          </Link>
          <Link
            to="/about"
            className="block text-xl text-gray-800 hover:text-primary transition-colors"
            onClick={onClose}
          >
            من نحن
          </Link>
          
          {/* Services Section */}
          <div className="space-y-4">
            <Link
              to="/services"
              className="block text-xl text-gray-800 hover:text-primary transition-colors"
              onClick={onClose}
            >
              خدماتنا
            </Link>
            <div className="pr-6 space-y-4 border-r border-primary/10">
              <Link
                to="/gas-systems"
                className="block text-lg text-gray-600 hover:text-primary transition-colors"
                onClick={onClose}
              >
                أنظمة الغاز المركزي
              </Link>
              <Link
                to="/generators"
                className="block text-lg text-gray-600 hover:text-primary transition-colors"
                onClick={onClose}
              >
                المولدات والتوربينات
              </Link>
              <Link
                to="/gas-accessories"
                className="block text-lg text-gray-600 hover:text-primary transition-colors"
                onClick={onClose}
              >
                اكسسوارات وقطع الغاز
              </Link>
              <Link
                to="/maintenance"
                className="block text-lg text-gray-600 hover:text-primary transition-colors"
                onClick={onClose}
              >
                خدمات الصيانة
              </Link>
            </div>
          </div>

          <Link
            to="/contact"
            className="block text-xl text-gray-800 hover:text-primary transition-colors"
            onClick={onClose}
          >
            اتصل بنا
          </Link>
        </div>
      </div>
    </div>
  );
} 