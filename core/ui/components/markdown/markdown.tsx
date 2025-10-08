import React from "react";
import hljs from "highlight.js/lib/common";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/atom-one-dark.css";
import { sanitize } from "@/utils/sanitize-input";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("css", css);
hljs.registerLanguage("html", html);
hljs.registerLanguage("typescriptreact", typescript);
hljs.registerLanguage("typescript", typescript);

const highlightCodeblocks = (content: string) => {
  const doc = new DOMParser().parseFromString(content, "text/html");
  doc.querySelectorAll("pre code").forEach((el: any) => {
    hljs.highlightElement(el);
  });
  return new XMLSerializer().serializeToString(doc);
};

export const Markdown = ({ content }: { content: string }) => {
  return (
    <div
      className="prose dark:prose-invert"
      dangerouslySetInnerHTML={{
        __html: sanitize(highlightCodeblocks(content)),
      }}
    />
  );
};
