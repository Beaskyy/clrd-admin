import { useQuery } from "@tanstack/react-query";
import { ApprovalTrailsResponse } from "@/types/approval-trail";
import { useSession } from "next-auth/react";

const fetchApprovalTrails = async (
  licenseUuid: string,
  accessToken?: string
): Promise<ApprovalTrailsResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/license-applications/${licenseUuid}/approval-trails`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch approval trails: ${response.statusText}`);
  }

  return response.json();
};

export const useApprovalTrails = (licenseUuid: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["approval-trails", licenseUuid],
    queryFn: () => fetchApprovalTrails(licenseUuid, session?.accessToken),
    enabled: !!session?.accessToken && !!licenseUuid, // Only fetch when user is authenticated and UUID is provided
    staleTime: 2 * 60 * 1000, // Consider data fresh for 2 minutes (approval trails change frequently)
    gcTime: 5 * 60 * 1000, // Keep data in cache for 5 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors
      if (error instanceof Error && error.message.includes("401")) return false;
      if (error instanceof Error && error.message.includes("403")) return false;
      if (error instanceof Error && error.message.includes("404")) return false; // Don't retry if not found
      return failureCount < 3;
    },
  });
};
