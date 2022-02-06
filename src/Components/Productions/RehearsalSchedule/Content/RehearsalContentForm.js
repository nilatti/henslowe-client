//1. form that asks if user wants to work with acts, scenes, or french scenes
//2. load acts, scenes, or french scenes
//3. make recommendations and mark up the content blocks (func organizeContent)
// recommendations based on:
// users in scene not available.
//4. organize content checks what users are not available, and recommends or doesn't recommend content depending on that.
//5. mark what else is scheduled for this time that is not the content type we're working with (contentNotToEdit). Make a list of it to display in "also rehearsing" (contentNotToEdit)
//6. take contentNotToEdit and mark anything within them as "rehearsing in part of another thing" in playContent. Remove from displayed checkboxes. In otherwords, if Act 1 is in contentNotToEdit and we're scheduling scenes, don't show any Act 1 scenes as options.
//7. if there is a change, figure out which of the users currently called are no longer in any called scenes (but are actors) and offer to remove them.
//tktktk make it scroll back up to the relevant element when the form closes
import _ from "lodash";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ExtraUsers from "./ExtraUsers.js";
import PlayContentCheckboxes from "./PlayContentCheckboxes.js";
import TextUnitSelector from "./TextUnitSelector.js";
import { Button } from "../../../Button.js";

import Modal from "../../../Modal.js";
import { Spinner } from "../../../Loaders.js";

import {
  getPlayActOnStages,
  getPlayFrenchSceneOnStages,
  getPlaySceneOnStages,
} from "../../../../api/plays.js";
import { useProductionState } from "../../../../lib/productionState.js";
import { buildUserName } from "../../../../utils/actorUtils.js";
import { unavailableUsers } from "../../../../utils/rehearsalUtils.js";

const ContentForm = styled.div`
  align-items: center;
  display: flex;
  flex: 1 1 0px;
  flex-flow: column nowrap;
  h4 {
    font-size: 1.25rem;
  }
`;

