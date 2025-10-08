"use client";
import * as React from "react";
import { cn } from "@/core/lib/utils";
import { Ban, Download, Eye, File, UploadCloud, X } from "lucide-react";
import Typography from "../typography/typography";
import { ChangeEvent, DragEvent, forwardRef, useEffect, useState } from "react";
import { FileWithUrl } from "@/interfaces";
import Card from "../card/card";
import Tooltip from "../tooltip/tooltip";
import { Progress } from "../progress/progress";
import { toast } from "sonner";
import axiosFormDataInterceptorInstance from "@/core/services/interceptor/axiosFormDataInterceptor";
import { postFileTempAPIURL } from "@/core/routes/common";
import { AxiosResponse } from "axios";
import { I_PostTempFilesResponse } from "@/core/models/common";
import { SendReportRequestType } from "@/core/models/common/post_send_report";
import { backgroundColor, iconColor } from "@/core/constants/common";
import Button from "../button/button";
import { useGetDownloadFiles } from "@/core/react-query/client";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Loader from "../loader/loader";
import { Role } from "@/types/admin/sidebar";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  fileValues?: SendReportRequestType["files"];
  onFileSelected: (value: string, file: FileWithUrl[]) => void;
  onFileRemoved: (value: FileWithUrl["file_id"]) => void;
  variant?: keyof typeof Role;
  isMultiple?: boolean;
  accept?: string;
  isInsertImage?: boolean;
  persistFile?: boolean;
}

