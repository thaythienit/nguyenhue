import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useArticles } from '../contexts/ArticleContext';
import { useCategories } from '../contexts/CategoryContext';
import { SearchIcon } from '../components/icons';
import NewsCard from '../components/NewsCard';
import SpotlightSlider from '../components/SpotlightSlider';
import Pagination from '../components/Pagination';

const ITEMS_PER_PAGE = 6;

const NewsPage: React.FC = () => {
  const { articles } = useArticles();
  const { categories } = useCategories();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredArticles = useMemo(() => {
    return articles
      .filter(article => 
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(article => 
        selectedCategory === 'all' || article.category === selectedCategory
      );
  }, [searchTerm, selectedCategory, articles]);
  
  // Reset to first page whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory]);
  
  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredArticles.slice(startIndex, endIndex);
  }, [currentPage, filteredArticles]);


  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-8">
          {/* Spotlight Slider Section */}
          <div className="mb-12">
            <SpotlightSlider />
          </div>

          {/* Articles List */}
          <h2 className="text-3xl font-bold mb-6 text-slate-800">Tin tức mới nhất</h2>
          {paginatedArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {paginatedArticles.map(article => (
                  <NewsCard key={article.id} article={article} />
                ))}
              </div>
              <div className="mt-12">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </>
          ) : (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-slate-200">
              <h3 className="text-xl font-semibold text-slate-600">Không tìm thấy bài viết</h3>
              <p className="text-slate-500 mt-2">Vui lòng thử lại với từ khóa hoặc chuyên mục khác.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <aside className="lg:col-span-4">
          <div className="sticky top-24 space-y-8">
            
            {/* Search */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Tìm kiếm tin tức</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Nhập từ khóa..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500"
                />
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Chuyên mục</h3>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => setSelectedCategory('all')} className={`w-full text-left px-2 py-1 rounded ${selectedCategory === 'all' ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-slate-100'}`}>
                    Tất cả chuyên mục
                  </button>
                </li>
                {categories.map(category => (
                  <li key={category.id}>
                    <button onClick={() => setSelectedCategory(category.name)} className={`w-full text-left px-2 py-1 rounded ${selectedCategory === category.name ? 'bg-indigo-100 text-indigo-700 font-semibold' : 'hover:bg-slate-100'}`}>
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Archive */}
             <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Lưu trữ</h3>
              <div className="relative">
                <select className="w-full appearance-none bg-white border border-slate-300 rounded-md py-2 px-4 pr-8 focus:ring-2 focus:ring-indigo-300 focus:border-indigo-500">
                  <option>Tháng 9, 2024</option>
                  <option>Tháng 8, 2024</option>
                  <option>Tháng 7, 2024</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                   <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>

          </div>
        </aside>

      </div>
    </div>
  );
};

export default NewsPage;