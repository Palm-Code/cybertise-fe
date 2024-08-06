export const fileDownload = async (fileUrl: string, filename: string) => {
  try {
    const response = await fetch(fileUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename; // Set the desired file name here
    document.body.appendChild(a);
    a.click();

    // Clean up and remove the temporary link
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("There was an error downloading the file:", error);
  }
};
