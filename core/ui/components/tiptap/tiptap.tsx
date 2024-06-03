"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import Underline from "@tiptap/extension-underline";
import Document from "@tiptap/extension-document";
import Link from "@tiptap/extension-link";
import BulletList from "@tiptap/extension-bullet-list";
import ListItem from "@tiptap/extension-list-item";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import typescript from "highlight.js/lib/languages/typescript";
import { common, createLowlight } from "lowlight";
import { cn } from "@/core/lib/utils";
import { useState } from "react";
import Tooltip from "../tooltip/tooltip";
import { Info, Paperclip, Send, X } from "lucide-react";
import Typography from "../typography/typography";
import Button from "../button/button";
import Separator from "../separator/separator";
import { Role } from "@/types/admin/sidebar";

const lowlight = createLowlight(common);
lowlight.register({ html });
lowlight.register({ javascript });
lowlight.register({ css });
lowlight.register({ typescript });

interface I_TiptapProps extends React.HTMLAttributes<HTMLDivElement> {
  description: string;
  onChangeValue: (value: string) => void;
  label?: string;
  withTooltip?: boolean;
  onClearInput?: () => void;
  isChat?: boolean;
  variant: keyof typeof Role;
  onClickSendAttachment?: () => void;
  onClickSendMessage?: () => void;
  isLoading?: boolean;
}

const Tiptap = ({
  description,
  onChangeValue,
  label,
  withTooltip,
  isChat = false,
  isLoading = false,
  onClearInput = () => {},
  variant,
  onClickSendAttachment,
  onClickSendMessage = () => {},
  ...props
}: I_TiptapProps) => {
  const [isFocus, setIsFocused] = useState<boolean>(false);
  const editor = useEditor({
    extensions: [
      StarterKit.configure(),
      Underline,
      Document,
      BulletList,
      ListItem,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        validate: (href) => /^https?:\/\//.test(href),
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: cn(
          "w-full peer leading-tight appearance-none max-w-none overflow-auto whitespace-pre-line",
          "flex flex-col justify-start outline-none",
          isChat
            ? "h-full mt-0 bg-transparent"
            : "mt-4 bg-neutral-light-90 dark:bg-neutral-dark-90"
        ),
      },
    },
    autofocus: true,
    onUpdate: ({ editor }) => {
      const value = editor.isEmpty ? "" : editor.getHTML();
      onChangeValue(value);
    },
    onFocus: () => {
      editor?.commands.focus();
      setIsFocused(true);
    },
    onBlur: () => {
      setIsFocused(false);
    },
  });

  if (isChat) {
    return (
      <div
        className={cn(
          "sticky bottom-16 z-50 w-full rounded-3xl p-5 shadow-bubble",
          "_flexbox__col__start__start gap-3",
          "border border-neutral-light-80 bg-neutral-light-100",
          "dark:border-neutral-dark-80 dark:bg-neutral-dark-100",
          props.className
        )}
      >
        <label
          htmlFor="description"
          className={cn(
            "absolute transform text-base text-neutral-light-30 duration-300 dark:text-neutral-dark-30",
            "left-4 z-20 origin-[0] scale-75 peer-focus:start-0",
            isFocus || !!description ? "top-0.5" : "top-4"
          )}
        >
          {label}
        </label>
        <EditorContent
          maxLength={5000}
          editor={editor}
          onKeyDown={(e) => {
            if (!description) return;
            if (e.key === "Enter" && e.shiftKey) {
              if (description === "<p><br></p>") {
                e.preventDefault();
                editor?.commands.clearContent();
                return;
              } else {
                e.preventDefault();
                // onClickSendMessage();
                editor?.commands.clearContent();
              }
            }
          }}
          autoFocus
          className="peer flex max-h-20 w-full max-w-full overflow-auto whitespace-pre-line"
        />
        <Separator orientation="horizontal" />
        <div className="_flexbox__row__center__between w-full">
          <Toolbar editor={editor} />
          {!!onClickSendAttachment && !!onClickSendMessage && (
            <div className="_flexbox__row__center gap-4">
              <Button
                prefixIcon={<Paperclip />}
                variant={`tertiary-${variant}`}
                onClick={onClickSendAttachment}
              >
                Send Attachment
              </Button>
              <Button
                disabled={!description || description === "<p><br></p>"}
                postFixIcon={<Send />}
                variant={`primary-${variant}`}
                onClick={() => {
                  onClickSendMessage();
                  editor?.commands.clearContent();
                }}
              >
                Send
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className={cn("relative w-full")}>
        <label
          htmlFor="description"
          className={cn(
            "absolute transform text-base text-neutral-light-30 duration-300 dark:text-neutral-dark-30",
            "left-4 z-20 origin-[0] scale-75 peer-focus:start-0",
            isFocus || !!description ? "top-2" : "top-4.5"
          )}
        >
          {label}
        </label>
        <div
          className={cn(
            "_flexbox__row__start__start w-full gap-4 bg-neutral-light-90 dark:bg-neutral-dark-90",
            "rounded-md p-4",
            props.className
          )}
        >
          <div className="_flexbox__col__start__start w-full">
            <EditorContent
              editor={editor}
              className="peer flex h-44 w-full max-w-full overflow-auto whitespace-pre-line"
            />

            <Toolbar editor={editor} />
          </div>
          {withTooltip && !description ? (
            <Tooltip content="This is a tooltip">
              <Info className="h-6 w-6" />
            </Tooltip>
          ) : (
            <X
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                editor?.commands.clearContent();
                onClearInput();
              }}
            />
          )}
        </div>
      </div>
      <Typography
        variant="p"
        affects="tiny"
        className="txt-neutral-light-30 dark:text-neutral-dark-30"
      >
        Maximum 200 Characters
      </Typography>
    </div>
  );
};

export default Tiptap;
