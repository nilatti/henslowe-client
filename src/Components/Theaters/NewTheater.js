import { useHistory } from "react-router-dom";
import { AddressInput, FormButtonGroup } from "../Inputs";
import { Button } from "../Button";
import { Form, FormGroupInline } from "../Form";
import { useForm } from "../../hooks/environmentUtils";

export default function NewTheater({ onFormSubmit }) {
  const { inputs, handleChange } = useForm({
    city: "",
    mission_statement: "",
    name: "",
    phone_number: "",
    state: "",
    street_address: "",
    website: "",
    zip: "",
  });
  const history = useHistory();

  function onFormClose() {
    history.push("/theaters");
  }

  function handleSubmit(event) {
    event.preventDefault();
    onFormSubmit(inputs);
  }

  return (
    <Form width={"85%"} onSubmit={(e) => handleSubmit(e)}>
      <FormGroupInline controlId="name">
        <label>Name</label>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={handleChange}
          required
          value={inputs.name}
        />
      </FormGroupInline>
      <FormGroupInline controlId="website">
        <label>Website</label>
        <input
          type="text"
          placeholder="website"
          name="website"
          value={inputs.website}
          onChange={handleChange}
        />
      </FormGroupInline>
      <AddressInput
        city={inputs.city}
        handleChange={handleChange}
        state={inputs.state}
        street_address={inputs.street_address}
        zip={inputs.zip}
      />
      <FormGroupInline controlId="phoneNumber">
        <label>Phone Number</label>
        <input
          type="text"
          placeholder="phone number"
          name="phone_number"
          value={inputs.phone_number}
          onChange={handleChange}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Mission Statement</label>
        <textarea
          rows={15}
          placeholder="mission statement"
          name="mission_statement"
          value={inputs.mission_statement}
          onChange={handleChange}
        />
      </FormGroupInline>

      <FormButtonGroup cancelFunction={onFormClose} />
    </Form>
  );
}
