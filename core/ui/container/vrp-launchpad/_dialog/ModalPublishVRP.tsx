"use client";
import { cn } from "@/core/lib/utils";
import { CreateVrpType } from "@/core/models/common/post_create_vrp";
import {
  BaseModal,
  Button,
  DatePicker,
  Input,
  Typography,
} from "@/core/ui/components";
import { Calendar } from "@/core/ui/components/calendar/calendar";
import TimePicker from "@/core/ui/components/timepicker/timepicker";
import { CircleDot } from "lucide-react";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface I_ModalPublishVRPProps {
  isOpen: boolean;
  onClose: () => void;
  onClickPublish: () => void;
  isLoading?: boolean;
}

const ModalPublishVRP = ({
  isOpen,
  onClose,
  onClickPublish,
  isLoading = false,
}: I_ModalPublishVRPProps) => {
  const [isPublishNow, setIsPublishNow] = useState<boolean>(true);
  const { setValue, watch } = useFormContext<CreateVrpType>();
  const forms = watch();

  return (
    <BaseModal isOpen={isOpen}>
      <div
        className={cn(
          "_flexbox__col__start__start mx-auto w-full max-w-[602px] gap-12 p-20",
          "rounded-lg bg-background-main-light dark:bg-background-main-dark"
        )}
      >
        <div className="_flexbox__col__center w-full gap-8">
          <Typography variant="h5" weight="bold">
            Publish VRP
          </Typography>
          <div className="_flexbox__col__start__start w-full gap-6">
            <button
              type="button"
              title="publish now"
              onClick={() => setIsPublishNow(true)}
              className={cn(
                "_flexbox__row__start__start w-full gap-4 rounded-lg transition-colors",
                "border-2  px-6 py-4 ",
                isPublishNow
                  ? "border-sky-normal"
                  : "border-neutral-light-50 dark:border-neutral-dark-50"
              )}
            >
              <div
                className={cn(
                  "w-fit rounded-full border-2 p-1",
                  isPublishNow
                    ? "border-sky-normal"
                    : "border-neutral-light-10 dark:border-neutral-dark-10"
                )}
              >
                <CircleDot
                  width={12.69}
                  height={12.69}
                  className={cn(
                    isPublishNow
                      ? "fill-sky-normal text-sky-normal"
                      : "fill-transparent text-transparent"
                  )}
                />
              </div>
              <div className="_flexbox__col__start__start gap-2">
                <Typography variant="h6" weight="semibold">
                  Publish Now
                </Typography>
                {isPublishNow && (
                  <Typography variant="p" affects="small">
                    The new VRP will published immediately as soon as you click
                    on the publish button
                  </Typography>
                )}
              </div>
            </button>
            <button
              type="button"
              title="publish now"
              onClick={() => setIsPublishNow(false)}
              className={cn(
                "_flexbox__row__start__start w-full gap-4 rounded-lg transition-colors",
                "border-2  px-6 py-4 ",
                !isPublishNow
                  ? "border-sky-normal"
                  : "border-neutral-light-50 dark:border-neutral-dark-50"
              )}
            >
              <div
                className={cn(
                  "w-fit rounded-full border-2 p-1",
                  !isPublishNow
                    ? "border-sky-normal"
                    : "border-neutral-light-10 dark:border-neutral-dark-10"
                )}
              >
                <CircleDot
                  width={12.69}
                  height={12.69}
                  className={cn(
                    !isPublishNow
                      ? "fill-sky-normal text-sky-normal"
                      : "fill-transparent text-transparent"
                  )}
                />
              </div>
              <div className="_flexbox__col__start__start w-full gap-2">
                <Typography variant="h6" weight="semibold">
                  Schedule Publish
                </Typography>
                {!isPublishNow && (
                  <div className="_flexbox__col__start__start w-full gap-2">
                    <Typography variant="p" affects="small">
                      Select a date to make you VRP Published
                    </Typography>
                    <DatePicker
                      value={forms.publish_date as string}
                      onChangeValue={(e) => {
                        setValue(
                          "publish_date",
                          e?.toISOString().split("T")[0]
                        );
                      }}
                    />
                    <TimePicker
                      onValueChange={(e) => {
                        setValue("publish_time", e);
                      }}
                      value={forms.publish_time as string}
                    />
                  </div>
                )}
              </div>
            </button>
          </div>
        </div>
        <div className="_flexbox__row__center__between w-full gap-6">
          <Button variant="secondary-company" fullWidth onClick={onClose}>
            Back
          </Button>
          <Button
            variant="primary-company"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={onClickPublish}
            fullWidth
          >
            Publish VRP
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
export default ModalPublishVRP;
