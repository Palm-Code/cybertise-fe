import Image from "next/image";

const icons: Record<string, string> = {
  S: "/S.svg",
  M: "/M.svg",
  L: "/L.svg",
  XL: "/XL.svg",
};

export const ShieldCheck = ({ category }: { category: string }) => {
  return (
    <Image
      src={`/icons/monetary-awards/${icons[category]}`}
      alt={`badge-category-${category}`}
      width={18}
      height={24}
      className="h-6 w-4.5"
    />
  );
};
