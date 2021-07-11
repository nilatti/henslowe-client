import _ from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";
import uuid from "react-uuid";
import Modal from "../Modal";
import { Spinner } from "../Loaders";
import {
  filterEmptyContent,
  getFrenchScenesFromPlay,
  getOnStagesFromAct,
  getOnStagesFromScene,
  getScenesFromPlay,
} from "../../utils/playScriptUtils";
import { buildUserName } from "../../utils/actorUtils";

const TableStyle = styled.table`
  width: 100%;
  width: ${(props) => (props.level === "french_scene" ? "1400%" : "250%")};
  table-layout: fixed;

  tr:nth-child(odd) {
    background-color: white;
  }

  tr:nth-child(even) {
    background-color: var(--color-background);
  }
  tr:hover {
    background-color: var(--color-light);
  }
  td,
  th {
    border: 1px solid var(--color-dark);
    overflow: hidden;
    padding: 5px;
    text-overflow: ellipsis;
    word-break: break-all;
    word-wrap: break-word;
  }
`;
export default function DoublingChartShow({
  level,
  production,
  castings,
  actors,
}) {
  const [headRow, setHeadRow] = useState();
  const [rows, setRows] = useState([]);
  const [uncast, setUncast] = useState([]);

  useEffect(() => {
    if (production.play?.acts?.length) {
      let newHeadRow = generateColumns();
      setHeadRow(newHeadRow);
    }
  }, [JSON.stringify(production)]);

  useEffect(() => {
    if (production.play?.acts?.length) {
      console.log(61);
      let newRows = actors.map((actor) => generateRow(actor));
      let newUncast = generateUncastRow(castings);
      setRows(newRows);
      setUncast(newUncast);
    }
  }, [
    JSON.stringify(castings),
    JSON.stringify(actors),
    JSON.stringify(production),
  ]);

  function getOnStages() {
    let onStages = [];
    if (level == "act") {
      filterEmptyContent(production.play.acts).map((act) => {
        onStages.push(getOnStagesFromAct(act));
      });
    } else if (level == "scene") {
      filterEmptyContent(production.play.acts).map((act) => {
        filterEmptyContent(act.scenes).map((scene) => {
          onStages.push(getOnStagesFromScene(scene));
        });
      });
    } else if (level == "french_scene") {
      filterEmptyContent(production.play.acts).map((act) => {
        filterEmptyContent(act.scenes).map((scene) => {
          filterEmptyContent(scene.french_scenes).map((frenchScene) => {
            onStages.push(frenchScene.on_stages);
          });
        });
      });
    }
    return onStages;
  }
  function generateColumns() {
    let headings = [];
    if (level == "act") {
      filterEmptyContent(production.play.acts).map((act) =>
        headings.push(`Act ${act.number}`)
      );
    } else if (level == "scene") {
      filterEmptyContent(getScenesFromPlay(production.play)).map((scene) =>
        headings.push(scene.pretty_name)
      );
    } else if (level == "french_scene") {
      filterEmptyContent(getFrenchScenesFromPlay(production.play)).map(
        (frenchScene) => headings.push(frenchScene.pretty_name)
      );
    }
    return headings.map((heading) => <th key={uuid()}>{heading}</th>);
  }

  function generateRow(actor) {
    console.log(actor);
    let blocks = getOnStages();
    let actorJobs = actor.jobs;
    let actorCharacterIds = actorJobs.map((job) => job.character_id);
    let rowData = blocks.map((block) => {
      let blockCharacters = [];
      let doublingProblem = "";
      block.map((onStage) => {
        if (_.includes(actorCharacterIds, onStage.character_id)) {
          blockCharacters.push(onStage);
        }
      });
      let uniqBlockCharacters = _.uniqBy(blockCharacters, function (onStage) {
        return onStage.character.id;
      });
      let blockCharactersNames = _.map(uniqBlockCharacters, function (onStage) {
        if (onStage.nonspeaking) {
          return "(" + onStage.character.name + ")";
        } else {
          return onStage.character.name;
        }
      });
      if (uniqBlockCharacters.length > 1) {
        doublingProblem = "doubling-problem";
      }
      return (
        <td key={uuid()} className={doublingProblem}>
          {_.join(blockCharactersNames, ",")}
        </td>
      );
    });
    let row = (
      <tr key={uuid()}>
        <td>{buildUserName(actor)}</td>
        {rowData}
      </tr>
    );
    return row;
  }

  function generateUncastRow(castings) {
    let blocks = getOnStages();
    let jobsThatAreNotCast = _.filter(castings, function (job) {
      return (
        job.character &&
        !job.character.name.match(/Could Not Find Character/) &&
        !job.user_id
      );
    });
    let uncastCharacterIds = jobsThatAreNotCast.map((job) => job.character_id);
    let rowData = blocks.map((block) => {
      let blockCharacters = [];
      block.map((onStage) => {
        if (_.includes(uncastCharacterIds, onStage.character_id)) {
          blockCharacters.push(onStage.character);
        }
      });

      let uniqBlockCharacters = _.uniqBy(blockCharacters, "id");
      let blockCharactersNames = _.map(uniqBlockCharacters, "name");
      return <td key={uuid()}>{_.join(blockCharactersNames, ",\n")}</td>;
    });
    let row = (
      <tr key={uuid()}>
        <td>Still to cast</td>
        {rowData}
      </tr>
    );
    return row;
  }

  if (!production.play?.acts || !actors.length || !castings.length) {
    return (
      <Modal>
        <h1>Loading!</h1>
        <Spinner />
      </Modal>
    );
  }

  return (
    <TableStyle level={level}>
      <thead>
        <tr>
          <th>Actor</th>
          {headRow}
        </tr>
      </thead>
      <tbody>
        {rows}
        {uncast}
      </tbody>
    </TableStyle>
  );
}
