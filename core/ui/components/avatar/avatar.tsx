import { AvatarFallback, AvatarImage, BaseAvatar } from "./base-avatar";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

interface I_AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  image?: string;
  initials?: string;
}

const Avatar = ({ image, initials, ...props }: I_AvatarProps) => {
  return (
    <BaseAvatar {...props}>
      <AvatarImage src={image} alt={""} />
      <AvatarFallback>{initials}</AvatarFallback>
    </BaseAvatar>
  );
};
export default Avatar;
