"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BOOK_HREF } from "@/lib/constants/nav";
import { SITE } from "@/lib/constants/seo";
import { cn } from "@/lib/utils";

const DRAWER_LINKS = [
  { num: "01", label: "Cottages", href: "/bude-holiday-cottages/" },
  { num: "02", label: "Yurts", href: "/yurts/" },
  { num: "03", label: "Experiences", href: "/experiences-weddings-events/" },
  { num: "04", label: "About", href: "/about-woodlands-manor-farm-holiday-cottages-with-a-pool/" },
  { num: "05", label: "Reviews", href: "/reviews/" },
  { num: "06", label: "Special Offers", href: "/special-offers/" },
  { num: "07", label: "Find Us", href: "/contact-us/" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-[200] flex items-center justify-between px-6 py-5 transition-all duration-300 md:px-12",
          scrolled
            ? "bg-[rgba(74,100,89,0.96)] py-3 shadow-[0_1px_0_rgba(173,191,185,0.15)] backdrop-blur-md"
            : "bg-transparent",
        )}
      >
        <Link href="/" className="flex items-center" aria-label={SITE.name}>
          <Image
            src="/images/wmf-logo-light.png"
            alt={SITE.name}
            width={350}
            height={100}
            priority
            className={cn("h-12 w-auto transition-all duration-300", scrolled && "h-10")}
          />
        </Link>

        <div className="flex items-center gap-3 md:gap-5">
          <Link
            href={BOOK_HREF}
            className="hidden rounded-sm bg-[var(--color-violet)] px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#7a6aa4] sm:inline-block"
          >
            Book Direct
          </Link>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            className="flex h-[42px] w-[42px] flex-col items-center justify-center gap-[5px] rounded-sm border border-[rgba(247,243,238,0.25)] bg-white/10 transition-colors hover:border-[rgba(247,243,238,0.5)] hover:bg-white/[0.18]"
          >
            <span
              className={cn(
                "block h-[1.5px] w-[18px] origin-center rounded bg-[#F7F4EF] transition-all",
                open && "translate-y-[6.5px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-[18px] rounded bg-[#F7F4EF] transition-all",
                open && "scale-x-0 opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-[18px] origin-center rounded bg-[#F7F4EF] transition-all",
                open && "-translate-y-[6.5px] -rotate-45",
              )}
            />
          </button>
        </div>
      </nav>

      <button
        type="button"
        aria-label="Close menu"
        tabIndex={open ? 0 : -1}
        onClick={() => setOpen(false)}
        className={cn(
          "fixed inset-0 z-[300] bg-[rgba(5,12,8,0.6)] backdrop-blur-sm transition-opacity duration-400",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      <aside
        aria-hidden={!open}
        className={cn(
          "fixed right-0 top-0 z-[400] flex h-screen w-full max-w-[400px] flex-col overflow-y-auto border-l border-[rgba(173,191,185,0.1)] bg-[#0f1c13] transition-transform duration-[450ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute right-5 top-[18px] p-1 text-2xl leading-none text-[rgba(247,243,238,0.3)] transition-colors hover:text-[#F7F4EF]"
        >
          ×
        </button>

        <div className="border-b border-[rgba(247,243,238,0.07)] px-10 pb-6 pt-11">
          <div className="font-serif text-lg text-[#F7F4EF]">{SITE.name}</div>
          <div className="mt-1 text-[10px] uppercase tracking-[0.3em] text-[var(--color-warm-stone)]">
            Bude · Cornwall
          </div>
        </div>

        <nav className="flex flex-1 flex-col py-2">
          {DRAWER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-[rgba(247,243,238,0.05)] px-10 py-[15px] font-serif text-xl text-[rgba(247,243,238,0.6)] transition-all duration-200 hover:pl-12 hover:text-[#F7F4EF]"
            >
              <span className="min-w-[18px] font-sans text-[10px] tracking-[0.18em] text-[var(--color-violet)]">
                {link.num}
              </span>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-[14px] border-t border-[rgba(247,243,238,0.07)] px-10 pb-10 pt-5">
          <Link
            href={BOOK_HREF}
            onClick={() => setOpen(false)}
            className="block rounded-sm bg-[var(--color-violet)] px-5 py-[13px] text-center text-[11px] font-medium uppercase tracking-[0.18em] text-[#FEFEFE] transition-colors hover:bg-[#7a6aa4]"
          >
            Check Availability
          </Link>
          <div className="flex flex-col gap-1 text-xs font-light text-[rgba(247,243,238,0.4)]">
            <a href={`tel:${SITE.contact.phone}`} className="transition-colors hover:text-[#F7F4EF]">
              {SITE.contact.phoneDisplay}
            </a>
            <a href={`mailto:${SITE.contact.email}`} className="transition-colors hover:text-[#F7F4EF]">
              {SITE.contact.email}
            </a>
          </div>
          <div className="flex gap-5">
            <a
              href="https://www.facebook.com/woodlandsmanorfarm.co.uk/"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] uppercase tracking-[0.18em] text-[rgba(247,243,238,0.3)] transition-colors hover:text-[var(--color-warm-stone)]"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/woodlandsmanorfarm/"
              target="_blank"
              rel="noreferrer"
              className="text-[10px] uppercase tracking-[0.18em] text-[rgba(247,243,238,0.3)] transition-colors hover:text-[var(--color-warm-stone)]"
            >
              Instagram
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
