'use client';

import { useEffect } from 'react';

export default function TopAdUnit({ slotId, pId }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        if (typeof window !== 'undefined') {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  if (!slotId || !pId) return null;

  return (
    <div className="w-full flex justify-center py-4 bg-gray-50 border-b border-gray-100 overflow-hidden">
      <div className="w-full max-w-[728px] px-4">
        <ins
          className="adsbygoogle"
          style={{ display: 'block', minWidth: '250px', minHeight: '90px' }}
          data-ad-client={`ca-pub-${pId}`}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        ></ins>
      </div>
    </div>
  );
}
