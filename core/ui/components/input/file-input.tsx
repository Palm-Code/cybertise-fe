"use client";
import { cn } from "@/core/lib/utils";
import { Ban, Download, File, UploadCloud, X } from "lucide-react";
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
import { SendReportRequestType } from "@/core/models/hacker/programs/post_send_report";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  fileValues?: SendReportRequestType["files"];
  onFileSelected: (value: string, file: FileWithUrl[]) => void;
  onFileRemoved: (value: FileWithUrl["file_id"]) => void;
}

const FileInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, onFileSelected, onFileRemoved, fileValues, ...props }, ref) => {
    const [uploadProggress, setUploadProggress] = useState<number[]>([]);
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [input, setInput] = useState<FileWithUrl[]>([]);
    const [errorFiles, setErrorFiles] = useState<string[]>([]);

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
            const { name, size } = file;
            //max file 50MB
            if (size > 5e7) {
              toast.error("File size should be less than 50MB", {
                position: "bottom-right",
              });
              return;
            }
            const url = URL.createObjectURL(file);
            newFiles.push({ name, url, size });
            addFilesToState(newFiles);
            const formData = new FormData();
            formData.append("file", file);
            formData.append("content", file.name);
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
                });
                const files = [
                  {
                    name: name,
                    url: url,
                    size: size,
                    file_id: res.data.data.id,
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
                });
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
        toast.error("Error uploading file", {
          position: "bottom-right",
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
              newFiles.push({ name, url, size });
              //less than 50MB
              if (size > 5e7) {
                toast.error("File size should be less than 50MB", {
                  position: "bottom-right",
                });
                return;
              }
              addFilesToState(newFiles);
              const formData = new FormData();
              formData.append("file", file);
              formData.append("content", file.name);
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
                  });
                  const files = [
                    {
                      name: name,
                      url: url,
                      size: size,
                      file_id: res.data.data.id,
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
          dragActive && "bg-neutral-light-70 dark:bg-neutral-dark-70"
        )}
      >
        <div className="_flexbox__col__start__start h-full w-full gap-10 p-6 pb-12">
          {noInput ? (
            <label
              htmlFor="dropzone-file"
              className="_flexbox__col__start__start h-full w-full gap-10"
            >
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className="_flexbox__col__center m-auto mb-0 cursor-pointer gap-2.5"
              >
                <UploadCloud width={32} height={32} />
                <Typography variant="h6" weight="bold">
                  Drag & Drop
                </Typography>
                <Typography
                  variant="p"
                  affects="small"
                  className="text-neutral-light-60 dark:text-neutral-dark-60"
                >
                  or select files from device
                </Typography>
              </div>
              <Typography
                variant="p"
                affects="small"
                className="m-auto mt-0 text-neutral-light-60 dark:text-neutral-dark-60"
              >
                max. 50MB
              </Typography>
              <input
                {...props}
                ref={ref}
                multiple
                onChange={handleChange}
                accept="image/jpeg, image/jpg, image/png, application/pdf"
                id="dropzone-file"
                type="file"
                className="hidden"
              />
            </label>
          ) : (
            <div className="_flexbox__col__center w-full gap-2">
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
                        {(file.size / 1024).toFixed(2)}KB
                      </Typography>
                    </div>
                    <div className="_flexbox__row__center ml-auto gap-2">
                      <Download
                        width={16}
                        height={16}
                        className="cursor-pointer hover:scale-105"
                        onClick={() => onFileDownload(file.url, file.name)}
                      />
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
                          {input.length > 1
                            ? file.name.substring(0, 15) + "..."
                            : file.name}
                        </Typography>
                      </Tooltip>
                      <Progress
                        value={uploadProggress.filter((i) => i !== 100)[index]}
                        className="h-2"
                        indicatorColor="bg-lime-normal-light dark:bg-lime-normal-dark"
                      />
                      <div className="_flexbox__row__center__between w-full">
                        <Typography
                          variant="p"
                          affects="tiny"
                          className="text-neutral-light-40 dark:text-neutral-dark-40"
                        >
                          Uploading
                        </Typography>
                        <Typography
                          variant="p"
                          affects="tiny"
                          className="text-neutral-light-40 dark:text-neutral-dark-40"
                        >
                          {uploadProggress
                            .filter((i) => i !== 100)
                            [index]?.toFixed(2)}
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
                        className="h-10 w-10 rounded-full bg-neutral-light-90 p-2 text-lime-normal-light dark:bg-neutral-dark-90 dark:text-lime-normal-dark"
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
                className="cursor-pointer text-lime-normal-light underline dark:text-lime-normal-dark"
              >
                + Upload more files
                <input
                  {...props}
                  ref={ref}
                  multiple
                  onChange={handleChange}
                  accept="*/*"
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                />
              </label>
            </div>
          )}
        </div>
      </form>
    );
  }
);
export default FileInput;
