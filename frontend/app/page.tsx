import Link from 'next/link';
import { Button } from '@/components/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16 md:py-24 min-h-[80vh] sm:min-h-[85vh] md:min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 md:mb-6">
              Frontend Developer | Fitness & Lifestyle Creator | Dance & Music Enthusiast
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 text-primary-100">
              Welcome to my personal brand website
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/40 px-5 py-2 sm:px-6 sm:py-3"
                >
                  About Me
                </Button>
              </Link>

              <Link href="/portfolio">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/40 px-5 py-2 sm:px-6 sm:py-3"
                >
                  View Portfolio
                </Button>
              </Link>

              <Link href="/blog">
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white/40 px-5 py-2 sm:px-6 sm:py-3"
                >
                  Read Blog
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Icons */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-6 sm:gap-8 flex-wrap">
            
            {/* GitHub */}
            <a
              href="https://github.com/NiyatiGarg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path 
                  d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 
                  3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 
                  0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.547-1.387-1.337-1.757-1.337-1.757-1.091-.746.084-.73.084-.73 
                  1.205.084 1.84 1.236 1.84 1.236 1.07 1.835 2.807 1.305 
                  3.495.997.108-.776.418-1.305.762-1.604-2.665-.3-5.466-1.332-5.466-5.93 
                  0-1.31.469-2.381 1.235-3.221-.135-.303-.54-1.52.105-3.176 
                  0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.404 
                  1.02.005 2.04.137 3 .404 2.28-1.552 3.285-1.23 3.285-1.23 
                  .645 1.656.24 2.873.12 3.176.765.84 1.23 1.911 1.23 3.221 
                  0 4.61-2.805 5.625-5.475 5.92.42.372.81 1.102.81 2.222 
                  0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
                />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/niyati-garg-59b385211/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path 
                  d="M22.23 0H1.77C.79 0 0 .774 0 1.729v20.542C0 
                  23.226.79 24 1.77 24h20.46c.98 0 1.77-.774 1.77-1.729V1.729C24 
                  .774 23.21 0 22.23 0zM7.12 20.452H3.56V9h3.56v11.452zM5.34 
                  7.433c-1.14 0-2.06-.926-2.06-2.065 0-1.138.92-2.063 
                  2.06-2.063s2.07.925 2.07 2.063c0 1.139-.93 2.065-2.07 
                  2.065zM20.45 20.452h-3.55v-5.57c0-1.327-.03-3.037-1.86-3.037-1.86 
                  0-2.14 1.445-2.14 2.94v5.667H9.35V9h3.41v1.56h.05c.47-.9 
                  1.63-1.85 3.36-1.85 3.6 0 4.28 2.37 4.28 5.455v6.286z"
                />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/she_the_avenger_girl/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-primary-600 transition-colors"
              aria-label="Instagram"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path 
                  d="M12 2.163c3.205 0 3.584.012 4.85.07 
                  3.252.148 4.77 1.692 4.92 4.92.058 1.265.07 
                  1.645.07 4.847 0 3.205-.012 3.585-.07 
                  4.85-.15 3.225-1.67 4.77-4.92 4.92-1.266.058-1.645.07-4.85.07s-3.585-.012-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92C2.175 
                  15.585 2.163 15.205 2.163 12c0-3.202.012-3.582.07-4.847 
                  .15-3.227 1.66-4.77 4.92-4.92 1.265-.058 1.645-.07 
                  4.847-.07zM12 0C8.74 0 8.332.014 7.052.072 2.695.272.272 
                  2.695.072 7.052 0 8.332 0 8.74 0 12c0 3.26.014 3.668.072 
                  4.948.2 4.357 2.623 6.78 6.98 6.98C8.332 
                  24 8.74 24 12 24s3.668-.014 4.948-.072c4.354-.2 
                  6.782-2.623 6.98-6.98.058-1.28.072-1.689.072-4.948 
                  0-3.26-.014-3.668-.072-4.948-.2-4.354-2.626-6.78-6.98-6.98C15.668.014 
                  15.26 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 
                  6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 
                  8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
