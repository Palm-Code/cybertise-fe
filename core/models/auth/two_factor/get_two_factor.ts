export interface I_GetEnableTwoFactorResponsePayload {
  password: string;
}

export interface I_GetEnableTwoFactorResponse {
  qr: string;
  secret: string;
}

export interface I_GetEnableTwoFactorSuccessResponse {
  data: I_GetEnableTwoFactorResponse;
}

export interface I_GetConfirmTwoFactorResponsePayload {
  code: string;
}

export interface I_GetConfirmTwoFactorResponse {
  secret: string;
}

export interface I_GetConfirmTwoFactorSuccessResponse {
  data: I_GetConfirmTwoFactorResponse;
}
