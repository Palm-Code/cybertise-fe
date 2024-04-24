import { cn } from "@/core/lib/utils";
import { iconColor } from "@/core/ui/components/dropdown/filter-view-dropdown";
import { Header } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { getSession } from "@/service/server/session";
import { UserType } from "@/types/auth/sign-up";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default async function Dashboardlayout({
  hacker,
}: {
  children: React.ReactNode;
  hacker: React.ReactNode;
}) {
  const session = (await getSession()) as UserType;
  const child: { [key: string]: React.ReactNode } = {
    hacker: hacker,
    company: <EmptyState type="under-construction" variant="mediator" />,
    mediator: <EmptyState type="under-construction" variant="mediator" />,
  };

  return (
    <>
      <div className="_flexbox__col__start__start h-full w-full">
        <Header />
        <Suspense
          fallback={
            <Loader2
              width={64}
              height={64}
              className={cn(
                "m-auto animate-spin stroke-2",
                iconColor[session.user.role]
              )}
            />
          }
        >
          <div
            className={cn(
              "h-fit w-full overflow-auto xl:max-h-[calc(100vh-86px)]",
              "pt-0 xl:pb-28 xl:pl-14 xl:pr-12",
              "p-0"
            )}
          >
            {child[session?.user.role]}
          </div>
        </Suspense>
      </div>
    </>
  );
}
