import { useEffect, useState } from "react";
import { Button } from "../../../Button.js";
import Confirm from "../../../Confirm.js";
import {
  FancyCheckBox,
  FancyCheckBoxLabel,
  FancyRadio,
} from "../../../Styled.js";
import { buildUserName } from "../../../../utils/actorUtils.js";

export default function ExtraUsers({
  extraUsers,
  onFormSubmit,
  updateCheckedUser,
}) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    setUsers(
      extraUsers.map((user) => {
        return { ...user, called: true };
      })
    );
  }, []);
  function submitForm() {
    onFormSubmit(users);
  }
  function updateCheckedUser(e) {
    const targetId = Number(e.target.id);
    let marked = users.map((user) => {
      if (user.id === targetId) {
        return { ...user, called: !user.called };
      } else {
        return user;
      }
    });
    setUsers(marked);
  }
  return (
    <Confirm>
      <em>
        The following actors are currently called, but they are not included in
        anything that is currently scheduled for this block. Uncheck them if you
        want to remove them from call.
      </em>
      <form>
        {users.map((user) => (
          <div key={user.id}>
            <FancyCheckBox htmlFor={user.id}>
              <FancyRadio
                type="checkbox"
                id={`${user.id}`}
                data-checked={user.called}
                checked={user.called}
                onChange={updateCheckedUser}
              />
              <FancyCheckBoxLabel>{buildUserName(user)}</FancyCheckBoxLabel>
            </FancyCheckBox>
          </div>
        ))}
        <Button onClick={submitForm}>Done</Button>
      </form>
    </Confirm>
  );
}
