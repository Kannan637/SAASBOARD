"use client";
import React from "react";
import { ThreeDMarquee } from "@/components/ui/3d-marquee";

export default function ThreeDMarqueeDemoSecond() {
  const images = [
    "/3d-marquee/netflix.svg",
    "/3d-marquee/prime-video.svg",
    "/3d-marquee/youtube.svg",
    "/3d-marquee/spotify.svg",
    "/3d-marquee/disney-hotstar.svg",
    "/3d-marquee/apple-tv.svg",
    "/3d-marquee/twitch.svg",
    "/3d-marquee/sony-liv.svg",
    "/3d-marquee/zee5.svg",
    "/3d-marquee/jio-cinema.svg",
    "/3d-marquee/gta-5.svg",
    "/3d-marquee/valorant.svg",
    "/3d-marquee/bgmi.svg",
    "/3d-marquee/call-of-duty.svg",
    "/3d-marquee/minecraft.svg",
    "/3d-marquee/fortnite.svg",
    "/3d-marquee/free-fire.svg",
    "/3d-marquee/cyberpunk.svg",
    "/3d-marquee/ea-fc.svg",
    "/3d-marquee/steam.svg",
    "/3d-marquee/playstation.svg",
    "/3d-marquee/xbox.svg",
    "/3d-marquee/instagram.svg",
    "/3d-marquee/whatsapp.svg",
    "/3d-marquee/discord.svg",
    "/3d-marquee/x-twitter.svg",
    "/3d-marquee/telegram.svg",
    "/3d-marquee/reddit.svg",
    "/3d-marquee/facebook.svg",
    "/3d-marquee/snapchat.svg",
    "/3d-marquee/tiktok.svg",
    "/3d-marquee/linkedin.svg",
  ];

  return (
    <div className="relative mx-auto my-10 flex h-screen w-full max-w-7xl flex-col items-center justify-center overflow-hidden rounded-3xl">
      <h2 className="relative z-20 mx-auto max-w-4xl text-center text-2xl font-bold text-balance text-white md:text-4xl lg:text-6xl">
        This is your life and it&apos;s ending one{" "}
        <span className="relative z-20 inline-block rounded-xl bg-blue-500/40 px-4 py-1 text-white underline decoration-sky-500 decoration-[6px] underline-offset-[16px] backdrop-blur-sm">
          moment
        </span>{" "}
        at a time.
      </h2>
      <p className="relative z-20 mx-auto max-w-2xl py-8 text-center text-sm text-neutral-200 md:text-base">
        You are not your job, you&apos;re not how much money you have in the
        bank. You are not the car you drive. You&apos;re not the contents of
        your wallet.
      </p>

      <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 pt-4">
        <button className="rounded-md bg-sky-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-sky-700 focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
          Join the club
        </button>
        <button className="rounded-md border border-white/20 bg-white/10 px-6 py-2.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20 focus:ring-2 focus:ring-white/20 focus:ring-offset-2 focus:ring-offset-black focus:outline-none">
          Read more
        </button>
      </div>

      {/* overlay */}
      <div className="absolute inset-0 z-10 h-full w-full bg-black/80 dark:bg-black/40" />
      <ThreeDMarquee
        className="pointer-events-none absolute inset-0 h-full w-full"
        images={images}
      />
    </div>
  );
}
