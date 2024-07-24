import { PasswordValidationItemsType } from "@/types/auth/sign-up";

export function validatePassword(
  value: PasswordValidationItemsType[],
  newPassword: string
) {
  const updatedValidationItems = value.map((item) => {
    if (item.content === "Atleast 8 characters") {
      return { ...item, checked: newPassword.length >= 8 };
    }
    if (item.content === "At least 1 numerical") {
      return { ...item, checked: /[0-9]/.test(newPassword) };
    }
    if (item.content === "At least 1 lowercase") {
      return { ...item, checked: /[a-z]/.test(newPassword) };
    }
    if (item.content === "At least 1 uppercase") {
      return { ...item, checked: /[A-Z]/.test(newPassword) };
    }
    if (item.content === "At least 1 special character") {
      return {
        ...item,
        checked: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword),
      };
    }
    return item;
  });

  return updatedValidationItems;
}
