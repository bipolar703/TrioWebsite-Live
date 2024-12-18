import { Phone, Mail, MapPin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import EnergyBackground from './EnergyBackground';

// Add new X logo component
const XLogo = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="h-6 w-6"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default function Footer() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <footer 
      ref={ref}
      className={`relative bg-gray-900 text-white overflow-hidden transition-all duration-1000 ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <EnergyBackground />
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold mb-4">الثلاثية الحديثة للطاقة </h3>
              <p className="text-gray-300 mb-6">
                شركة رائدة في مجال حلول الطاقة المتكاملة، نقدم خدمات عالية الجودة في مجال أنظمة الغاز المركزي والمولدات والتوربينات.
              </p>
              <div className="flex space-x-4 space-x-reverse">
                <a href="https://www.instagram.com/triomesa/" className="text-white hover:text-accent transition-custom">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://x.com/triomesa" className="text-white hover:text-accent transition-custom">
                  <XLogo />
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 ml-2 flex-shrink-0" />
                  <a href="tel:+966530009914" className="ltr hover:text-accent transition-custom">+966 530009914</a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 ml-2 flex-shrink-0" />
                  <a href="mailto:sales@triome.com.sa" className="ltr hover:text-accent transition-custom">sales@triome.com.sa</a>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 ml-2 flex-shrink-0" />
                  <div>
                    <a href="https://maps.app.goo.gl/N41cWKNskZyoFSS79" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-custom">
                      <div>المملكة العربية السعودية</div>
                      <div className="ltr">P.O Box: 23446</div>
                      <div className="ltr">Jeddah 6632</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="hover:text-accent transition-custom block">الرئيسية</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:text-accent transition-custom block">من نحن</Link>
                </li>
                <li>
                  <Link to="/gas-accessories" className="hover:text-accent transition-custom block">اكسسوارات وقطع الغاز</Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-accent transition-custom block">اتصل بنا</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-700">
            <div className="flex justify-center items-center">
              <p className="text-gray-300 text-center">
                © {new Date().getFullYear()} تطوير وتنفيذ{' '}
                <a 
                  href="https://cactusmedia.online" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-accent transition-custom"
                >
                  شركة الصبّار للدعاية والإعلان
                </a>
                {' '}، جميع الحقوق محفوظة الشركة الثلاثية الحديثة للطاقة 
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}