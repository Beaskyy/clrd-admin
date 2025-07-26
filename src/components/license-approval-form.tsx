"use client";

import { useState } from "react";
import { useCreateLicenseApprovalTrail } from "@/hooks/use-create-license-approval-trail";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ApprovalAction } from "@/types/license-approval-trail";

interface LicenseApprovalFormProps {
  licenseUuid: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export const LicenseApprovalForm = ({
  licenseUuid,
  onSuccess,
  onError,
}: LicenseApprovalFormProps) => {
  const [action, setAction] = useState<ApprovalAction>("approved");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createApprovalTrail = useCreateLicenseApprovalTrail();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!comment.trim()) {
      onError?.("Comment is required");
      return;
    }

    setIsSubmitting(true);

    try {
      await createApprovalTrail.mutateAsync({
        licenseUuid,
        payload: {
          action,
          comment: comment.trim(),
        },
      });

      setComment("");
      onSuccess?.();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create approval trail";
      onError?.(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getActionButtonStyle = (actionType: ApprovalAction) => {
    const baseStyle = "px-4 py-2 rounded-lg font-medium transition-colors";

    if (action === actionType) {
      switch (actionType) {
        case "approved":
          return `${baseStyle} bg-green-500 text-white`;
        case "rejected":
          return `${baseStyle} bg-red-500 text-white`;
        case "requested_more_info":
          return `${baseStyle} bg-yellow-500 text-white`;
        default:
          return `${baseStyle} bg-gray-500 text-white`;
      }
    }

    return `${baseStyle} bg-gray-100 text-gray-700 hover:bg-gray-200`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        License Approval Action
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Action Buttons */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">
            Select Action
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setAction("approved")}
              className={getActionButtonStyle("approved")}
            >
              Approve
            </button>
            <button
              type="button"
              onClick={() => setAction("rejected")}
              className={getActionButtonStyle("rejected")}
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => setAction("requested_more_info")}
              className={getActionButtonStyle("requested_more_info")}
            >
              Request More Info
            </button>
          </div>
        </div>

        {/* Comment Field */}
        <div className="space-y-2">
          <label
            htmlFor="comment"
            className="text-sm font-medium text-gray-700"
          >
            Comment
          </label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your approval comment..."
            className="min-h-[100px] resize-none"
            required
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting || !comment.trim()}
          className="w-full"
        >
          {isSubmitting ? "Processing..." : "Submit Approval"}
        </Button>

        {/* Error Display */}
        {createApprovalTrail.error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              {createApprovalTrail.error.message}
            </p>
          </div>
        )}

        {/* Success Display */}
        {createApprovalTrail.isSuccess && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-600">
              Approval trail created successfully!
            </p>
          </div>
        )}
      </form>
    </div>
  );
};
