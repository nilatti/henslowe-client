import PropTypes from "prop-types";
import React, { Component } from "react";

import { Button } from "react-bootstrap";

import _ from "lodash";

import NewOnStageForm from "./NewOnStageForm";
import OnStageShow from "./OnStageShow";

class OnStagesList extends Component {
  state = {
    newOnStageFormOpen: false,
    onStages: [],
  };

  toggleForm = () => {
    this.setState({ newOnStageFormOpen: !this.state.newOnStageFormOpen });
  };

  render() {
    let act = _.find(this.props.play.acts, { id: this.props.actId });
    let scene = _.find(act.scenes, { id: this.props.sceneId });
    let frenchScene = _.find(scene.french_scenes, {
      id: this.props.frenchSceneId,
    });
    let onStages = <div>No onstage characters</div>;
    if (frenchScene.on_stages) {
      let orderedOnStages = _.orderBy(frenchScene.on_stages, "character.name");
      onStages = orderedOnStages.map((onStage) => (
        <li key={onStage.id}>
          <OnStageShow
            actId={this.props.actId}
            frenchSceneId={this.props.frenchSceneId}
            onDeleteClick={this.props.onDeleteClick}
            play={this.props.play}
            onEdit={this.props.handleOnStageEditFormSubmit}
            onStage={onStage}
            sceneId={this.props.sceneId}
          />
        </li>
      ));
    }
    return (
      <div>
        <h3>On Stages</h3>
        <p>
          <em>Click to edit</em>
        </p>
        <ul>{onStages}</ul>
        {this.state.newOnStageFormOpen ? (
          <NewOnStageForm
            actId={this.props.actId}
            characters={this.props.play.characters}
            frenchSceneId={this.props.frenchSceneId}
            onFormClose={this.toggleForm}
            onFormSubmit={this.props.handleOnStageCreateFormSubmit}
            play={this.props.play}
            sceneId={this.props.sceneId}
          />
        ) : (
          <Button onClick={this.toggleForm}>Add New</Button>
        )}
      </div>
    );
  }
}

OnStagesList.propTypes = {
  actId: PropTypes.number.isRequired,
  frenchSceneId: PropTypes.number.isRequired,
  handleOnStageCreateFormSubmit: PropTypes.func.isRequired,
  handleOnStageEditFormSubmit: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  sceneId: PropTypes.number.isRequired,
  play: PropTypes.object.isRequired,
};

export default OnStagesList;
