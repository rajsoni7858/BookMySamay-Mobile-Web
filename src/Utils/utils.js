// production
export const URL = "https://admin.bookmysamay.com/api/";

export const trimString = (originalString, maxLength) => {
  let trimmedString = originalString;

  if (originalString.length > maxLength) {
    trimmedString = originalString.substring(0, maxLength).trim() + "...";
  }

  return trimmedString;
};

export function convertToTitleCase(str) {
  const withSpaces = str.replace(/-/g, " ");
  return withSpaces.replace(/\b\w/g, (char) => char.toUpperCase());
}
