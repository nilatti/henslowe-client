import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useQuery } from "../../hooks/environmentUtils";

import NewProductionForm from "./NewProductionForm";

export default function NewProduction({ onFormSubmit }) {
  let query = useQuery();
  let history = useHistory();

  function handleFormClose() {
    history.goBack();
  }

  async function handleFormSubmit(production) {
    await onFormSubmit(production);
  }

  return (
    <Row>
      <Col md={12}>
        <div id="new-production-form">
          <NewProductionForm
            onFormSubmit={handleFormSubmit}
            onFormClose={handleFormClose}
            playId={parseInt(query.get("playId"))}
            theaterId={parseInt(query.get("theaterId"))}
          />
        </div>
      </Col>
    </Row>
  );
}

NewProduction.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};
