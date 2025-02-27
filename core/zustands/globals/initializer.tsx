"use client";
import React, { PropsWithChildren } from "react";
import { useAssetTypeStore } from "./store/asset-type";
import { useUserStore } from "./store/user";
import { Role } from "@/types/admin/sidebar";
import { useGetAssetType, useGetUserData } from "@/core/react-query/client";
import { Loader } from "@/core/ui/components";

export const GlobalInitializer: React.FC<
  {
    role: keyof typeof Role;
  } & PropsWithChildren
> = ({ children, role }) => {
  const { data, isLoading } = useGetUserData();
  const { data: assetTypes } = useGetAssetType();
  if (isLoading) return <Loader variant={role} />;
  useUserStore.setState({ data: data });
  useAssetTypeStore.setState({ data: assetTypes });
  return children;
};
