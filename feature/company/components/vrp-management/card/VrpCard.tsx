import { currentPhase } from "@/core/constants/common";
import { cn } from "@/core/lib/utils";
import { I_GetProgramListSuccessResponse } from "@/core/models/hacker/programs";
import {
  Badge,
  Card,
  Indicator,
  Separator,
  Tooltip,
  Typography,
} from "@/core/ui/components";
import { ModalForbidden } from "@/core/ui/container";
import { Desktop, Mobile } from "@/core/ui/layout";
import { SortFilterType } from "@/types/admin/dashboard";
import { Role } from "@/types/admin/sidebar";
import { useTranslations } from "next-intl";
import { useState } from "react";

interface I_VRPCard {
  id?: string;
  title?: string;
  status?: string;
  type: string;
  asset_types?: SortFilterType[];
  variant?: keyof typeof Role;
}

const VRPCard = ({
  id,
  title,
  status,
  asset_types,
  variant,
  type,
}: I_VRPCard) => {
  const t = useTranslations("Programs");
  const [showModalForbidden, setShowModalForbidden] = useState(false);

  return (
    <>
      <Mobile>
        <Card
          isClickable={status?.toLowerCase() === "published"}
          href={
            status?.toLowerCase() === "published"
              ? `/vrp-launchpad/overview/${id}`
              : `#`
          }
          onClick={() => setShowModalForbidden(true)}
        >
          <div className="_flexbox__col__start__start w-full gap-4">
            <div className="_flexbox__col__start__between w-full gap-4">
              <Tooltip content={title || ""}>
                <Typography variant="p" affects="large" weight="semibold">
                  {title && title?.length > 25
                    ? title?.substring(0, 25) + "..."
                    : title}
                </Typography>
              </Tooltip>
              {type.toLowerCase() === "private" && (
                <Badge variant="default">{type}</Badge>
              )}
              <Indicator
                variant={
                  status?.toLowerCase().includes("phase") ? "open" : "clear"
                }
              >
                {`${status} ${status?.toLowerCase().includes("phase") ? `: ${currentPhase[status?.toLowerCase()]}` : ""}`}
              </Indicator>
            </div>
            <Separator orientation="horizontal" />
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="small"
                className="text-neutal-light-20 dark:text-neutral-dark-20"
              >
                {t("asset_type_available")}
              </Typography>
              <div className="flex flex-wrap gap-4">
                {asset_types?.slice(0, 3)?.map((item) => {
                  return (
                    <Badge
                      key={`asset_type-${item?.value}`}
                      variant={item.label?.toLowerCase() as any}
                    >
                      {item.value}
                    </Badge>
                  );
                })}
                {asset_types && asset_types?.length > 3 && (
                  <Badge variant="default">
                    +{asset_types?.length - 3} More
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Card>
        <ModalForbidden
          isOpen={showModalForbidden}
          onClose={() => setShowModalForbidden(false)}
          variant="company"
          title={t("forbidden.title")}
          subtitle={t("forbidden.description_vrp")}
        />
      </Mobile>
      <Desktop>
        <Card
          isClickable={
            variant === "company" || status?.toLowerCase() === "published"
          }
          onClick={() =>
            status?.toLowerCase() !== "published" &&
            variant !== "company" &&
            setShowModalForbidden(true)
          }
          href={
            status?.toLowerCase() === "published"
              ? `/vrp-launchpad/overview/${id}`
              : `/vrp-launchpad/${id}`
          }
        >
          <div className="_flexbox__col__start__start w-full gap-12">
            <div className="_flexbox__row__center__between w-full">
              <div
                className={cn("grid grid-cols-[auto_1fr] items-center gap-4")}
              >
                <Tooltip content={title || ""}>
                  <Typography variant="p" affects="large" weight="semibold">
                    {title && title?.length > 50
                      ? title?.substring(0, 50) + "..."
                      : title}
                  </Typography>
                </Tooltip>
                {type.toLowerCase() === "private" && (
                  <Badge variant="default">{type}</Badge>
                )}
              </div>
              <Indicator
                variant={
                  status?.toLowerCase().includes("phase") ? "open" : "clear"
                }
              >
                {`${status} ${status?.toLowerCase().includes("phase") ? `: ${currentPhase[status?.toLowerCase()]}` : ""}`}
              </Indicator>
            </div>
            <div className="_flexbox__col__start__start gap-2.5">
              <Typography
                variant="p"
                affects="small"
                className="text-neutal-light-20 dark:text-neutral-dark-20"
              >
                {t("asset_type_available")}
              </Typography>
              <div className="grid grid-flow-col gap-4">
                {asset_types?.slice(0, 3)?.map((item) => {
                  return (
                    <Badge
                      key={`asset_type-${item?.value}`}
                      variant={item.label?.toLowerCase() as any}
                    >
                      {item.value}
                    </Badge>
                  );
                })}
                {asset_types && asset_types?.length > 3 && (
                  <Tooltip
                    content={asset_types
                      .map((item) => item.value)
                      .slice(3, asset_types.length - 1)
                      .join(", ")}
                  >
                    <Badge variant="default">
                      +{asset_types?.length - 3} More
                    </Badge>
                  </Tooltip>
                )}
              </div>
            </div>
          </div>
        </Card>
        <ModalForbidden
          isOpen={showModalForbidden}
          onClose={() => setShowModalForbidden(false)}
          variant="company"
          title={t("forbidden.title_vrp")}
          subtitle={t("forbidden.description_vrp")}
        />
      </Desktop>
    </>
  );
};

interface I_VRPCardList {
  data?: I_GetProgramListSuccessResponse["data"];
  variant?: keyof typeof Role;
}

const VRPCardList = ({ data, variant }: I_VRPCardList) => {
  return data?.map((item) => {
    return <VRPCard key={item?.id} variant={variant} {...item} />;
  });
};

export default VRPCardList;
