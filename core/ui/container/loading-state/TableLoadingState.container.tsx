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
import { Skeleton } from "../../components/skeleton/skeleton";
import { I_TableColumns } from "@/interfaces";

const TableLoadingState = ({
  columns,
  stickyHeader = false,
}: {
  columns: I_TableColumns[];
  stickyHeader?: boolean;
}) => {
  return (
    <BaseTable>
      <TableHeader className={stickyHeader ? "sticky top-0 z-10" : ""}>
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
        {Array(10)
          .fill(0)
          .map((item, index) => (
            <TableBodyRow key={`table-row-${index}`}>
              <TableRow>
                <TableData
                  className={cn("_flexbox__col__center h-8 w-full gap-3")}
                >
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
