export const getAccessTokenAPIURL = (code: string) =>
  `/api/get_access_token?code=${code}`;
export const postLoginAPIURL = () => `/api/login`;
