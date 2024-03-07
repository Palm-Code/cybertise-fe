export function formatDateToAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

  if (diffHours < 24) {
    return `${diffHours}h`;
  } else {
    return `${diffDays}d`;
  }
}

export function formatDateToAgo2(dateString: string): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  const currentDate = new Date();
  const differenceInDays = Math.floor(
    (currentDate.getTime() - date.getTime()) / (1000 * 3600 * 24)
  );
  let daysAgo = "";

  if (differenceInDays === 0) {
    daysAgo = "today";
  } else if (differenceInDays === 1) {
    daysAgo = "yesterday";
  } else if (
    differenceInDays < 31 &&
    currentDate.getMonth() === date.getMonth() &&
    currentDate.getFullYear() === date.getFullYear()
  ) {
    daysAgo = `${differenceInDays} day${differenceInDays > 1 ? "s" : ""} ago`;
  } else if (currentDate.getFullYear() === date.getFullYear()) {
    const options: Intl.DateTimeFormatOptions = {
      month: "long",
      day: "numeric",
    };
    daysAgo = date.toLocaleDateString("en-US", options);
  } else {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    daysAgo = date.toLocaleDateString("en-US", options);
  }

  return `${formattedDate} (${daysAgo})`;
}
