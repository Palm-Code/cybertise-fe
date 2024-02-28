import RnPCard from "@/feature/hacker/components/programs/details/_card/RnPCard";
import Tab from "@/feature/hacker/components/programs/details/_tab/Tab";
import { programDetailTabItems } from "@/feature/hacker/constants/programs";

const SingleVrp = () => {
  return (
    <>
      <Tab
        items={programDetailTabItems}
        active="rules"
        onValueChange={() => {}}
      />
      <RnPCard />
    </>
  );
};
export default SingleVrp;
