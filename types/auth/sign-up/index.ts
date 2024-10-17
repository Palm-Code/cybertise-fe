export type OptionsType = {
  icon?: string;
  value: string | number;
  label: string;
};

export type PasswordValidationItemsType = {
  content: string;
  checked: boolean;
  type:
    | "characters"
    | "numerical"
    | "lowercase"
    | "uppercase"
    | "special_character"
    | null;
};

export type UserType = {
  user: {
    email: string;
    name: string;
    role: "hacker" | "company" | "mediator" | "company staff";
    token: string;
    language: string;
  };
};
