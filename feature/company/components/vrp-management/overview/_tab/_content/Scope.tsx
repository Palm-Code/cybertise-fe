import {
  Badge,
  Card,
  Pagination,
  SearchInput,
  Typography,
} from "@/core/ui/components";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import ProgramDetailScopeDropdown from "../../../_dropdown/ProgramDetailScope.component";
import ScopeTable from "../../../_table/ScopeTable.component";
import {
  programDetailScope,
  scopeTableColumns,
} from "@/feature/hacker/constants/programs";
import { cn } from "@/core/lib/utils";

const Scope = () => {
  return (
    <>
      <Mobile>
        <div className="_flexbox__col__start__start w-full gap-8">
          <ScopeTable columns={scopeTableColumns} data={programDetailScope} />
          {programDetailScope.map((item, idx) => (
            <Card
              className="_flexbox__col__start__start w-full gap-6 md:hidden"
              key={`collaborators-data-${idx}`}
            >
              <Badge variant={item.asset_type as any}>{item.asset_type}</Badge>
              <div className="mt-2 grid w-full max-w-xl grid-rows-2 gap-2">
                <Typography
                  variant="p"
                  affects="small"
                  className="text-neutral-light-30 dark:text-neutral-dark-30"
                >
                  Asset Name
                </Typography>
                <Typography variant="p" affects="small" weight="semibold">
                  {item.asset_name}
                </Typography>
              </div>
              <div className="grid w-full max-w-xl grid-rows-2 gap-2">
                <Typography
                  variant="p"
                  affects="small"
                  className="text-neutral-light-30 dark:text-neutral-dark-30"
                >
                  Last update
                </Typography>
                <Typography variant="p" affects="small" weight="semibold">
                  {item.update}
                </Typography>
              </div>
            </Card>
          ))}
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-8">
          <div
            className={cn(
              "_flexbox__col__start__start w-full gap-6 rounded-2xl",
              "bg-background-main-light px-12 py-8 dark:bg-background-main-dark"
            )}
          >
            <SearchInput variant="company" placeholder="Search for assets" />
            <ProgramDetailScopeDropdown />
          </div>
          <ScopeTable columns={scopeTableColumns} data={programDetailScope} />
          <Pagination variant="company" />
        </div>
      </Desktop>
    </>
  );
};
export default Scope;
