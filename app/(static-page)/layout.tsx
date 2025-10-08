import { cn } from "@/core/lib/utils";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn("h-screen w-full overflow-y-auto xl:h-dvh")}>
      {children}
    </div>
  );
}
