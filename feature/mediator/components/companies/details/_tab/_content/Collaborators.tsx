"use client";
import { Button, Card, Pagination, SearchInput } from "@/core/ui/components";
import Typography from "@/core/ui/components/typography/typography";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { CollaboratorCardDataType } from "@/types/admin/vrp-launchpad";
import { CollaboratorsTableView } from "@/feature/mediator/containers";
import { collaboratorTableColums } from "@/feature/mediator/constants/vrp-launchpad";
import SortByDropdown from "../../../_dropdown/SortBy.component";
import Filter from "@/core/ui/components/dropdown/filter";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import { UserPlus } from "lucide-react";
import { cn } from "@/core/lib/utils";
import { useGetCollaboratorList } from "@/feature/mediator/query/client";
import { useCollaboratorsParamsStore } from "@/feature/mediator/zustand/store/companies/collaborators";
import VrpCardList from "../../_card/VrpCard";
import { I_GetProgramListSuccessResponse } from "@/core/models/hacker/programs";

const Collaborators = ({
  data,
}: {
  data: I_GetProgramListSuccessResponse["data"];
}) => {
  const { payload, setPayload } = useCollaboratorsParamsStore();
  const {
    queryDesktop: { isLoading, data: collaboratorList },
  } = useGetCollaboratorList(payload, "a4d1e449-b07c-44f5-b0f4-e3845caa91aa");

  return (
    <AnimationWrapper>
      <Mobile>
        <EmptyState variant="mediator" />
      </Mobile>
      <Desktop>
        <VrpCardList data={data ?? []} />
      </Desktop>
    </AnimationWrapper>
  );
};
export default Collaborators;
