// production
export const URL = "https://backend.bookmysamay.com/api/";

export const trimString = (originalString, maxLength) => {
  let trimmedString = originalString;

  if (originalString.length > maxLength) {
    trimmedString = originalString.substring(0, maxLength).trim() + "...";
  }

  return trimmedString;
};
