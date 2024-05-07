export const getVulnerabiltyTypeAPIURL = () => "/api/vulnerabiity_types";
export const getAssetTypeAPIURL = () => "/api/asset_types";
export const getTargetAssetAPIURL = () => "/api/target_assets";
export const getChatListItemAPIURL = () => "/api/chat_items";
export const postFileTempAPIURL = () => "/api/temporary_files";
export const postChatItemAPIURL = () => "/api/chat_items";
export const postCreateVrpAPIURL = () => "/api/programs";
export const postUpdateVrpAPIURL = (id: string) =>
  `/api/programs/${id}?_method=PATCH`;
export const getUserProfileAPIURL = () => "/api/my_profile";
export const postUpdateProfileAPIURL = () => "/api/my_profile?_method=PATCH";
export const getCountryListAPIURL = () => "/api/countries";
