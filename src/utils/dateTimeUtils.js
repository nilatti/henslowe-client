import moment from "moment";
import "moment-timezone";
import {
  DATE_FORMAT,
  DATE_FORMAT_FOR_RAILS,
  DATE_TIME_FORMAT,
  DATE_TIME_FORMAT_FOR_RAILS,
  DEFAULT_TIMEZONE,
  TIME_FORMAT,
} from "./hardcodedConstants.js";
function calculateDuration(endTime, startTime) {
  return moment
    .duration(
      moment(endTime, DATE_TIME_FORMAT_FOR_RAILS).diff(
        moment(startTime, DATE_TIME_FORMAT_FOR_RAILS)
      )
    )
    .asMinutes();
}

function DisplayDate({ date, timezone }) {
  return (
    <>
      {moment(date)
        .tz(timezone || DEFAULT_TIMEZONE)
        .format(DATE_FORMAT)}
    </>
  );
}

function DisplayDateRange({ end_date, start_date, timezone }) {
  return (
    <>
      {moment(start_date)
        .tz(timezone || DEFAULT_TIMEZONE)
        .format(DATE_FORMAT)}{" "}
      -{" "}
      {moment(end_date)
        .tz(timezone || DEFAULT_TIMEZONE)
        .format(DATE_FORMAT)}
    </>
  );
}

function DisplayDateTime({ datetime, timezone }) {
  return (
    <>
      {moment(datetime)
        .tz(timezone || DEFAULT_TIMEZONE)
        .format(DATE_TIME_FORMAT)}
    </>
  );
}

function DisplayDateTimeRange({ end_datetime, start_datetime, timezone }) {
  return (
    <>
      {moment(start_datetime)
        .tz(timezone || DEFAULT_TIMEZONE)
        .format(DATE_TIME_FORMAT)}{" "}
      -{" "}
      {moment(end_datetime)
        .tz(timezone || DEFAULT_TIMEZONE)
        .format(DATE_TIME_FORMAT)}
    </>
  );
}

function DisplayTime({ time, timezone }) {
  return (
    <>
      {moment(time)
        .tz(timezone || DEFAULT_TIMEZONE)
        .format(TIME_FORMAT)}
    </>
  );
}

function DisplayTimeRange({ end_time, start_time, timezone }) {
  <>
    {moment(start_time)
      .tz(timezone || DEFAULT_TIMEZONE)
      .format(TIME_FORMAT)}{" "}
    -{" "}
    {moment(end_time)
      .tz(timezone || DEFAULT_TIMEZONE)
      .format(TIME_FORMAT)}
  </>;
}

function formatDateForRails({ date }) {
  return moment(date).format(DATE_FORMAT_FOR_RAILS);
}
function formatDateTimeForRails({ datetime }) {
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
  DisplayDate,
  DisplayDateRange,
  DisplayDateTime,
  DisplayDateTimeRange,
  DisplayTime,
  DisplayTimeRange,
  formatDateForRails,
  formatDateTimeForRails,
  formatTimeForRails,
  getEndOfWeek,
  getStartOfWeek,
};
