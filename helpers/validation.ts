// Accepts both full ISO 8601 (YYYY-MM-DDTHH:MM:SSZ) and date-only (YYYY-MM-DD) formats
export const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}(T\d{2}:\d{2}:\d{2}Z)?$/;

export const isValidISODate = (dateString: string): boolean => {
  if (!ISO_8601_REGEX.test(dateString)) return false;

  const fullISOString = dateString.includes("T")
    ? dateString
    : `${dateString}T00:00:00Z`;

  const date = new Date(fullISOString);

  return date instanceof Date && !isNaN(date.getTime());
};
