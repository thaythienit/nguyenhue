import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useArticles } from '../contexts/ArticleContext';
import { CalendarIcon, ChevronLeftIcon, UserCircleIcon } from '../components/icons';

const getCategoryColor = (category: string) => {
  switch (category) {
    case 'Thông báo chung': return 'bg-sky-100 text-sky-800 border-sky-300';
    case 'Hoạt động nhà trường': return 'bg-amber-100 text-amber-800 border-amber-300';
    case 'Thành tích nổi bật': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    case 'Tin tức Giáo dục': return 'bg-rose-100 text-rose-800 border-rose-300';
    default: return 'bg-slate-100 text-slate-800 border-slate-300';
  }
};


const ArticleDetailPage: React.FC = () => {
  const { articleId } = useParams<{ articleId: string }>();
  const { articles } = useArticles();
  const article = articles.find(a => a.id === Number(articleId));

  if (!article) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <h1 className="text-4xl font-bold text-slate-700">404</h1>
        <p className="text-slate-500 mt-2">Không tìm thấy bài viết.</p>
        <Link to="/" className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          Về trang chủ
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mb-6">
                <Link to="/" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 group">
                    <ChevronLeftIcon className="h-5 w-5 mr-1 transition-transform group-hover:-translate-x-1"/>
                    <span>Quay lại trang tin tức</span>
                </Link>
                <span className={`inline-block text-sm font-semibold px-3 py-1 rounded-full border ${getCategoryColor(article.category)}`}>
                  {article.category}
                </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 my-4 leading-tight">
                {article.title}
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

            <img src={article.imageUrl} alt={article.title} className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-lg mb-8" />
            
            <div 
                className="prose prose-lg max-w-none text-slate-700 prose-headings:text-slate-800 prose-a:text-indigo-600 prose-img:rounded-lg"
                dangerouslySetInnerHTML={{ __html: article.content }} 
            />
        </div>
      </div>
    </div>
  );
};

export default ArticleDetailPage;