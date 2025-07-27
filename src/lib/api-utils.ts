import { signOut } from "next-auth/react";

export const handleApiError = (error: unknown, response?: Response) => {
  // Check if it's a 401 error from fetch response
  if (response?.status === 401) {
    signOut({ callbackUrl: "/login" });
    return;
  }

  // Check if it's a 401 error from error message
  if (error instanceof Error && error.message.includes("401")) {
    signOut({ callbackUrl: "/login" });
    return;
  }

  // Re-throw other errors
  throw error;
};

export const createApiRequest = async (
  url: string,
  options: RequestInit & { accessToken?: string } = {}
) => {
  const { accessToken, ...fetchOptions } = options;

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      ...fetchOptions.headers,
    },
  });

  if (!response.ok) {
    // Handle 401 errors by redirecting to login
    if (response.status === 401) {
      signOut({ callbackUrl: "/login" });
      return;
    }

    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response;
};
