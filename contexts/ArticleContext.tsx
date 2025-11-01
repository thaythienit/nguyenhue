
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { Article } from '../types';
import api from '../utils/api'; // We will create this utility

interface ArticleContextType {
  articles: Article[];
  loading: boolean;
  getArticleById: (id: number) => Article | undefined;
  addArticle: (article: Omit<Article, 'id'>) => Promise<void>;
  updateArticle: (article: Article) => Promise<void>;
  deleteArticle: (id: number) => Promise<void>;
  fetchArticles: () => Promise<void>;
}

const ArticleContext = createContext<ArticleContextType | undefined>(undefined);

export const ArticleProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/articles');
      setArticles(data);
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const getArticleById = (id: number): Article | undefined => {
    return articles.find(article => article.id === id);
  };

  const addArticle = async (articleData: Omit<Article, 'id'>) => {
    try {
      await api.post('/articles', articleData);
      await fetchArticles(); // Re-fetch to get the latest list
    } catch (error) {
      console.error("Failed to add article", error);
      // Optionally throw the error to handle it in the component
      throw error;
    }
  };

  const updateArticle = async (updatedArticle: Article) => {
     try {
      await api.put(`/articles/${updatedArticle.id}`, updatedArticle);
      await fetchArticles();
    } catch (error) {
      console.error("Failed to update article", error);
      throw error;
    }
  };

  const deleteArticle = async (id: number) => {
    try {
      await api.delete(`/articles/${id}`);
      await fetchArticles();
    } catch (error) {
      console.error("Failed to delete article", error);
      throw error;
    }
  };

  const value = {
    articles,
    loading,
    getArticleById,
    addArticle,
    updateArticle,
    deleteArticle,
    fetchArticles
  };

  return (
    <ArticleContext.Provider value={value}>{children}</ArticleContext.Provider>
  );
};

export const useArticles = () => {
  const context = useContext(ArticleContext);
  if (context === undefined) {
    throw new Error('useArticles must be used within an ArticleProvider');
  }
  return context;
};
