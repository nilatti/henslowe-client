import PropTypes from "prop-types";
import AddressForm from "../AddressForm";
import { Button } from "../Button";
import { Form, FormGroup } from "../Form";
import { useForm } from "../../hooks/environmentUtils";

export default function TheaterForm({ onFormClose, onFormSubmit, theater }) {
  const { inputs, handleChange } = useForm(
    theater || {
      city: "",
      mission_statement: "",
      name: "",
      phone_number: "",
      state: "",
      street_address: "",
      website: "",
      zip: "",
    }
  );

  function handleSubmit(event) {
    event.preventDefault();
    processSubmit();
    onFormClose();
  }

  function processSubmit() {
    let id;
    if (theater) {
      id = theater.id;
    }
    console.log(inputs);
    onFormSubmit(inputs);
  }

  return (
    <Form width={"85%"} onSubmit={(e) => handleSubmit(e)}>
      <FormGroup controlId="name">
        <label>Name</label>
        <input
          type="text"
          placeholder="name"
          name="name"
          onChange={handleChange}
          required
          value={inputs.name}
        />
      </FormGroup>
      <FormGroup controlId="website">
        <label>Website</label>
        <input
          type="text"
          placeholder="website"
          name="website"
          value={inputs.website}
          onChange={handleChange}
        />
      </FormGroup>
      <AddressForm
        city={inputs.city}
        onChange={handleChange}
        state={inputs.state}
        street_address={inputs.street_address}
        zip={inputs.zip}
      />
      <FormGroup controlId="phoneNumber">
        <label>Phone Number</label>
        <input
          type="text"
          placeholder="phone number"
          name="phone_number"
          value={inputs.phone_number}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <label>Mission Statement</label>
        <textarea
          rows={15}
          placeholder="mission statement"
          name="mission_statement"
          value={inputs.mission_statement}
          onChange={handleChange}
        />
      </FormGroup>

      <Button type="submit">Submit</Button>
      <Button type="button" onClick={onFormClose}>
        Cancel
      </Button>
    </Form>
  );
}
