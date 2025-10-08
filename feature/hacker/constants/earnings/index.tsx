import { Stripe } from "@/core/ui/icons";
import React from "react";

type EarningsType = {
  title: string;
  description: string;
  icon: React.ReactNode;
};

type EarningsListType = Record<"en" | "de", EarningsType[]>;

export const earningsList: EarningsListType = {
  en: [
    {
      title: "Earnings Overview",
      description:
        "Open your stripe account, see your earnings overview, and withdraw to your bank account.",
      icon: <Stripe />,
    },
  ],
  de: [
    {
      title: "Einnahmenübersicht",
      description:
        "Öffnen Sie Ihr Stripe-Konto, sehen Sie sich Ihre Einnahmenübersicht an und überweisen Sie Geld auf Ihr Bankkonto.",
      icon: <Stripe />,
    },
  ],
};
