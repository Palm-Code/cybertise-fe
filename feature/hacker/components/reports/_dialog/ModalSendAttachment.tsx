import { cn } from "@/core/lib/utils";
import {
  BaseModal,
  Button,
  FileInput,
  Tiptap,
  Typography,
} from "@/core/ui/components";
import { FileWithUrl } from "@/interfaces";

interface I_ModalSendAttachmentProps {
  isOpen: boolean;
  onClose: () => void;
  onClickSendAttachment: () => void;
  description?: string;
  attachment?: string[];
  onChangeValue: (v: string) => void;
  files?: FileWithUrl[];
  onChangeAttachment: (v: string, type?: "put" | "delete") => void;
  onChangeFiles: (v?: FileWithUrl[], type?: "put" | "delete") => void;
  isLoading?: boolean;
}

const ModalSendAttachment = ({
  isOpen,
  onClose,
  onClickSendAttachment,
  description,
  attachment,
  onChangeAttachment,
  onChangeValue,
  files,
  onChangeFiles = () => {},
  isLoading,
}: I_ModalSendAttachmentProps) => {
  const onFileSelected = (v: string, file: FileWithUrl[]) => {
    onChangeAttachment(v, "put");
    onChangeFiles(file, "put");
  };

  const onFileRemoved = (v?: string) => {
    if (!v) return;
    onChangeFiles(
      files?.filter((file) => file.file_id !== v),
      "delete"
    );
    onChangeAttachment(v, "delete");
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose}>
      <div
        className={cn(
          "relative mx-auto w-full max-w-3xl rounded-xl px-8 py-12",
          "_flexbox__col__start__start gap-6",
          "bg-background-main-light dark:bg-background-main-dark"
        )}
      >
        <div className="_flexbox__col__start__start w-full gap-6">
          <Typography variant="h5" weight="bold">
            Upload Attachment
          </Typography>
          <div
            className={cn(
              "_flexbox__col__center w-full gap-8 p-7",
              "rounded-[10px] bg-neutral-light-100 dark:bg-neutral-dark-100"
            )}
          >
            <FileInput
              fileValues={files}
              onFileRemoved={onFileRemoved}
              onFileSelected={onFileSelected}
            />
            <Tiptap
              description={description ?? ""}
              label="Write a caption"
              variant="hacker"
              isChat
              className="pb-12 shadow-none"
              onChangeValue={onChangeValue}
            />
          </div>
        </div>
        <div className="_flexbox__row__start__start gap-8">
          <Button variant="secondary-hacker" fullWidth onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary-hacker"
            disabled={(!description && !attachment?.length) || isLoading}
            isLoading={isLoading}
            fullWidth
            onClick={() => {
              onClickSendAttachment();
              // onClose();
            }}
          >
            Send Attachment
          </Button>
        </div>
      </div>
    </BaseModal>
  );
};
export default ModalSendAttachment;
