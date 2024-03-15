import { I_Icons } from "@/interfaces";

const Step = ({ ...props }: I_Icons) => {
  return (
    <svg
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.19922 16C12.6175 16 16.1992 12.4183 16.1992 8C16.1992 3.58172 12.6175 0 8.19922 0C3.78094 0 0.199219 3.58172 0.199219 8C0.199219 12.4183 3.78094 16 8.19922 16Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.19922 12C10.4084 12 12.1992 10.2091 12.1992 8C12.1992 5.79086 10.4084 4 8.19922 4C5.99008 4 4.19922 5.79086 4.19922 8C4.19922 10.2091 5.99008 12 8.19922 12Z"
        fill="white"
      />
    </svg>
  );
};
export default Step;
