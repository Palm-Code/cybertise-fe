import { Button } from "@/core/ui/components/button";
import ButtonIcon from "@/core/ui/components/button-icon";
import ThemeSwitcher from "@/core/ui/components/theme-switcher";
import { HomeIcon, Pencil } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-12 p-24">
      <ThemeSwitcher />
      Hacker
      <div className="grid grid-cols-6 gap-4 place-items-center">
        <ButtonIcon>Primary</ButtonIcon>
        <ButtonIcon prefixIcon={<HomeIcon className="w-6 h-6" />}>
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon postFixIcon={<Pencil />}>Prefix Icon</ButtonIcon>
        <ButtonIcon
          prefixIcon={<HomeIcon className="w-6 h-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </ButtonIcon>
        <ButtonIcon isLoading>Loading Button</ButtonIcon>
        <Button disabled>Disabled Button</Button>
      </div>
      <div className="grid grid-cols-6 gap-4 place-items-center">
        <ButtonIcon variant={"secondary-hacker"}>Secondary</ButtonIcon>
        <ButtonIcon
          variant={"secondary-hacker"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
        >
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon variant={"secondary-hacker"} postFixIcon={<Pencil />}>
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon
          variant={"secondary-hacker"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </ButtonIcon>
        <ButtonIcon variant={"secondary-hacker"} isLoading>
          Loading Button
        </ButtonIcon>
        <Button variant={"secondary-hacker"} disabled>
          Disabled Button
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-4 place-items-center">
        <ButtonIcon variant={"tertiary-hacker"}>Tertiary</ButtonIcon>
        <ButtonIcon
          variant={"tertiary-hacker"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
        >
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon variant={"tertiary-hacker"} postFixIcon={<Pencil />}>
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon
          variant={"tertiary-hacker"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </ButtonIcon>
        <ButtonIcon variant={"tertiary-hacker"} isLoading>
          Loading Button
        </ButtonIcon>
        <Button variant={"tertiary-hacker"} disabled>
          Disabled Button
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-4 place-items-center">
        <ButtonIcon variant={"primary-company"}>Primary</ButtonIcon>
        <ButtonIcon
          variant={"primary-company"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
        >
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon variant={"primary-company"} postFixIcon={<Pencil />}>
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon
          variant={"primary-company"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </ButtonIcon>
        <ButtonIcon variant={"primary-company"} isLoading>
          Loading Button
        </ButtonIcon>
        <Button disabled>Disabled Button</Button>
      </div>
      <div className="grid grid-cols-6 gap-4 place-items-center">
        <ButtonIcon variant={"secondary-company"}>Secondary</ButtonIcon>
        <ButtonIcon
          variant={"secondary-company"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
        >
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon variant={"secondary-company"} postFixIcon={<Pencil />}>
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon
          variant={"secondary-company"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </ButtonIcon>
        <ButtonIcon variant={"secondary-company"} isLoading>
          Loading Button
        </ButtonIcon>
        <Button variant={"secondary-company"} disabled>
          Disabled Button
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-4 place-items-center">
        <ButtonIcon variant={"tertiary-company"}>Primary</ButtonIcon>
        <ButtonIcon
          variant={"tertiary-company"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
        >
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon variant={"tertiary-company"} postFixIcon={<Pencil />}>
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon
          variant={"tertiary-company"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </ButtonIcon>
        <ButtonIcon variant={"tertiary-company"} isLoading>
          Loading Button
        </ButtonIcon>
        <Button disabled>Disabled Button</Button>
      </div>
      <div className="grid grid-cols-6 gap-4 place-items-center">
        <ButtonIcon variant={"primary-mediator"}>Primary</ButtonIcon>
        <ButtonIcon
          variant={"primary-mediator"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
        >
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon variant={"primary-mediator"} postFixIcon={<Pencil />}>
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon
          variant={"primary-mediator"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </ButtonIcon>
        <ButtonIcon variant={"primary-mediator"} isLoading>
          Loading Button
        </ButtonIcon>
        <Button disabled>Disabled Button</Button>
      </div>
      <div className="grid grid-cols-6 gap-4 place-items-center">
        <ButtonIcon variant={"secondary-mediator"}>Secondary</ButtonIcon>
        <ButtonIcon
          variant={"secondary-mediator"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
        >
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon variant={"secondary-mediator"} postFixIcon={<Pencil />}>
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon
          variant={"secondary-mediator"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </ButtonIcon>
        <ButtonIcon variant={"secondary-mediator"} isLoading>
          Loading Button
        </ButtonIcon>
        <Button variant={"secondary-mediator"} disabled>
          Disabled Button
        </Button>
      </div>
      <div className="grid grid-cols-6 gap-4 place-items-center">
        <ButtonIcon variant={"tertiary-mediator"}>Primary</ButtonIcon>
        <ButtonIcon
          variant={"tertiary-mediator"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
        >
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon variant={"tertiary-mediator"} postFixIcon={<Pencil />}>
          Prefix Icon
        </ButtonIcon>
        <ButtonIcon
          variant={"tertiary-mediator"}
          prefixIcon={<HomeIcon className="w-6 h-6" />}
          postFixIcon={<Pencil />}
        >
          Both Icon
        </ButtonIcon>
        <ButtonIcon variant={"tertiary-mediator"} isLoading>
          Loading Button
        </ButtonIcon>
        <Button disabled>Disabled Button</Button>
      </div>
    </main>
  );
}
