import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-[calc(100vh-160px)]">
      <AdminSidebar />
      <main className="flex-1 p-8 bg-slate-100">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
