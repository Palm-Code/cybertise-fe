import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";

const TicketView = () => {
  return (
    <div className="h-full w-full">
      <EmptyState
        variant="hacker"
        type="ticket"
        buttonText="See VRP Launchpad"
        href="/programs"
      />
    </div>
  );
};
export default TicketView;
