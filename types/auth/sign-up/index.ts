export type OptionsType = {
  icon: string;
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
    role: string;
    token: string;
  };
  role: string;
  token: string;
  token_expired: Date;
};
