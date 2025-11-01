import React, { useState, FormEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserCircleIcon } from '../components/icons';

const ProfilePage: React.FC = () => {
    const { user, updateUserProfile, changePassword } = useAuth();
    
    // State for profile info form
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
    const [profileMessage, setProfileMessage] = useState({ type: '', text: '' });
    
    // State for password change form
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMessage, setPasswordMessage] = useState({ type: '', text: '' });

    if (!user) {
        return <div>Đang tải thông tin người dùng...</div>;
    }

    // FIX: Made the function async and awaited the updateUserProfile promise to correctly handle the result.
    const handleProfileSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setProfileMessage({ type: '', text: '' });
        const result = await updateUserProfile(user.id, displayName, avatarUrl);
        if (result.success) {
            setProfileMessage({ type: 'success', text: result.message });
        } else {
            setProfileMessage({ type: 'error', text: result.message });
        }
    };

    // FIX: Made the function async and awaited the changePassword promise to correctly handle the result.
    const handlePasswordSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setPasswordMessage({ type: '', text: '' });
        if (newPassword !== confirmPassword) {
            setPasswordMessage({ type: 'error', text: 'Mật khẩu mới không khớp.' });
            return;
        }
        if (newPassword.length < 4) {
             setPasswordMessage({ type: 'error', text: 'Mật khẩu mới phải có ít nhất 4 ký tự.' });
            return;
        }
        const result = await changePassword(user.id, oldPassword, newPassword);
        if (result.success) {
            setPasswordMessage({ type: 'success', text: result.message });
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            setPasswordMessage({ type: 'error', text: result.message });
        }
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <div className="max-w-4xl mx-auto">
                <div className="flex items-center mb-8">
                    <UserCircleIcon className="h-12 w-12 text-indigo-600 mr-4"/>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Trang cá nhân</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Profile Info Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-slate-700">Thông tin cá nhân</h2>
                        <form onSubmit={handleProfileSubmit} className="space-y-4">
                             {profileMessage.text && (
                                <p className={`p-3 rounded-md text-sm ${profileMessage.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                    {profileMessage.text}
                                </p>
                            )}
                            <div>
                                <label htmlFor="displayName" className="block text-sm font-medium text-slate-700">Tên hiển thị</label>
                                <input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
                            </div>
                             <div>
                                <label htmlFor="avatarUrl" className="block text-sm font-medium text-slate-700">URL Ảnh đại diện</label>
                                <input type="text" id="avatarUrl" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Cập nhật</button>
                            </div>
                        </form>
                    </div>

                    {/* Change Password Form */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-xl font-semibold mb-4 text-slate-700">Đổi mật khẩu</h2>
                        <form onSubmit={handlePasswordSubmit} className="space-y-4">
                            {passwordMessage.text && (
                                <p className={`p-3 rounded-md text-sm ${passwordMessage.type === 'success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                                    {passwordMessage.text}
                                </p>
                            )}
                            <div>
                                <label htmlFor="oldPassword"  className="block text-sm font-medium text-slate-700">Mật khẩu cũ</label>
                                <input type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required/>
                            </div>
                             <div>
                                <label htmlFor="newPassword"  className="block text-sm font-medium text-slate-700">Mật khẩu mới</label>
                                <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required/>
                            </div>
                             <div>
                                <label htmlFor="confirmPassword"  className="block text-sm font-medium text-slate-700">Xác nhận mật khẩu mới</label>
                                <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" required/>
                            </div>
                            <div className="flex justify-end">
                                <button type="submit" className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700">Đổi mật khẩu</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;