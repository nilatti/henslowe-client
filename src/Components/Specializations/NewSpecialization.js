import { useNavigate } from "react-router-dom";
import { Form, FormGroupInline } from "../Form.js";
import { useForm } from "../../hooks/environmentUtils.js";
import { FormButtonGroup } from "../Inputs.js";
export default function NewSpecialization({ onFormSubmit }) {
  const { inputs, handleChange } = useForm({
    description: "",
    title: "",
  });
  const navgivate = useNavigate();

  function onFormClose() {
    navigate("/specializations");
  }
  function handleSubmit(event) {
    event.preventDefault();
    onFormSubmit(inputs);
  }

  return (
    <>
      <h2>New Specialization</h2>
      <Form noValidate onSubmit={(e) => handleSubmit(e)}>
        <FormGroupInline>
          <label>Title</label>
          <input
            type="text"
            placeholder="title"
            name="title"
            onChange={handleChange}
            required
            value={inputs.title}
          />
        </FormGroupInline>
        <FormGroupInline>
          <label>Description</label>
          <textarea
            rows={15}
            placeholder="description"
            name="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </FormGroupInline>
        <FormButtonGroup cancelFunction={onFormClose} />
      </Form>
    </>
  );
}
