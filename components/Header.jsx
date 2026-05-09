"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { categories as categoryMeta } from "@/lib/categories";
import blogs from "@/data/blogs.json";
import SearchModal from "./SearchModal";
import { useTheme } from "./ThemeProvider";

const primaryCategories = [
  "medical",
  "technology",
  "finance",
  "lifestyle",
  "business",
];

const policyLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/contact-us", label: "Contact" },
];

const latestPosts = blogs
  .slice()
  .sort((left, right) => {
    const leftTime = new Date(left.isoDate || left.date || 0).getTime();
    const rightTime = new Date(right.isoDate || right.date || 0).getTime();
    return rightTime - leftTime;
  })
  .slice(0, 3);

function ThemeIcon({ isDark }) {
  return isDark ? (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="12" cy="12" r="4" strokeWidth={2} />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        strokeLinecap="round"
        strokeWidth={2}
      />
    </svg>
  ) : (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
    >
      <path
        d="M21 12.8A8.5 8.5 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function isActiveCategory(slug) {
    return pathname && pathname.startsWith(`/category/${slug}`);
  }

  const currentCategory = pathname?.startsWith("/category/")
    ? pathname.split("/")[2]
    : "all";

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-primary)] ${
        isScrolled ? "shadow-[0_2px_12px_rgba(0,0,0,0.08)]" : "shadow-none"
      }`}
    >
      <div className="container flex h-14 items-center gap-3 px-3 sm:h-16 sm:px-4">
        <Link href="/" className="flex min-w-0 items-center gap-2">
          <Image
            src="/favicon.png"
            alt="ClinicInfo logo"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full object-cover"
            priority
          />
          <span className="truncate text-lg font-extrabold sm:text-xl">
            ClinicInfo
          </span>
          </Link>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <div className="relative group hidden md:block">
            <button
              className="pill inline-flex items-center gap-2 text-sm bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--border)] transition-colors"
            >
              <span>Categories</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:rotate-180"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="absolute right-0 top-full hidden w-48 rounded-2xl border border-[var(--border)] bg-[var(--bg-primary)] p-2 shadow-lg group-hover:block fade-up">
              {primaryCategories.map((slug) => {
                const meta = categoryMeta[slug];
                const isActive = isActiveCategory(slug);
                return (
                  <Link
                    key={slug}
                    href={`/category/${slug}`}
                    className={`flex items-center justify-between rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-[var(--accent-light)] text-[var(--accent)]"
                        : "text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                    }`}
                  >
                    <span>{meta.label}</span>
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: meta.color }}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--border)]"
            aria-label="Search"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m21 21-4.35-4.35m1.85-5.65a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
              />
            </svg>
          </button>
          {mounted && (
            <button
              onClick={toggleTheme}
              className="hidden h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--border)] lg:inline-flex"
              aria-label="Toggle dark mode"
            >
              <ThemeIcon isDark={isDark} />
            </button>
          )}
          <button
            onClick={() => setIsOpen(true)}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--border)] lg:hidden"
            aria-label="Open menu"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
              <path
                d="M4 6h16M4 12h16m-7 6h7"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
            onClick={() => setIsOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex h-full w-full max-w-[24rem] flex-col overflow-hidden bg-[var(--bg-primary)] shadow-[0_20px_60px_rgba(15,23,42,0.28)]">
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-4">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <Image
                  src="/favicon.png"
                  alt="ClinicInfo logo"
                  width={28}
                  height={28}
                  className="h-7 w-7 rounded-full object-cover"
                />
                <div>
                  <p className="text-base font-extrabold leading-none text-[var(--text-primary)]">
                    ClinicInfo
                  </p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                    Menu
                  </p>
                </div>
              </Link>
              <button
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] transition-colors hover:bg-[var(--border)]"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    d="M6 6l12 12M18 6 6 18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(true)}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-3 text-xs font-semibold text-[var(--text-secondary)]"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m21 21-4.35-4.35m1.85-5.65a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
                    />
                  </svg>
                  Search
                </button>
                {mounted && (
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className="flex flex-col items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-3 text-xs font-semibold text-[var(--text-secondary)]"
                    aria-label="Toggle dark mode"
                  >
                    <ThemeIcon isDark={isDark} />
                    Theme
                  </button>
                )}
                <Link
                  href="/about-us"
                  onClick={() => setIsOpen(false)}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-3 py-3 text-xs font-semibold text-[var(--text-secondary)]"
                >
                  <svg
                    className="h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 12v5m0-8h.01M10.5 20h3a7.5 7.5 0 1 0-3 0Z"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  About
                </Link>
              </div>

              <section className="mt-5">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    Categories
                  </h2>
                  <Link
                    href="/search"
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-semibold text-[var(--accent)]"
                  >
                    Browse all
                  </Link>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {primaryCategories.map((slug) => {
                    const meta = categoryMeta[slug];
                    const isActive = isActiveCategory(slug);
                    return (
                      <Link
                        key={slug}
                        href={`/category/${slug}`}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors ${
                          isActive
                            ? "border-[var(--accent)] bg-[var(--accent-light)] text-[var(--accent)]"
                            : "border-[var(--border)] bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                        }`}
                      >
                        <span>{meta.label}</span>
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: meta.color }}
                        />
                      </Link>
                    );
                  })}
                </div>
              </section>

              <section className="mt-6">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                    Latest Blogs
                  </h2>
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-semibold text-[var(--accent)]"
                  >
                    View home
                  </Link>
                </div>
                <div className="space-y-3">
                  {latestPosts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] p-3 transition-colors hover:border-[var(--accent)]"
                    >
                      <Image
                        src={post.image || "/images/nimsclinic/default.jpg"}
                        alt={post.title}
                        width={72}
                        height={72}
                        className="h-[72px] w-[72px] shrink-0 rounded-xl object-cover"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--accent)]">
                          <span>Latest</span>
                          <span className="text-[var(--text-muted)]">•</span>
                          <span>
                            {categoryMeta[post.category]?.label ||
                              post.category}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-2 text-sm font-semibold text-[var(--text-primary)]">
                          {post.title}
                        </p>
                        <p className="mt-1 text-xs text-[var(--text-muted)]">
                          {post.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="mt-6">
                <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-[var(--text-muted)]">
                  Footer Links
                </h2>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {policyLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--bg-secondary)] px-4 py-3 text-sm font-semibold text-[var(--text-secondary)]"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </section>
            </div>

            <div className="border-t border-[var(--border)] px-4 py-4 text-xs text-[var(--text-muted)]">
              © 2026 ClinicInfo. All rights reserved.
            </div>
          </aside>
        </div>
      ) : null}

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        initialCategory={currentCategory}
      />
    </header>
  );
}
