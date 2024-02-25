import { TicketCard } from "@/core/ui/container";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";

const TicketView = () => {
  return (
    <div className="_flexbox__col__center__start z-10 h-full w-full gap-6">
      <TicketCard />
      <TicketCard />
      <TicketCard />
      {/* <EmptyState
        variant="hacker"
        type="ticket"
        buttonText="See VRP Launchpad"
        href="/programs"
      /> */}
    </div>
  );
};
export default TicketView;
