import { Button, Calendar, Separator, Typography } from "@/core/ui/components";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@/core/ui/components/select/select";
import { Actions, State } from "@/feature/company/zustand/store/manage-company";
import { addDays, format } from "date-fns";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface IFilterDateRangeProps {
  store: State & Actions;
}

const FilterDateRange = ({ store }: IFilterDateRangeProps) => {
  const { payload, setPayload } = store;
  const [openDropdown, setOpenDropdown] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: payload.params?.date_start
      ? new Date(payload.params?.date_start)
      : undefined,
    to: payload.params?.date_finish
      ? new Date(payload.params?.date_finish)
      : undefined,
  });
  return (
    <Select open={openDropdown} onOpenChange={setOpenDropdown}>
      <SelectTrigger className="!w-fit min-w-64 !justify-start gap-4 whitespace-nowrap text-nowrap">
        <CalendarDays className="text-sky-normal" />
        <Separator orientation="vertical" className="h-4" />
        <div className="_flexbox__row__center__between w-full">
          <Typography variant="p" affects="small">
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/y")} - {format(date.to, "dd/MM/y")}
                </>
              ) : (
                format(date.from, "dd/MM/y")
              )
            ) : (
              <span>Date Range</span>
            )}
          </Typography>
          <ChevronDown />
        </div>
      </SelectTrigger>
      <SelectContent noArrow className="max-h-fit">
        <div className="_flexbox__col__start__start w-full">
          <Calendar
            defaultMonth={date?.from}
            selected={date}
            className="!bg-transparent"
            mode="range"
            numberOfMonths={2}
            onSelect={setDate}
          />
          <div className="_flexbox__col__start__start w-full gap-4 p-2">
            <Separator />
            <div className="_flexbox__row__center__end w-full gap-4">
              <Button
                variant="secondary-company"
                onClick={() => {
                  setDate(undefined);
                  setPayload({
                    ...payload,
                    params: {
                      ...payload.params,
                      date_start: undefined,
                      date_finish: undefined,
                    },
                  });
                  setOpenDropdown(false);
                }}
              >
                Clear
              </Button>
              <Button
                variant="primary-company"
                onClick={() => {
                  setPayload({
                    ...payload,
                    params: {
                      ...payload.params,
                      date_start: date?.from
                        ? format(date.from, "yyyy-MM-dd")
                        : undefined,
                      date_finish: date?.to
                        ? format(date.to, "yyyy-MM-dd")
                        : undefined,
                    },
                  });
                  setOpenDropdown(false);
                }}
                disabled={!date?.from || !date?.to}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
};
export default FilterDateRange;
