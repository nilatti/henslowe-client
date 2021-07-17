import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import TheaterForm from "./TheaterForm";

export default function NewTheater({ onFormSubmit }) {
  const history = useHistory();

  function handleFormClose() {
    history.push("/theaters");
  }

  function handleFormSubmit(theater) {
    onFormSubmit(theater);
  }

  return (
    <div id="new-theater-form">
      <TheaterForm
        onFormSubmit={handleFormSubmit}
        onFormClose={handleFormClose}
      />
    </div>
  );
}

NewTheater.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
