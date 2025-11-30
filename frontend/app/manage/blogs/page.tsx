'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApi } from '@/hooks/useApi';
import { Blog, BlogCategory } from '@/types';
import { blogService, blogCategoryService } from '@/services/blog.service';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { MarkdownEditor } from '@/components/MarkdownEditor';
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Manage Blogs</h1>
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
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      blog.isPublic
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {blog.isPublic ? 'Public' : 'Private'}
                  </span>
                  <span className="text-sm text-gray-500">
                    {format(new Date(blog.createdAt), 'MMM d, yyyy')}
                  </span>
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
  const [content, setContent] = useState(blog?.content || '');
  const [isPublic, setIsPublic] = useState(blog?.isPublic ?? true);
  const [categoryId, setCategoryId] = useState(blog?.categoryId || '');
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setIsSaving(true);
    try {
      if (blog) {
        await blogService.updateBlog(blog.id, {
          title,
          content,
          isPublic,
          categoryId: categoryId || undefined,
        });
        toast.success('Blog updated successfully');
      } else {
        const newBlog = await blogService.createBlog({
          title,
          content,
          isPublic,
          categoryId: categoryId || undefined,
        });
        toast.success('Blog created successfully');
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
      await blogService.uploadThumbnail(blog.id, file);
      toast.success('Thumbnail uploaded successfully');
      onSave();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload thumbnail');
    } finally {
      setUploadingThumbnail(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{blog ? 'Edit Blog' : 'Create New Blog'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              ✕
            </button>
          </div>

          <div className="space-y-6">
            <Input
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
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

            <MarkdownEditor
              label="Content"
              value={content}
              onChange={setContent}
            />

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-4 h-4"
              />
              <label htmlFor="isPublic" className="text-sm font-medium text-gray-700">
                Make this blog public
              </label>
            </div>

            {blog && (
              <ImageUpload
                label="Thumbnail"
                onUpload={handleThumbnailUpload}
                maxSizeMB={2}
                maxWidthOrHeight={1200}
              />
            )}

            <div className="flex gap-4">
              <Button onClick={handleSave} isLoading={isSaving} className="flex-1">
                {blog ? 'Update' : 'Create'} Blog
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

