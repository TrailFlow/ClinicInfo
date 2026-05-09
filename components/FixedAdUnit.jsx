"use client";

import { useEffect, useRef } from "react";

export default function FixedAdUnit({ slotId, pId }) {
  const containerRef = useRef(null);
  const hasPushedRef = useRef(false);

  useEffect(() => {
    hasPushedRef.current = false;

    const tryPushAd = () => {
      const width = containerRef.current?.getBoundingClientRect().width || 0;
      if (width <= 0 || hasPushedRef.current) {
        return;
      }

      hasPushedRef.current = true;

      try {
        if (typeof window !== "undefined") {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error("AdSense error:", err);
      }
    };

    const timeout = window.setTimeout(() => {
      tryPushAd();
    }, 300);

    let widthObserver;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      widthObserver = new ResizeObserver(() => {
        tryPushAd();
        if (hasPushedRef.current && widthObserver) {
          widthObserver.disconnect();
        }
      });
      widthObserver.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timeout);
      widthObserver?.disconnect?.();
    };
  }, []);

  if (!slotId || !pId) return null;

  return (
    <div
      ref={containerRef}
      className="fixed bottom-0 left-0 right-0 z-50 flex justify-center bg-white/80 backdrop-blur-sm border-t border-gray-200 py-2 shadow-lg sm:py-4"
    >
      <div className="w-full max-w-[728px] px-4 overflow-hidden">
        {/* Placeholder for actual AdSense Unit */}
        <ins
          className="adsbygoogle"
          style={{ display: "block", minWidth: "250px", minHeight: "50px" }}
          data-ad-client={`ca-pub-${pId}`}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
      <button
        onClick={(e) => (e.currentTarget.parentElement.style.display = "none")}
        className="absolute -top-3 right-2 bg-gray-800 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-black transition-colors"
        aria-label="Close Ad"
      >
        ✕
      </button>
    </div>
  );
}
