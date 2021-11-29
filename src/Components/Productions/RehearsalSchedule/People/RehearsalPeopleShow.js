import _ from "lodash";
import PropTypes from "prop-types";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import uuid from "react-uuid";
import styled from "styled-components";
import { useProductionAuthState } from "../../../Contexts";
import { buildUserName } from "../../../../utils/actorUtils";
import { EditIcons } from "../../../Styled";

const PeopleShow = styled.div`
  display: flex;
  flex: 1 1 0px;
  flex-flow: column nowrap;
  align-items: center;
`;
export default function RehearsalPeopleShow({ handleEditClick, calledUsers }) {
  const { role } = useProductionAuthState();
  const [people, setPeople] = useState([]);
  useEffect(() => {
    let peopleList = _.sortBy(calledUsers, ["first_name"]);
    let peopleListLis = peopleList.map((person) => (
      <li key={person.id}>
        <Link to={`/users/${person.id}`}>{buildUserName(person)}</Link>
      </li>
    ));
    setPeople(peopleListLis);
  }, [calledUsers]);

  return (
    <PeopleShow>
      <h4>
        People called:{" "}
        {role == "admin" && (
          <EditIcons>
            <span className="right floated edit icon" onClick={handleEditClick}>
              <i className="fas fa-pencil-alt"></i>
            </span>
          </EditIcons>
        )}
      </h4>
      <ul>{people}</ul>
    </PeopleShow>
  );
}

RehearsalPeopleShow.propTypes = {
  handleEditClick: PropTypes.func.isRequired,
  calledUsers: PropTypes.array,
};
