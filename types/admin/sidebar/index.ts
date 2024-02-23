export type NavbarType = {
  title: string;
  path: string;
};

export enum Role {
  "hacker" = "hacker",
  "company" = "company",
  "mediator" = "mediator",
}

export type MenuItemType = {
  [key in Role]: NavbarType[];
};
