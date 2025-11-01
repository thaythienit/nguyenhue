import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, NewspaperIcon, UsersIcon, SettingsIcon, TagIcon, DocumentTextIcon, FolderOpenIcon } from '../icons';
import { useAuth } from '../../contexts/AuthContext';

const allNavLinks = [
  { to: 'dashboard', icon: DashboardIcon, text: 'Tổng quan', roles: ['admin', 'teacher'] },
  { to: 'news', icon: NewspaperIcon, text: 'Quản lý Tin tức', roles: ['admin', 'teacher'] },
  { to: 'categories', icon: TagIcon, text: 'Quản lý Chuyên mục', roles: ['admin'] },
  { to: 'pages', icon: DocumentTextIcon, text: 'Quản lý Trang', roles: ['admin'] },
  { to: 'files', icon: FolderOpenIcon, text: 'Quản lý Tập tin', roles: ['admin'] },
  { to: 'users', icon: UsersIcon, text: 'Quản lý Người dùng', roles: ['admin'] },
  { to: 'settings', icon: SettingsIcon, text: 'Cài đặt', roles: ['admin'] },
];

const AdminSidebar: React.FC = () => {
  const { user } = useAuth();

  const visibleLinks = allNavLinks.filter(link => user && link.roles.includes(user.role));

  return (
    <aside className="w-64 bg-white shadow-md flex-shrink-0">
      <div className="p-4">
        <h2 className="text-xl font-bold text-slate-700">Admin Panel</h2>
      </div>
      <nav>
        <ul>
          {visibleLinks.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-slate-600 hover:bg-indigo-50 hover:text-indigo-700 transition-colors duration-200 ${
                    isActive ? 'bg-indigo-100 text-indigo-700 font-semibold border-r-4 border-indigo-500' : ''
                  }`
                }
              >
                <link.icon className="h-5 w-5 mr-3" />
                <span>{link.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;