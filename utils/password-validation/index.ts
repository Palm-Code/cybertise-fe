import { PasswordValidationItemsType } from "@/types/auth/sign-up";

export function validatePassword(
  value: PasswordValidationItemsType[],
  newPassword: string
) {
  const updatedValidationItems = value.map((item) => {
    if (item.type === "characters") {
      return { ...item, checked: newPassword.length >= 8 };
    }
    if (item.type === "numerical") {
      return { ...item, checked: /[0-9]/.test(newPassword) };
    }
    if (item.type === "lowercase") {
      return { ...item, checked: /[a-z]/.test(newPassword) };
    }
    if (item.type === "uppercase") {
      return { ...item, checked: /[A-Z]/.test(newPassword) };
    }
    if (item.type === "special_character") {
      return {
        ...item,
        checked: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(newPassword),
      };
    }
    return item;
  });

  return updatedValidationItems;
}
