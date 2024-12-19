import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Tab } from '@headlessui/react';
import { Monitor, Smartphone } from 'lucide-react';
import PreviewModal from '../../components/PreviewModal';
import HeroSlidesTab from './HeroSlidesTab';
import AchievementsTab from './AchievementsTab';
import ClientLogosTab from './ClientLogosTab';
import ProductsTab from './ProductsTab';

interface PreviewData {
  type: 'achievement' | 'hero-slide' | 'client-logo' | 'product';
  data: any;
}

export default function Enjaz() {
  const { logout } = useAuth();
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Preview handlers
  const handlePreview = (type: PreviewData['type'], data: any) => {
    setPreviewData({ type, data });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">لوحة التحكم</h1>
          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tab.Group>
          <Tab.List className="flex flex-wrap gap-2 bg-white p-2 rounded-xl shadow-sm mb-8">
            <Tab className={({ selected }) =>
              `flex-1 min-w-[150px] py-3 px-4 rounded-lg font-medium focus:outline-none transition-colors
              ${selected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
            }>
              الإنجازات
            </Tab>
            <Tab className={({ selected }) =>
              `flex-1 min-w-[150px] py-3 px-4 rounded-lg font-medium focus:outline-none transition-colors
              ${selected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
            }>
              الشرائح الرئيسية
            </Tab>
            <Tab className={({ selected }) =>
              `flex-1 min-w-[150px] py-3 px-4 rounded-lg font-medium focus:outline-none transition-colors
              ${selected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
            }>
              شعارات العملاء
            </Tab>
            <Tab className={({ selected }) =>
              `flex-1 min-w-[150px] py-3 px-4 rounded-lg font-medium focus:outline-none transition-colors
              ${selected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
            }>
              المنتجات والأقسام
            </Tab>
            <Tab className={({ selected }) =>
              `flex-1 min-w-[150px] py-3 px-4 rounded-lg font-medium focus:outline-none transition-colors
              ${selected ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`
            }>
              إعدادات الموقع
            </Tab>
          </Tab.List>

          <Tab.Panels>
            <Tab.Panel>
              {/* Achievements Tab */}
              <AchievementsTab handlePreview={handlePreview} />
            </Tab.Panel>
            <Tab.Panel>
              {/* Hero Slides Tab */}
              <HeroSlidesTab handlePreview={handlePreview} />
            </Tab.Panel>
            <Tab.Panel>
              {/* Client Logos Tab */}
              <ClientLogosTab handlePreview={handlePreview} />
            </Tab.Panel>
            <Tab.Panel>
              {/* Products Tab */}
              <ProductsTab handlePreview={handlePreview} />
            </Tab.Panel>
            <Tab.Panel>
              {/* Site Settings Tab */}
              <div>Coming soon...</div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </main>

      {/* Preview Modal */}
      {previewData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">معاينة المحتوى</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setPreviewDevice('desktop')}
                  className={`p-2 rounded-lg ${
                    previewDevice === 'desktop' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'
                  }`}
                >
                  <Monitor size={20} />
                </button>
                <button
                  onClick={() => setPreviewDevice('mobile')}
                  className={`p-2 rounded-lg ${
                    previewDevice === 'mobile' ? 'bg-purple-100 text-purple-600' : 'text-gray-600'
                  }`}
                >
                  <Smartphone size={20} />
                </button>
                <button
                  onClick={() => setPreviewData(null)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-600 p-2 rounded-lg transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className={`${previewDevice === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'}`}>
              <PreviewModal data={previewData} device={previewDevice} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 