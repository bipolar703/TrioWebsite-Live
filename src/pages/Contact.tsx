import React, { useState, FormEvent } from 'react';
import { Phone, Mail, MapPin, Instagram, Download, Loader2 } from 'lucide-react';
import SectionTitle from '../components/ui/SectionTitle';
import { useLocation, useNavigate } from 'react-router-dom';
import XLogo from '../components/ui/XLogo';
import { toast } from 'sonner';
import GoogleMap from '../components/ui/GoogleMap';

export default function Contact() {
  const location = useLocation();
  const navigate = useNavigate();
  const { maintenanceType, message } = location.state || {};

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: message || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'الاسم مطلوب';
    }
    
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'رقم الجوال مطلوب';
    } else if (!/^\+?[0-9]{10,}$/.test(formData.mobile.trim())) {
      newErrors.mobile = 'رقم الجوال غير صحيح';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'البريد الإلكتروني مطلوب';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً');
      setFormData({ name: '', mobile: '', email: '', message: '' });
    } catch (error) {
      toast.error('حدث خطأ أثناء إرسال الرسالة. الرجاء المحاولة مرة أخرى');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">اتصل بنا</h1>
          <p className="text-xl text-blue-100">
            نحن هنا لمساعدتك والإجابة على جميع استفساراتك
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <SectionTitle 
                title="معلومات التواصل"
                centered={false}
              />
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-primary ml-4" />
                  <div>
                    <h3 className="font-semibold mb-1">الهاتف</h3>
                    <a href="tel:+966530009914" className="text-gray-600 ltr hover:text-primary transition-custom">+966 530009914</a>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-primary ml-4" />
                  <div>
                    <h3 className="font-semibold mb-1">البريد الإلكتروني</h3>
                    <a href="mailto:sales@triome.com.sa" className="text-gray-600 ltr hover:text-primary transition-custom">sales@triome.com.sa</a>
                  </div>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-primary ml-4" />
                  <div>
                    <h3 className="font-semibold mb-1">العنوان</h3>
                    <a 
                      href="https://maps.app.goo.gl/N41cWKNskZyoFSS79" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-primary transition-custom"
                    >
                      <div>المملكة العربية السعودية</div>
                      <div className="ltr">P.O Box: 23446 Jeddah 6632</div>
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4 space-x-reverse pt-4">
                  <a 
                    href="https://www.instagram.com/triomesa/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-custom"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a 
                    href="https://x.com/triomesa" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-primary transition-custom"
                  >
                    <XLogo />
                  </a>
                </div>
                {/* Company Profile Download */}
                <div className="mt-8">
                  <a 
                    href="/src/images/pdf/الثلاثية-الحديثة-للطاقة.pdf"
                    download="الثلاثية-الحديثة-للطاقة.pdf"
                    className="inline-flex items-center px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-custom group"
                    onClick={(e) => {
                      // Prevent default if file doesn't exist
                      if (!e.currentTarget.href.includes('.pdf')) {
                        e.preventDefault();
                        toast.error('عذراً، الملف غير متوفر حالياً');
                      }
                    }}
                  >
                    <Download className="h-5 w-5 ml-2 group-hover:animate-bounce" />
                    تنزيل الملف التعريفي للشركة
                  </a>
                </div>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-700 mb-2">
                    الاسم <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary/20 ${
                      errors.name ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="mobile" className="block text-gray-700 mb-2">
                    رقم الجوال <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="mobile"
                    dir="ltr"
                    value={formData.mobile}
                    onChange={(e) => setFormData(prev => ({ ...prev, mobile: e.target.value }))}
                    className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary/20 ${
                      errors.mobile ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                    }`}
                    placeholder="+966"
                    disabled={isSubmitting}
                  />
                  {errors.mobile && <p className="mt-1 text-sm text-red-500">{errors.mobile}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    البريد الإلكتروني <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className={`w-full px-4 py-2 border rounded-md focus:ring focus:ring-primary/20 ${
                      errors.email ? 'border-red-500' : 'border-gray-300 focus:border-primary'
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-700 mb-2">الرسالة</label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:border-primary focus:ring focus:ring-primary/20"
                    disabled={isSubmitting}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary/90 transition-custom disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      جاري الإرسال...
                    </>
                  ) : 'إرسال'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Map Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">موقعنا على الخريطة</h2>
            <p className="text-gray-600 mt-2">يمكنك زيارتنا في مقر الشركة</p>
          </div>
          <div className="aspect-[21/9] w-full">
            <GoogleMap />
          </div>
        </div>
      </section>
    </div>
  );
}