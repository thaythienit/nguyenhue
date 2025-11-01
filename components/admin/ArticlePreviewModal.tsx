import React from 'react';
import { Article } from '../../types';
import { CalendarIcon, XIcon, UserCircleIcon } from '../icons';

// Re-using the color logic from the public-facing pages for consistency
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Thông báo chung': return 'bg-sky-100 text-sky-800 border-sky-300';
    case 'Hoạt động nhà trường': return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'Thành tích nổi bật': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'Tin tức Giáo dục': return 'bg-rose-100 text-rose-800 border-rose-300';
    default: return 'bg-slate-100 text-slate-800 border-slate-300';
  }
};

interface ArticlePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Article | null;
}

const ArticlePreviewModal: React.FC<ArticlePreviewModalProps> = ({ isOpen, onClose, article }) => {
  if (!isOpen || !article) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex justify-center items-center p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[90vh] flex flex-col">
        <div className="p-4 border-b flex justify-between items-center flex-shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Xem trước bài viết</h2>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-100"><XIcon className="h-6 w-6 text-slate-600"/></button>
        </div>
        <div className="overflow-y-auto">
            {/* This content is styled to look like the final ArticleDetailPage */}
            <div className="p-4 sm:p-6 lg:p-8">
                 <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full border ${getCategoryColor(article.category)}`}>
                    {article.category}
                </span>

                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 my-4 leading-tight">
                    {article.title || "[Chưa có tiêu đề]"}
                </h1>

                <div className="flex items-center text-slate-500 mb-8 flex-wrap">
                    <div className="flex items-center mr-6 mb-2 md:mb-0">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        <span>Đăng ngày: {article.date}</span>
                    </div>
                    <div className="flex items-center">
                        <UserCircleIcon className="h-5 w-5 mr-2" />
                        <span>Tác giả: {article.author}</span>
                    </div>
                </div>

                {article.imageUrl ? (
                    <img src={article.imageUrl} alt={article.title} className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-lg mb-8" />
                ) : (
                    <div className="w-full h-64 bg-slate-200 flex items-center justify-center rounded-xl mb-8">
                        <span className="text-slate-500">Chưa có ảnh đại diện</span>
                    </div>
                )}
                
                <div 
                    className="prose prose-lg max-w-none text-slate-700 prose-headings:text-slate-800 prose-a:text-indigo-600 prose-img:rounded-lg"
                    dangerouslySetInnerHTML={{ __html: article.content || "<p><em>[Chưa có nội dung]</em></p>" }} 
                />
            </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
            animation: fade-in 0.2s ease-out forwards;
        }
    `}</style>
    </div>
  );
};

export default ArticlePreviewModal;