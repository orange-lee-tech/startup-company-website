import { Feature } from "@/types/feature";
import Link from "next/link";

const cardThemes = [
  {
    bar: "bg-primary",
    number: "text-primary",
    hover: "hover:bg-primary hover:text-white",
    tag: "bg-primary/10 text-primary",
  },
  {
    bar: "bg-[#0F62FE]",
    number: "text-[#0F62FE]",
    hover: "hover:bg-[#0F62FE] hover:text-white",
    tag: "bg-[#0F62FE]/10 text-[#0F62FE]",
  },
  {
    bar: "bg-[#07142F]",
    number: "text-[#07142F] dark:text-white",
    hover: "hover:bg-[#07142F] hover:text-white",
    tag: "bg-[#07142F]/10 text-[#07142F] dark:bg-white/10 dark:text-white",
  },
  {
    bar: "bg-yellow",
    number: "text-yellow",
    hover: "hover:bg-yellow hover:text-[#07142F]",
    tag: "bg-yellow/20 text-[#07142F] dark:text-yellow",
  },
  {
    bar: "bg-[#6B7A90]",
    number: "text-[#6B7A90]",
    hover: "hover:bg-[#6B7A90] hover:text-white",
    tag: "bg-[#6B7A90]/10 text-[#6B7A90]",
  },
  {
    bar: "bg-black",
    number: "text-black dark:text-white",
    hover: "hover:bg-black hover:text-white",
    tag: "bg-black/10 text-black dark:bg-white/10 dark:text-white",
  },
];

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { id, title, audience, keywords } = feature;
  const theme = cardThemes[(id - 1) % cardThemes.length];

  return (
    <Link
      href="/services"
      className={`group relative block min-h-[260px] bg-white p-6 transition duration-300 dark:bg-gray-dark ${theme.hover}`}
    >
      <span
        className={`absolute left-0 top-0 h-1 w-full ${theme.bar}`}
        aria-hidden="true"
      />

      <div className="mb-8 flex items-start justify-between gap-6">
        <span
          className={`text-sm font-bold tracking-wide transition group-hover:text-current ${theme.number}`}
        >
          {String(id).padStart(2, "0")}
        </span>

        <span className="text-sm font-medium text-body-color transition group-hover:text-current dark:text-body-color-dark">
          进入说明
        </span>
      </div>

      <h3 className="mb-4 text-2xl font-bold leading-snug text-black transition group-hover:text-current dark:text-white">
        {title}
      </h3>

      <p className="mb-6 text-base leading-relaxed text-body-color transition group-hover:text-current dark:text-body-color-dark">
        {audience}
      </p>

      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className={`px-3 py-1 text-xs font-semibold transition group-hover:bg-white/15 group-hover:text-current ${theme.tag}`}
          >
            {keyword}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default SingleFeature;