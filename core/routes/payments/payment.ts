export const getHasStripeAccountAPIURL = () =>
  "/api/payments/has-stripe-account";
export const getPaymentStatusAPIURL = () => "/api/payments/status";
export const postPaymentConsentAPIURL = () => "/api/payments/consent";
export const postPaymentRequestedAPIURL = (id: string) =>
  `/api/chat_tickets/${id}/request_payment`;
export const getPaymentReceiptAPIURL = (id: string) =>
  `/api/chat_tickets/${id}/download_invoice`;
export const getBillingPortalAPIURL = () => "/api/payments/billing-portal";
