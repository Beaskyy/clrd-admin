import { useQuery } from "@tanstack/react-query";
import {
  LicenseApplicationsResponse,
  LicenseApplicationsParams,
} from "@/types/license-application";
import { useSession } from "next-auth/react";

const fetchLicenseApplications = async (
  params: LicenseApplicationsParams,
  accessToken?: string
): Promise<LicenseApplicationsResponse> => {
  const searchParams = new URLSearchParams();

  // Add parameters to search params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.append(key, value.toString());
    }
  });

  const url = `${
    process.env.NEXT_PUBLIC_API_URL
  }/admin/license-applications?${searchParams.toString()}`;

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
      `Failed to fetch license applications: ${response.statusText}`
    );
  }

  return response.json();
};

export const useLicenseApplications = (
  params: LicenseApplicationsParams = {}
) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["license-applications", params],
    queryFn: () => fetchLicenseApplications(params, session?.accessToken),
    enabled: !!session?.accessToken, // Only fetch when user is authenticated
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep data in cache for 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors
      if (error instanceof Error && error.message.includes("401")) return false;
      if (error instanceof Error && error.message.includes("403")) return false;
      return failureCount < 3;
    },
  });
};
