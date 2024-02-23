import { AvatarFallback, AvatarImage, BaseAvatar } from "./base-avatar";

interface I_AvatarProps {
  image?: string;
  initials?: string;
}

const Avatar = ({ image, initials }: I_AvatarProps) => {
  return (
    <BaseAvatar>
      <AvatarImage src={image} alt={initials} />
      <AvatarFallback>{initials}</AvatarFallback>
    </BaseAvatar>
  );
};
export default Avatar;
