"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useApi } from "@/hooks/useApi";
import { Blog, BlogCategory, PaginatedResponse } from "@/types";
import { Input } from "@/components/Input";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { format } from "date-fns";
import skincare from './skincare.avif';
import sugar from './sugar.webp';
import tech from './tech.jpg'

// ------------------ FEATURED ONLINE ARTICLES ------------------
const featuredReads = [
  {
    id: "f1",
    title: "How Sugar Affects Your Skin & Hormones",
    summary:
      "A beautifully written scientific breakdown on how sugar impacts acne, inflammation, and overall skin health.",
    thumbnailUrl: sugar,
    source: "DermaQuest",
    sourceUrl:
      "https://evergreen-blogs.blogspot.com/2025/11/our-relationship-with-sugar.html",
    publishedAt: "Dec 2025",
    category: "Wellness",
  },
  {
    id: "f2",
    title: "Frontend Performance: The Ultimate Guide",
    summary:
      "One of the best articles explaining real-world frontend optimization, perceived performance, and UX speed.",
    thumbnailUrl: tech,
    source: "medium.com",
    sourceUrl:
      "https://medium.com/@priyankadaida/ultimate-guide-to-front-end-performance-optimization-7e839a1bca35",
    publishedAt: "Nov 2024",
    category: "Tech",
  },
  {
    id: "f3",
    title: "Understanding Acne: A Dermatologist's Perspective",
    summary:
      "A dermatologist deep-dives into acne causes, treatments, myths, and real science behind clear skin.",
    thumbnailUrl: skincare,
    source: "DermaQuest",
    sourceUrl:
      "https://dermaquest.web.app/blog/17/Importance%20of%20Skin%20care",
    publishedAt: "Oct 2025",
    category: "Skincare",
  },
];

export default function BlogListPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch Categories
  const { data: categories } = useApi<BlogCategory[]>("/blog-category");

  // Fetch Blogs
  const { data, error, isLoading } = useApi<PaginatedResponse<Blog>>(
    `/blog?page=${page}&limit=9&search=${search}&categoryId=${selectedCategory}`
  );

  const blogs = data?.blogs || [];
  const pagination = data?.pagination;

  const showFeaturedReads = !isLoading && blogs.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-16">

        {/* PAGE TITLE */}
        <h1 className="text-4xl font-bold mb-6 text-center">Blog</h1>

        {/* SEARCH BAR */}
        <div className="max-w-4xl mx-auto mb-6">
          <Input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        {/* CATEGORY FILTERS */}
        <div className="max-w-4xl mx-auto flex gap-2 overflow-x-auto pb-3 mb-8">
          <button
            onClick={() => setSelectedCategory("")}
            className={`px-4 py-2 rounded-full whitespace-nowrap ${
              selectedCategory === ""
                ? "bg-primary-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            All
          </button>

          {categories?.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === cat.id
                  ? "bg-primary-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        )}

        {/* FEATURED READS (when backend has 0 blogs) */}
        {showFeaturedReads && (
          <div>
            <h2 className="text-2xl font-bold mb-4 text-center">
           While we prepare personal blogs, here are some of my favorite reads
            </h2>
            <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8">
              These are handpicked articles that inspired my skincare knowledge,
              development journey, and personal growth.
            </p>

            {/* FEATURED READS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredReads.map((item) => (
                <a
                  key={item.id}
                  href={item.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer">
                    
                    {/* IMAGE */}
                    <div className="relative h-44 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={item.thumbnailUrl || tech}
                        alt={item.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* CATEGORY */}
                    <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded-full mb-2 inline-block">
                      {item.category}
                    </span>

                    {/* TITLE */}
                    <h3 className="text-lg font-semibold mb-1">{item.title}</h3>

                    {/* SUMMARY */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {item.summary}
                    </p>

                    {/* SOURCE */}
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{item.source}</span>
                      <span>{item.publishedAt}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ACTUAL BLOG LIST */}
        {!showFeaturedReads && !isLoading && !error && blogs.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {blogs.map((blog) => (
                <Link key={blog.id} href={`/blog/${blog.id}`}>
                  <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4">
                    
                    {/* THUMBNAIL */}
                    <div className="relative h-44 mb-4 rounded-lg overflow-hidden">
                      <Image
                        src={blog.thumbnailUrl|| tech}
                        alt={blog.title}
                        fill
                        className="object-cover hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* TITLE */}
                    <h2 className="text-lg font-semibold mb-2">{blog.title}</h2>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {blog.content}
                    </p>

                    {/* AUTHOR + DATE */}
                    <div className="flex justify-between text-sm text-gray-500">
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

                      <span>{format(new Date(blog.createdAt), "MMM d, yyyy")}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* PAGINATION */}
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
