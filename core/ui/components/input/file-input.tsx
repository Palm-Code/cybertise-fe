"use client";
import { cn } from "@/core/lib/utils";
import { UploadCloud } from "lucide-react";
import Typography from "../typography/typography";
import { ChangeEvent, DragEvent, forwardRef, useState } from "react";
import { FileWithUrl } from "@/interfaces";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {}

const FileInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    const [dragActive, setDragActive] = useState<boolean>(false);
    const [input, setInput] = useState<FileWithUrl[]>([]);

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
        if (e.target.files && e.target.files[0]) {
          const { name, size } = e.target.files[0];

          addFilesToState([
            { name, url: URL.createObjectURL(e.target.files[0]), size },
          ]);
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
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const files = Array.from(e.dataTransfer.files);

        try {
          setDragActive(false);

          // at least one file has been selected
          addFilesToState([
            {
              name: files[0].name,
              url: URL.createObjectURL(files[0]),
              size: files[0].size,
            },
          ]);

          e.dataTransfer.clearData();
        } catch (error) {
          // already handled
        }
      }
    };

    const addFilesToState = (files: FileWithUrl[]) => {
      setInput([...input, ...files]);
    };

    const noInput = input.length === 0;

    console.log({ input });

    return (
      <form
        onDrag={handleDrag}
        className={cn(
          "_flexbox__col__center h-56 w-full rounded-3xl",
          "border-2 border-dashed border-neutral-light-80 dark:border-neutral-dark-80",
          dragActive && "bg-neutral-light-70 dark:bg-neutral-dark-70"
        )}
      >
        <label
          htmlFor="dropzone-file"
          className="_flexbox__col__center h-full w-full cursor-pointer gap-11"
        >
          {noInput && (
            <>
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className="_flexbox__col__center gap-2.5"
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
                className="text-neutral-light-60 dark:text-neutral-dark-60"
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
            </>
          )}
        </label>
      </form>
    );
  }
);
export default FileInput;
