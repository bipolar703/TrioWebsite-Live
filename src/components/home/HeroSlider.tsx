import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import { Link } from 'react-router-dom';

interface HeroSlide {
  id: number;
  image: string;
  title: string;
  subtitle: string;
  left_button_text: string;
  left_button_link: string;
  right_button_text: string;
  right_button_link: string;
}

export default function HeroSlider() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/hero-slides');
        if (!response.ok) throw new Error('Failed to fetch slides');
        const data = await response.json();
        setSlides(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch slides');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  if (isLoading) return <div className="h-[600px] bg-gray-100 animate-pulse"></div>;
  if (error) return <div className="h-[600px] bg-red-50 flex items-center justify-center text-red-500">{error}</div>;
  if (slides.length === 0) return null;

  return (
    <Swiper
      modules={[Autoplay, Navigation, Pagination, EffectFade]}
      effect="fade"
      spaceBetween={0}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      loop={true}
      className="h-[600px]"
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div
            className="relative h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50">
              <div className="container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-lg md:text-xl lg:text-2xl mb-8 max-w-3xl">{slide.subtitle}</p>
                <div className="flex flex-wrap gap-4 justify-center">
                  {slide.left_button_text && (
                    <Link
                      to={slide.left_button_link}
                      className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg transition-colors"
                    >
                      {slide.left_button_text}
                    </Link>
                  )}
                  {slide.right_button_text && (
                    <Link
                      to={slide.right_button_link}
                      className="bg-white hover:bg-gray-100 text-primary font-bold py-3 px-8 rounded-lg transition-colors"
                    >
                      {slide.right_button_text}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}