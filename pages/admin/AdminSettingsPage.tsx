import React, { useState, FormEvent, useEffect } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { Settings } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import AccessDenied from '../../components/admin/AccessDenied';
import FileLibraryModal from '../../components/admin/FileLibraryModal';

const AdminSettingsPage: React.FC = () => {
  const { settings, updateSettings } = useSettings();
  const { user } = useAuth();
  const [formData, setFormData] = useState<Settings>(settings);
  const [status, setStatus] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [isFileLibraryOpen, setIsFileLibraryOpen] = useState(false);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  if (user?.role !== 'admin') {
    return <AccessDenied />;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageSelect = (url: string) => {
    setFormData(prev => ({ ...prev, logoUrl: url }));
    setIsFileLibraryOpen(false);
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setStatus({ message: 'Cài đặt đã được cập nhật thành công!', type: 'success' });
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Cài đặt Website</h1>
        <p className="text-slate-600 mt-1">Quản lý thông tin chung và cấu hình cho trang web của bạn.</p>
      </div>
      
      {status && (
          <div className={`p-4 mb-6 rounded-md ${status.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>
              {status.message}
          </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-8">
        {/* General Settings */}
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-700 border-b pb-2">Cài đặt chung</h2>
            <div>
                <label htmlFor="siteName" className="block text-sm font-medium text-slate-700">Tên Website</label>
                <input 
                    type="text" 
                    id="siteName" 
                    name="siteName" 
                    value={formData.siteName} 
                    onChange={handleChange} 
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
             <div>
                <label htmlFor="logoUrl" className="block text-sm font-medium text-slate-700">Logo URL</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                    <input 
                        type="text" 
                        id="logoUrl" 
                        name="logoUrl" 
                        value={formData.logoUrl} 
                        onChange={handleChange} 
                        placeholder="Để trống để dùng icon mặc định"
                        className="block w-full rounded-none rounded-l-md border-slate-300 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button 
                        type="button" 
                        onClick={() => setIsFileLibraryOpen(true)}
                        className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-slate-300 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100"
                    >
                        Chọn từ thư viện
                    </button>
                </div>
            </div>
        </div>

        {/* Footer Settings */}
         <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-700 border-b pb-2">Thông tin Footer</h2>
            <div>
                <label htmlFor="footerAddress" className="block text-sm font-medium text-slate-700">Địa chỉ</label>
                <input 
                    type="text" 
                    id="footerAddress" 
                    name="footerAddress" 
                    value={formData.footerAddress} 
                    onChange={handleChange} 
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
             <div>
                <label htmlFor="footerPhone" className="block text-sm font-medium text-slate-700">Số điện thoại</label>
                <input 
                    type="text" 
                    id="footerPhone" 
                    name="footerPhone" 
                    value={formData.footerPhone} 
                    onChange={handleChange} 
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
            </div>
        </div>
        
        <div className="flex justify-end pt-4">
          <button 
            type="submit" 
            className="px-6 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
          >
            Lưu thay đổi
          </button>
        </div>
      </form>

      <FileLibraryModal 
        isOpen={isFileLibraryOpen}
        onClose={() => setIsFileLibraryOpen(false)}
        onSelect={handleImageSelect}
        filter="image"
      />
    </div>
  );
};

export default AdminSettingsPage;
