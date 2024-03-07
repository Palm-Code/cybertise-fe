import { Typography } from "@/core/ui/components";

interface I_BriefProps {}

const Brief = ({}: I_BriefProps) => {
  return (
    <Typography variant="p" affects="small">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Fringilla ut morbi
      tincidunt augue interdum velit. Aliquet eget sit amet tellus. Morbi
      tristique senectus et netus et malesuada fames ac turpis. <br /> Lorem
      ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Fringilla ut morbi tincidunt
      augue interdum velit. Aliquet eget sit amet tellus. Morbi tristique
      senectus et netus et malesuada fames ac turpis.
    </Typography>
  );
};
export default Brief;
