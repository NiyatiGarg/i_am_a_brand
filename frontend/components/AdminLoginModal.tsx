'use client';

import { useState } from 'react';
import { useAdmin } from '@/context/AdminContext';
import { Button } from './Button';
import { Input } from './Input';
import toast from 'react-hot-toast';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AdminLoginModal({ isOpen, onClose }: AdminLoginModalProps) {
  const { adminLogin } = useAdmin();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await adminLogin(email, password);
      onClose();
      setEmail('');
      setPassword('');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Access restricted — only site admin (Niyati Garg) may access editing.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <h2 className="text-2xl font-bold mb-4 text-navy">Admin Login</h2>
        
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600 text-sm font-semibold">Access Restricted</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
            <p className="text-gray-600 text-xs mt-2">
              Only admin (Niyati Garg) is allowed to access editing mode.
            </p>
            <a
              href="mailto:contact@example.com"
              className="text-coral text-xs hover:underline mt-2 inline-block"
            >
              Contact owner
            </a>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="admin@example.com"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <Button type="submit" isLoading={isLoading} className="flex-1">
              Login
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

