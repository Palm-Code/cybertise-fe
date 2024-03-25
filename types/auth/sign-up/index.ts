export type OptionsType = {
  icon?: string;
  value: string;
  label: string;
};

export type PasswordValidationItemsType = {
  content: string;
  checked: boolean;
};

export type UserType = {
  user: {
    email: string;
    name: string;
    role: "hacker" | "company" | "mediator";
    token: string;
  };
  role: "hacker" | "company" | "mediator";
  token: string;
  token_expired: Date;
};
