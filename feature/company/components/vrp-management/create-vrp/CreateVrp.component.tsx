import { CreateVRPLaunchpad } from "@/core/ui/container";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";

const CreateVrp = () => {
  return (
    <>
      <div className="wrapper__mobile">
        <EmptyState
          variant="company"
          type="default"
        />
      </div>
      <div className="wrapper__desktop">
        <div className="_flexbox__col__start__start relative w-full pb-28">
          <CreateVRPLaunchpad
            variant="company"
            currentStep={"Phase1"}
          />
        </div>
      </div>
    </>
  );
};
export default CreateVrp;
