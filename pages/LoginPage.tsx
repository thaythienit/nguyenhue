import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpenIcon } from '../components/icons';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  // FIX: Made the function async and awaited the login promise to correctly handle the result.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const result = await login(username, password);
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.message || 'Tên đăng nhập hoặc mật khẩu không chính xác.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-8 text-center">
            <BookOpenIcon className="h-12 w-12 text-indigo-600 mx-auto mb-2" />
            <h1 className="text-3xl font-bold text-slate-800">Đăng nhập Admin</h1>
            <p className="text-slate-500 mt-1">Sử dụng tài khoản quản trị của bạn.</p>
          </div>
          
          {error && <p className="bg-rose-100 text-rose-700 p-3 rounded-md mb-4 text-sm">{error}</p>}

          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="username">
              Tên đăng nhập
            </label>
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:shadow-outline"
              id="username"
              type="text"
              placeholder="ví dụ: admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="password">
              Mật khẩu
            </label>
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-slate-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors"
              type="submit"
            >
              Đăng nhập
            </button>
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">
            Chưa có tài khoản?{' '}
            <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-800">
              Đăng ký
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;