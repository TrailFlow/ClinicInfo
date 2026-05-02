"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down more than 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-clinic-500 text-white shadow-xl shadow-clinic-500/20 transition-all duration-500 hover:bg-clinic-600 hover:-translate-y-1 focus:outline-none sm:bottom-10 sm:right-10 ${
        isVisible
          ? "translate-y-0 opacity-100 scale-100 pointer-events-auto"
          : "translate-y-12 opacity-0 scale-75 pointer-events-none"
      }`}
      aria-label="Scroll to top"
    >
      <svg
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}
