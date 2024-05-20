import { cn } from "@/core/lib/utils";
import { Desktop, Header, Mobile, Sidebar } from "@/core/ui/layout";
import { SettingsFragment } from "@/feature/settings/fragments";
import { getSession } from "@/service/server/session";
import { Role } from "@/types/admin/sidebar";

export default async function SettingsLayout() {
  const session = await getSession();
  return (
    <>
      <Mobile>
        <div className="h-dvh w-full overflow-hidden">
          <Sidebar type={session?.user.role as keyof typeof Role} />
          <div
            className="_flexbox__col__start__start h-full w-full"
            suppressHydrationWarning
          >
            <Header />
            <div
              className={cn(
                "h-fit w-full overflow-auto xl:max-h-[calc(100vh-86px)]",
                "xl:pb-28 xl:pl-14 xl:pr-12 xl:pt-0",
                "p-0"
              )}
            >
              <SettingsFragment
                role={session?.user.role as keyof typeof Role}
              />
            </div>
          </div>
        </div>
      </Mobile>
      <Desktop>
        <div className="grid h-screen w-full grid-cols-[auto_1fr] overflow-hidden">
          <Sidebar type={session?.user.role as keyof typeof Role} />
          <div
            className="_flexbox__col__start__start h-full w-full"
            suppressHydrationWarning
          >
            <Header />
            <div
              className={cn(
                "h-fit w-full overflow-auto xl:max-h-[calc(100vh-86px)]",
                "xl:pb-28 xl:pl-14 xl:pr-12 xl:pt-0",
                "p-0"
              )}
            >
              <SettingsFragment
                role={session?.user.role as keyof typeof Role}
              />
            </div>
          </div>
        </div>
      </Desktop>
    </>
  );
}
