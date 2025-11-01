import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import NewsPage from './pages/NewsPage';
import ArticleDetailPage from './pages/ArticleDetailPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import HistoryPage from './pages/HistoryPage';
import MissionVisionPage from './pages/MissionVisionPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import AdminNewsPage from './pages/admin/AdminNewsPage';
import AdminCategoriesPage from './pages/admin/AdminCategoriesPage';
import AdminUsersPage from './pages/admin/AdminUsersPage';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import ProfilePage from './pages/ProfilePage';
import AdminPagesPage from './pages/admin/AdminPagesPage';
import AdminEditPage from './pages/admin/AdminEditPage';
import AdminFilesPage from './pages/admin/AdminFilesPage';
import AdminSettingsPage from './pages/admin/AdminSettingsPage';
import OrganizationChartPage from './pages/OrganizationChartPage';
import ImageGalleryPage from './pages/ImageGalleryPage';
import DigitalLibraryPage from './pages/DigitalLibraryPage';


// Placeholder pages
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex-grow flex items-center justify-center bg-gray-50 py-20">
    <h1 className="text-4xl font-bold text-gray-400">{title}</h1>
  </div>
);

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-800">
      <Header />
      <main className="flex-grow">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<NewsPage />} />
          <Route path="/news/:articleId" element={<ArticleDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          <Route 
            path="/profile"
            element={
              <AuthenticatedRoute>
                <ProfilePage />
              </AuthenticatedRoute>
            }
          />

          {/* Giới thiệu Pages */}
          <Route path="/gioi-thieu" element={<AboutPage />} />
          <Route path="/gioi-thieu/lich-su" element={<HistoryPage />} />
          <Route path="/gioi-thieu/su-menh" element={<MissionVisionPage />} />
          <Route path="/gioi-thieu/co-cau" element={<OrganizationChartPage />} />
          <Route path="/gioi-thieu/doi-ngu" element={<PlaceholderPage title="Đội ngũ giáo viên" />} />
          <Route path="/gioi-thieu/co-so" element={<PlaceholderPage title="Cơ sở vật chất" />} />

          <Route path="/chuong-trinh-dao-tao" element={<PlaceholderPage title="Chương trình Đào tạo" />} />
          <Route path="/tuyen-sinh" element={<PlaceholderPage title="Tuyển sinh" />} />
          
          {/* Library Routes */}
          <Route path="/thu-vien" element={<Navigate to="/thu-vien/hinh-anh" replace />} />
          <Route path="/thu-vien/hinh-anh" element={<ImageGalleryPage />} />
          <Route path="/thu-vien/hoc-lieu" element={<DigitalLibraryPage />} />

          <Route path="/lien-he" element={<ContactPage />} />

          {/* Admin Routes */}
          <Route 
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<AdminDashboardPage />} />
            <Route path="news" element={<AdminNewsPage />} />
            <Route path="categories" element={<AdminCategoriesPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="pages" element={<AdminPagesPage />} />
            <Route path="pages/edit/:pageKey" element={<AdminEditPage />} />
            <Route path="files" element={<AdminFilesPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
          </Route>

        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;