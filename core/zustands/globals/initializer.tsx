"use client";
import {
  I_GetAssetTypeSuccessResponse,
  I_GetUserDataSuccessResponse,
} from "@/core/models/common";
import React, { PropsWithChildren } from "react";
import { useAssetTypeStore } from "./store/asset-type";
import { useUserStore } from "./store/user";

export const GlobalInitializer: React.FC<
  {
    users: I_GetUserDataSuccessResponse["data"];
    assetTypes: I_GetAssetTypeSuccessResponse["data"];
  } & PropsWithChildren
> = ({ children, users, assetTypes }) => {
  useUserStore.setState({ data: users });
  useAssetTypeStore.setState({ data: assetTypes });
  return children;
};
