import { Header } from "@/core/ui/layout";

export default function Dashboardlayout({
  hacker,
}: {
  children: React.ReactNode;
  hacker: React.ReactNode;
  company: React.ReactNode;
  mediator: React.ReactNode;
}) {
  return (
    <>
      <div className="_flexbox__col__start__start h-full w-full">
        <Header />
        <div className="h-fit max-h-[calc(100vh-86px)] w-full overflow-auto p-12 pb-28 pl-14 pr-12">
          {hacker}
        </div>
      </div>
    </>
  );
}
