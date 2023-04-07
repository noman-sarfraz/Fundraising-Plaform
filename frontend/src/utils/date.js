import format from "date-fns/format";

export const toNormalDate = (date) => {
  if(!date) {
    return null;
  }
  // console.log(date.slice(0, 10));
  return format(new Date(date.slice(0, 10)), "MMM dd, yyyy");
  // return 'Jan 21, 2023'
}