import { Tab, Tabs } from "react-bootstrap";
import TextInfo from "./TextInfo";

export default function FrenchSceneInfoTab({ frenchScene, prettyName }) {
  return (
    <div>
      <TextInfo
        item={frenchScene}
        type="french scene"
        prettyName={prettyName}
      />
      <div>
        <h3>Characters</h3>
      </div>
      {/* <Row>
              <ul>
                <OnStagesList
                  actId={this.props.actId}
                  frenchSceneId={frenchScene.id}
                  handleOnStageCreateFormSubmit={this.props.handleOnStageCreateFormSubmit}
                  onDeleteClick={this.props.handleOnStageDeleteClick}
                  handleOnStageEditFormSubmit={this.props.handleOnStageEditFormSubmit}
                  play={this.props.play}
                  sceneId={this.props.sceneId}
                />
              </ul>
            </Row>
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
