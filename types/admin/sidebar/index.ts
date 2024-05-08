export type NavbarType = {
  title: string;
  path: string;
};

export enum Role {
  "hacker" = "hacker",
  "company" = "company",
  "mediator" = "mediator",
  "company staff" = "company staff",
}

export type MenuItemType = {
  [key in Role]: NavbarType[];
};
