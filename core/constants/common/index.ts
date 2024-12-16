import { I_TableColumns } from "@/interfaces";
import { MenuItemType, Role } from "@/types/admin/sidebar";
import { PasswordValidationItemsType } from "@/types/auth/sign-up";
import { useTranslations } from "next-intl";

export const usePasswordValidation = () => {
  const t = useTranslations("PasswordInput.reqex");

  const passwordValidation: PasswordValidationItemsType[] = [
    {
      type: "characters",
      content: t("characters"),
      checked: false,
    },
    {
      type: "numerical",
      content: t("numerical"),
      checked: false,
    },
    {
      type: "lowercase",
      content: t("lowercase"),
      checked: false,
    },
    {
      type: "uppercase",
      content: t("uppercase"),
      checked: false,
    },
    {
      type: "special_character",
      content: t("special_character"),
      checked: false,
    },
  ];

  return passwordValidation;
};

export const useMenuItems = () => {
  const t = useTranslations("Sidebar");

  return {
    hacker: [
      {
        id: "dashboard",
        title: t("dashboard"),
        path: "/dashboard",
        key: "getChatList",
      },
      {
        id: "programs",
        title: t("programs"),
        path: "/programs",
        key: "getProgramList",
      },
      {
        id: "reports",
        title: t("reports"),
        path: "/reports",
        key: "getChatList",
      },
    ],
    company: [
      {
        id: "dashboard",
        title: t("dashboard"),
        path: "/dashboard",
        key: "getChatList",
      },
      {
        id: "reports",
        title: t("reports"),
        path: "/reports",
        key: "getChatList",
      },
      {
        id: "vrp_management",
        title: t("vrp_management"),
        path: "/vrp-launchpad",
        key: "getProgramList",
      },
      {
        id: "manage_company",
        title: t("manage_company"),
        path: "/manage-company",
        key: "getUserProfile",
      },
    ],
    "company staff": [
      {
        id: "dashboard",
        title: t("dashboard"),
        path: "/dashboard",
        key: "getChatList",
      },
      {
        id: "reports",
        title: t("reports"),
        path: "/reports",
        key: "getChatList",
      },
      {
        id: "vrp_management",
        title: t("vrp_management"),
        path: "/vrp-launchpad",
        key: "getProgramList",
      },
    ],
    mediator: [
      {
        id: "dashboard",
        title: t("dashboard"),
        path: "/dashboard",
        key: "getChatList",
      },
      {
        id: "vrp_launchpad",
        title: t("vrp_launchpad"),
        path: "/vrp-launchpad",
        key: "getProgramList",
      },
      {
        id: "companies",
        title: t("companies"),
        path: "/companies",
        key: "getCompanyList",
      },
      {
        id: "reports",
        title: t("reports"),
        path: "/reports",
        key: "getChatList",
      },
    ],
  };
};

