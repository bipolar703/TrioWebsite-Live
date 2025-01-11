import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useSiteSettings } from '../../hooks/useSiteSettings';

export default function Footer() {
  const { siteSettings } = useSiteSettings();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">الثلاثية الحديثة للطاقة</h3>
            <p className="text-gray-400">
              شركة رائدة في مجال تصميم وتنفيذ وصيانة أنظمة الغاز المركزي والصناعي
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-accent transition-custom">
                  الرئيسية
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-accent transition-custom">
                  من نحن
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-gray-400 hover:text-accent transition-custom">
                  خدماتنا
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 hover:text-accent transition-custom">
                  منتجاتنا
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-accent transition-custom">
                  اتصل بنا
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">تواصل معنا</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <Phone className="h-5 w-5 ml-2 flex-shrink-0" />
                <a 
                  href={`tel:${siteSettings?.phone_number}`} 
                  className="ltr hover:text-accent transition-custom"
                >
                  {siteSettings?.phone_number || 'جاري التحميل...'}
                </a>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 ml-2 flex-shrink-0" />
                <a 
                  href="mailto:sales@triome.com.sa" 
                  className="ltr hover:text-accent transition-custom"
                >
                  sales@triome.com.sa
                </a>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 ml-2 flex-shrink-0" />
                <div>
                  <a 
                    href="https://maps.app.goo.gl/N41cWKNskZyoFSS79" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-accent transition-custom"
                  >
                    <div>المملكة العربية السعودية</div>
                    <div className="ltr">P.O Box: 23446</div>
                    <div className="ltr">Jeddah 6632</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© {new Date().getFullYear()} الثلاثية الحديثة للطاقة. جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
}