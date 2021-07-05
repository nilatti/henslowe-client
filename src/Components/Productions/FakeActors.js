import { useState } from "react";
import { Button } from "../Button";
import { Form, FormGroupInline } from "../Form";
import { useForm } from "../../hooks/environmentUtils";
export default function FakeActors({ actors, onSubmit }) {
  const [formOpen, setFormOpen] = useState(false);
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

  if (
    formOpen ||
    (actors?.female === 0 && actors?.male === 0 && actors?.nonbinary === 0)
  ) {
    return (
      <Form noValidate onSubmit={handleSubmit} width="40%">
        <FormGroupInline>
          <label>Female Actors</label>
          <input
            name="female"
            onChange={handleChange}
            type="number"
            value={inputs.female}
            min="0"
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
            min="0"
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
            min="0"
            max="999"
          />
        </FormGroupInline>
        <Button type="submit" variant="primary" maxWidth="100%" margin="0">
          Submit
        </Button>
      </Form>
    );
  }

  return (
    <div>
      <Button onClick={toggleFormOpen}>Change actor count</Button>
    </div>
  );
}
