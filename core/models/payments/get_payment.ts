export interface I_GetHasStripeAccountStatusResponse {
  has_stripe_account: boolean;
  has_completed_onboarding: boolean;
  url: string;
}

export interface I_GetHasStripeAccountStatusSuccessResponse {
  data: I_GetHasStripeAccountStatusResponse;
}

export interface I_GetPaymentStatusResponse {
  active: boolean;
  status: string;
  ends_at: string | null;
  check: boolean;
}

export interface I_GetPaymentStatusSuccessResponse {
  data: I_GetPaymentStatusResponse;
}

export interface I_PostPaymentConsentSuccessResponse {
  data: {
    url: string;
  };
}
