import _ from "lodash";
import {
  FancyCheckBox,
  FancyCheckBoxLabel,
  FancyRadio,
} from "../../../Styled.js";

import { buildUserName } from "../../../../utils/actorUtils.js";

export default function PeopleCheckboxes({ onChange, users }) {
  function sortUsers(users) {
    return _.sortBy(users, ["first_name"]);
  }
  let tempUsers = sortUsers(users);
  return _.compact(
    tempUsers.map((item) => {
      return (
        <div key={item.id}>
          <FancyCheckBox htmlFor={item.id}>
            <FancyRadio
              type="checkbox"
              id={`${item.id}`}
              data-checked={item.isCalled}
              checked={item.isCalled || ""}
              onChange={onChange}
              value={item.id}
            />
            <FancyCheckBoxLabel>{buildUserName(item)}</FancyCheckBoxLabel>
          </FancyCheckBox>
        </div>
      );
    })
  );
}
