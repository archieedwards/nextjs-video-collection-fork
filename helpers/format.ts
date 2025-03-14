export const DEFAULT_LOCALE = "en-GB";

export const formatDate = (date: string, locale: string = DEFAULT_LOCALE) => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Date(date).toLocaleDateString(locale, options);
};

export const formatDuration = (duration: number) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const padNumber = (num: number) => num.toString().padStart(2, "0");
  const parts = [];

  if (hours > 0) {
    parts.push(padNumber(hours));
  }
  if (minutes > 0) {
    parts.push(padNumber(minutes));
  }
  parts.push(padNumber(seconds));

  return parts.join(":");
};

export const formatViews = (views: number) => {
  if (views < 1000) {
    return views.toString();
  }

  const units = ["", "K", "M", "B"];
  const exp = Math.min(Math.floor(Math.log10(views) / 3), units.length - 1);
  const value = views / Math.pow(1000, exp);

  const formatted =
    value < 10 ? value.toFixed(1) : Math.round(value).toString();

  return `${formatted.replace(/\.0$/, "")}${units[exp]}`;
};
