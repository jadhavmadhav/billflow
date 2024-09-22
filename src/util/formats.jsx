import moment from "moment";

export const DateFormatter = (date) => {
  // Format the date as needed

  return moment(date).format("DD MMM YYYY");
};
