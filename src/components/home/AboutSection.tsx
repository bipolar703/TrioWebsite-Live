import { useInView } from 'react-intersection-observer';
import { Activity, Power, RefreshCw } from 'lucide-react';
import Card from '../ui/Card';

export default function AboutSection() {
  const { ref: contentRef, inView: contentIsVisible } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Content */}
        <div 
          ref={contentRef}
          className={`grid lg:grid-cols-2 gap-12 items-center transform transition-all duration-1000 ${
            contentIsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {/* Left Column - About Us */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-gray-900">من نحن</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                تعتبر الثلاثية الحديثة للطاقة  من الشركات الرائدة في العديد من مجالات الطاقة وحيث ان الطاقة من المجالات الهامة فقد دأبت الثلاثية الحديثة للطاقة  على تطوير أنظمة الطاقة المختلفة بما يتلائم مع المستهلك من خلال توفير احتياجاته في شتي مجالات الطاقة المختلفة
              </p>
            </div>
          </div>

          {/* Right Column - Our Activities */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-900">نشاطنا</h3>
            <div className="grid gap-6">
              <Card className="p-6 hover:border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <Power className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">محطات وشبكات الغاز</h4>
                    <p className="text-gray-600">
                      انشاء وصيانة وتشغيل محطات وشبكات غاز البترول المسال الصناعية والتجارية والمنزلية ووسائل السلامة التابعة لها
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/5 rounded-lg">
                    <Activity className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">مولدات وتوربينات</h4>
                    <p className="text-gray-600">
                      تصنيع وصيانة وتشغيل مولدات وتوربينات توليد الطاقة وتشمل خدماتنا تقديم حلول مبتكرة لمعالجة المياه الناتجة من أعمال توليد الطاقة
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Innovation Note */}
            <div className="bg-gradient-to-r from-primary/5 to-accent/5 p-6 rounded-xl border border-primary/10">
              <div className="flex items-center gap-4">
                <RefreshCw className="h-6 w-6 text-primary" />
                <p className="text-gray-700">
                  قسم تطوير المنتجات لدينا على تواصل دائم بالشركات العالمية لتحديث الأنظمة الحالية
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 