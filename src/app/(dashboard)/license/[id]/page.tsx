"use client";

import { useParams } from "next/navigation";
import { useLicenseApplicationDetail } from "@/hooks/use-license-application-detail";
import { useCreateApprovalTrail } from "@/hooks/use-create-approval-trail";
import { useApprovalTrails } from "@/hooks/use-approval-trails";
import { useRouter } from "next/navigation";
import { ChevronLeft, Ellipsis } from "lucide-react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function LicenseDetails() {
  const router = useRouter();
  const params = useParams();
  const licenseUuid = params.id as string;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    "approved" | "rejected" | "requested_more_info"
  >("approved");
  const [comment, setComment] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [showCommentError, setShowCommentError] = useState(false);

  // Approval trail hook
  const createApprovalTrail = useCreateApprovalTrail(licenseUuid);

  // Handle approval actions
  const handleApprovalAction = (
    action: "approved" | "rejected" | "requested_more_info"
  ) => {
    setSelectedAction(action);

    switch (action) {
      case "approved":
        setModalTitle("Approve application");
        setModalDescription(
          "Enter the reasons for approving license application"
        );
        break;
      case "rejected":
        setModalTitle("Reject application");
        setModalDescription(
          "Enter the reasons for rejecting license application"
        );
        break;
      case "requested_more_info":
        setModalTitle("Request additional information");
        setModalDescription("Enter the additional information required");
        break;
    }

    setIsOpen(true);
  };

  const handleSubmitApproval = async () => {
    if (!comment.trim()) {
      setShowCommentError(true);
      return;
    }

    setShowCommentError(false);

    try {
      await createApprovalTrail.mutateAsync({
        action: selectedAction,
        comment: comment.trim(),
      });

      setComment("");
      setIsOpen(false);
      toast.success("Approval trail created successfully!");
    } catch (error) {
      console.error("Error creating approval trail:", error);
      toast.error("Failed to create approval trail. Please try again.");
    }
  };

  // Fetch license application details using the hook
  const { data, isLoading, error } = useLicenseApplicationDetail(licenseUuid);
  const license = data?.data;

  // Fetch approval trails
  const { data: approvalTrailsData, isLoading: approvalTrailsLoading } =
    useApprovalTrails(licenseUuid);
  const approvalTrails = approvalTrailsData?.data || [];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5]">
        <div className="bg-white rounded-lg p-6">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            <span className="ml-2">Loading license application details...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !license) {
    return (
      <div className="flex flex-col gap-[22px] md:p-9 p-5 bg-[#F5F5F5]">
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-xl font-semibold text-[#101828] mb-4">
            License Application Not Found
          </h2>
          <p className="text-[#667085]">
            The license application you&apos;re looking for doesn&apos;t exist
            or there was an error loading the data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-4 bg-[#f5f5f5] pt-8 min-h-[calc(100vh-66px)]">
      <div
        onClick={() => router.back()}
        className="flex items-center gap-1 border w-[98px] h-[38px] p-2.5 pl-1.5 bg-white border-[#F0F2F4] rounded-[40px] text-sm text-[#344054] font-medium whitespace-nowrap hover:shadow-sm cursor-pointe lg:ml-9 ml-5 cursor-pointer"
      >
        <ChevronLeft className="size-[18px]" />
        <span>Go Back</span>
      </div>
      <div className="flex flex-col gap-6 md:p-9 p-5 bg-[#F5F5F5]">
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center  border-b border-[#F3F4F6] pb-1 mb-4">
            <div className="flex flex-col">
              <p className="text-base text-[#101828] font-semibold tracking-[0.1%]">
                Company details
              </p>
            </div>

            <Popover>
              <PopoverTrigger>
                <Ellipsis className="size-[20px] text-[#344054] cursor-pointer" />
              </PopoverTrigger>

              <PopoverContent className="shadow-md w-[274px] rounded-lg border border-[#F2F4F7] p-0 lg:mr-9">
                <div className="py-3 px-4 border-b border-[#EAECF0] text-sm font-semibold text-[#344054]">
                  More
                </div>

                <div
                  onClick={() => handleApprovalAction("approved")}
                  className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer"
                >
                  <Image
                    src="/images/coin-stack.svg"
                    alt="coin-stack"
                    width={20}
                    height={20}
                  />
                  <div className="text-sm font-medium text-[#344054]">
                    Approve
                  </div>
                </div>
                <div
                  onClick={() => handleApprovalAction("rejected")}
                  className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer"
                >
                  <Image
                    src="/images/ban.svg"
                    alt="ban"
                    width={20}
                    height={20}
                  />
                  <div className="text-sm font-medium text-[#344054]">
                    Reject application
                  </div>
                </div>
                <div
                  onClick={() => handleApprovalAction("requested_more_info")}
                  className="flex items-center gap-3 py-2.5 px-4 hover:bg-[#F9FAFB] cursor-pointer"
                >
                  <Image
                    src="/images/file-dots.svg"
                    alt="file-dots"
                    width={20}
                    height={20}
                  />
                  <div className="text-sm font-medium text-[#344054]">
                    Request additional information
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogContent className="max-w-[640px]">
                <DialogHeader>
                  <DialogTitle className="border-b border-[#F3F4F6] font-inter font-normal">
                    <div className="flex flex-col">
                      <p className="text-lg text-[#101828] font-semibold tracking-[0.1%]">
                        {modalTitle}
                      </p>
                      <p className="text-sm text-[#667085] mb-1">
                        {modalDescription}
                      </p>
                    </div>
                  </DialogTitle>

                  <div className="flex flex-col gap-1 mt-2">
                    <label className="lg:text-sm text-xs text-[#667085]">
                      {selectedAction === "approved"
                        ? "Reason for approval"
                        : selectedAction === "rejected"
                        ? "Reason for rejection"
                        : "Additional information required"}
                    </label>
                    <Textarea
                      placeholder="Type here"
                      value={comment}
                      onChange={(e) => {
                        setComment(e.target.value);
                        if (showCommentError) setShowCommentError(false);
                      }}
                      className={
                        showCommentError
                          ? "border-red-500 focus:border-red-500"
                          : ""
                      }
                    />
                    {showCommentError && (
                      <p className="text-sm text-red-500 mt-1">
                        Please enter a comment before submitting
                      </p>
                    )}
                  </div>
                </DialogHeader>
                <div className="flex justify-end items-center gap-3 mt-6">
                  <Button
                    onClick={() => setIsOpen(false)}
                    className="bg-transparent border border-[#F3F4F6] rounded-lg h-10 py-2.5 px-4 text-[#344054] text-sm font-medium hover:bg-transparent hover: shadow-sm"
                  >
                    Go Back
                  </Button>
                  <Button
                    onClick={handleSubmitApproval}
                    disabled={createApprovalTrail.isPending}
                    className="rounded-lg h-10 text-sm font-medium py-2.5 px-4"
                  >
                    {createApprovalTrail.isPending ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Company Name
              </label>
              <p className="lg:text-base text-sm font-medium text-[#101828]">
                {license.owner.name}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">Email</label>
              <p className="lg:text-base text-sm text-[#101828]">
                {license.owner.email}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">Phone</label>
              <p className="lg:text-base text-sm text-[#101828]">
                {license.owner.phone}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Status
              </label>
              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                    license.status === "approved"
                      ? "bg-[#ECFDF3] text-[#027A48]"
                      : license.status === "Rejected"
                      ? "text-[#F43754] bg-[#FEF5F7]"
                      : "bg-[#FFF8EF] text-[#E7B114]"
                  }`}
                >
                  {license.status}
                </span>
              </div>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Date Created
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {license.created_at}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center  border-b border-[#F3F4F6] pb-1 mb-4">
            <div className="flex flex-col">
              <p className="text-base text-[#101828] font-semibold tracking-[0.1%]">
                Profile Details
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Applicant Name
              </label>
              <p className="lg:text-base text-sm font-medium text-[#101828]">
                {license.owner.profile.applicant_name}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Applicant Position
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {license.owner.profile.applicant_position}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Business Name
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {license.owner.profile.business_name}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                CAC Number
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {license.owner.profile.cac_number}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Address
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {license.owner.profile.address}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                License Category
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                {license.owner.profile.license_category.name}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">State</label>
              <p className="lg:text-base text-sm text-[#101828]">
                {license.owner.profile.state.name}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                License Price
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                ₦{license.owner.profile.license_category.price}
              </p>
            </div>
            <div>
              <label className="lg:text-sm text-xs text-[#667085]">
                Renewal Price
              </label>
              <p className="lg:text-base text-sm text-[#101828]">
                ₦{license.owner.profile.license_category.renewal_price}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center  border-b border-[#F3F4F6] pb-1 mb-4">
            <div className="flex flex-col">
              <p className="text-base text-[#101828] font-semibold tracking-[0.1%]">
                Company Documents
              </p>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
            {license.tenancy_document && (
              <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/images/file-icon.svg"
                      alt="file-icon"
                      width={32}
                      height={32}
                    />
                    <p className="text-sm font-medium text-[#171717]">
                      Tenancy Document
                    </p>
                  </div>
                  <a
                    href={license.tenancy_document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center border border-[#F3F4F6] shadow-sm py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]"
                  >
                    View
                  </a>
                </div>
              </div>
            )}
            {license.good_in_transit_document && (
              <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/images/file-icon.svg"
                      alt="file-icon"
                      width={32}
                      height={32}
                    />
                    <p className="text-sm font-medium text-[#171717]">
                      Good in Transit Document
                    </p>
                  </div>
                  <a
                    href={license.good_in_transit_document}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center border border-[#F3F4F6] shadow-sm py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]"
                  >
                    View
                  </a>
                </div>
              </div>
            )}
            {license.branded_envelope && (
              <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/images/file-icon.svg"
                      alt="file-icon"
                      width={32}
                      height={32}
                    />
                    <p className="text-sm font-medium text-[#171717]">
                      Branded Envelope
                    </p>
                  </div>
                  <a
                    href={license.branded_envelope}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center border border-[#F3F4F6] shadow-sm py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]"
                  >
                    View
                  </a>
                </div>
              </div>
            )}
            {license.letter_head && (
              <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/images/file-icon.svg"
                      alt="file-icon"
                      width={32}
                      height={32}
                    />
                    <p className="text-sm font-medium text-[#171717]">
                      Letter Head
                    </p>
                  </div>
                  <a
                    href={license.letter_head}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center border border-[#F3F4F6] shadow-sm py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]"
                  >
                    View
                  </a>
                </div>
              </div>
            )}
            {license.waybill && (
              <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/images/file-icon.svg"
                      alt="file-icon"
                      width={32}
                      height={32}
                    />
                    <p className="text-sm font-medium text-[#171717]">
                      Waybill
                    </p>
                  </div>
                  <a
                    href={license.waybill}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center border border-[#F3F4F6] shadow-sm py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]"
                  >
                    View
                  </a>
                </div>
              </div>
            )}
            {license.receipt && (
              <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/images/file-icon.svg"
                      alt="file-icon"
                      width={32}
                      height={32}
                    />
                    <p className="text-sm font-medium text-[#171717]">
                      Receipt
                    </p>
                  </div>
                  <a
                    href={license.receipt}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center border border-[#F3F4F6] shadow-sm py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]"
                  >
                    View
                  </a>
                </div>
              </div>
            )}
            {license.representative_nin && (
              <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/images/file-icon.svg"
                      alt="file-icon"
                      width={32}
                      height={32}
                    />
                    <p className="text-sm font-medium text-[#171717]">
                      Representative NIN
                    </p>
                  </div>
                  <a
                    href={license.representative_nin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center border border-[#F3F4F6] shadow-sm py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]"
                  >
                    View
                  </a>
                </div>
              </div>
            )}
            {license.application_letter && (
              <div className="flex items-center border border-[#EBEBEB] p-4 pl-3.5 rounded-xl">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-1">
                    <Image
                      src="/images/file-icon.svg"
                      alt="file-icon"
                      width={32}
                      height={32}
                    />
                    <p className="text-sm font-medium text-[#171717]">
                      Application Letter
                    </p>
                  </div>
                  <a
                    href={license.application_letter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-center items-center border border-[#F3F4F6] shadow-sm py-1 px-3.5 rounded-lg text-sm text-[#344054] font-medium cursor-pointer hover:bg-[#F9FAFB]"
                  >
                    View
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Approval Trails Section */}
        <div className="bg-white rounded-lg p-6">
          <div className="flex justify-between items-center border-b border-[#F3F4F6] pb-1 mb-4">
            <div className="flex flex-col">
              <p className="text-base text-[#101828] font-semibold tracking-[0.1%]">
                Approval History
              </p>
            </div>
          </div>

          {approvalTrailsLoading ? (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
              <span className="ml-2">Loading approval history...</span>
            </div>
          ) : approvalTrails.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-600">No approval history found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {approvalTrails.map((trail) => {
                const getActionColor = (action: string) => {
                  switch (action.toLowerCase()) {
                    case "approved":
                      return "bg-green-100 text-green-800";
                    case "rejected":
                      return "bg-red-100 text-red-800";
                    case "requested more info":
                      return "bg-yellow-100 text-yellow-800";
                    default:
                      return "bg-gray-100 text-gray-800";
                  }
                };

                return (
                  <div
                    key={trail.id}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${getActionColor(
                            trail.action
                          )}`}
                        >
                          {trail.action}
                        </span>
                        <span className="text-sm text-gray-500">
                          Level: {trail.level}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        {trail.created_at}
                      </span>
                    </div>

                    <div className="mb-3">
                      <p className="text-gray-700 text-sm leading-relaxed">
                        {trail.comment}
                      </p>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium text-gray-700">
                            {trail.admin.first_name.charAt(0)}
                            {trail.admin.last_name.charAt(0)}
                          </span>
                        </div>
                        <span>
                          {trail.admin.first_name} {trail.admin.last_name}
                        </span>
                      </div>
                      <span>•</span>
                      <span>{trail.admin.email}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
