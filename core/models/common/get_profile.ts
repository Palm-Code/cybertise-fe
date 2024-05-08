interface I_Staff {
  id: string;
  name: string;
  email: string;
  email_verified_at: string | null;
  role: string;
  created_at: string;
  updated_at: string;
  company_id: string;
  about: string | null;
  phone: string;
}

interface I_UserData {
  id: string;
  name: string;
  website: string;
  country_code: string;
  address: string;
  address_2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  emergency_contact_person: string;
  emergency_email: string;
  emergency_phone: string;
  about: string;
  email: string;
  want_news: number;
  company_logo: string;
  company_status: string;
  company_reports_resolved: number;
  company_program_count: number;
  staff?: I_Staff[];
}

export interface I_GetUserProfileSuccessResponse {
  data: I_UserData;
}
