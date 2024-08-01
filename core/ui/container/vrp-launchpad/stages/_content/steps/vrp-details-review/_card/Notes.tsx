import { cn } from "@/core/lib/utils";
import { Card, Tiptap, Typography } from "@/core/ui/components";
import { sanitize } from "@/utils/sanitize-input";

const Notes = ({ data }: { data?: string }) => {
  return (
    <Card
      className={cn(
        "_flexbox__col__start__start w-full gap-6",
        "bg-background-page-light dark:bg-background-page-dark",
        "xl:p-7.5"
      )}
    >
      <Typography variant="h6" weight="bold">
        Notes
      </Typography>
      <article className="*:break-all">
        <Tiptap showing description={sanitize(data ?? "")} />
      </article>
    </Card>
  );
};
export default Notes;
