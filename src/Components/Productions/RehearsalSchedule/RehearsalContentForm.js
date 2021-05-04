//1. form that asks if user wants to work with acts, scenes, or french scenes
//2. load acts, scenes, or french scenes
//3. make recommendations and mark up the content blocks (func organizeContent)
// recommendations based on:
// users in scene not available.
//4. organize content checks what users are not available, and recommends or doesn't recommend content depending on that.
//5. mark what else is scheduled for this time that is not the content type we're working with (contentNotToEdit). Make a list of it to display in "also rehearsing" (contentNotToEdit)
//6. take contentNotToEdit and mark anything within them as "rehearsing in part of another thing" in playContent. Remove from displayed checkboxes. In otherwords, if Act 1 is in contentNotToEdit and we're scheduling scenes, don't show any Act 1 scenes as options.

import _ from "lodash";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import { useForm } from "../../../hooks/environmentUtils";
import { buildUserName } from "../../../utils/actorUtils";
import { unavailableUsers } from "../../../utils/rehearsalUtils";
import { useProductionState } from "../../../lib/productionState";

import {
  getPlayActOnStages,
  getPlayFrenchSceneOnStages,
  getPlaySceneOnStages,
} from "../../../api/plays.js";

export default function RehearsalContentForm({
  onFormClose,
  onFormSubmit,
  rehearsal,
}) {
  const { hiredUsers, production } = useProductionState();
  const [buttonsEnabled, setButtonsEnabled] = useState(false);
  const [rehearsalContent, setRehearsalContent] = useState([]);
  const [contentNotToEdit, setContentNotToEdit] = useState([]);
  const [contentNotToEditList, setContentNotToEditList] = useState("");
  const [playContent, setPlayContent] = useState([]);
  const [radiosEnabled, setRadiosEnabled] = useState(true);
  const { inputs, handleChange } = useForm(
    rehearsal || {
      textUnit: "",
    }
  );

  const possibleTextUnits = ["acts", "scenes", "french_scenes"];

  useEffect(() => {
    setPlayContent(markContentScheduled);
  }, [rehearsalContent, playContent.length]);

  useEffect(() => {
    setNonworkingContent(inputs.textUnit);
  }, [buttonsEnabled]);

  useEffect(() => {
    setContentNotToEditList(listNotEditingContent(contentNotToEdit));
    let markedPlayContent = markContentIncludedInParent(playContent);
    setPlayContent(markedPlayContent);
  }, [contentNotToEdit, playContent.length]);

  function formatRehearsalContent(e) {
    let newUsers = mapOnStagesToUsers(hiredUsers, rehearsalContent);
    let currentUsers = rehearsal.users;
    let allUsers = newUsers.concat(currentUsers);
    let newRehearsalContent = playContent.filter((item) => item.isScheduled);
    let singularTextUnit =
      `${inputs.textUnit}`.substring(0, inputs.textUnit.length - 1) + "_ids"; // annoying, have to drop it to singular to pass to rails
    let newRehearsal = {
      id: rehearsal.id,
      user_ids: allUsers.map((user) => user.id),
      [`${singularTextUnit}`]: newRehearsalContent.map((item) => item.id),
    };
    onFormClose();
    onFormSubmit(newRehearsal);
  }

  function listNotEditingContent() {
    let notEditing = [];
    possibleTextUnits.forEach((unit) => {
      if (contentNotToEdit[unit]) {
        contentNotToEdit[unit].map((item) => {
          notEditing = _.concat(notEditing, item.pretty_name || item.heading);
        });
      }
    });
    return _.join(notEditing, ", ");
  }
  async function loadOnStages(e, rehearsalContent) {
    e.preventDefault();
    setNonworkingContent(inputs.textUnit);
    if (inputs.textUnit === "french_scenes") {
      await setWorkingContent("french_scenes");
      loadFrenchSceneOnStages(production.play.id);
    } else if (inputs.textUnit === "scenes") {
      await setWorkingContent("scenes");
      loadSceneOnStages(production.play.id);
    } else if (inputs.textUnit === "acts") {
      await setWorkingContent("acts", rehearsalContent);
      loadActOnStages(production.play.id, rehearsalContent);
    }
  }

  function mapOnStagesToUsers(hiredUsers, rehearsalContent) {
    let calledUsers = rehearsalContent.map((item) => {
      return item.find_on_stages.map((onStage) => {
        return _.find(hiredUsers, ["id", onStage.user_id]);
      });
    });
    calledUsers = _.flatten(calledUsers);
    calledUsers = _.uniq(calledUsers);
    calledUsers = _.compact(calledUsers);
    console.log(calledUsers);
    return calledUsers;
  }

  function markContentIncludedInParent(tempContent) {
    if (inputs.textUnit === "acts") {
      return tempContent;
    }
    let actsNotToEdit = contentNotToEdit["acts"]?.map((act) => act.id) || [];
    let allScenesForActsNotToEdit = contentNotToEdit["acts"]?.map((act) => {
      return act.scenes.map((scene) => scene.id);
    });
    let scenesNotToEdit =
      contentNotToEdit["scenes"]?.map((scene) => scene.id) || [];
    scenesNotToEdit = _.flatten(
      _.concat(allScenesForActsNotToEdit, scenesNotToEdit)
    );
    return tempContent.map((item) => {
      if (actsNotToEdit && actsNotToEdit.includes(item.act_id)) {
        return { ...item, isIncludedInParent: true };
      } else if (scenesNotToEdit && scenesNotToEdit.includes(item.scene_id)) {
        return { ...item, isIncludedInParent: true };
      } else {
        return item;
      }
    });
  }

  function markContentRecommended(tempContent) {
    //have to mark content as recommended or not bc there is a function that marks it all as false, but not one that marks it as true
    return tempContent.map((content) => {
      if (content.hasOwnProperty("isRecommended")) {
        return content;
      } else {
        return { ...content, isRecommended: true };
      }
    });
  }

  function markContentScheduled(tempPlayContent) {
    let rehearsalContentIds = rehearsalContent.map((item) => item.id);
    return tempPlayContent.map((content) => {
      if (rehearsalContentIds.includes(content.id)) {
        return { ...content, isScheduled: true };
      } else {
        return { ...content, isScheduled: false };
      }
    });
  }

  function markContentUserUnavailable(tempContent, unavailableUsers) {
    //if a user is not available, mark content not recommended and put the user's name as the reason
    unavailableUsers.map((unavailableUser) => {
      tempContent = tempContent.map((item) => {
        let contentUsers = item.find_on_stages.map(
          (on_stage) => on_stage.user_id
        );
        if (contentUsers.includes(unavailableUser.id)) {
          let reasonForRecommendation = "";
          if (item.reasonForRecommendation) {
            // tk add a thing t splice in and add more names if we have multiple "is not available"
            reasonForRecommendation += item.reasonForRecommendation;
          }
          reasonForRecommendation +=
            buildUserName(unavailableUser) + " is not available.";
          return {
            ...item,
            isRecommended: false,
            reasonForRecommendation: reasonForRecommendation,
          };
        } else {
          return { ...item, isRecommended: true };
        }
      });
    });
    return tempContent;
  }

  function markItemCallList(tempContent) {
    //who is called for this item?
    tempContent = tempContent.map((item) => {
      let callList = [];
      let contentUsers = item.find_on_stages?.map(
        (on_stage) => on_stage.user_id
      );
      contentUsers = _.compact(contentUsers);
      callList = _.concat(callList, contentUsers);
      callList = callList.map((userId) => {
        let user = _.find(hiredUsers, ["id", userId]);
        return buildUserName(user);
      });
      callList = callList.sort();
      callList = callList.join(", ");
      return { ...item, furtherInfo: callList }; //this will let it easily pop into the furtherInfo slot in DraggableList
    });
    return tempContent;
  }

  async function organizeContent(tempContent) {
    let rehearsalUnavailableUsers = unavailableUsers(hiredUsers, rehearsal);
    let unavailableUsersMarked = markContentUserUnavailable(
      tempContent,
      rehearsalUnavailableUsers
    );
    let recommendedContentMarked = markContentRecommended(
      unavailableUsersMarked
    );
    let scheduledContentMarked = markContentScheduled(recommendedContentMarked);
    return markItemCallList(scheduledContentMarked);
  }

  function processChangeAndEnableLoad(e) {
    handleChange(e);
    setButtonsEnabled(true);
  }

  function setNonworkingContent(workingContent) {
    let nonworkingContentTypes = possibleTextUnits.filter(
      (textUnit) => textUnit != workingContent
    );
    let newNonworkingContent = {};
    nonworkingContentTypes.map((item) => {
      newNonworkingContent[item] = rehearsal[item];
    });
    setContentNotToEdit(newNonworkingContent);
  }

  async function setWorkingContent(workingContentType) {
    ///string name of content type eg 'acts', 'scenes' etc
    let workingContent = rehearsal[workingContentType];
    if (
      workingContentType == "french_scenes" ||
      workingContentType == "scenes"
    ) {
      workingContent.map((item) => (item.heading = item.pretty_name));
    }
    let organizedRehearsalContent = await organizeContent(
      workingContent,
      rehearsalContent
    );
    setRehearsalContent(organizedRehearsalContent);
  }

  function updateCheckedContent(e) {
    const targetId = Number(e.target.id);
    // const playItem = playContent.find((item) => item.id === targetId);
    setPlayContent(
      playContent.map((item) =>
        item.id === targetId
          ? { ...item, isScheduled: !item.isScheduled }
          : item
      )
    );
  }

  async function loadActOnStages(playId, rehearsalContent) {
    const response = await getPlayActOnStages(playId);
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error retrieving content",
      });
    } else {
      let organizedPlayContent = await organizeContent(response.data);
      setPlayContent(organizedPlayContent);
    }
  }

  async function loadFrenchSceneOnStages(playId) {
    const response = await getPlayFrenchSceneOnStages(playId);
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error retrieving content",
      });
    } else {
      let playContentData = response.data.map((french_scene) => {
        return {
          ...french_scene,
          heading: french_scene.pretty_name,
        };
      });
      let organizedPlayContent = await organizeContent(playContentData);
      setPlayContent(organizedPlayContent);
    }
  }

  async function loadSceneOnStages(playId) {
    const response = await getPlaySceneOnStages(playId);
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error retrieving content",
      });
    } else {
      let playContentData = response.data.map((scene) => {
        return {
          ...scene,
          heading: scene.pretty_name,
        };
      });
      let organizedPlayContent = await organizeContent(playContentData);
      setPlayContent(organizedPlayContent);
    }
  }
  if (
    playContent &&
    playContent.length &&
    playContent[0].hasOwnProperty("isRecommended")
  ) {
    let playContentCheckboxes = playContent.map((item) => {
      if (!item.isIncludedInParent) {
        return (
          <div key={item.id}>
            <Form.Check
              type="checkbox"
              id={`${item.id}`}
              key={`${item.id}`}
              label={`${item.heading}`}
              checked={item.isScheduled}
              onChange={updateCheckedContent}
            />
            <p>{item.furtherInfo}</p>
          </div>
        );
      }
    });
    return (
      <Col>
        <Col>
          <p>Also rehearsing {contentNotToEditList}.</p>
        </Col>
        <Row>
          <Form>{_.compact(playContentCheckboxes)}</Form>
        </Row>
        <Row>
          <Button onClick={formatRehearsalContent}>
            Schedule this content
          </Button>
        </Row>
        <Button type="button" onClick={onFormClose} block>
          Cancel
        </Button>
      </Col>
    );
  }
  //first figure out what level of content we want to rehearse (act, scene, french scene)
  return (
    <Col
      md={{
        span: 8,
        offset: 2,
      }}
    >
      <h2>How do you want to schedule this rehearsal?</h2>
      <Form onSubmit={(e) => loadOnStages(e)}>
        <Form.Group as={Form.Row}>
          <Form.Label as="legend">Unit of text</Form.Label>
          <Col sm={10} className="form-radio">
            <Form.Check
              checked={inputs.textUnit === "french_scenes"}
              disabled={!radiosEnabled}
              id="french_scene"
              label="French Scene"
              name="textUnit"
              onChange={(e) => processChangeAndEnableLoad(e)}
              type="radio"
              value="french_scenes"
            />
            <Form.Check
              checked={inputs.textUnit === "scenes"}
              disabled={!radiosEnabled}
              id="scene"
              label="Scene"
              name="textUnit"
              onChange={(e) => processChangeAndEnableLoad(e)}
              type="radio"
              value="scenes"
            />
            <Form.Check
              checked={inputs.textUnit === "acts"}
              disabled={!radiosEnabled}
              id="act"
              label="Act"
              name="textUnit"
              onChange={(e) => processChangeAndEnableLoad(e)}
              type="radio"
              value="acts"
            />
          </Col>
        </Form.Group>
        <Button
          disabled={!buttonsEnabled}
          type="submit"
          variant="primary"
          block
        >
          Load Text Options
        </Button>
        <Button type="button" onClick={onFormClose} block>
          Cancel
        </Button>
      </Form>
    </Col>
  );
}
