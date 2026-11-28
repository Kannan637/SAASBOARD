import type { Metadata } from "next";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, CheckCircle2, Clock, User } from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug } from "@/data/blog-posts";
import { BlogPostCard } from "@/components/Blog/BlogListingClient";
import Contactus from "@/components/Home/Contactus";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((item) => item.id !== post.id).slice(
    0,
    2
  );

  return (
    <>
      <article className="bg-white text-brand-navy pt-10 sm:pt-14 pb-16 sm:pb-24">
        <div className="container-sash">
          <div className="max-w-4xl mx-auto">
            {/* Back link & Category */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 hover:text-brand-red transition-colors"
              >
                <ArrowLeft className="size-4" />
                <span>Back to all articles</span>
              </Link>

              <span className="eyebrow-label text-brand-red">
                {post.category}
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="text-brand-navy text-2xl sm:text-4xl lg:text-[44px] font-medium leading-[1.18] tracking-[-0.05px] mb-6">
              {post.title}
            </h1>

            {/* Publisher Name, Role, Date & Read Time */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pb-7 mb-8 border-b border-neutral-200/80 text-xs sm:text-sm text-neutral-600">
              <span className="inline-flex items-center gap-2 font-medium text-brand-navy">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-red-10 text-brand-red border border-brand-red/15">
                  <User className="size-4" aria-hidden="true" />
                </span>
                <span>
                  {post.publisherName}{" "}
                  <span className="text-neutral-400 font-normal">
                    · {post.publisherRole}
                  </span>
                </span>
              </span>

              <span className="inline-flex items-center gap-1.5">
                <Calendar className="size-4 text-neutral-400" aria-hidden="true" />
                <time dateTime={post.isoDate}>{post.publishedDate}</time>
              </span>

              <span className="inline-flex items-center gap-1.5 font-mono text-neutral-500">
                <Clock className="size-4 text-neutral-400" aria-hidden="true" />
                <span>{post.readTime}</span>
              </span>
            </div>

            {/* Featured Cover Image */}
            <div className="relative w-full h-64 sm:h-96 lg:h-[440px] rounded-[28px] overflow-hidden border border-black/[0.07] bg-neutral-100 mb-10 sm:mb-12">
              <Image
                src={post.imageSrc}
                alt={post.imageAlt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 896px"
                className="object-cover object-center"
              />
            </div>

            {/* Lead Summary */}
            <p className="text-base sm:text-lg text-brand-navy font-medium leading-relaxed mb-8">
              {post.description}
            </p>

            {/* Key Takeaways Box */}
            <div className="rounded-[24px] bg-neutral-100/70 border border-black/[0.06] p-6 sm:p-8 mb-10">
              <h2 className="text-base sm:text-lg font-medium text-brand-navy mb-4">
                Key Takeaways
              </h2>
              <ul className="space-y-3">
                {post.keyTakeaways.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-sm sm:text-base text-neutral-700 leading-relaxed"
                  >
                    <CheckCircle2 className="size-5 text-brand-red shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Sections */}
            <div className="space-y-8">
              {post.sections.map((section) => (
                <section key={section.heading} className="space-y-4">
                  <h2 className="text-xl sm:text-2xl font-medium text-brand-navy">
                    {section.heading}
                  </h2>
                  {section.paragraphs.map((para, idx) => (
                    <p
                      key={idx}
                      className="text-neutral-700 text-base leading-relaxed"
                    >
                      {para}
                    </p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Related Articles (2-Card Horizontal Grid) */}
      <section
        aria-labelledby="related-articles-heading"
        className="bg-neutral-100/50 border-t border-black/[0.06] py-16 sm:py-20"
      >
        <div className="container-sash">
          <div className="flex items-center justify-between gap-4 mb-8 sm:mb-10">
            <h2
              id="related-articles-heading"
              className="text-2xl sm:text-3xl font-medium text-brand-navy"
            >
              More network guides
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-brand-red hover:underline"
            >
              View all articles
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 lg:gap-9 items-stretch">
            {relatedPosts.map((related) => (
              <BlogPostCard key={related.id} post={related} />
            ))}
          </div>
        </div>
      </section>

      <Contactus />
    </>
  );
}
