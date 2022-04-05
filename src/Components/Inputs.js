import parse from "html-react-parser";
import Datetime from "react-datetime";
import moment from "moment";
import { Button } from "./Button";

import { Form, FormGroupInline } from "./Form";
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  DATE_TIME_FORMAT_FOR_RAILS,
  DEFAULT_TIMEZONE,
  TIME_FORMAT,
  US_STATES_ARRAY,
} from "../utils/hardcodedConstants";
import { formatPhoneNumber } from "../utils/stringUtils";
//Input = just the input
//as form = input wrapped in a form
//with toggle = form with a toggle switch
import {
  formatDateTimeForRails,
  isAfterDate,
  isAfterTime,
} from "../utils/dateTimeUtils";

let valid = function (current, startTime) {
  return current.isSame(startTime, "day") || current.isAfter(startTime);
};

function handleDateTimeChange({ time, name, handleChange, timezone }) {
  console.log("timezone", timezone);
  console.log(time);
  let event = {
    target: {
      value: time,
      name: name,
      type: "datetime",
    },
  };
  handleChange(event);
}

function AddressInput({
  city,
  handleChange,
  label,
  state,
  street_address,
  zip,
}) {
  const states = US_STATES_ARRAY.map((us_state) => (
    <option key={us_state.abbr} value={us_state.abbr}>
      {us_state.name}
    </option>
  ));
  return (
    <>
      <h3>{label || "Address"}</h3>
      <FormGroupInline>
        <label>Street Address</label>
        <input
          type="text"
          placeholder="street address"
          name="street_address"
          value={street_address}
          onChange={handleChange}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>City</label>
        <input
          type="text"
          placeholder="city"
          name="city"
          value={city}
          onChange={handleChange}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>State</label>
        <select name="state" onChange={handleChange} value={state}>
          {states}
        </select>
      </FormGroupInline>
      <FormGroupInline>
        <label>Zip Code</label>
        <input
          type="number"
          placeholder="zip"
          name="zip"
          value={zip}
          onChange={handleChange}
        />{" "}
      </FormGroupInline>
    </>
  );
}

function AddressInputWithToggle({
  city,
  formOpen,
  handleChange,
  handleFormClose,
  handleSubmit,
  toggleForm,
  toggleText,
  state,
  street_address,
  zip,
}) {
  if (formOpen) {
    return (
      <Form noValidate onSubmit={(e) => handleSubmit(e)} width="85%">
        <AddressInput
          city={city}
          handleChange={handleChange}
          state={state}
          street_address={street_address}
          zip={zip}
        />
        <FormButtonGroup cancelFunction={handleFormClose} />
      </Form>
    );
  } else if (street_address || city || state || zip) {
    return (
      <div onDoubleClick={toggleForm}>
        {street_address && (
          <span>
            {street_address}
            <br />
          </span>
        )}
        {city && <span>{city}, </span>}
        {state && <span>{state} </span>}
        {zip && <span>{zip}</span>}
      </div>
    );
  } else {
    return <div onDoubleClick={toggleForm}>{toggleText}</div>;
  }
}

function FormButtonGroup({ cancelLabel, submitLabel, cancelFunction }) {
  return (
    <>
      <Button type="submit">{submitLabel || "Submit"}</Button>
      <Button type="button" onClick={cancelFunction} block>
        {cancelLabel || "Cancel"}
      </Button>
    </>
  );
}

function NumberInput({
  handleChange,
  handleFormClose,
  handleSubmit,
  label,
  name,
  value,
}) {
  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)} width="85%">
      <FormGroupInline>
        <label htmlFor={name}>{label}</label>
        <input
          type="number"
          id={name}
          name={name}
          onChange={handleChange}
          value={value}
        />
      </FormGroupInline>
      <FormButtonGroup cancelFunction={handleFormClose} />
    </Form>
  );
}

function NumberRange({
  endLabel,
  endName,
  endValue,
  handleChange,
  startLabel,
  startName,
  startValue,
}) {
  return (
    <>
      <FormGroupInline>
        <label htmlFor={startName}>{startLabel}:</label>
        <input
          id={startName}
          type="number"
          name={startName}
          onChange={handleChange}
          value={startValue}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label htmlFor={endName}>{endLabel}:</label>
        <input
          id={endName}
          type="number"
          name={endName}
          onChange={handleChange}
          value={endValue}
        />
      </FormGroupInline>
    </>
  );
}

