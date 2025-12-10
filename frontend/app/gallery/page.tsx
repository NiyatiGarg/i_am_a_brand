'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useApi } from '@/hooks/useApi';
import { galleryService } from '@/services/gallery.service';
import { useAdmin } from '@/context/AdminContext';
import { AdminToolbar } from '@/components/AdminToolbar';
import { Button } from '@/components/Button';
import type { GalleryImage } from '@/services/gallery.service';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';

export default function GalleryPage() {
  const { isAdmin, isEditing, setPendingChanges } = useAdmin();
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const { data: galleryImages, mutate } = useApi<GalleryImage[]>('/gallery');

  const gallery = galleryImages || [];

  const handleUpload = async (file: File) => {
    try {
      await galleryService.uploadImage(file);
      mutate();
      toast.success('Image uploaded successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to upload image');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this image?')) return;
    try {
      await galleryService.deleteImage(id);
      mutate();
      toast.success('Image deleted');
    } catch (error: any) {
      toast.error('Failed to delete image');
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <AdminToolbar />
      <div className="container mx-auto px-4 py-16">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-navy">Gallery</h1>
          <Link href="/" className="text-coral hover:underline">
            ← Back to Home
          </Link>
        </div>

        {isEditing && isAdmin && (
          <div className="mb-6">
            <ImageUploadZone onUpload={handleUpload} />
          </div>
        )}

        {gallery.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-600">No images in gallery yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {gallery.map((img) => (
              <div
                key={img.id}
                className="relative aspect-square rounded-2xl overflow-hidden group cursor-pointer"
                onClick={() => setLightboxImage(img.url)}
              >
                <Image
                  src={img.url}
                  alt={img.alt || 'Gallery image'}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                {isEditing && isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(img.id);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-full">
            <Image
              src={lightboxImage}
              alt="Gallery"
              width={1200}
              height={800}
              className="object-contain max-h-[90vh]"
            />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 text-white text-2xl hover:text-coral"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function ImageUploadZone({ onUpload }: { onUpload: (file: File) => void }) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onUpload(acceptedFiles[0]);
      }
    },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive ? 'border-coral bg-coral/10' : 'border-gray-300 hover:border-coral'
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        {isDragActive ? 'Drop image here' : 'Drag & drop image or click to upload'}
      </p>
    </div>
  );
}

