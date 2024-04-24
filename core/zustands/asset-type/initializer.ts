"use client";

import { AssetTypeSlice, useCommonStore } from "./store";

export default function CommonStoreInitializer({
  value,
  children,
}: {
  value: AssetTypeSlice["data"];
  children: React.ReactNode;
}) {
  useCommonStore.setState({
    data: value,
  });
  return children;
}
