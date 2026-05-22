import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type ThemeTogglerProps = {
  transparent?: boolean;
};

const ThemeToggler = ({ transparent = false }: ThemeTogglerProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  const buttonClass = transparent
    ? "border-white/25 bg-white/10 text-white backdrop-blur-sm hover:border-yellow/50 hover:bg-white/15 hover:text-yellow"
    : "border-primary/20 bg-primary/10 text-primary shadow-btn hover:border-primary hover:bg-primary hover:text-white dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:border-yellow/50 dark:hover:bg-white/15 dark:hover:text-yellow";

  return (
    <button
      aria-label="切换深色模式"
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border transition md:h-11 md:w-11 ${buttonClass}`}
    >
      {isDark ? (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 stroke-current"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M12 4V2M12 22v-2M4.93 4.93 3.52 3.52M20.48 20.48l-1.41-1.41M4 12H2M22 12h-2M4.93 19.07l-1.41 1.41M20.48 3.52l-1.41 1.41"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
            strokeWidth="2"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          className="h-5 w-5 stroke-current"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M21 14.2A7.8 7.8 0 0 1 9.8 3 8.8 8.8 0 1 0 21 14.2Z"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggler;