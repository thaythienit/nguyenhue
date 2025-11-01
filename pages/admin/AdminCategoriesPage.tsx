import React, { useState } from 'react';
import { useCategories } from '../../contexts/CategoryContext';
import { Category } from '../../types';
import { PlusIcon, PencilIcon, TrashIcon } from '../../components/icons';
import { useAuth } from '../../contexts/AuthContext';
import AccessDenied from '../../components/admin/AccessDenied';

const AdminCategoriesPage: React.FC = () => {
  const { categories, addCategory, updateCategory, deleteCategory } = useCategories();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>(null);
  const [error, setError] = useState('');
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <AccessDenied />;
  }

  const openModal = (category?: Category) => {
    setCurrentCategory(category || { name: '' });
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentCategory(null);
    setError('');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa chuyên mục này? Các bài viết thuộc chuyên mục này sẽ không bị ảnh hưởng.')) {
      deleteCategory(id);
    }
  };
  
  // FIX: Made the function async and awaited the addCategory/updateCategory promises to correctly handle the results.
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!currentCategory || !currentCategory.name) {
        setError('Tên chuyên mục không được để trống.');
        return;
    };
    
    let result;
    if (currentCategory.id) {
      result = await updateCategory(currentCategory.id, currentCategory.name);
    } else {
      result = await addCategory(currentCategory.name);
    }

    if (result.success) {
        closeModal();
    } else {
        setError(result.message);
    }
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setCurrentCategory(prev => prev ? { ...prev, [name]: value } : null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Quản lý Chuyên mục</h1>
        <button onClick={() => openModal()} className="flex items-center bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
          <PlusIcon className="h-5 w-5 mr-2" />
          Thêm chuyên mục
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3">Tên chuyên mục</th>
              <th scope="col" className="px-6 py-3">Số bài viết</th>
              <th scope="col" className="px-6 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id} className="bg-white border-b hover:bg-slate-50">
                <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                  {category.name}
                </th>
                <td className="px-6 py-4">{/* Placeholder for article count */}0</td>
                <td className="px-6 py-4 flex items-center space-x-3">
                  <button onClick={() => openModal(category)} className="font-medium text-indigo-600 hover:underline"><PencilIcon className="h-5 w-5"/></button>
                  <button onClick={() => handleDelete(category.id)} className="font-medium text-rose-600 hover:underline"><TrashIcon className="h-5 w-5"/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
             <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-slate-800">{currentCategory.id ? 'Sửa chuyên mục' : 'Thêm chuyên mục mới'}</h2>
                
                {error && <p className="bg-rose-100 text-rose-700 p-3 rounded-md text-sm">{error}</p>}
                
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700">Tên chuyên mục</label>
                  <input type="text" name="name" id="name" value={currentCategory.name || ''} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200">Hủy</button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Lưu</button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;