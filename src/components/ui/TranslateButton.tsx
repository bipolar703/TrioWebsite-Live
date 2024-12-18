import { useEffect, useState } from 'react';
import { Languages, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function TranslateButton() {
  const [isVisible, setIsVisible] = useState(() => 
    sessionStorage.getItem('translatorHidden') !== 'true'
  );
  const [isTranslated, setIsTranslated] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const location = useLocation();

  // Reset visibility on page navigation
  useEffect(() => {
    setIsVisible(true);
    sessionStorage.removeItem('translatorHidden');
  }, [location.pathname]);

  const translatePage = async () => {
    if (isTranslating) return;
    
    try {
      setIsTranslating(true);
      
      // Get all text nodes in the current page
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            const parent = node.parentElement;
            if (!parent) return NodeFilter.FILTER_REJECT;
            
            if (
              parent.hasAttribute('data-translated') ||
              parent.tagName === 'SCRIPT' ||
              parent.tagName === 'STYLE' ||
              parent.tagName === 'META' ||
              parent.tagName === 'LINK' ||
              !node.textContent?.trim()
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            
            return NodeFilter.FILTER_ACCEPT;
          }
        }
      );

      const textNodes = [];
      let node;
      while ((node = walker.nextNode())) {
        if (node.parentElement) {
          textNodes.push(node);
        }
      }

      // Batch translate all text nodes
      const texts = textNodes.map(node => node.textContent?.trim()).filter(Boolean);
      
      if (texts.length > 0) {
        const response = await fetch('http://localhost:3001/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ texts, from: 'ar', to: 'en' })
        });

        if (!response.ok) throw new Error(`Translation failed: ${response.statusText}`);

        const data = await response.json();
        
        if (data.translations) {
          data.translations.forEach((translatedText: string, index: number) => {
            const node = textNodes[index] as Text;
            if (node && node.parentElement && translatedText) {
              node.parentElement.setAttribute('data-original-text', node.textContent || '');
              node.parentElement.setAttribute('data-translated', 'true');
              node.textContent = translatedText;
            }
          });
        }
      }

      setIsTranslated(true);
      localStorage.setItem('isTranslated', 'true');
      
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setIsTranslating(false);
    }
  };

  const revertTranslation = () => {
    const translatedElements = document.querySelectorAll('[data-translated="true"]');
    translatedElements.forEach(element => {
      const originalText = element.getAttribute('data-original-text');
      if (originalText) {
        element.textContent = originalText;
        element.removeAttribute('data-translated');
        element.removeAttribute('data-original-text');
      }
    });
    setIsTranslated(false);
    localStorage.removeItem('isTranslated');
  };

  const handleTranslateClick = () => {
    if (isTranslated) {
      revertTranslation();
    } else {
      translatePage();
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem('translatorHidden', 'true');
    // Revert translation when hiding the button
    if (isTranslated) {
      revertTranslation();
    }
  };

  if (!isVisible) return null;

  return (
    <div className="relative group">
      <button
        onClick={handleTranslateClick}
        disabled={isTranslating}
        className={`bg-white rounded-full shadow-lg transition-all duration-300
          p-2 sm:p-2.5
          ${isTranslated ? 'text-primary' : 'text-gray-600'}
          ${isTranslating ? 'opacity-50 cursor-not-allowed' : ''}
          hover:bg-gray-50 active:scale-95
          sm:hover:shadow-xl`}
        aria-label={isTranslating ? 'Translating...' : isTranslated ? 'Translated' : 'Translate'}
      >
        <Languages className={`h-4 w-4 sm:h-5 sm:w-5 ${isTranslating ? 'animate-spin' : ''}`} />
      </button>
      
      {/* Always visible close button on mobile, hover on desktop */}
      <button
        onClick={handleClose}
        className={`absolute -top-1 -right-1 bg-white/90 hover:bg-white rounded-full shadow-sm 
          p-0.5 transition-all duration-300
          hover:scale-110 active:scale-95
          sm:opacity-0 sm:group-hover:opacity-100
          ${isTranslated ? 'bg-primary/10' : ''}`}
        aria-label="Hide translator"
      >
        <X className="h-2.5 w-2.5 text-gray-500" />
      </button>
    </div>
  );
} 