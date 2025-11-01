
import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { ManagedFile } from '../types';
import api from '../utils/api';

interface FileContextType {
  files: ManagedFile[];
  addFiles: (newFiles: File[]) => Promise<void>;
  deleteFile: (id: string) => Promise<void>;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [files, setFiles] = useState<ManagedFile[]>([]);

  const fetchFiles = useCallback(async () => {
    try {
      const { data } = await api.get('/files');
      setFiles(data);
    } catch (error) {
      console.error("Failed to fetch files", error);
    }
  }, []);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const addFiles = async (newFiles: File[]) => {
    const formData = new FormData();
    newFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      await api.post('/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      await fetchFiles(); // Refresh file list
    } catch (error) {
      console.error("Failed to upload files", error);
    }
  };

  const deleteFile = async (id: string) => {
    try {
      await api.delete(`/files/${id}`);
      setFiles(prev => prev.filter(f => f.id !== id));
    } catch (error) {
      console.error("Failed to delete file", error);
    }
  };

  const value = {
    files,
    addFiles,
    deleteFile,
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
};
