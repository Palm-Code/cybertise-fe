"use client";
import { I_GetUserDataSuccessResponse } from "@/core/models/common";
import React, { PropsWithChildren } from "react";
import { useUserStore } from "./store";

export const UserInitializer: React.FC<
  { users: I_GetUserDataSuccessResponse["data"] } & PropsWithChildren
> = ({ children, users }) => {
  useUserStore.setState({ data: users });
  return children;
};
