export const getVulnerabiltyTypeAPIURL = () => "/api/vulnerabiity_types";
export const getAssetTypeAPIURL = () => "/api/asset_types";
export const getAssetTypeDetailAPIURL = (id: string) =>
  `/api/asset_types/${id}`;
export const getTargetAssetAPIURL = () => "/api/target_assets";
export const getTargetAssetDetailAPIURL = (id: string) =>
  `/api/target_assets/${id}`;
export const getChatListItemAPIURL = () => "/api/chat_items";
export const postFileTempAPIURL = () => "/api/temporary_files";
export const postChatItemAPIURL = () => "/api/chat_items";
export const getChatListDetailAPIURL = (id: string) =>
  `/api/chat_tickets/${id}`;
export const postCreateVrpAPIURL = () => "/api/programs";
export const postUpdateVrpAPIURL = (id: string) =>
  `/api/programs/${id}?_method=PATCH`;
export const getUserProfileAPIURL = () => "/api/my_profile";
export const postUpdateProfileAPIURL = () => "/api/my_profile?_method=PATCH";
export const getCountryListAPIURL = () => "/api/countries";
export const getUserDataAPIURL = () => "/api/me";
export const getDownloadFileAPIURL = (id: string) => `/api/download/${id}`;
