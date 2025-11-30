'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useApi } from '@/hooks/useApi';
import { User, Blog } from '@/types';
import { Card } from '@/components/Card';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';

export default function ProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const { user: currentUser } = useAuth();
  const [showEditModal, setShowEditModal] = useState(false);

  const { data: profile, error, isLoading } = useApi<User & { blogs?: Blog[] }>(`/user/${userId}`);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">User not found</h1>
        </div>
      </div>
    );
  }

  const isOwnProfile = currentUser?.id === userId;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          <Card className="mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {profile.avatarUrl && (
                <Image
                  src={profile.avatarUrl}
                  alt={profile.name}
                  width={120}
                  height={120}
                  className="rounded-full"
                />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{profile.name}</h1>
                    <p className="text-gray-600 mb-2">{profile.email}</p>
                    {profile.bio && <p className="text-gray-700">{profile.bio}</p>}
                  </div>
                  {isOwnProfile && (
                    <Button variant="outline" onClick={() => setShowEditModal(true)}>
                      Edit Profile
                    </Button>
                  )}
                </div>

                {/* Social Links */}
                {profile.socialLinks && Object.keys(profile.socialLinks).length > 0 && (
                  <div className="flex gap-4 mt-4">
                    {Object.entries(profile.socialLinks).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700"
                      >
                        {platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>

          {/* Public Blogs */}
          {profile.blogs && profile.blogs.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Public Blogs</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile.blogs.map((blog) => (
                  <Link key={blog.id} href={`/blog/${blog.id}`}>
                    <Card className="h-full hover:scale-105 transition-transform">
                      {blog.thumbnailUrl && (
                        <div className="aspect-video mb-4 relative overflow-hidden rounded-lg">
                          <Image
                            src={blog.thumbnailUrl}
                            alt={blog.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

