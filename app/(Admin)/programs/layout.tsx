import { Header } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { getSession } from "@/service/server/session";
import { UserType } from "@/types/auth/sign-up";

export default async function Dashboardlayout({
  hacker,
  company,
}: {
  children: React.ReactNode;
  hacker: React.ReactNode;
  company: React.ReactNode;
}) {
  const session = (await getSession()) as UserType;

  const child: { [key: string]: React.ReactNode } = {
    hacker: hacker,
    company: company,
    mediator: <EmptyState type="under-construction" variant="mediator" />,
  };

  return (
    <>
      <div className="_flexbox__col__start__start h-full w-full">
        <Header />
        <div className="h-fit max-h-[calc(100vh-86px)] w-full overflow-auto pb-28 pl-14 pr-12">
          {child[session?.user.role]}
        </div>
      </div>
    </>
  );
}
