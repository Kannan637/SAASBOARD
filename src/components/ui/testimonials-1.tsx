"use client";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AppleReveal } from "@/components/ui/apple-scroll";

export interface TestimonialItem {
  id: number | string;
  heading: string;
  quote: string;
  author: string;
  role: string;
  location: string;
  serviceTag?: string;
  avatarUrl?: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    heading: '"Zero buffering even on 4K TV"',
    quote:
      "We switched our home in Jaya Nagar to the 100 Mbps Family Pack. Online classes, office video calls, and evening 4K streaming run simultaneously without a single drop.",
    author: "Karthik Sundaram",
    role: "Home Fibre Customer",
    location: "Jaya Nagar, Thiruvallur",
    serviceTag: "Family Pack",
  },
  {
    id: 2,
    heading: '"Local team actually answers calls"',
    quote:
      "Unlike big national ISPs where tickets sit for days, SASH's local engineer checked our optical patch within two hours when our street pole shifted.",
    author: "Priya Narayanan",
    role: "Clinic Administrator",
    location: "Kakkalur, Thiruvallur",
    serviceTag: "SME Internet",
  },
  {
    id: 3,
    heading: '"1:1 speeds match the SLA"',
    quote:
      "Our manufacturing unit needed dedicated symmetrical upload for ERP backups and VPN tunnels. SASH's 1:1 leased line has stayed rock solid month after month.",
    author: "Senthil Kumar R.",
    role: "IT Operations Manager",
    location: "Ambattur Industrial Estate",
    serviceTag: "1:1 Leased Line",
  },
  {
    id: 4,
    heading: '"Free installation & honest tariff"',
    quote:
      "Paid zero setup fees on our Personal Pack and our monthly bill has stayed locked at ₹650 plus GST with truly unlimited data—no sudden post-FUP slowdowns.",
    author: "Divya Balasubramanian",
    role: "Software Consultant",
    location: "Avadi, Chennai",
    serviceTag: "Personal Pack",
  },
  {
    id: 5,
    heading: '"Crisp mobile view for 12 cameras"',
    quote:
      "SASH installed HD IP CCTV cameras across our warehouse and linked them over fibre. Live playback from my phone is instant even on the move.",
    author: "Murali Krishnan",
    role: "Warehouse Proprietor",
    location: "Tiruvallur High Road",
    serviceTag: "CCTV & Fibre",
  },
  {
    id: 6,
    heading: '"Branches linked like one LAN"',
    quote:
      "Connecting our three retail billing counters in Thiruvallur and Tiruttani onto one private SASH intranet made daily stock reconciliation effortless.",
    author: "Anandhi Venkatesh",
    role: "Retail Chain Director",
    location: "Tiruttani & Thiruvallur",
    serviceTag: "Multi-Site Intranet",
  },
];

export interface Testimonials1Props {
  eyebrow?: string;
  heading?: string;
  description?: string;
  items?: TestimonialItem[];
}

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Testimonials1({
  eyebrow = "Customer Stories",
  heading = "Trusted across Thiruvallur & Tamil Nadu",
  description = "See how homes, clinics, retail stores, and enterprises stay connected with SASH Broadband's local FTTH fibre network.",
  items = DEFAULT_TESTIMONIALS,
}: Testimonials1Props) {
  return (
    <section
      id="testimonials"
      data-apple-manual="true"
      aria-labelledby="testimonials-heading"
      className="bg-white text-brand-navy w-full section-padding"
    >
      <div className="container-sash">
        <AppleReveal className="mb-14 flex flex-col items-center text-center max-w-2xl mx-auto">
          <p className="eyebrow-label mb-3">{eyebrow}</p>
          <h2 id="testimonials-heading" className="text-brand-navy mb-4">
            {heading}
          </h2>
          <p className="text-neutral-600 text-base md:text-lg leading-relaxed">
            {description}
          </p>
        </AppleReveal>

        <div className="relative mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="px-1 py-2">
              {items.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="basis-full md:basis-1/2 lg:basis-1/3"
                >
                  <Card className="bg-neutral-100/75 border border-neutral-100 ring-0 flex h-full min-h-[320px] flex-col justify-between rounded-[24px] p-7 transition-colors duration-200 hover:border-brand-red/30 select-none">
                    <div>
                      {testimonial.serviceTag && (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-red-10 text-brand-red font-mono text-[11px] font-medium tracking-wide uppercase mb-4">
                          {testimonial.serviceTag}
                        </span>
                      )}
                      <h3 className="text-brand-navy mb-3 text-xl sm:text-2xl leading-snug font-medium">
                        {testimonial.heading}
                      </h3>
                      <p className="text-neutral-600 mb-8 text-[15px] leading-relaxed md:text-base">
                        {testimonial.quote}
                      </p>
                    </div>

                    <div className="flex items-center gap-3.5 pt-4 border-t border-brand-navy/10">
                      <Avatar className="border border-brand-navy/15 h-11 w-11 shrink-0">
                        {testimonial.avatarUrl && (
                          <AvatarImage
                            src={testimonial.avatarUrl}
                            alt={testimonial.author}
                          />
                        )}
                        <AvatarFallback className="bg-brand-navy text-white font-mono text-xs font-medium">
                          {getInitials(testimonial.author)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-brand-navy font-medium text-sm sm:text-base truncate">
                          {testimonial.author}
                        </p>
                        <p className="text-neutral-600 mt-0.5 text-xs sm:text-sm truncate">
                          {testimonial.role}{" "}
                          <span className="text-brand-red font-medium">
                            • {testimonial.location}
                          </span>
                        </p>
                      </div>
                    </div>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="mt-10 flex w-full justify-center gap-3">
              <CarouselPrevious className="relative inset-0 size-10 rounded-sm border border-brand-navy/20 bg-white text-brand-navy hover:border-brand-navy hover:bg-neutral-100 transition-colors cursor-pointer" />
              <CarouselNext className="relative inset-0 size-10 rounded-sm border-transparent bg-linear-to-b from-brand-red to-brand-red-hover text-white shadow-[0_6px_20px_var(--color-red-10)] outline-2 -outline-offset-2 outline-white/20 hover:from-brand-red-hover hover:to-brand-red-hover hover:text-white transition-all cursor-pointer" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
