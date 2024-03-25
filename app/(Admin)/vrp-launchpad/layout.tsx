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
      <div className="h-fit max-h-[calc(100vh-86px)] w-full overflow-auto pb-12 pl-14 pr-12">
        {children}
      </div>
    </div>
  );
}
