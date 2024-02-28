import { Card, Typography } from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";

const RnPCard = () => {
  return (
    <AnimationWrapper>
      <Card className="px-8 py-12">
        <div className="_flexbox__col__start__start w-full gap-6">
          <Typography variant="p" affects="extralarge" weight="bold">
            Rules and policy
          </Typography>
          <Typography variant="p" affects="normal">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci a
            scelerisque purus semper eget. Pellentesque habitant morbi tristique
            senectus et. Neque convallis a cras semper. Pretium lectus quam id
            leo in vitae turpis. Risus nec feugiat in fermentum. Sollicitudin ac
            orci phasellus egestas tellus rutrum tellus pellentesque.
            Scelerisque mauris pellentesque pulvinar pellentesque habitant morbi
            tristique senectus et. Leo urna molestie at elementum eu facilisis.
            Sit amet nisl suscipit adipiscing. Nulla porttitor massa id neque
            aliquam vestibulum morbi. Aliquet enim tortor at auctor urna.
            Laoreet non curabitur gravida arcu ac. Enim facilisis gravida neque
            convallis a cras semper auctor neque. Vestibulum lectus mauris
            ultrices eros in cursus turpis. Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </Typography>
        </div>
      </Card>
    </AnimationWrapper>
  );
};
export default RnPCard;
