import { I_Icons } from "@/interfaces";

const StepPassed = ({ ...props }: I_Icons) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      viewBox="0 0 17 16"
      fill="none"
      {...props}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M8.39844 16C12.8167 16 16.3984 12.4183 16.3984 8C16.3984 3.58172 12.8167 0 8.39844 0C3.98016 0 0.398438 3.58172 0.398438 8C0.398438 12.4183 3.98016 16 8.39844 16Z"
        fill="currentColor"
      />
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M13.348 6.29252C13.7386 5.902 13.7386 5.26883 13.348 4.87831C12.9575 4.48778 12.3243 4.48778 11.9338 4.87831L6.98407 9.82805L4.86275 7.70673C4.47223 7.31621 3.83906 7.31621 3.44854 7.70673C3.05801 8.09726 3.05801 8.73042 3.44854 9.12095L6.27697 11.9494C6.66749 12.3399 7.30066 12.3399 7.69118 11.9494L13.348 6.29252Z"
        fill="white"
      />
    </svg>
  );
};
export default StepPassed;
