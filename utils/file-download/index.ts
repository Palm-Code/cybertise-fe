export const fileDownload = (url: string, fileName: string) => {
  //downloaad file from url
  const link = document.createElement("a");
  link.href = url;
  link.download = url.substring(url.lastIndexOf("/") + 1);
  link.setAttribute(
    "download",
    fileName || url.substring(url.lastIndexOf("/") + 1)
  );
  link.click();
};
