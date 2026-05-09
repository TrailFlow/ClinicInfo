"use client";

import { useEffect, useRef } from "react";

export default function TopAdUnit({ slotId, pId }) {
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
      className="w-full flex justify-center py-4 bg-gray-50 border-b border-gray-100 overflow-hidden"
    >
      <div className="w-full max-w-[728px] px-4">
        <ins
          className="adsbygoogle"
          style={{ display: "block", minWidth: "250px", minHeight: "90px" }}
          data-ad-client={`ca-pub-${pId}`}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}
