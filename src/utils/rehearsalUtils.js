import { Link } from "react-router-dom";
import { buildUserName } from "./actorUtils.js";
import { DATE_TIME_FORMAT, TIME_FORMAT } from "../utils/hardcodedConstants.js";

function unavailableUsers(users, rehearsal) {
  let usersHaveConflicts = users.filter(
    (user) => user.conflicts && user.conflicts.length > 0
  );
  let unavailableUsers = usersHaveConflicts.map((user) => {
    let conflicts_with_this_rehearsal = 0;
    user.conflicts.map((conflict) => {
      if (
        conflict.start_time <= rehearsal.end_time &&
        rehearsal.start_time <= conflict.end_time
      ) {
        conflicts_with_this_rehearsal += 1;
      }
    });
    if (conflicts_with_this_rehearsal > 0) {
      return user;
    }
  });
  return unavailableUsers.filter(Boolean);
}

function rehearsalContent({ acts, frenchScenes, scenes }) {
  let content = [];
  if (acts && acts.length) {
    acts.map((item) => content.push(item.heading));
  }
  if (scenes && scenes.length) {
    scenes.map((item) => content.push(item.pretty_name));
  }
  if (frenchScenes && frenchScenes.length) {
    frenchScenes.map((item) => content.push(item.pretty_name));
  }
  content = content.sort();
  return content;
}

function upcomingRehearsalsList({ rehearsals, timezone }) {
  let dateRangeStart = new Date();
  dateRangeStart = dateRangeStart.setDate(dateRangeStart.getDate() - 1);
  let dateRangeEnd = new Date();
  dateRangeEnd = dateRangeEnd.setDate(dateRangeEnd.getDate() + 7);
  return rehearsals
    .filter(
      (rehearsal) =>
        new Date(rehearsal.start_time) > dateRangeStart &&
        new Date(rehearsal.start_time) < dateRangeEnd
    )
    .sort((a, b) => (a.start_time > b.start_time ? 1 : -1))
    .map((rehearsal) => (
      <tr key={rehearsal.id}>
        <td>
          <DisplayTimeRange
            end_time={rehearsal.end_time}
            start_time={rehearsal.start_time}
            timezone={timezone}
          />
        </td>
        <td>{rehearsal.space && <span>{rehearsal.space.name}</span>}</td>
        <td>{rehearsal.title && <strong>{rehearsal.title}</strong>}</td>
        <td>{rehearsal.notes && <span>{rehearsal.notes}</span>}</td>
        <td>
          {rehearsalContent({
            acts: rehearsal.acts,
            frenchScenes: rehearsal.french_scenes,
            scenes: rehearsal.scenes,
          }).join(", ")}
        </td>
        <td>
          <ul>
            {rehearsal.users.map((user) => (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>{buildUserName(user)}</Link>
              </li>
            ))}
          </ul>
        </td>
      </tr>
    ));
}

export { rehearsalContent, upcomingRehearsalsList, unavailableUsers };
