import React from "react";

type ServiceProps = React.SVGProps<SVGSVGElement> & {};

export const Service = ({ ...props }: ServiceProps) => {
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
        d="M21 16.3075V8.30752C20.9996 7.95679 20.9071 7.61233 20.7315 7.30868C20.556 7.00503 20.3037 6.75288 20 6.57752L13 2.57752C12.696 2.40198 12.3511 2.30957 12 2.30957C11.6489 2.30957 11.304 2.40198 11 2.57752L4 6.57752C3.69626 6.75288 3.44398 7.00503 3.26846 7.30868C3.09294 7.61233 3.00036 7.95679 3 8.30752V16.3075C3.00036 16.6582 3.09294 17.0027 3.26846 17.3064C3.44398 17.61 3.69626 17.8622 4 18.0375L11 22.0375C11.304 22.2131 11.6489 22.3055 12 22.3055C12.3511 22.3055 12.696 22.2131 13 22.0375L20 18.0375C20.3037 17.8622 20.556 17.61 20.7315 17.3064C20.9071 17.0027 20.9996 16.6582 21 16.3075Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16.3075C14.2091 16.3075 16 14.5167 16 12.3075C16 10.0984 14.2091 8.30752 12 8.30752C9.79086 8.30752 8 10.0984 8 12.3075C8 14.5167 9.79086 16.3075 12 16.3075Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