function NumberRangeAsForm({
  endLabel,
  endName,
  endValue,
  handleChange,
  handleFormClose,
  handleSubmit,
  startLabel,
  startName,
  startValue,
}) {
  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)} width="85%">
      <NumberRange
        endLabel={endLabel}
        endName={endName}
        endValue={endValue}
        handleChange={handleChange}
        startLabel={startLabel}
        startName={startName}
        startValue={startValue}
      />
      <FormButtonGroup cancelFunction={handleFormClose} />
    </Form>
  );
}
function NumberRangeWithToggle({
  endLabel,
  endName,
  endValue,
  formOpen,
  handleChange,
  handleFormClose,
  handleSubmit,
  label,
  toggleForm,
  toggleText,
  startLabel,
  startName,
  startValue,
}) {
  return (
    <>
      {!!startValue > 0 && !formOpen && (
        <div onDoubleClick={toggleForm}>
          {label} {startValue} - {endValue}
        </div>
      )}
      {!startValue > 0 && !formOpen && (
        <div onDoubleClick={toggleForm}>{toggleText}</div>
      )}

      {formOpen && (
        <NumberRangeAsForm
          endLabel={endLabel}
          endName={endName}
          endValue={endValue}
          handleChange={handleChange}
          handleFormClose={handleFormClose}
          handleSubmit={handleSubmit}
          startLabel={startLabel}
          startName={startName}
          startValue={startValue}
        />
      )}
    </>
  );
}

export function StartEndDatePair({
  endDate,
  endLabel,
  endName,
  handleChange,
  startDate,
  startLabel,
  startName,
  timezone,
}) {
  // // const [tempStartDate, setTempStartDate] = useState(startDate);
  // function handleStartDateChange(date, startName, handleChange) {
  //   //this is a hacky workaround that keeps the end time after the start time.
  //   setTempStartDate(date);
  //   handleDateTimeChange({
  //     date: date,
  //     name: startName,
  //     handleChange: handleChange,
  //   });
  // }

  endName = endName || "end_date";
  startName = startName || "start_date";
  return (
    <>
      <label>{startLabel || "From"}</label>
      <Datetime
        dateFormat={DATE_FORMAT}
        name={startName || "startDate"}
        onChange={(date) =>
          // handleStartDateChange(date, startName, handleChange)
          handleDateTimeChange({
            date: date,
            name: startName,
            handleChange: handleChange,
            timezone: timezone,
          })
        }
        required
        timeFormat={false}
        value={startDate}
      />
      <label>{endLabel || "To"}</label>
      <Datetime
        name={endName || "endDate"}
        format={DATE_FORMAT}
        // isValidDate={(current) => isAfterDate(tempStartDate, current)}
        onChange={(date) =>
          handleDateTimeChange({
            date: date,
            name: endName,
            handleChange: handleChange,
            timezone: timezone,
          })
        }
        required
        timeFormat={false}
        value={endDate || ""}
      />
    </>
  );
}

export function StartEndTimePair({ endTime, handleChange, startTime }) {
  return (
    <>
      <label>Starting at...</label>
      <Datetime
        dateFormat={false}
        format={TIME_FORMAT}
        onChange={(time) =>
          handleDateTimeChange({ time, name: "start_time", handleChange })
        }
        required
        value={startTime}
      />
      <label>and ending at...</label>
      <Datetime
        dateFormat={false}
        format={TIME_FORMAT}
        onChange={(time) =>
          handleDateTimeChange({ time, name: "end_time", handleChange })
        }
        required
        value={endTime}
      />
    </>
  );
}

export function StartEndDateTimePair({
  endTime,
  handleChange,
  startTime,
  timezone,
}) {
  return (
    <>
      <label>Start Time</label>
      <Datetime
        type="datetime"
        onChange={(time) =>
          handleDateTimeChange({
            time: time,
            name: "start_time",
            handleChange: handleChange,
            timezone: timezone,
          })
        }
        dateFormat={DATE_FORMAT}
        displayTimeZone={timezone || DEFAULT_TIMEZONE}
        timeFormat={TIME_FORMAT}
        name="start_time"
        value={startTime}
      />
      <label>End Time</label>
      <Datetime
        name="end_time"
        onChange={(time) =>
          handleDateTimeChange({
            time: time,
            name: "end_time",
            handleChange: handleChange,
            timezone: timezone,
          })
        }
        displayTimeZone={timezone || DEFAULT_TIMEZONE}
        type="datetime"
        value={endTime}
        // isValidDate={(current) => valid(current, startTime)}
      />
    </>
  );
}

function StartEndDatePairAsForm({
  endDate,
  endLabel,
  endName,
  handleChange,
  handleFormClose,
  handleSubmit,
  startDate,
  startLabel,
  startName,
}) {
  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)} width="85%">
      <StartEndDatePair
        endDate={endDate}
        endLabel={endLabel}
        endName={endName}
        handleChange={handleChange}
        startDate={startDate}
        startLabel={startLabel}
        startName={startName}
      />
      <FormButtonGroup cancelFunction={handleFormClose} />
    </Form>
  );
}

function StartEndDatePairWithToggle({
  endDate,
  endLabel,
  endName,
  formOpen,
  handleChange,
  handleFormClose,
  handleSubmit,
  startDate,
  startLabel,
  startName,
  toggleForm,
  toggleText,
}) {
  if (formOpen) {
    return (
      <StartEndDatePairAsForm
        endDate={endDate}
        endLabel={endLabel}
        endName={endName}
        handleChange={handleChange}
        handleFormClose={handleFormClose}
        handleSubmit={handleSubmit}
        startDate={startDate}
        startLabel={startLabel}
        startName={startName}
      />
    );
  } else {
    let dateRange = startDate.length ? `${startDate} - ${endDate}` : toggleText;
    return <div onDoubleClick={toggleForm}>{dateRange}</div>;
  }
}

