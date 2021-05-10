import moment from "moment";

function formatDateForRails(date) {
  return moment(date).format("YYYY-MM-DD");
}
function formatDateTimeForRails(datetime) {
  return moment(datetime).format("YYYY-MM-DD hh:mm:ss");
}
function formatTimeForRails(time) {
  return moment(time).format("YYYY-MM-DD hh:mm:ss");
}
function getStartOfWeek(date) {
  let momentDate = moment(date);
  return momentDate.startOf("week").format();
}

function getEndOfWeek(date) {
  let momentDate = moment(date);
  return momentDate.endOf("week").format();
}

export {
  formatDateForRails,
  formatDateTimeForRails,
  formatTimeForRails,
  getEndOfWeek,
  getStartOfWeek,
};
