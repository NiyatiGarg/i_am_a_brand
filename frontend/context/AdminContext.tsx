'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { authService } from '@/services/auth.service';
import toast from 'react-hot-toast';

interface AdminContextType {
  isAdmin: boolean;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  adminLogin: (email: string, password: string) => Promise<void>;
  adminLogout: () => Promise<void>;
  pendingChanges: boolean;
  setPendingChanges: (pending: boolean) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const { user, logout, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    if (!isAdmin && isEditing) {
      setIsEditing(false);
      setPendingChanges(false);
    }
  }, [isAdmin, isEditing]);

  const adminLogin = async (email: string, password: string) => {
    try {
      const response = await authService.adminLogin({ email, password });
      if (response.user?.role === 'admin') {
        await refreshUser();
        setIsEditing(true);
        toast.success('Admin mode enabled');
      } else {
        throw new Error('Access restricted');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Access restricted — only admin (Niyati Garg) may access editing.');
      throw error;
    }
  };

  const adminLogout = async () => {
    setIsEditing(false);
    setPendingChanges(false);
    await logout();
  };

  return (
    <AdminContext.Provider value={{ isAdmin, isEditing, setIsEditing, adminLogin, adminLogout, pendingChanges, setPendingChanges }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
}
