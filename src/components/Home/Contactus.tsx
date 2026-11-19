"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Clock,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react";
import {
  AppleReveal,
} from "@/components/ui/apple-scroll";
import { Button } from "@/components/ui/button";

export const PLAN_DROPDOWN_OPTIONS = [
  "Personal Pack — 50 Mbps (₹650/month)",
  "Family Pack — 100 Mbps (₹799/month)",
  "Corporate Pack — Business Fibre (₹1,499/month)",
  "1:1 Dedicated Internet Leased Line",
  "SME Business Internet",
  "HD IP CCTV Surveillance",
  "Private Multi-Site Intranet",
] as const;

export const SASH_OFFICE_NAME = "Sash Broadband Pvt Ltd";
export const SASH_OFFICE_ADDRESS =
  "No. 1/401, Kondancheri Post, Perambakkam (Via Tiruvallur District - 631 402 Kadambattur, Block, Kondancheri, Kondanjerry, Tamil Nadu 631402";

export const SASH_GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Sash%20Broadband%20Pvt%20Ltd%2C%20No.%201%2F401%2C%20Kondancheri%20Post%2C%20Perambakkam%2C%20Tiruvallur%20District%20631402%2C%20Kadambattur%20Block%2C%20Kondancheri%2C%20Kondanjerry%2C%20Tamil%20Nadu%20631402&t=&z=15&ie=UTF8&iwloc=&output=embed";

export const SASH_GOOGLE_MAPS_SEARCH_URL =
  "https://www.google.com/maps/search/?api=1&query=Sash+Broadband+Pvt+Ltd+No.+1%2F401+Kondancheri+Post+Perambakkam+Tiruvallur+District+631402+Kadambattur+Block+Kondancheri+Kondanjerry+Tamil+Nadu+631402";

function resolveMatchingPlanOption(
  planHint?: string,
  interestHint?: string
): string {
  const combined = `${planHint ?? ""} ${interestHint ?? ""}`.toLowerCase();
  if (combined.includes("personal") || combined.includes("50 mbps")) {
    return PLAN_DROPDOWN_OPTIONS[0];
  }
  if (combined.includes("family") || combined.includes("100 mbps")) {
    return PLAN_DROPDOWN_OPTIONS[1];
  }
  if (combined.includes("corporate") || combined.includes("1,499")) {
    return PLAN_DROPDOWN_OPTIONS[2];
  }
  if (combined.includes("leased")) {
    return PLAN_DROPDOWN_OPTIONS[3];
  }
  if (combined.includes("sme") || combined.includes("business")) {
    return PLAN_DROPDOWN_OPTIONS[4];
  }
  if (combined.includes("cctv")) {
    return PLAN_DROPDOWN_OPTIONS[5];
  }
  if (combined.includes("intranet")) {
    return PLAN_DROPDOWN_OPTIONS[6];
  }
  return PLAN_DROPDOWN_OPTIONS[0];
}

interface FormState {
  fullName: string;
  mobile: string;
  selectedPlan: string;
  email: string;
  message: string;
}

interface FormErrors {
  fullName?: string;
  mobile?: string;
  selectedPlan?: string;
  email?: string;
  form?: string;
}

