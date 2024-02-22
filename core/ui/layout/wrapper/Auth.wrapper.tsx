import Image from "next/image";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-start gap-24 pb-28 pt-12">
      <Image src="/cybertise-logo.svg" alt="logo" width={264} height={101} />
      {children}
    </div>
  );
};
export default AuthWrapper;
