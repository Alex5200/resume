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
// Создаем безопасный URL для iframe

  function validUrlsSite(){
    if(!isValidUrl(siteUrl)){
      return <img className='w-full h-full' src='https://cdn4.iconfinder.com/data/icons/seo-marketing-53/64/seo_404_error_page_web_missing_ufo-1024.png'></img>
    }else{
        return <iframe
          src={siteUrl}
          className="w-full h-full"
          title={`Preview of ${title}`}
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
    }
  }

  
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <div className="w-full h-64">
        {validUrlsSite()}
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
