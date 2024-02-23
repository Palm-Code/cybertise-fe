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
