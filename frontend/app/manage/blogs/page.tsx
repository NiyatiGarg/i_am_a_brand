'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApi } from '@/hooks/useApi';
import { Blog, BlogCategory } from '@/types';
import { blogService, blogCategoryService } from '@/services/blog.service';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { TipTapEditor } from '@/components/TipTapEditor';
import { ImageUpload } from '@/components/ImageUpload';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import toast from 'react-hot-toast';
import { format } from 'date-fns';

export default function ManageBlogsPage() {
  return (
    <ProtectedRoute>
      <ManageBlogsContent />
    </ProtectedRoute>
  );
}

function ManageBlogsContent() {
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const { data: blogs, mutate } = useApi<Blog[]>('/blog/my-blogs');
  const { data: categories } = useApi<BlogCategory[]>('/blog-category');

  const handleDelete = async (blogId: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    setIsDeleting(blogId);
    try {
      await blogService.deleteBlog(blogId);
      toast.success('Blog deleted successfully');
      mutate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete blog');
    } finally {
      setIsDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-navy">Manage Blogs</h1>
          <Button onClick={() => setShowModal(true)}>Create New Blog</Button>
        </div>

        {!blogs ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : blogs.length === 0 ? (
          <Card>
            <p className="text-center text-gray-500 py-12">No blogs yet. Create your first blog!</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <Card key={blog.id}>
                {blog.thumbnailUrl && (
                  <div className="aspect-video mb-4 relative overflow-hidden rounded-lg">
                    <Image src={blog.thumbnailUrl} alt={blog.title} fill className="object-cover" />
                  </div>
                )}
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      blog.status === 'published'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {blog.status === 'published' ? 'Published' : 'Draft'}
                  </span>
                  {blog.publishedAt && (
                    <span className="text-sm text-gray-500">
                      {format(new Date(blog.publishedAt), 'MMM d, yyyy')}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setEditingBlog(blog);
                      setShowModal(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => handleDelete(blog.id)}
                    isLoading={isDeleting === blog.id}
                  >
                    Delete
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {showModal && (
          <BlogModal
            blog={editingBlog}
            categories={categories || []}
            onClose={() => {
              setShowModal(false);
              setEditingBlog(null);
            }}
            onSave={() => {
              mutate();
              setShowModal(false);
              setEditingBlog(null);
            }}
          />
        )}
      </div>
    </div>
  );
}

interface BlogModalProps {
  blog: Blog | null;
  categories: BlogCategory[];
  onClose: () => void;
  onSave: () => void;
}

function BlogModal({ blog, categories, onClose, onSave }: BlogModalProps) {
  const [title, setTitle] = useState(blog?.title || '');
  const [slug, setSlug] = useState(blog?.slug || '');
  const [content, setContent] = useState(blog?.content || '');
  const [excerpt, setExcerpt] = useState(blog?.excerpt || '');
  const [status, setStatus] = useState<'draft' | 'published'>(blog?.status === 'published' ? 'published' : 'draft');
  const [categoryId, setCategoryId] = useState(blog?.categoryId || '');
  const [tags, setTags] = useState<string[]>(blog?.tags || []);
  const [tagInput, setTagInput] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState(blog?.thumbnailUrl || '');
  const [thumbnailSource, setThumbnailSource] = useState<'upload' | 'external'>('external');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);
  const [autoSaveTimer, setAutoSaveTimer] = useState<NodeJS.Timeout | null>(null);

  // Auto-generate slug from title
  useEffect(() => {
    if (!blog && title && !slug) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      setSlug(generatedSlug);
    }
  }, [title, blog, slug]);

  // Auto-save draft every 15 seconds
  useEffect(() => {
    if (blog && status === 'draft' && (title || content)) {
      if (autoSaveTimer) {
        clearTimeout(autoSaveTimer);
      }
      const timer = setTimeout(async () => {
        try {
          await blogService.updateBlog(blog.id, {
            title: title || undefined,
            content: content || undefined,
            excerpt: excerpt || undefined,
            status: 'draft',
            slug: slug || undefined,
            tags: tags.length > 0 ? tags : undefined,
          });
          toast.success('Draft auto-saved', { duration: 2000 });
        } catch (error) {
          // Silent fail for auto-save
        }
      }, 15000);
      setAutoSaveTimer(timer);
      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [blog, title, content, excerpt, slug, tags, status, autoSaveTimer]);

  const handleImageUpload = useCallback(async (file: File): Promise<string> => {
    if (!blog) {
      throw new Error('Please save the blog first');
    }
    const result = await blogService.uploadMedia(blog.id, file);
    return result.url;
  }, [blog]);

  const handleSave = async (publish: boolean = false) => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in title and content');
      return;
    }

    setIsSaving(true);
    try {
      const blogData = {
        title,
        slug: slug || undefined,
        content,
        excerpt: excerpt || undefined,
        status: publish ? 'published' : status,
        categoryId: categoryId || undefined,
        thumbnailUrl: thumbnailUrl || undefined,
        thumbnailSource: thumbnailUrl ? thumbnailSource : undefined,
        tags: tags.length > 0 ? tags : undefined,
      };

      if (blog) {
        await blogService.updateBlog(blog.id, blogData);
        toast.success(publish ? 'Blog published successfully' : 'Blog updated successfully');
      } else {
        await blogService.createBlog(blogData);
        toast.success(publish ? 'Blog published successfully' : 'Blog created successfully');
      }
      onSave();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to save blog');
    } finally {
      setIsSaving(false);
    }
  };

  const handleThumbnailUpload = async (file: File) => {
    if (!blog) {
      toast.error('Please save the blog first before uploading thumbnail');
      return;
    }

    setUploadingThumbnail(true);
    try {
      const updatedBlog = await blogService.uploadThumbnail(blog.id, file);
      setThumbnailUrl(updatedBlog.thumbnailUrl || '');
      setThumbnailSource('upload');
      toast.success('Thumbnail uploaded successfully');
      onSave();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload thumbnail');
    } finally {
      setUploadingThumbnail(false);
    }
  };

  const addTag = () => {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-navy">{blog ? 'Edit Blog' : 'Create New Blog'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
              ×
            </button>
          </div>

          <div className="space-y-6">
            <Input
              label="Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter blog title"
            />

            <Input
              label="Slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="auto-generated-from-title"
            />

            <Textarea
              label="Excerpt (optional)"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Brief summary (first 150 chars will be used if empty)"
              rows={3}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="input"
              >
                <option value="">No category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Add tag and press Enter"
                  className="flex-1"
                />
                <Button type="button" onClick={addTag} size="sm">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 rounded text-sm flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="text-gray-500 hover:text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <TipTapEditor
              label="Content *"
              content={content}
              onChange={setContent}
              onImageUpload={blog ? handleImageUpload : undefined}
              placeholder="Start writing your blog post..."
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail</label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <select
                    value={thumbnailSource}
                    onChange={(e) => setThumbnailSource(e.target.value as 'upload' | 'external')}
                    className="input"
                  >
                    <option value="external">External URL</option>
                    <option value="upload">Upload File</option>
                  </select>
                </div>
                {thumbnailSource === 'external' ? (
                  <Input
                    value={thumbnailUrl}
                    onChange={(e) => setThumbnailUrl(e.target.value)}
                    placeholder="Paste image URL (e.g., from Google Images)"
                  />
                ) : blog ? (
                  <ImageUpload
                    label=""
                    onUpload={handleThumbnailUpload}
                    maxSizeMB={5}
                    maxWidthOrHeight={1200}
                  />
                ) : (
                  <p className="text-sm text-gray-500">Save blog first to upload thumbnail</p>
                )}
                {thumbnailUrl && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                    <Image src={thumbnailUrl} alt="Thumbnail preview" fill className="object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="draft"
                  name="status"
                  checked={status === 'draft'}
                  onChange={() => setStatus('draft')}
                  className="w-4 h-4"
                />
                <label htmlFor="draft" className="text-sm font-medium text-gray-700">
                  Draft
                </label>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="published"
                  name="status"
                  checked={status === 'published'}
                  onChange={() => setStatus('published')}
                  className="w-4 h-4"
                />
                <label htmlFor="published" className="text-sm font-medium text-gray-700">
                  Published
                </label>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t">
              <Button
                onClick={() => handleSave(false)}
                isLoading={isSaving}
                variant="outline"
                className="flex-1"
              >
                {blog ? 'Save' : 'Save Draft'}
              </Button>
              <Button
                onClick={() => handleSave(true)}
                isLoading={isSaving}
                className="flex-1 bg-coral hover:bg-coral/90"
              >
                {blog ? 'Update & Publish' : 'Publish'}
              </Button>
              <Button variant="secondary" onClick={onClose} className="flex-1">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
