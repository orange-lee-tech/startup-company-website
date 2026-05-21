"use client";

import { featuredTeachers } from "@/data/teachers";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const TeacherCarousel = () => {
  const teachers = featuredTeachers;
  const [startIndex, setStartIndex] = useState(0);

  const visibleTeachers = useMemo(() => {
    if (teachers.length <= 3) {
      return teachers;
    }

    return [0, 1, 2].map((offset) => {
      const index = (startIndex + offset) % teachers.length;
      return teachers[index];
    });
  }, [startIndex, teachers]);

  const handlePrev = () => {
    setStartIndex((current) =>
      current === 0 ? Math.max(teachers.length - 1, 0) : current - 1,
    );
  };

  const handleNext = () => {
    setStartIndex((current) =>
      teachers.length === 0 ? 0 : (current + 1) % teachers.length,
    );
  };

  if (!teachers.length) {
    return null;
  }

  return (
    <section className="bg-gray-light py-14 dark:bg-bg-color-dark md:py-16 lg:py-20">
      <div className="container">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-4 text-base font-semibold text-primary">
              师资团队
            </p>

            <h2 className="mb-4 text-3xl font-bold leading-tight text-black dark:text-white md:text-4xl">
              汇聚多领域导师资源，提供针对性规划与指导
            </h2>

            <p className="max-w-[760px] text-base leading-relaxed text-body-color dark:text-body-color-dark md:text-lg">
              首页仅展示部分师资摘要。点击任意卡片可进入师资总览页面，查看更多导师与教研团队信息。
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="上一组师资"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-body-color/20 text-black transition hover:border-primary hover:bg-primary hover:text-white dark:border-white/20 dark:text-white"
            >
              ←
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="下一组师资"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-body-color/20 text-black transition hover:border-primary hover:bg-primary hover:text-white dark:border-white/20 dark:text-white"
            >
              →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-body-color/10 bg-white dark:border-white/10 dark:bg-gray-dark md:grid-cols-3">
          {visibleTeachers.map((teacher) => (
            <Link
              key={teacher.id}
              href="/teachers"
              className="group relative min-h-[455px] overflow-hidden border-b border-body-color/10 bg-white transition hover:z-10 hover:shadow-three dark:border-white/10 dark:bg-gray-dark md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="relative flex h-[300px] w-full items-end justify-center overflow-hidden bg-linear-to-b from-[#EEF3FF] to-white px-6 pt-6 dark:from-bg-color-dark dark:to-gray-dark">
  <Image
    src={teacher.portraitImage}
    alt={teacher.name}
    fill
    sizes="(min-width: 768px) 33vw, 100vw"
    className="object-contain object-bottom transition duration-500 group-hover:scale-105"
  />
</div>

              <div className="p-7">
                <p className="mb-2 text-sm font-semibold text-primary">
                  {teacher.title}
                </p>

                <h3 className="mb-3 text-2xl font-bold text-black transition group-hover:text-primary dark:text-white">
                  {teacher.name}
                </h3>

                <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
                  {teacher.school}
                </p>
              </div>

              <div className="absolute bottom-5 right-6 text-sm font-semibold text-primary opacity-0 transition group-hover:opacity-100">
                查看师资 →
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeacherCarousel;