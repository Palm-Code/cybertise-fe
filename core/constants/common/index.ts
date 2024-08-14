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
  {
    content: "At least 1 special character",
    checked: false,
  },
];

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
