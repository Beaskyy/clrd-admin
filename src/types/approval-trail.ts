export interface Admin {
  id: number;
  uuid: string;
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  address: string;
  email_verified_at: string;
  roles: string[];
  permissions: string[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ApprovalTrail {
  id: number;
  uuid: string;
  action: string;
  comment: string;
  level: string;
  admin: Admin;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface ApprovalTrailsResponse {
  status: string;
  message: string;
  data: ApprovalTrail[];
}
