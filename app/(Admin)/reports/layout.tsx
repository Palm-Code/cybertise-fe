import { cn } from "@/core/lib/utils";
import { Header } from "@/core/ui/layout";
import { getSession } from "@/service/server/session";
import { UserType } from "@/types/auth/sign-up";

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
    "company staff": company,
  };
  return (
    <div
      className="_flexbox__col__start__start h-full w-full"
      suppressHydrationWarning
    >
      <Header />
      <div
        className={cn(
          "h-fit w-full overflow-auto xl:max-h-[calc(100vh-86px)]",
          "pt-0 xl:pl-14 xl:pr-12",
          "p-0"
        )}
      >
        {child[session?.user.role]}
      </div>
      <div id="new-chat"></div>
    </div>
  );
}
