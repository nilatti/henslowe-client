import AddressForm from "../AddressForm";
import PropTypes from "prop-types";
import { Button } from "../Button";
import { Form, FormGroupInline } from "../Form";
import { useForm } from "../../hooks/environmentUtils";
import TimezonePicker from "react-timezone";

export default function UserForm({
  onFormClose,
  onFormSubmit,
  registerNewUser,
  user,
}) {
  const { inputs, handleChange } = useForm(
    user || {
      ...user,
      bio: "",
      birthdate: "",
      city: "",
      description: "",
      email: "",
      emergency_contact_name: "",
      emergency_contact_number: "",
      first_name: "",
      gender: "",
      last_name: "",
      middle_name: "",
      password: "",
      password_confirmation: "",
      phone_number: "",
      preferred_name: "",
      program_name: "",
      state: "",
      timezone: "",
      website: "",
      zip: "",
    }
  );

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
        <label>Password</label>
        <input
          autoComplete="new-password"
          name="password"
          onChange={handleChange}
          placeholder="password"
          type="password"
          value={inputs.password}
        />
      </FormGroupInline>
      <FormGroupInline>
        <label>Confirm Password</label>
        <input
          autoComplete="new-password"
          name="password_confirmation"
          onChange={handleChange}
          placeholder="confirm password"
          type="password"
          value={inputs.password_confirmation}
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
      <FormGroupInline>
        <label>Phone Number</label>
        <input
          name="phone_number"
          onChange={handleChange}
          placeholder="phone number"
          required
          type="tel"
          value={inputs.phone_number}
        />
      </FormGroupInline>
      <AddressForm
        city={inputs.city}
        onChange={handleChange}
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
        {registerNewUser ? <>Register</> : <>Create User</>}
      </Button>
      <Button type="button" onClick={onFormClose}>
        Cancel
      </Button>
    </Form>
  );
}

//       </Form>
//       <hr />
//     </Col>
//   )
// }
// }

UserForm.propTypes = {
  onFormClose: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};
