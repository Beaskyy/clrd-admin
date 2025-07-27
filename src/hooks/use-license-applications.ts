import { useQuery } from "@tanstack/react-query";
import {
  LicenseApplicationsResponse,
  LicenseApplicationsParams,
} from "@/types/license-application";
import { useSession } from "next-auth/react";
import { createApiRequest } from "@/lib/api-utils";

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

  const response = await createApiRequest(url, {
    method: "GET",
    accessToken,
  });

  if (!response) {
    // Response is null when 401 redirect happens
    throw new Error("Unauthorized");
  }

  return response.json();
};

export const useLicenseApplications = (
  params: LicenseApplicationsParams = {}
) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["license-applications", params],
    queryFn: () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchLicenseApplications(params, (session as any)?.accessToken),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    enabled: !!(session as any)?.accessToken, // Only fetch when user is authenticated
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
