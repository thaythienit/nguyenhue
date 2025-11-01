import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { MenuIcon, XIcon, ChevronDownIcon, BookOpenIcon, LogoutIcon, UserCircleIcon, DashboardIcon } from './icons';
import { useAuth } from '../contexts/AuthContext';
import { useSettings } from '../contexts/SettingsContext';

interface NavItem {
  name: string;
  path: string;
  subItems?: NavItem[];
}

const navItems: NavItem[] = [
  { name: 'Trang chủ', path: '/' },
  {
    name: 'Giới thiệu',
    path: '/gioi-thieu',
    subItems: [
      { name: 'Lịch sử phát triển', path: '/gioi-thieu/lich-su' },
      { name: 'Sứ mệnh - Tầm nhìn', path: '/gioi-thieu/su-menh' },
      { name: 'Cơ cấu tổ chức', path: '/gioi-thieu/co-cau' },
      { name: 'Đội ngũ giáo viên', path: '/gioi-thieu/doi-ngu' },
      { name: 'Cơ sở vật chất', path: '/gioi-thieu/co-so' },
    ],
  },
  { name: 'Chương trình Đào tạo', path: '/chuong-trinh-dao-tao' },
  { name: 'Tuyển sinh', path: '/tuyen-sinh' },
  {
    name: 'Thư viện',
    path: '/thu-vien/hinh-anh',
    subItems: [
      { name: 'Thư viện hình ảnh', path: '/thu-vien/hinh-anh' },
      { name: 'Thư viện học liệu số', path: '/thu-vien/hoc-lieu' },
    ],
  },
  { name: 'Liên hệ', path: '/lien-he' },
];

const DropdownMenu: React.FC<{ item: NavItem; closeMobileMenu?: () => void }> = ({ item, closeMobileMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const node = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (node.current && !node.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubItemClick = () => {
    setIsOpen(false);
    if (closeMobileMenu) {
        closeMobileMenu();
    }
  }

  return (
    <li ref={node} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-4 py-2 text-slate-600 hover:text-indigo-600 transition-colors duration-200 w-full text-left"
      >
        <span>{item.name}</span>
        <ChevronDownIcon className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <ul className="absolute z-20 mt-2 w-48 bg-white rounded-md shadow-lg py-1 lg:block">
          {item.subItems?.map((subItem) => (
            <li key={subItem.path}>
              <NavLink
                to={subItem.path}
                onClick={handleSubItemClick}
                className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-indigo-600"
              >
                {subItem.name}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};


const UserMenu: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const node = useRef<HTMLDivElement>(null);
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          if (node.current && !node.current.contains(e.target as Node)) {
            setIsOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setIsOpen(false);
        navigate('/');
    };

    if (!user) return null;

    return (
        <div ref={node} className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center space-x-2">
                <img src={user.avatarUrl} alt={user.displayName} className="h-9 w-9 rounded-full object-cover border-2 border-transparent hover:border-indigo-300"/>
                <span className="hidden md:inline font-semibold text-slate-700">{user.displayName}</span>
                 <ChevronDownIcon className={`h-4 w-4 text-slate-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="absolute z-20 mt-2 w-56 bg-white rounded-md shadow-lg py-1 right-0">
                    <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-800">{user.displayName}</p>
                        <p className="text-xs text-slate-500 truncate">{user.username}</p>
                    </div>
                    <ul className="py-1">
                        <li>
                            <Link to="/profile" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-indigo-600">
                                <UserCircleIcon className="h-5 w-5 mr-3"/> Trang cá nhân
                            </Link>
                        </li>
                        {(user.role === 'admin' || user.role === 'teacher') && (
                            <li>
                                <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-100 hover:text-indigo-600">
                                   <DashboardIcon className="h-5 w-5 mr-3"/> Bảng điều khiển
                                </Link>
                            </li>
                        )}
                        <li className="border-t border-slate-100 mt-1 pt-1">
                            <button onClick={handleLogout} className="w-full text-left flex items-center px-4 py-2 text-sm text-rose-600 hover:bg-rose-50">
                               <LogoutIcon className="h-5 w-5 mr-3"/> Đăng xuất
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    )
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { settings } = useSettings();

  const renderNavItem = (item: NavItem, isMobile: boolean = false) => {
    if (item.subItems) {
      return <DropdownMenu key={item.path} item={item} closeMobileMenu={() => setIsMobileMenuOpen(false)} />;
    }
    return (
      <li key={item.path} className={isMobile ? 'w-full' : ''}>
        <NavLink
          to={item.path}
          onClick={() => isMobile && setIsMobileMenuOpen(false)}
          className={({ isActive }) =>
            isMobile
            ? `block px-3 py-2 rounded-md text-base font-medium ${
                isActive ? 'bg-indigo-50 text-indigo-700' : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
              }`
            : `px-4 py-2 transition-colors duration-200 ${
              isActive ? 'text-indigo-600 font-semibold' : 'text-slate-600 hover:text-indigo-600'
            }`
          }
        >
          {item.name}
        </NavLink>
      </li>
    );
  };

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center space-x-3">
            {settings.logoUrl ? (
                <img src={settings.logoUrl} alt={`${settings.siteName} Logo`} className="h-10 w-auto"/>
            ) : (
                <BookOpenIcon className="h-8 w-8 text-indigo-600" />
            )}
            <span className="text-2xl font-bold text-slate-800">{settings.siteName}</span>
          </Link>

          <nav className="hidden lg:flex">
            <ul className="flex items-center space-x-2 font-medium">
              {navItems.map((item) => renderNavItem(item, false))}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center space-x-2">
            {isAuthenticated ? (
              <UserMenu/>
            ) : (
              <>
                <Link to="/login" className="px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-md hover:bg-indigo-50 transition-all">
                  Đăng nhập
                </Link>
                <Link to="/register" className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-all">
                  Đăng ký
                </Link>
              </>
            )}
          </div>
          
          <div className="lg:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200">
          <nav className="px-2 pt-2 pb-4">
            <ul className="space-y-1">
                {navItems.map((item) => renderNavItem(item, true))}
            </ul>
            <div className="flex flex-col space-y-2 pt-4 px-3 border-t mt-4">
              {isAuthenticated ? (
                <div className="py-2">
                    <UserMenu />
                </div>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-2 text-sm font-semibold text-indigo-600 border border-indigo-200 rounded-md hover:bg-indigo-50 transition-all">
                    Đăng nhập
                  </Link>
                  <Link to="/register" onClick={() => setIsMobileMenuOpen(false)} className="w-full text-center px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition-all">
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;