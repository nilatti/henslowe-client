import PropTypes from "prop-types";
import { Button, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import uuid from "react-uuid";

export default function RehearsalContentShow({
  acts,
  frenchScenes,
  handleEditClick,
  scenes,
}) {
  const [content, setContent] = useState([]);
  useEffect(() => {
    let content = [];
    if (acts.length) {
      acts.map((item) => content.push(item.heading));
    }
    if (scenes.length) {
      scenes.map((item) => content.push(item.pretty_name));
    }
    if (frenchScenes.length) {
      frenchScenes.map((item) => content.push(item.pretty_name));
    }
    setContent(content.map((item) => <li key={uuid()}>{item}</li>));
  }, [acts, scenes, frenchScenes]);

  return (
    <Col md={12}>
      <h2>Planned Content:</h2>
      <ul>{content}</ul>
      <Button onClick={handleEditClick}>Edit content</Button>
    </Col>
  );
}

RehearsalContentShow.propTypes = {
  acts: PropTypes.array,
  french_scenes: PropTypes.array,
  // hiredUsers: PropTypes.array.isRequired,
  handleEditClick: PropTypes.func.isRequired,
  scenes: PropTypes.array,
};
