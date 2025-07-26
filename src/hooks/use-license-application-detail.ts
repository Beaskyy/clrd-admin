import { useQuery } from "@tanstack/react-query";
import { LicenseApplicationDetailResponse } from "@/types/license-application-detail";
import { useSession } from "next-auth/react";

const fetchLicenseApplicationDetail = async (
  licenseUuid: string,
  accessToken?: string
): Promise<LicenseApplicationDetailResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/license-applications/${licenseUuid}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch license application details: ${response.statusText}`
    );
  }

  return response.json();
};

export const useLicenseApplicationDetail = (licenseUuid: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["license-application-detail", licenseUuid],
    queryFn: () =>
      fetchLicenseApplicationDetail(licenseUuid, session?.accessToken),
    enabled: !!session?.accessToken && !!licenseUuid, // Only fetch when user is authenticated and UUID is provided
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep data in cache for 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors
      if (error instanceof Error && error.message.includes("401")) return false;
      if (error instanceof Error && error.message.includes("403")) return false;
      if (error instanceof Error && error.message.includes("404")) return false; // Don't retry if license application not found
      return failureCount < 3;
    },
  });
};
