import { CourierDetail, CourierDetailResponse } from "@/types/courier-detail";

export const mockCourierDetail: CourierDetail = {
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
  users_count: 1,
  activated: true,
  has_active_license_application: true,
  created_at: "Wed, Jul 2, 2025 2:15 PM",
  updated_at: "1 week ago",
  deleted_at: null,
};

export const mockCourierDetailResponse: CourierDetailResponse = {
  status: "success",
  message: "Courier fetched successfully.",
  data: mockCourierDetail,
};
