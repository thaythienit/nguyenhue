
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import type { PageContent } from '../types';
import api from '../utils/api';

interface PageContentContextType {
  content: PageContent;
  updatePageContent: (pageKey: keyof PageContent, newContent: any) => Promise<void>;
}

// Initial state before data is loaded from the backend
const initialContent: PageContent = {
  about: { history: '', mission: '', vision: '', teachers: [] },
  contact: { address: '', phone: '' },
  history: { title: '', subtitle: '', milestones: [] },
  missionVision: { missionTitle: '', missionText: '', visionTitle: '', visionText: '' },
  organization: { title: '', subtitle: '', chart: [] }
};

const PageContentContext = createContext<PageContentContextType | undefined>(undefined);

export const PageContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<PageContent>(initialContent);

  const fetchAllPages = useCallback(async () => {
    try {
        const pageKeys = Object.keys(initialContent) as Array<keyof PageContent>;
        const requests = pageKeys.map(key => api.get(`/pages/${key}`).catch(() => ({ data: initialContent[key] })));
        const responses = await Promise.all(requests);
        
        const newContent = responses.reduce((acc, response, index) => {
            const key = pageKeys[index];
            acc[key] = response.data;
            return acc;
        }, {} as PageContent);
        
        setContent(newContent);

    } catch (error) {
      console.error("Failed to fetch page content", error);
    }
  }, []);

  useEffect(() => {
    fetchAllPages();
  }, [fetchAllPages]);

  const updatePageContent = async (pageKey: keyof PageContent, newContent: any) => {
    try {
        await api.put(`/pages/${pageKey}`, { content: newContent });
        setContent(prevContent => ({
          ...prevContent,
          [pageKey]: newContent,
        }));
    } catch (error) {
        console.error(`Failed to update page ${pageKey}`, error);
        throw error;
    }
  };

  const value = {
    content,
    updatePageContent,
  };

  return (
    <PageContentContext.Provider value={value}>{children}</PageContentContext.Provider>
  );
};

export const usePageContent = () => {
  const context = useContext(PageContentContext);
  if (context === undefined) {
    throw new Error('usePageContent must be used within a PageContentProvider');
  }
  return context;
};
