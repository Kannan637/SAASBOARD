"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Heart, Share2, Star } from "lucide-react";
import { AppleReveal } from "@/components/ui/apple-scroll";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

function GoogleLogoIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <title>Google Review</title>
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96Z"
      />
    </svg>
  );
}

export interface GoogleReviewItem {
  name: string;
  meta: string;
  avatar?: string;
  fallbackColor: string;
  isLocalGuide?: boolean;
  rating: number;
  text: string;
  date: string;
  likes: number;
}

export const GOOGLE_REVIEWS: GoogleReviewItem[] = [
  {
    name: "LOKESH V.S",
    meta: "Local Guide · 92 reviews",
    fallbackColor: "#0284C7",
    isLocalGuide: true,
    rating: 5,
    text: "Best internet provider in Chennai, Tiruvallur, Kancheepuram, Chengalpattu who has best bandwidth signal in multiple locations from day one my usage till now no signal problem or speed issue and latency and pinging the website are easily accessible and the package amount also affordable value for money.",
    date: "a year ago",
    likes: 3,
  },
  {
    name: "Joy Prakash",
    meta: "4 reviews",
    fallbackColor: "#EA580C",
    rating: 5,
    text: "Would like to rate with all five gold stars for the SASH Broadband whose quality of network, speed and services are simply extraordinary 👌 Best choice for WFH.. Very much reliable service with consistent delivery, high download speed and so on.. Thanks to the team for providing 24x7 support.",
    date: "4 years ago",
    likes: 1,
  },
  {
    name: "RAJESH Devaraj",
    meta: "6 reviews",
    fallbackColor: "#2563EB",
    rating: 5,
    text: "I'm using this broadband service over the past one year at my home for WFH. Network connectivity and availability were good. They consistently maintained the download and upload speed as per the plan that we have subscribed. Their technical support team is really knowledgeable and able to fix any issues reported.",
    date: "4 years ago",
    likes: 2,
  },
  {
    name: "Sudhakar M",
    meta: "3 reviews",
    fallbackColor: "#DC2626",
    rating: 5,
    text: "It has been a good experience overall. SASH provides one of the best customer service. Great network and connectivity across our area.",
    date: "3 years ago",
    likes: 1,
  },
  {
    name: "Yuvaraj",
    meta: "Local Guide · 9 reviews · 17 photos",
    fallbackColor: "#9333EA",
    isLocalGuide: true,
    rating: 5,
    text: "I'm using this broadband over a year. Good customer support and stable connectivity 👌",
    date: "3 years ago",
    likes: 1,
  },
  {
    name: "Gokul S",
    meta: "6 reviews",
    fallbackColor: "#059669",
    rating: 5,
    text: "One of the best bandwidth services that considers the customer's best interest and flexible for customer needs.",
    date: "4 years ago",
    likes: 1,
  },
  {
    name: "Sri Dharan",
    meta: "12 reviews",
    fallbackColor: "#4F46E5",
    rating: 5,
    text: "Very professional service. Appreciable one. Flexible on demand.",
    date: "3 years ago",
    likes: 1,
  },
  {
    name: "sudalai mani",
    meta: "Local Guide · 5 reviews · 3 photos",
    fallbackColor: "#D97706",
    isLocalGuide: true,
    rating: 5,
    text: "Very fastest internet speed, best price and good customer services.",
    date: "3 years ago",
    likes: 1,
  },
  {
    name: "Prabakaran Jothi",
    meta: "2 reviews",
    fallbackColor: "#6D28D9",
    rating: 5,
    text: "Very Good Internet connection & very Good Service 👍 Good Technical Team & Flexible Organization.",
    date: "3 years ago",
    likes: 2,
  },
];