function TelephoneInput({ handleChange, label, name, value }) {
  return (
    <FormGroupInline>
      <label>{label}</label>
      <input
        type="tel"
        id={name}
        name={name}
        onChange={handleChange}
        value={value}
      />
    </FormGroupInline>
  );
}

function TelephoneInputWithToggle({
  formOpen,
  handleChange,
  handleFormClose,
  handleSubmit,
  label,
  name,
  toggleForm,
  toggleText,
  value,
}) {
  if (formOpen) {
    return (
      <Form noValidate onSubmit={(e) => handleSubmit(e)} width="85%">
        <TelephoneInput
          handleChange={handleChange}
          label={label}
          name={name}
          value={value}
        />
        <FormButtonGroup cancelFunction={handleFormClose} />
      </Form>
    );
  } else {
    return (
      <div onDoubleClick={toggleForm}>
        {formatPhoneNumber(value) || toggleText}
      </div>
    );
  }
}

function TextAreaInputWithToggle({
  formOpen,
  handleChange,
  handleFormClose,
  handleSubmit,
  label,
  name,
  toggleForm,
  toggleText,
  value,
}) {
  if (formOpen) {
    return (
      <Form noValidate onSubmit={(e) => handleSubmit(e)} width="85%">
        <FormGroupInline>
          <label htmlFor={name}>{label}</label>
          <textarea
            rows={15}
            id={name}
            name={name}
            onChange={handleChange}
            value={value}
          />
        </FormGroupInline>
        <FormButtonGroup cancelFunction={handleFormClose} />
      </Form>
    );
  } else {
    return (
      <div onDoubleClick={toggleForm}>
        {value.length ? parse(`${value}`) : toggleText}
      </div>
    );
  }
}

function TextInput({ handleChange, label, name, value }) {
  return (
    <FormGroupInline>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name} onChange={handleChange} value={value} />
    </FormGroupInline>
  );
}

function TextInputAsForm({
  handleChange,
  handleFormClose,
  handleSubmit,
  label,
  name,
  value,
}) {
  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)} width="85%">
      <TextInput
        handleChange={handleChange}
        handleFormClose={handleFormClose}
        handleSubmit={handleSubmit}
        label={label}
        name={name}
        value={value}
      />
      <FormButtonGroup cancelFunction={handleFormClose} />
    </Form>
  );
}

function TextInputWithToggle({
  formOpen,
  handleChange,
  handleFormClose,
  handleSubmit,
  label,
  name,
  toggleForm,
  toggleText,
  value,
}) {
  if (formOpen) {
    return (
      <TextInputAsForm
        handleChange={handleChange}
        handleFormClose={handleFormClose}
        handleSubmit={handleSubmit}
        label={label}
        name={name}
        value={value}
      />
    );
  } else {
    return <div onDoubleClick={toggleForm}>{value || toggleText}</div>;
  }
}

function UrlInput({ handleChange, label, name, value }) {
  return (
    <FormGroupInline>
      <label>{label}</label>
      <input
        type="url"
        id={name}
        name={name}
        onChange={handleChange}
        value={value}
      />
    </FormGroupInline>
  );
}

function UrlInputAsForm({
  handleChange,
  handleFormClose,
  handleSubmit,
  label,
  name,
  value,
}) {
  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)} width="85%">
      <UrlInput
        handleChange={handleChange}
        label={label}
        name={name}
        value={value}
      />
      <FormButtonGroup cancelFunction={handleFormClose} />
    </Form>
  );
}

function UrlInputWithToggle({
  formOpen,
  handleChange,
  handleFormClose,
  handleSubmit,
  label,
  name,
  toggleForm,
  toggleText,
  value,
}) {
  if (formOpen) {
    return (
      <UrlInputAsForm
        handleChange={handleChange}
        handleFormClose={handleFormClose}
        handleSubmit={handleSubmit}
        label={label}
        name={name}
        value={value}
      />
    );
  } else {
    return (
      <div onDoubleClick={toggleForm}>
        {(
          <>
            <a href={"http://" + value} target="_blank">
              {value}
            </a>{" "}
            (click to edit)
          </>
        ) || toggleText}
      </div>
    );
  }
}

export {
  AddressInput,
  AddressInputWithToggle,
  FormButtonGroup,
  NumberInput,
  NumberRange,
  NumberRangeWithToggle,
  StartEndDatePairAsForm,
  StartEndDatePairWithToggle,
  TelephoneInput,
  TelephoneInputWithToggle,
  TextAreaInputWithToggle,
  TextInput,
  TextInputAsForm,
  TextInputWithToggle,
  UrlInput,
  UrlInputAsForm,
  UrlInputWithToggle,
};
