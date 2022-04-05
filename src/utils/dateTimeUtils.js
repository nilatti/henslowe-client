import moment from "moment";
import {
  DATE_FORMAT_FOR_RAILS,
  DATE_TIME_FORMAT_FOR_RAILS,
  DEFAULT_TIMEZONE,
} from "./hardcodedConstants";
function calculateDuration(endTime, startTime) {
  return moment
    .duration(
      moment(endTime, DATE_TIME_FORMAT_FOR_RAILS).diff(
        moment(startTime, DATE_TIME_FORMAT_FOR_RAILS)
      )
    )
    .asMinutes();
}

function formatDateForRails({ date }) {
  return moment(date).format(DATE_FORMAT_FOR_RAILS);
}
function formatDateTimeForRails({ datetime }) {
  console.log(datetime);
  return moment(datetime).format(DATE_TIME_FORMAT_FOR_RAILS);
}
function formatTimeForRails(time) {
  return moment(time).format(DATE_TIME_FORMAT_FOR_RAILS);
}
function getStartOfWeek({ date, timezone }) {
  let momentDate = moment(date).tz(timezone || DEFAULT_TIMEZONE);
  return momentDate.startOf("week").format();
}

function getEndOfWeek({ date, timezone }) {
  let momentDate = moment(date).tz(timezone || DEFAULT_TIMEZONE);
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
