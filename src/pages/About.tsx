import { Shield, Target, Zap } from "lucide-react";
import SectionTitle from "../components/ui/SectionTitle";

export default function About() {
  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-primary/95 to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">من نحن</h1>
          <p className="text-xl text-blue-100">
            تعتبر الثلاثيةالحديثة للطاقة من الشركات الرائدة في العديد من مجالات
            الطاقة
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">نبذة عن الشركة</h2>
              <p className="text-gray-600 mb-4">
                تعتبر الثلاثية الحديثة للطاقة  من الشركات الرائدة في العديد من
                مجالات الطاقة وحيث ان الطاقة من المجالات الهامة فقد دأبت
                الثلاثية الحديثة للطاقة  على تطوير أنظمة الطاقة المختلفة بما
                يتلائم مع المستهلك من خلال توفير احتياجاته في شتي مجالات الطاقة
                المختلفة
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">رؤيتنا</h3>
                <p className="text-gray-600">
                  أن نكون الشركة الرائدة على مستوى العالم في مجال تقديم خدمات
                  التشغيل والصيانة والتصنيع
                </p>
              </div>
              <div className="bg-accent/5 p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-2">رسالتنا</h3>
                <p className="text-gray-600">
                  نقدم حلول التشغيل والصيانة والتصنيع الأكثر اقناعا من حيث
                  السلامة والتكلفة ومستوى الأداء
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionTitle
            title="قيمنا"
            subtitle="نلتزم بأعلى معايير الجودة والأداء في جميع خدماتنا"
          />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">الجودة</h3>
              <p className="text-gray-600">
                نلتزم بأعلى معايير الجودة في جميع خدماتنا
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Target className="h-12 w-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">الاحترافية</h3>
              <p className="text-gray-600">
                نعمل باحترافية عالية لتحقيق رضا عملائنا
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <Zap className="h-12 w-12 text-secondary mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">الابتكار</h3>
              <p className="text-gray-600">نسعى دائماً لتطوير حلول مبتكرة</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
