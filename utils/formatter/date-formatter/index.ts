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
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const currentDate = new Date();
  const targetDate = new Date(timestamp);

  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const targetDay = targetDate.getDate();
  const targetMonth = targetDate.getMonth();
  const targetYear = targetDate.getFullYear();

  if (
    currentDay === targetDay &&
    currentMonth === targetMonth &&
    currentYear === targetYear
  ) {
    // Today
    const hours = ("0" + (targetDate.getHours() % 12 || 12)).slice(-2);
    const minutes = ("0" + targetDate.getMinutes()).slice(-2);
    const ampm = targetDate.getHours() >= 12 ? "PM" : "AM";
    return `Today at ${hours}:${minutes} ${ampm}`;
  } else if (
    currentDay - 1 === targetDay &&
    currentMonth === targetMonth &&
    currentYear === targetYear
  ) {
    // Yesterday
    const hours = ("0" + (targetDate.getHours() % 12 || 12)).slice(-2);
    const minutes = ("0" + targetDate.getMinutes()).slice(-2);
    const ampm = targetDate.getHours() >= 12 ? "PM" : "AM";
    return `Yesterday at ${hours}:${minutes} ${ampm}`;
  } else {
    // Other dates
    const dayOfWeek = daysOfWeek[targetDate.getDay()];
    const day = targetDate.getDate();
    const month = months[targetDate.getMonth()];
    const year = targetDate.getFullYear();
    const hours = ("0" + (targetDate.getHours() % 12 || 12)).slice(-2);
    const minutes = ("0" + targetDate.getMinutes()).slice(-2);
    const ampm = targetDate.getHours() >= 12 ? "PM" : "AM";
    return `${dayOfWeek} ${month} ${day}, ${year} at ${hours}:${minutes} ${ampm}`;
  }
}
