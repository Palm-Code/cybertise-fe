import { fetchGetAssetType, fetchGetUserData } from "@/core/services/server";
import { GlobalInitializer } from "@/core/zustands/globals";

export default async function AdminPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const assetType = await fetchGetAssetType();
  const user = await fetchGetUserData();

  return (
    <GlobalInitializer
      users={user}
      assetTypes={assetType.data}
    >
      {children}
    </GlobalInitializer>
  );
}
