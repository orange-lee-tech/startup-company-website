"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    if (typeof window === "undefined") {
      return;
    }

    if (typeof window.scrollTo === "function") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed right-8 bottom-8 z-99">
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="返回页面顶部"
          className="bg-primary/80 hover:shadow-signUp flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white shadow-md transition duration-300 ease-in-out"
        >
          <span className="mt-[6px] h-3 w-3 rotate-45 border-t border-l border-white" />
        </button>
      )}
    </div>
  );
}
