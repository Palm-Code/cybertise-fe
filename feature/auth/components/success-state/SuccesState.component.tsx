import { cn } from "@/core/lib/utils";
import Typography from "@/core/ui/components/typography";
import { Locker } from "@/core/ui/icons";

const SuccessState = () => {
  return (
    <div
      className={cn(
        "w-full max-w-[553px] rounded-lg bg-background-main-dark px-10 py-20",
        "_flexbox__col__center gap-28"
      )}
    >
      <div className="_flexbox__col__center w-full gap-6">
        <Locker />
        <Typography variant="p" affects="normal">
          Protecting your account is our top priority. Please confirm your
          activity by clicking the magic sent to your email:
        </Typography>
        <Typography variant="p" affects="normal" weight="semibold">
          email@example.com
        </Typography>
      </div>
      <Typography variant="p" affects="normal" align="center">
        It may take a minute to receive your code. <br /> Haven&apos;t received
        it?{" "}
        <span className="cursor-pointer font-bold text-brand-emerald underline">
          Resend
        </span>
      </Typography>
    </div>
  );
};
export default SuccessState;
