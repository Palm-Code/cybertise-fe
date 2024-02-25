import { I_Icons } from "@/interfaces";

const Indicator = (props: I_Icons) => {
  return (
    <svg
      width="40"
      height="41"
      viewBox="0 0 40 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g filter="url(#filter0_f_1390_58061)">
        <circle cx="20" cy="20.5" r="10" fill="currentColor" />
      </g>
      <circle cx="20" cy="20.5" r="10" fill="currentColor" />
      <defs>
        <filter
          id="filter0_f_1390_58061"
          x="0"
          y="0.5"
          width="40"
          height="40"
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
          <feGaussianBlur
            stdDeviation="5"
            result="effect1_foregroundBlur_1390_58061"
          />
        </filter>
      </defs>
    </svg>
  );
};
export default Indicator;
