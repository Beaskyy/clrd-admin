"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface DetailPageSkeletonProps {
  sections?: number;
  cardsPerSection?: number;
}

export function DetailPageSkeleton({
  sections = 3,
  cardsPerSection = 3,
}: DetailPageSkeletonProps) {
  return (
    <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5]">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-6 w-80" />
      </div>

      {/* Action buttons */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Content sections */}
      {Array.from({ length: sections }).map((_, sectionIndex) => (
        <div key={sectionIndex} className="bg-white rounded-lg p-6">
          {/* Section header */}
          <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-1 mb-4">
            <Skeleton className="h-6 w-48" />
          </div>

          {/* Section content */}
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            {Array.from({ length: cardsPerSection }).map((_, cardIndex) => (
              <div key={cardIndex}>
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-6 w-32" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
