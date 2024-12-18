import { Shield, Settings, Zap } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import HeroSlider from '../components/home/HeroSlider';
import ProductSlider from '../components/home/ProductSlider';
import AboutSection from '../components/home/AboutSection';
import ClientLogos from '../components/home/ClientLogos';
import AchievementsSection from '../components/home/AchievementsSection';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function Home() {
  // Intersection Observer for About section
  useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const slides = [
    {
      image: "/src/images/gas-systems.jpg",
      title: "شبكات الغاز المركزي",
      subtitle: "أعمال تصميم وتمديد شبكات الغاز ",
      buttons: [
        {
          text: "إلى التفاصيل",
          link: "/gas-systems",
          style: "bg-primary hover:bg-primary/90 text-white"
        },
        {
          text: "اطلب الخدمة",
          link: "/contact",
          style: "bg-white hover:bg-gray-100 text-primary"
        }
      ]
    },
    {
      image: "/src/images/generators.jpg",
      title: "اكسسوارات وقطع الغاز",
      subtitle: "اجود واحدث قطع وانظمة امان شبكات الغاز",
      buttons: [
        {
          text: "إلى التفاصيل",
          link: "/generators",
          style: "bg-primary hover:bg-primary/90 text-white"
        },
        {
          text: "اطلب الخدمة",
          link: "/contact",
          style: "bg-white hover:bg-gray-100 text-primary"
        }
      ]
    },
    {
      image: "/src/images/services.jpg",
      title: "خدمات الصيانة",
      subtitle: "صيانة احترافية وخدمات ما بعد البيع",
      buttons: [
        {
          text: "إلى التفاصيل",
          link: "/maintenance",
          style: "bg-primary hover:bg-primary/90 text-white"
        },
        {
          text: "اطلب الخدمة",
          link: "/contact",
          style: "bg-white hover:bg-gray-100 text-primary"
        }
      ]
    }
  ];

  const products = [
    {
      image: "/src/images/products/Ball Valves.jpg",
      title: 'صمامات كروية',
      description: 'صمامات عالية الجودة للتحكم في تدفق الغاز'
    },
    {
      image: "/src/images/products/First Stage Regulators.jpg",
      title: 'منظمات المرحلة الأولى',
      description: 'منظمات ضغط متينة للمرحلة الأولى'
    },
    {
      image: "/src/images/products/Gas Leakeage Detectors.jpg",
      title: 'كواشف تسرب الغاز',
      description: 'أنظمة كشف متطورة لضمان السلامة'
    },
    {
      image: "/src/images/products/High, Medium and Low Pressure Meters.jpg",
      title: 'عدادات الضغط',
      description: 'عدادات ضغط عالي ومتوسط ومنخفض'
    },
    {
      image: "/src/images/products/Second Stage Regulators.jpg",
      title: 'منظمات المرحلة الثانية',
      description: 'منظمات دقيقة للتحكم النهائي في الضغط'
    }
  ];

  const { ref: productsRef, inView: productsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSlider slides={slides} />

      {/* About Section */}
      <AboutSection />

      {/* Products Section */}
      <section className="py-20 bg-gray-50">
        <div 
          ref={productsRef}
          className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${
            productsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">منتجاتنا</h2>
            <div className="section-title-line"></div>
          </div>
          <ProductSlider products={products} />
          {/* Add View All Products Button */}
          <div className="mt-12 text-center">
            <Link
              to="/gas-accessories"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transition-colors duration-300 group"
            >
              عرض جميع المنتجات
              <ArrowLeft className="mr-2 h-5 w-5 transform group-hover:-translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </section>

      {/* Client Logos Section */}
      <ClientLogos />

      {/* Add Achievements Section here */}
      <AchievementsSection />

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="absolute inset-0 bg-grid-primary/5 bg-[length:20px_20px]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">لماذا تختار الثلاثية الحديثة للطاقة ؟</h2>
            <div className="section-title-line"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Safety & Quality Card */}
            <div className="group h-full">
              <div className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
                    <Shield className="h-8 w-8 text-primary animate-shield" />
                    <div className="absolute inset-0 bg-primary/5 animate-pulse-slow"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">معايير الجودة والأمان</h3>
                  <p className="text-gray-600 leading-relaxed">
                    نلتزم بأعلى معايير الجودة العالمية وإجراءات السلامة في جميع مشاريعنا. نضمن تطبيق أحدث التقنيات وأفضل الممارسات لضمان سلامة وكفاءة أنظمتنا.
                  </p>
                </div>
              </div>
            </div>

            {/* Expertise Card */}
            <div className="group h-full">
              <div className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
                    <Settings className="h-8 w-8 text-accent animate-spin-slow" />
                    <div className="absolute inset-0 bg-accent/5 animate-pulse-slow"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">خبرة فنية متخصصة</h3>
                  <p className="text-gray-600 leading-relaxed">
                    يضم فريقنا نخبة من المهندسين والفنيين المتخصصين بخبرة تتجاوز 15 عاماً في مجال الطاقة. نقدم حلولاً مبتكرة تلبي احتياجات عملائنا بكفاءة عالية.
                  </p>
                </div>
              </div>
            </div>

            {/* Integrated Solutions Card */}
            <div className="group h-full">
              <div className="relative p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="relative">
                  <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
                    <Zap className="h-8 w-8 text-secondary animate-pulse-fast" />
                    <div className="absolute inset-0 bg-secondary/5 animate-pulse-slow"></div>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-gray-900">حلول طاقة متكاملة</h3>
                  <p className="text-gray-600 leading-relaxed">
                    نوفر حلولاً شاملة لأنظمة الطاقة من التصميم إلى التنفيذ والصيانة. نضمن تكامل الأنظمة وكفاءتها مع خدمات دعم فني على مدار الساعة.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}