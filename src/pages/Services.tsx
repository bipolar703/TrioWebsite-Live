import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Zap, Wind, Settings } from 'lucide-react';

export default function Services() {
  const navigate = useNavigate();

  const services = [
    {
      title: 'أنظمة الغاز المركزي',
      image: '/src/images/gas-systems.jpg',
      description: 'حلول متكاملة لأنظمة الغاز الطبيعي والصناعي',
      link: '/gas-systems',
      icon: Wind,
      features: [
        'تصميم وتنفيذ شبكات الغاز',
        'صيانة دورية وطارئة',
        'معايير أمان عالية'
      ]
    },
    {
      title: 'المولدات والتوربينات',
      image: '/src/images/generators2.jpg',
      description: 'حلول موثوقة لتوليد الطاقة الكهربائية',
      link: '/gas-accessories',
      icon: Zap,
      features: [
        'توريد وتركيب المولدات',
        'صيانة وقطع غيار أصلية',
        'خدمة 24/7'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Enhanced Hero Section - preserving existing structure */}
      <section className="bg-primary text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/src/images/pattern.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <h1 className="text-4xl font-bold mb-4 animate-fade-in">خدماتنا</h1>
          <p className="text-xl text-blue-100 animate-fade-in-up">
            نقدم مجموعة متكاملة من الخدمات المتخصصة في مجال الطاقة
          </p>
        </div>
      </section>

      {/* Enhanced Services Grid - maintaining existing functionality */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                onClick={() => navigate(service.link)}
                className="group relative overflow-hidden rounded-xl cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Preserve existing card structure with enhancements */}
                <div className="aspect-[16/9] relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-90 transition-opacity duration-300" />
                  
                  <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                    <service.icon className="h-8 w-8 mb-4 text-primary-100" />
                    <h2 className="text-2xl font-bold mb-2">{service.title}</h2>
                    <p className="text-gray-200 mb-4">{service.description}</p>
                    
                    {/* Added features list */}
                    <ul className="space-y-2 mb-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-300">
                          <Shield className="h-4 w-4 ml-2 text-primary-100" />
                          {feature}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center text-primary-100 transform translate-x-4 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-white">المزيد</span>
                      <ArrowLeft className="h-5 w-5 mr-2" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Preserve existing General Services Information with subtle enhancements */}
          <div className="mt-16 bg-white rounded-xl p-8 shadow-sm">
            <div className="flex items-center mb-6">
              <Settings className="h-6 w-6 text-primary ml-2" />
              <h2 className="text-2xl font-bold text-gray-900">نبذة عن خدماتنا</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8 text-gray-600">
              <div>
                <p className="mb-4">
                  نحن في الثلاثية الحديثة للطاقة  نقدم خدمات متكاملة في مجال أنظمة الغاز المركزي والمولدات الكهربائية، مع التركيز على تقديم حلول مبتكرة وفعالة تلبي احتياجات عملائنا.
                </p>
                <p>
                  نمتلك فريقاً من المهندسين والفنيين المؤهلين لتقديم أفضل الخدمات وفقاً لأعلى معايير الجودة والسلامة العالمية.
                </p>
              </div>
              <div>
                <p className="mb-4">
                  نوفر خدمات التركيب والصيانة الدورية والطارئة، مع ضمان توفير قطع الغيار الأصلية وخدمات ما بعد البيع المتميزة.
                </p>
                <p>
                  نحرص على مواكبة أحدث التقنيات والتطورات في مجال الطاقة لضمان تقديم أفضل الحلول لعملائنا.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 