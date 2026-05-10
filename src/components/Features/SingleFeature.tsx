import { Feature } from "@/types/feature";
import Link from "next/link";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { id, title, audience, keywords } = feature;

  return (
    <Link
      href="/services"
      className="group block h-full rounded-2xl border border-body-color/10 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-three dark:border-white/10 dark:bg-gray-dark"
    >
      <div className="mb-5 flex items-start justify-between">
        <span className="text-sm font-semibold text-primary">
          {String(id).padStart(2, "0")}
        </span>
        <span className="text-sm font-medium text-body-color transition group-hover:text-primary">
          查看说明
        </span>
      </div>

      <h3 className="mb-4 text-xl font-bold text-black dark:text-white">
        {title}
      </h3>

      <p className="mb-5 text-base leading-relaxed text-body-color dark:text-body-color-dark">
        {audience}
      </p>

      <div className="flex flex-wrap gap-2">
        {keywords.map((keyword) => (
          <span
            key={keyword}
            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
          >
            {keyword}
          </span>
        ))}
      </div>
    </Link>
  );
};

export default SingleFeature;