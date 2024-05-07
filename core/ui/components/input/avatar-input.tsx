import { buttonVariants } from "../button/base-button";
import Typography from "../typography/typography";

interface I_AvatarInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  variant?: "hacker" | "company" | "mediator";
}

const AvatarInput = ({
  onChange,
  title = "Change Logo",
  variant = "hacker",
  ...props
}: I_AvatarInputProps) => {
  return (
    <label htmlFor="avatar">
      <input
        type="file"
        className="z-20 hidden"
        id="avatar"
        accept="image/*"
        {...props}
      />
      <Typography
        variant={"p"}
        affects="normal"
        className={buttonVariants({
          variant: `tertiary-${variant}`,
        })}
      >
        {title}
      </Typography>
    </label>
  );
};
export default AvatarInput;
