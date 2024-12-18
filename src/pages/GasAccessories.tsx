import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Package2, Cylinder, Shield, Gauge, Wrench, Link2, ChevronRight, ChevronLeft, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation } from 'swiper/modules';
import { Product, CategoryCardProps } from '../types/products';
import productsData from '../data/products.json';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

// Define category constants
const PRODUCT_CATEGORIES = {
  GAS_TANKS: 'gas-tanks',
  SAFETY: 'safety',
  MEASURE_PRESSURE: 'measure-pressure',
  VALVES: 'valves',
  FITTINGS_PIPES: 'fittings-pipes',
  LINKS_CONNECTIONS: 'links-connections'
} as const;

const CATEGORY_LABELS: Record<string, string> = {
  [PRODUCT_CATEGORIES.GAS_TANKS]: 'خزانات الغاز',
  [PRODUCT_CATEGORIES.SAFETY]: 'أنظمة السلامة',
  [PRODUCT_CATEGORIES.MEASURE_PRESSURE]: 'القياس والضغط',
  [PRODUCT_CATEGORIES.VALVES]: 'المحابس',
  [PRODUCT_CATEGORIES.FITTINGS_PIPES]: 'التركيبات والأنابيب',
  [PRODUCT_CATEGORIES.LINKS_CONNECTIONS]: 'الوصلات والربط',
  'all': 'جميع المنتجات'
};

interface CategoryCardComponentProps extends CategoryCardProps {
  selectedCategory: string;
  onSelect: (category: string) => void;
}

// Featured Products Carousel Component
const FeaturedCarousel = ({ products }: { products: Product[] }) => {
  const [randomProducts, setRandomProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (products.length > 0) {
      const shuffled = [...products]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10);
      setRandomProducts(shuffled);
    }
  }, [products]);

  function setPreviewProduct(product: Product): void {
    throw new Error('Function not implemented.');
  }

  return (
    <div className="relative bg-gradient-to-b from-gray-50/50 to-white/50 py-12 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          منتجات مميزة
          <div className="h-1 w-24 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x" />
        </h2>
        
        <div className="relative">
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            dir="rtl"
            loop={true}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
              stopOnLastSlide: false,
            }}
            navigation={{
              nextEl: '.carousel-button-next',
              prevEl: '.carousel-button-prev',
            }}
            breakpoints={{
              320: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 'auto',
                spaceBetween: 40,
              },
            }}
            modules={[EffectCoverflow, Navigation, Autoplay]}
            className="w-full py-8"
          >
            {randomProducts.map((product) => (
              <SwiperSlide 
                key={product.id} 
                className="w-[280px] sm:w-[320px] transition-transform duration-500"
              >
                <motion.div 
                  className="bg-white rounded-2xl overflow-hidden shadow-lg mx-2 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setPreviewProduct(product)}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Buttons - Only visible on desktop */}
          <div className="hidden md:block">
            <button 
              aria-label="السابق"
              className="carousel-button-prev absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center z-10 transition-all hover:bg-white"
            >
              <ChevronRight className="w-6 h-6 text-gray-800" />
            </button>
            <button 
              aria-label="التالي"
              className="carousel-button-next absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center z-10 transition-all hover:bg-white"
            >
              <ChevronLeft className="w-6 h-6 text-gray-800" />
            </button>
          </div>
        </div>

        <style>
          {`
            .swiper-button-next::after,
            .swiper-button-prev::after {
              display: none;
            }
            
            .swiper-pagination {
              position: relative;
              margin-top: 2rem;
            }
            
            .swiper-pagination-bullet {
              width: 8px;
              height: 8px;
              background: #cbd5e1;
              opacity: 1;
            }
            
            .swiper-pagination-bullet-active {
              background: #0c78bd;
              transform: scale(1.2);
            }

            @media (max-width: 768px) {
              .carousel-button-next,
              .carousel-button-prev {
                display: none;
              }
            }

            .swiper-wrapper {
              direction: rtl;
            }
          `}
        </style>
      </div>
    </div>
  );
};

// Enhanced CategoryCard with better icon color handling
const CategoryCard = ({ category, label, icon, count, selectedCategory, onSelect }: CategoryCardComponentProps) => {
  const isSelected = selectedCategory === category;
  
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative overflow-hidden rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 ${
        isSelected 
          ? 'bg-primary text-white shadow-lg' 
          : 'bg-white hover:bg-primary/5'
      }`}
      onClick={() => onSelect(category)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 opacity-50" />
      <div className="relative z-10">
        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-3 ${
          isSelected ? 'bg-white/20' : 'bg-primary/10'
        }`}>
          {React.cloneElement(icon as React.ReactElement, {
            className: `w-5 h-5 sm:w-6 sm:h-6 ${isSelected ? 'text-white' : 'text-primary'}`
          })}
        </div>
        <h3 className="text-sm sm:text-lg font-semibold mb-1">{label}</h3>
        <p className="text-xs sm:text-sm opacity-80">{count} منتج</p>
      </div>
    </motion.div>
  );
};

