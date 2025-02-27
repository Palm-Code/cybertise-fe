import { User } from "lucide-react";
import { AvatarFallback, AvatarImage, BaseAvatar } from "./base-avatar";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

interface I_AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  image?: string;
  initials?: string;
}

const Avatar = ({ image, ...props }: I_AvatarProps) => {
  return (
    <BaseAvatar {...props}>
      <AvatarImage
        src={image}
        alt={"avatar"}
      />
      <AvatarFallback>
        <User
          width={20}
          height={20}
        />
      </AvatarFallback>
    </BaseAvatar>
  );
};
export default Avatar;