function ReviewCard({ review: t }: { review: GoogleReviewItem }) {
  return (
    <Card className="bg-muted/50 h-full w-full flex flex-col justify-between rounded-xl pb-4 shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),0px_0px_0px_1px_rgba(0,0,0,0.08),0px_1px_2px_-1px_rgba(0,0,0,0.08),0px_2px_4px_0px_rgba(0,0,0,0.06)] ring-0 transition-all duration-200 hover:shadow-[inset_0px_1px_0px_0px_rgba(255,255,255,1),0px_0px_0px_1px_rgba(0,0,0,0.08),0px_6px_8px_0px_rgba(0,0,0,0.1)]">
      <div>
        <div className="flex items-start justify-between px-4 mb-3">
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10">
              {t.avatar && <AvatarImage src={t.avatar} alt={t.name} />}
              <AvatarFallback
                style={{ backgroundColor: t.fallbackColor }}
                className="text-white font-semibold text-sm uppercase"
              >
                {t.name[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col leading-tight">
              <div className="flex items-center gap-1">
                <span className="text-foreground text-sm font-semibold">
                  {t.name}
                </span>
                <CheckCircle className="h-3.5 w-3.5 fill-sky-500 text-white" />
              </div>

              <span className="text-muted-foreground text-xs mt-0.5">
                {t.meta}
              </span>
            </div>
          </div>

          <GoogleLogoIcon className="h-4 w-4 shrink-0 mt-0.5" />
        </div>

        {/* 5 Gold Google Stars */}
        <div className="flex items-center gap-1 px-4 mb-2.5">
          <div
            className="flex items-center gap-0.5 text-[#FBBC05]"
            aria-label={`${t.rating} out of 5 stars`}
          >
            {Array.from({ length: t.rating }).map((_, starIdx) => (
              <Star
                key={starIdx}
                className="h-3.5 w-3.5 fill-[#FBBC05] text-[#FBBC05]"
              />
            ))}
          </div>
          <span className="text-muted-foreground text-xs ml-1.5">
            {t.date}
          </span>
        </div>

        <p className="text-foreground text-sm sm:text-[15px] px-4 leading-relaxed mb-4">
          {t.text}
        </p>
      </div>

      <div className="flex flex-row items-center justify-between px-4 pt-2 border-t border-black/[0.05]">
        <div className="text-muted-foreground text-xs font-medium flex items-center gap-1.5">
          <span>Posted on Google</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label={`Helpful review by ${t.name}`}
            className="text-muted-foreground flex items-center gap-1 text-xs font-medium transition-colors hover:text-brand-red cursor-pointer"
          >
            <Heart className="h-3.5 w-3.5" />
            <span>{t.likes}</span>
          </button>
          <button
            type="button"
            aria-label={`Share review by ${t.name}`}
            className="text-muted-foreground flex items-center gap-1 text-xs font-medium transition-colors hover:text-brand-navy cursor-pointer"
          >
            <Share2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </Card>
  );
}

export interface Testimonials3Props {
  eyebrow?: string;
  heading?: string;
  description?: string;
  reviews?: GoogleReviewItem[];
}

export default function Testimonials3({
  eyebrow = "GOOGLE REVIEWS",
  heading = "Trusted by homes & enterprises across Tamil Nadu",
  description = "Real 5-star Google reviews from customers and businesses using SASH Broadband every day.",
  reviews = GOOGLE_REVIEWS,
}: Testimonials3Props) {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    if (!carouselApi) return;

    const updateActive = () => {
      setActiveSlide(carouselApi.selectedScrollSnap());
    };

    const rafId = window.requestAnimationFrame(updateActive);
    carouselApi.on("select", updateActive);
    carouselApi.on("reInit", updateActive);

    return () => {
      window.cancelAnimationFrame(rafId);
      carouselApi.off("select", updateActive);
      carouselApi.off("reInit", updateActive);
    };
  }, [carouselApi]);

  return (
    <section
      id="testimonials"
      data-apple-manual="true"
      aria-labelledby="testimonials-heading"
      className="theme-injected bg-background section-padding"
    >
      <div className="container-sash">
        <AppleReveal className="mb-12 flex flex-col items-center text-center sm:mb-16 lg:mb-20 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-[#EFF4FE] text-[#2563EB] mb-3.5">
            <GoogleLogoIcon className="h-3.5 w-3.5" />
            <span>{eyebrow}</span>
          </span>
          <h2
            id="testimonials-heading"
            className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] mb-3.5"
          >
            {heading}
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed font-normal">
            {description}
          </p>
        </AppleReveal>

        {/* Mobile Carousel (< md) */}
        <div className="md:hidden">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setCarouselApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4 py-1">
              {reviews.map((review, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-4 basis-[88%] sm:basis-[65%] flex"
                >
                  <ReviewCard review={review} />
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Controls: Arrows + Pagination Dots */}
            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <CarouselPrevious className="relative inset-0 size-9 rounded-lg border border-border/80 bg-white text-brand-navy hover:border-brand-navy/30 hover:bg-neutral-100 transition-colors cursor-pointer" />
                <CarouselNext className="relative inset-0 size-9 rounded-lg border-transparent bg-brand-red text-white shadow-[0_4px_12px_rgba(222,3,2,0.25)] hover:bg-brand-red-hover transition-all cursor-pointer" />
              </div>

              <div
                className="flex items-center gap-1.5"
                role="tablist"
                aria-label="Google reviews carousel pagination"
              >
                {reviews.map((review, idx) => (
                  <button
                    key={idx}
                    type="button"
                    role="tab"
                    aria-selected={activeSlide === idx}
                    aria-label={`Show review by ${review.name}`}
                    onClick={() => carouselApi?.scrollTo(idx)}
                    className={`h-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                      activeSlide === idx
                        ? "w-6 bg-brand-red"
                        : "w-2 bg-neutral-300 hover:bg-neutral-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </Carousel>
        </div>

        {/* Desktop & Tablet Grid (>= md) */}
        <div className="hidden md:grid mx-auto max-w-6xl md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {reviews.map((review, idx) => (
            <div key={idx} className="flex">
              <ReviewCard review={review} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
