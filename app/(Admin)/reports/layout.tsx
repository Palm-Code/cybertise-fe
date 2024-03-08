import { Header } from "@/core/ui/layout";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default function Dashboardlayout({
  hacker,
}: {
  children: React.ReactNode;
  hacker: React.ReactNode;
}) {
  return (
    <div
      className="_flexbox__col__start__start h-full w-full"
      suppressHydrationWarning
    >
      <Header />
      <Suspense
        fallback={
          <Loader2
            width={64}
            height={64}
            className="m-auto animate-spin stroke-2 text-lime-normal"
          />
        }
      >
        <div className="h-fit max-h-[calc(100vh-86px)] w-full overflow-auto pl-14 pr-12">
          {hacker}
        </div>
      </Suspense>
    </div>
  );
}
