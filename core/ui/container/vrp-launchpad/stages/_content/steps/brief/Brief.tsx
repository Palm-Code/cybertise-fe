import { cn } from "@/core/lib/utils";
import { Button, Card, Tiptap, Typography } from "@/core/ui/components";
import { sanitize } from "@/utils/sanitize-input";

interface IBriefProps {
  onClickNext: () => void;
}

const Brief = ({ onClickNext }: IBriefProps) => {
  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      <Typography
        variant="h5"
        weight="bold"
      >
        Brief
      </Typography>
      <Card
        className={cn(
          "_flexbox__col__start__start w-full gap-6 rounded-[10px]",
          "bg-neutral-light-100 dark:bg-neutral-dark-100",
          "p-7.5"
        )}
      >
        <article className="*:break-all">
          <Tiptap
            showing
            description={sanitize(
              "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi tincidunt augue interdum velit. Aliquet eget sit amet tellus. Morbi tristique senectus et netus et malesuada fames ac turpis. </p><br><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi tincidunt augue interdum velit. Aliquet eget sit amet tellus. Morbi tristique senectus et netus et malesuada fames ac turpis. </p>"
            )}
          />
        </article>
        <Button
          variant="primary-company"
          onClick={onClickNext}
        >
          Next
        </Button>
      </Card>
    </div>
  );
};
export default Brief;
