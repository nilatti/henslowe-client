import { useEffect, useState } from "react";
import styled from "styled-components";
import PeopleCheckboxes from "./People/PeopleCheckboxes";
import { Button } from "../../Button";
import { FancyCheckBox, FancyRadio, FancyCheckBoxLabel } from "../../Styled";
import { Form, FormGroup } from "../../Form";
import { useForm } from "../../../hooks/environmentUtils";
import { useProductionState } from "../../../lib/productionState";
import { StartEndDatePair, StartEndTimePair } from "../../Inputs";
import { DAYS_OF_WEEK } from "../../../utils/hardcodedConstants";
import {
  formatDateForRails,
  formatTimeForRails,
} from "../../../utils/dateTimeUtils";
import { useMeState } from "../../../lib/meState";

const Explainer = styled.div`
  font-style: italic;
  font-size: 0.85rem;
  text-align: left;
  width: 60%;
  margin: 0 auto;
`;

const RehearsalPatternCreatorStyles = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export default function RehearsalPatternCreator({ production, cancel }) {
  const { me } = useMeState();
  // const [validated, setValidated] = useState(false);
  const { createRehearsalSchedulePattern, hiredUsers } = useProductionState();
  const [defaultUsers, setDefaultUsers] = useState(hiredUsers);

  useEffect(() => {
    setDefaultUsers(
      defaultUsers.map((user) => {
        return { ...user, isCalled: false };
      })
    );
  }, []);

  function handleDateChange(data) {
    const e = { target: { ...data, type: "date" } };
    handleChange(e);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let calledUsers = defaultUsers.filter((user) => user.isCalled);
    let formattedEndDate = formatDateForRails({
      date: inputs.end_date,
      timezone: me.timezone,
    });
    let formattedEndTime = formatTimeForRails(inputs.end_time);
    console.log("START DATE", inputs.start_date);
    let formattedStartDate = formatDateForRails({
      date: inputs.start_date,
      timezone: me.timezone,
    });
    let formattedStartTime = formatTimeForRails(inputs.start_time);
    let rehearsalSchedulePattern = {
      id: production.id,
      rehearsal_schedule_pattern: {
        block_length: inputs.blockLength,
        break_length: inputs.breakLength,
        days_of_week: inputs.daysOfWeek,
        default_user_ids: calledUsers.map((user) => user.id),
        end_date: formattedEndDate,
        end_time: formattedEndTime,
        time_between_breaks: inputs.timeBetweenBreaks,
        start_date: formattedStartDate,
        start_time: formattedStartTime,
      },
    };
    cancel(); //closes form
    createRehearsalSchedulePattern(production.id, rehearsalSchedulePattern);
  }

  function updateCheckedContent(e) {
    const targetId = Number(e.target.id);
    setDefaultUsers(
      defaultUsers.map((item) =>
        item.id === targetId ? { ...item, isCalled: !item.isCalled } : item
      )
    );
  }

  const { inputs, handleChange } = useForm({
    breakLength: "",
    blockLength: "",
    timeBetweenBreaks: "",
    daysOfWeek: [],
    end_date: "",
    end_time: "",
    notes: "",
    start_date: "",
    start_time: "",
    title: "",
  });

  let weekDays = DAYS_OF_WEEK.map((day) => {
    return (
      <div key={day}>
        <FancyCheckBox htmlFor={day}>
          <FancyRadio
            type="checkbox"
            id={`${day}`}
            onChange={handleChange}
            name="daysOfWeek"
            value={day}
          />
          <FancyCheckBoxLabel>{day}</FancyCheckBoxLabel>
        </FancyCheckBox>
      </div>
    );
  });

  return (
    <RehearsalPatternCreatorStyles>
      <h2>Rehearsal Pattern Creator</h2>
      <Explainer>
        <p>
          Rehearsal patterns are just patterns that feed into our rehearsal
          generator. If you have multiple rehearsal patterns, you will need to
          run this generator a few times.
        </p>
        <p>
          For example: A production begins rehearsal on 3/1/2020. Tech week
          begins 4/5/2020. The show opens on 4/10/2020. During normal weeks, the
          company rehearses Sundays from 5:30-9:30, and Monday through Thursday
          6:30-10:30. During tech week, the company rehearses every day from
          4-11.
        </p>
        <p>
          The stage manager would need to make the following different rehearsal
          patterns (doing this form three times):
        </p>
        <ul>
          <li>3/1/2020 to 4/4/2020, Sunday, 5:30-9:30</li>
          <li>
            3/1/2020 to 4/4/2020, Monday, Tuesday, Wednesday, Thursday,
            6:30-10:30
          </li>
          <li>
            4/5/2020-4/10/2020, Sunday, Monday, Tuesday, Wednesday, Thursday,
            Friday, Saturday, 4-11
          </li>
        </ul>
        <strong>
          Please note that it can take a while for our servers to build a
          rehearsal schedule. After you hit "Submit," come back in about 5
          minutes and refresh this page.
        </strong>
      </Explainer>
      <Form onSubmit={handleSubmit} width="85%">
        <label>Rehearsal start and end dates:</label>
        <StartEndDatePair
          endTime={inputs.end_date}
          startTime={inputs.start_date}
          handleChange={handleDateChange}
        />
        <FormGroup>
          <label>We rehearse every</label>
          {weekDays}
        </FormGroup>
        <StartEndTimePair
          endTime={inputs.end_time}
          start_time={inputs.start_time}
          handleChange={handleChange}
        />
        <FormGroup>
          <label>Time rehearsing per block</label>
          <input
            name="timeBetweenBreaks"
            placeholder="length work time between blocks"
            onChange={handleChange}
            value={inputs.timeBetweenBreaks}
          />
        </FormGroup>
        <FormGroup>
          <label>Length of breaks</label>
          <input
            name="breakLength"
            placeholder="length of breaks"
            onChange={handleChange}
            value={inputs.breakLength}
          />
        </FormGroup>
        <FormGroup>
          <label>Total length of block (break + rehearsal)</label>
          <input
            disabled
            name="blockLength"
            placeholder="length of rehearsal blocks"
            onChange={handleChange}
            value={
              parseInt(inputs.timeBetweenBreaks) +
                parseInt(inputs.breakLength) || 0
            }
          />
        </FormGroup>
        <p>
          Is there anyone who should automatically be called to rehearsals, like
          a director or stage manager?
        </p>
        <PeopleCheckboxes
          onChange={updateCheckedContent}
          users={defaultUsers}
        />
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={() => cancel(false)} block>
          Cancel
        </Button>
      </Form>
      <hr />
    </RehearsalPatternCreatorStyles>
  );
}
