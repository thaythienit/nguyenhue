import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpenIcon } from '../components/icons';

const RegisterPage: React.FC = () => {
  const [displayName, setDisplayName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  // FIX: Made the function async and awaited the register promise to correctly handle the result.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }
    if (password.length < 4) {
      setError('Mật khẩu phải có ít nhất 4 ký tự.');
      return;
    }

    const result = await register(username, password, displayName);
    if (result.success) {
      setSuccess('Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] bg-slate-50 px-4 py-8">
      <div className="w-full max-w-md">
        <form 
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-xl px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-8 text-center">
            <BookOpenIcon className="h-12 w-12 text-indigo-600 mx-auto mb-2" />
            <h1 className="text-3xl font-bold text-slate-800">Tạo tài khoản Thành viên</h1>
            <p className="text-slate-500 mt-1">Đăng ký để trở thành thành viên.</p>
          </div>
          
          {error && <p className="bg-rose-100 text-rose-700 p-3 rounded-md mb-4 text-sm">{error}</p>}
          {success && <p className="bg-emerald-100 text-emerald-700 p-3 rounded-md mb-4 text-sm">{success}</p>}

          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="displayName">
              Họ và tên
            </label>
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:shadow-outline"
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="username">
              Tên đăng nhập
            </label>
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:shadow-outline"
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="password">
              Mật khẩu
            </label>
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:shadow-outline"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="confirm-password">
              Xác nhận Mật khẩu
            </label>
            <input
              className="shadow-sm appearance-none border rounded-md w-full py-3 px-4 text-slate-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:shadow-outline"
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:shadow-outline transition-colors"
              type="submit"
            >
              Đăng ký
            </button>
          </div>
          <p className="text-center text-sm text-slate-500 mt-6">
            Đã có tài khoản?{' '}
            <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-800">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;