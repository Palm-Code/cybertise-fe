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

const Collaborators = ({ data }: { data: CollaboratorCardDataType[] }) => {
  return (
    <AnimationWrapper>
      <Mobile>
        <div className="grid min-h-full w-full grid-cols-1 gap-4">
          {data.length! ? (
            <>
              <CollaboratorsTableView
                columns={collaboratorTableColums}
                data={data}
              />
              {data.map((item, idx) => (
                <Card
                  className="_flexbox__col__start__start w-full gap-6 md:hidden"
                  key={`collaborators-data-${idx}`}
                >
                  <div className="grid w-full max-w-xl grid-cols-2">
                    <Typography
                      variant="p"
                      affects="small"
                      className="text-neutral-light-30 dark:text-neutral-dark-30"
                    >
                      Hacker Name
                    </Typography>
                    <Typography variant="p" affects="small" weight="semibold">
                      {item.name}
                    </Typography>
                  </div>
                  <div className="grid w-full max-w-xl grid-cols-2">
                    <Typography
                      variant="p"
                      affects="small"
                      className="text-neutral-light-30 dark:text-neutral-dark-30"
                    >
                      Location
                    </Typography>
                    <Typography variant="p" affects="small" weight="semibold">
                      {item.location}
                    </Typography>
                  </div>
                </Card>
              ))}
            </>
          ) : (
            <EmptyState
              variant="mediator"
              type="ticket"
              buttonText="See VRP Launchpad"
            />
          )}
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start min-h-full w-full gap-6">
          <div
            className={cn(
              "_flexbox__col__start__start w-full gap-6 rounded-2xl",
              "bg-background-main-light px-12 py-8 dark:bg-background-main-dark"
            )}
          >
            <div className="_flexbox__row__center__between w-full">
              <Typography variant="h6" weight="bold">
                Search Colllaborator
              </Typography>
              <Button variant="tertiary-mediator" prefixIcon={<UserPlus />}>
                Invite New hacker
              </Button>
            </div>
            <SearchInput
              variant="mediator"
              placeholder="Try search company name"
            />
            <div className="_flexbox__row__start__start gap-10">
              <Filter
                label="VRP Type"
                value="All VRP Type"
                options={[]}
                onValueChange={() => {}}
              />
              <Filter
                label="Asset Type"
                value="All VRP Type"
                options={[]}
                onValueChange={() => {}}
              />
            </div>
          </div>
          <div className="_flexbox__row__center__between w-full">
            <SortByDropdown />
          </div>
          {data.length! ? (
            <>
              <CollaboratorsTableView
                columns={collaboratorTableColums}
                data={data}
              />
              <Pagination variant="mediator" />
            </>
          ) : (
            <EmptyState
              variant="mediator"
              type="ticket"
              buttonText="See VRP Launchpad"
            />
          )}
        </div>
      </Desktop>
    </AnimationWrapper>
  );
};
export default Collaborators;
