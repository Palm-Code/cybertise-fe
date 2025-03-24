import { cn } from "@/core/lib/utils";
import { Card, Tiptap, Typography } from "@/core/ui/components";
import { sanitize } from "@/utils/sanitize-input";
import { useTranslations } from "next-intl";

interface I_ProblemCausesProps {
  summary: string;
  proof_of_concept: string;
}

const ProblemCausesCard = ({
  summary,
  proof_of_concept,
}: I_ProblemCausesProps) => {
  const t = useTranslations("SendReportHacker.reviews");
  return (
    <>
      <Typography
        variant="h6"
        weight="bold"
      >
        {t("problem_causes.header_title")}
      </Typography>
      <div className="_flexbox__col__start__start gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {t("problem_causes.impact")}
        </Typography>
        <article>
          <Tiptap
            description={sanitize(summary)}
            showing
          />
        </article>
      </div>
      <div className="_flexbox__col__start__start gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          {t("problem_causes.proof_of_concept")}
        </Typography>
        <article>
          <Tiptap
            description={sanitize(proof_of_concept)}
            showing
          />
        </article>
      </div>
    </>
  );
};
export default ProblemCausesCard;
