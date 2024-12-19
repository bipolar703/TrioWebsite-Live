import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { HeroSlide } from '../../types/heroSlide';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const navigate = useNavigate();

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        pagination={{
          clickable: true,
          bulletActiveClass: 'swiper-pagination-bullet-active',
          renderBullet: (index, className) => {
            return `<span class="${className} transition-all duration-300"></span>`;
          },
        }}
        navigation={{
          prevEl: '.hero-swiper-button-prev',
          nextEl: '.hero-swiper-button-next',
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        dir="rtl"
        className="h-[90vh] w-full relative group touch-pan-y"
        touchRatio={1.5}
        grabCursor={true}
        resistance={true}
        resistanceRatio={0.85}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              {/* Left and Right Click Areas for Mobile */}
              <div className="md:hidden absolute inset-y-0 right-0 w-1/4 z-10" onClick={() => document.querySelector('.hero-swiper-button-prev')?.dispatchEvent(new Event('click'))} />
              <div className="md:hidden absolute inset-y-0 left-0 w-1/4 z-10" onClick={() => document.querySelector('.hero-swiper-button-next')?.dispatchEvent(new Event('click'))} />
              
              <img
                src={slide.image}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
                draggable="false"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/40" />
              <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />
              
              <div className="relative h-full flex items-center justify-center text-center px-4">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-3xl md:text-6xl font-bold text-white mb-4 animate-fadeIn">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-2xl text-white mb-8 animate-fadeIn animation-delay-200">
                    {slide.subtitle}
                  </p>
                  <div className="flex flex-wrap justify-center gap-4 animate-fadeIn animation-delay-400">
                    <button
                      onClick={() => navigate(slide.left_button_link)}
                      className="bg-primary hover:bg-primary/90 text-white px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base"
                    >
                      {slide.left_button_text}
                    </button>
                    <button
                      onClick={() => navigate(slide.right_button_link)}
                      className="bg-white hover:bg-gray-100 text-primary px-6 md:px-8 py-2.5 md:py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105 active:scale-95 text-sm md:text-base"
                    >
                      {slide.right_button_text}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* Navigation Buttons - Desktop Only */}
      <button 
        className="hero-swiper-button-prev hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-all items-center justify-center"
        aria-label="السابق"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <button 
        className="hero-swiper-button-next hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-primary p-2 rounded-full shadow-lg transition-all items-center justify-center"
        aria-label="التالي"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
    </div>
  );
}