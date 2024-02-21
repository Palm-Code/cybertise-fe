import { Input } from "@/core/ui/components/input";
import ThemeSwitcher from "@/core/ui/components/theme-switcher";
import { HomeIcon } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-24">
      <ThemeSwitcher />
      <div className="mx-auto grid w-full max-w-7xl grid-cols-2 gap-4">
        <Input label="Username" prefixIcon={<HomeIcon className="h-6 w-6" />} />
        <Input label="Username" withTooltip />
        <Input
          type="password"
          label="Password"
          prefixIcon={<HomeIcon className="h-6 w-6" />}
        />
        <Input
          type="password"
          label="Password"
          prefixIcon={<HomeIcon className="h-6 w-6" />}
          isError
        />
      </div>
    </main>
  );
}
