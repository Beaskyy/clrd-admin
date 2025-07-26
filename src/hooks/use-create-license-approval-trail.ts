import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LicenseApprovalTrailRequest, LicenseApprovalTrailResponse } from '@/types/license-approval-trail';
import { useSession } from 'next-auth/react';

const createLicenseApprovalTrail = async (
  licenseUuid: string,
  payload: LicenseApprovalTrailRequest,
  accessToken?: string
): Promise<LicenseApprovalTrailResponse> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/admin/license-applications/${licenseUuid}/approval-trails`;
  
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(accessToken && { 'Authorization': `Bearer ${accessToken}` }),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `Failed to create approval trail: ${response.statusText}`);
  }

  return response.json();
};

export const useCreateLicenseApprovalTrail = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ licenseUuid, payload }: { licenseUuid: string; payload: LicenseApprovalTrailRequest }) =>
      createLicenseApprovalTrail(licenseUuid, payload, session?.accessToken),
    onSuccess: (data, variables) => {
      // Invalidate and refetch license application detail
      queryClient.invalidateQueries({
        queryKey: ['license-application-detail', variables.licenseUuid],
      });
      
      // Invalidate license applications list
      queryClient.invalidateQueries({
        queryKey: ['license-applications'],
      });
      
      // Optionally update the cache with the new data
      queryClient.setQueryData(
        ['license-application-detail', variables.licenseUuid],
        data
      );
    },
    onError: (error) => {
      console.error('Error creating approval trail:', error);
    },
  });
}; 