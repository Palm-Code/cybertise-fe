import { type Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Link,
  List,
  ListOrdered,
  Paperclip,
  Strikethrough,
  TerminalSquare,
  TextQuote,
  Underline,
} from "lucide-react";
import { Toggle } from "../toggle/toggle";
import Separator from "../separator/separator";
import { cn } from "@/core/lib/utils";
import { useCallback } from "react";

interface I_ToolbarProps {
  editor: Editor | null;
}

const Toolbar = ({ editor }: I_ToolbarProps) => {
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);
  if (!editor) return null;
  return (
    <div
      className={cn(
        "grid h-fit w-full max-w-full grid-flow-col",
        "place-content-start content-start gap-3 rounded-b-xl",
        "bg-neutral-light-90 dark:bg-neutral-dark-90"
      )}
    >
      {/* <Toggle
        size="sm"
        pressed={editor.isActive("document")}
        onPressedChange={() =>
          editor.chain().focus().toggleNode("pdf", "document").run()
        }
      >
        <Paperclip />
      </Toggle> */}
      <Toggle
        size="sm"
        pressed={editor.isActive("link")}
        onPressedChange={setLink}
      >
        <Link />
      </Toggle>
      <Separator
        orientation="vertical"
        className="space-x-1 !bg-neutral-dark-100 dark:!bg-white"
      />
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough />
      </Toggle>
      <Separator
        orientation="vertical"
        className="space-x-1 !bg-neutral-dark-100 dark:!bg-white"
      />
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <TextQuote />
      </Toggle>
      <Separator
        orientation="vertical"
        className="space-x-1 !bg-neutral-dark-100 dark:!bg-white"
      />
      <Toggle
        size="sm"
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <TerminalSquare />
      </Toggle>
    </div>
  );
};
export default Toolbar;
