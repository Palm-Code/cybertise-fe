"use client";
import BaseDropdown from "./base-dropdown";
import { filterItems } from "@/feature/hacker/constants/dashboard";
import { Desktop, Mobile } from "../../layout";
import { StoreType } from "@/core/hooks/types";
import { FilterDrawer } from "../drawer/filter-drawer";
import { useState } from "react";
import { I_GetParamsPayload } from "@/core/models/common";
import { Role } from "@/types/admin/sidebar";

interface ICompaniesFilterProps {
  variant?: keyof typeof Role;
  onValueChange?: (value: string, type: "status") => void;
  store: StoreType;
}

const CompaniesFilter = ({
  variant = "hacker",
  onValueChange = () => {},
  store,
}: ICompaniesFilterProps) => {
  const { payload, setPayload } = store;
  const [tempPayload, setTempPayload] = useState<I_GetParamsPayload>(payload);

  return (
    <>
      <Mobile className="w-fit">
        <FilterDrawer
          variant={variant}
          onSubmitFilter={() => setPayload(tempPayload)}
        >
          <div className="_flexbox__col__start__start w-full gap-6">
            <BaseDropdown
              variant={variant}
              label="Type"
              value={tempPayload?.params?.filter?.status || "all"}
              options={filterItems.company_status ?? []}
              onValueChange={(v) => {
                setTempPayload({
                  ...tempPayload,
                  params: {
                    ...tempPayload.params,
                    filter: {
                      ...tempPayload.params?.filter,
                      status: v === "all" ? undefined : v,
                    },
                  },
                });
              }}
            />
          </div>
        </FilterDrawer>
      </Mobile>
      <Desktop className="w-fit">
        <BaseDropdown
          variant={variant}
          label="Type"
          value={payload?.params?.filter?.status || "all"}
          options={filterItems.company_status ?? []}
          onValueChange={(v) => onValueChange(v, "status")}
        />
      </Desktop>
    </>
  );
};
export default CompaniesFilter;
