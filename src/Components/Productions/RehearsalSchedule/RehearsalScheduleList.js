import moment from "moment";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";

import EditableRehearsal from "./EditableRehearsal";

import { useProductionState } from "../../../lib/productionState";
import { useQuery } from "../../../hooks/environmentUtils";
import { getEndOfWeek, getStartOfWeek } from "../../../utils/dateTimeUtils";
import RehearsalFormToggle from "./RehearsalFormToggle";
import RehearsalPatternCreatorToggle from "./RehearsalPatternCreatorToggle";
export default function RehearsalScheduleList() {
  let query = useQuery();
  const { hiredUsers, rehearsals, production } = useProductionState();
  const [thisWeekRehearsals, setThisWeekRehearsals] = useState([]);
  const [nextWeekRehearsals, setNextWeekRehearsals] = useState(false);
  const [lastWeekRehearsals, setLastWeekRehearsals] = useState(false);
  const [userRole, setUserRole] = useState();
  const [endTime, setEndTime] = useState(
    query.get("endTime") || getEndOfWeek(moment())
  );
  const [startTime, setStartTime] = useState(
    query.get("startTime") || getStartOfWeek(moment())
  );
  const [lastWeekStartTime, setLastWeekStartTime] = useState(
    moment(startTime).subtract(7, "d").format("YYYY-MM-DD")
  );
  const [lastWeekEndTime, setLastWeekEndTime] = useState(
    moment(endTime).subtract(7, "d").format("YYYY-MM-DD")
  );
  const [nextWeekStartTime, setNextWeekStartTime] = useState(
    moment(startTime).add(7, "d").format("YYYY-MM-DD")
  );
  const [nextWeekEndTime, setNextWeekEndTime] = useState(
    moment(endTime).add(7, "d").format("YYYY-MM-DD")
  );

  function getRehearsalsForTimeRange(rehearsals, endTime, startTime) {
    return rehearsals.filter(function (rehearsal) {
      if (
        rehearsal.start_time >= startTime &&
        rehearsal.start_time <= endTime
      ) {
        return rehearsal;
      }
    });
  }

  function updateDatesLast() {
    let lastWeekStart = moment(startTime)
      .subtract(14, "d")
      .format("YYYY-MM-DD");
    let lastWeekEnd = moment(endTime).subtract(14, "d").format("YYYY-MM-DD");
    setNextWeekEndTime(endTime);
    setNextWeekStartTime(startTime);
    setEndTime(lastWeekEndTime);
    setStartTime(lastWeekStartTime);
    setLastWeekEndTime(lastWeekEnd);
    setLastWeekStartTime(lastWeekStart);
  }

  function updateDatesNext() {
    let nextWeekStart = moment(startTime).add(14, "d").format("YYYY-MM-DD");
    let nextWeekEnd = moment(endTime).add(14, "d").format("YYYY-MM-DD");
    setLastWeekEndTime(endTime);
    setLastWeekStartTime(startTime);
    setEndTime(nextWeekEndTime);
    setStartTime(nextWeekStartTime);
    setNextWeekEndTime(nextWeekEnd);
    setNextWeekStartTime(nextWeekStart);
  }

  useEffect(() => {
    if (rehearsals) {
      let currentRehearsals = getRehearsalsForTimeRange(
        rehearsals,
        endTime,
        startTime
      );
      setThisWeekRehearsals(currentRehearsals);
    }
  }, [endTime, startTime, rehearsals]);

  useEffect(() => {
    let lastWeekRehearsalsBool = !!getRehearsalsForTimeRange(
      rehearsals,
      lastWeekEndTime,
      lastWeekStartTime
    ).length;
    setLastWeekRehearsals(lastWeekRehearsalsBool);
  }, [endTime, startTime, rehearsals]);

  useEffect(() => {
    let nextWeekRehearsalsBool = !!getRehearsalsForTimeRange(
      rehearsals,
      nextWeekEndTime,
      nextWeekStartTime
    ).length;
    setNextWeekRehearsals(nextWeekRehearsalsBool);
  }, [endTime, startTime, rehearsals]);

  let formattedRehearsals = thisWeekRehearsals?.map((rehearsal) => (
    <EditableRehearsal key={rehearsal.id} rehearsal={rehearsal} />
  ));
  return (
    <>
      {/* <ProductionAuthContext.Provider> */}
      <h2>Rehearsal Schedule</h2>
      <h3>
        {moment(startTime).format("MMM D, YYYY")}-
        {moment(endTime).format("MMM D, YYYY")}
      </h3>
      {lastWeekRehearsals && (
        <button onClick={updateDatesLast}>Last Week</button>
      )}
      {nextWeekRehearsals && (
        <button onClick={updateDatesNext}>Next Week</button>
      )}

      <Col>
        {/* {userRole === "admin" ? ( */}
        <RehearsalPatternCreatorToggle production={production} open={false} />
        {/* ) : (
          <span></span>
        )} */}
        {!!thisWeekRehearsals?.length ? (
          <div>{formattedRehearsals}</div>
        ) : (
          <div>Rehearsals not found</div>
        )}
        <RehearsalFormToggle
          isOpen={false}
          // onFormSubmit={this.handleRehearsalCreate}
          production={production}
        />
      </Col>
      {/* </ProductionAuthContext.Provider> */}
    </>
  );
}
