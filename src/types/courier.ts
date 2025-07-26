export interface ContactPerson {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  nin: string | null;
  address: string;
  username: string;
}

export interface Profile {
  applicant_name: string;
  applicant_position: string;
  business_name: string;
  cac_number: string;
  address: string;
  license_category: {
    name: string;
    description: string;
    price: string;
    renewal_price: string;
  };
  state: {
    id: number;
    name: string;
    short_name: string;
  };
}

export interface Courier {
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

export interface CouriersResponse {
  status: string;
  message: string;
  data: {
    meta: Meta;
    couriers: Courier[];
  };
}

export interface CouriersParams {
  sort?: "asc" | "desc";
  date_range?: string;
  per_page?: number;
  page?: number;
  name?: string;
  reference?: string;
  status?: string;
  activated?: boolean;
}
