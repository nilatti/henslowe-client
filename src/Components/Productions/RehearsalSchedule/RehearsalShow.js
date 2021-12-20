import PropTypes from "prop-types";
import Moment from "react-moment";
import "moment-timezone";
import styled from "styled-components";

import EditableRehearsalContent from "./Content/EditableRehearsalContent";
import EditableRehearsalPeople from "./People/EditableRehearsalPeople";
import { useProductionState } from "../../../lib/productionState";
import { useProductionAuthState } from "../../Contexts";
import { unavailableUsers } from "../../../utils/rehearsalUtils";
import { buildUserName } from "../../../utils/actorUtils";
import { TIME_FORMAT } from "../../../utils/hardcodedConstants";
import { useMeState } from "../../../lib/meState";

const EditIcons = styled.div``;

const Notes = styled.div`
  padding-bottom: 30px;
`;

const OtherUsersConflicts = styled.div`
  font-size: 0.75em;
  font-style: italic;
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
  const { deleteRehearsal, notActors } = useProductionState();
  const { role } = useProductionAuthState();
  const { me } = useMeState();

  let unavailableNotActors = unavailableUsers(notActors, rehearsal);
  return (
    <RehearsalContainer>
      <h4>{rehearsal.title}</h4>
      <Time>
        <Moment format={TIME_FORMAT} tz={me.timezone || DEFAULT_TIMEZONE}>
          {rehearsal.start_time}
        </Moment>
        -
        <Moment format={TIME_FORMAT} tz={me.timezone || DEFAULT_TIMEZONE}>
          {rehearsal.end_time}
        </Moment>
      </Time>
      <Space>
        {rehearsal.space_id ? (
          <span>at {rehearsal.space_id}</span>
        ) : (
          <span></span>
        )}
      </Space>
      {role == "admin" && (
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
      )}
      <Notes>{rehearsal.notes && rehearsal.notes}</Notes>
      {unavailableNotActors.length > 0 && (
        <OtherUsersConflicts>
          Other conflicts:{" "}
          {unavailableNotActors.map((user) => buildUserName(user)).join()}
        </OtherUsersConflicts>
      )}
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
