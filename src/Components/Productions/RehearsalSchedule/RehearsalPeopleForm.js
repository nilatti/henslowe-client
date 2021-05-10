import _ from "lodash";
import PropTypes from "prop-types";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useProductionState } from "../../../lib/productionState";
import { buildUserName } from "../../../utils/actorUtils";

const PeopleForm = styled.div`
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
    let sortedUsers = sortUsers(unavailableUsers);
    setProductionArtists(sortedUsers);
  }, []);

  function formatRehearsalPeople(e) {
    let newRehearsal = {
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
      if (user.conflicts.length === 0) {
        return { ...user, isAvailable: true };
      } else {
        let conflicts_with_this_rehearsal = 0;
        user.conflicts.map((conflict) => {
          if (
            conflict.start_time <= rehearsal.end_time &&
            rehearsal.start_time <= conflict.end_time
          ) {
            conflicts_with_this_rehearsal += 1;
          }
        });
        if (conflicts_with_this_rehearsal <= 0) {
          return { ...user, isAvailable: false };
        } else {
          return { ...user, isAvailable: true };
        }
      }
    });
  }

  function sortUsers(users) {
    return _.sortBy(users, ["first_name"]);
  }

  function updateCheckedContent(e) {
    const targetId = Number(e.target.id);
    setProductionArtists(
      productionArtists.map((item) =>
        item.id === targetId ? { ...item, isCalled: !item.isCalled } : item
      )
    );
  }

  let userContentCheckboxes = productionArtists.map((item) => {
    return (
      <div key={item.id}>
        <Form.Check
          type="checkbox"
          id={`${item.id}`}
          key={`${item.id}`}
          label={`${buildUserName(item)}`}
          checked={item.isCalled || ""}
          onChange={updateCheckedContent}
          value={item.isCalled || ""}
        />
        <p>{item.furtherInfo}</p>
      </div>
    );
  });

  return (
    <PeopleForm>
      <Form>{_.compact(userContentCheckboxes)}</Form>

      <Button onClick={formatRehearsalPeople}>Schedule these folks</Button>

      <Button type="button" onClick={onFormClose} block>
        Cancel
      </Button>
    </PeopleForm>
  );
}
