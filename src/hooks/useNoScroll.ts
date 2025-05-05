// useNoScroll.ts
import { useEffect } from "react";

export default function useNoScroll() {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalOverflowX = document.body.style.overflowX;
    const originalOverflowY = document.body.style.overflowY;

    document.body.style.overflow = "hidden";
    document.body.style.overflowX = "hidden";
    document.body.style.overflowY = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overflowX = originalOverflowX;
      document.body.style.overflowY = originalOverflowY;
    };
  }, []);
}
