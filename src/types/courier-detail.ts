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

export interface CourierDetail {
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
  users_count: number;
  activated: boolean;
  has_active_license_application: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CourierDetailResponse {
  status: string;
  message: string;
  data: CourierDetail;
}
