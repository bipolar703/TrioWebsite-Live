import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

export default function ClientLogos() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  // Generate array of client logo paths
  const clientLogos = Array.from({ length: 18 }, (_, i) => `/src/images/clients/${i + 1}.jpg`);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={ref}
          className={`transform transition-all duration-1000 ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">عملاؤنا</h2>
            <p className="text-gray-600 text-lg">نفخر بثقة عملائنا وشراكتنا معهم</p>
          </div>

          {/* Logo Carousel - Top Row */}
          <div className="mb-8">
            <Swiper
              modules={[Autoplay]}
              slidesPerView={2}
              spaceBetween={30}
              loop={true}
              speed={8000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: false
              }}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 40 },
                768: { slidesPerView: 4, spaceBetween: 50 },
                1024: { slidesPerView: 5, spaceBetween: 60 }
              }}
              className="client-logos-slider"
            >
              {clientLogos.slice(0, 9).map((logo, index) => (
                <SwiperSlide key={`top-${index}`}>
                  <div className="p-6 bg-white rounded-lg hover:shadow-md transition-custom">
                    <img
                      src={logo}
                      alt={`Client ${index + 1}`}
                      className="w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Logo Carousel - Bottom Row (Reverse Direction) */}
          <div>
            <Swiper
              modules={[Autoplay]}
              slidesPerView={2}
              spaceBetween={30}
              loop={true}
              speed={8000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: true
              }}
              breakpoints={{
                640: { slidesPerView: 3, spaceBetween: 40 },
                768: { slidesPerView: 4, spaceBetween: 50 },
                1024: { slidesPerView: 5, spaceBetween: 60 }
              }}
              className="client-logos-slider"
            >
              {clientLogos.slice(9).map((logo, index) => (
                <SwiperSlide key={`bottom-${index}`}>
                  <div className="p-6 bg-white rounded-lg hover:shadow-md transition-custom">
                    <img
                      src={logo}
                      alt={`Client ${index + 10}`}
                      className="w-full h-16 object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
} 