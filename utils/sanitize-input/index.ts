import DOMPurify from "dompurify";

export const sanitize = (string: string) => DOMPurify.sanitize(string);
