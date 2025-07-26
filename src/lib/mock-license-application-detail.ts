import {
  LicenseApplicationDetail,
  LicenseApplicationDetailResponse,
} from "@/types/license-application-detail";

export const mockLicenseApplicationDetail: LicenseApplicationDetail = {
  id: 1,
  uuid: "9f7787ca-2370-4de6-9e28-0900a18a8fe8",
  reference: "CLRD-LICAPP-20250724-1753357280-JKAXP8",
  type: "new",
  owner: {
    id: 1,
    uuid: "9f4b67a5-d12e-4fa8-a2a1-a84503788a75",
    name: "Ngozi Inc PLC",
    slug: "ngozi-inc-plc",
    reference: "CLRD-COUR-20250702-1751462102-KUGMFP",
    registration_number: "e0765a9f-d170-4f6b-9e19-207e350b328f",
    phone: "0705976024",
    email: "chinedu.busari@hotmail.com",
    address: "66 Adaobi Street 92 768 AdeboyeVille",
    contact_person: {
      first_name: "Catharine",
      last_name: "Rosenbaum",
      phone: "08082345678",
      email: "Georgianna_Welch@yahoo.com",
      nin: null,
      address: "280 Veum Ford",
      username: "catharine-rosenbaum-gmw",
    },
    webhook_url: null,
    activated_at: "Wed, Jul 16, 2025 4:23 PM",
    profile: {
      applicant_name: "Catharine Rosenbaum",
      applicant_position: "Corporate Integration Consultant",
      business_name: "Ngozi Inc PLC",
      cac_number: "e0765a9f-d170-4f6b-9e19-207e350b328f",
      address: "25235 Fritsch Coves",
      license_category: {
        name: "State/Special SME's",
        description:
          "Numquam deleniti voluptate eaque culpa blanditiis illum. Ut velit voluptatibus fuga numquam atque corporis. Porro molestias voluptatibus quis officiis qui sapiente. Ut natus quidem accusantium dolor voluptatem sed velit.",
        price: "250000.00",
        renewal_price: "100000.00",
      },
      state: {
        id: 25,
        name: "Lagos",
        short_name: "LA",
      },
    },
    activated: true,
    has_active_license_application: true,
    created_at: "Wed, Jul 2, 2025 2:15 PM",
    updated_at: "1 week ago",
    deleted_at: null,
  },
  license_category: {
    id: 1,
    uuid: "9f4b6512-927b-460f-911f-d4d6a9b72dda",
    name: "State/Special SME's",
    reference: "CLRD-LICAPP-20250726-1753509150-MUHNXM",
    description:
      "Numquam deleniti voluptate eaque culpa blanditiis illum. Ut velit voluptatibus fuga numquam atque corporis. Porro molestias voluptatibus quis officiis qui sapiente. Ut natus quidem accusantium dolor voluptatem sed velit.",
    price: "250,000.00",
    renewal_price: "100,000.00",
    inspection_fee: "50,000.00",
    created_at: "Wed, Jul 2, 2025 2:07 PM",
    updated_at: "7 hours ago",
    deleted_at: null,
  },
  tenancy_document:
    "http://clrd_accounts.test/storage/uploads/general-uploads/5zpk0hjp2l6pyj1blmoaz5t3bvdjquyzngnzd15jjpg.jpg?expires=1753536641&signature=5db714201b30f0776e5dd0741b3a6ab94e418e0dd323100fd1d5bce8a2a8aac2",
  tenancy_expiry_date: "Mon, Jan 1, 2035 12:00 AM",
  good_in_transit_document:
    "http://clrd_accounts.test/storage/uploads/general-uploads/5zpk0hjp2l6pyj1blmoaz5t3bvdjquyzngnzd15jjpg.jpg?expires=1753536641&signature=5db714201b30f0776e5dd0741b3a6ab94e418e0dd323100fd1d5bce8a2a8aac2",
  good_in_transit_expiry_date: "Mon, Jan 1, 2035 12:00 AM",
  branded_envelope:
    "http://clrd_accounts.test/storage/uploads/general-uploads/5zpk0hjp2l6pyj1blmoaz5t3bvdjquyzngnzd15jjpg.jpg?expires=1753536641&signature=5db714201b30f0776e5dd0741b3a6ab94e418e0dd323100fd1d5bce8a2a8aac2",
  letter_head:
    "http://clrd_accounts.test/storage/uploads/general-uploads/5zpk0hjp2l6pyj1blmoaz5t3bvdjquyzngnzd15jjpg.jpg?expires=1753536641&signature=5db714201b30f0776e5dd0741b3a6ab94e418e0dd323100fd1d5bce8a2a8aac2",
  waybill:
    "http://clrd_accounts.test/storage/uploads/general-uploads/5zpk0hjp2l6pyj1blmoaz5t3bvdjquyzngnzd15jjpg.jpg?expires=1753536641&signature=5db714201b30f0776e5dd0741b3a6ab94e418e0dd323100fd1d5bce8a2a8aac2",
  receipt:
    "http://clrd_accounts.test/storage/uploads/general-uploads/5zpk0hjp2l6pyj1blmoaz5t3bvdjquyzngnzd15jjpg.jpg?expires=1753536641&signature=5db714201b30f0776e5dd0741b3a6ab94e418e0dd323100fd1d5bce8a2a8aac2",
  representative_nin:
    "http://clrd_accounts.test/storage/eyJpdiI6IlZITVZ6WFQxUFV6aW1xM2J6OXpGSVE9PSIsInZhbHVlIjoiSWRsNC9QVk1TK0xvamtVejlGenhudz09IiwibWFjIjoiOWU5MTViZWUwOGEzZGM0OTgwODgxNWY3OTFlZTY3ZTVkY2VjZGI4ZTQ4OWVmOGI2M2YzMzU0MjMxNjNiNmY4OCIsInRhZyI6IiJ9?expires=1753536641&signature=e8d6657e9116a7f2cdd03d0f2530f2ea1dadd4c072e3fee58f8acd910155543b",
  application_letter:
    "http://clrd_accounts.test/storage/uploads/general-uploads/5zpk0hjp2l6pyj1blmoaz5t3bvdjquyzngnzd15jjpg.jpg?expires=1753536641&signature=5db714201b30f0776e5dd0741b3a6ab94e418e0dd323100fd1d5bce8a2a8aac2",
  approved_at: null,
  rejected_at: null,
  comment: null,
  amount: "250,000.00",
  current_level: "under_review_l1",
  status: "Pending Inspection",
  created_at: "Thu, Jul 24, 2025 12:41 PM",
  updated_at: "1 day ago",
};

export const mockLicenseApplicationDetailResponse: LicenseApplicationDetailResponse =
  {
    status: "success",
    message: "License application retrieved successfully.",
    data: mockLicenseApplicationDetail,
  };
