import React from 'react';
import { Link } from 'react-router-dom';
import { PencilIcon, DocumentTextIcon } from '../../components/icons';
import { useAuth } from '../../contexts/AuthContext';
import AccessDenied from '../../components/admin/AccessDenied';

const manageablePages = [
  { key: 'about', name: 'Trang Giới thiệu', description: 'Nội dung chính của trang Về Chúng Tôi.' },
  { key: 'contact', name: 'Trang Liên hệ', description: 'Địa chỉ, số điện thoại hiển thị.' },
  { key: 'history', name: 'Trang Lịch sử phát triển', description: 'Các cột mốc lịch sử của trường.' },
  { key: 'missionVision', name: 'Trang Sứ mệnh - Tầm nhìn', description: 'Nội dung sứ mệnh và tầm nhìn.' },
  { key: 'organization', name: 'Trang Cơ cấu tổ chức', description: 'Sơ đồ tổ chức của nhà trường.' },
];

const AdminPagesPage: React.FC = () => {
  const { user } = useAuth();

  if (user?.role !== 'admin') {
    return <AccessDenied />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Quản lý Nội dung Trang</h1>
        <p className="text-slate-600 mt-1">Chỉnh sửa nội dung cho các trang tĩnh trên website.</p>
      </div>

      <div className="bg-white shadow-md rounded-lg">
        <ul className="divide-y divide-slate-200">
          {manageablePages.map((page) => (
            <li key={page.key} className="p-4 sm:p-6 flex items-center justify-between hover:bg-slate-50">
              <div className="flex items-start">
                <div className="bg-indigo-100 p-3 rounded-lg mr-4">
                    <DocumentTextIcon className="h-6 w-6 text-indigo-600"/>
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-slate-800">{page.name}</h2>
                  <p className="text-sm text-slate-500">{page.description}</p>
                </div>
              </div>
              <Link
                to={`/admin/pages/edit/${page.key}`}
                className="flex items-center bg-slate-100 text-slate-700 font-semibold px-4 py-2 rounded-md hover:bg-slate-200 transition-colors text-sm"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Sửa
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPagesPage;