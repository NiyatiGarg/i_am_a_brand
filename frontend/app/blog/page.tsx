"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApi } from "@/hooks/useApi";
import { Blog, BlogCategory, PaginatedResponse } from "@/types";
import { blogCategoryService } from "@/services/blog.service";
import { Card } from "@/components/Card";
import { Input } from "@/components/Input";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { format } from "date-fns";

export default function BlogListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { data: categories } = useApi<BlogCategory[]>("/blog-category");
  const { data, error, isLoading } = useApi<PaginatedResponse<Blog>>(
    `/blog?page=${page}&limit=9&search=${search}&categoryId=${selectedCategory}`
  );

  const blogs = data?.blogs || [];
  const pagination = data?.pagination;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        <p className="p-5">
          My content-writing journey started back in college, where I discovered
          how much I enjoy expressing ideas and sharing knowledge through words.
          Since then, I’ve continued writing whenever a topic excites me. For
          example, one of my recent well-researched blogs was about cutting off
          sugar and understanding our relationship with it.
          <br />
          <br />
          Skincare has also been a huge part of my life. I developed acne early,
          and because of that, I tried every possible remedy and experiment.
          Over time, I learned what actually works, what’s a myth, and why
          personalized skincare routines matter. Today, I’ve accepted myself as
          I am — but I also carry deep respect for proper skin care based on
          specific skin types.
          <br />
          <br />
          In the early days, I posted all kinds of blogs — skincare tips, fun
          topics, food, tech — on Blogger.com. But eventually, I wanted
          something that felt more personal and fully mine. So I created my own
          Skincare AI Website, bringing together my technical skills and love
          for skincare. The platform focuses on providing helpful,
          well-researched content to both men and women. Now, I’ve built this
          all-in-one personal website where I can post everything — development
          blogs, skincare topics, lifestyle, fitness, and personal growth. It’s
          my organized, creative space to keep everything I write in one place
          and share it with others.
        </p>
        {/* Search and Filter */}
        <div className="max-w-4xl mx-auto mb-8 space-y-4">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />

          {categories && categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("")}
                className={`px-4 py-2 rounded-lg ${
                  selectedCategory === ""
                    ? "bg-primary-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                All
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id);
                    setPage(1);
                  }}
                  className={`px-4 py-2 rounded-lg ${
                    selectedCategory === category.id
                      ? "bg-primary-600 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Blog List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-600">
            Error loading blogs
          </div>
        ) : blogs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No blogs found</div>
        ) : (
          <>
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {blogs.map((blog) => (
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
                    <h2 className="text-xl font-bold mb-2 line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {blog.content.substring(0, 150)}...
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        {blog.author?.avatarUrl && (
                          <Image
                            src={blog.author.avatarUrl}
                            alt={blog.author.name}
                            width={24}
                            height={24}
                            className="rounded-full"
                          />
                        )}
                        <span>{blog.author?.name}</span>
                      </div>
                      <span>
                        {format(new Date(blog.createdAt), "MMM d, yyyy")}
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center gap-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
                >
                  Previous
                </button>
                <span className="px-4 py-2">
                  Page {pagination.page} of {pagination.totalPages}
                </span>
                <button
                  onClick={() =>
                    setPage((p) => Math.min(pagination.totalPages, p + 1))
                  }
                  disabled={page === pagination.totalPages}
                  className="px-4 py-2 rounded-lg bg-gray-200 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
