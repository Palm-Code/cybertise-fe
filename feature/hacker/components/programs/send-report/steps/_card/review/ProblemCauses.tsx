import { cn } from "@/core/lib/utils";
import { Card, Typography } from "@/core/ui/components";
import { sanitize } from "@/utils/sanitize-input";

interface I_ProblemCausesProps {
  summary: string;
  proof_of_concept: string;
}

const ProblemCausesCard = ({
  summary,
  proof_of_concept,
}: I_ProblemCausesProps) => {
  return (
    <>
      <Typography variant="h6" weight="bold">
        Problem and Causes
      </Typography>
      <div className="_flexbox__col__start__start gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Summary
        </Typography>
        <article
          dangerouslySetInnerHTML={{ __html: sanitize(summary) }}
        ></article>
      </div>
      <div className="_flexbox__col__start__start gap-2.5">
        <Typography
          variant="p"
          affects="normal"
          className="text-neutral-light-40 dark:text-neutral-dark-40"
        >
          Proof of Concept
        </Typography>
        <article
          dangerouslySetInnerHTML={{ __html: sanitize(proof_of_concept) }}
        ></article>
      </div>
    </>
  );
};
export default ProblemCausesCard;
