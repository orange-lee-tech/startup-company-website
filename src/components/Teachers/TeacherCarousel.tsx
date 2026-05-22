"use client";

import { featuredTeachers } from "@/data/teachers";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const AUTOPLAY_INTERVAL = 4500;
const VISIBLE_COUNT = 3;

const TeacherCarousel = () => {
  const teachers = featuredTeachers;
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const visibleTeachers = useMemo(() => {
    if (teachers.length <= VISIBLE_COUNT) {
      return teachers;
    }

    return Array.from({ length: VISIBLE_COUNT }, (_, offset) => {
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

  useEffect(() => {
    if (teachers.length <= VISIBLE_COUNT || isPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setStartIndex((current) => (current + 1) % teachers.length);
    }, AUTOPLAY_INTERVAL);

    return () => window.clearInterval(timer);
  }, [isPaused, teachers.length]);

  if (!teachers.length) {
    return null;
  }

  return (
    <section className="bg-gray-light py-12 dark:bg-bg-color-dark md:py-14 lg:py-18">
      <div className="container">
        <div className="mb-8 flex flex-col justify-between gap-5 md:flex-row md:items-end">
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
              className="flex h-11 w-11 items-center justify-center rounded-full border border-body-color/20 bg-white text-black shadow-btn transition hover:border-primary hover:bg-primary hover:text-white dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:border-yellow dark:hover:text-yellow"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M15 5 8 12l7 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="下一组师资"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-body-color/20 bg-white text-black shadow-btn transition hover:border-primary hover:bg-primary hover:text-white dark:border-white/15 dark:bg-white/10 dark:text-white dark:hover:border-yellow dark:hover:text-yellow"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="m9 5 7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="grid grid-cols-3 gap-2 overflow-hidden rounded-2xl border border-body-color/10 bg-white p-2 dark:border-white/10 dark:bg-gray-dark sm:gap-3 sm:p-3 lg:gap-0 lg:p-0"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {visibleTeachers.map((teacher, index) => (
            <Link
              key={`${teacher.id}-${index}`}
              href="/teachers"
              className="group relative flex min-h-[210px] flex-col overflow-hidden rounded-xl bg-white transition hover:z-10 hover:shadow-three dark:bg-gray-dark sm:min-h-[260px] lg:min-h-[430px] lg:rounded-none lg:border-r lg:border-body-color/10 lg:last:border-r-0 lg:dark:border-white/10"
            >
              <div className="relative flex h-[104px] w-full items-end justify-center overflow-hidden bg-linear-to-b from-[#EEF3FF] to-white px-2 pt-2 dark:from-bg-color-dark dark:to-gray-dark sm:h-[140px] md:h-[180px] lg:h-[285px]">
                <Image
                  src={teacher.portraitImage}
                  alt={teacher.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 33vw"
                  className="object-contain object-bottom transition duration-500 group-hover:scale-105"
                />
              </div>

              <div className="flex flex-1 flex-col p-2 text-center sm:p-4 lg:p-7 lg:text-left">
                <p className="mb-1 line-clamp-1 text-[11px] font-semibold leading-tight text-primary sm:text-sm lg:mb-2">
                  {teacher.title}
                </p>

                <h3 className="mb-1 text-base font-bold leading-tight text-black transition group-hover:text-primary dark:text-white sm:text-xl lg:mb-3 lg:text-2xl">
                  {teacher.name}
                </h3>

                <p className="line-clamp-2 text-[11px] leading-relaxed text-body-color dark:text-body-color-dark sm:text-sm lg:text-base">
                  {teacher.school}
                </p>

                <p className="mt-auto hidden pt-4 text-sm font-semibold text-primary opacity-0 transition group-hover:opacity-100 lg:block">
                  查看师资 →
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-5 flex justify-center gap-2">
          {teachers.slice(0, Math.min(teachers.length, 6)).map((teacher, index) => (
            <button
              key={teacher.id}
              type="button"
              onClick={() => setStartIndex(index)}
              aria-label={`切换到第 ${index + 1} 组师资`}
              className={`h-2 rounded-full transition ${
                index === startIndex
                  ? "w-6 bg-primary dark:bg-yellow"
                  : "w-2 bg-body-color/30 hover:bg-primary/50 dark:bg-white/25 dark:hover:bg-yellow/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeacherCarousel;