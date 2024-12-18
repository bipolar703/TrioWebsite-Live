import { useState, useEffect } from 'react';
import { ChevronUp } from 'lucide-react';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled to bottom
  const toggleVisibility = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrolledToBottom = Math.ceil(scrollTop + windowHeight) >= documentHeight - 100; // 100px threshold

    setIsVisible(scrolledToBottom);
  };

  // Set the scroll event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top handler
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed left-4 bottom-4 sm:left-6 sm:bottom-6 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-all duration-300 z-50"
          aria-label="العودة إلى الأعلى"
        >
          <ChevronUp className="h-6 w-6" />
        </button>
      )}
    </>
  );
} 