import { Pagination, SearchInput } from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";
import ProgramDetailScopeDropdown from "../../../_dropdown/ProgramDetailScope.component";
import ScopeTable from "../../../_table/ScopeTable.component";
import {
  programDetailScope,
  scopeTableColumns,
} from "@/feature/hacker/constants/programs";

const Scope = () => {
  return (
    <div className="_flexbox__col__start__start w-full gap-8">
      <div className="_flexbox__col__start__start w-full gap-6 rounded-2xl bg-background-main-light px-12 py-8 dark:bg-background-main-dark">
        <SearchInput variant="company" placeholder="Search for assets" />
        <ProgramDetailScopeDropdown />
      </div>
      <ScopeTable columns={scopeTableColumns} data={programDetailScope} />
      <Pagination variant="company" />
    </div>
  );
};
export default Scope;
