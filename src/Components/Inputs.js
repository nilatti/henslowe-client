import { Button } from "./Button";
import { Form, FormGroupInline } from "./Form";

function NumberInput({
  handleChange,
  handleFormClose,
  handleSubmit,
  label,
  name,
  value,
}) {
  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)} width="65%">
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
      <Button type="submit">Submit</Button>
      <Button type="button" onClick={handleFormClose}>
        Cancel
      </Button>
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
        <div>
          {label} {startValue} - {endValue}
        </div>
      )}
      {!startValue > 0 && !formOpen && (
        <div onDoubleClick={toggleForm}>{toggleText}</div>
      )}

      {formOpen && (
        <Form noValidate onSubmit={(e) => handleSubmit(e)} width="65%">
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
          <Button type="submit">Submit</Button>
          <Button type="button" onClick={handleFormClose}>
            Cancel
          </Button>
        </Form>
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
      <Form noValidate onSubmit={(e) => handleSubmit(e)} width="65%">
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
        <Button type="submit">Submit</Button>
        <Button type="button" onClick={handleFormClose}>
          Cancel
        </Button>
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
    <Form noValidate onSubmit={(e) => handleSubmit(e)} width="65%">
      <FormGroupInline>
        <label htmlFor={name}>{label}</label>
        <input id={name} name={name} onChange={handleChange} value={value} />
      </FormGroupInline>
      <Button type="submit">Submit</Button>
      <Button type="button" onClick={handleFormClose}>
        Cancel
      </Button>
    </Form>
  );
}

export {
  NumberInput,
  NumberRangeWithToggle,
  TextAreaInputWithToggle,
  TextInput,
};
