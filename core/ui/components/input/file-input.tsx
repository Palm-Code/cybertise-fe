"use client";
import { cn } from "@/core/lib/utils";
import { Download, File, UploadCloud, X } from "lucide-react";
import Typography from "../typography/typography";
import { ChangeEvent, DragEvent, forwardRef, useState } from "react";
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
    const [input, setInput] = useState<FileWithUrl[]>(fileValues || []);
    const [success, setSuccess] = useState<{ stat: boolean }[]>([]);

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
            setSuccess((prev) => [...prev, { stat: false }]);
            setUploadProggress((prev) => [...prev, 0]);
          }
          const newFiles: FileWithUrl[] = [];
          for (let i = 0; i < e.target.files.length; i++) {
            console.log("render ke", i);
            const file = e.target.files[i];
            const { name, size } = file;
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
                  const percent = Math.floor((loaded * 100) / (total ?? 1));
                  if (percent <= 95) {
                    setUploadProggress((prev) => {
                      const progress = [...prev];
                      progress[i] = percent;
                      return progress;
                    });
                  }
                },
              })
              .then((res: AxiosResponse<I_PostTempFilesResponse>) => {
                toast.success("File uploaded successfully", {
                  position: "bottom-right",
                });
                onFileSelected(res.data.data.id, newFiles);
                setUploadProggress((prev) => {
                  const progress = [...prev];
                  progress[i] = 100;
                  return progress;
                });
                setSuccess((prev) => {
                  const success = [...prev];
                  success[i] = { stat: true };
                  return success;
                });
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
              })
              .finally(() => {
                setUploadProggress([]);
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
              setSuccess((prev) => [...prev, { stat: false }]);
              setUploadProggress((prev) => [...prev, 0]);
            }
            const newFiles: FileWithUrl[] = [];
            for (let i = 0; i < e.dataTransfer.files.length; i++) {
              console.log("render ke", i);
              const file = e.dataTransfer.files[i];
              const { name, size } = file;
              const url = URL.createObjectURL(file);
              addFilesToState(newFiles);
              const formData = new FormData();
              formData.append("file", file);
              formData.append("content", file.name);
              axiosFormDataInterceptorInstance
                .post(postFileTempAPIURL(), formData, {
                  onUploadProgress: (progressEvent) => {
                    const { loaded, total } = progressEvent;
                    const percent = Math.floor((loaded * 100) / (total ?? 1));
                    if (percent <= 95) {
                      setUploadProggress((prev) => {
                        const progress = [...prev];
                        progress[i] = percent;
                        return progress;
                      });
                    }
                    newFiles.push({ name, url, size });
                  },
                })
                .then((res: AxiosResponse<I_PostTempFilesResponse>) => {
                  onFileSelected(res.data.data.id, newFiles);
                  setUploadProggress((prev) => {
                    const progress = [...prev];
                    progress[i] = 100;
                    return progress;
                  });
                  setSuccess((prev) => {
                    const success = [...prev];
                    success[i] = { stat: true };
                    return success;
                  });
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
                });
            }
            e.dataTransfer.clearData();
          }
        } catch (error) {
          toast.error("Error uploading file");
        } finally {
          setUploadProggress([]);
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

      const newSuccess = [...success];
      newSuccess.splice(index, 1);
      setSuccess(newSuccess);
    };

    const noInput = input.length === 0;

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
                  input.length > 1 ? "grid-cols-2" : "grid-cols-1"
                )}
              >
                {input.map((file, index) => (
                  <Card
                    className="_flexbox__row__center__start h-fit w-full gap-4 p-4"
                    key={`file-${index}`}
                  >
                    <div className="h-10 w-10">
                      <File
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full bg-neutral-light-90 p-2 text-lime-normal-light dark:bg-neutral-dark-90 dark:text-lime-normal-dark"
                      />
                    </div>
                    <Tooltip content={file.name}>
                      <div
                        className={cn(
                          "_flexbox__col__start__between h-full gap-1.5",
                          input.length > 1 ? "w-40" : "w-full"
                        )}
                      >
                        <Typography
                          variant="p"
                          affects="small"
                          weight="semibold"
                        >
                          {input.length > 1
                            ? file.name.substring(0, 15) + "..."
                            : file.name}
                        </Typography>
                        {success[index].stat ? (
                          <Typography
                            variant="p"
                            affects="tiny"
                            className="text-neutral-light-40 dark:text-neutral-dark-40"
                          >
                            {(file.size / 1024).toFixed(2)}KB
                          </Typography>
                        ) : (
                          <>
                            <Progress
                              value={uploadProggress[index]}
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
                                {uploadProggress[index]?.toFixed(2)}%
                              </Typography>
                            </div>
                          </>
                        )}
                      </div>
                    </Tooltip>
                    <div className="_flexbox__row__center ml-auto gap-2">
                      <Download
                        width={16}
                        height={16}
                        className="cursor-pointer hover:scale-105"
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
                  // accept="image/jpeg, image/jpg, image/png, application/pdf"
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
