
import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';
import { User } from '../types';
import api from '../utils/api';

interface AuthContextType {
  user: User | null;
  users: User[];
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, pass: string) => Promise<{ success: boolean, message?: string }>;
  logout: () => void;
  register: (username: string, pass: string, displayName: string) => Promise<{ success: boolean, message: string }>;
  addUser: (username: string, pass: string, role: User['role'], displayName: string) => Promise<{ success: boolean, message: string }>;
  updateUser: (id: number, username: string, role: User['role'], displayName: string) => Promise<{ success: boolean, message: string }>;
  deleteUser: (id: number) => Promise<void>;
  updateUserProfile: (id: number, displayName: string, avatarUrl: string) => Promise<{ success: boolean; message: string; }>;
  changePassword: (id: number, oldPass: string, newPass: string) => Promise<{ success: boolean; message: string; }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    if (user?.role === 'admin') {
      try {
        const { data } = await api.get('/users');
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      }
    }
  }, [user]);

  useEffect(() => {
    // Persist session on page refresh
    const storedUser = localStorage.getItem('school-portal-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const login = async (username: string, pass: string) => {
    try {
      const { data } = await api.post('/auth/login', { username, password: pass });
      setUser(data);
      localStorage.setItem('school-portal-user', JSON.stringify(data));
      return { success: true };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Login failed.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('school-portal-user');
  };

  const register = async (username: string, pass: string, displayName: string) => {
    try {
      await api.post('/auth/register', { username, password: pass, displayName });
      return { success: true, message: 'Đăng ký thành viên thành công.' };
    } catch (error: any) {
      return { success: false, message: error.response?.data?.message || 'Registration failed.' };
    }
  };
  
  const addUser = async (username: string, pass: string, role: User['role'], displayName: string) => {
    try {
        await api.post('/users', { username, password: pass, role, displayName });
        await fetchUsers();
        return { success: true, message: 'Thêm người dùng thành công.' };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || 'Failed to add user.' };
    }
  };

  const updateUser = async (id: number, newUsername: string, newRole: User['role'], newDisplayName: string) => {
    try {
        await api.put(`/users/${id}`, { username: newUsername, role: newRole, displayName: newDisplayName });
        await fetchUsers();
        // If the updated user is the currently logged-in user, update the session as well
        if (user?.id === id) {
            const updatedUserData = { ...user, username: newUsername, role: newRole, displayName: newDisplayName };
            setUser(updatedUserData);
            localStorage.setItem('school-portal-user', JSON.stringify(updatedUserData));
        }
        return { success: true, message: 'Cập nhật thành công.' };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || 'Failed to update user.' };
    }
  }

  const deleteUser = async (id: number) => {
    try {
        await api.delete(`/users/${id}`);
        await fetchUsers();
    } catch (error: any) {
        alert(error.response?.data?.message || 'Failed to delete user.');
    }
  }

  const updateUserProfile = async (id: number, displayName: string, avatarUrl: string) => {
    // NOTE: This should ideally be a separate endpoint, but for now we use the admin updateUser
    // For simplicity, we assume profile updates only change displayName and avatarUrl
    // A real app would need a dedicated /api/profile endpoint
    try {
        const { data } = await api.put(`/users/${id}`, { displayName, avatarUrl, username: user?.username, role: user?.role });
         if (user?.id === id) {
            const updatedUser = { ...user, ...data };
            setUser(updatedUser);
            localStorage.setItem('school-portal-user', JSON.stringify(updatedUser));
        }
        return { success: true, message: 'Cập nhật thông tin thành công!' };
    } catch (error: any) {
        return { success: false, message: error.response?.data?.message || 'Update failed.' };
    }
  }

  const changePassword = async (id: number, oldPass: string, newPass: string) => {
    // NOTE: This requires a dedicated backend endpoint, which is not implemented for brevity.
    // This will return an error until a `/api/users/change-password` endpoint is created.
    console.log(id, oldPass, newPass);
    return { success: false, message: 'Tính năng này chưa được cài đặt.' };
  }

  const value = {
    user,
    users,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    register,
    addUser,
    updateUser,
    deleteUser,
    updateUserProfile,
    changePassword
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
