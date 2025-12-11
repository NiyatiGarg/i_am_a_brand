'use client';

import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApi } from '@/hooks/useApi';
import { Blog } from '@/types';
import { MarkdownRenderer } from '@/components/MarkdownRenderer';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { format } from 'date-fns';

export default function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
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
          <h1 className="text-2xl font-bold mb-4 text-[#0f172a]">Blog not found</h1>
          <Link href="/blog"><Button>Back to Blog</Button></Link>
        </div>
      </div>
    );
  }

  const wordCount = blog.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <Link href="/blog" className="text-[#ff6b35] hover:underline mb-6 inline-block">← Back to Blog</Link>

          <Card className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#0f172a]">{blog.title}</h1>

            <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
              <div className="flex items-center gap-2">
                {blog.author?.avatarUrl && <Image src={blog.author.avatarUrl} alt={blog.author.name} width={40} height={40} className="rounded-full" />}
                <span className="font-medium">{blog.author?.name || 'Niyati Garg'}</span>
              </div>
              <span>•</span>
              <span>{format(new Date(blog.publishedAt || blog.createdAt), 'MMMM d, yyyy')}</span>
              {readingTime > 0 && <><span>•</span><span>{readingTime} min read</span></>}
              {blog.category && <><span>•</span><span className="px-2 py-1 bg-[#ff6b35]/10 text-[#ff6b35] rounded-full text-sm">{blog.category.name}</span></>}
            </div>

            {blog.thumbnailUrl && (
              <div className="aspect-video mb-8 relative overflow-hidden rounded-lg">
                <Image src={blog.thumbnailUrl} alt={blog.title} fill className="object-cover" />
              </div>
            )}

            {blog.excerpt && <p className="text-xl text-gray-600 mb-8 italic">{blog.excerpt}</p>}

            <div className="prose prose-lg max-w-none">
              {blog.content.includes('<') ? (
                <div dangerouslySetInnerHTML={{ __html: blog.content }} />
              ) : (
                <MarkdownRenderer content={blog.content} />
              )}
            </div>
          </Card>

          <Card className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-[#0f172a]">Share this post</h3>
            <div className="flex gap-4">
              <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-[#ff6b35] hover:underline">Twitter</a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noopener noreferrer" className="text-[#ff6b35] hover:underline">LinkedIn</a>
              <button onClick={() => { navigator.clipboard.writeText(shareUrl); alert('Link copied!'); }} className="text-[#ff6b35] hover:underline">Copy Link</button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
