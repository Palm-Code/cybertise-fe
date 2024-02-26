import {
  Badge,
  BaseTable,
  TableBody,
  TableBodyRow,
  TableData,
  TableHead,
  TableHeader,
  TableRow,
} from "@/core/ui/components";
import { I_TableColumns, I_TableTicketData } from "@/interfaces";

interface I_TableProps {
  columns: I_TableColumns[];
  data: I_TableTicketData[];
}

export default function Table({ data, columns }: I_TableProps) {
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
        {data.map((item, index) => (
          <TableBodyRow key={`table-row-${index}`}>
            <TableRow>
              <TableData className="w-4/12">{item.company_name}</TableData>
              <TableData className="w-2/12 text-center">
                <Badge variant={item.risk_level}>{item.risk_level}</Badge>
              </TableData>
              <TableData className="w-2/12 text-center">
                {item.vulnerability_type}
              </TableData>
              <TableData className="w-2/12 text-center">
                {item.rewards}
              </TableData>
              <TableData className="w-2/12 text-center">
                {item.status}
              </TableData>
              <TableData className="w-2/12 text-right">{item.update}</TableData>
            </TableRow>
          </TableBodyRow>
        ))}
      </TableBody>
    </BaseTable>
  );
}
