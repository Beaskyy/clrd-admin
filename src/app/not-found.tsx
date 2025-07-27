"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
      <div className="max-w-md w-full mx-auto px-6">
        {/* 404 Illustration */}
        <div className="text-center mb-8">
          <div className="w-32 h-32 mx-auto mb-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-[#EAECF0]">
            <div className="text-6xl font-bold text-[#667085]">404</div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-[#EAECF0]">
          <div className="text-center">
            {/* Title */}
            <h1 className="text-2xl font-semibold text-[#101828] mb-3">
              Page Not Found
            </h1>

            {/* Description */}
            <p className="text-base text-[#667085] mb-8 leading-relaxed">
              Sorry, we couldn&apos;t find the page you&apos;re looking for. The
              page might have been moved, deleted, or you entered the wrong URL.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                onClick={() => router.back()}
                variant="outline"
                className="flex items-center gap-2 border-[#F3F4F6] text-[#344054] hover:bg-[#F9FAFB]"
              >
                <ArrowLeft className="size-4" />
                Go Back
              </Button>

              <Button
                onClick={() => router.push("/")}
                className="flex items-center gap-2 bg-[#101828] hover:bg-[#1F2937]"
              >
                <Home className="size-4" />
                Go Home
              </Button>
            </div>
          </div>
        </div>

        {/* Additional Help */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#667085]">
            Need help?{" "}
            <button
              onClick={() => router.push("/")}
              className="text-[#101828] font-medium hover:underline"
            >
              Contact support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
