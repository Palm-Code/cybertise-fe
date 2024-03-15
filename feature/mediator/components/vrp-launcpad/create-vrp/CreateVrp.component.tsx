import { CreateVRPLaunchpad } from "@/core/ui/container";
import VRPHeroCard from "./_card/VRPHeroCard";

const CreateVrp = () => {
  return (
    <div className="_flexbox__col__start__start w-full gap-10">
      <VRPHeroCard />
      <CreateVRPLaunchpad variant="mediator" id="" />
    </div>
  );
};
export default CreateVrp;
