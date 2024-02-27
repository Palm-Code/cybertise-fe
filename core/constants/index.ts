import { MenuItemType } from "@/types/admin/sidebar";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";

export const passwordValidation: PasswordValidationItemsType[] = [
  {
    content: "Atleast 8 characters",
    checked: false,
  },
  {
    content: "At least 1 numerical",
    checked: false,
  },
  {
    content: "At least 1 lowercase",
    checked: false,
  },
  {
    content: "At least 1 uppercase",
    checked: false,
  },
];

export const menuItems: MenuItemType = {
  hacker: [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Programs",
      path: "/programs",
    },
    {
      title: "Reports",
      path: "/reports",
    },
  ],
  mediator: [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "VRP Launchpad",
      path: "/vrp-launchpad",
    },
    {
      title: "Companies",
      path: "/companies",
    },
    {
      title: "Reports",
      path: "/reports",
    },
  ],
  company: [
    {
      title: "Dashboard",
      path: "/dashboard",
    },
    {
      title: "Reports",
      path: "/reports",
    },
    {
      title: "VRP Management",
      path: "/vrp-management",
    },
    {
      title: "VRP Launchpad",
      path: "/vrp-launchpad",
    },
  ],
};
