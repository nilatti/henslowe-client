import { useState } from "react";
import { useForm } from "../../hooks/environmentUtils";
import { Form, FormGroupInline } from "../Form";
import {
  FormButtonGroup,
  StartEndDatePairWithToggle,
  TextInputWithToggle,
} from "../Inputs";
import ToolTip from "../ToolTip";
import {
  DEFAULT_TIMEZONE,
  USER_GENDER_DESCRIPTORS,
} from "../../utils/hardcodedConstants";
import { firstLetterUpcase } from "../../utils/stringUtils";
import { useMeState } from "../../lib/meState";
export default function AuthorProfileForAdmin({
  author,
  onDeleteClick,
  updateAuthor,
}) {
  const { me } = useMeState();
  const [dateForm, setDateForm] = useState(false);
  const [genderForm, setGenderForm] = useState(false);
  const [nameForm, setNameForm] = useState(false);
  const [nationalityForm, setNationalityForm] = useState(false);

  const { inputs, handleChange } = useForm({
    birthdate: author?.birthdate || "",
    deathdate: author?.deathdate || "",
    first_name: author?.first_name || "",
    gender: author?.gender || "",
    id: author?.id || null,
    last_name: author?.last_name || "",
    middle_name: author?.middle_name || "",
    nationality: author?.nationality || "",
  });

  function closeAllForms() {
    setDateForm(false);
    setGenderForm(false);
    setNameForm(false);
    setNationalityForm(false);
    setPlayForm(false);
  }

  function handleDelete() {
    onDeleteClick(author.id);
  }
  function handleSubmit(e) {
    e.preventDefault();
    updateAuthor(inputs);
    closeAllForms();
  }
  function toggleDateForm() {
    setDateForm(!dateForm);
  }
  function toggleGenderForm() {
    setGenderForm(!genderForm);
  }
  function toggleNameForm() {
    setNameForm(!nameForm);
  }
  function toggleNationalityForm() {
    setNationalityForm(!nationalityForm);
  }

  return (
    <div>
      {nameForm ? (
        <Form onSubmit={(e) => handleSubmit(e)}>
          <FormGroupInline>
            <label>First Name</label>
            <input
              name="first_name"
              onChange={handleChange}
              value={inputs.first_name}
            />
          </FormGroupInline>
          <FormGroupInline>
            <label>Middle Name</label>
            <input
              name="middle_name"
              onChange={handleChange}
              value={inputs.middle_name}
            />
          </FormGroupInline>
          <FormGroupInline>
            <label>Last Name</label>
            <input
              name="last_name"
              onChange={handleChange}
              value={inputs.last_name}
            />
          </FormGroupInline>
          <FormButtonGroup cancelFunction={toggleNameForm} />
        </Form>
      ) : (
        <>
          <h3 onDoubleClick={() => toggleNameForm()}>
            {author.first_name} {author.middle_name} {author.last_name}
            <ToolTip>
              <div>
                <em>Double-click most of this to edit</em>
              </div>
            </ToolTip>
          </h3>
          <span
            className="right floated trash icon"
            onClick={() => handleDelete(author.id)}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </>
      )}
      <div>
        <StartEndDatePairWithToggle
          endDate={inputs.deathdate}
          endLabel="Death date"
          endName="deathdate"
          formOpen={dateForm}
          handleChange={handleChange}
          handleFormClose={toggleDateForm}
          handleSubmit={handleSubmit}
          startDate={inputs.birthdate}
          startLabel="Birth date"
          startName="birthdate"
          timezone={me.timezone || DEFAULT_TIMEZONE}
          toggleForm={toggleDateForm}
          toggleText="Doubleclick to set author dates"
        />
      </div>

      {genderForm ? (
        <Form noValidate onSubmit={(e) => handleSubmit(e)} width="85%">
          <fieldset>
            <FormGroupInline>
              <label>Gender:</label>
              <select
                name="gender"
                onChange={handleChange}
                value={inputs.gender}
              >
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
          <FormButtonGroup cancelFunction={toggleGenderForm} />
        </Form>
      ) : (
        <div onDoubleClick={() => toggleGenderForm()}>
          {author.gender || "Doubleclick to set gender"}
        </div>
      )}
      <TextInputWithToggle
        formOpen={nationalityForm}
        handleChange={handleChange}
        handleFormClose={toggleNationalityForm}
        handleSubmit={handleSubmit}
        label="Nationality"
        name="nationality"
        toggleForm={toggleNationalityForm}
        toggleText="Doubleclick to set nationality"
        value={inputs.nationality}
      />
    </div>
  );
}
