import { Badge, ThemeSwitcher } from "@/core/ui/components";

const page = () => {
  return (
    <div className="_flexbox__col__center min-h-screen w-full gap-2">
      <ThemeSwitcher />
      <Badge variant="infrastructure">Infrastructure</Badge>
      <Badge variant="webapplication">Web Application</Badge>
      <Badge variant="software-pc">Software PC</Badge>
    </div>
  );
};
export default page;
