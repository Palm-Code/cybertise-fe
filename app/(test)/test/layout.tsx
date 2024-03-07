import { Header } from "@/core/ui/layout";

export default function Dashboardlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="_flexbox__col__start__start h-full w-full">
        <Header />
        <div className="flex h-full max-h-[calc(100vh-86px)] w-full flex-col items-center justify-center overflow-auto pb-28 pl-14 pr-12">
          {children}
        </div>
      </div>
    </>
  );
}
