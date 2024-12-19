import React from 'react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import { Shield, Clock, Calendar, CheckCircle, ChevronLeft, Phone } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

export default function MaintenanceServices() {
  const { ref: contentRef, inView: contentIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  const { siteSettings } = useSiteSettings();

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
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">خدمات الصيانة</h1>
          <p className="text-xl text-blue-100">
            نقدم خدمات صيانة احترافية لضمان كفاءة وسلامة أنظمة الغاز
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={contentRef}
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
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

      {/* Call to Action */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">نحن هنا لمساعدتك</h2>
              <p className="text-gray-600 mb-6">
                فريقنا الفني جاهز لتقديم المساعدة والدعم على مدار الساعة. اتصل بنا الآن للحصول على خدمة صيانة احترافية.
              </p>
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold mb-4">احصل على استشارة مجانية</h3>
                <p className="text-gray-600 mb-6">
                  تواصل معنا لمعرفة الحل الأمثل لاحتياجات الصيانة لديك
                </p>
                <div className="flex items-center gap-4">
                  <Phone className="h-6 w-6 text-primary" />
                  <a 
                    href={`tel:${siteSettings?.phone_number}`} 
                    className="text-lg font-semibold text-primary hover:text-accent transition-colors ltr"
                  >
                    {siteSettings?.phone_number || 'جاري التحميل...'}
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
            <div className="relative">
              <img
                src="/src/images/maintenance-services.jpg"
                alt="خدمات الصيانة"
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 