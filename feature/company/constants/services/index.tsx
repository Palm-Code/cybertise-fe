import { ShieldCheck } from "lucide-react";
import React from "react";

type ServicesType = {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
};

type ServicesListType = Record<"en" | "de", ServicesType[]>;

export const servicesList: ServicesListType = {
  en: [
    {
      title: "Penetration Test",
      description:
        "Stay ahead of cyber threats with our advanced security testing.",
      icon: <ShieldCheck />,
      href: "mailto:hello@cybertise.eu?subject=Penetration%20Test%20Inquiry",
    },
  ],
  de: [
    {
      title: "Penetration Test",
      description:
        "Bleiben Sie mit unseren fortschrittlichen Sicherheitstests einen Schritt voraus.",
      icon: <ShieldCheck />,
      href: "mailto:hello@cybertise.eu?subject=Penetration%20Test%20Inquiry",
    },
  ],
};
