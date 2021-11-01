import { Button } from "./Button";
import { Form, FormGroupInline } from "./Form";
import { US_STATES_ARRAY } from "../utils/hardcodedConstants";

function AddressInput({ handleChange, city, state, street_address, zip }) {
  const states = US_STATES_ARRAY.map((us_state) => (
    <option key={us_state.abbr} value={us_state.abbr}>
      {us_state.name}
    </option>
  ));
  return (
    <>
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
    return <div onDoubleClick={toggleForm}>{value || toggleText}</div>;
  }
}

function TextInput({
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
        <input id={name} name={name} onChange={handleChange} value={value} />
      </FormGroupInline>
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
      <TextInput
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

export {
  AddressInput,
  FormButtonGroup,
  NumberInput,
  NumberRange,
  NumberRangeWithToggle,
  TextAreaInputWithToggle,
  TextInput,
  TextInputWithToggle,
};
