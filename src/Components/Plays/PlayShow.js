import parse from "html-react-parser";
import { Link } from "react-router-dom";
import LoadingModal from "../LoadingModal";
import { usePlayState } from "../../lib/playState";

export default function PlayShow() {
  const { loading, play } = usePlayState();
  if (loading) {
    return <LoadingModal displayText="Loading play" />;
  } else {
    return (
      <div>
        <h2>
          {play.title}{" "}
          {!!play.author && (
            <span>
              by{" "}
              <Link to={`/authors/${play.author.id}`}>
                {play.author.first_name} {play.author.last_name}
              </Link>
            </span>
          )}
        </h2>
        <div>
          {play.canonical && (
            <div>
              <em> Canonical Version</em>
            </div>
          )}
          <div>{parse(`${play.synopsis}`)}</div>
          <div>{parse(`${play.text_notes}`)}</div>
        </div>
        <div>
          <ul>
            <li>
              <Link to={`/plays/${play.id}/text_breakdown`}>
                Act/Scene/French Scene breakdown
              </Link>
            </li>
            <li>
              <Link to={`/plays/${play.id}/character_breakdown`}>
                Character breakdown
              </Link>
            </li>
            <li>
              <Link to={`/`}>Character chart</Link>
            </li>
            <li>
              <Link to={`/plays/${play.id}/playscript`}>Edit script</Link>
            </li>
            <li>
              <Link to={`/plays/${play.id}/word_clouds`}>Make word clouds</Link>
            </li>
            <li>
              <Link to={`/plays/${play.id}/part_scripts`}>
                Make part scripts
              </Link>
            </li>
            <li>
              <Link to={`/`}>Download entire script</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

// import CharacterFormToggle from './Characters/CharacterFormToggle'
// import CharacterInfoTab from './Characters/CharacterInfoTab'

// import {filterEmptyContent} from '../../utils/playScriptUtils'

// class PlayShow extends Component {

//   constructor(props, context) {
//     super(props, context);
//     this.handleSelect = this.handleSelect.bind(this);

//     this.state = {
//       key: ''
//     };
//   }

//   handleDeleteClick = () => {
//     this.props.handleDeleteClick(this.props.play.id)
//   }

//   handleSelect(key) {
//     this.setState({
//       key
//     });
//   }

//   render() {

//     let characterTabs
//
//     if (this.props.play.characters) {
//       characterTabs = this.props.play.characters.map((character) =>
//         <Tab
//           eventKey={`character-${character.id}`}
//           key={`character-${character.id}`}
//           play={this.props.play}
//           title={`${character.name}`}
//         >
//         <CharacterInfoTab
//           character={character}
//           handleEditSubmit={this.props.handleCharacterEditFormSubmit}
//           onDeleteClick={this.props.handleCharacterDeleteClick}
//           play={this.props.play}
//         />
//       </Tab>
//       )
//     } else {
//       characterTabs = <div>No acts found</div>
//     }
//
//         <Row>
//           <h2>Characters</h2>
//         </Row>
//         <Row>
//           <CharacterFormToggle
//             isOpen={false}
//             onFormSubmit={this.props.handleCharacterCreateFormSubmit}
//             play_id={this.props.play.id}
//           />
//         </Row>
//         <Tabs
//           activeKey={this.state.key}
//           onSelect={this.handleSelect}
//           id="character-info-tabs"
//         >
//         {characterTabs}
//       </Tabs>
//       <Row>
//         <Link to={`${this.props.play.id}/playscripts/`}>
//           <Button variant="info">
//             Edit Script
//           </Button>
//         </Link>
//       </Row>
//       <Row>
//         <h2>Acts</h2>
//         </Row>
//         <Row>
//           <ActFormToggle
//             isOpen={false}
//             onFormSubmit={this.props.handleActCreateFormSubmit}
//             play={this.props.play}
//           />
//         </Row>
//         <Tabs
//           activeKey={this.state.key}
//           onSelect={this.handleSelect}
//           id="act-info-tabs"
//         >
//           {actTabs}
//         </Tabs>
//       </div>
//     )
//   }
// }

// PlayShow.propTypes = {
//   handleActCreateFormSubmit: PropTypes.func.isRequired,
//   handleActDeleteClick: PropTypes.func.isRequired,
//   handleActEditFormSubmit: PropTypes.func.isRequired,
//   handleCharacterCreateFormSubmit: PropTypes.func.isRequired,
//   handleCharacterDeleteClick: PropTypes.func.isRequired,
//   handleCharacterEditFormSubmit: PropTypes.func.isRequired,
//   handleEntranceExitCreateFormSubmit: PropTypes.func.isRequired,
//   handleEntranceExitDeleteClick: PropTypes.func.isRequired,
//   handleEntranceExitEditFormSubmit: PropTypes.func.isRequired,
//   handleFrenchSceneCreateFormSubmit: PropTypes.func.isRequired,
//   handleFrenchSceneDeleteClick: PropTypes.func.isRequired,
//   handleFrenchSceneEditFormSubmit: PropTypes.func.isRequired,
//   handleOnStageCreateFormSubmit: PropTypes.func.isRequired,
//   handleOnStageDeleteClick: PropTypes.func.isRequired,
//   handleOnStageEditFormSubmit: PropTypes.func.isRequired,
//   handleSceneCreateFormSubmit: PropTypes.func.isRequired,
//   handleSceneDeleteClick: PropTypes.func.isRequired,
//   handleSceneEditFormSubmit: PropTypes.func.isRequired,
//   handleDeleteClick: PropTypes.func.isRequired,
//   handleEditClick: PropTypes.func.isRequired,
//   play: PropTypes.object.isRequired,
// }

// export default PlayShow
