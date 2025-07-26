export interface ContactPerson {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  nin: string | null;
  address: string;
  username: string;
}

export interface LicenseCategory {
  name: string;
  description: string;
  price: string;
  renewal_price: string;
}

export interface State {
  id: number;
  name: string;
  short_name: string;
}

export interface Profile {
  applicant_name: string;
  applicant_position: string;
  business_name: string;
  cac_number: string;
  address: string;
  license_category: LicenseCategory;
  state: State;
}

export interface Owner {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  reference: string;
  registration_number: string;
  phone: string;
  email: string;
  address: string;
  contact_person: ContactPerson;
  webhook_url: string | null;
  activated_at: string;
  profile: Profile;
  activated: boolean;
  has_active_license_application: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface LicenseCategoryDetail {
  id: number;
  uuid: string;
  name: string;
  reference: string;
  description: string;
  price: string;
  renewal_price: string;
  inspection_fee: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface LicenseApplication {
  id: number;
  uuid: string;
  reference: string;
  type: string;
  owner: Owner;
  license_category: LicenseCategoryDetail;
  tenancy_document: string;
  tenancy_expiry_date: string;
  good_in_transit_document: string;
  good_in_transit_expiry_date: string;
  branded_envelope: string;
  letter_head: string;
  waybill: string;
  receipt: string;
  representative_nin: string;
  application_letter: string;
  approved_at: string | null;
  rejected_at: string | null;
  comment: string | null;
  amount: string;
  current_level: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: string | null;
  prev_page_url: string | null;
  path: string;
  from: number;
  to: number;
}

export interface LicenseApplicationsResponse {
  status: string;
  message: string;
  data: {
    meta: Meta;
    license_applications: LicenseApplication[];
  };
}

export interface LicenseApplicationsParams {
  sort?: "asc" | "desc";
  date_range?: string;
  type?: string;
  status?: string;
  license_category_type?: string;
  page?: number;
  per_page?: number;
}
