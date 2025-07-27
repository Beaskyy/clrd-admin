"use client";

import { Skeleton } from "@/components/ui/skeleton";

interface ApprovalTrailsSkeletonProps {
  trails?: number;
}

export function ApprovalTrailsSkeleton({
  trails = 3,
}: ApprovalTrailsSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: trails }).map((_, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-4 w-32" />
          </div>

          <div className="mb-3">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Skeleton className="w-8 h-8 rounded-full" />
              <Skeleton className="h-4 w-32" />
            </div>
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40" />
          </div>
        </div>
      ))}
    </div>
  );
}
