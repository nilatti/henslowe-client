import PropTypes from "prop-types";
import { Col, Row } from "react-bootstrap";
import Moment from "react-moment";

import EditableRehearsalContent from "./EditableRehearsalContent";
import EditableRehearsalPeople from "./EditableRehearsalPeople";
import { useProductionState } from "../../../lib/productionState";

export default function RehearsalShow({ handleEditClick, rehearsal }) {
  const { deleteRehearsal } = useProductionState();
  return (
    <Col md={12}>
      <Row>
        <Moment format="h:mm MMM D, YYYY">{rehearsal.start_time}</Moment>-
        <Moment format="h:mm MMM D, YYYY">{rehearsal.end_time}</Moment>:
        {rehearsal.title}
        {rehearsal.space_id ? (
          <span>at {rehearsal.space_id}</span>
        ) : (
          <span></span>
        )}
        <span className="right floated edit icon" onClick={handleEditClick}>
          <i className="fas fa-pencil-alt"></i>
        </span>
        <span
          className="right floated trash icon"
          onClick={() => deleteRehearsal(rehearsal.id)}
        >
          <i className="fas fa-trash-alt"></i>
        </span>
      </Row>
      <Row>
        {rehearsal.notes ? <Row>{rehearsal.notes}</Row> : <span></span>}
      </Row>
      <Row>
        <Col md={8}>
          <EditableRehearsalContent rehearsal={rehearsal} />
        </Col>
        <Col md={4}>
          <EditableRehearsalPeople rehearsal={rehearsal} />
        </Col>
      </Row>
      <hr />
    </Col>
  );
}

RehearsalShow.propTypes = {
  rehearsal: PropTypes.object.isRequired,
};
