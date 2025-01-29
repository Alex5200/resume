import React from 'react';
interface SitePreviewCardProps {
  title: string;
  description: string;
  siteUrl: string;
  tags: Object;
}

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

const SitePreviewCard: React.FC<SitePreviewCardProps> = ({ title, description, siteUrl, tags }) => {
  // Проверяем валидность URL
  if (!isValidUrl(siteUrl)) {
    console.error(`Invalid URL provided: ${siteUrl}`);
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white text-red-500 p-4">
        Invalid URL provided: {siteUrl}
      </div>
    );
  }

  // Создаем безопасный URL для iframe
  const safeSiteUrl = new URL(siteUrl).href;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="w-full h-64">
        <iframe
          src={safeSiteUrl}
          className="w-full h-full"
          title={`Preview of ${title}`}
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base mb-4">
          {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
          {Object.keys(tags).map((key) => (
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{tags[key]}</span>
          ))}
      </div>
    </div>
  );
};

export default SitePreviewCard;
