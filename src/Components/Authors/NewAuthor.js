import { useNavigate } from "react-router";
import { Form, FormGroupInline } from "../Form.js";
import { FormButtonGroup, StartEndDatePair, TextInput } from "../Inputs.js";
import { useForm } from "../../hooks/environmentUtils.js";
import { USER_GENDER_DESCRIPTORS } from "../../utils/hardcodedConstants.js";
import { firstLetterUpcase } from "../../utils/stringUtils.js";

export default function NewAuthor({ onFormSubmit }) {
  const { inputs, handleChange } = useForm({
    birthdate: "",
    deathdate: "",
    first_name: "",
    gender: "",
    last_name: "",
    middle_name: "",
    nationality: "",
  });

  const navigate = useNavigate();

  function onFormClose() {
    navigate("/authors");
  }

  function handleSubmit(event) {
    event.preventDefault();
    onFormSubmit(inputs);
  }

  return (
    <Form noValidate onSubmit={(e) => handleSubmit(e)} width="100%">
      <TextInput
        handleChange={handleChange}
        label="First Name"
        name="first_name"
        value={inputs.first_name}
      />
      <TextInput
        handleChange={handleChange}
        label="Middle Name"
        name="middle_name"
        value={inputs.middle_name}
      />
      <TextInput
        handleChange={handleChange}
        label="Last Name"
        name="last_name"
        value={inputs.last_name}
      />
      <StartEndDatePair
        endDate=""
        endLabel="Death Date"
        endName="deathdate"
        handleChange={handleChange}
        startDate=""
        startLabel="Birth Date"
        startName="birthdate"
      />
      <fieldset>
        <FormGroupInline>
          <label>Gender:</label>
          <select name="gender" onChange={handleChange} value={inputs.gender}>
            <option></option>
            {USER_GENDER_DESCRIPTORS.map((gender) => (
              <option
                key={gender}
                checked={inputs.gender === gender}
                id={gender}
                label={firstLetterUpcase(gender)}
                name="gender"
                onChange={handleChange}
                type="radio"
                value={gender}
              />
            ))}
          </select>
        </FormGroupInline>
      </fieldset>
      <TextInput
        handleChange={handleChange}
        label="Nationality"
        name="nationality"
        value={inputs.nationality}
      />
      <FormButtonGroup cancelFunction={onFormClose} />
    </Form>
  );
}
