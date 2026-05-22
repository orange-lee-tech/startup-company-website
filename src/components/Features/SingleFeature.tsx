import { Feature } from "@/types/feature";
import Link from "next/link";

const cardThemes = [
  {
    bar: "bg-yellow",
    number: "text-yellow",
    tag: "border-yellow/25 bg-yellow/10 text-yellow",
  },
  {
    bar: "bg-[#8FD3FF]",
    number: "text-[#8FD3FF]",
    tag: "border-[#8FD3FF]/25 bg-[#8FD3FF]/10 text-[#8FD3FF]",
  },
  {
    bar: "bg-white",
    number: "text-white",
    tag: "border-white/20 bg-white/10 text-white",
  },
];

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { id, title, audience, keywords, path } = feature;
  const theme = cardThemes[(id - 1) % cardThemes.length];

  return (
    <Link
      href={path}
      className="group relative block min-h-[250px] bg-[#06152F]/72 p-6 transition duration-300 hover:bg-white/10"
    >
      <span
        className={`absolute left-0 top-0 h-1 w-full ${theme.bar}`}
        aria-hidden="true"
      />

      <div className="mb-8 flex items-start justify-between gap-6">
        <span
          className={`text-sm font-bold tracking-wide transition ${theme.number}`}
        >
          {String(id).padStart(2, "0")}
        </span>

        <span className="text-sm font-medium text-white/60 transition group-hover:text-yellow">
          查看详情
        </span>
      </div>

      <h3 className="mb-4 text-2xl font-bold leading-snug text-white transition group-hover:text-yellow">
        {title}
      </h3>

      <p className="mb-6 text-base leading-relaxed text-white/72 transition group-hover:text-white">
        {audience}
      </p>

      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition group-hover:border-white/25 group-hover:bg-white/15 group-hover:text-white ${theme.tag}`}
          >
            {keyword}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default SingleFeature;