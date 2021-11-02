import { useState } from "react";
import ToolTip from "../ToolTip";
import {
  AddressInputWithToggle,
  TelephoneInputWithToggle,
  TextInput,
  TextAreaInputWithToggle,
  UrlInputWithToggle,
} from "../Inputs";
import { useForm } from "../../hooks/environmentUtils";

export default function TheaterProfileForAdmin({ theater, updateTheater }) {
  const [addressForm, setAddressForm] = useState(false);
  const [missionForm, setMissionForm] = useState(false);
  const [nameForm, setNameForm] = useState(false);
  const [phoneForm, setPhoneForm] = useState(false);
  const [urlForm, setUrlForm] = useState(false);
  const { inputs, handleChange } = useForm({
    city: theater?.city || "",
    id: theater?.id || null,
    mission_statement: theater?.mission_statement || "",
    name: theater?.name || "0",
    phone_number: theater?.phone_number || "",
    state: theater?.state || "",
    street_address: theater?.street_address || "",
    website: theater?.website || "",
    zip: theater?.zip || "",
  });
  function closeAllForms() {
    setAddressForm(false);
    setMissionForm(false);
    setNameForm(false);
    setPhoneForm(false);
    setUrlForm(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    updateTheater(inputs);
    closeAllForms();
  }

  function toggleAddressForm() {
    setAddressForm(!addressForm);
  }

  function toggleMissionForm() {
    setMissionForm(!missionForm);
  }

  function toggleNameForm() {
    setNameForm(!nameForm);
  }

  function togglePhoneForm() {
    setPhoneForm(!phoneForm);
  }

  function toggleUrlForm() {
    setUrlForm(!urlForm);
  }

  return (
    <div>
      <div>
        {nameForm ? (
          <TextInput
            handleChange={handleChange}
            handleFormClose={toggleNameForm}
            handleSubmit={handleSubmit}
            label="Company Name"
            name="name"
            value={inputs.name}
          />
        ) : (
          <h2 onDoubleClick={toggleNameForm}>
            {theater.name}
            <ToolTip>
              <div>
                <em>Double-click most of this to edit</em>
              </div>
            </ToolTip>
          </h2>
        )}
      </div>

      <TextAreaInputWithToggle
        formOpen={missionForm}
        handleChange={handleChange}
        handleFormClose={toggleMissionForm}
        handleSubmit={handleSubmit}
        label="Mission Statement"
        name="mission_statement"
        toggleForm={toggleMissionForm}
        toggleText="Double click to set mission statement"
        value={inputs.mission_statement}
      />

      <AddressInputWithToggle
        city={inputs.city}
        formOpen={addressForm}
        handleChange={handleChange}
        handleFormClose={toggleAddressForm}
        handleSubmit={handleSubmit}
        toggleForm={toggleAddressForm}
        toggleText="Double click to add address"
        state={inputs.state}
        street_address={inputs.street_address}
        zip={inputs.zip}
      />
      <TelephoneInputWithToggle
        formOpen={phoneForm}
        handleChange={handleChange}
        handleFormClose={togglePhoneForm}
        handleSubmit={handleSubmit}
        label="Telephone"
        name="phone_number"
        toggleForm={togglePhoneForm}
        toggleText="Doubleclick to add phone number"
        value={inputs.phone_number}
      />
      <UrlInputWithToggle
        formOpen={urlForm}
        handleChange={handleChange}
        handleFormClose={toggleUrlForm}
        handleSubmit={handleSubmit}
        label="Website"
        name="website"
        toggleForm={toggleUrlForm}
        toggleText="Doubleclick to add website"
        value={inputs.website}
      />
    </div>
  );
}
