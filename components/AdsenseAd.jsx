"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AdsenseAd({ 
  pId, 
  slotId, 
  format = "auto", 
  responsive = "true", 
  style = { display: "block" },
  className = "" 
}) {
  const pathname = usePathname();

  useEffect(() => {
    const loadAd = () => {
      try {
        if (typeof window !== "undefined" && window.adsbygoogle) {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error("AdSense error:", err.message);
      }
    };

    // Small delay to ensure DOM is ready and prevent "ins already has ads" error
    const timeout = setTimeout(loadAd, 500);
    return () => clearTimeout(timeout);
  }, [pathname]); // Re-trigger on SPA route change

  if (!pId || !slotId) return null;

  return (
    <div 
      key={pathname + slotId} // Force fresh mount on navigation
      className={`ads-container overflow-hidden w-full mx-auto my-4 ${className}`}
    >
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={`ca-pub-${pId}`}
        data-ad-slot={slotId}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
}
