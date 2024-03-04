import {
  TableBody,
  TableBodyRow,
  TableData,
  TableRow,
} from "@/core/ui/components";
import AnimationWrapper from "../../wrapper/Animation.wrapper";
import { Skeleton } from "@/core/ui/components/skeleton/skeleton";

const TableLoader = () => {
  return (
    <AnimationWrapper>
      <TableBodyRow>
        <TableRow>
          <Skeleton className="h-16 w-full" />
        </TableRow>
      </TableBodyRow>
    </AnimationWrapper>
  );
};
export default TableLoader;
