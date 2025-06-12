import React from "react";
import { Payment } from "../../components";
import { getSession } from "@/service/server/session";
import { Role } from "@/types/admin/sidebar";

const PaymentFragment = async () => {
  const session = await getSession();
  return <Payment variant={session?.user?.role as keyof typeof Role} />;
};

export default PaymentFragment;
