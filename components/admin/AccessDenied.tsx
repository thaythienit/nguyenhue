import React from 'react';
import { Link } from 'react-router-dom';

const AccessDenied: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white rounded-lg shadow-md p-8">
      <h1 className="text-2xl font-bold text-rose-600">Truy cập bị từ chối</h1>
      <p className="text-slate-600 mt-2">Bạn không có quyền truy cập vào trang này.</p>
      <Link 
        to="/admin/dashboard" 
        className="mt-6 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors"
      >
        Quay lại Bảng điều khiển
      </Link>
    </div>
  );
};

export default AccessDenied;
