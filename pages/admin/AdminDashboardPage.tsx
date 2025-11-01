import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useArticles } from '../../contexts/ArticleContext';
import { NewspaperIcon, UsersIcon, ChartBarIcon, PlusIcon, TagIcon } from '../../components/icons';

const StatCard: React.FC<{ icon: React.ReactNode, title: string, value: string | number, color: string }> = ({ icon, title, value, color }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
    <div className={`p-4 rounded-full mr-4 ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-bold text-slate-800">{value}</p>
    </div>
  </div>
);

const QuickActionButton: React.FC<{ icon: React.ReactNode, text: string, onClick: () => void }> = ({ icon, text, onClick }) => (
    <button onClick={onClick} className="flex flex-col items-center justify-center space-y-2 bg-slate-50 p-6 rounded-lg hover:bg-indigo-100 hover:text-indigo-700 transition-all text-slate-600 font-semibold shadow-sm border border-slate-200 hover:border-indigo-200">
        {icon}
        <span>{text}</span>
    </button>
)


const AdminDashboardPage: React.FC = () => {
  const { user, users } = useAuth();
  const { articles } = useArticles();
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-3xl font-bold text-slate-800 mb-2">
        Chào mừng trở lại, {user?.displayName}!
      </h1>
      <p className="text-slate-600 mb-8">Đây là trang tổng quan quản trị của bạn.</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard 
          icon={<NewspaperIcon className="h-8 w-8 text-indigo-600" />}
          title="Tổng số bài viết"
          value={articles.length}
          color="bg-indigo-100"
        />
        <StatCard 
          icon={<UsersIcon className="h-8 w-8 text-emerald-600" />}
          title="Người dùng"
          value={users.length}
          color="bg-emerald-100"
        />
         <StatCard 
          icon={<ChartBarIcon className="h-8 w-8 text-sky-600" />}
          title="Lượt truy cập (30 ngày)"
          value="1,234"
          color="bg-sky-100"
        />
      </div>
      
      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Phím tắt</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <QuickActionButton 
                icon={<PlusIcon className="h-8 w-8"/>}
                text="Viết bài mới"
                onClick={() => navigate('/admin/news', { state: { openModal: true } })}
            />
            <QuickActionButton 
                icon={<UsersIcon className="h-8 w-8"/>}
                text="Thêm người dùng"
                onClick={() => navigate('/admin/users')}
            />
             <QuickActionButton 
                icon={<TagIcon className="h-8 w-8"/>}
                text="Quản lý chuyên mục"
                onClick={() => navigate('/admin/categories')}
            />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;