import { useGetContibutorList } from "@/core/react-query/client/useGetContributorList";
import { Card, Typography } from "@/core/ui/components";
import { AnimationWrapper, Mobile } from "@/core/ui/layout";
import { ContributorTableView } from "../../_table";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { useGetContibutorTableColumns } from "@/core/constants/common";
import { useContributorsParamsStore } from "@/core/zustands/contributors";
import { TableLoadingList } from "@/core/ui/container";
import DesktopLayout from "@/core/ui/layout/wrapper/DesktopLayout.wrapper";
import { useInView } from "react-intersection-observer";
import { SkeletonList } from "@/core/ui/components/skeleton/skeleton";
import { cn } from "@/core/lib/utils";
import { CollaboratorListCard } from "@/feature/mediator/components/companies/details/_card/CollaboratorCard";
import { CollaboratorLoadingCard } from "@/feature/mediator/components/companies/details/_card/CollaboratorLoadingCard";

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
  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) {
        setTimeout(() => {
          fetchNextPage();
        }, 200);
      }
    },
  });
  const contributorListData = contributorList?.pages
    .map((page) => page.data)
    .flat();
  const totalCollaborator = contributorList?.pages[0].meta.total ?? 0;

  if (isLoadingContributors) {
    return <TableLoadingList columns={contributorTableColums} />;
  }

  return (
    <AnimationWrapper className="px-0">
      <Mobile className={cn("space-y-6")}>
        <CollaboratorListCard data={contributorListData || []} />
        <div ref={ref} className="w-full space-y-6 pb-8">
          {isFetchingNextPage && <CollaboratorLoadingCard list={3} />}
        </div>
      </Mobile>
      <DesktopLayout>
        {totalCollaborator > 0 ? (
          <>
            <ContributorTableView
              columns={contributorTableColums}
              data={contributorListData || []}
            />
            <div ref={ref} className={cn("mt-6 space-y-6")}>
              {isFetchingNextPage && (
                <SkeletonList className="h-16 w-full rounded-2xl" count={3} />
              )}
            </div>
          </>
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
