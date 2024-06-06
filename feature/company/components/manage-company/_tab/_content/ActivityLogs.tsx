import { filterItems, filterSortBy } from "@/core/constants/dashboard";
import { cn } from "@/core/lib/utils";
import {
  Card,
  FilterDropdown,
  Loader,
  Separator,
  Typography,
} from "@/core/ui/components";
import { Desktop, Mobile } from "@/core/ui/layout";
import EmptyState from "@/core/ui/layout/empty-state/EmptyState.layout";
import { Circle, Dot } from "lucide-react";
import FilterDateRange from "../../_dropdown/FilterDateRange";
import { sanitize } from "@/utils/sanitize-input";
import { useActivityLogParamStore } from "@/feature/company/zustand/store/manage-company";
import { useGetActivityLog } from "@/feature/company/query/client";
import { format } from "date-fns";
import { Skeleton } from "@/core/ui/components/skeleton/skeleton";

const ActivityLogs = ({}: {}) => {
  const store = useActivityLogParamStore();
  const { data, isLoading, isFetching } = useGetActivityLog(store.payload);
  console.log(store.payload);

  return (
    <>
      <Mobile>
        <EmptyState
          variant="company"
          titleText="Activity Logs only available in desktop"
          buttonText=""
        />
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start gap-12">
          <div className="_flexbox__row__center__between w-full">
            <Typography variant="h5" weight="bold">
              Activity Logs
            </Typography>
          </div>
          <div className="_flexbox__row__center__between w-full gap-4">
            <FilterDateRange store={store} />
            <FilterDropdown
              value={store.payload.params?.sort}
              variant="company"
              onValueChange={(value) => {
                const { payload, setPayload } = store;
                {
                  setPayload({
                    ...payload,
                    params: {
                      ...payload.params,
                      sort: value,
                    },
                  });
                }
              }}
              options={filterItems}
            />
          </div>
          <div className="_flexbox__col__start__start w-full gap-6">
            {isLoading || isFetching ? (
              <div className="_flexbox__col__start__start w-full gap-4">
                <Skeleton className="w-24" />
                <Card
                  className={cn(
                    "rounded-[10px] bg-background-page-light dark:bg-background-page-dark",
                    "_flexbox__col__start__start gap-6 xl:p-7.5"
                  )}
                >
                  <div className="grid h-fit w-full grid-cols-[auto_1fr] gap-3">
                    <div className="grid h-full grid-rows-[auto_1fr] gap-3">
                      <Circle
                        width={20}
                        height={20}
                        className="h-5 w-5 stroke-[4px] text-neutral-light-30 dark:text-neutral-dark-30"
                      />
                      <div className="mx-auto min-h-4 border-l border-dashed border-brand-neutral dark:border-white" />
                    </div>
                    <div
                      className={cn("_flexbox__col__start__start w-full gap-6")}
                    >
                      <Skeleton />
                      <div className="_flexbox__row__center__start w-full gap-2">
                        <Skeleton className="w-16" />
                        <Dot className="text-brand-neutral dark:text-white" />
                        <Skeleton className="w-16" />
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            ) : data && Object.keys(data?.data as any).length > 0 ? (
              Object.keys(data?.data as any).map((item, key) => {
                const date = format(new Date(item), "dd LLL y");
                return (
                  <div
                    className="_flexbox__col__start__start w-full gap-4"
                    key={`key-${key}`}
                  >
                    <Typography variant="p" affects="normal">
                      {date}
                    </Typography>
                    <Card
                      className={cn(
                        "rounded-[10px] bg-background-page-light dark:bg-background-page-dark",
                        "_flexbox__col__start__start gap-6 xl:p-7.5"
                      )}
                    >
                      {data.data &&
                        data.data[item].map((log, index: number) => (
                          <div
                            key={`log-${index}`}
                            className="grid h-fit w-full grid-cols-[auto_1fr] gap-3"
                          >
                            <div className="grid h-full grid-rows-[auto_1fr] gap-3">
                              <Circle
                                width={20}
                                height={20}
                                className="h-5 w-5 stroke-[4px] text-neutral-light-30 dark:text-neutral-dark-30"
                              />
                              <div className="mx-auto min-h-4 border-l border-dashed border-brand-neutral dark:border-white" />
                            </div>
                            <div
                              className={cn(
                                "_flexbox__col__start__start w-full gap-6"
                              )}
                            >
                              <Typography
                                variant="p"
                                affects="small"
                                weight="semibold"
                                transform="capitalize"
                              >
                                {log.subject?.name || log.subject?.title}{" "}
                                <span className="capitalize text-sky-normal">
                                  {log.event}
                                </span>
                              </Typography>
                              {log.event !== log.description && (
                                <Card
                                  className={cn(
                                    "w-full bg-neutral-light-90 xl:p-7.5 dark:bg-neutral-dark-90"
                                  )}
                                >
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: sanitize(log.description),
                                    }}
                                  ></div>
                                </Card>
                              )}
                              <div className="_flexbox__row__center__start w-full gap-2">
                                <Typography
                                  variant="p"
                                  affects="tiny"
                                  weight="medium"
                                  className="text-neutral-light-50 dark:text-neutral-dark-50"
                                >
                                  {log.created_at
                                    ? format(
                                        new Date(log.created_at),
                                        "dd-MM-y"
                                      )
                                    : ""}
                                </Typography>
                                <Dot className="text-brand-neutral dark:text-white" />
                                <Typography
                                  variant="p"
                                  affects="tiny"
                                  weight="medium"
                                  className="text-neutral-light-50 dark:text-neutral-dark-50"
                                >
                                  {log.created_at
                                    ? format(new Date(log.created_at), "h:mm a")
                                    : ""}
                                </Typography>
                              </div>
                            </div>
                          </div>
                        ))}
                    </Card>
                  </div>
                );
              })
            ) : (
              <EmptyState
                variant="company"
                type="update"
                titleText="You have no activities here"
                className="mt-0"
                buttonText=""
              />
            )}
          </div>
        </div>
      </Desktop>
    </>
  );
};
export default ActivityLogs;
