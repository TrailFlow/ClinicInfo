"use client";

import Link from "next/link";
import { useState } from "react";
import { categories } from "@/lib/categories";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--bg-primary)]">
      <div className="container px-4 py-12" id="newsletter">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xl font-extrabold">
              ClinicInfo
              <span className="text-[var(--accent)]">●</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)]">
              Your trusted source for health, tech & finance insights.
            </p>
            <div className="flex gap-3 text-[var(--text-muted)]">
              <Link href="#" aria-label="Twitter">
                X
              </Link>
              <Link href="#" aria-label="Facebook">
                Facebook
              </Link>
              <Link href="#" aria-label="Instagram">
                Instagram
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Categories
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
              {Object.entries(categories).map(([slug, meta]) => (
                <li key={slug}>
                  <Link href={`/category/${slug}`} className="hover:text-[var(--accent)]">
                    {meta.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Pages
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[var(--text-secondary)]">
              <li>
                <Link href="/about-us" className="hover:text-[var(--accent)]">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="hover:text-[var(--accent)]">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[var(--accent)]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[var(--accent)]">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-and-conditions"
                  className="hover:text-[var(--accent)]"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[var(--text-primary)]">
              Stay Updated
            </h3>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Get 4-5 fresh articles daily in your inbox.
            </p>
            <form onSubmit={handleSubmit} className="mt-4 space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full rounded-[var(--radius-button)] border border-[var(--border)] px-3 py-2 text-sm"
                aria-label="Email address"
              />
              <button type="submit" className="button-primary w-full px-4 py-2 text-sm">
                {status === "loading" ? "Subscribing..." : "Subscribe"}
              </button>
            </form>
            <p className="mt-2 text-xs text-[var(--text-muted)]">
              No spam. Unsubscribe anytime.
            </p>
            {status === "success" ? (
              <p className="mt-2 text-xs text-emerald-600">Subscribed!</p>
            ) : null}
            {status === "error" ? (
              <p className="mt-2 text-xs text-red-600">Failed to subscribe.</p>
            ) : null}
          </div>
        </div>
      </div>

      <div className="bg-[#0f172a] text-[var(--text-muted)]">
        <div className="container flex flex-col items-center justify-between gap-2 px-4 py-4 text-xs sm:flex-row">
          <span>© 2026 ClinicInfo. All rights reserved.</span>
          <span>Made with ❤️ for readers worldwide</span>
        </div>
      </div>
    </footer>
  );
}