// Add this search component
const ProductSearch = ({ searchQuery, onSearchChange }: { searchQuery: string; onSearchChange: (value: string) => void }) => (
  <div className="max-w-2xl mx-auto mb-8">
    <div className="relative">
      <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        type="text"
        placeholder="ابحث عن منتج..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pr-12 pl-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white/80 backdrop-blur-sm"
      />
    </div>
  </div>
);

// Add this interface for the preview modal
interface PreviewModalProps {
  product: Product | null;
  onClose: () => void;
}

// Add this component for the preview modal
const PreviewModal = ({ product, onClose }: PreviewModalProps) => {
  // Handle click outside
  const modalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!product) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
    >
      <motion.div
        ref={modalRef}
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", duration: 0.3 }}
        className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
          aria-label="إغلاق"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="relative aspect-[4/3] w-full bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="p-6">
          <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Update the product card in the main grid to include the preview button
const ProductCard = ({ product, onPreview }: { product: Product; onPreview: (product: Product) => void }) => {
  const [showPreviewButton, setShowPreviewButton] = useState(false);

  // Reset showPreviewButton when product changes
  useEffect(() => {
    setShowPreviewButton(false);
  }, [product.id]);

  // Handle mobile touch with improved behavior
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    
    if (window.innerWidth < 768) {
      if (!showPreviewButton) {
        setShowPreviewButton(true);
      } else {
        setShowPreviewButton(false);
        onPreview(product);
      }
    } else {
      onPreview(product);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-100/50 hover:border-primary/20 transition-all duration-500"
    >
      <div className="aspect-square overflow-hidden">
        <img 
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
        />
        <div 
          className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-all duration-300
            ${window.innerWidth >= 768 
              ? 'opacity-0 group-hover:opacity-100' 
              : showPreviewButton ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <button
            onClick={handleClick}
            className={`px-6 py-2 bg-white/90 backdrop-blur-sm rounded-lg text-gray-900 transition-all duration-300
              ${window.innerWidth >= 768 
                ? 'transform -translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100'
                : showPreviewButton ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
              }`}
          >
            عرض المنتج
          </button>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm">{product.description}</p>
      </div>
    </motion.div>
  );
};

export default function GasAccessories() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  // Load products
  useEffect(() => {
    setProducts(productsData);
    setIsLoading(false);
  }, []);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case PRODUCT_CATEGORIES.GAS_TANKS:
        return <Cylinder className="w-6 h-6 text-primary" />;
      case PRODUCT_CATEGORIES.SAFETY:
        return <Shield className="w-6 h-6 text-primary" />;
      case PRODUCT_CATEGORIES.MEASURE_PRESSURE:
        return <Gauge className="w-6 h-6 text-primary" />;
      case PRODUCT_CATEGORIES.VALVES:
        return <Wrench className="w-6 h-6 text-primary" />;
      case PRODUCT_CATEGORIES.FITTINGS_PIPES:
        return <Package2 className="w-6 h-6 text-primary" />;
      case PRODUCT_CATEGORIES.LINKS_CONNECTIONS:
        return <Link2 className="w-6 h-6 text-primary" />;
      default:
        return <Package2 className="w-6 h-6 text-primary" />;
    }
  };

  // Get product count by category
  const getProductCount = (category: string) => {
    if (category === 'all') return products.length;
    return products.filter(product => product.category === category).length;
  };

  // Filter products based on category and search query
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Cleanup preview state when category or search changes
  useEffect(() => {
    setPreviewProduct(null);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Featured Products Carousel */}
      <FeaturedCarousel products={products} />
      
      {/* Combined Categories and Products Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            جميع المنتجات
            <div className="h-1 w-24 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x" />
          </h2>

          {/* Add Search Component */}
          <ProductSearch 
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {Object.entries(CATEGORY_LABELS).map(([category, label]) => (
              <CategoryCard
                key={category}
                category={category}
                label={label}
                icon={getCategoryIcon(category)}
                count={getProductCount(category)}
                selectedCategory={selectedCategory}
                onSelect={setSelectedCategory}
              />
            ))}
          </div>

          {/* Products Grid */}
          {isLoading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onPreview={setPreviewProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewProduct && (
          <PreviewModal
            product={previewProduct}
            onClose={() => setPreviewProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
} 