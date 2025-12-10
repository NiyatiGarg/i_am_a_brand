'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useApi } from '@/hooks/useApi';
import { Blog } from '@/types';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';

export default function BlogDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const slug = params.slug as string;

  // Fetch blog by slug
  const { data: blog, error, isLoading } = useApi<Blog>(`/blog/slug/${slug}`);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9fc]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f9fc]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-navy">Blog not found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  // Calculate reading time (average 200 words per minute)
  const wordCount = blog.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog" className="text-coral hover:text-coral/80 mb-6 inline-block">
            ← Back to Blog
          </Link>

          {/* Blog Content */}
          <Card className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-navy">{blog.title}</h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
              <div className="flex items-center gap-2">
                {blog.author?.avatarUrl && (
                  <Image
                    src={blog.author.avatarUrl}
                    alt={blog.author.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                )}
                <span className="font-medium">{blog.author?.name || 'Niyati Garg'}</span>
              </div>
              <span>•</span>
              <span>
                {blog.publishedAt
                  ? format(new Date(blog.publishedAt), 'MMMM d, yyyy')
                  : format(new Date(blog.createdAt), 'MMMM d, yyyy')}
              </span>
              {readingTime > 0 && (
                <>
                  <span>•</span>
                  <span>{readingTime} min read</span>
                </>
              )}
              {blog.category && (
                <>
                  <span>•</span>
                  <span className="px-2 py-1 bg-coral/10 text-coral rounded-full text-sm">
                    {blog.category.name}
                  </span>
                </>
              )}
            </div>

            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Thumbnail */}
            {blog.thumbnailUrl && (
              <div className="aspect-video mb-8 relative overflow-hidden rounded-lg">
                <Image src={blog.thumbnailUrl} alt={blog.title} fill className="object-cover" />
              </div>
            )}

            {/* Excerpt */}
            {blog.excerpt && (
              <p className="text-xl text-gray-600 mb-8 italic">{blog.excerpt}</p>
            )}

            {/* Media */}
            {blog.media && blog.media.length > 0 && (
              <div className="mb-8 space-y-4">
                {blog.media.map((media) => (
                  <div key={media.id} className="rounded-lg overflow-hidden">
                    {media.type === 'image' ? (
                      <Image src={media.url} alt="" width={800} height={600} className="w-full" />
                    ) : (
                      <video src={media.url} controls className="w-full" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {blog.content.includes('<') ? (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              ) : (
                <MarkdownRenderer content={blog.content} />
              )}
            </div>
          </Card>

          {/* Author Section */}
          {blog.author && (
            <Card>
              <div className="flex items-start gap-4">
                {blog.author.avatarUrl && (
                  <Image
                    src={blog.author.avatarUrl}
                    alt={blog.author.name}
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                )}
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-navy">{blog.author.name}</h3>
                  <p className="text-gray-600 mb-2">Frontend Developer</p>
                  {blog.author.bio && <p className="text-gray-700">{blog.author.bio}</p>}
                  <Link href={`/profile/${blog.author.id}`}>
                    <Button variant="outline" className="mt-4">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          )}

          {/* Social Share */}
          <Card className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-navy">Share this post</h3>
            <div className="flex gap-4">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral hover:text-coral/80"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-coral hover:text-coral/80"
              >
                LinkedIn
              </a>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
                className="text-coral hover:text-coral/80"
              >
                Copy Link
              </button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

