interface I_CountryData {
  code: string;
  name: string;
  flag_url: string;
  flag_alt: string;
}

export interface I_GetCountryListSuccessResponse {
  data: I_CountryData[];
}
