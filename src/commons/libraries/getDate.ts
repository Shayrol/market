export const getDate = (date: string): string => {
  const _date = new Date(date);
  const yyyy = _date.getFullYear();
  const mm = ("0" + String(_date.getMonth() + 1)).slice(-2);
  const dd = ("0" + String(_date.getDate())).slice(-2);
  const HH = ("0" + String(_date.getHours())).slice(-2);
  const MM = ("0" + String(_date.getMinutes())).slice(-2);
  const SS = ("0" + String(_date.getSeconds())).slice(-2);
  return `${yyyy}-${mm}-${dd} ${HH}:${MM}`;
};
