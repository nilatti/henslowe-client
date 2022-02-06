import { useState } from "react";
import { useNavigate } from "react-router";
import ToolTip from "../ToolTip.js";
import {
  AddressInputWithToggle,
  TelephoneInputWithToggle,
  TextInputAsForm,
  TextAreaInputWithToggle,
  UrlInputWithToggle,
} from "../Inputs.js";
import { useForm } from "../../hooks/environmentUtils.js";
import { deleteItem } from "../../api/crud.js";

export default function TheaterProfileForAdmin({
  onDeleteClick,
  theater,
  updateTheater,
}) {
  const [addressForm, setAddressForm] = useState(false);
  const [missionForm, setMissionForm] = useState(false);
  const [nameForm, setNameForm] = useState(false);
  const [phoneForm, setPhoneForm] = useState(false);
  const [urlForm, setUrlForm] = useState(false);
  const navigate = useNavigate();
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

  async function handleDelete(theaterId) {
    let response = await deleteItem(theaterId, "theater");
    if (response.status >= 400) {
      console.log("error deleting theater");
    } else {
      navigate("/theaters");
    }
  }

  return (
    <div>
      <div>
        {nameForm ? (
          <TextInputAsForm
            handleChange={handleChange}
            handleFormClose={toggleNameForm}
            handleSubmit={handleSubmit}
            label="Company Name"
            name="name"
            value={inputs.name}
          />
        ) : (
          <>
            <h2 onDoubleClick={toggleNameForm}>
              {theater.name}
              <ToolTip>
                <div>
                  <em>Double-click most of this to edit</em>
                </div>
              </ToolTip>
            </h2>
            <span
              className="right floated trash icon"
              onClick={() => onDeleteClick(theater.id)}
            >
              <i className="fas fa-trash-alt"></i>
            </span>
          </>
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
