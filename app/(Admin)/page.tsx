import { fetchGetAssetType, fetchGetUserData } from "@/core/services/server";

export default async function AdminPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const assetType = await fetchGetAssetType();
  const user = await fetchGetUserData();

  console.log(assetType);
  console.log(user);

  return children;
}
