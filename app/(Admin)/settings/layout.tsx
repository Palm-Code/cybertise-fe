import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function Dashboardlayout({
  children,
  hacker,
}: {
  children: React.ReactNode;
  hacker: React.ReactNode;
  company: React.ReactNode;
  mediator: React.ReactNode;
}) {
  return (
    <>
      <div className="_flexbox__col__start h-screen w-full">
        {children}
        {/* <Suspense
          fallback={
            <Loader2
              width={64}
              height={64}
              className="m-auto animate-spin stroke-2 text-lime-normal"
            />
          }
        >
          <div className="h-full w-full p-12 pb-28 pl-14">{hacker}</div>
        </Suspense> */}
      </div>
    </>
  );
}
