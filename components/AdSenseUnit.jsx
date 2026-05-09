"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

function getKey(pId, slotId, pathname) {
  return `${pathname}:${pId}:${slotId}`;
}

export default function AdSenseUnit({
  pId,
  slotId,
  position,
  variant = "banner",
  format = "auto",
  responsive = "true",
  className = "",
  style,
}) {
  const pathname = usePathname();
  const insRef = useRef(null);
  const containerRef = useRef(null);
  const hasPushedRef = useRef(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !pId || !slotId) {
      return undefined;
    }

    setLoaded(false);
    hasPushedRef.current = false;

    const insElement = insRef.current;
    const containerElement = containerRef.current;
    if (!insElement) {
      return undefined;
    }

    const markLoaded = () => {
      const hasIframe = Boolean(insElement.querySelector("iframe"));
      const status = insElement.getAttribute("data-ad-status");
      if (hasIframe || status === "filled") {
        setLoaded(true);
      }
    };

    const observer = new MutationObserver(markLoaded);
    observer.observe(insElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["data-ad-status"],
    });

    const pushAd = () => {
      if (hasPushedRef.current) {
        return;
      }

      const width = containerElement?.getBoundingClientRect().width || 0;
      if (width <= 0) {
        return;
      }

      hasPushedRef.current = true;

      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error("AdSense error:", err?.message || err);
      }
      markLoaded();
    };

    let widthObserver;
    let rafId = window.requestAnimationFrame(() => {
      pushAd();

      if (hasPushedRef.current) {
        return;
      }

      if (typeof ResizeObserver !== "undefined" && containerElement) {
        widthObserver = new ResizeObserver(() => {
          pushAd();
          if (hasPushedRef.current && widthObserver) {
            widthObserver.disconnect();
            widthObserver = undefined;
          }
        });
        widthObserver.observe(containerElement);
      } else {
        const timeout = window.setInterval(() => {
          pushAd();
          if (hasPushedRef.current) {
            window.clearInterval(timeout);
          }
        }, 250);

        widthObserver = {
          disconnect: () => window.clearInterval(timeout),
        };
      }
    });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
      widthObserver?.disconnect?.();
    };
  }, [pathname, pId, slotId]);

  if (!pId || !slotId) return null;

  const filledMinHeight = variant === "sidebar" ? 250 : 90;

  const wrapperStyle = {
    ...style,
    minHeight: loaded ? filledMinHeight : 0,
    padding: loaded ? style?.padding : 0,
  };

  return (
    <div
      ref={containerRef}
      key={getKey(pId, slotId, pathname)}
      className={`ads-container relative w-full overflow-hidden rounded-[var(--radius-card)] transition-all duration-300 ${
        loaded 
          ? "my-4 border border-dashed border-[var(--border)] bg-[var(--bg-secondary)] opacity-100" 
          : "my-0 opacity-0 h-0"
      } ${className}`}
      data-ad-position={position}
      aria-busy={!loaded}
    >
      <ins
        ref={insRef}
        className="adsbygoogle block w-full"
        style={wrapperStyle}
        data-ad-client={`ca-pub-${pId}`}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
