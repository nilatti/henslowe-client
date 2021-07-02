import PropTypes from "prop-types";

// import {} from 'react'
import { useHistory } from "react-router-dom";

import SpaceForm from "./SpaceForm";

export default function NewSpace({ onFormSubmit }) {
  let history = useHistory();
  function handleFormClose() {
    history.push("/spaces");
  }

  return (
    <div id="new-space-form">
      <SpaceForm onFormSubmit={onFormSubmit} onFormClose={handleFormClose} />
    </div>
  );
}
