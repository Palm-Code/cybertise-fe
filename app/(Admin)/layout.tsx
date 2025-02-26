import { prefetchGetUserData } from "@/core/react-query/server";
import { prefetchGetAssetType } from "@/core/react-query/server/prefetchGetAssetType";
import { GlobalInitializer } from "@/core/zustands/globals";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const assetType = await prefetchGetAssetType();
  const user = await prefetchGetUserData();
  return (
    <GlobalInitializer
      users={user}
      assetTypes={assetType.data}
    >
      {children}
    </GlobalInitializer>
  );
}
