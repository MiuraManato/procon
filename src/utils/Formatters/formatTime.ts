export const formatTime = (isoDatetimeStr: string): string => {
  const datetimeObj = new Date(isoDatetimeStr);
  const hours = datetimeObj.getHours().toString().padStart(2, "0");
  const minutes = datetimeObj.getMinutes().toString().padStart(2, "0");
  return `${hours}時${minutes}分`;
};
