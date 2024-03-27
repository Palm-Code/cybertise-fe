import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { sanitize } from "@/utils/sanitize-input";

const Notes = () => {
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-6",
        "bg-background-page-light dark:bg-background-page-dark",
        "p-7.5"
      )}
    >
      <Typography variant="h6" weight="bold">
        Notes
      </Typography>
      <div
        dangerouslySetInnerHTML={{
          __html: sanitize(
            "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi tincidunt augue interdum velit. Aliquet eget sit amet tellus. Morbi tristique senectus et netus et malesuada fames ac turpis. </p><br><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi tincidunt augue interdum velit. Aliquet eget sit amet tellus. Morbi tristique senectus et netus et malesuada fames ac turpis. </p>"
          ),
        }}
      ></div>
    </Card>
  );
};
export default Notes;
