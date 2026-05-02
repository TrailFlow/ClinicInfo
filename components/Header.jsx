"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-ink transition-opacity hover:opacity-80 sm:text-2xl"
        >
          <span className="text-2xl text-rose-500" aria-hidden="true"></span>
          <span>ClinicInfo</span>
          <span className="text-2xl text-rose-500" aria-hidden="true"></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block" aria-label="Primary navigation">
          <ul className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-slate-600">
            <li>
              <Link
                href="/category/clinic"
                className="rounded-xl px-5 py-2.5 transition hover:bg-clinic-50 hover:text-clinic-600"
              >
                Clinic
              </Link>
            </li>
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-50 text-slate-600 transition-all active:scale-95 md:hidden"
          aria-expanded={isOpen}
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        className={`border-t border-slate-50 bg-white transition-all duration-300 md:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <nav className="p-6">
          <ul className="space-y-3">
            <li>
              <Link
                href="/category/clinic"
                className="flex items-center justify-between rounded-2xl bg-slate-50 px-6 py-5 text-lg font-bold text-slate-700 transition active:scale-[0.98] active:bg-clinic-50 active:text-clinic-600"
                onClick={() => setIsOpen(false)}
              >
                <span>Clinic</span>
                <svg
                  className="h-5 w-5 opacity-30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
