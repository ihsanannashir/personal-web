"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Scroll() {
  // Scroll to top when navigating to a new page (not on hash changes).
  // Hash-based scroll is handled natively by the browser via scroll-behavior: smooth.

  const pathname = usePathname();
  useEffect(() => {
    // Only scroll to top when the path changes and there's no hash in the URL
    if (!window.location.hash) {
      window.scroll(0, 0);
    }
  }, [pathname]);
  return <></>;
}
