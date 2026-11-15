import type { Metadata } from "next";
import Contactus from "@/components/Home/Contactus";

export const metadata: Metadata = {
  title: "Contact SASH Broadband | Kondancheri, Tiruvallur District - 631402",
  description:
    "Contact Sash Broadband Pvt Ltd at No. 1/401, Kondancheri Post, Perambakkam (Via Tiruvallur District - 631 402 Kadambattur, Block, Kondancheri, Kondanjerry, Tamil Nadu 631402). Call +91 90030 09353.",
  alternates: {
    canonical: "/contact",
    languages: { "en-IN": "/contact" },
  },
};

export default function ContactPage() {
  return <Contactus />;
}

