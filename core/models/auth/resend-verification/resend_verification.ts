export interface I_GetResendVerificationRequest {
  email: string;
  action: string;
}

export interface I_GetResendVerificationResponse {
  message: string;
}

export interface I_GetResendVerificationSuccessResponse {
  data: I_GetResendVerificationResponse;
}
