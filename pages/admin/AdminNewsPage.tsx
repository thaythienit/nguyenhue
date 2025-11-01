
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useArticles } from '../../contexts/ArticleContext';
import { useCategories } from '../../contexts/CategoryContext';
import { useAuth } from '../../contexts/AuthContext';
import { Article } from '../../types';
import { PlusIcon, PencilIcon, TrashIcon, StarIcon, EyeIcon } from '../../components/icons';
import FileLibraryModal from '../../components/admin/FileLibraryModal';
import ArticlePreviewModal from '../../components/admin/ArticlePreviewModal';

const AdminNewsPage: React.FC = () => {
  const { articles, addArticle, updateArticle, deleteArticle } = useArticles();
  const { categories } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | Omit<Article, 'id'> | null>(null);
  const [isFileLibraryOpen, setIsFileLibraryOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [articleToPreview, setArticleToPreview] = useState<Article | null>(null);
  const location = useLocation();
  const { user } = useAuth();

  useEffect(() => {
    if (location.state?.openModal) {
      openModal();
    }
  }, [location.state]);

  const formatDateForInput = (dateString: string): string => {
    // Handles DD/MM/YYYY from existing articles and YYYY-MM-DD from form state
    if (!dateString) return new Date().toISOString().split('T')[0];
    if (dateString.includes('/')) {
        const [day, month, year] = dateString.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    return dateString;
  };

  const openModal = (article?: Article) => {
    if (article) {
      setCurrentArticle({
        ...article,
        date: formatDateForInput(article.date) // Ensure date is YYYY-MM-DD for the form
      });
    } else {
      setCurrentArticle({
        title: '',
        excerpt: '',
        content: '',
        imageUrl: '',
        category: categories.length > 0 ? categories[0].name : '',
        date: new Date().toISOString().split('T')[0], // YYYY-MM-DD format for input
        featured: false,
        spotlight: false,
        author: user?.displayName || 'Admin',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentArticle(null);
    if (location.state?.openModal) {
        window.history.replaceState({}, document.title)
    }
  };

  const openPreview = (articleData: Article | Omit<Article, 'id'> | null) => {
    if (!articleData) return;
    
    const displayDate = new Date(articleData.date).toLocaleDateString('vi-VN');

    const formattedArticle: Article = {
        id: 'id' in articleData ? articleData.id : 0,
        ...articleData,
        date: displayDate,
        featured: articleData.featured ?? false,
        spotlight: articleData.spotlight ?? false,
    };
    
    setArticleToPreview(formattedArticle);
    setIsPreviewOpen(true);
  };


  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
      deleteArticle(id);
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!currentArticle) return;
    
    // The date from the form is already in YYYY-MM-DD format.
    // The backend expects this format to create a new Date object.
    const articleToSave = { ...currentArticle };

    if ('id' in articleToSave && articleToSave.id) {
      updateArticle(articleToSave as Article);
    } else {
      addArticle(articleToSave as Omit<Article, 'id'>);
    }
    closeModal();
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      
      let finalValue: string | boolean = value;

      if(type === 'checkbox' && e.target instanceof HTMLInputElement) {
        finalValue = e.target.checked;
      }
      
      setCurrentArticle(prev => prev ? { ...prev, [name]: finalValue } : null);
  };
  
  const handleImageSelect = (url: string) => {
    setCurrentArticle(prev => prev ? { ...prev, imageUrl: url } : null);
    setIsFileLibraryOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Quản lý Tin tức</h1>
        <button onClick={() => openModal()} className="flex items-center bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
          <PlusIcon className="h-5 w-5 mr-2" />
          Thêm bài viết mới
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3 w-2/5">Tiêu đề</th>
              <th scope="col" className="px-6 py-3">Chuyên mục</th>
              <th scope="col" className="px-6 py-3">Ngày đăng</th>
              <th scope="col" className="px-6 py-3">Tâm điểm</th>
              <th scope="col" className="px-6 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {articles.map(article => (
              <tr key={article.id} className="bg-white border-b hover:bg-slate-50">
                <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap max-w-xs truncate">
                  {article.title}
                </th>
                <td className="px-6 py-4">{article.category}</td>
                <td className="px-6 py-4">{article.date}</td>
                <td className="px-6 py-4">
                  {article.spotlight && <StarIcon className="h-5 w-5 text-amber-400" />}
                </td>
                <td className="px-6 py-4 flex items-center space-x-3">
                  <button onClick={() => openPreview(article)} className="font-medium text-sky-600 hover:underline" title="Xem trước"><EyeIcon className="h-5 w-5"/></button>
                  <button onClick={() => openModal(article)} className="font-medium text-indigo-600 hover:underline" title="Sửa"><PencilIcon className="h-5 w-5"/></button>
                  <button onClick={() => handleDelete(article.id)} className="font-medium text-rose-600 hover:underline" title="Xóa"><TrashIcon className="h-5 w-5"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] ">
             <form onSubmit={handleFormSubmit} className="flex flex-col h-full">
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold text-slate-800">{'id' in currentArticle ? 'Sửa bài viết' : 'Thêm bài viết mới'}</h2>
                </div>
                <div className="p-6 space-y-4 overflow-y-auto">
                    <div>
                      <label htmlFor="title" className="block text-sm font-medium text-slate-700">Tiêu đề</label>
                      <input type="text" name="title" id="title" value={currentArticle.title} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
                    </div>
                    
                    <div>
                      <label htmlFor="excerpt" className="block text-sm font-medium text-slate-700">Đoạn trích</label>
                      <textarea name="excerpt" id="excerpt" value={currentArticle.excerpt} onChange={handleFormChange} rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="content" className="block text-sm font-medium text-slate-700">Nội dung (HTML)</label>
                      <textarea name="content" id="content" value={currentArticle.content} onChange={handleFormChange} rows={10} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required></textarea>
                    </div>

                    <div>
                      <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-700">URL hình ảnh</label>
                       <div className="mt-1 flex rounded-md shadow-sm">
                        <input type="text" name="imageUrl" id="imageUrl" value={currentArticle.imageUrl} onChange={handleFormChange} className="block w-full rounded-none rounded-l-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500" required />
                        <button type="button" onClick={() => setIsFileLibraryOpen(true)} className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100">
                            Chọn ảnh
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="category" className="block text-sm font-medium text-slate-700">Chuyên mục</label>
                          <select name="category" id="category" value={currentArticle.category} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required>
                            {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                          </select>
                        </div>
                         <div>
                          <label htmlFor="date" className="block text-sm font-medium text-slate-700">Ngày đăng</label>
                           <input type="date" name="date" id="date" value={currentArticle.date} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
                        </div>
                        <div>
                          <label htmlFor="author" className="block text-sm font-medium text-slate-700">Tác giả</label>
                          <input type="text" name="author" id="author" value={('author' in currentArticle && currentArticle.author) || ''} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required readOnly disabled />
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="flex items-center">
                            <input type="checkbox" name="featured" id="featured" checked={currentArticle.featured} onChange={handleFormChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="featured" className="ml-2 block text-sm text-slate-900">Bài viết nổi bật (cũ)</label>
                        </div>
                         <div className="flex items-center">
                            <input type="checkbox" name="spotlight" id="spotlight" checked={'spotlight' in currentArticle ? currentArticle.spotlight : false} onChange={handleFormChange} className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                            <label htmlFor="spotlight" className="ml-2 block text-sm text-slate-900">Đưa vào tâm điểm (Slide)</label>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center p-6 border-t bg-slate-50 rounded-b-lg">
                  <button type="button" onClick={() => openPreview(currentArticle)} className="flex items-center px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50">
                      <EyeIcon className="h-5 w-5 mr-2"/>
                      Xem trước
                  </button>
                  <div className="space-x-3">
                    <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-200 rounded-md hover:bg-slate-300">Hủy</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Lưu</button>
                  </div>
                </div>
            </form>
          </div>
        </div>
      )}

      <FileLibraryModal 
        isOpen={isFileLibraryOpen} 
        onClose={() => setIsFileLibraryOpen(false)} 
        onSelect={handleImageSelect}
        filter="image"
      />

      <ArticlePreviewModal 
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        article={articleToPreview}
      />
    </div>
  );
};

export default AdminNewsPage;
