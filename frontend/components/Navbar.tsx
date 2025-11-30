'use client';

import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Button } from './Button';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Personal Brand
          </Link>

          <div className="flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary-600">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-600">
              About
            </Link>
            <Link href="/portfolio" className="text-gray-700 hover:text-primary-600">
              Portfolio
            </Link>
            <Link href="/blog" className="text-gray-700 hover:text-primary-600">
              Blog
            </Link>
            <Link href="/fitness" className="text-gray-700 hover:text-primary-600">
              Fitness
            </Link>
            <Link href="/dance-music" className="text-gray-700 hover:text-primary-600">
              Dance & Music
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-600">
              Contact
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <Link href="/manage/blogs">
                  <Button variant="outline">Manage Blogs</Button>
                </Link>
                <Link href={`/profile/${user.id}`}>
                  <Button variant="secondary">Profile</Button>
                </Link>
                <Button variant="secondary" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

