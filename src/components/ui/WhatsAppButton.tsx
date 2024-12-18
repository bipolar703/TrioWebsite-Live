import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export default function WhatsAppButton() {
  const [showOverlay, setShowOverlay] = useState(false);

  const handleStartChat = () => {
    window.open('https://wa.me/966530009914', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
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
        </div>
      )}
      <button
        onClick={() => setShowOverlay(!showOverlay)}
        className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#1ea856] transition-all duration-300"
        aria-label="واتساب"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
} 