import { useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "../../hooks/environmentUtils.js";
import { TextAreaInputWithToggle, TextInputAsForm } from "../Inputs.js";
import ToolTip from "../ToolTip.js";
export default function SpecializationProfileForAdmin({
  onDeleteClick,
  specialization,
  updateSpecialization,
}) {
  const navigate = useNavigate();
  const [descriptionForm, setDescriptionForm] = useState(false);
  const [nameForm, setNameForm] = useState(false);
  const { inputs, handleChange } = useForm({
    description: specialization?.description || "",
    id: specialization?.id || null,
    title: specialization?.title || "",
  });

  function closeAllForms() {
    setDescriptionForm(false);
    setNameForm(false);
  }

  function handleDelete() {
    onDeleteClick(specialization.id);
  }
  function handleSubmit(e) {
    e.preventDefault();
    updateSpecialization(inputs);
    closeAllForms();
  }
  function toggleDescriptionForm() {
    setDescriptionForm(!descriptionForm);
  }

  function toggleNameForm() {
    setNameForm(!nameForm);
  }

  return (
    <div>
      {nameForm ? (
        <TextInputAsForm
          handleChange={handleChange}
          handleFormClose={toggleNameForm}
          handleSubmit={handleSubmit}
          label="Title"
          name="title"
          value={inputs.title}
        />
      ) : (
        <div>
          <h2 onDoubleClick={toggleNameForm}>
            <div>{specialization.title}</div>
            <ToolTip>
              <div>
                <em>Double-click most of this to edit</em>
              </div>
            </ToolTip>
          </h2>
          <span
            className="right floated trash icon"
            onClick={() => handleDelete(specialization.id)}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </div>
      )}
      <TextAreaInputWithToggle
        formOpen={descriptionForm}
        handleChange={handleChange}
        handleFormClose={toggleDescriptionForm}
        handleSubmit={handleSubmit}
        label="Description"
        name="description"
        toggleForm={toggleDescriptionForm}
        toggleText="Doubleclick to add description"
        value={inputs.description}
      />
    </div>
  );
}
