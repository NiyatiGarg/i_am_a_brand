'use client';

import React, { useRef, useState } from 'react';
import { useImageCompression } from '@/hooks/useImageCompression';
import { LoadingSpinner } from './LoadingSpinner';

interface ImageUploadProps {
  onUpload: (file: File) => Promise<void>;
  label?: string;
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  accept?: string;
}

export function ImageUpload({
  onUpload,
  label = 'Upload Image',
  maxSizeMB = 5,
  maxWidthOrHeight = 1920,
  accept = 'image/*',
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const { compressImage, compressing } = useImageCompression();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      // Compress image
      const compressedFile = await compressImage(file, {
        maxSizeMB,
        maxWidthOrHeight,
      });

      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(compressedFile);

      // Upload
      await onUpload(compressedFile);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary-500 transition-colors">
        {preview ? (
          <div className="space-y-4">
            <img
              src={preview}
              alt="Preview"
              className="max-h-64 mx-auto rounded-lg"
            />
            <button
              type="button"
              onClick={() => {
                setPreview(null);
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
              }}
              className="text-sm text-red-600 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ) : (
          <>
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading || compressing}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading || compressing}
              className="btn btn-outline"
            >
              {uploading || compressing ? (
                <span className="flex items-center">
                  <LoadingSpinner size="sm" className="mr-2" />
                  {compressing ? 'Compressing...' : 'Uploading...'}
                </span>
              ) : (
                'Choose File'
              )}
            </button>
            <p className="mt-2 text-sm text-gray-500">
              Max size: {maxSizeMB}MB
            </p>
          </>
        )}
      </div>
    </div>
  );
}

