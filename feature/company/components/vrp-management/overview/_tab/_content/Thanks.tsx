import { useGetContibutorList } from "@/core/react-query/client/useGetContributorList";
import { Card, Typography } from "@/core/ui/components";
import { AnimationWrapper } from "@/core/ui/layout";
import { ContributorTableView } from "../../_table";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useGetContibutorTableColumns } from "@/core/constants/common";
import { useContributorsParamsStore } from "@/core/zustands/contributors";
import { TableLoadingList } from "@/core/ui/container";
import DesktopLayout from "@/core/ui/layout/wrapper/DesktopLayout.wrapper";

const Thanks = ({ programId }: { programId: string }) => {
  const contributorTableColums = useGetContibutorTableColumns();
  const contributorStore = useContributorsParamsStore();
  const {
    queryMobile: {
      isLoading: isLoadingContributors,
      isRefetching,
      data: contributorList,
      fetchNextPage,
      isFetchingNextPage,
      refetch,
    },
  } = useGetContibutorList(contributorStore.payload, programId);
  const contributorListData = contributorList?.pages
    .map((page) => page.data)
    .flat();
  const totalCollaborator = contributorList?.pages[0].meta.total ?? 0;

  if (isLoadingContributors) {
    return <TableLoadingList columns={contributorTableColums} />;
  }

  return (
    <AnimationWrapper className="px-0">
      <DesktopLayout>
        {totalCollaborator > 0 ? (
          <ContributorTableView
            columns={contributorTableColums}
            data={contributorListData || []}
          />
        ) : (
          <EmptyState
            titleText="You Have No Thanks Message"
            variant="company"
            type="update"
            buttonText=""
          />
        )}
      </DesktopLayout>
    </AnimationWrapper>
  );
};
export default Thanks;
