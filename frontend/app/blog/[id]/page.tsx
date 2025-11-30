'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useApi } from '@/hooks/useApi';
import { Blog } from '@/types';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Card } from '@/components/Card';
import { format } from 'date-fns';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/Button';

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const blogId = params.id as string;

  const { data: blog, error, isLoading } = useApi<Blog>(`/blog/${blogId}`);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Blog not found</h1>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link href="/blog" className="text-primary-600 hover:text-primary-700 mb-6 inline-block">
            ← Back to Blog
          </Link>

          {/* Blog Content */}
          <Card className="mb-8">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>

            {/* Meta Info */}
            <div className="flex items-center gap-4 mb-6 text-gray-600">
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
                <span className="font-medium">{blog.author?.name}</span>
              </div>
              <span>•</span>
              <span>{format(new Date(blog.createdAt), 'MMMM d, yyyy')}</span>
              {blog.category && (
                <>
                  <span>•</span>
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-sm">
                    {blog.category.name}
                  </span>
                </>
              )}
            </div>

            {/* Thumbnail */}
            {blog.thumbnailUrl && (
              <div className="aspect-video mb-8 relative overflow-hidden rounded-lg">
                <Image src={blog.thumbnailUrl} alt={blog.title} fill className="object-cover" />
              </div>
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

            {/* Markdown Content */}
            <div className="prose prose-lg max-w-none">
              <MarkdownRenderer content={blog.content} />
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
                  <h3 className="text-2xl font-bold mb-2">{blog.author.name}</h3>
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
        </div>
      </div>
    </div>
  );
}

