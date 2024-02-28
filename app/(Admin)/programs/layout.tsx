// import { Loader2 } from "lucide-react";
// import { Suspense } from "react";

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
      <div className="_flexbox__col__start__start h-full w-full">
        {children}
        <Suspense
          fallback={
            <Loader2
              width={64}
              height={64}
              className="m-auto animate-spin stroke-2 text-lime-normal"
            />
          }
        >
          <div className="h-fit max-h-[calc(100vh-86px)] w-full overflow-auto p-12 pb-28 pl-14 pr-12">
            {hacker}
          </div>
        </Suspense>
      </div>
    </>
  );
}
