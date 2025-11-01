import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../types';
import { PlusIcon, PencilIcon, TrashIcon } from '../../components/icons';
import AccessDenied from '../../components/admin/AccessDenied';

interface UserFormState extends Omit<User, 'id' | 'avatarUrl' | 'displayName'> {
  id?: number;
  displayName: string;
  confirmPassword?: string;
}

const AdminUsersPage: React.FC = () => {
  const { users, addUser, updateUser, deleteUser, user: currentUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUserForm, setCurrentUserForm] = useState<Partial<UserFormState> | null>(null);
  const [error, setError] = useState('');

  if (currentUser?.role !== 'admin') {
    return <AccessDenied />;
  }

  const openModal = (user?: User) => {
    setCurrentUserForm(user ? { ...user } : { username: '', password: '', confirmPassword: '', role: 'member', displayName: '' });
    setError('');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentUserForm(null);
    setError('');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      deleteUser(id);
    }
  };
  
  // FIX: Made the function async and awaited the addUser/updateUser promises to correctly handle the results.
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    if (!currentUserForm || !currentUserForm.username || !currentUserForm.displayName || !currentUserForm.role) return;

    // Add user mode
    if (!currentUserForm.id) {
        if (currentUserForm.password !== currentUserForm.confirmPassword) {
            setError('Mật khẩu không khớp.');
            return;
        }
        if (!currentUserForm.password || currentUserForm.password.length < 4) {
            setError('Mật khẩu phải có ít nhất 4 ký tự.');
            return;
        }
        const result = await addUser(currentUserForm.username, currentUserForm.password, currentUserForm.role, currentUserForm.displayName);
        if (result.success) {
            closeModal();
        } else {
            setError(result.message);
        }
    } 
    // Edit user mode
    else {
        const result = await updateUser(currentUserForm.id, currentUserForm.username, currentUserForm.role, currentUserForm.displayName);
        if (result.success) {
            closeModal();
        } else {
            setError(result.message);
        }
    }
  };
  
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setCurrentUserForm(prev => prev ? { ...prev, [name]: value } : null);
  };

  const getRoleName = (role: User['role']) => {
    switch(role) {
      case 'admin': return 'Quản trị viên';
      case 'teacher': return 'Giáo viên';
      case 'member': return 'Thành viên';
      default: return 'Không xác định';
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-slate-800">Quản lý Người dùng</h1>
        <button onClick={() => openModal()} className="flex items-center bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
          <PlusIcon className="h-5 w-5 mr-2" />
          Thêm người dùng
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left text-slate-500">
          <thead className="text-xs text-slate-700 uppercase bg-slate-50">
            <tr>
              <th scope="col" className="px-6 py-3">Tên hiển thị</th>
              <th scope="col" className="px-6 py-3">Tên đăng nhập</th>
              <th scope="col" className="px-6 py-3">Vai trò</th>
              <th scope="col" className="px-6 py-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => {
              const isAdmin = user.role === 'admin';
              const isLastAdmin = isAdmin && users.filter(u => u.role === 'admin').length <= 1;
              const isCurrentUser = currentUser?.id === user.id;

              return (
              <tr key={user.id} className="bg-white border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-medium text-slate-900">{user.displayName}</td>
                <th scope="row" className="px-6 py-4 whitespace-nowrap">
                  {user.username} {isCurrentUser && '(Bạn)'}
                </th>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${isAdmin ? 'bg-indigo-100 text-indigo-800' : user.role === 'teacher' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'}`}>
                    {getRoleName(user.role)}
                  </span>
                </td>
                <td className="px-6 py-4 flex items-center space-x-3">
                  <button onClick={() => openModal(user)} className="font-medium text-indigo-600 hover:underline"><PencilIcon className="h-5 w-5"/></button>
                  <button 
                    onClick={() => handleDelete(user.id)} 
                    disabled={isCurrentUser || isLastAdmin}
                    className="font-medium text-rose-600 hover:underline disabled:text-slate-400 disabled:cursor-not-allowed"
                    title={isCurrentUser ? "Bạn không thể xóa chính mình" : isLastAdmin ? "Không thể xóa quản trị viên cuối cùng" : "Xóa người dùng"}
                  >
                    <TrashIcon className="h-5 w-5"/>
                  </button>
                </td>
              </tr>
            )})}
          </tbody>
        </table>
      </div>

      {isModalOpen && currentUserForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
             <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-slate-800">{currentUserForm.id ? 'Sửa người dùng' : 'Thêm người dùng mới'}</h2>
                
                {error && <p className="bg-rose-100 text-rose-700 p-3 rounded-md text-sm">{error}</p>}
                
                <div>
                  <label htmlFor="displayName" className="block text-sm font-medium text-slate-700">Tên hiển thị</label>
                  <input type="text" name="displayName" id="displayName" value={currentUserForm.displayName || ''} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
                </div>

                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-slate-700">Tên đăng nhập</label>
                  <input type="text" name="username" id="username" value={currentUserForm.username || ''} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-slate-700">Vai trò</label>
                  <select 
                    name="role" 
                    id="role" 
                    value={currentUserForm.role} 
                    onChange={handleFormChange} 
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    disabled={currentUserForm.id ? (users.filter(u => u.role === 'admin').length <= 1 && currentUserForm.role === 'admin') : false}
                  >
                    <option value="member">Thành viên</option>
                    <option value="teacher">Giáo viên</option>
                    <option value="admin">Quản trị viên</option>
                  </select>
                </div>
                
                {!currentUserForm.id && (
                  <>
                    <div>
                      <label htmlFor="password"  className="block text-sm font-medium text-slate-700">Mật khẩu</label>
                      <input type="password" name="password" id="password" value={currentUserForm.password || ''} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
                    </div>
                     <div>
                      <label htmlFor="confirmPassword"  className="block text-sm font-medium text-slate-700">Xác nhận mật khẩu</label>
                      <input type="password" name="confirmPassword" id="confirmPassword" value={currentUserForm.confirmPassword || ''} onChange={handleFormChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required />
                    </div>
                  </>
                )}

                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={closeModal} className="px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 rounded-md hover:bg-slate-200">Hủy</button>
                  <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700">Lưu</button>
                </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsersPage;