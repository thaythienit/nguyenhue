
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpenIcon, MailIcon, PhoneIcon, LocationMarkerIcon } from './icons';
import { useSettings } from '../contexts/SettingsContext';

const Footer: React.FC = () => {
  const { settings } = useSettings();

  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-3">
               {settings.logoUrl ? (
                <img src={settings.logoUrl} alt={`${settings.siteName} Logo`} className="h-10 w-auto bg-white p-1 rounded-md"/>
               ) : (
                <BookOpenIcon className="h-8 w-8 text-indigo-400" />
               )}
              <span className="text-2xl font-bold text-white">{settings.siteName}</span>
            </Link>
            <p className="text-sm">
              Nơi chắp cánh những ước mơ, vun đắp tương lai cho thế hệ trẻ.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li><Link to="/gioi-thieu" className="hover:text-indigo-400 transition-colors">Giới thiệu</Link></li>
              <li><Link to="/tuyen-sinh" className="hover:text-indigo-400 transition-colors">Tuyển sinh</Link></li>
              <li><Link to="/" className="hover:text-indigo-400 transition-colors">Tin tức & Sự kiện</Link></li>
              <li><Link to="/lien-he" className="hover:text-indigo-400 transition-colors">Liên hệ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Liên hệ</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <LocationMarkerIcon className="h-5 w-5 mt-1 text-indigo-400 flex-shrink-0" />
                <span>{settings.footerAddress}</span>
              </li>
              <li className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-indigo-400" />
                <span>{settings.footerPhone}</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Bản tin</h3>
            <p className="mb-4">Đăng ký để nhận những thông tin mới nhất từ nhà trường.</p>
            <form className="flex">
              <input type="email" placeholder="Email của bạn" className="w-full rounded-l-md px-3 py-2 bg-slate-700 text-white border-slate-600 focus:ring-indigo-500 focus:border-indigo-500"/>
              <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-r-md hover:bg-indigo-700">Gửi</button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-700 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} {settings.siteName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;