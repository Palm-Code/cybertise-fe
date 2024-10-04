import { Pagination, SearchInput } from "@/core/ui/components";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import ProgramDetailScopeDropdown from "../../../_dropdown/ProgramDetailScope.component";
import ScopeTable from "../../../_table/ScopeTable.component";
import { useState } from "react";
import {
  I_GetAssetTypeSuccessResponse,
  I_GetParamsPayload,
} from "@/core/models/common";
import { useGetTargetAsset } from "@/core/react-query/client/useGetTargetAsset";
import {
  useClickPaginate,
  useOnchangeSearch,
  useSubmitSearch,
} from "@/core/hooks";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import ScopeCardList from "../../_card/ScopeCardList";
import { useScopeTableColumns } from "@/feature/company/constants/vrp-management";
import ScopeCardLoadingList from "@/core/ui/container/loading-state/ScopeCardLoadingList";
import { useTranslations } from "next-intl";

const Scope = ({
  id,
  assetTypes,
}: {
  id: string;
  assetTypes?: I_GetAssetTypeSuccessResponse["data"];
}) => {
  const t = useTranslations("VRPManagement.overview.scope");
  const scopeTableColumns = useScopeTableColumns();
  const [payload, setPayload] = useState<I_GetParamsPayload>({
    params: {
      page: {
        size: 10,
        number: 1,
      },
      filter: {
        program_id: id,
      },
    },
  });

  const {
    data: targetAssets,
    refetch: refetchTargetAssets,
    isLoading,
    isRefetching,
  } = useGetTargetAsset(payload);

  return (
    <AnimationWrapper>
      <Mobile>
        <div className="_flexbox__col__start__start w-full gap-4 px-0">
          {!targetAssets && <ScopeCardLoadingList />}
          <ScopeCardList data={targetAssets?.data} />
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start w-full gap-8">
          <div className="_flexbox__col__start__start w-full gap-6 rounded-2xl bg-background-main-light px-12 py-8 dark:bg-background-main-dark">
            <SearchInput
              id="scope-search"
              variant="company"
              placeholder={t("placeholder_search")}
              value={payload.params?.search}
              onChange={(e) =>
                useOnchangeSearch(
                  e.target.value,
                  { payload, setPayload },
                  refetchTargetAssets
                )
              }
              loadingSubmit={isLoading || isRefetching}
              onSubmitSearch={() =>
                useSubmitSearch(payload.params?.search, refetchTargetAssets)
              }
            />
            <ProgramDetailScopeDropdown
              options={assetTypes}
              payload={payload}
              onValueChange={(v) =>
                setPayload({
                  ...payload,
                  params: {
                    ...payload.params,
                    filter: {
                      ...payload?.params?.filter!,
                      asset_type_id:
                        v !== "all"
                          ? assetTypes?.find((item) => item.value === v)?.id
                          : undefined,
                    },
                  },
                })
              }
            />
          </div>
          {!targetAssets && (
            <ScopeTable
              data={[]}
              columns={scopeTableColumns}
              isLoading={true}
            />
          )}
          {targetAssets?.data.length! ? (
            <>
              <ScopeTable
                isLoading={isLoading || isRefetching}
                columns={scopeTableColumns}
                data={targetAssets?.data}
              />
              <Pagination
                variant="company"
                active={payload.params?.page?.size}
                meta={targetAssets?.meta}
                activePage={payload.params?.page?.number}
                onClickPrevious={() =>
                  useClickPaginate(payload?.params?.page?.number! - 1, {
                    payload,
                    setPayload,
                  })
                }
                onClickNext={() =>
                  useClickPaginate(payload?.params?.page?.number! + 1, {
                    payload,
                    setPayload,
                  })
                }
                setActivePage={(v) =>
                  useClickPaginate(v, { payload, setPayload })
                }
                onClickShow={(v) =>
                  setPayload({
                    ...payload,
                    params: {
                      ...payload.params,
                      page: { ...payload.params?.page!, size: v },
                    },
                  })
                }
              />
            </>
          ) : (
            <EmptyState type="target-assets" variant="company" />
          )}
        </div>
      </Desktop>
    </AnimationWrapper>
  );
};
export default Scope;
