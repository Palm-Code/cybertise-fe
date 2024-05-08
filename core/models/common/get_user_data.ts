export interface I_UserData {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface I_GetUserDataSuccessResponse {
  data: I_UserData;
}
