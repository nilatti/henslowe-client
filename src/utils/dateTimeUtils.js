import moment from "moment";

function calculateDuration(endTime, startTime) {
  return moment
    .duration(
      moment(endTime, "YYYY/MM/DD HH:mm").diff(
        moment(startTime, "YYYY/MM/DD HH:mm")
      )
    )
    .asMinutes();
}

//tktktk figure out how the hell to manage timezones correctly.
//save to database in UTC
//show to user/receive from user in browser local tz.
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

export function isAfterDate(startDate, current) {
  return current.isAfter(startDate);
}

export function isAfterTime(startTime, endTime) {
  return endTime.isAfter(startTime);
}

export {
  calculateDuration,
  formatDateForRails,
  formatDateTimeForRails,
  formatTimeForRails,
  getEndOfWeek,
  getStartOfWeek,
};
