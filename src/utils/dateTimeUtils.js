import moment from "moment";

function getStartOfWeek(date) {
  let momentDate = moment(date);
  return momentDate.startOf("week").format();
}

function getEndOfWeek(date) {
  let momentDate = moment(date);
  return momentDate.endOf("week").format();
}

export { getEndOfWeek, getStartOfWeek };
