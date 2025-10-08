import { iconColor } from "@/core/constants/common";
import { Button, Calendar, Separator, Typography } from "@/core/ui/components";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@/core/ui/components/select/select";
import { Actions, State } from "@/feature/company/zustand/store/manage-company";
import { Role } from "@/types/admin/sidebar";
import { addDays, format } from "date-fns";
import { CalendarDays, ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface IFilterDateRangeProps {
  store: State & Actions;
  variant?: keyof typeof Role;
}

const FilterDateRange = ({
  store,
  variant = "company",
}: IFilterDateRangeProps) => {
  const t = useTranslations("Filter.date_range");
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
    <Select
      open={openDropdown}
      onOpenChange={setOpenDropdown}
    >
      <SelectTrigger className="!w-fit min-w-64 !justify-start gap-4 whitespace-nowrap text-nowrap">
        <CalendarDays className={iconColor[variant]} />
        <Separator
          orientation="vertical"
          className="h-4"
        />
        <div className="_flexbox__row__center__between w-full">
          <Typography
            variant="p"
            affects="small"
          >
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd/MM/y")} - {format(date.to, "dd/MM/y")}
                </>
              ) : (
                format(date.from, "dd/MM/y")
              )
            ) : (
              <span>{t("title")}</span>
            )}
          </Typography>
          <ChevronDown />
        </div>
      </SelectTrigger>
      <SelectContent
        noArrow
        className="h-full max-h-full"
        groupClassName="!max-h-full"
      >
        <div className="_flexbox__col__start__start w-full">
          <Calendar
            variant={variant}
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
                variant={`secondary-${variant}`}
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
                {t("button_clear")}
              </Button>
              <Button
                variant={`primary-${variant}`}
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
                      page: 1,
                    },
                  });
                  setOpenDropdown(false);
                }}
                disabled={!date?.from || !date?.to}
              >
                {t("button_apply")}
              </Button>
            </div>
          </div>
        </div>
      </SelectContent>
    </Select>
  );
};
export default FilterDateRange;
