import { MenuItemType, Role } from "@/types/admin/sidebar";
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
      path: "/vrp-launchpad",
    },
    {
      title: "Manage Company",
      path: "/manage-company",
    },
  ],
  "company staff": [
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
      path: "/vrp-launchpad",
    },
  ],
};

export const borderColor: { [key in Role]: string } = {
  hacker:
    "border-lime-normal-light dark:border-lime-normal-dark hover:border-lime-normal-light dark:hover:border-lime-normal-dark",
  company:
    "border-sky-normal dark:border-sky-normal hover:border-sky-normal dark:hover:border-sky-normal",
  "company staff":
    "border-sky-normal dark:border-sky-normal hover:border-sky-normal dark:hover:border-sky-normal",
  mediator:
    "border-violet-normal dark:border-violet-normal hover:border-violet-normal dark:hover:border-violet-normal",
};

export const backgroundColor: { [key in Role]: string } = {
  hacker: "bg-lime-normal-light dark:bg-lime-normal-dark",
  company: "bg-sky-normal",
  "company staff": "bg-sky-normal",
  mediator: "bg-violet-normal",
};

export const iconColor: { [key in Role]: string } = {
  hacker: "text-lime-normal-light dark:text-lime-normal-dark",
  company: "text-sky-normal",
  "company staff": "text-sky-normal",
  mediator: "text-violet-normal",
};

export const fillColor: { [key in Role]: string } = {
  mediator: "fill-violet-normal",
  company: "fill-sky-normal",
  "company staff": "fill-sky-normal",
  hacker: "fill-lime-normal",
};

export const currentPhase: { [key: string]: string } = {
  phase1: "VRP Details",
  phase2: "Setup Phase",
  phase3: "Company Revision",
  phase4: "Mediator Revision",
  phase5: "Publish",
};
