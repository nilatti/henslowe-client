import { AddressInput, TelephoneInput } from "../Inputs.js";
import PropTypes from "prop-types";
import { Button } from "../Button.js";
import { Form, FormGroupInline } from "../Form.js";
import { useForm } from "../../hooks/environmentUtils.js";
import { useMeState } from "../../lib/meState.js";
import TimezonePicker from "react-timezone";

export default function UserForm({ onFormClose, onFormSubmit, user }) {
  const { me } = useMeState();
  const { inputs, handleChange } = useForm({
    bio: user?.bio || "",
    birthdate: user?.birthdate || "",
    city: user?.city || "",
    description: user?.description || "",
    email: user?.email || me?.email || "",
    emergency_contact_name: user?.emergency_contact_name || "",
    emergency_contact_number: user?.emergency_contact_number || "",
    first_name: user?.first_name || me?.first_name || "",
    gender: user?.gender || "",
    id: user?.id || me?.id || null,
    last_name: user?.last_name || me?.last_name || "",
    middle_name: user?.middle_name || "",
    phone_number: user?.phone_number || "",
    preferred_name: user?.preferred_name || "",
    program_name: user?.program_name || "",
    street_address: user?.street_address || "",
    state: user?.state || "",
    timezone: user?.timezone || "",
    website: user?.website || "",
    zip: user?.zip || "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    processSubmit();
  }

  function handleTimezoneChange(timezone) {
    handleChange({
      target: { name: "timezone", value: timezone, type: "input" },
    });
  }

  function processSubmit() {
    onFormSubmit(inputs);
  }

  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)} width="75%">
      <FormGroupInline>
        <label>First Name</label>
        <input
          name="first_name"
          onChange={handleChange}
          placeholder="First Name"
          required
          type="text"
          value={inputs.first_name}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Middle Name</label>
        <input
          name="middle_name"
          onChange={handleChange}
          placeholder="Middle Name"
          type="text"
          value={inputs.middle_name}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Preferred Name</label>
        <input
          name="preferred_name"
          onChange={handleChange}
          placeholder="Preferred Name"
          type="text"
          value={inputs.preferred_name}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Last Name</label>
        <input
          name="last_name"
          onChange={handleChange}
          placeholder="Last Name"
          required
          type="text"
          value={inputs.last_name}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>How do you want to be listed in a program?</label>
        <input
          name="program_name"
          onChange={handleChange}
          placeholder="Program Name"
          required
          type="text"
          value={inputs.program_name}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Email</label>
        <input
          autoComplete="email"
          name="email"
          onChange={handleChange}
          placeholder="email"
          required
          type="email"
          value={inputs.email}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Website</label>
        <input
          name="website"
          onChange={handleChange}
          placeholder="http://"
          type="url"
          value={inputs.website}
        />
      </FormGroupInline>
      <TelephoneInput
        label="Phone number"
        name="phone_number"
        handleChange={handleChange}
        value={inputs.phone_number}
      />
      <AddressInput
        city={inputs.city}
        handleChange={handleChange}
        state={inputs.state}
        street_address={inputs.street_address}
        zip={inputs.zip}
      />
      <FormGroupInline>
        <label>Timezone</label>
        <TimezonePicker
          inputProps={{
            placeholder: "Select Timezone...",
            name: "timezone",
          }}
          value={inputs.timezone}
          placeholder="Select timezone..."
          onChange={handleTimezoneChange}
          required
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Date of Birth</label>
        <input
          name="birthdate"
          onChange={handleChange}
          placeholder=""
          type="date"
          value={inputs.birthdate}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Gender</label>
        <select name="gender" onChange={handleChange} value={inputs.gender}>
          <option></option>
          <option key="female" value="Female">
            Female
          </option>
          <option key="nonbinary" value="Nonbinary/Third Gender">
            Nonbinary/Third Gender
          </option>
          <option key="male" value="Male">
            Male
          </option>
          <option key="other" value="Other/Prefer Not to Say">
            Other/Prefer Not to Say
          </option>
        </select>
      </FormGroupInline>
      <FormGroupInline>
        <label>Describe yourself</label>
        <textarea
          name="description"
          onChange={handleChange}
          placeholder=""
          rows="10"
          value={inputs.description}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Bio</label>
        <textarea
          name="bio"
          onChange={handleChange}
          placeholder=""
          rows="10"
          value={inputs.bio}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Emergency Contact Name</label>
        <input
          name="emergency_contact_name"
          onChange={handleChange}
          placeholder=""
          type="text"
          value={inputs.emergency_contact_name}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Emergency Contact Number</label>
        <input
          name="emergency_contact_number"
          onChange={handleChange}
          placeholder=""
          type="tel"
          value={inputs.emergency_contact_number}
        />
      </FormGroupInline>
      <Button type="submit">
        <>Submit</>
      </Button>
      <Button type="button" onClick={onFormClose}>
        Cancel
      </Button>
    </Form>
  );
}

UserForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
};