export default function Contactus({
  defaultInterest = "Home broadband",
  defaultPlan = "",
}: {
  defaultInterest?: string;
  defaultPlan?: string;
}) {
  const [form, setForm] = useState<FormState>({
    fullName: "",
    mobile: "",
    selectedPlan: resolveMatchingPlanOption(defaultPlan, defaultInterest),
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Sync optional query params (?plan=...&interest=...) when navigated from inner/other pages
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const planParam = params.get("plan");
    const interestParam = params.get("interest");
    if (!planParam && !interestParam) return;

    const rafId = window.requestAnimationFrame(() => {
      setForm((prev) => ({
        ...prev,
        selectedPlan: resolveMatchingPlanOption(
          planParam || undefined,
          interestParam || undefined
        ),
      }));
    });

    return () => window.cancelAnimationFrame(rafId);
  }, []);

  // Listen for plan selection events dispatched from Pricing / Business cards
  useEffect(() => {
    function handleSelectPlanEvent(e: Event) {
      const customEvent = e as CustomEvent<{
        planName?: string;
        price?: string;
        speed?: string;
        interest?: string;
      }>;
      if (customEvent.detail) {
        const { planName, interest } = customEvent.detail;
        setSubmittedSuccess(false);
        setForm((prev) => ({
          ...prev,
          selectedPlan: resolveMatchingPlanOption(planName, interest),
        }));
      }
    }

    window.addEventListener("sash:select-plan", handleSelectPlanEvent);
    return () => {
      window.removeEventListener("sash:select-plan", handleSelectPlanEvent);
    };
  }, []);

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};

    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      newErrors.fullName = "Please enter your name.";
    }

    const cleanedMobile = form.mobile.replace(/[\s-]/g, "");
    if (!cleanedMobile) {
      newErrors.mobile = "Please enter your 10-digit mobile number.";
    } else if (!/^(?:\+91)?[6-9]\d{9}$/.test(cleanedMobile)) {
      newErrors.mobile =
        "Enter a valid 10-digit mobile number (e.g., 9003009353).";
    }

    if (!form.selectedPlan.trim()) {
      newErrors.selectedPlan = "Please select a plan option.";
    }

    if (
      form.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: form.fullName.trim(),
          mobile: form.mobile.trim(),
          selectedPlan: form.selectedPlan,
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };

      if (!response.ok || !data.ok) {
        setErrors({
          form:
            data.error ||
            "Could not submit your request. Please call us at +91 90030 09353.",
        });
      } else {
        setSubmittedSuccess(true);
        setForm({
          fullName: "",
          mobile: "",
          selectedPlan: PLAN_DROPDOWN_OPTIONS[0],
          email: "",
          message: "",
        });
      }
    } catch {
      setErrors({
        form: "Network error while submitting. Please call +91 90030 09353 or chat on WhatsApp.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const baseInputClass = (hasError?: boolean) =>
    `w-full h-10 pl-9 pr-3.5 rounded-xl bg-white border text-sm font-normal text-brand-navy placeholder:text-neutral-600/55 transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-3 ${hasError
      ? "border-brand-red focus:border-brand-red focus:ring-brand-red/15"
      : "border-brand-navy/15 hover:border-brand-navy/30 focus:border-brand-red focus:ring-brand-red/12"
    }`;

  return (
    <section
      id="contact"
      data-apple-manual="true"
      aria-labelledby="contact-heading"
      className="bg-transparent text-brand-navy section-padding"
    >
      <div className="container-sash">
        {/* Centered Section Header */}
        <AppleReveal className="max-w-2xl mx-auto text-center flex flex-col items-center mb-12 sm:mb-16 lg:mb-20">
          <p className="eyebrow-label mb-3.5">Contact &amp; Location</p>
          <h2
            id="contact-heading"
            className="text-brand-navy font-semibold text-3xl sm:text-4xl lg:text-[44px] tracking-normal leading-[1.15] text-balance mb-3.5"
          >
            Get connected with{" "}
            <span className="text-brand-red">SASH Broadband</span>
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base font-normal leading-relaxed">
            Select your preferred plan or service below and send us a message.
            Our team in Tiruvallur District will reach out promptly.
          </p>
        </AppleReveal>

        {/* Unified Outer Container with Footer Background; Right Side Form Container in White */}
        <div className="relative overflow-hidden rounded-[32px] bg-brand-navy p-7 sm:p-10 lg:p-12 xl:p-14 mb-14 lg:mb-16 shadow-[0_16px_40px_rgba(1,13,59,0.18)]">
          {/* Footer-Matching Gradient & Arch Background */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden select-none"
          >
            <div className="absolute inset-0 bg-linear-to-b from-[#000000] via-[#010D3B] to-[#010722]" />
            <Image
              src="/Footer/footer-9-sash-bg.svg"
              alt=""
              fill
              sizes="100vw"
              aria-hidden="true"
              className="object-cover select-none opacity-90"
            />
            <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[1000px] max-w-[130vw] h-[340px] rounded-[100%] bg-[radial-gradient(ellipse_at_center,rgba(222,3,2,0.75)_0%,rgba(255,59,58,0.4)_40%,transparent_75%)] blur-2xl" />
            <div className="absolute inset-x-0 top-0 h-28 bg-linear-to-b from-black/75 via-black/25 to-transparent" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-14 items-stretch">
            {/* Left Column (6 of 12 cols): SASH Office Location & Contact Details on Footer Background */}
            <div className="lg:col-span-6 flex">
              <div className="w-full p-2 sm:p-4 lg:p-6 flex flex-col justify-between divide-y divide-white/15 text-white">
                {/* Registered Office Address */}
                <div className="flex items-start gap-4 pb-7">
                  <div className="w-10 h-10 rounded-lg bg-brand-red text-white flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white !text-base sm:!text-lg font-semibold leading-snug tracking-normal">
                      {SASH_OFFICE_NAME}
                    </h3>
                    <address className="not-italic text-white/80 text-sm mt-1.5 leading-relaxed font-normal">
                      {SASH_OFFICE_ADDRESS}
                    </address>
                    <a
                      href={SASH_GOOGLE_MAPS_SEARCH_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-brand-red transition-colors underline underline-offset-4"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                {/* Phone (Tap to call) */}
                <div className="flex items-start gap-4 py-7">
                  <div className="w-10 h-10 rounded-lg bg-brand-red text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white !text-base sm:!text-lg font-semibold leading-snug tracking-normal">
                      Phone (Tap to call)
                    </h3>
                    <p className="mt-1">
                      <a
                        href="tel:+919003009353"
                        className="text-white font-medium text-base sm:text-lg hover:underline tabular-nums"
                      >
                        +91 90030 09353
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 py-7">
                  <div className="w-10 h-10 rounded-lg bg-brand-red text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white !text-base sm:!text-lg font-semibold leading-snug tracking-normal">
                      Email Support &amp; Sales
                    </h3>
                    <p className="mt-1">
                      <a
                        href="mailto:sashbroadband@gmail.com"
                        className="text-white/90 font-normal text-sm sm:text-base underline underline-offset-4 hover:text-white transition-colors break-all"
                      >
                        sashbroadband@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                {/* Office Hours & 24/7 Support */}
                <div className="flex items-start gap-4 pt-7">
                  <div className="w-10 h-10 rounded-lg bg-brand-red text-white flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-white !text-base sm:!text-lg font-semibold leading-snug tracking-normal">
                      Office Hours &amp; Support
                    </h3>
                    <p className="text-white/80 text-sm mt-1 font-normal leading-relaxed">
                      Mon – Sat, 9:00 AM to 6:00 PM &bull; 24/7 Customer Support
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (6 of 12 cols): White Form Container */}
            <div className="lg:col-span-6 flex">
              <div className="w-full rounded-[28px] bg-white border border-black/[0.06] p-7 sm:p-9 lg:p-10 xl:p-11 flex flex-col shadow-[0_4px_24px_rgba(0,0,0,0.06)]">
                {/* Form Header */}
                <div className="pb-5 mb-6 border-b border-brand-navy/10">
                  <span className="inline-flex min-h-7 items-center justify-center rounded-full bg-red-10 px-3 font-mono text-xs font-semibold uppercase tracking-wider text-brand-red mb-2">
                    Enquiry Form
                  </span>
                  <h3 className="text-brand-navy !text-xl sm:!text-2xl font-semibold tracking-normal leading-snug">
                    Send us a message
                  </h3>
                </div>

                {/* Accessible Live Status Region */}
                {(submittedSuccess || errors.form) && (
                  <div aria-live="polite" aria-atomic="true" className="mb-5">
                    {submittedSuccess && (
                      <div
                        role="status"
                        className="p-4 sm:p-5 rounded-xl bg-brand-navy text-white border border-brand-red/60"
                      >
                        <div className="flex items-start gap-3">
                          <span className="w-8 h-8 rounded-lg bg-brand-red text-white flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                          </span>
                          <div>
                            <p className="text-sm sm:text-base font-medium text-white">
                              Thank you! Your message has been sent.
                            </p>
                            <p className="text-xs sm:text-sm text-white/85 mt-1 font-normal">
                              Our team will contact you shortly, or call us
                              directly at{" "}
                              <a
                                href="tel:+919003009353"
                                className="font-medium underline text-white"
                              >
                                +91 90030 09353
                              </a>
                              .
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {errors.form && (
                      <div
                        role="alert"
                        className="p-4 rounded-lg bg-red-10 border border-brand-red/40 text-brand-red font-medium text-sm"
                      >
                        {errors.form}
                      </div>
                    )}
                  </div>
                )}

                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex-1 flex flex-col justify-between gap-5"
                >
                  <div className="space-y-4.5">
                    {/* 1 & 2: Name + Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="lead-fullName"
                          className="block text-xs sm:text-sm font-medium text-brand-navy mb-1.5"
                        >
                          Name <span className="text-brand-red">*</span>
                        </label>
                        <div className="relative">
                          <User
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/45"
                            aria-hidden="true"
                          />
                          <input
                            id="lead-fullName"
                            name="fullName"
                            type="text"
                            required
                            autoComplete="name"
                            value={form.fullName}
                            onChange={(e) => {
                              setForm({ ...form, fullName: e.target.value });
                              if (errors.fullName)
                                setErrors({ ...errors, fullName: undefined });
                            }}
                            aria-invalid={Boolean(errors.fullName)}
                            aria-describedby={
                              errors.fullName ? "error-fullName" : undefined
                            }
                            placeholder="Enter your name"
                            className={baseInputClass(Boolean(errors.fullName))}
                          />
                        </div>
                        {errors.fullName && (
                          <p
                            id="error-fullName"
                            role="alert"
                            className="mt-1 text-xs font-medium text-brand-red"
                          >
                            {errors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="lead-mobile"
                          className="block text-xs sm:text-sm font-medium text-brand-navy mb-1.5"
                        >
                          Number <span className="text-brand-red">*</span>
                        </label>
                        <div className="relative">
                          <Phone
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/45"
                            aria-hidden="true"
                          />
                          <input
                            id="lead-mobile"
                            name="mobile"
                            type="tel"
                            required
                            autoComplete="tel"
                            value={form.mobile}
                            onChange={(e) => {
                              setForm({ ...form, mobile: e.target.value });
                              if (errors.mobile)
                                setErrors({ ...errors, mobile: undefined });
                            }}
                            aria-invalid={Boolean(errors.mobile)}
                            aria-describedby={
                              errors.mobile ? "error-mobile" : undefined
                            }
                            placeholder="+91 90030 09353"
                            className={baseInputClass(Boolean(errors.mobile))}
                          />
                        </div>
                        {errors.mobile && (
                          <p
                            id="error-mobile"
                            role="alert"
                            className="mt-1 text-xs font-medium text-brand-red"
                          >
                            {errors.mobile}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 3 & 4: Dropdown Plan Options + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="lead-selectedPlan"
                          className="block text-xs sm:text-sm font-medium text-brand-navy mb-1.5"
                        >
                          Plan Options <span className="text-brand-red">*</span>
                        </label>
                        <div className="relative">
                          <select
                            id="lead-selectedPlan"
                            name="selectedPlan"
                            value={form.selectedPlan}
                            onChange={(e) => {
                              setForm({ ...form, selectedPlan: e.target.value });
                              if (errors.selectedPlan)
                                setErrors({
                                  ...errors,
                                  selectedPlan: undefined,
                                });
                            }}
                            aria-invalid={Boolean(errors.selectedPlan)}
                            aria-describedby={
                              errors.selectedPlan
                                ? "error-selectedPlan"
                                : undefined
                            }
                            className={`w-full h-10 pl-3.5 pr-9 truncate appearance-none rounded-lg bg-white border text-sm font-normal text-brand-navy transition-[border-color,box-shadow] duration-150 focus:outline-none focus:ring-3 cursor-pointer ${errors.selectedPlan
                                ? "border-brand-red focus:border-brand-red focus:ring-brand-red/15"
                                : "border-brand-navy/15 hover:border-brand-navy/30 focus:border-brand-red focus:ring-brand-red/12"
                              }`}
                          >
                            {PLAN_DROPDOWN_OPTIONS.map((planOption) => (
                              <option
                                key={planOption}
                                value={planOption}
                                className="bg-white text-brand-navy"
                              >
                                {planOption}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/55"
                            aria-hidden="true"
                          />
                        </div>
                        {errors.selectedPlan && (
                          <p
                            id="error-selectedPlan"
                            role="alert"
                            className="mt-1 text-xs font-medium text-brand-red"
                          >
                            {errors.selectedPlan}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="lead-email"
                          className="block text-xs sm:text-sm font-medium text-brand-navy mb-1.5"
                        >
                          Email
                        </label>
                        <div className="relative">
                          <Mail
                            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-navy/45"
                            aria-hidden="true"
                          />
                          <input
                            id="lead-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={form.email}
                            onChange={(e) => {
                              setForm({ ...form, email: e.target.value });
                              if (errors.email)
                                setErrors({ ...errors, email: undefined });
                            }}
                            aria-invalid={Boolean(errors.email)}
                            aria-describedby={
                              errors.email ? "error-email" : undefined
                            }
                            placeholder="you@example.com"
                            className={baseInputClass(Boolean(errors.email))}
                          />
                        </div>
                        {errors.email && (
                          <p
                            id="error-email"
                            role="alert"
                            className="mt-1 text-xs font-medium text-brand-red"
                          >
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* 5: Message */}
                    <div>
                      <label
                        htmlFor="lead-message"
                        className="block text-xs sm:text-sm font-medium text-brand-navy mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="lead-message"
                        name="message"
                        rows={4}
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        placeholder="Write your message or installation address details..."
                        className="w-full p-3.5 rounded-xl bg-white border border-brand-navy/15 hover:border-brand-navy/30 focus:border-brand-red focus:ring-3 focus:ring-brand-red/12 focus:outline-none text-sm font-normal text-brand-navy placeholder:text-neutral-600/55 transition-[border-color,box-shadow] duration-150 resize-none"
                      />
                    </div>
                  </div>

                  {/* Send Message Submit CTA Button */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full h-12 min-h-[48px] text-base group/primary cursor-pointer font-medium rounded-full"
                    >
                      <span>
                        {isSubmitting ? "Sending message..." : "Send Message"}
                      </span>
                      <ArrowRight
                        className="size-4 transition-transform duration-200 ease-out group-hover/primary:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 12-Column Google Map Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <AppleReveal className="lg:col-span-12">
            <div className="rounded-[32px] overflow-hidden border border-black/[0.06] bg-neutral-100 h-[360px] sm:h-[420px] w-full shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <iframe
                title="Sash Broadband Pvt Ltd Google Map Location - Kondancheri, Perambakkam, Tiruvallur District 631402"
                src={SASH_GOOGLE_MAPS_EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
            </div>
          </AppleReveal>
        </div>
      </div>
    </section>
  );
}
