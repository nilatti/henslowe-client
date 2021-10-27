import TextInfo from "./TextInfo";
import OnStagesList from "./OnStages/OnStagesList";

export default function FrenchSceneInfoTab({ actId, frenchScene, prettyName }) {
  return (
    <div>
      <TextInfo
        item={frenchScene}
        type="french_scene"
        prettyName={prettyName}
      />
      <div>
        <h3>Characters</h3>
      </div>
      <div>
        <ul>
          <OnStagesList
            actId={actId}
            frenchScene={frenchScene}
            // handleOnStageCreateFormSubmit={
            //   this.props.handleOnStageCreateFormSubmit
            // }
            // onDeleteClick={this.props.handleOnStageDeleteClick}
            // handleOnStageEditFormSubmit={this.props.handleOnStageEditFormSubmit}
            // play={this.props.play}
            sceneId={frenchScene.scene_id}
          />
        </ul>
      </div>
      {/*
            {
              !this.props.play.canonical
              ? <Row>
                <EntranceExitList
                  actId={this.props.actId}
                  frenchSceneId={frenchScene.id}
                  handleEntranceExitCreateFormSubmit={this.props.handleEntranceExitCreateFormSubmit}
                  onDeleteClick={this.props.handleEntranceExitDeleteClick}
                  handleEntranceExitEditFormSubmit={this.props.handleEntranceExitEditFormSubmit}
                  play={this.props.play}
                  production={this.props.production}
                  sceneId={this.props.sceneId}
                />
              </Row>
              : <span></span>
    
            } */}
    </div>
  );
}