const FileInput = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      onFileSelected,
      onFileRemoved,
      fileValues,
      variant = "hacker",
      isMultiple = true,
      accept = "*/*",
      isInsertImage = false,
      persistFile = false,
      ...props
    },
    ref
  ) => {
    const t = useTranslations("FileInput");
    const [uploadProggress, setUploadProggress] = useState<number[]>([]);
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [input, setInput] = useState<FileWithUrl[]>([]);
    const [errorFiles, setErrorFiles] = useState<string[]>([]);
    const { mutate, isPending } = useGetDownloadFiles();
    const [isUploading, setIsUploading] = useState<boolean>(false);

    useEffect(() => {
      if (fileValues && fileValues.length > 0) {
        setInput(input.slice(0, input.length - 1));
        setUploadProggress(
          uploadProggress.slice(0, uploadProggress.length - 1)
        );
      }
    }, [fileValues]);

    // handle drag events
    const handleDrag = (e: DragEvent<HTMLFormElement | HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
        setDragActive(true);
      } else if (e.type === "dragleave") {
        setDragActive(false);
      }
    };

    // triggers when file is selected with click
    const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();
      try {
        if (e.target.files && e.target.files.length > 0) {
          for (let i = 0; i < e.target.files.length; i++) {
            setUploadProggress((prev) => [...prev, 0]);
          }
          const newFiles: FileWithUrl[] = [];
          for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            const { name, size, type } = file;
            //max file 50MB
            if (size > 5e7) {
              toast.error("File size should be less than 50MB", {
                position: "bottom-right",
                duration: 1000,
              });
              return;
            }
            const url = URL.createObjectURL(file);
            newFiles.push({ name, url, size });
            addFilesToState(newFiles);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("content", file.name);
            if (persistFile) {
              formData.append("persist", "1");
            }
            axiosFormDataInterceptorInstance
              .post(postFileTempAPIURL(), formData, {
                onUploadProgress: (progressEvent) => {
                  setIsUploading(true);
                  const { loaded, total } = progressEvent;
                  const percent = Math.floor((loaded * 95) / (total ?? 1));
                  setUploadProggress((prev) => {
                    const progress = [...prev];
                    progress[i] = percent;
                    return progress;
                  });
                },
              })
              .then((res: AxiosResponse<I_PostTempFilesResponse>) => {
                toast.success("File uploaded successfully", {
                  position: "bottom-right",
                  duration: 1000,
                });
                const files = [
                  {
                    name: name,
                    uuid: res.data.data.media[0].uuid,
                    url: res.data.data.media[0].original_url,
                    size: size,
                    file_id: res.data.data.id,
                    mime_type: res.data.data.media[0].mime_type,
                  },
                ];
                onFileSelected(res.data.data.id, files);
                setUploadProggress((prev) => {
                  const progress = [...prev];
                  progress[i] = 100;
                  return progress;
                });
                setIsUploading(false);
              })
              .catch((err) => {
                toast.error("Error uploading file", {
                  position: "bottom-right",
                  duration: 1000,
                });
                setIsUploading(false);
                setErrorFiles((prev) => {
                  return [...prev, name];
                });
                setInput((prev) => {
                  return prev.slice(0, prev.length - 1);
                });
              });
          }
        }
      } catch (error) {
        setIsUploading(false);
        toast.error("Error uploading file", {
          position: "bottom-right",
          duration: 1000,
        });
      }
    };

    // triggers when file is dropped
    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      // validate file type
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        try {
          setDragActive(false);
          if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
              setUploadProggress((prev) => [...prev, 0]);
            }
            const newFiles: FileWithUrl[] = [];
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
              const file = e.dataTransfer.files[i];
              const { name, size } = file;
              const url = URL.createObjectURL(file);
              newFiles.push({ name, url, size, mime_type: file.type });
              //less than 50MB
              if (size > 5e7) {
                toast.error("File size should be less than 50MB", {
                  position: "bottom-right",
                  duration: 1000,
                });
                return;
              }
              addFilesToState(newFiles);
              const formData = new FormData();
              formData.append("file", file);
              formData.append("content", file.name);
              if (persistFile) {
                formData.append("persist", "1");
              }
              axiosFormDataInterceptorInstance
                .post(postFileTempAPIURL(), formData, {
                  onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    const percent = Math.floor((loaded * 95) / (total ?? 1));
                    setUploadProggress((prev) => {
                      const progress = [...prev];
                      progress[i] = percent;
                      return progress;
                    });
                  },
                })
                .then((res: AxiosResponse<I_PostTempFilesResponse>) => {
                  toast.success("File uploaded successfully", {
                    position: "bottom-right",
                    duration: 1000,
                  });

                  const files = [
                    {
                      name: name,
                      uuid: res.data.data.media[0].uuid,
                      url: res.data.data.media[0].original_url,
                      size: size,
                      file_id: res.data.data.id,
                      mime_type: file.type,
                    },
                  ];
                  onFileSelected(res.data.data.id, files);
                  setUploadProggress((prev) => {
                    const progress = [...prev];
                    progress[i] = 100;
                    return progress;
                  });
                })
                .catch((err) => {
                  toast.error("Error uploading file", {
                    position: "bottom-right",
                    duration: 1000,
                  });
                  setErrorFiles((prev) => {
                    return [...prev, name];
                  });
                  setInput((prev) => {
                    return prev.slice(0, prev.length - 1);
                  });
                });
            }
            e.dataTransfer.clearData();
          }
        } catch (error) {
          toast.error("Error uploading file");
        }
      }
    };

    const addFilesToState = (files: FileWithUrl[]) => {
      setInput([...input, ...files]);
      setTimeout(() => setInput([...input, ...files]), 1000);
    };

    const handleDelete = (index: number) => {
      onFileRemoved(fileValues && fileValues[index].file_id);
      const newInput = [...input];
      const newUploadProggress = [...uploadProggress];
      newInput.splice(index, 1);
      setInput(newInput);

      newUploadProggress.splice(index, 1);
      setUploadProggress(newUploadProggress);
    };

    const onFileDownload = (url: string, fileName: string) => {
      //downloaad file from url
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("target", "_blank");
      link.download = url.substring(url.lastIndexOf("/") + 1);
      link.setAttribute(
        "download",
        fileName || url.substring(url.lastIndexOf("/") + 1)
      );
      link.click();
    };

    const onDeleteFailUpload = (index: number) => {
      setErrorFiles((prev) => {
        const files = [...prev];
        files.splice(index, 1);
        return files;
      });
    };

    const noInput =
      input.length === 0 && !fileValues?.length && !errorFiles?.length;

    return (
      <form
        onDrag={handleDrag}
        className={cn(
          "_flexbox__col__center h-60 w-full rounded-3xl",
          "border-2 border-dashed border-neutral-light-80 dark:border-neutral-dark-80",
          dragActive && "bg-neutral-light-70 dark:bg-neutral-dark-70",
          className
        )}
      >
        <div
          className="_flexbox__col__start__start h-full w-full gap-10 p-6 pb-12"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {noInput ? (
            <label
              htmlFor="dropzone-file"
              className="_flexbox__col__start__start h-full w-full gap-10"
            >
              <div className="_flexbox__col__center m-auto mb-0 cursor-pointer gap-2.5">
                <UploadCloud
                  width={32}
                  height={32}
                />
                <Typography
                  variant="h6"
                  weight="bold"
                >
                  {t("drag_and_drop")}
                </Typography>
                <Typography
                  variant="p"
                  affects="small"
                  className="text-neutral-light-60 dark:text-neutral-dark-60"
                >
                  {t("select_files")}
                </Typography>
              </div>
              <Typography
                variant="p"
                affects="small"
                className="m-auto mt-0 text-neutral-light-60 dark:text-neutral-dark-60"
              >
                {t("max_50mb")}
              </Typography>
              <input
                {...props}
                ref={ref}
                multiple={isMultiple}
                onChange={handleChange}
                accept={accept}
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
          ) : (
            <div className="_flexbox__col__center w-full gap-2">
              {!isInsertImage ? (
                <>
                  <div
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    className={cn(
                      "grid h-40 w-full gap-4 overflow-y-auto",
                      input.length > 1 || (fileValues && fileValues.length > 1)
                        ? "grid-cols-2"
                        : "grid-cols-1"
                    )}
                  >
                    {fileValues?.map((file, index) => (
                      <Card
                        className="_flexbox__row__center__start h-fit w-full gap-4 xl:p-4"
                        key={`file-${index}`}
                      >
                        <div className="h-10 w-10">
                          <File
                            width={40}
                            height={40}
                            className={cn(
                              "h-10 w-10 rounded-full bg-neutral-light-90 p-2 dark:bg-neutral-dark-90",
                              iconColor[variant]
                            )}
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
                              {fileValues.length > 1
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
                        <div className="_flexbox__row__center ml-auto gap-2">
                          {file.mime_type?.includes("image") ? (
                            <Button
                              type="button"
                              asLink
                              href={file.url}
                              target="_blank"
                              variant={`ghost-${variant}`}
                              className="p-0"
                              prefixIcon={<Eye className="h-6 w-6" />}
                            />
                          ) : (
                            <Button
                              type="button"
                              variant={`ghost-${variant}`}
                              disabled={isPending}
                              className="p-0"
                              prefixIcon={<Download className="h-6 w-6" />}
                              onClick={() =>
                                mutate({
                                  id: file.uuid as string,
                                  filename: file.name,
                                })
                              }
                            />
                          )}
                          <X
                            className="cursor-pointer text-semantic-light-critical hover:scale-105 dark:text-semantic-light-critical"
                            width={16}
                            height={16}
                            onClick={() => handleDelete(index)}
                          />
                        </div>
                      </Card>
                    ))}
                    {input.map((file, index) => (
                      <Card
                        className="_flexbox__row__center__start h-fit w-full gap-4 xl:p-4"
                        key={`file-${index}`}
                      >
                        <div className="h-10 w-10">
                          <File
                            width={40}
                            height={40}
                            className={cn(
                              "h-10 w-10 rounded-full bg-neutral-light-90 p-2 dark:bg-neutral-dark-90",
                              iconColor[variant]
                            )}
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
                              {input.length > 1
                                ? file.name.substring(0, 15) + "..."
                                : file.name}
                            </Typography>
                          </Tooltip>
                          <Progress
                            value={
                              uploadProggress.filter((i) => i !== 100)[index]
                            }
                            className="h-2"
                            indicatorColor={backgroundColor[variant]}
                          />
                          <div className="_flexbox__row__center__between w-full">
                            <Typography
                              variant="p"
                              affects="tiny"
                              className="text-neutral-light-40 dark:text-neutral-dark-40"
                            >
                              {t("uploading")}
                            </Typography>
                            <Typography
                              variant="p"
                              affects="tiny"
                              className="text-neutral-light-40 dark:text-neutral-dark-40"
                            >
                              {Math.round(
                                uploadProggress.filter((i) => i !== 100)[index]
                              )}
                              %
                            </Typography>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {errorFiles?.map((file, index) => (
                      <Card
                        className="_flexbox__row__center__start h-fit w-full gap-4 xl:p-4"
                        key={`file-${index}`}
                      >
                        <div className="h-10 w-10">
                          <File
                            width={40}
                            height={40}
                            className={cn(
                              "h-10 w-10 rounded-full bg-neutral-light-90 p-2 dark:bg-neutral-dark-90",
                              iconColor[variant]
                            )}
                          />
                        </div>
                        <div
                          className={cn(
                            "_flexbox__col__start__between h-full gap-1.5",
                            "w-full"
                          )}
                        >
                          <Tooltip content={file}>
                            <Typography
                              variant="p"
                              affects="small"
                              weight="semibold"
                            >
                              {errorFiles.length > 0
                                ? file.substring(0, 15) + "..."
                                : file}
                            </Typography>
                          </Tooltip>
                        </div>
                        <div className="_flexbox__row__center ml-auto gap-2">
                          <Ban
                            width={16}
                            height={16}
                            className="cursor-pointer text-semantic-light-critical hover:scale-105 dark:text-semantic-light-critical"
                          />
                          <X
                            className="cursor-pointer text-semantic-light-critical hover:scale-105 dark:text-semantic-light-critical"
                            width={16}
                            height={16}
                            onClick={() => onDeleteFailUpload(index)}
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                  <label
                    htmlFor="dropzone-file"
                    className={cn(
                      "cursor-pointer underline",
                      iconColor[variant]
                    )}
                  >
                    {t("upload_more")}
                    <input
                      ref={ref}
                      multiple={isMultiple}
                      onChange={handleChange}
                      accept={accept}
                      id="dropzone-file"
                      type="file"
                      className="hidden"
                      {...props}
                    />
                  </label>
                </>
              ) : (
                <label
                  htmlFor="dropzone-file"
                  className="relative mx-auto flex aspect-square h-auto w-full max-w-sm items-center justify-center overflow-hidden"
                >
                  <input
                    ref={ref}
                    multiple={isMultiple}
                    onChange={handleChange}
                    accept={accept}
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    {...props}
                  />
                  {fileValues && fileValues?.length > 0 && !isUploading ? (
                    <Image
                      src={fileValues[0].url}
                      alt={fileValues[0].name}
                      fill
                      sizes="100%"
                      className="object-cover"
                    />
                  ) : (
                    <Loader
                      variant={variant}
                      noText
                      width={24}
                      height={24}
                      className="m-auto h-auto"
                    />
                  )}
                </label>
              )}
            </div>
          )}
        </div>
      </form>
    );
  }
);
export default FileInput;
