import { useHistory } from "react-router-dom";
import { Form, FormGroupInline } from "../Form";
import { useForm } from "../../hooks/environmentUtils";
import { FormButtonGroup } from "../Inputs";
export default function NewSpecialization({ onFormSubmit }) {
  const { inputs, handleChange } = useForm({
    description: "",
    title: "",
  });
  const history = useHistory();

  function onFormClose() {
    history.push("/specializations");
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
