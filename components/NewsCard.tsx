import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../types';
import { CalendarIcon, FacebookIcon, TwitterIcon, ArrowRightIcon } from './icons';

interface NewsCardProps {
  article: Article;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Thông báo chung': return 'bg-sky-100 text-sky-800';
    case 'Hoạt động nhà trường': return 'bg-amber-100 text-amber-800';
    case 'Thành tích nổi bật': return 'bg-emerald-100 text-emerald-800';
    case 'Tin tức Giáo dục': return 'bg-rose-100 text-rose-800';
    default: return 'bg-slate-100 text-slate-800';
  }
};

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
  const articleUrl = `${window.location.origin}${window.location.pathname}#/news/${article.id}`;
  const encodedUrl = encodeURIComponent(articleUrl);
  const encodedTitle = encodeURIComponent(article.title);

  const handleShare = (e: React.MouseEvent, url: string) => {
    e.preventDefault(); // Prevent link navigation when clicking a share button
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer,width=600,height=400');
  };

  return (
    <Link to={`/news/${article.id}`} className="bg-white rounded-lg shadow-md overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <div className="overflow-hidden">
        <img src={article.imageUrl} alt={article.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getCategoryColor(article.category)}`}>
            {article.category}
          </span>
          <div className="flex items-center text-xs text-slate-500">
            <CalendarIcon className="h-4 w-4 mr-1.5" />
            <span>{article.date}</span>
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-indigo-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {article.excerpt}
        </p>

        <div className="mt-4">
            <span className="inline-flex items-center text-sm font-semibold text-indigo-600 group-hover:text-indigo-800 transition-colors">
                Đọc thêm
                <ArrowRightIcon className="h-4 w-4 ml-1.5 transition-transform group-hover:translate-x-1" />
            </span>
        </div>

        <div className="flex-grow" />

        <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Chia sẻ:</span>
            <div className="flex items-center space-x-2">
                <button 
                    onClick={(e) => handleShare(e, `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`)}
                    aria-label="Share on Facebook"
                    className="text-slate-400 hover:text-blue-600 transition-colors z-10 relative"
                >
                    <FacebookIcon className="h-5 w-5" />
                </button>
                <button 
                    onClick={(e) => handleShare(e, `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`)}
                    aria-label="Share on Twitter"
                    className="text-slate-400 hover:text-sky-500 transition-colors z-10 relative"
                >
                    <TwitterIcon className="h-5 w-5" />
                </button>
            </div>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;