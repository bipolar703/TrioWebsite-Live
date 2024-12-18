import { useInView } from 'react-intersection-observer';
import { Shield, Wrench, Settings, Factory } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';

export default function Generators() {
  const { ref: servicesRef, inView: servicesInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const { ref: partsRef, inView: partsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const services = [
    {
      title: 'خدمات إصلاح المعدات الدوارة',
      description: 'معدات عالية التقنية لفحص وإصلاح وصيانة نظام التوربينات الكامل.',
      icon: Settings,
      image: '/src/images/generators2.jpg'
    },
    {
      title: 'الهندسة العكسية',
      description: 'تصنيع قطع غيار مكافئة لجميع مكونات مسار الغاز الساخن والمضخات والعناصر الأخرى المطلوبة في نظام توليد الطاقة.',
      icon: Wrench,
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=1470'
    },
    {
      title: 'الكيماويات والمواد المضافة',
      description: 'إضافات الوقود المختبرة المستقلة وغيرها من المواد البتروكيماوية القيمة المستخدمة لخلق كفاءة أكبر وعمر أطول للمنتج.',
      icon: Shield,
      image: '/src/images/fuel.jpg'
    }
  ];

  const manufacturers = [
    {
      name: 'ألفا لافال',
      models: [
        ['MAP 103', 'MAP 104', 'MAP 205', 'WHPX 513', 'MOPX 210', 'MAPX 313', 'MOPX 213'],
        ['WHPX 405', 'WHPX 407', 'WHPX 413', 'WHPX 505', 'WHPX 510', 'MOPX 207', 'MOPX 209'],
        ['SJ 3000', 'SJ 15', 'SJ 2000', 'SJ 6000'],
        ['MAPX 313', 'MAPX 210', 'MAPX 309', 'MAPX 204', 'MAPX 205', 'MAPX 207', 'MOPX 205']
      ]
    },
    {
      name: 'ميتسوبيشي',
      models: [['SJ 700', 'SJ 4000']]
    },
    {
      name: 'ويست فاليا',
      models: [['OSA 7', 'OSA 20', 'OSA 35']]
    }
  ];

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80">
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:20px_20px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">المولدات والتوربينات</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 animate-fade-in-up">
            حلول متكاملة للمولدات والتوربينات بأعلى معايير الجودة والكفاءة
          </p>
        </div>
      </section>

      {/* Main Services Section */}
      <section ref={servicesRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="خدماتنا المتخصصة"
            subtitle="نقدم مجموعة شاملة من الخدمات المتخصصة في مجال المولدات والتوربينات"
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => (
              <div
                key={index}
                className={`transform transition-all duration-700 ${
                  servicesInView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <service.icon className="absolute bottom-4 right-4 h-8 w-8 text-white" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Updated Replacement Parts Section with Modern Table */}
      <section ref={partsRef} className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">قطع الغيار المتوفرة</h2>
            <p className="text-xl text-gray-600">
              متخصصون في صيانة وتوريد قطع الغيار لألفا لافال وميتسوبيشي ووست فاليا
            </p>
          </div>

          <div className="space-y-8">
            {manufacturers.map((manufacturer, index) => (
              <div
                key={manufacturer.name}
                className={`transform transition-all duration-700 ${
                  partsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                  <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <Factory className="h-6 w-6 text-primary" />
                      <h3 className="text-xl font-bold text-gray-900">{manufacturer.name}</h3>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {manufacturer.models.flat().map((model, modelIndex) => (
                        <div
                          key={modelIndex}
                          className="bg-gray-50 px-4 py-3 rounded-lg text-center hover:bg-primary/5 transition-colors duration-300"
                        >
                          <span className="text-gray-700 font-medium">{model}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}