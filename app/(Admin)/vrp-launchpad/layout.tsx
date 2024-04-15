import { cn } from "@/core/lib/utils";
import { Header } from "@/core/ui/layout";

export default async function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="_flexbox__col__start__start h-full w-full"
      suppressHydrationWarning
    >
      <Header />
      <div
        className={cn(
          "h-fit w-full overflow-auto xl:max-h-[calc(100vh-86px)]",
          "xl:p-12 xl:pb-28 xl:pl-14 xl:pr-12 xl:pt-0",
          "px-6 py-8"
        )}
      >
        {children}
      </div>
    </div>
  );
}
