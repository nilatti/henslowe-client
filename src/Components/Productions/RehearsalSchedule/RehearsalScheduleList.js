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
import { Spinner } from "../../Loaders";
import { useQuery } from "../../../hooks/environmentUtils";
import { useProductionState } from "../../../lib/productionState";
import { getEndOfWeek, getStartOfWeek } from "../../../utils/dateTimeUtils";

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
  const { loading, rehearsals, production } = useProductionState();
  const [thisWeekRehearsals, setThisWeekRehearsals] = useState([]);
  const [nextWeekRehearsals, setNextWeekRehearsals] = useState(false);
  const [lastWeekRehearsals, setLastWeekRehearsals] = useState(false);
  const [addRehearsalsOpen, setAddRehearsalsOpen] = useState(false);
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
      if (
        rehearsal.start_time >= startTime &&
        rehearsal.start_time <= endTime
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

  let groupedRehearsals = _.groupBy(thisWeekRehearsals, "date");

  let formattedRehearsals = Object.keys(groupedRehearsals).map((group, i) => {
    return (
      <RehearsalDayGroup
        key={group}
        date={moment(group).format("dddd, MMMM D")}
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
      <div>
        <span className="right floated edit icon" onClick={toggleAddRehearsal}>
          <i className="fas fa-pencil-alt"></i> Edit rehearsal schedule
        </span>
      </div>
      <h3>
        {moment(startTime).format("MMM D, YYYY")}-
        {moment(endTime).format("MMM D, YYYY")}
      </h3>
      <div>
        //tktktk add role here--not everyone should be able to edit or add
        rehearsals
      </div>
      <EditButtons show={addRehearsalsOpen}>
        <RehearsalPatternCreatorToggle production={production} isOpen={false} />
        <RehearsalFormToggle isOpen={false} production={production} />
      </EditButtons>
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
