import _ from "lodash";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styled from "styled-components";

import PeopleCheckboxes from "./PeopleCheckboxes.js";
import { Button } from "../../../Button.js";
import { useProductionState } from "../../../../lib/productionState.js";

const PeopleForm = styled.div`
  align-items: center;
  display: flex;
  flex-flow: column nowrap;
  flex: 1 1 0;
`;
export default function RehearsalPeopleForm({
  calledUsers,
  onFormClose,
  onFormSubmit,
  rehearsal,
}) {
  const { hiredUsers } = useProductionState();
  const [productionArtists, setProductionArtists] = useState(hiredUsers);

  useEffect(() => {
    let calledForScenes = markCalledForScenes(productionArtists);
    let unavailableUsers = markUnavailable(calledForScenes);
    setProductionArtists(unavailableUsers);
  }, []);

  function formatRehearsalPeople(e) {
    let newRehearsal = {
      ...rehearsal,
      id: rehearsal.id,
      user_ids: productionArtists.map((user) => {
        if (user.isCalled) {
          return user.id;
        }
      }),
    };
    onFormSubmit(newRehearsal);
    onFormClose();
  }

  function markCalledForScenes(usersArr) {
    let calledUsersIds = calledUsers.map((user) => user.id);
    return usersArr.map((user) => {
      if (calledUsersIds.includes(user.id)) {
        return { ...user, isCalled: true };
      } else {
        return { ...user, isCalled: false };
      }
    });
  }

  function markUnavailable(usersArr) {
    return usersArr.map((user) => {
      if (user?.conflicts?.length === 0) {
        return { ...user, isAvailable: true };
      } else {
        let conflictsWithThisRehearsal = 0;
        user?.conflicts?.map((conflict) => {
          if (
            conflict.start_time <= rehearsal.end_time &&
            rehearsal.start_time <= conflict.end_time
          ) {
            conflictsWithThisRehearsal += 1;
          }
        });
        if (conflictsWithThisRehearsal <= 0) {
          return { ...user, isAvailable: false };
        } else {
          return { ...user, isAvailable: true };
        }
      }
    });
  }

  function updateCheckedContent(e) {
    const targetId = Number(e.target.id);
    setProductionArtists(
      productionArtists.map((item) =>
        item.id === targetId ? { ...item, isCalled: !item.isCalled } : item
      )
    );
  }

  if (productionArtists[0].hasOwnProperty("isCalled"))
    return (
      <PeopleForm>
        <form>
          <PeopleCheckboxes
            onChange={updateCheckedContent}
            users={productionArtists}
          />
        </form>

        <Button onClick={formatRehearsalPeople}>Schedule these folks</Button>

        <Button
          backgroundColor={"var(--cancel-button-background-color)"}
          borderColor={"var(--cancel-button-border-color)"}
          colorProp={"var(--cancel-button-color)"}
          onClick={onFormClose}
        >
          Cancel
        </Button>
      </PeopleForm>
    );
  return <div>Loading</div>;
}
