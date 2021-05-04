import _ from "lodash";
import PropTypes from "prop-types";
import { Button, Col, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import { buildUserName } from "../../../utils/actorUtils";

export default function RehearsalPeopleShow({ handleEditClick, calledUsers }) {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    let peopleList = _.sortBy(calledUsers, ["first_name"]);
    let peopleListLis = peopleList.map((person) => (
      <li key={uuid()}>{buildUserName(person)}</li>
    ));
    console.log(peopleList);
    setPeople(peopleListLis);
  }, [calledUsers]);

  return (
    <Col md={12}>
      <h2>People called:</h2>
      <ul>{people}</ul>
      <Button onClick={handleEditClick}>Edit people called</Button>
    </Col>
  );
}

RehearsalPeopleShow.propTypes = {
  handleEditClick: PropTypes.func.isRequired,
  calledUsers: PropTypes.array.isRequired,
};
