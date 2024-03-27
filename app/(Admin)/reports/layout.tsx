import { Header } from "@/core/ui/layout";
import { getSession } from "@/service/server/session";
import { UserType } from "@/types/auth/sign-up";
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

export default async function Dashboardlayout({
  hacker,
  company,
  mediator,
}: {
  children: React.ReactNode;
  hacker: React.ReactNode;
  company: React.ReactNode;
  mediator: React.ReactNode;
}) {
  const session = (await getSession()) as UserType;

  const child: { [key: string]: React.ReactNode } = {
    hacker: hacker,
    company: company,
    mediator: mediator,
  };
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
          {child[session?.user.role]}
        </div>
      </Suspense>
    </div>
  );
}
