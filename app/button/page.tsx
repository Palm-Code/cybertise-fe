import Button from "@/core/ui/components/button";
import ThemeSwitcher from "@/core/ui/components/theme-switcher";
import { HomeIcon, Pencil } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-24">
      <ThemeSwitcher />
      Hacker
      <div className="grid grid-cols-6 place-items-center gap-4">
        <Button>Primary</Button>
        <Button prefixIcon={<HomeIcon className="h-6 w-6" />}>
          Prefix Icon
        </Button>
        <Button postFixIcon={<Pencil />}>Prefix Icon</Button>
        <Button
          prefixIcon={<HomeIcon className="h-6 w-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </Button>
        <Button isLoading>Loading Button</Button>
        <Button disabled>Disabled Button</Button>
      </div>
      <div className="grid grid-cols-6 place-items-center gap-4">
        <Button variant={"secondary-hacker"}>Secondary</Button>
        <Button
          variant={"secondary-hacker"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
        >
          Prefix Icon
        </Button>
        <Button variant={"secondary-hacker"} postFixIcon={<Pencil />}>
          Prefix Icon
        </Button>
        <Button
          variant={"secondary-hacker"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </Button>
        <Button variant={"secondary-hacker"} isLoading>
          Loading Button
        </Button>
        <Button variant={"secondary-hacker"} disabled>
          Disabled Button
        </Button>
      </div>
      <div className="grid grid-cols-6 place-items-center gap-4">
        <Button variant={"tertiary-hacker"}>Tertiary</Button>
        <Button
          variant={"tertiary-hacker"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
        >
          Prefix Icon
        </Button>
        <Button variant={"tertiary-hacker"} postFixIcon={<Pencil />}>
          Prefix Icon
        </Button>
        <Button
          variant={"tertiary-hacker"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </Button>
        <Button variant={"tertiary-hacker"} isLoading>
          Loading Button
        </Button>
        <Button variant={"tertiary-hacker"} disabled>
          Disabled Button
        </Button>
      </div>
      <div className="grid grid-cols-6 place-items-center gap-4">
        <Button variant={"primary-company"}>Primary</Button>
        <Button
          variant={"primary-company"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
        >
          Prefix Icon
        </Button>
        <Button variant={"primary-company"} postFixIcon={<Pencil />}>
          Prefix Icon
        </Button>
        <Button
          variant={"primary-company"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </Button>
        <Button variant={"primary-company"} isLoading>
          Loading Button
        </Button>
        <Button disabled>Disabled Button</Button>
      </div>
      <div className="grid grid-cols-6 place-items-center gap-4">
        <Button variant={"secondary-company"}>Secondary</Button>
        <Button
          variant={"secondary-company"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
        >
          Prefix Icon
        </Button>
        <Button variant={"secondary-company"} postFixIcon={<Pencil />}>
          Prefix Icon
        </Button>
        <Button
          variant={"secondary-company"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </Button>
        <Button variant={"secondary-company"} isLoading>
          Loading Button
        </Button>
        <Button variant={"secondary-company"} disabled>
          Disabled Button
        </Button>
      </div>
      <div className="grid grid-cols-6 place-items-center gap-4">
        <Button variant={"tertiary-company"}>Primary</Button>
        <Button
          variant={"tertiary-company"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
        >
          Prefix Icon
        </Button>
        <Button variant={"tertiary-company"} postFixIcon={<Pencil />}>
          Prefix Icon
        </Button>
        <Button
          variant={"tertiary-company"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </Button>
        <Button variant={"tertiary-company"} isLoading>
          Loading Button
        </Button>
        <Button disabled>Disabled Button</Button>
      </div>
      <div className="grid grid-cols-6 place-items-center gap-4">
        <Button variant={"primary-mediator"}>Primary</Button>
        <Button
          variant={"primary-mediator"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
        >
          Prefix Icon
        </Button>
        <Button variant={"primary-mediator"} postFixIcon={<Pencil />}>
          Prefix Icon
        </Button>
        <Button
          variant={"primary-mediator"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </Button>
        <Button variant={"primary-mediator"} isLoading>
          Loading Button
        </Button>
        <Button disabled>Disabled Button</Button>
      </div>
      <div className="grid grid-cols-6 place-items-center gap-4">
        <Button variant={"secondary-mediator"}>Secondary</Button>
        <Button
          variant={"secondary-mediator"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
        >
          Prefix Icon
        </Button>
        <Button variant={"secondary-mediator"} postFixIcon={<Pencil />}>
          Prefix Icon
        </Button>
        <Button
          variant={"secondary-mediator"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </Button>
        <Button variant={"secondary-mediator"} isLoading>
          Loading Button
        </Button>
        <Button variant={"secondary-mediator"} disabled>
          Disabled Button
        </Button>
      </div>
      <div className="grid grid-cols-6 place-items-center gap-4">
        <Button variant={"tertiary-mediator"}>Primary</Button>
        <Button
          variant={"tertiary-mediator"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
        >
          Prefix Icon
        </Button>
        <Button variant={"tertiary-mediator"} postFixIcon={<Pencil />}>
          Prefix Icon
        </Button>
        <Button
          variant={"tertiary-mediator"}
          prefixIcon={<HomeIcon className="h-6 w-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </Button>
        <Button variant={"tertiary-mediator"} isLoading>
          Loading Button
        </Button>
        <Button disabled>Disabled Button</Button>
      </div>
    </main>
  );
}
