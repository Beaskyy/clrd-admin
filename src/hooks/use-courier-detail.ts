import { useQuery } from "@tanstack/react-query";
import { CourierDetailResponse } from "@/types/courier-detail";
import { useSession } from "next-auth/react";
import { createApiRequest } from "@/lib/api-utils";

const fetchCourierDetail = async (
  courierUuid: string,
  accessToken?: string
): Promise<CourierDetailResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/couriers/${courierUuid}`;

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

export const useCourierDetail = (courierUuid: string) => {
  const { data: session } = useSession();

  return useQuery({
    queryKey: ["courier-detail", courierUuid],
    queryFn: () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      fetchCourierDetail(courierUuid, (session as any)?.accessToken),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    enabled: !!(session as any)?.accessToken && !!courierUuid, // Only fetch when user is authenticated and UUID is provided
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    gcTime: 10 * 60 * 1000, // Keep data in cache for 10 minutes
    retry: (failureCount, error) => {
      // Don't retry on 401/403 errors
      if (error instanceof Error && error.message.includes("401")) return false;
      if (error instanceof Error && error.message.includes("403")) return false;
      if (error instanceof Error && error.message.includes("404")) return false; // Don't retry if courier not found
      return failureCount < 3;
    },
  });
};
