import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { X } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { useAchievements } from '../../hooks/useAchievements';
import { Achievement } from '../../types/achievement';

export default function AchievementsSection() {
  const { achievements } = useAchievements();
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  // Calculate if we should enable loop mode based on number of achievements
  const shouldEnableLoop = achievements.length >= 4;

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-primary/5 bg-[length:20px_20px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">إنجازاتنا</h2>
          <div className="h-1 w-24 mx-auto mt-4 rounded-full bg-gradient-to-r from-primary via-accent to-primary animate-gradient-x" />
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            نفخر بتقديم أفضل الحلول والخدمات في مجال الطاقة
          </p>
        </div>

        {/* Achievements Carousel */}
        {achievements.length > 0 ? (
          <div className="relative achievements-carousel-container -mx-4 sm:mx-0">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              loop={shouldEnableLoop}
              slidesPerView={'auto'}
              breakpoints={{
                320: { 
                  slidesPerView: 1,
                  spaceBetween: 20,
                  slidesPerGroup: 1,
                  centeredSlides: true,
                  coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false,
                  }
                },
                640: { 
                  slidesPerView: Math.min(1.5, achievements.length),
                  spaceBetween: 30,
                  slidesPerGroup: 1,
                  coverflowEffect: {
                    rotate: 20,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                  }
                },
                768: { 
                  slidesPerView: Math.min(2, achievements.length),
                  spaceBetween: 40,
                  slidesPerGroup: 1
                },
                1024: { 
                  slidesPerView: Math.min(3, achievements.length),
                  spaceBetween: 50,
                  slidesPerGroup: 1
                }
              }}
              coverflowEffect={{
                rotate: 20,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={achievements.length > 1 ? {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              } : false}
              autoplay={achievements.length > 1 ? {
                delay: 3000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              } : false}
              modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
              className="achievements-carousel !overflow-visible !px-4 sm:!px-0"
            >
              {achievements.map((achievement) => (
                <SwiperSlide key={achievement.id} className="!w-[calc(100%-2rem)] sm:!w-auto">
                  <div 
                    onClick={() => setSelectedAchievement(achievement)}
                    className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition-all duration-300 relative group cursor-pointer"
                  >
                    <div className="aspect-[4/3] relative">
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-90" />
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <h3 className="text-xl font-semibold mb-2">{achievement.title}</h3>
                        <p className="text-sm text-white/80">
                          {new Date(achievement.date).toLocaleDateString('ar-SA')}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              
              {/* Custom Navigation Buttons - Only show if more than one achievement */}
              {achievements.length > 1 && (
                <>
                  <div className="swiper-button-prev !hidden sm:!flex !w-12 !h-12 !bg-black/30 !rounded-full !transition-colors hover:!bg-primary/80">
                    <span className="sr-only">السابق</span>
                  </div>
                  <div className="swiper-button-next !hidden sm:!flex !w-12 !h-12 !bg-black/30 !rounded-full !transition-colors hover:!bg-primary/80">
                    <span className="sr-only">التالي</span>
                  </div>
                </>
              )}
            </Swiper>
          </div>
        ) : (
          <div className="text-center text-gray-500">
            لا توجد إنجازات لعرضها حالياً
          </div>
        )}
      </div>

      {/* Achievement Modal */}
      {selectedAchievement && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm modal-overlay"
          onClick={() => setSelectedAchievement(null)}
        >
          <div 
            className="relative bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedAchievement(null)}
              className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors z-10"
              aria-label="إغلاق"
            >
              <X className="h-6 w-6" />
            </button>
            
            <div className="relative aspect-video">
              <img
                src={selectedAchievement.image}
                alt={selectedAchievement.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
            
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedAchievement.title}
                </h3>
                <span className="text-sm text-gray-500">
                  {new Date(selectedAchievement.date).toLocaleDateString('ar-SA')}
                </span>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                {selectedAchievement.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
} 