import PropTypes from "prop-types";
import { forwardRef, useEffect, useRef, useState } from "react";
import uuid from "react-uuid";
import styled from "styled-components";
import { EditIcons } from "../../Styled";

const ContentShow = styled.div`
  display: flex;
  flex: 1 1 0px;
  flex-flow: column nowrap;
  align-items: center;
`;
export default function RehearsalContentShow({
  acts,
  frenchScenes,
  handleEditClick,
  scenes,
}) {
  const [content, setContent] = useState([]);
  useEffect(() => {
    let content = [];
    if (acts && acts.length) {
      acts.map((item) => content.push(item.heading));
    }
    if (scenes && scenes.length) {
      scenes.map((item) => content.push(item.pretty_name));
    }
    if (frenchScenes && frenchScenes.length) {
      frenchScenes.map((item) => content.push(item.pretty_name));
    }
    content = content.sort();
    setContent(content.map((item) => <li key={uuid()}>{item}</li>));
  }, [acts, scenes, frenchScenes]);

  return (
    <ContentShow>
      <h4>
        Planned Content:
        <EditIcons>
          <span className="right floated edit icon" onClick={handleEditClick}>
            <i className="fas fa-pencil-alt"></i>
          </span>
        </EditIcons>
      </h4>
      <ul>{content}</ul>
    </ContentShow>
  );
}

RehearsalContentShow.propTypes = {
  acts: PropTypes.array,
  french_scenes: PropTypes.array,
  // hiredUsers: PropTypes.array.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  scenes: PropTypes.array,
};
