import styled from "styled-components";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Button } from "../Button.js";
import { Spinner } from "../Loaders.js";
import Modal from "../Modal.js";
import PeopleList from "./People/PeopleList.js";
import StageExitsList from "./SetDesign/StageExitsList.js";
import { Form, FormGroupInline } from "../Form.js";
import { useProductionAuthState } from "../Contexts.js";
import AuditionersList from "../Jobs/AuditionersList.js";
import ProductionJobsList from "../Jobs/ProductionJobsList.js";
import CastList from "../Jobs/CastList.js";
import { DefaultTable } from "../Styled.js";
import { getProductionCopyComplete } from "../../api/plays.js";
import { useForm, useInterval } from "../../hooks/environmentUtils.js";
import { useProductionState } from "../../lib/productionState.js";
import { formatDateForRails } from "../../utils/dateTimeUtils.js";
import { StartEndDatePair } from "../Inputs.js";
import { upcomingRehearsalsList } from "../../utils/rehearsalUtils.js";
import { getProduction } from "../../api/productions.js";
import { useMeState } from "../../lib/meState.js";

const ProductionProfile = styled.div`
  text-align: center;
`;
export default function ProductionShow({ onDeleteClick, onFormSubmit }) {
  const { me } = useMeState();
  const {
    createJob,
    deleteJob,
    deleteProduction,
    jobsNotActing,
    loading,
    production,
    rehearsals,
    updateProduction,
  } = useProductionState();

  const { role } = useProductionAuthState();
  const { inputs, handleChange } = useForm({
    end_date: production.end_date || new Date(),
    start_date: production.start_date || new Date(),
    lines_per_minute: production.lines_per_minute || 20,
  });
  const [dateFormOpen, setDateFormOpen] = useState(false);
  const [linesPerMinuteFormOpen, setLinesPerMinuteFormOpen] = useState(false);
  const [playId, setPlayId] = useState();
  const [productionCopyComplete, setProductionCopyComplete] = useState(false);
  const [productionCopyStatus, setProductionCopyStatus] = useState("");
  const [pollingInterval, setPollingInterval] = useState(
    production?.play?.production_copy_complete ? null : 5000
  );

  const linesTotal =
    production.play?.new_line_count || production.play?.old_line_count || "";
  let runTime = 0;
  if (linesTotal > 0 && production.lines_per_minute) {
    runTime = (linesTotal / production.lines_per_minute).toFixed(2);
  }

  //check if the play is ready for interaction
  useInterval(async () => {
    if (playId && productionCopyComplete) {
      setPollingInterval(null);
    } else if (playId) {
      let productionCopyCompleteData = await getProductionCopyComplete(
        production.play?.id
      );
      setProductionCopyComplete(
        productionCopyCompleteData.data.production_copy_complete
      );
      setProductionCopyStatus(productionCopyCompleteData.data.copy_status);
    } else {
      let productionHasPlay = await getProduction(production.id);
      if (productionHasPlay.data.play?.id) {
        setPlayId(productionHasPlay.data.play.id);
      }
    }
  }, pollingInterval);

  function handleSubmit(e) {
    e.preventDefault();
    updateProduction({
      id: production.id,
      end_date: formatDateForRails({
        date: inputs.end_date,
        timezone: me.timezone,
      }),
      lines_per_minute: inputs.lines_per_minute,
      start_date: formatDateForRails({
        date: inputs.start_date,
        timezone: me.timezone,
      }),
    });
    setDateFormOpen(false);
    setLinesPerMinuteFormOpen(false);
  }

  function toggleDateForm() {
    if (role == "admin") {
      setDateFormOpen(!dateFormOpen);
    }
  }

  function toggleLinesPerMinuteForm() {
    if (role == "admin") {
      setLinesPerMinuteFormOpen(!linesPerMinuteFormOpen);
    }
  }
  if (!production || loading) {
    return (
      <Modal>
        <h1>Loading production</h1>
        <Spinner />
      </Modal>
    );
  }
  return (
    <>
      <div>
        <ProductionProfile>
          <h2>
            {production.play ? (
              <Link to={`/plays/${production.play.id}`}>
                {production.play.title}
              </Link>
            ) : (
              "A Play"
            )}{" "}
            at{" "}
            {production.theater ? (
              <Link to={`/theaters/${production.theater.id}`}>
                {production.theater.name}
              </Link>
            ) : (
              "A Theater"
            )}
          </h2>
          <div>
            <em>{productionCopyStatus}</em>
          </div>
          <div onDoubleClick={() => toggleDateForm()}>
            {dateFormOpen ? (
              <Form noValidate onSubmit={(e) => handleSubmit(e)}>
                <StartEndDatePair
                  endDate={inputs.end_date}
                  handleChange={handleChange}
                  startDate={inputs.start_date}
                />
                <Button type="submit">Submit</Button>
                <Button type="button" onClick={toggleDateForm}>
                  Cancel
                </Button>
              </Form>
            ) : (
              <span>
                {production.start_date} - {production.end_date}
              </span>
            )}
          </div>

          {role == "admin" && (
            <>
              <span
                className="right floated trash icon"
                onClick={() => {
                  deleteProduction(production.id);
                }}
              >
                <i className="fas fa-trash-alt"></i>
              </span>
            </>
          )}
        </ProductionProfile>
      </div>
      <hr />
      {productionCopyComplete && (
        <div>
          <div>
            {linesPerMinuteFormOpen ? (
              <Form noValidate onSubmit={(e) => handleSubmit(e)} width="65%">
                <FormGroupInline>
                  <label htmlFor="lines_per_minute">Lines Per Minute:</label>
                  <input
                    id="lines_per_minute"
                    type="number"
                    name="lines_per_minute"
                    onChange={handleChange}
                    value={inputs.lines_per_minute}
                  />
                </FormGroupInline>
                <Button type="submit">Submit</Button>
                <Button type="button" onClick={toggleLinesPerMinuteForm}>
                  Cancel
                </Button>
              </Form>
            ) : (
              <p onDoubleClick={() => toggleLinesPerMinuteForm()}>
                Lines per minute:{" "}
                {production.lines_per_minute || "lines per minute not yet set"}
              </p>
            )}
            {linesTotal > 0 ? <p>Total lines: {linesTotal}</p> : <span></span>}
            {runTime ? <p>Run time: {runTime} minutes</p> : <span></span>}
          </div>
        </div>
      )}
      <hr />
      {!!rehearsals.length ? (
        <div>
          <h3>Upcoming Rehearsals</h3>
          <div>
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
              <tbody>
                {upcomingRehearsalsList({
                  rehearsals: rehearsals,
                  timezone: me.timezone,
                })}
              </tbody>
            </DefaultTable>
            <p>
              <Link to={`/productions/${production.id}/rehearsal-schedule`}>
                <Button>View Full Rehearsal Schedule</Button>
              </Link>
            </p>
          </div>
        </div>
      ) : (
        <p>
          <Link to={`/productions/${production.id}/rehearsal-schedule`}>
            <Button>View Full Rehearsal Schedule</Button>
          </Link>
        </p>
      )}
      <hr />
      <div>
        <h2>Production Jobs</h2>
        {jobsNotActing && (
          <ProductionJobsList
            handleDeleteJob={deleteJob}
            jobs={jobsNotActing}
            onFormSubmit={createJob}
            production={production}
            role={role}
          />
        )}
      </div>
      <hr />
      <div>
        <h2>Auditioners</h2>
        <div>
          <b>You have to add auditioners before you can cast the show</b>
        </div>
        <AuditionersList
          production={production}
          role={role}
          handleDeleteJob={deleteJob}
          onFormSubmit={createJob}
        />
      </div>
      <hr />

      <div>
        <CastList />
        <Link to="doubling_charts">
          <Button variant="info">Show Doubling Charts</Button>
        </Link>
      </div>

      <hr />

      <div>
        <div>
          <PeopleList />
        </div>
      </div>
      <hr />

      {/* <div>
        <h2>Design & Tech</h2>
        <ul>
          <Link to={`/productions/${production.id}/set`}>
            Set Design Dashboard
          </Link>
          <li>TK Costume Design Dashboard</li>
          <li>TK props dashboard</li>
        </ul>
      </div> */}
    </>
  );
}
