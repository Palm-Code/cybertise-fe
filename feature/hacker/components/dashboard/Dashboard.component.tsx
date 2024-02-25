"use client";
import { filterItems, filterView } from "@/core/constants/dashboard";
import {
  FilterDropdown,
  FilterViewDropdown,
  Pagination,
  SearchInput,
} from "@/core/ui/components";
import Typography from "@/core/ui/components/typography/typography";
import { TicketView } from "../../container";

const Dashboard = () => {
  return (
    <div className="_flexbox__col__start h-full w-full gap-10">
      <div className="grid w-full grid-cols-2 place-items-center content-between">
        <Typography variant="h4" weight="bold" className="mr-auto">
          Open Ticket
        </Typography>
        <div className="ml-auto w-full max-w-xl">
          <SearchInput
            variant="hacker"
            placeholder="Try “#21231” or “Company name”"
          />
        </div>
      </div>
      <div className="grid w-full grid-cols-2 place-items-center content-between">
        <div className="mr-auto grid grid-flow-col place-items-center gap-4">
          <Typography
            variant="p"
            affects="small"
            className=" text-neutral-light-30 dark:text-neutral-dark-30"
          >
            Sort by
          </Typography>
          <FilterDropdown
            value="latest"
            options={filterItems}
            onValueChange={() => {}}
          />
        </div>
        <div className="ml-auto w-fit">
          <FilterViewDropdown
            type="hacker"
            value="card"
            options={filterView}
            onValueChange={() => {}}
          />
        </div>
      </div>
      <TicketView />
      <Pagination variant="hacker" />
    </div>
  );
};
export default Dashboard;
