"use client";
import { Building2, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectTrigger,
} from "@/core/ui/components/select/select";
import { Desktop } from "@/core/ui/layout";
import { Button } from "@/core/ui/components";
import { Hacker } from "@/core/ui/icons";

interface I_TicketDropDownProps {
  withIcon?: boolean;
  hackerId?: string;
  companyTicketId: string | null;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  status: string;
}

const TicketDropDown = ({
  withIcon,
  hackerId,
  companyTicketId,
  open = false,
  status,
  onOpenChange = () => {},
  ...props
}: I_TicketDropDownProps) => {
  return (
    <>
      <Desktop className="w-fit">
        <Select open={open} onOpenChange={onOpenChange}>
          <SelectTrigger className="!bg-transparent !p-0">
            <ChevronRight />
          </SelectTrigger>
          <SelectContent
            align="end"
            alignOffset={10}
            sideOffset={10}
            className="!bg-white dark:!bg-neutral-dark-100"
          >
            <Button
              asLink
              href={`/reports/${hackerId}`}
              variant={"tertiary-hacker"}
              prefixIcon={<Hacker className="h-4 w-4" />}
            >
              Hacker Ticket
            </Button>
            <br />
            {!!companyTicketId ? (
              <Button
                asLink
                href={`/reports/${companyTicketId}`}
                variant={"tertiary-company"}
                prefixIcon={<Building2 className="h-4 w-4" />}
              >
                Company Ticket
              </Button>
            ) : status.toLowerCase() === "canceled" ||
              status.toLowerCase() === "closed" ? null : (
              <Button
                asLink
                href={`/reports/new?ticket_id=${hackerId}`}
                variant={"tertiary-company"}
                prefixIcon={<Building2 className="h-4 w-4" />}
              >
                Create Company Ticket
              </Button>
            )}
          </SelectContent>
        </Select>
      </Desktop>
    </>
  );
};
export default TicketDropDown;
