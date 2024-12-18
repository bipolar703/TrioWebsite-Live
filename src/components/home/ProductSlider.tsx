import React, { useState, useEffect, useRef, TouchEvent } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface Product {
  image: string;
  title: string;
  description: string;
}

interface ProductSliderProps {
  products: Product[];
  autoplayInterval?: number;
}

export default function ProductSlider({ products, autoplayInterval = 4000 }: ProductSliderProps) {
  const [currentProductSlide, setCurrentProductSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const minSwipeDistance = 50;

  const handleProductChange = (direction: 'next' | 'prev') => {
    setCurrentProductSlide(current => {
      if (direction === 'next') {
        return current === products.length - 1 ? 0 : current + 1;
      }
      return current === 0 ? products.length - 1 : current - 1;
    });
  };

  const getSlideIndex = (shift: number) => {
    const totalSlides = products.length;
    let index = currentProductSlide + shift;
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    return index;
  };

  // Touch handlers
  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsSwiping(true);
  };

  const onTouchMove = (e: TouchEvent) => {
    if (!touchStart) return;
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      handleProductChange(isLeftSwipe ? 'next' : 'prev');
    }

    setTouchStart(null);
    setTouchEnd(null);
    setIsSwiping(false);
  };

  return (
    <div className="relative w-full overflow-hidden py-12">
      <div className="flex items-center justify-center">
        <div 
          ref={sliderRef}
          className="relative w-full max-w-7xl px-4"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="flex items-center justify-center gap-6">
            {/* Desktop View with Side Images */}
            <div className="hidden md:block relative w-1/4 aspect-[4/3] opacity-50 blur-[1px] transition-all duration-300">
              <img
                src={products[getSlideIndex(-1)].image}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            {/* Main Image - Both Mobile & Desktop */}
            <div 
              className={`relative w-full md:w-1/3 aspect-[4/3] transition-all duration-500 transform 
                ${isSwiping ? 'scale-95' : 'hover:scale-105'}`}
            >
              <img
                src={products[currentProductSlide].image}
                alt={products[currentProductSlide].title}
                className="w-full h-full object-cover rounded-lg shadow-xl"
                draggable="false"
              />
              
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 rounded-lg" />
            </div>

            <div className="hidden md:block relative w-1/4 aspect-[4/3] opacity-50 blur-[1px] transition-all duration-300">
              <img
                src={products[getSlideIndex(1)].image}
                alt=""
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>

          {/* Navigation Buttons - Desktop Only */}
          <div className="hidden md:block">
            <button
              onClick={() => handleProductChange('prev')}
              className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary p-3 rounded-full shadow-lg hover:scale-110 transition-all"
              aria-label="المنتج السابق"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <button
              onClick={() => handleProductChange('next')}
              className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary p-3 rounded-full shadow-lg hover:scale-110 transition-all"
              aria-label="المنتج التالي"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Swipe Indicator - Mobile Only */}
      <div className="md:hidden flex justify-center mt-4 space-x-1 rtl:space-x-reverse">
        {products.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentProductSlide 
                ? 'bg-primary w-4' 
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Product Title & Description */}
      <div className="text-center mt-8 max-w-lg mx-auto px-4">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          {products[currentProductSlide].title}
        </h3>
        <p className="text-gray-600">
          {products[currentProductSlide].description}
        </p>
      </div>
    </div>
  );
} 