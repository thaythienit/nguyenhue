
import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Settings } from '../types';
import api from '../utils/api';

interface SettingsContextType {
  settings: Settings;
  updateSettings: (newSettings: Settings) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const initialSettings: Settings = {
  siteName: 'Trường Tiểu học Nguyễn Huệ',
  logoUrl: '',
  footerAddress: 'Nam Thanh - Đắk Wil - Lâm Đồng',
  footerPhone: '02613.709.333',
};

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<Settings>(initialSettings);

  const fetchSettings = useCallback(async () => {
    try {
      const { data } = await api.get('/settings');
      setSettings(data);
    } catch (error) {
      console.error("Failed to fetch settings", error);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const updateSettings = async (newSettings: Settings) => {
    try {
        await api.put('/settings', newSettings);
        setSettings(newSettings);
    } catch (error) {
        console.error("Failed to update settings", error);
    }
  };

  const value = {
    settings,
    updateSettings,
  };

  return (
    <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
