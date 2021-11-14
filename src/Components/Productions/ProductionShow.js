import styled from "styled-components";
import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { BrowserRouter as Router, Link, useRouteMatch } from "react-router-dom";
import { Button } from "../Button";
import { Spinner } from "../Loaders";
import Modal from "../Modal";
import PeopleList from "./People/PeopleList";
import StageExitsList from "./SetDesign/StageExitsList";
import { Form, FormGroupInline } from "../Form";
import { useProductionAuthState } from "../Contexts";
import AuditionersList from "../Jobs/AuditionersList";
import ProductionJobsList from "../Jobs/ProductionJobsList";
import CastList from "../Jobs/CastList";
import { DefaultTable } from "../Styled";
import { getProductionCopyComplete } from "../../api/plays";
import { useForm, useInterval } from "../../hooks/environmentUtils";
import { useProductionState } from "../../lib/productionState";
import { formatDateForRails } from "../../utils/dateTimeUtils";
import { StartEndDatePair } from "../../utils/formUtils";
import { upcomingRehearsalsList } from "../../utils/rehearsalUtils";

const ProductionProfile = styled.div`
  text-align: center;
`;
export default function ProductionShow({ onDeleteClick, onFormSubmit }) {
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
  const { url } = useRouteMatch();
  const { inputs, handleChange } = useForm({
    end_date: production.end_date || new Date(),
    start_date: production.start_date || new Date(),
    lines_per_minute: production.lines_per_minute || 20,
  });
  const [dateFormOpen, setDateFormOpen] = useState(false);
  const [linesPerMinuteFormOpen, setLinesPerMinuteFormOpen] = useState(false);
  const [productionCopyComplete, setProductionCopyComplete] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(
    production?.play?.production_copy_complete ? null : 1000
  );

  const linesTotal =
    production.play?.new_line_count || production.play?.old_line_count || "";
  let runTime = 0;
  if (linesTotal > 0 && production.lines_per_minute) {
    runTime = (linesTotal / production.lines_per_minute).toFixed(2);
  }

  //check if the play is ready for interaction
  useInterval(async () => {
    let productionCopyCompleteData = await getProductionCopyComplete(
      production.play?.id
    );
    setProductionCopyComplete(
      productionCopyCompleteData.data.production_copy_complete
    );
    if (productionCopyComplete) {
      setPollingInterval(null);
    }
  }, pollingInterval);

  function handleSubmit(e) {
    e.preventDefault();
    updateProduction({
      id: production.id,
      end_date: formatDateForRails(inputs.end_date),
      lines_per_minute: inputs.lines_per_minute,
      start_date: formatDateForRails(inputs.start_date),
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
            {production.lines_per_minute > 0 && linesPerMinuteFormOpen ? (
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
      {!!rehearsals.length && (
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
              <tbody>{upcomingRehearsalsList(rehearsals)}</tbody>
            </DefaultTable>
            <p>
              <Link to={`${url}/rehearsal_schedule`}>
                <Button>View Full Rehearsal Schedule</Button>
              </Link>
            </p>
          </div>
        </div>
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
        <Link to={`${url}/doubling_charts/`}>
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

      <div>
        <h2>Design & Tech</h2>
        <ul>
          <Link to={`/productions/${production.id}/set`}>
            Set Design Dashboard
          </Link>
          <li>TK Costume Design Dashboard</li>
          <li>TK props dashboard</li>
        </ul>
      </div>
    </>
  );
}
