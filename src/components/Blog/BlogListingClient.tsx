"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Calendar, ChevronLeft, ChevronRight, User } from "lucide-react";
import CardCanvasPattern from "@/components/ui/card-canvas-pattern";
import { BLOG_POSTS, type BlogPost } from "@/data/blog-posts";

const MAX_CARDS_PER_PAGE = 8;

export function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <article className="md:col-span-6 group/blog rounded-[28px] bg-white border border-black/[0.07] shadow-[0_6px_28px_rgba(1,13,59,0.05)] hover:shadow-[0_14px_38px_rgba(1,13,59,0.10)] hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Top Section: Article Cover Image */}
      <Link
        href={`/blog/${post.slug}`}
        aria-label={`Read ${post.title}`}
        className="relative block w-full h-56 sm:h-64 lg:h-[275px] overflow-hidden bg-neutral-100 shrink-0"
      >
        <Image
          src={post.imageSrc}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center select-none transition-transform duration-500 ease-out group-hover/blog:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
        />
        <span className="absolute top-4 left-4 z-10 inline-flex items-center rounded-full bg-white/92 backdrop-blur-xs px-3 py-1 text-xs font-medium text-brand-navy border border-black/[0.06] shadow-xs">
          {post.category}
        </span>
      </Link>

      {/* Bottom Section: Details [Publisher Name, Date, Title, Description, Button] */}
      <div className="flex flex-1 flex-col justify-between p-6 sm:p-7 lg:p-8 bg-white">
        <div>
          {/* Publisher Name & Published Date */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs sm:text-sm text-neutral-500 mb-3.5">
            <span className="inline-flex items-center gap-1.5 font-medium text-brand-navy">
              <span className="inline-flex size-6 items-center justify-center rounded-full bg-red-10 text-brand-red border border-brand-red/15 shrink-0">
                <User className="size-3.5" aria-hidden="true" />
              </span>
              <span>{post.publisherName}</span>
            </span>

            <span aria-hidden="true" className="text-neutral-300">
              •
            </span>

            <span className="inline-flex items-center gap-1.5 text-neutral-500">
              <Calendar className="size-3.5 text-neutral-400 shrink-0" aria-hidden="true" />
              <time dateTime={post.isoDate}>{post.publishedDate}</time>
            </span>
          </div>

          {/* Article Title */}
          <h3 className="text-brand-navy text-xl sm:text-2xl font-medium leading-[1.3] tracking-[-0.05px] mb-3 group-hover/blog:text-brand-red transition-colors">
            <Link href={`/blog/${post.slug}`}>{post.title}</Link>
          </h3>

          {/* Article Description */}
          <p className="text-neutral-600 text-sm sm:text-[15px] font-normal leading-relaxed mb-6 line-clamp-3">
            {post.description}
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-2 border-t border-neutral-100 flex items-center justify-between gap-4 mt-auto">
          <Link
            href={`/blog/${post.slug}`}
            className="group/btn inline-flex h-11 min-h-[44px] items-center justify-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-hover px-5 sm:px-6 text-sm font-medium text-white transition-all duration-200 ease-out active:scale-[0.98]"
          >
            <span>Read article</span>
            <ChevronRight className="size-4 stroke-[2.5] transition-transform duration-200 ease-out group-hover/btn:translate-x-0.5" />
          </Link>

          <span className="text-xs font-mono text-neutral-400 hidden sm:inline">
            {post.readTime}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function BlogListingClient({
  posts = BLOG_POSTS,
}: {
  posts?: BlogPost[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const feedSectionRef = useRef<HTMLElement>(null);

  const totalPosts = posts.length;
  const totalPages = Math.max(1, Math.ceil(totalPosts / MAX_CARDS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);

  const startIndex = (safePage - 1) * MAX_CARDS_PER_PAGE;
  const endIndex = Math.min(startIndex + MAX_CARDS_PER_PAGE, totalPosts);
  const paginatedPosts = posts.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    if (clamped === safePage) return;
    setCurrentPage(clamped);

    if (typeof window !== "undefined" && feedSectionRef.current) {
      const yOffset =
        feedSectionRef.current.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top: Math.max(0, yOffset), behavior: "smooth" });
    }
  };

  return (
    <>
      {/* 1. Dedicated Full-Width Blog Hero Section */}
      <section
        data-apple-manual="true"
        aria-labelledby="blog-hero-heading"
        data-pattern="purple-grid"
        className="relative w-full h-[760px] sm:h-[800px] lg:h-[640px] xl:h-[680px] overflow-hidden select-none font-sans antialiased"
        style={{
          background:
            "linear-gradient(180deg, #E6CBF8 0%, #C1ABDA 15%, #9287B8 32%, #686193 50%, #444374 68%, #242859 84%, #081141 100%)",
        }}
      >
        {/* Procedural Canvas Pattern + Readability Scrim */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-0">
          <CardCanvasPattern pattern="purple-grid" patternOpacity={0.75} />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-black/20 lg:bg-transparent lg:bg-gradient-to-r lg:from-black/50 lg:via-black/25 lg:to-transparent pointer-events-none"
          />
        </div>

        <div className="container-sash h-full relative z-10">
          <div className="w-full h-full flex flex-col justify-between lg:grid lg:grid-cols-12 items-stretch relative">
            {/* Left Content Column (7 of 12 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-center items-center lg:items-start text-center lg:text-left py-8 px-2 sm:py-10 sm:px-0 lg:py-14 xl:py-16 z-20 flex-1 lg:flex-none min-h-0">
              {/* Breadcrumb */}
              <nav
                aria-label="Breadcrumb"
                className="text-xs sm:text-sm text-white/75 mb-4 flex items-center justify-center lg:justify-start"
              >
                <ol className="flex items-center gap-2">
                  <li>
                    <Link href="/" className="hover:text-white transition-colors">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true" className="text-white/45">
                    /
                  </li>
                  <li className="text-white font-medium" aria-current="page">
                    Blog
                  </li>
                </ol>
              </nav>

              {/* Eyebrow Pill */}
              <div className="inline-flex min-h-6 items-center justify-center gap-1.5 rounded-full bg-brand-red px-3.5 py-1 text-xs leading-none font-medium text-white tracking-wide">
                NETWORK ENGINEERING &amp; FIBRE JOURNAL
              </div>

              {/* Headline */}
              <h1
                id="blog-hero-heading"
                className="mt-3.5 sm:mt-4 text-2xl sm:text-3xl lg:text-[42px] xl:text-[46px] lg:leading-[52px] font-medium tracking-[-0.05px] text-white text-center lg:text-left text-balance"
              >
                Insights &amp; Guides for Faster Connectivity.
              </h1>

              {/* Subtitle */}
              <p className="mt-3.5 sm:mt-4 max-w-xl text-sm sm:text-base leading-relaxed font-normal text-white/85 tracking-[-0.05px] text-center lg:text-left">
                Field-tested guides on pure FTTH broadband, 1:1 enterprise leased
                lines, dual-band Wi-Fi optimization, and smart IP CCTV surveillance
                from SASH Broadband engineers across Tamil Nadu.
              </p>

              {/* Action Buttons */}
              <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center lg:justify-start gap-3.5 sm:gap-4 w-full">
                <a
                  href="#blog-articles"
                  className="inline-flex h-10 sm:h-11 min-h-[40px] items-center justify-center gap-2 rounded-full bg-brand-red hover:bg-brand-red-hover px-5 sm:px-6 text-sm font-medium text-white outline-2 -outline-offset-2 outline-white/20 transition-all duration-150 ease-out active:scale-[0.97]"
                >
                  <span>Browse Latest Articles</span>
                  <ChevronRight className="size-3.5 stroke-[2.5]" />
                </a>

                <Link
                  href="/contact"
                  className="group/sec inline-flex h-10 sm:h-11 min-h-[40px] items-center justify-center gap-1.5 text-sm font-medium text-white hover:text-white/80 transition-colors"
                >
                  <span>Check Fibre Availability</span>
                  <ChevronRight className="size-3.5 stroke-[2.5] transition-transform duration-150 group-hover/sec:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Right Visual Column (5 of 12 cols) */}
            <div className="lg:col-span-5 relative w-full h-[260px] sm:h-[320px] lg:h-full min-h-0 flex items-end justify-center lg:justify-end px-4 pt-2 pb-0 sm:px-6 sm:pt-4 sm:pb-0 lg:p-0 shrink-0">
              <div className="relative w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[520px] xl:max-w-[560px] h-full flex items-end justify-center lg:justify-end pointer-events-none select-none">
                <Image
                  src="/Hero/intranet.png"
                  alt="SASH Broadband optical engineering insights and guides"
                  width={1840}
                  height={1842}
                  priority
                  sizes="(max-width: 640px) 320px, (max-width: 1024px) 420px, 560px"
                  className="block w-full h-auto max-h-[260px] sm:max-h-[320px] lg:max-h-[540px] xl:max-h-[580px] object-contain object-bottom align-bottom mx-auto lg:mx-0"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Paginated Blog Articles Grid (Strictly 2 Horizontal Cards, Max 8 Cards Per Page) */}
      <section
        id="blog-articles"
        ref={feedSectionRef}
        data-apple-manual="true"
        aria-labelledby="blog-grid-heading"
        className="bg-white text-brand-navy section-padding"
      >
        <div className="container-sash">
          {/* Section Header + Top Page Status */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-14 pb-6 border-b border-neutral-200/80">
            <div className="max-w-2xl">
              <p className="eyebrow-label text-brand-red mb-3">
                LATEST PUBLICATIONS
              </p>
              <h2
                id="blog-grid-heading"
                className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[42px] tracking-normal leading-[1.15]"
              >
                Broadband, enterprise &amp;{" "}
                <span className="text-brand-red">network guides.</span>
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-neutral-500 font-mono shrink-0">
              Showing {startIndex + 1}–{endIndex} of {totalPosts} articles
            </p>
          </div>

          {/* 12-Column Grid: Strictly 2 Cards Horizontally (md:col-span-6), Max 8 Cards Per Page */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-9 items-stretch">
            {paginatedPosts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination UI (Displayed whenever total cards exceed 8) */}
          {totalPosts > MAX_CARDS_PER_PAGE && (
            <nav
              aria-label="Blog pagination"
              className="mt-12 sm:mt-16 pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-5"
            >
              <p className="text-xs sm:text-sm text-neutral-500 order-2 sm:order-1">
                Page <span className="font-medium text-brand-navy">{safePage}</span>{" "}
                of <span className="font-medium text-brand-navy">{totalPages}</span>
              </p>

              <div className="flex items-center gap-2 order-1 sm:order-2">
                {/* Previous Page Button */}
                <button
                  type="button"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage <= 1}
                  aria-label="Previous page"
                  className="inline-flex h-10 sm:h-11 items-center justify-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-4 sm:px-5 text-sm font-medium text-brand-navy transition-colors hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  <ChevronLeft className="size-4" />
                  <span>Previous</span>
                </button>

                {/* Page Number Pills */}
                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, idx) => {
                    const pageNum = idx + 1;
                    const isActive = pageNum === safePage;
                    return (
                      <button
                        key={`blog-page-${pageNum}`}
                        type="button"
                        onClick={() => goToPage(pageNum)}
                        aria-label={`Page ${pageNum}`}
                        aria-current={isActive ? "page" : undefined}
                        className={`inline-flex size-10 sm:size-11 items-center justify-center rounded-full text-sm font-medium transition-all cursor-pointer ${
                          isActive
                            ? "bg-brand-red text-white shadow-[0_4px_14px_rgba(222,3,2,0.28)]"
                            : "bg-white text-brand-navy border border-black/[0.08] hover:bg-neutral-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                {/* Next Page Button */}
                <button
                  type="button"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage >= totalPages}
                  aria-label="Next page"
                  className="inline-flex h-10 sm:h-11 items-center justify-center gap-1.5 rounded-full border border-black/[0.08] bg-white px-4 sm:px-5 text-sm font-medium text-brand-navy transition-colors hover:bg-neutral-100 disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </nav>
          )}
        </div>
      </section>
    </>
  );
}
