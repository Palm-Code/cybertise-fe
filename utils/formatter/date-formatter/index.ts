export function formatDateToAgo(dateString: string): string {
  const date = new Date(dateString);
  //format date to En Us
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));

  if (diffHours < 24) {
    return `${diffHours}h`;
  } else if (diffDays < 30) {
    return `${diffDays}d`;
  } else if (diffMonths < 12) {
    return `${diffMonths}m`;
  } else {
    return `${diffYears}y`;
  }
}

export function formatDateToAgo2(dateString: string): string {
  const date = new Date(dateString);
  //format date to En Us
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));

  if (diffHours < 24) {
    return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  } else if (diffDays < 30) {
    return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  } else if (diffMonths < 12) {
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  } else {
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  }
}

export function formatTimestamp(timestamp: string): string {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const date = new Date(timestamp);
  const dayOfWeek = daysOfWeek[date.getDay()];
  const day = ("0" + date.getDate()).slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const hours = ("0" + (date.getHours() % 12 || 12)).slice(-2);
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const ampm = date.getHours() >= 12 ? "PM" : "AM";

  // Construct the formatted timestamp string
  const formattedTimestamp = `${dayOfWeek} ${day} ${month} ${hours}:${minutes} ${ampm}`;

  return formattedTimestamp;
}
