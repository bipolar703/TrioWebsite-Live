import { Shield, Settings, Zap } from 'lucide-react';

export default function Features() {
  return (
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
  );
} 