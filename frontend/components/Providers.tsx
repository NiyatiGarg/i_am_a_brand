'use client';

import { AuthProvider } from '@/context/AuthContext';
import { AdminProvider } from '@/context/AdminContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AdminProvider>
        {children}
      </AdminProvider>
    </AuthProvider>
  );
}

