"use client";
import { cn } from "@/core/lib/utils";
import { Download, File, UploadCloud, X } from "lucide-react";
import Typography from "../typography/typography";
import { ChangeEvent, DragEvent, forwardRef, useState } from "react";
import { FileWithUrl } from "@/interfaces";
import Card from "../card/card";
import Tooltip from "../tooltip/tooltip";
import { Progress } from "../progress/progress";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const FileInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [input, setInput] = useState<FileWithUrl[]>([]);
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
          const newFiles: FileWithUrl[] = [];

          for (let i = 0; i < e.target.files.length; i++) {
            const file = e.target.files[i];
            const { name, size } = file;
            const url = URL.createObjectURL(file);
            newFiles.push({ name, url, size });
            setTimeout(
              () =>
                setSuccess((prev) => [
                  ...prev,
                  {
                    stat: true,
                  },
                ]),
              3000
            );
          }

          addFilesToState(newFiles);
        }
      } catch (error) {
        // already handled
      }
    };

    // triggers when file is dropped
    const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      // validate file type
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const newFiles: FileWithUrl[] = [];

        try {
          setDragActive(false);
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            const file = e.dataTransfer.files[i];
            const { name, size } = file;
            const url = URL.createObjectURL(file);
            newFiles.push({ name, url, size });
            setTimeout(
              () =>
                setSuccess((prev) => [
                  ...prev,
                  {
                    stat: true,
                  },
                ]),
              i * 500
            );
          }
          addFilesToState(newFiles);
          e.dataTransfer.clearData();
        } catch (error) {
          // already handled
        }
      }
    };

    const addFilesToState = (files: FileWithUrl[]) => {
      setInput([...input, ...files]);
      setTimeout(() => setInput([...input, ...files]), 500);
    };

    const handleDelete = (index: number) => {
      const newInput = [...input];
      newInput.splice(index, 1);
      setInput(newInput);

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
                  <Card className="_flexbox__row__center__start h-fit w-full gap-4 p-4">
                    <div className="h-10 w-10">
                      <File
                        width={40}
                        height={40}
                        className="h-10 w-10 rounded-full bg-neutral-light-90 p-2 text-lime-normal dark:bg-neutral-dark-90"
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
                        {success[index] ? (
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
                              value={80}
                              className="h-2"
                              indicatorColor="bg-lime-normal"
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
                                80%
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
                className="cursor-pointer text-lime-normal underline"
              >
                + Upload more files
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
            </div>
          )}
        </div>
      </form>
    );
  }
);
export default FileInput;
