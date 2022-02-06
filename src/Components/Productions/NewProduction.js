import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useQuery } from "../../hooks/environmentUtils.js";

import NewProductionForm from "./NewProductionForm.js";

export default function NewProduction({ onFormSubmit }) {
  let query = useQuery();
  let navigate = useNavigate();

  function handleFormClose() {
    navigate(-1);
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
