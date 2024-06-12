export function formatDateToAgo(dateString: string): string {
  const date = new Date(dateString + "Z");
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  const now = new Date();
  const localNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

  const diffTime = Math.abs(localNow.getTime() - utcDate.getTime());
  const diffSeconds = Math.ceil(diffTime / 1000);
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));

  if (diffSeconds < 60) {
    return `${diffSeconds}s`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes}m`;
  } else if (diffHours < 24) {
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
  const date = new Date(
    dateString.includes("Z") ? dateString : dateString + "Z"
  );
  const utcDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  const now = new Date();
  const localNow = new Date(now.getTime() + now.getTimezoneOffset() * 60000);

  const diffTime = Math.abs(localNow.getTime() - utcDate.getTime());
  const diffSeconds = Math.ceil(diffTime / 1000);
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
  const diffYears = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 365));

  if (diffSeconds < 60) {
    return `${diffSeconds} second${diffSeconds > 1 ? "s" : ""} ago`;
  } else if (diffMinutes < 60) {
    return `${diffMinutes} minute${diffMinutes > 1 ? "s" : ""} ago`;
  } else if (diffHours < 24) {
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

export function getCurrentTime() {
  const now = new Date();
  const hours = now.getUTCHours().toString().padStart(2, "0");
  const minutes = now.getUTCMinutes().toString().padStart(2, "0");
  return hours + ":" + minutes;
}
export function getCurrentDate(date?: Date) {
  const dateNow = date ?? new Date();
  const year = dateNow.getUTCFullYear();
  const month = (dateNow.getUTCMonth() + 1).toString().padStart(2, "0");
  const day = dateNow.getUTCDate().toString().padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}

export function formatToUtcTimeString(time: string): string {
  const hours = parseInt(time.slice(0, 2), 10);
  const minutes = parseInt(time.slice(3), 10);
  const now = new Date();

  const targetTime = new Date(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    hours,
    minutes
  );

  const formattedTime = targetTime.toUTCString().slice(17, 22);
  return formattedTime;
}
export function formatTime(dateString: string) {
  const parts = dateString.split("T");
  const timePart = parts[1];
  const [hours, minutes] = timePart.split(":");
  const formattedTime = `${hours}:${minutes}`;

  return formattedTime;
}
