import { useInView } from 'react-intersection-observer';
import { Shield, Settings, Wrench, CheckCircle, AlertTriangle, Network } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CentralGasNetworks() {
  const { ref: contentRef, inView: contentIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const features = [
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "معايير السلامة العالمية",
      description: "نلتزم بأعلى معايير السلامة وفقاً لمواصفات شركة الغاز والتصنيع الأهلية"
    },
    {
      icon: <Settings className="h-6 w-6 text-primary" />,
      title: "تصميم متكامل",
      description: "تصميم شامل لشبكات الغاز يناسب المجمعات السكنية والتجارية والصناعية"
    },
    {
      icon: <Wrench className="h-6 w-6 text-primary" />,
      title: "صيانة دورية",
      description: "خدمات صيانة منتظمة لضمان كفاءة وسلامة الشبكة"
    }
  ];

  const specifications = [
    "تصميم وتنفيذ شبكات الغاز المركزي طبقاً للمواصفات العالمية",
    "تركيب أنظمة السلامة والإنذار المبكر",
    "توريد وتركيب خزانات الغاز المركزي",
    "تمديد شبكات الغاز للوحدات السكنية والتجارية",
    "تركيب عدادات قياس استهلاك الغاز",
    "توفير قطع الغيار الأصلية",
    "خدمات الصيانة الدورية والطارئة"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Parallax Effect */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 transform-gpu">
          <img
            src="/src/images/gas-network-hero.jpg"
            alt="شبكات الغاز المركزي"
            className="w-full h-full object-cover scale-105 animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/80 backdrop-blur-sm" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">شبكات الغاز المركزي</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 animate-fade-in-up">
            حلول متكاملة لتصميم وتركيب شبكات الغاز المركزي بأعلى معايير الجودة والسلامة
          </p>
        </div>
      </section>

      {/* Main Features with Glass Morphism */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100/50 hover:border-primary/20"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section with Modern Grid */}
      <section className="py-20 bg-white" ref={contentRef}>
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transform transition-all duration-1000 ${
          contentIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              مواصفات وخدمات الشبكات
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              نقدم خدمات شاملة تلبي جميع احتياجات شبكات الغاز المركزي
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {specifications.map((spec, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl hover:bg-primary/5 transition-colors duration-300"
                >
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{spec}</p>
                </div>
              ))}
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 rounded-2xl border border-primary/10">
                <div className="flex items-start gap-4 mb-8">
                  <AlertTriangle className="h-8 w-8 text-accent" />
                  <div>
                    <h3 className="text-xl font-semibold mb-3">معايير السلامة</h3>
                    <p className="text-gray-600 leading-relaxed">
                      نلتزم بتطبيق أعلى معايير السلامة في تصميم وتنفيذ شبكات الغاز المركزي وفقاً لمواصفات شركة الغاز والتصنيع الأهلية المعايير العالمية
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Network className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold mb-3">شبكات متكاملة</h3>
                    <p className="text-gray-600 leading-relaxed">
                      تصميم وتنفيذ شبكات غاز مركزي متكاملة تشمل جميع المكونات من خزانات وأنابيب وصمامات وأنظمة سلامة
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
        <div className="absolute inset-0 bg-[url('/src/images/pattern.png')] opacity-10" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">هل تحتاج إلى استشارة؟</h2>
          <p className="text-xl mb-10 text-white/90 max-w-2xl mx-auto">
            فريقنا من المهندسين والفنيين جاهز لمساعدتك في تصميم وتنفيذ شبكة الغاز المركزي
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-white text-primary px-8 py-4 rounded-xl font-semibold 
              hover:bg-opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl 
              transform hover:-translate-y-1 active:translate-y-0"
          >
            احصل على عرض سعر
          </Link>
        </div>
      </section>
    </div>
  );
} 