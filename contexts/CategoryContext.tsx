
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Category } from '../types';
import api from '../utils/api';

interface CategoryContextType {
  categories: Category[];
  addCategory: (name: string) => Promise<{ success: boolean, message: string }>;
  updateCategory: (id: number, name: string) => Promise<{ success: boolean, message: string }>;
  deleteCategory: (id: number) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export const CategoryProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = useCallback(async () => {
    try {
      const { data } = await api.get('/categories');
      setCategories(data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (name: string) => {
    try {
        await api.post('/categories', { name });
        await fetchCategories();
        return { success: true, message: 'Thêm chuyên mục thành công.' };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || 'Failed to add category.' };
    }
  };

  const updateCategory = async (id: number, name: string) => {
    try {
        await api.put(`/categories/${id}`, { name });
        await fetchCategories();
        return { success: true, message: 'Cập nhật thành công.' };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || 'Failed to update category.' };
    }
  };

  const deleteCategory = async (id: number) => {
    try {
        await api.delete(`/categories/${id}`);
        await fetchCategories();
    } catch (error: any) {
        alert(error.response?.data?.message || 'Failed to delete category.');
    }
  };

  const value = {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
  };

  return (
    <CategoryContext.Provider value={value}>{children}</CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};
