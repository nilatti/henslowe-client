import { useState } from "react";
import { Button } from "../Button.js";
import { Form, FormGroupInline } from "../Form.js";
import { useForm } from "../../hooks/environmentUtils.js";
//actors is object { female: int, male: int, nonbinary: int}
export default function FakeActors({ actors, onSubmit }) {
  const [formOpen, setFormOpen] = useState(true);
  const { inputs, handleChange } = useForm({
    female: actors?.female || 0,
    male: actors?.male || 0,
    nonbinary: actors?.nonbinary || 0,
  });

  function handleSubmit(e) {
    e.preventDefault();
    setFormOpen(false);
    onSubmit(inputs);
  }

  function toggleFormOpen() {
    setFormOpen(!formOpen);
  }

  if (formOpen) {
    return (
      <Form noValidate onSubmit={handleSubmit} width="40%">
        <div>
          <em>
            Please note, you cannot make the number lower than the current count
            for a given gender.
          </em>
        </div>
        <FormGroupInline>
          <label>Female Actors</label>
          <input
            name="female"
            onChange={handleChange}
            type="number"
            value={inputs.female}
            min={actors.female}
            max="999"
          />
        </FormGroupInline>
        <FormGroupInline>
          <label>Male Actors</label>
          <input
            name="male"
            onChange={handleChange}
            type="number"
            value={inputs.male}
            min={actors.male}
            max="999"
          />
        </FormGroupInline>
        <FormGroupInline>
          <label>Nonbinary actors/gender fluid roles</label>
          <input
            name="nonbinary"
            onChange={handleChange}
            type="number"
            value={inputs.nonbinary}
            min={actors.nonbinary}
            max="999"
          />
        </FormGroupInline>
        <Button type="submit" variant="primary" maxWidth="100%" margin="0">
          Submit
        </Button>
        <Button onClick={toggleFormOpen}>Cancel</Button>
      </Form>
    );
  }

  return (
    <div>
      <Button onClick={toggleFormOpen}>Change actor count</Button>
    </div>
  );
}
