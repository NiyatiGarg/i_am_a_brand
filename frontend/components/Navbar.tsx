'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Button } from './Button';

export function Navbar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  // Check if a link is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  const navLinkClass = (href: string) => {
    const baseClass = 'px-3 py-2 rounded-md text-sm font-medium transition-colors';
    const activeClass = isActive(href)
      ? 'bg-primary-600 text-white'
      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-100';
    return `${baseClass} ${activeClass}`;
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary-600">
            Personal Brand
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/" className={navLinkClass('/')}>
              Home
            </Link>
            <Link href="/about" className={navLinkClass('/about')}>
              About
            </Link>
            <Link href="/portfolio" className={navLinkClass('/portfolio')}>
              Portfolio
            </Link>
            <Link href="/blog" className={navLinkClass('/blog')}>
              Blog
            </Link>
            <Link href="/fitness" className={navLinkClass('/fitness')}>
              Fitness
            </Link>
            {/* <Link href="/dance-music" className={navLinkClass('/dance-music')}>
              Dance & Music
            </Link> */}
            <Link href="/contact" className={navLinkClass('/contact')}>
              Contact
            </Link>

            {user ? (
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
                <Link href="/manage/blogs">
                  <Button variant="outline">
                    Manage Blogs
                  </Button>
                </Link>
                <Link href={`/profile/${user.id}`}>
                  <Button variant="secondary">
                    Profile
                  </Button>
                </Link>
                <Button variant="secondary" onClick={logout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login" className="ml-4 pl-4 border-l border-gray-200">
                {/* <Button>Login</Button> */}
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

