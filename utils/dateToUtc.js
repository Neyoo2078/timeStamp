export function dateToUTCKey(dateString) {
  const date = new Date(dateString);
  const utcKey = date.toUTCString();
  const unixTimestamp = date.getTime();
  return { utcKey, unixTimestamp };
}
