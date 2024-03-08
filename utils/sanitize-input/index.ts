import DOMPurify from "isomorphic-dompurify";
export const sanitize = (string: string) => DOMPurify.sanitize(string);
