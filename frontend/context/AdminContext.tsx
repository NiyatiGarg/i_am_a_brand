'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
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
    // Exit edit mode if user is no longer admin
    if (!isAdmin && isEditing) {
      setIsEditing(false);
      setPendingChanges(false);
    }
  }, [isAdmin, isEditing]);

  const adminLogin = async (email: string, password: string) => {
    try {
      const response = await authService.adminLogin({ email, password });
      if (response.user?.role === 'admin') {
        // Refresh user data
        await refreshUser();
        setIsEditing(true);
        toast.success('Admin mode enabled');
      } else {
        throw new Error('Access restricted');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Access restricted — only site admin (Niyati Garg) may access editing.';
      toast.error(errorMessage);
      throw error;
    }
  };

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
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);

  const isAdmin = user?.role === 'admin';

  useEffect(() => {
    // Exit edit mode if user is no longer admin
    if (!isAdmin && isEditing) {
      setIsEditing(false);
      setPendingChanges(false);
    }
  }, [isAdmin, isEditing]);

  const adminLogin = async (email: string, password: string) => {
    try {
      const response = await authService.adminLogin({ email, password });
      if (response.user?.role === 'admin') {
        // Refresh user data
        await refreshUser();
        setIsEditing(true);
        toast.success('Admin mode enabled');
      } else {
        throw new Error('Access restricted');
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Access restricted — only site admin (Niyati Garg) may access editing.';
      toast.error(errorMessage);
      throw error;
    }
  };

  const adminLogout = async () => {
    try {
      setIsEditing(false);
      setPendingChanges(false);
      await logout();
      toast.success('Logged out successfully');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <AdminContext.Provider
      value={{
        isAdmin,
        isEditing,
        setIsEditing,
        adminLogin,
        adminLogout,
        pendingChanges,
        setPendingChanges,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}

