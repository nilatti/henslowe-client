import moment from "moment";
import styled from "styled-components";
import {
  FancyCheckBox,
  FancyCheckBoxLabel,
  FancyRadio,
} from "../../../Styled.js";

import ToolTip from "../../../ToolTip.js";
import info from "../../../Images/info_icon.png";
import { buildUserName } from "../../../../utils/actorUtils.js";
import { calculateDuration } from "../../../../utils/dateTimeUtils.js";

const ContentSelectItem = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  img {
    margin: 7px;
  }
`;

function calculateOtherRehearsals(contentItem) {
  if (contentItem.rehearsals.length === 0) {
    return null;
  } else {
    return contentItem.rehearsals.map((rehearsal) => {
      let length = calculateDuration(rehearsal.end_time, rehearsal.start_time);
      let date = moment(rehearsal.start_time).format("MMM D, YYYY");
      return (
        <li key={rehearsal.start_time}>
          {date} ({length} minutes)
        </li>
      );
    });
  }
}

export default function PlayContentCheckboxes({ onChange, playContent }) {
  return playContent.map((item) => {
    return (
      <ContentSelectItem key={`${item.id}`}>
        <FancyCheckBox htmlFor={item.id}>
          <FancyRadio
            type="checkbox"
            id={`${item.id}`}
            data-checked={item.isScheduled}
            checked={item.isScheduled}
            onChange={onChange}
          />
          <FancyCheckBoxLabel
            className={item.isRecommended ? "recommended" : "not-recommended"}
          >
            <h4>{item.heading}</h4>
            {item.furtherInfo?.length > 0 && (
              <div>
                <h6>Called:</h6>
                <p>{item.furtherInfo}</p>
              </div>
            )}
            {item.reasonsForRecommendation?.unavailableUsers?.length > 0 && (
              <div>
                <h6>Unavailable:</h6>
                <p>
                  {item.reasonsForRecommendation.unavailableUsers
                    .map((user) => buildUserName(user))
                    .join(", ")}
                </p>
              </div>
            )}
          </FancyCheckBoxLabel>
        </FancyCheckBox>
        <ToolTip icon={info}>
          {item.summary && (
            <div>
              <strong>Summary: </strong>
              {item.summary}
            </div>
          )}
          {item.end_page && item.start_page && (
            <div>
              <strong>Pages: </strong>
              {item.start_page}-{item.end_page}
            </div>
          )}
          {item.new_line_count && (
            <div>
              <strong>Line Count: </strong>
              {item.new_line_count}
            </div>
          )}
          {item.rehearsals.length > 0 && (
            <div>
              <strong>Other rehearsals:</strong>
              <ul>{calculateOtherRehearsals(item)}</ul>
            </div>
          )}
          <div></div>
        </ToolTip>
      </ContentSelectItem>
    );
  });
}
