import BugTargetCard from "./_card/review/BugTarget";
import ProblemCausesCard from "./_card/review/ProblemCauses";
import ReportDescriptionCard from "./_card/review/ReportDescription";

const Review = () => {
  return (
    <div className="_flexbox__col__start__start w-full gap-6">
      <BugTargetCard
        target_assets="Lorem ipsum dolor sit amet"
        vulnerability_type="Lorem ipsum dolor sit amet"
        risk_level="10"
      />
      <ReportDescriptionCard
        title="Lorem ipsum dolor sit amet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
      />
      <ProblemCausesCard
        summary="<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>"
        proof_of_concept="<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.<strong>Lorem ipsum dolor sit amet</strong>, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>"
      />
    </div>
  );
};
export default Review;
