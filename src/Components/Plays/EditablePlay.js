import React, { useEffect, useState } from "react";
import { Button, Col, Row, Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

import {
  createItemWithParent,
  deleteItem,
  getItem,
  updateServerItem,
} from "../../api/crud";

async function loadPlayFromServer(playId) {
  const response = await getItem(playId, "play");
  if (response.status >= 400) {
    this.setState({
      errorStatus: "Error fetching play",
    });
  } else {
    const play = response.data.data.attributes;
    if (!play.canonical) {
      this.loadProductionFromServer(play.production_id);
    }
    this.setState({
      play: response.data,
    });
  }
}

export default function EditablePlay() {
  const { playId } = useParams();
  const [play, setPlay] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const response = await getItem(playId, "play");
      setLoading(false);
      if (response.status >= 400) {
        setError(response.statusText);
      } else {
        setPlay(response.data.data.attributes);
      }
    }
    fetchData();
  }, []);
  if (loading) return <div>Loading!</div>;
  return (
    <div>
      <Row>
        <Col>
          <h2>{play.title}</h2>
          {play.genre ? (
            <span>
              a {play.genre.join("/")}
              <br />
            </span>
          ) : (
            <span></span>
          )}
          {play.canonical ? (
            <p>
              <em> Canonical Version</em>
            </p>
          ) : (
            <p></p>
          )}
          by{" "}
          {/* <Link to={`/authors/${play.author.id}`}>
            {" "}
            {play.author.first_name} {play.author.last_name}
          </Link> */}
          <br />
          {play.date}
          <br />
          <p>{play.synopsis}</p>
          <p>{play.text_notes}</p>
          <span
            className="right floated edit icon"
            //   onClick={handleEditClick}
          >
            <i className="fas fa-pencil-alt"></i>
          </span>
          <span
            className="right floated trash icon"
            // onClick={this.handleDeleteClick}
          >
            <i className="fas fa-trash-alt"></i>
          </span>
        </Col>
      </Row>
    </div>
  );
}
