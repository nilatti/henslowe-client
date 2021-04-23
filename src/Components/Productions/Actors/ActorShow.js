import PropTypes from "prop-types";
import React, { Component } from "react";
import { Col } from "react-bootstrap";

import _ from "lodash";

import ActorTrack from "./ActorTrack";
import { buildUserName } from "../../../utils/actorUtils";
class ActorShow extends Component {
  state = {
    showActorTrack: false,
  };

  toggleShowActorTrack = () => {
    this.setState({
      showActorTrack: !this.state.showActorTrack,
    });
  };

  actingJobs(jobs) {
    let acting = jobs.filter((job) => job.specialization.title === "Actor");
    acting = acting.map((job) => {
      if (job.character) {
        return job.character.name;
      } else {
        return;
      }
    });
    acting = _.compact(acting);
    let joined = _.join(acting, ", ");
    return joined;
  }

  render() {
    let actingJobs = this.actingJobs(this.props.actorObj.jobs);
    return (
      <Col md={12}>
        <strong>
          {buildUserName(this.props.actorObj.actor)}: {actingJobs}
        </strong>
        <br />
        {/* 
      {
        this.state.showActorTrack
        ?
        <>
        <span onClick={this.toggleShowActorTrack}><em>(hide actor track)</em></span>
        <ActorTrack
          production={this.props.production}
          roles={this.props.actorObj.jobs}
        />
        </>
        :
        <span onClick={this.toggleShowActorTrack}><em>(show actor track)</em></span>
      } */}
      </Col>
    );
  }
}

ActorShow.propTypes = {
  actorObj: PropTypes.object.isRequired,
  production: PropTypes.object.isRequired,
};

export default ActorShow;
