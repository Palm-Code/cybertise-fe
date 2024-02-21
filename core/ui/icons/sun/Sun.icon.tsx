import { I_Icons } from "@/interfaces";

const Sun = (props: I_Icons) => {
  return (
    <svg
      width="25"
      height="25"
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clip-path="url(#clip0_1165_147977)">
        <g filter="url(#filter0_ii_1165_147977)">
          <circle cx="12.3636" cy="12.3636" r="12.3636" fill="#F7C024" />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_ii_1165_147977"
          x="-0.727273"
          y="-0.969697"
          width="26.1811"
          height="26.4235"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="0.727273" dy="0.727273" />
          <feGaussianBlur stdDeviation="0.484848" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_1165_147977"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="-0.727273" dy="-1.21212" />
          <feGaussianBlur stdDeviation="0.484848" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_innerShadow_1165_147977"
            result="effect2_innerShadow_1165_147977"
          />
        </filter>
        <clipPath id="clip0_1165_147977">
          <rect width="24.7273" height="24.7273" rx="12.3636" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
export default Sun;
