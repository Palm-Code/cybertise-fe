"use client";
import { SendReportRequestType } from "@/core/models/common/post_send_report";
import BugTargetCard from "./_card/review/BugTarget";
import ProblemCausesCard from "./_card/review/ProblemCauses";
import ReportDescriptionCard from "./_card/review/ReportDescription";
import {
  I_GetAssetTypeSuccessResponse,
  I_GetVulnerabilityTypeSuccessResponse,
  I_Media,
} from "@/core/models/common";
import { I_GetProgramDetailsSuccessResponse } from "@/core/models/hacker/programs/get_program_details";
import {
  Button,
  Card,
  Loader,
  Tooltip,
  Typography,
} from "@/core/ui/components";
import { Download, Eye, File } from "lucide-react";
import { cn } from "@/core/lib/utils";
import {
  useGetAssetTypeDetails,
  useGetDownloadFiles,
  useGetTargetAssetDetails,
} from "@/core/react-query/client";
import { Role } from "@/types/admin/sidebar";

interface I_ReviewProps {
  defaultData?: {
    assetType?: I_GetAssetTypeSuccessResponse["data"];
    targetAssets?: I_GetProgramDetailsSuccessResponse["data"]["target_assets"];
    vulnerabilityType?: I_GetVulnerabilityTypeSuccessResponse["data"];
  };
  data?: SendReportRequestType & {
    media?: I_Media[];
  };
  variant?: keyof typeof Role;
}

const Review = ({ data, defaultData, variant = "hacker" }: I_ReviewProps) => {
  const { data: asset_type, isLoading: assetTypeLoading } =
    useGetAssetTypeDetails(data?.custom_ta_asset_type_id as string);

  const { data: target_asset, isLoading: targetAssetLoading } =
    useGetTargetAssetDetails(data?.target_asset_id as string);

  const { mutate, isPending } = useGetDownloadFiles();

  if (assetTypeLoading || targetAssetLoading)
    return <Loader variant={variant} />;

  if (data)
    return (
      <div className="_flexbox__col__start__start w-full gap-6 bg-transparent">
        <BugTargetCard
          target_assets={{
            label: data?.target_asset_id
              ? target_asset?.asset_type.value
              : asset_type?.value,
            value: data?.target_asset_id
              ? target_asset?.asset_type.label
              : asset_type?.label,
            content: data?.custom_ta_value || target_asset?.content,
          }}
          vulnerability_type={
            data.custom_vulnerability ||
            (defaultData?.vulnerabilityType?.find(
              (item) => item.id === data?.vulnerabiity_type_id
            )?.label as string)
          }
          risk_level={data?.risk_level}
        />
        <ReportDescriptionCard
          title={data.title}
          description={data.description}
        />
        <Card
          className={cn(
            "rounded-[10px] bg-neutral-light-90 px-4 py-6 xl:px-7.5 xl:py-7.5 dark:bg-neutral-dark-90",
            "_flexbox__col__start__start w-full gap-6"
          )}
        >
          <ProblemCausesCard
            summary={data.impact}
            proof_of_concept={data.poc}
          />
          {data.media && data.media?.length > 0 && (
            <>
              <Typography
                variant="p"
                affects="normal"
                className="text-neutral-light-40 dark:text-neutral-dark-40"
              >
                Attachments
              </Typography>
              <div
                className={cn(
                  "grid w-full gap-4 overflow-y-auto",
                  data.media && data.media.length > 1
                    ? "grid-cols-2"
                    : "grid-cols-1"
                )}
              >
                {data.media?.map((file, index) => (
                  <Card
                    className="_flexbox__row__center__start h-fit w-full gap-4 p-4 xl:p-4"
                    key={`file-${index}`}
                  >
                    <div className="h-10 w-10">
                      <File
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full bg-neutral-light-90 p-2 text-lime-normal-light dark:bg-neutral-dark-90 dark:text-lime-normal-dark"
                      />
                    </div>
                    <div
                      className={cn(
                        "_flexbox__col__start__between h-full gap-1.5",
                        "w-full"
                      )}
                    >
                      <Tooltip content={file.collection_name}>
                        <Typography
                          variant="p"
                          affects="small"
                          weight="semibold"
                        >
                          {data.files && data.files?.length > 1
                            ? `${file.collection_name.substring(0, 15)}.${file.file_name.split(".")[1]}` +
                              "..."
                            : `${file.collection_name}.${file.file_name.split(".")[1]}`}
                        </Typography>
                      </Tooltip>
                      <Typography
                        variant="p"
                        affects="tiny"
                        className="text-neutral-light-40 dark:text-neutral-dark-40"
                      >
                        {(file.size / 1024).toFixed(1)}KB
                      </Typography>
                    </div>
                    <div className="_flexbox__row__center ml-auto gap-4">
                      {file.mime_type.includes("image") ? (
                        <Button
                          asLink
                          href={file.original_url}
                          target="_blank"
                          variant="ghost-hacker"
                          className="p-0"
                          prefixIcon={<Eye className="h-6 w-6" />}
                        />
                      ) : (
                        <Button
                          variant="ghost-hacker"
                          disabled={isPending}
                          className="p-0"
                          onClick={() =>
                            mutate({
                              id: file.uuid,
                              filename: file.file_name,
                            })
                          }
                          prefixIcon={<Download className="h-6 w-6" />}
                        />
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
          {data.files && !data.media && data.files?.length > 0 && (
            <>
              <Typography
                variant="p"
                affects="normal"
                className="text-neutral-light-40 dark:text-neutral-dark-40"
              >
                Attachments
              </Typography>
              <div
                className={cn(
                  "grid w-full gap-4 overflow-y-auto",
                  data.files && data.files.length > 1
                    ? "grid-cols-2"
                    : "grid-cols-1"
                )}
              >
                {data.files?.map((file, index) => (
                  <Card
                    className="_flexbox__row__center__start h-fit w-full gap-4 xl:p-4"
                    key={`file-${index}`}
                  >
                    <div className="h-10 w-10">
                      <File
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full bg-neutral-light-90 p-2 text-lime-normal-light dark:bg-neutral-dark-90 dark:text-lime-normal-dark"
                      />
                    </div>
                    <div
                      className={cn(
                        "_flexbox__col__start__between h-full gap-1.5",
                        "w-full"
                      )}
                    >
                      <Tooltip content={file.name}>
                        <Typography
                          variant="p"
                          affects="small"
                          weight="semibold"
                        >
                          {data.files && data.files?.length > 1
                            ? file.name.substring(0, 15) + "..."
                            : file.name}
                        </Typography>
                      </Tooltip>
                      <Typography
                        variant="p"
                        affects="tiny"
                        className="text-neutral-light-40 dark:text-neutral-dark-40"
                      >
                        {(file.size / 1024).toFixed(1)}KB
                      </Typography>
                    </div>
                  </Card>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>
    );
};
export default Review;
