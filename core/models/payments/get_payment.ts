export interface I_GetHasStripeAccountStatusResponse {
  has_stripe_account: boolean;
  has_completed_onboarding: boolean;
  url: string;
}

export interface I_GetHasStripeAccountStatusSuccessResponse {
  data: I_GetHasStripeAccountStatusResponse;
}
