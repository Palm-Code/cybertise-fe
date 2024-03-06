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
import { Info, X } from "lucide-react";
import Typography from "../typography/typography";

const lowlight = createLowlight(common);
lowlight.register({ html });
lowlight.register({ javascript });
lowlight.register({ css });
lowlight.register({ typescript });

interface I_TiptapProps {
  description: string;
  onChange: (value: string) => void;
  label?: string;
  withTooltip?: boolean;
  onClearInput?: () => void;
}

const Tiptap = ({
  description,
  onChange,
  label,
  withTooltip,
  onClearInput = () => {},
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
          "w-full peer appearance-none max-w-none overflow-auto whitespace-pre-line",
          "flex flex-col justify-start h-44 pt-4",
          "bg-neutral-light-90 dark:bg-neutral-dark-90 outline-none"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onFocus: () => {
      setIsFocused(true);
    },
    onBlur: () => {
      setIsFocused(false);
    },
  });

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
            "rounded-md p-4"
          )}
        >
          <div className="_flexbox__col__start__start w-full">
            <EditorContent
              editor={editor}
              className="peer flex w-full max-w-full overflow-auto whitespace-pre-line"
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