export const menuItems: MenuItemType = {
  hacker: [
    {
      title: "Dashboard",
      path: "/dashboard",
      key: "getChatList",
    },
    {
      title: "Programs",
      path: "/programs",
      key: "getProgramList",
    },
    {
      title: "Reports",
      path: "/reports",
      key: "getChatList",
    },
  ],
  mediator: [
    {
      title: "Dashboard",
      path: "/dashboard",
      key: "getChatList",
    },
    {
      title: "VRP Launchpad",
      path: "/vrp-launchpad",
      key: "getProgramList",
    },
    {
      title: "Companies",
      path: "/companies",
      key: "getCompanyList",
    },
    {
      title: "Reports",
      path: "/reports",
      key: "getChatList",
    },
  ],
  company: [
    {
      title: "Dashboard",
      path: "/dashboard",
      key: "getChatList",
    },
    {
      title: "Reports",
      path: "/reports",
      key: "getChatList",
    },
    {
      title: "VRP Management",
      path: "/vrp-launchpad",
      key: "getProgramList",
    },
    {
      title: "Manage Company",
      path: "/manage-company",
      key: "getUserProfile",
    },
  ],
  "company staff": [
    {
      title: "Dashboard",
      path: "/dashboard",
      key: "getChatList",
    },
    {
      title: "Reports",
      path: "/reports",
      key: "getChatList",
    },
    {
      title: "VRP Management",
      path: "/vrp-launchpad",
      key: "getProgramList",
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

export const useCurrentPhase = () => {
  const t = useTranslations("VRPLaunchpad.steps");

  const currentPhase: { [key: string]: string } = {
    phase1: t("vrp_details"),
    phase2: t("setup"),
    phase3: t("company_revision"),
    phase4: t("mediator_revision"),
    phase5: t("publish"),
  };

  return currentPhase;
};

export const currentPhase: { [key: string]: string } = {
  phase1: "VRP Details",
  phase2: "Setup Phase",
  phase3: "Company Revision",
  phase4: "Mediator Revision",
  phase5: "Publish",
};

export const termsandconditions = {
  title: "Terms & Conditions",
  date_published: new Date(),
  content: `<h2>1. Introduction</h2>
    <p>Welcome to Our Website! These Terms and Conditions govern your use of our website. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions.</p>

    <h2>2. Use of the Website</h2>
    <ul>
      <li>You may use the website for lawful purposes only.</li>
      <li>You agree not to use the website in any way that may harm or disrupt the website.</li>
    </ul>

    <h2>3. Intellectual Property</h2>
    <p>The content, layout, design, data, databases, and graphics on this website are protected by intellectual property rights and are owned by us or our licensors.</p>

    <h2>4. Limitation of Liability</h2>
    <p>We are not liable for any damages or losses that may occur as a result of using our website. We make no guarantees about the availability or accuracy of the content on the website.</p>

    <h2>5. Changes to Terms</h2>
    <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated date.</p>
Term
    <h2>6. Contact Us</h2>
    <p>If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>`,
};
export const policy = {
  title: "Privacy Policy",
  date_published: new Date(),
  content: `<h2>1. Introduction</h2>
    <p>Welcome to Our Website! These Terms and Conditions govern your use of our website. By accessing or using our website, you agree to comply with and be bound by these Terms and Conditions.</p>

    <h2>2. Use of the Website</h2>
    <ul>
      <li>You may use the website for lawful purposes only.</li>
      <li>You agree not to use the website in any way that may harm or disrupt the website.</li>
    </ul>

    <h2>3. Intellectual Property</h2>
    <p>The content, layout, design, data, databases, and graphics on this website are protected by intellectual property rights and are owned by us or our licensors.</p>

    <h2>4. Limitation of Liability</h2>
    <p>We are not liable for any damages or losses that may occur as a result of using our website. We make no guarantees about the availability or accuracy of the content on the website.</p>

    <h2>5. Changes to Terms</h2>
    <p>We reserve the right to modify these Terms and Conditions at any time. Changes will be posted on this page with an updated date.</p>

    <h2>6. Contact Us</h2>
    <p>If you have any questions about these Terms and Conditions, please contact us at <a href="mailto:support@example.com">support@example.com</a>.</p>`,
};

export const faqs = [
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    question: "Lorem ipsum dolor sit amet, consectetur adipiscing elit?",
    answer:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
];

export const faqData = {
  title: "Frequently Asked Questions",
  date_published: new Date(),
  content: faqs,
};

export const useGetContibutorTableColumns = () => {
  const t = useTranslations("CompanyDetailsMediator");
  return [
    {
      title: t("collaborators.table.name"),
      align: "left",
      width: "w-5/12",
    },
    {
      title: t("collaborators.table.valid_reports"),
      align: "center",
      width: "w-2/12",
    },
    {
      title: t("collaborators.table.asset_type_reported"),
      align: "center",
      width: "w-3/12",
    },
    {
      title: t("collaborators.table.last_activity"),
      align: "center",
      width: "w-2/12",
    },
  ] as I_TableColumns[];
};
