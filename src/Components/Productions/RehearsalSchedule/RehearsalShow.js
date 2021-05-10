import PropTypes from "prop-types";
import Moment from "react-moment";
import styled from "styled-components";

import EditableRehearsalContent from "./EditableRehearsalContent";
import EditableRehearsalPeople from "./EditableRehearsalPeople";
import { useProductionState } from "../../../lib/productionState";

const EditIcons = styled.div``;

const Notes = styled.div`
  padding-bottom: 30px;
`;

const RehearsalContainer = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
`;

const RehearsalDetails = styled.div`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
  width: 100%;
`;

const Time = styled.div``;

const Space = styled.div``;

export default function RehearsalShow({ handleEditClick, rehearsal }) {
  const { deleteRehearsal, updateRehearsal } = useProductionState();
  return (
    <RehearsalContainer>
      <h4>{rehearsal.title}</h4>
      <Time>
        <Moment format="h:mm ">{rehearsal.start_time}</Moment>-
        <Moment format=" h:mm">{rehearsal.end_time}</Moment>
      </Time>
      <Space>
        {rehearsal.space_id ? (
          <span>at {rehearsal.space_id}</span>
        ) : (
          <span></span>
        )}
      </Space>
      <EditIcons>
        <span className="right floated edit icon" onClick={handleEditClick}>
          <i className="fas fa-pencil-alt"></i>
        </span>
        <span
          className="right floated trash icon"
          onClick={() => deleteRehearsal(rehearsal.id)}
        >
          <i className="fas fa-trash-alt"></i>
        </span>
      </EditIcons>
      <Notes>{rehearsal.notes && rehearsal.notes}</Notes>
      <RehearsalDetails>
        <EditableRehearsalContent rehearsal={rehearsal} />
        <EditableRehearsalPeople rehearsal={rehearsal} />
      </RehearsalDetails>
      <hr />
    </RehearsalContainer>
  );
}

RehearsalShow.propTypes = {
  rehearsal: PropTypes.object.isRequired,
};
