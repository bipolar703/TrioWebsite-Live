import React from 'react';

interface PreviewData {
  type: 'achievement' | 'hero-slide' | 'client-logo' | 'product';
  data: {
    title?: string;
    description?: string;
    image?: string;
    date?: string;
    button_title?: string;
    button_link?: string;
    name?: string;
    category_id?: string;
  };
}

interface PreviewModalProps {
  data: PreviewData;
  device: 'desktop' | 'mobile';
}

const PreviewModal: React.FC<PreviewModalProps> = ({ data, device }) => {
  const renderAchievement = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      {data.data.image && (
        <img
          src={data.data.image}
          alt={data.data.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{data.data.title}</h3>
        <p className="text-gray-600 mb-2">{data.data.description}</p>
        <p className="text-gray-500 text-sm">{data.data.date}</p>
      </div>
    </div>
  );

  const renderHeroSlide = () => (
    <div className="relative bg-gray-900 rounded-lg overflow-hidden">
      {data.data.image && (
        <img
          src={data.data.image}
          alt={data.data.title}
          className="w-full h-[400px] object-cover opacity-75"
        />
      )}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 text-center">
        <h2 className="text-3xl font-bold mb-4">{data.data.title}</h2>
        <p className="text-lg mb-6">{data.data.description}</p>
        {data.data.button_title && (
          <a
            href={data.data.button_link}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            {data.data.button_title}
          </a>
        )}
      </div>
    </div>
  );

  const renderClientLogo = () => (
    <div className="bg-white rounded-lg p-4 shadow-lg">
      {data.data.image && (
        <img
          src={data.data.image}
          alt="Client Logo"
          className="w-full h-32 object-contain"
        />
      )}
    </div>
  );

  const renderProduct = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      {data.data.image && (
        <img
          src={data.data.image}
          alt={data.data.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{data.data.name}</h3>
        <p className="text-gray-600">{data.data.description}</p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (data.type) {
      case 'achievement':
        return renderAchievement();
      case 'hero-slide':
        return renderHeroSlide();
      case 'client-logo':
        return renderClientLogo();
      case 'product':
        return renderProduct();
      default:
        return null;
    }
  };

  return (
    <div className={`${device === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'}`}>
      {renderContent()}
    </div>
  );
};

export default PreviewModal; 