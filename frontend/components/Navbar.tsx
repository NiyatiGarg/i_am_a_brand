'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useAdmin } from '@/context/AdminContext';
import { Button } from './Button';
import { AdminLoginModal } from './AdminLoginModal';
import { Menu, X } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const { isAdmin, isEditing, setIsEditing } = useAdmin();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const navLinkClass = (href: string) =>
    `block px-4 py-2 rounded-md text-base font-medium transition-all ${
      isActive(href)
        ? "bg-[#ff6b35] text-white"
        : "text-gray-700 hover:text-[#ff6b35] hover:bg-gray-100"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-[#0f172a]">Niyati Garg</Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/" className={navLinkClass("/")}>Home</Link>
            <Link href="/about" className={navLinkClass("/about")}>About</Link>
            <Link href="/portfolio" className={navLinkClass("/portfolio")}>Portfolio</Link>
            <Link href="/blog" className={navLinkClass("/blog")}>Blog</Link>
            <Link href="/fitness" className={navLinkClass("/fitness")}>Fitness</Link>
            <Link href="/contact" className={navLinkClass("/contact")}>Contact</Link>

            {user ? (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
                {isAdmin && (
                  <Button variant={isEditing ? 'primary' : 'outline'} size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? 'Exit Edit' : 'Edit Mode'}
                  </Button>
                )}
                <Link href="/manage/blogs"><Button variant="outline" size="sm">Manage Blogs</Button></Link>
                <Button variant="secondary" size="sm" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <div className="ml-4 pl-4 border-l border-gray-200">
                <Button size="sm" onClick={() => setShowAdminLogin(true)}>Admin Login</Button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle Menu">
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
          <div className="absolute top-0 left-0 right-0 bg-white shadow-xl p-4 space-y-2">
            <Link href="/" onClick={() => setIsOpen(false)} className={navLinkClass("/")}>Home</Link>
            <Link href="/about" onClick={() => setIsOpen(false)} className={navLinkClass("/about")}>About</Link>
            <Link href="/portfolio" onClick={() => setIsOpen(false)} className={navLinkClass("/portfolio")}>Portfolio</Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className={navLinkClass("/blog")}>Blog</Link>
            <Link href="/fitness" onClick={() => setIsOpen(false)} className={navLinkClass("/fitness")}>Fitness</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className={navLinkClass("/contact")}>Contact</Link>
            <hr className="my-3 border-gray-200" />
            {user ? (
              <div className="flex flex-col gap-3">
                {isAdmin && <Button variant={isEditing ? 'primary' : 'outline'} className="w-full" onClick={() => { setIsEditing(!isEditing); setIsOpen(false); }}>{isEditing ? 'Exit Edit' : 'Edit Mode'}</Button>}
                <Link href="/manage/blogs" onClick={() => setIsOpen(false)}><Button variant="outline" className="w-full">Manage Blogs</Button></Link>
                <Button variant="secondary" className="w-full" onClick={logout}>Logout</Button>
              </div>
            ) : (
              <Button className="w-full" onClick={() => { setShowAdminLogin(true); setIsOpen(false); }}>Admin Login</Button>
            )}
          </div>
        </div>
      )}

      <AdminLoginModal isOpen={showAdminLogin} onClose={() => setShowAdminLogin(false)} />
    </nav>
  );
}
