import _ from "lodash";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import EditableRehearsal from "./EditableRehearsal";
import RehearsalDayGroup from "./RehearsalDayGroup";
import RehearsalFormToggle from "./RehearsalFormToggle";
import RehearsalPatternCreatorToggle from "./RehearsalPatternCreatorToggle";
import { Button } from "../../Button";
import Modal from "../../Modal";
import { useProductionAuthState } from "../../Contexts";
import { Spinner } from "../../Loaders";
import { useQuery } from "../../../hooks/environmentUtils";
import { useProductionState } from "../../../lib/productionState";
import { getEndOfWeek, getStartOfWeek } from "../../../utils/dateTimeUtils";
import { useMeState } from "../../../lib/meState";
import {
  DATE_FORMAT,
  DATE_FORMAT_FOR_RAILS,
  DATE_FORMAT_WITH_MONTH_NAME,
  DATE_FORMAT_WITH_WEEKDAY,
  DEFAULT_TIMEZONE,
} from "../../../utils/hardcodedConstants";
const EditButtons = styled.div`
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-flow: row wrap;
  justify-content: center;
`;

const RehearsalScheduleListStyles = styled.div`
  h2 {
    span {
      font-size: 0.45em;
      cursor: pointer;
    }
  }
  div {
    text-align: center;
  }
`;

export default function RehearsalScheduleList() {
  let query = useQuery();
  const { me } = useMeState();
  let timezone = me.timezone.length > 0 ? me.timezone : DEFAULT_TIMEZONE;
  const { role } = useProductionAuthState();
  const { loading, rehearsals, production } = useProductionState();
  const [thisWeekRehearsals, setThisWeekRehearsals] = useState([]);
  const [nextWeekRehearsals, setNextWeekRehearsals] = useState(false);
  const [lastWeekRehearsals, setLastWeekRehearsals] = useState(false);
  const [addRehearsalsOpen, setAddRehearsalsOpen] = useState(false);
  const [endTime, setEndTime] = useState(
    query.get("endTime") || getEndOfWeek({ date: moment(), timezone: timezone })
  );
  const [startTime, setStartTime] = useState(
    query.get("startTime") ||
      getStartOfWeek({ date: moment(), timezone: timezone })
  );
  const [lastWeekStartTime, setLastWeekStartTime] = useState(
    moment(startTime).tz(timezone).subtract(7, "d").format("YYYY-MM-DD")
  );
  const [lastWeekEndTime, setLastWeekEndTime] = useState(
    moment(endTime).tz(timezone).subtract(7, "d").format("YYYY-MM-DD")
  );
  const [nextWeekStartTime, setNextWeekStartTime] = useState(
    moment(startTime).tz(timezone).add(7, "d").format("YYYY-MM-DD")
  );
  const [nextWeekEndTime, setNextWeekEndTime] = useState(
    moment(endTime).tz(timezone).add(7, "d").format("YYYY-MM-DD")
  );

  const rehearsalsList = useMemo(() => rehearsals);
  useEffect(() => {
    if (rehearsals) {
      let currentRehearsals = getRehearsalsForTimeRange(
        rehearsals,
        endTime,
        startTime
      );
      setThisWeekRehearsals(currentRehearsals);
    }
  }, [endTime, startTime, rehearsalsList]);

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

  function getRehearsalsForTimeRange(rehearsals, endTime, startTime) {
    return rehearsals.filter(function (rehearsal) {
      let rehearsalStartTime = moment(rehearsal.start_time).tz(timezone);
      let tzEndTime = moment(endTime).tz(timezone);
      let tzStartTime = moment(startTime).tz(timezone);

      if (
        rehearsalStartTime >= tzStartTime &&
        rehearsalStartTime <= tzEndTime
      ) {
        return rehearsal;
      }
    });
  }

  function toggleAddRehearsal() {
    setAddRehearsalsOpen(!addRehearsalsOpen);
  }

  function updateDatesLast() {
    let lastWeekStart = moment(startTime)
      .tz(timezone)
      .subtract(14, "d")
      .format(DATE_FORMAT_FOR_RAILS);
    let lastWeekEnd = moment(endTime)
      .tz(timezone)
      .subtract(14, "d")
      .format(DATE_FORMAT_FOR_RAILS);
    setNextWeekEndTime(endTime);
    setNextWeekStartTime(startTime);
    setEndTime(lastWeekEndTime);
    setStartTime(lastWeekStartTime);
    setLastWeekEndTime(lastWeekEnd);
    setLastWeekStartTime(lastWeekStart);
  }

  function updateDatesNext() {
    let nextWeekStart = moment(startTime)
      .tz(timezone)
      .add(14, "d")
      .format(DATE_FORMAT_FOR_RAILS);
    let nextWeekEnd = moment(endTime)
      .tz(timezone)
      .add(14, "d")
      .format(DATE_FORMAT_FOR_RAILS);
    setLastWeekEndTime(endTime);
    setLastWeekStartTime(startTime);
    setEndTime(nextWeekEndTime);
    setStartTime(nextWeekStartTime);
    setNextWeekEndTime(nextWeekEnd);
    setNextWeekStartTime(nextWeekStart);
  }

  let groupedRehearsals = _.groupBy(thisWeekRehearsals, "date");

  let formattedRehearsals = Object.keys(groupedRehearsals).map((group, i) => {
    return (
      <RehearsalDayGroup
        key={group}
        date={moment(group).format(DATE_FORMAT_WITH_WEEKDAY)}
      >
        {groupedRehearsals[group].map((rehearsal) => {
          return <EditableRehearsal key={rehearsal.id} rehearsal={rehearsal} />;
        })}
      </RehearsalDayGroup>
    );
  });

  if (loading) {
    return (
      <Modal>
        <h1>Loading!</h1>
        <Spinner />
      </Modal>
    );
  }

  return (
    <RehearsalScheduleListStyles>
      <h2>
        Rehearsal Schedule for{" "}
        <Link to={`/productions/${production.id}`}>
          {production.play.title}
        </Link>{" "}
        at{" "}
        <Link to={`/theaters/${production.theater.id}`}>
          {production.theater.name}
        </Link>
      </h2>
      {role == "admin" && (
        <div>
          <span
            className="right floated edit icon"
            onClick={toggleAddRehearsal}
          >
            <i className="fas fa-pencil-alt"></i> Edit rehearsal schedule
          </span>
        </div>
      )}
      <h3>
        {moment(startTime).format(DATE_FORMAT_WITH_MONTH_NAME)}-
        {moment(endTime).format(DATE_FORMAT_WITH_MONTH_NAME)}
      </h3>
      {role == "admin" && (
        <EditButtons show={addRehearsalsOpen}>
          <RehearsalPatternCreatorToggle
            production={production}
            isOpen={false}
          />
          <RehearsalFormToggle isOpen={false} production={production} />
        </EditButtons>
      )}
      <Button onClick={updateDatesLast}>Last Week</Button>
      <Button
        onClick={updateDatesNext}
        backgroundColor={"var(--color-med)"}
        borderColor={"var(--color-med)"}
        color={"var(--color-text-light)"}
      >
        Next Week
      </Button>
      <div>
        <hr />
        {!!thisWeekRehearsals?.length ? (
          <div>{formattedRehearsals}</div>
        ) : (
          <div>Rehearsals not found</div>
        )}
      </div>
    </RehearsalScheduleListStyles>
  );
}