export default function RehearsalContentForm({
  onFormClose,
  onFormSubmit,
  rehearsal,
}) {
  const { actors, notActors, production } = useProductionState();
  const [confirmedExtraUsers, setConfirmedExtraUsers] = useState([]);
  const [confirmExtraUsers, setConfirmExtraUsers] = useState(false);
  const [extraUsers, setExtraUsers] = useState([]);
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  const [rehearsalContent, setRehearsalContent] = useState([]);
  const [rehearsalActors, setRehearsalActors] = useState([]);
  const [rehearsalNotActors, setRehearsalNotActors] = useState([]);
  const [playContent, setPlayContent] = useState([]);

  useEffect(async () => {
    loadOnStages(rehearsal.text_unit);
  }, []);

  useEffect(() => {
    let tempActorIds = actors.map((user) => user.id);
    let tempRehearsalActors = rehearsal.users.filter((user) =>
      tempActorIds.includes(user.id)
    );
    setRehearsalActors(tempRehearsalActors);
  }, [rehearsal.users]);

  useEffect(() => {
    let notActorsIds = notActors.map((user) => user.id);
    setRehearsalNotActors(
      rehearsal.users.filter((user) => notActorsIds.includes(user.id))
    );
    let tempExtraUsers = checkForExtraUsers();
    setExtraUsers(tempExtraUsers);
  }, [playContent, rehearsalContent]);

  useEffect(async () => {
    let scheduledContent = await organizePlayContent(playContent);
    setPlayContent(scheduledContent);
  }, [playContent?.length]);

  useEffect(() => {
    formatRehearsalContent();
  }, [rehearsalActors, rehearsalNotActors, confirmedExtraUsers, readyToSubmit]);

  useEffect(() => {
    setRehearsalContent(rehearsal[rehearsal.text_unit]);
  });

  function confirmExtraActors() {
    if (extraUsers.length > 0) {
      setConfirmExtraUsers(true);
    } else {
      setReadyToSubmit(true);
      formatRehearsalContent(rehearsal);
    }
  }

  function checkForExtraUsers() {
    if (playContent?.length > 0) {
      let newRehearsalContent = playContent.filter((item) => item.isScheduled);
      let actorsCalledInNew = mapOnStagesToUsers(actors, newRehearsalContent);
      let actorsCalledInNewIds = actorsCalledInNew.map((user) => user.id);
      let extraActors =
        rehearsalActors.filter(
          (user) => !actorsCalledInNewIds.includes(user.id)
        ) || [];
      return extraActors.map((actor) => {
        return { ...actor, called: true };
      });
    }
  }
  function formatRehearsalContent() {
    if (playContent?.length > 0) {
      let newRehearsalContent =
        playContent.filter((item) => item.isScheduled) || [];
      let uniqUserIds = processUsers(newRehearsalContent);
      let singularTextUnit = "";
      if (rehearsal.text_unit) {
        singularTextUnit =
          `${rehearsal.text_unit}`.substring(
            0,
            rehearsal.text_unit.length - 1
          ) + "_ids"; // annoying, have to drop it to singular to pass to rails
      }

      let newRehearsal = {
        ...rehearsal,
        id: rehearsal.id,
        text_unit: rehearsal.text_unit,
        user_ids: uniqUserIds,
        [`${singularTextUnit}`]: newRehearsalContent.map((item) => item.id),
      };
      if (readyToSubmit) {
        onFormSubmit(newRehearsal, false);
      }
    }
  }

  function mapOnStagesToUsers(actors, tempRehearsalContent) {
    let calledUsers =
      tempRehearsalContent.map((item) => {
        return item.find_on_stages.map((onStage) => {
          return _.find(actors, ["id", onStage.user_id]);
        });
      }) || [];
    calledUsers = _.flatten(calledUsers);
    calledUsers = _.uniq(calledUsers);
    calledUsers = _.compact(calledUsers);
    return calledUsers;
  }

  function markContentScheduled(tempPlayContent) {
    let rehearsalContentIds = rehearsalContent?.map((item) => item.id) || [];
    return (
      tempPlayContent.map((content) => {
        if (rehearsalContentIds.includes(content.id)) {
          return { ...content, isScheduled: true };
        } else {
          return { ...content, isScheduled: false };
        }
      }) || []
    );
  }

  function markContentUserUnavailable(tempContent, unavailableUsers) {
    //if a user is not available, mark content not recommended and put the user's name as the reason
    let unavailableUserIds = unavailableUsers.map((user) => user.id);
    return tempContent.map((item) => {
      let isRecommended = true;
      let reasonsForRecommendation = {
        unavailableUsers: [],
      };
      let contentUserIds = item.find_on_stages.map(
        (onStage) => onStage.user_id
      );
      let intersection = contentUserIds.filter((x) =>
        unavailableUserIds.includes(x)
      );
      if (intersection.length > 0) {
        let unavailableUsersInContent = intersection.map((i) =>
          _.find(unavailableUsers, { id: i })
        );
        isRecommended = false;
        unavailableUsersInContent.map((user) => {
          reasonsForRecommendation.unavailableUsers.push(user);
        });
      }
      return { ...item, isRecommended, reasonsForRecommendation };
    });
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
        let user = _.find(actors, ["id", userId]);
        return buildUserName(user);
      });
      callList = _.uniq(callList);
      callList = callList.sort();
      callList = callList.join(", ");
      return { ...item, furtherInfo: callList }; //this will let it easily pop into the furtherInfo slot in DraggableList
    });
    return tempContent;
  }

  function onTextUnitSubmit(newRehearsal) {
    onFormSubmit(newRehearsal, true);
    loadOnStages(newRehearsal.text_unit);
  }

  function processUsers(newRehearsalContent) {
    let newUsers = mapOnStagesToUsers(actors, newRehearsalContent);
    let allUsers = newUsers
      .concat(confirmedExtraUsers)
      .concat(rehearsalNotActors);
    let allUserIds = allUsers.map((user) => user.id);
    return _.uniq(allUserIds);
  }

  function updateCheckedContent(e) {
    const targetId = Number(e.target.id);
    let checked = !e.target.dataset.checked; //this will come through as the opposite of what it should be because data-checked hasn't been updated at the point when this is called
    let tempPlayContent = playContent.map((item) =>
      item.id === targetId ? { ...item, isScheduled: !item.isScheduled } : item
    );
    setPlayContent(tempPlayContent);
    let rehearsalItem = _.find(playContent, { id: targetId });
    if (checked) {
      setRehearsalContent(rehearsalContent.concat(rehearsalItem)); //add it to the rehearsal list if it's checked
    } else {
      setRehearsalContent(
        rehearsalContent.filter((item) => item.id != rehearsalItem.id)
      );
    }
  }

  function updateRehearsalUsers(extraUsers) {
    let extraUsersNotCalled = extraUsers.filter((user) => !user.called);
    let extraUsersNotCalledIds = extraUsersNotCalled.map((user) => user.id);
    let updatedUsers = rehearsal.users.filter((user) => {
      if (!extraUsersNotCalledIds.includes(user.id)) {
        return user;
      }
    });
    setConfirmedExtraUsers(extraUsers.filter((user) => user.called));
    setRehearsalActors(updatedUsers);
    setConfirmExtraUsers(false);
    setReadyToSubmit(true);
    formatRehearsalContent();
  }

  async function loadActOnStages(playId) {
    const response = await getPlayActOnStages(playId);
    if (response.status >= 400) {
      this.setState({
        errorStatus: "Error retrieving content",
      });
    } else {
      setPlayContent(response.data);
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
      setPlayContent(playContentData);
    }
  }
  async function loadOnStages(textUnit) {
    if (textUnit === "french_scenes") {
      setWorkingContent("french_scenes");
      loadFrenchSceneOnStages(production.play.id);
    } else if (textUnit === "scenes") {
      setWorkingContent("scenes");
      loadSceneOnStages(production.play.id);
    } else if (textUnit === "acts") {
      setWorkingContent("acts");
      loadActOnStages(production.play.id);
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
      setPlayContent(playContentData);
    }
  }

  async function organizePlayContent(tempContent) {
    let rehearsalUnavailableUsers = unavailableUsers(actors, rehearsal);
    let unavailableUsersMarked = markContentUserUnavailable(
      tempContent,
      rehearsalUnavailableUsers
    );
    let scheduledContentMarked = markContentScheduled(unavailableUsersMarked);
    return markItemCallList(scheduledContentMarked);
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
    let organizedRehearsalContent = await organizePlayContent(playContent);
    setRehearsalContent(organizedRehearsalContent);
  }
  //first figure out what level of content we want to rehearse (act, scene, french scene)
  if (!rehearsal.text_unit) {
    return (
      <TextUnitSelector
        onFormClose={onFormClose}
        onFormSubmit={onTextUnitSubmit}
        rehearsal={rehearsal}
      />
    );
  }
  if (
    playContent &&
    playContent.length &&
    playContent[0].hasOwnProperty("isRecommended")
  ) {
    return (
      <>
        <ContentForm>
          {confirmExtraUsers && (
            <ExtraUsers
              extraUsers={extraUsers}
              onFormSubmit={updateRehearsalUsers}
            />
          )}
          <form>
            <PlayContentCheckboxes
              playContent={playContent}
              onChange={updateCheckedContent}
            />
          </form>

          <Button onClick={confirmExtraActors}>Schedule this content</Button>

          <Button type="button" onClick={onFormClose} block>
            Cancel
          </Button>
        </ContentForm>
      </>
    );
  }
  return (
    <Modal>
      <h1>Loading!</h1>
      <Spinner />
    </Modal>
  );
}
