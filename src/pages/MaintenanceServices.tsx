import { Shield, Clock, Calendar, Wrench, CheckCircle, AlertTriangle, Phone, ChevronLeft } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';

export default function MaintenanceServices() {
  const { ref: contentRef, inView: contentIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const maintenanceTypes = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "الصيانة الوقائية",
      description: "فحص دوري شامل للأنظمة وإجراءات صيانة استباقية لمنع الأعطال قبل حدوثها",
      features: [
        "فحص دوري للأنظمة والمعدات",
        "تنظيف وضبط المكونات",
        "استبدال القطع المستهلكة",
        "تقارير فنية دورية"
      ]
    },
    {
      icon: <Clock className="h-8 w-8 text-accent" />,
      title: "الصيانة الطارئة",
      description: "خدمة صيانة سريعة على مدار الساعة لمعالجة الأعطال الطارئة",
      features: [
        "استجابة سريعة على مدار 24 ساعة",
        "فريق فني متخصص",
        "قطع غيار أصلية",
        "ضمان على الإصلاحات"
      ]
    },
    {
      icon: <Calendar className="h-8 w-8 text-secondary" />,
      title: "عقود طويلة الأجل",
      description: "حلول صيانة شاملة مع مزايا خاصة للعقود طويلة الأجل",
      features: [
        "تغطية شاملة للصيانة الوقائية والطارئة",
        "أسعار تنافسية",
        "أولوية في الخدمة",
        "تقارير دورية مفصلة"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/90">
          <div className="absolute inset-0 bg-grid-white/[0.1] bg-[length:20px_20px]" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">خدمات الصيانة</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90 animate-fade-in-up">
            حلول صيانة متكاملة تناسب احتياجات منشأتك مع ضمان أعلى معايير الجودة والكفاءة
          </p>
        </div>
      </section>

      {/* Maintenance Types Section - Enhanced with CTAs */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={contentRef}
            className={`grid md:grid-cols-3 gap-8 transform transition-all duration-1000 ${
              contentIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {maintenanceTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 group flex flex-col">
                <div className="w-16 h-16 rounded-xl bg-gray-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-500">
                  {type.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-900">{type.title}</h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="space-y-3 mb-8 flex-grow">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-gray-700">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  state={{ 
                    maintenanceType: type.title,
                    message: `أود الاستفسار عن ${type.title}`
                  }}
                  className="mt-auto inline-flex items-center justify-center px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/90 transform hover:-translate-y-1 transition-all duration-300 group-hover:shadow-lg"
                >
                  <span>طلب عرض سعر</span>
                  <ChevronLeft className="h-5 w-5 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">لماذا تختار خدمات الصيانة لدينا؟</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Wrench className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">فريق فني متخصص</h3>
                      <p className="text-gray-600">مهندسون وفنيون مؤهلون بخبرة عالية</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-accent/10 rounded-lg">
                      <AlertTriangle className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">استجابة سريعة</h3>
                      <p className="text-gray-600">خدمة طوارئ على مدار 24 ساعة</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">احصل على استشارة مجانية</h3>
                <p className="text-gray-600 mb-6">
                  تواصل معنا لمعرفة الحل الأمثل لاحتياجات الصيانة لديك
                </p>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <a href="tel:+966530009914" className="text-lg font-semibold text-primary hover:text-accent transition-colors ltr">
                    +966 530009914
                  </a>
                </div>
                <Link
                  to="/contact"
                  className="mt-6 block w-full bg-primary text-white text-center py-3 rounded-lg hover:bg-primary/90 transition-colors"
                >
                  تواصل معنا
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 