import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import WhatsAppIcon from '../../images/WhatsApp.svg';

export default function WhatsAppButton() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [bottomOffset, setBottomOffset] = useState('4');
  const [isVisible, setIsVisible] = useState(true);

  const handleStartChat = () => {
    window.open('https://wa.me/966530009914', '_blank', 'noopener,noreferrer');
  };

  const updateBottomOffset = () => {
    const scrollToTopButton = document.querySelector('.scroll-to-top-button');
    if (scrollToTopButton) {
      setBottomOffset('16');
    } else {
      setBottomOffset('4');
    }
  };

  const handleHide = () => {
    setIsVisible(false);
    setShowOverlay(false);
    sessionStorage.setItem('whatsappHidden', 'true');
  };

  useEffect(() => {
    updateBottomOffset();

    window.addEventListener('scroll', updateBottomOffset);

    const isHidden = sessionStorage.getItem('whatsappHidden') === 'true';
    setIsVisible(!isHidden);

    return () => {
      window.removeEventListener('scroll', updateBottomOffset);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-${bottomOffset} left-4 z-50 transition-all duration-300`}>
      {showOverlay && (
        <div className="absolute bottom-16 left-0 mb-2 bg-white rounded-lg shadow-lg p-4 w-72 animate-fadeIn">
          <button
            onClick={() => setShowOverlay(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            aria-label="إغلاق"
          >
            <X className="h-4 w-4" />
          </button>
          <h3 className="text-lg font-semibold mb-2">تواصل معنا</h3>
          <p className="text-gray-600 text-sm mb-4">كيف يمكننا مساعدتك؟</p>
          <button
            onClick={handleStartChat}
            className="w-full bg-[#25D366] text-white py-2 px-4 rounded-lg hover:bg-[#1ea856] transition-colors"
          >
            بدء المحادثة
          </button>
          <button
            onClick={handleHide}
            className="w-full mt-2 text-gray-600 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors text-sm"
          >
            إخفاء الزر
          </button>
        </div>
      )}
      <button
        onClick={() => setShowOverlay(!showOverlay)}
        className="transition-all duration-300"
        aria-label="واتساب"
      >
        <img src={WhatsAppIcon} alt="WhatsApp" className="h-10 w-10" />
      </button>
    </div>
  );
} 