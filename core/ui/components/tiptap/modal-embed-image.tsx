"use client";

import { cn } from "@/core/lib/utils";
import BaseModal, { I_ModalProps } from "../modal/modal";
import Typography from "../typography/typography";
import FileInput from "../input/file-input";
import Button from "../button/button";
import { OptionsType } from "@/types/auth/sign-up";
import { useState } from "react";
import Input from "../input/input";
import { FileWithUrl } from "@/interfaces";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

interface I_ModalEmbedImageProps extends I_ModalProps {
  onClickInsertImage?: (url: string) => void;
  onFileSelected: (value: string, file: FileWithUrl[]) => void;
  fileValues?: FileWithUrl[];
  onClickInsert: (url: string) => void;
}

const Tabs = ({
  options,
  activeTab,
  onValueChange,
}: {
  options: OptionsType[];
  activeTab: number;
  onValueChange: (value: number) => void;
}) => {
  return (
    <div className="flex items-center gap-10">
      {options.map((option, index) => (
        <button
          type="button"
          key={index}
          className={cn(
            "border-b-2 border-b-transparent",
            index === activeTab &&
              "border-b-lime-normal-light dark:border-b-lime-normal-dark",
            "hover:border-b-lime-normal-light dark:hover:border-b-lime-normal-dark"
          )}
          onClick={() => onValueChange(index)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export const ModalEmbedImage = ({
  onClickInsertImage = () => {},
  onFileSelected = () => {},
  fileValues,
  onClickInsert,
  onClose = () => {},
  ...props
}: I_ModalEmbedImageProps) => {
  const t = useTranslations("TextEditor");
  const [urlImage, setUrlImage] = useState<string>("");
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <BaseModal {...props}>
      <div
        className={cn(
          "mx-auto w-full max-w-2xl overflow-auto",
          "bg-background-main-light dark:bg-background-main-dark",
          "rounded-xl px-8 py-12",
          "flex flex-col gap-6"
        )}
      >
        <Typography variant={"h5"} weight={"bold"}>
          {t("title")}
        </Typography>
        <div
          className={cn(
            "flex h-full w-full flex-col gap-8 rounded-[10px] p-7.5",
            "bg-neutral-light-100 dark:bg-neutral-dark-100"
          )}
        >
          <Tabs
            activeTab={activeTab}
            options={[
              {
                label: t("tab.upload"),
                value: "upload",
              },
              {
                label: t("tab.url"),
                value: "url",
              },
            ]}
            onValueChange={(value) => {
              setActiveTab(value);
            }}
          />
          {activeTab === 0 ? (
            <FileInput
              isInsertImage
              fileValues={fileValues}
              accept="image/*"
              isMultiple={false}
              onFileRemoved={() => {}}
              onFileSelected={(v, file) => onFileSelected(v, file)}
              className="h-auto"
            />
          ) : (
            <div
              className={cn(
                "_flexbox__col__start__start h-fit w-full gap-8 rounded-3xl p-8",
                "border-2 border-dashed border-neutral-light-80 dark:border-neutral-dark-80"
              )}
            >
              <div className="flex w-full flex-col gap-2.5">
                <Typography variant={"h6"} weight={"bold"}>
                  {t("title_paste_url")}
                </Typography>
                <Input
                  value={urlImage}
                  onChange={(e) => {
                    setUrlImage(e.target.value);
                  }}
                  autoFocus
                  label={t("label_image_url")}
                  placeholderText={t("placeholder_image_url")}
                />
                <span className="text-sm text-neutral-light-60 dark:text-neutral-dark-60">
                  {t("alert_only_select_image")}
                </span>
                {urlImage && (
                  <div className="relative mx-auto flex aspect-square h-auto w-full max-w-sm items-center justify-center overflow-hidden">
                    <img
                      src={urlImage}
                      alt={"embedded image"}
                      sizes="100%"
                      className="object-cover"
                      onError={() => {
                        setTimeout(() => {
                          setUrlImage("");
                        }, 2000);
                        toast.error("Invalid image URL", {
                          position: "bottom-right",
                          duration: 1000,
                        });
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center gap-8">
            <Button
              variant={"secondary-hacker"}
              onClick={() => {
                onClose();
                setUrlImage("");
              }}
            >
              {t("button_cancel")}
            </Button>
            <Button
              variant={"primary-hacker"}
              onClick={() => {
                onClickInsert(
                  activeTab === 0 ? fileValues?.[0]?.url ?? "" : urlImage
                );
                setUrlImage("");
              }}
            >
              {t("button_insert")}
            </Button>
          </div>
        </div>
      </div>
    </BaseModal>
  );
};
