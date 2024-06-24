import { I_Icons } from "@/interfaces";

interface I_ShieldCheck extends I_Icons {
  category?: "S" | "M" | "L" | "XL";
}

const categoryColor: {
  element: React.ReactElement[];
  code: {
    [key: string]: string;
  };
} = {
  element: [
    <>
      <linearGradient
        id="paint0_linear_2071_71293"
        x1="12"
        y1="24"
        x2="12"
        y2="-1.14441e-05"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B50000" />
        <stop offset="0.0001" stopColor="#B50000" />
        <stop offset="1" stopColor="#FF9C9C" />
        <stop offset="1" stopColor="#FF9C9C" />
      </linearGradient>
      <clipPath id="clip0_2071_71293">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </>,
    <>
      <linearGradient
        id="paint0_linear_2071_71303"
        x1="12"
        y1="24"
        x2="12"
        y2="-1.14441e-05"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#B55700" />
        <stop offset="0.0001" stopColor="#B58200" />
        <stop offset="1" stopColor="#FFAE9C" />
      </linearGradient>
      <clipPath id="clip0_2071_71303">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </>,
    <>
      <linearGradient
        id="paint0_linear_2071_71313"
        x1="12"
        y1="24"
        x2="12"
        y2="-1.14441e-05"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00B59C" />
        <stop offset="0.0001" stopColor="#B1B500" />
        <stop offset="1" stopColor="#FDFF9C" />
      </linearGradient>
      <clipPath id="clip0_2071_71313">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </>,
    <>
      <linearGradient
        id="paint0_linear_2071_71324"
        x1="12"
        y1="24"
        x2="12"
        y2="-1.14441e-05"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#70B500" />
        <stop offset="0.0001" stopColor="#7BB500" />
        <stop offset="1" stopColor="#B6FF9C" />
      </linearGradient>
      <clipPath id="clip0_2071_71324">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </>,
  ],
  code: {
    S: "paint0_linear_2071_71293",
    M: "paint0_linear_2071_71303",
    L: "paint0_linear_2071_71313",
    XL: "paint0_linear_2071_71324",
  },
};

const ShieldCheck = ({ category = "S", ...props }: I_ShieldCheck) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_2028_67132)">
        <path
          d="M20.4375 3.82597C16.5456 3.82597 12.5123 0.218426 12.4724 0.182285C12.2043 -0.0607617 11.7957 -0.0607617 11.5276 0.182285C11.4875 0.218707 7.46475 3.82597 3.5625 3.82597C3.17419 3.82597 2.85938 4.14079 2.85938 4.5291V12.9496C2.85938 19.7711 7.93294 22.4968 11.7492 23.9538C11.83 23.9846 11.915 24 12 24C12.085 24 12.17 23.9846 12.2508 23.9538C16.0671 22.4968 21.1406 19.771 21.1406 12.9496V4.5291C21.1406 4.14079 20.8258 3.82597 20.4375 3.82597ZM19.7344 12.9496C19.7344 18.7048 15.6562 21.1121 12 22.5431C8.34384 21.1121 4.26562 18.7048 4.26562 12.9496V5.20082C7.65145 4.90466 10.8262 2.57929 12 1.625C13.1738 2.57924 16.3485 4.90461 19.7344 5.20082V12.9496ZM7.07812 12C7.07812 14.7139 9.28608 16.9219 12 16.9219C14.7139 16.9219 16.9219 14.7139 16.9219 12C16.9219 9.28607 14.7139 7.07811 12 7.07811C9.28608 7.07811 7.07812 9.28607 7.07812 12ZM15.5156 12C15.5156 13.9385 13.9385 15.5156 12 15.5156C10.0615 15.5156 8.48438 13.9385 8.48438 12C8.48438 10.0615 10.0615 8.48436 12 8.48436C13.9385 8.48436 15.5156 10.0615 15.5156 12ZM11.0909 12.2059C10.8164 11.9313 10.3711 11.9313 10.0965 12.2059C9.82195 12.4805 9.82195 12.9257 10.0965 13.2003L10.7997 13.9034C10.937 14.0407 11.1169 14.1094 11.2969 14.1094C11.4768 14.1094 11.6568 14.0407 11.794 13.9034L13.9034 11.794C14.178 11.5194 14.178 11.0743 13.9034 10.7997C13.6289 10.5251 13.1836 10.5251 12.909 10.7997L11.2969 12.4118L11.0909 12.2059Z"
          fill={`url(#${categoryColor.code[category]})`}
        />
      </g>
      {categoryColor.element.map((item, index) => {
        return <defs key={`${category}-${index}`}>{item}</defs>;
      })}
    </svg>
  );
};
export default ShieldCheck;
