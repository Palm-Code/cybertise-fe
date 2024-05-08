export const getCompanyStaffAPIURL = () => "/api/company_staffs";
export const getCompanyStaffDetailAPIURL = (id: string) =>
  `/api/company_staffs/${id}`;
export const postCompanyStaffAPIURL = () => "/api/company_staffs";
export const updateCompanyStaffAPIURL = (id: string) =>
  `/api/company_staffs/${id}?_method=PATCH`;
export const deleteCompanyStaffAPIURL = (id: string) =>
  `/api/company_staffs/${id}`;
