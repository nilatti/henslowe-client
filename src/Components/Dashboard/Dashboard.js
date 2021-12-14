import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Spinner } from "../Loaders";
import Modal from "../Modal";
import { DefaultTable } from "../Styled";
import { ConflictStateProvider } from "../../lib/conflictState";
import ConflictsList from "../Conflicts/ConflictsList";
import { USER_CONFLICT_REASONS } from "../../utils/hardcodedConstants";
import { getItem } from "../../api/crud";
import { useMeState } from "../../lib/meState";
import { buildUserName } from "../../utils/actorUtils";
import { upcomingRehearsalsList } from "../../utils/rehearsalUtils";

const DashboardStyles = styled.div`
  h3,
  h4 {
    padding-top: 15px;
  }
`;

export default function Dashboard() {
  const { me } = useMeState();
  const [errors, setErrors] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [productions, setProductions] = useState([]);
  const [rehearsals, setRehearsals] = useState([]);
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    if (!me) {
      history.push("");
    }
    let response = await getItem(me.id, "user");
    if (response.status >= 400) {
      console.log("error!");
      setErrors((errors) => [...errors, "Error fetching user"]);
    } else {
      setUser(response.data);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user.jobs && user.conflicts && user.conflict_patterns) {
      let currentJobs = user.jobs
        // .filter(
        //   (job) =>
        //     new Date(job.end_date) > new Date() &&
        //     new Date(job.start_date) < new Date()
        // )
        .map((job) => (
          <li key={job.id}>
            {job.specialization?.title}{" "}
            {job.production && (
              <span>
                on{" "}
                <Link to={`/productions/${job.production_id}`}>
                  {job.production.play?.title}
                </Link>{" "}
              </span>
            )}
            {job.theater && (
              <span>
                at{" "}
                <Link to={`/theaters/${job.theater_id}`}>
                  {job.theater.name}
                </Link>
              </span>
            )}
          </li>
        ));
      setJobs(currentJobs);
      let currentProductions = user.jobs
        .filter(
          (job) =>
            job.production &&
            new Date(job.end_date) > new Date() &&
            new Date(job.start_date) < new Date()
        )
        .map((job) => job.production);
      setProductions(currentProductions);

      let upcomingRehearsals = upcomingRehearsalsList(user.rehearsals);
      setRehearsals(upcomingRehearsals);
    }
  }, [user]);

  if (loading && !user?.created_at) {
    return (
      <Modal>
        <h1>Loading your info</h1>
        <Spinner />
      </Modal>
    );
  }

  return (
    <DashboardStyles>
      <h3>Welcome, {buildUserName(user)}!</h3>
      <div>
        <h4>Current Jobs & Productions</h4>
        {jobs?.length > 0 ? (
          <div>
            <ul>{jobs}</ul>
          </div>
        ) : (
          <div>You don't have any jobs listed.</div>
        )}
      </div>
      <hr />
      <div>
        <h4>Rehearsal schedule</h4>
        {!!productions.length &&
          productions.map((production) => (
            <em key={production.id}>
              <Link to={`/productions/${production.id}/rehearsal-schedule`}>
                Full rehearsal schedule for {production.play?.title}
              </Link>
            </em>
          ))}
        <DefaultTable>
          <thead>
            <tr>
              <th>Time</th>
              <th>Location</th>
              <th>Title</th>
              <th>Notes</th>
              <th>Material</th>
              <th>Who is called</th>
            </tr>
          </thead>
          <tbody>{rehearsals}</tbody>
        </DefaultTable>
        <hr />
        <div>
          <ConflictStateProvider
            conflictReasonsArray={USER_CONFLICT_REASONS}
            parentId={user.id}
            parentType="user"
            propsConflicts={user.conflicts}
            propsConflictPatterns={user.conflict_patterns}
            roles={["self"]}
          >
            <h3>Conflicts</h3>
            <ConflictsList current={true} />
          </ConflictStateProvider>
        </div>
      </div>
      <hr />
      <div>
        <Link to={`/users/${me.id}`}>
          Edit your profile/update your account
        </Link>
      </div>
    </DashboardStyles>
  );
}
