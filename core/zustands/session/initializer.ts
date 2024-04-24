"use client";

import { useRef } from "react";

import { SessionSlice, useSessionStore } from "./store";

export default function LoginClientStoreInitializer(state: SessionSlice) {
  const initialized = useRef(false);
  if (!initialized.current) {
    useSessionStore.setState(state);
    initialized.current = true;
  }
  return null;
}
