import { prefetchGetUserData } from "@/core/react-query/server";
import { prefetchGetAssetType } from "@/core/react-query/server/prefetchGetAssetType";
import { GlobalInitializer } from "@/core/zustands/globals";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await prefetchGetUserData();
  const assetType = await prefetchGetAssetType();
  return (
    <GlobalInitializer
      users={user}
      assetTypes={assetType.data}
    >
      {children}
    </GlobalInitializer>
  );
}
