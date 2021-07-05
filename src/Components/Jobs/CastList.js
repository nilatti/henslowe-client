import _ from "lodash";

import { Link } from "react-router-dom";

import React, { Component } from "react";

import Select from "react-select";

import { Button, Col, Row } from "react-bootstrap";

import { Typeahead } from "react-bootstrap-typeahead";

import {
  createJob,
  deleteJob,
  getActorsAndAuditionersForProduction,
  getJobs,
  updateServerJob,
} from "../../api/jobs";

import { buildUserName } from "../../utils/actorUtils";

import { ProductionAuthContext } from "../Contexts";

import CastingContainer from "./CastingContainer";
import NewCasting from "./NewCasting";

class CastList extends Component {
  static contextType = ProductionAuthContext;
  state = {
    availableActors: [],
    castings: [],
    newCastingFormOpen: false,
  };

  componentDidMount() {
    this.loadCastingsFromServer();
    this.loadActorsAndAuditionersFromServer();
  }

  async createJobOnServer(casting) {
    const response = await createJob(casting);
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error creating casting",
      });
    } else {
      this.setState({
        castings: [...this.state.castings, response.data],
      });
    }
  }

  async deleteCasting(castingId) {
    const response = await deleteJob(castingId);
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error deleting casting",
      });
    } else {
      this.setState({
        castings: this.state.castings.filter(
          (casting) => casting.id !== castingId
        ),
      });
    }
  }

  async loadActorsAndAuditionersFromServer() {
    const response = await getActorsAndAuditionersForProduction(
      this.props.production.id
    );
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error fetching actors and auditioners",
      });
    } else {
      let availableActors = _.uniqBy(
        response.data.map((item) => item.user),
        "id"
      );
      let sortedAvailableActors = _.orderBy(availableActors, "last_name");
      this.setState({
        availableActors: sortedAvailableActors,
      });
    }
  }

  async loadCastingsFromServer() {
    const response = await getJobs({
      production_id: this.props.production.id,
    });

    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error fetching castings",
      });
    } else {
      let actingJobs = response.data.filter(
        (obj) => obj.specialization.title == "Actor"
      );
      let legalCastings = actingJobs.filter(
        (obj) => obj.character !== undefined
      );
      let sortedLegalCastings = _.orderBy(
        legalCastings.map((obj) => ({ ...obj, editOpen: false })),
        "character.name"
      );
      this.setState({
        castings: sortedLegalCastings,
      });
    }
  }

  castingGroupedByActor(castings) {
    let grouped = _.groupBy(castings, "user_id");
    let actorIds = _.compact(Object.keys(grouped));
    return actorIds.map((actorId) => {
      if (actorId !== null) {
        let actor = _.find(this.state.availableActors, [
          "id",
          _.toNumber(actorId),
        ]);
        if (actor) {
          let actorName = buildUserName(actor);
          let actorGroup = grouped[actorId];
          let characters = actorGroup.map((item) => item.character);
          let actorLineCount = characters.reduce(
            (a, b) => a + b.new_line_count,
            0
          );
          let characterNames = characters.map((character) => character.name);
          return (
            <li key={actorId}>
              <Link to={`/users/${actorId}`}>{actorName}</Link> (
              {actorLineCount}): {_.join(characterNames, ", ")}
            </li>
          );
        }
      }
    });
  }

  handleActorClick(castingId) {
    this.setState({
      castings: this.state.castings.map((casting) => {
        if (casting.id === castingId) {
          return { ...casting, editOpen: !casting.editOpen };
        } else {
          return casting;
        }
      }),
    });
  }

  handleButtonClick = () => {
    this.setState({
      newCastingFormOpen: true,
    });
  };

  handleFormClose = () => {
    this.setState({
      newCastingFormOpen: false,
    });
  };
  handleFormSubmit = (casting) => {
    this.createJobOnServer(casting);
  };

  onDeleteClick = (castingId) => {
    this.deleteCasting(castingId);
  };

  render() {
    let availableActors = this.state.availableActors.map((actor) => ({
      id: actor.id,
      label: `${actor.preferred_name || actor.first_name} ${actor.last_name}`,
    }));
    availableActors.unshift({ value: null, label: "" });
    let castingByActor = this.castingGroupedByActor(this.state.castings);
    let castings = this.state.castings.map((casting) => (
      <li key={casting.id}>
        <CastingContainer
          availableActors={availableActors}
          casting={casting}
          onDeleteClick={this.onDeleteClick}
        />
      </li>
    ));
    return (
      <Col>
        <h2>Casting</h2>
        <ProductionAuthContext.Consumer>
          {(value) => {
            if (value === "admin" && !this.state.newCastingFormOpen) {
              return (
                <Button onClick={this.handleButtonClick} variant="success">
                  Add Casting
                </Button>
              );
            }
          }}
        </ProductionAuthContext.Consumer>
        <Row>
          <Col md={6}>
            <h2>Casting by Character</h2>
            if (value === 'admin'){" "}
            {<div>Click on an actor's name to re-cast.</div>}
            <ul>{castings}</ul>
            <ProductionAuthContext.Consumer>
              {(value) => {
                if (value === "admin" && this.state.newCastingFormOpen) {
                  return (
                    <NewCasting
                      onFormClose={this.handleFormClose}
                      onFormSubmit={this.handleFormSubmit}
                      production={this.props.production}
                      users={availableActors}
                    />
                  );
                }
              }}
            </ProductionAuthContext.Consumer>
          </Col>
          <Col md={6}>
            <h2>Casting by Actor</h2>
            <ul>{castingByActor}</ul>
          </Col>
        </Row>
      </Col>
    );
  }
}

export default CastList;
