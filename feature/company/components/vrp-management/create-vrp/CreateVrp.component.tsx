import { CreateVRPLaunchpad } from "@/core/ui/container";
import { Desktop, Mobile } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";

const CreateVrp = () => {
  return (
    <>
      <Mobile>
        <EmptyState variant="company" type="default" />
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start relative w-full pb-28">
          <CreateVRPLaunchpad variant="company" currentStep={"Phase1"} />
        </div>
      </Desktop>
    </>
  );
};
export default CreateVrp;
