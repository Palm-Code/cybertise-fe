import { cn } from "@/core/lib/utils";
import {
  BaseTable,
  TableBody,
  TableBodyRow,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components";
import { AnimationWrapper } from "../../layout";
import { Skeleton } from "../../components/skeleton/skeleton";
import { I_TableColumns } from "@/interfaces";

const TableLoadingState = ({ columns }: { columns: I_TableColumns[] }) => {
  return (
    <BaseTable>
      <TableHeader>
        <TableRow>
          {columns.map((column, index) => (
            <TableHead
              className={column.width}
              key={`table-head-${index}`}
              align={column.align}
            >
              {column.title}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array(6)
          .fill(0)
          .map((item, index) => (
            <TableBodyRow key={`table-row-${index}`}>
              <TableRow>
                <TableData
                  className={cn("_flexbox__col__center h-24 w-full gap-3")}
                >
                  <Skeleton className="h-full w-full" />
                  <Skeleton className="h-full w-full" />
                </TableData>
              </TableRow>
            </TableBodyRow>
          ))}
      </TableBody>
    </BaseTable>
  );
};
export default TableLoadingState;
