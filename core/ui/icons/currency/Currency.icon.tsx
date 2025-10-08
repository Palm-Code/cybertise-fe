import React from "react";

type CurrencyProps = React.SVGProps<SVGSVGElement> & {};

export const Currency = ({ ...props }: CurrencyProps) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4 10.3086H16M4 14.3086H13M19 6.30863C17.5771 5.01627 15.7222 4.30286 13.8 4.30863C12.7625 4.32168 11.7378 4.53896 10.7843 4.94808C9.83083 5.3572 8.96727 5.95013 8.24296 6.69301C7.51864 7.4359 6.94776 8.31419 6.56291 9.27772C6.17806 10.2413 5.98678 11.2712 6 12.3086C6 16.7086 9.5 20.3086 13.8 20.3086C15.8 20.3086 17.6 19.5086 19 18.3086"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
